import React, { PropTypes } from 'react'
import update from 'react-addons-update'

class Chips extends React.Component {
  static propTypes = {
    chips: PropTypes.array,
    max: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    maxlength: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    placeholder: PropTypes.string,
    inputClassName: PropTypes.string,
    containerClassName: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      chips: [],
      KEY: {
        backspace: 8,
        tab: 9,
        enter: 13
      },
      // only allow letters, numbers and spaces inbetween words
      INVALID_CHARS: /[^a-zA-Z0-9 ]/g
    }
    this.onKeyDown = this.onKeyDown.bind(this)
    this.clearInvalidChars = this.clearInvalidChars.bind(this)
    this.updateChips = this.updateChips.bind(this)
    this.focusInput = this.focusInput.bind(this)
    this.onBlurEvent = this.onBlurEvent.bind(this)
    this.onEnterEvent = this.onEnterEvent.bind(this)
  }

  defaultProps() {
    return {
      placeholder: 'Add a chip...',
      maxlength: 20
    }
  }

  componentDidMount() {
    this.setChips(this.props.chips)
  }

  componentWillReceiveProps(nextProps) {
    this.setChips(nextProps.chips)
  }

  setChips(chips) {
    if (chips && chips.length) this.setState({ chips })
  }

  onKeyDown(event) {
    let keyPressed = event.which

    if (keyPressed === this.state.KEY.enter ||
      (keyPressed === this.state.KEY.tab && event.target.value)) {
      event.preventDefault()
      this.updateChips(event)
    } else if (keyPressed === this.state.KEY.backspace) {
      let chips = this.state.chips

      if (!event.target.value && chips.length) {
        this.deleteChip(chips[chips.length - 1])
      }
    }
  }

  onBlurEvent() {
    if (this.state.chips && this.props.onBlur)
      return this.props.onBlur(this.state.chips)
  }

  onEnterEvent() {
    if (this.state.chips && this.props.onEnter)
      return this.props.onEnter(this.state.chips)
  }

  clearInvalidChars(event) {
    let value = event.target.value
    if (this.state.INVALID_CHARS.test(value)) {
      event.target.value = value.replace(this.state.INVALID_CHARS, '')
    } else if (value.length > this.props.maxlength) {
      event.target.value = value.substr(0, this.props.maxlength)
    }
  }

  updateChips(event) {
    if (!this.props.max ||
      this.state.chips.length < this.props.max) {
      let value = event.target.value

      if (!value) return

      let chip = value.trim().toLowerCase()

      if (chip && this.state.chips.indexOf(chip) < 0) {
        this.setState({
          chips: update(
            this.state.chips,
            {
              $push: [chip]
            }
          )
        })
        this.onEnterEvent(this.state.chips.push(chip))
      }
    }
    event.target.value = ''
  }

  deleteChip(chip) {
    let index = this.state.chips.indexOf(chip)

    if (index >= 0) {
      this.setState({
        chips: update(
          this.state.chips,
          {
            $splice: [[index, 1]]
          }
        )
      })
      this.onBlurEvent(this.state.chips.splice(index, 1))

      if (this.props.onDelete && typeof this.props.onDelete === 'function') {
        this.props.onDelete(this.state.chips)
      }
    }
  }

  focusInput(event) {
    let children = event.target.children

    if (children.length) children[children.length - 1].focus()
  }

  render() {
    let chips = this.state.chips.map((chip, index) => {
      return (
        <span className="chip" key={index}>
          <span className="chip-value">{chip}</span>
          <button type="button" className="chip-delete-button" onClick={this.deleteChip.bind(this, chip)}>x</button>
        </span>
      )
    })

    let placeholder = !this.props.max || chips.length < this.props.max ? this.props.placeholder : ''
    let customClassName = this.props.containerClassName || ''
    let inputClassName = this.props.inputClassName || ''
    return (
      <div className={'chips ' + customClassName} onClick={this.focusInput}>
        {chips}
        <input type="text"
               className={'chips-input ' + inputClassName}
               placeholder={placeholder}
               onKeyDown={this.onKeyDown}
               onKeyUp={this.clearInvalidChars}
               onBlur={this.onBlurEvent}
        />
      </div>
    )
  }
}

export default Chips
