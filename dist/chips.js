"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _main = "main.css?UEm46h-";

var _main2 = _interopRequireDefault(_main);

var _reactAddonsUpdate = require("react-addons-update");

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const update = React.addons.update;

var Chips = (_temp = _class = function (_React$Component) {
  _inherits(Chips, _React$Component);

  function Chips(props) {
    _classCallCheck(this, Chips);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Chips).call(this, props));

    _this.state = {
      chips: [],
      KEY: {
        backspace: 8,
        tab: 9,
        enter: 13
      },
      // only allow letters, numbers and spaces inbetween words
      INVALID_CHARS: /[^a-zA-Z0-9 ]/g
    };
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.clearInvalidChars = _this.clearInvalidChars.bind(_this);
    _this.updateChips = _this.updateChips.bind(_this);
    _this.focusInput = _this.focusInput.bind(_this);
    _this.onBlurEvent = _this.onBlurEvent.bind(_this);
    return _this;
  }

  _createClass(Chips, [{
    key: "defaultProps",
    value: function defaultProps() {
      return {
        placeholder: 'Add a chip...',
        maxlength: 20
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setChips(this.props.chips);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setChips(nextProps.chips);
    }
  }, {
    key: "setChips",
    value: function setChips(chips) {
      if (chips && chips.length) this.setState({ chips: chips });
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var keyPressed = event.which;

      if (keyPressed === this.state.KEY.enter || keyPressed === this.state.KEY.tab && event.target.value) {
        event.preventDefault();
        this.updateChips(event);
      } else if (keyPressed === this.state.KEY.backspace) {
        var chips = this.state.chips;

        if (!event.target.value && chips.length) {
          this.deleteChip(chips[chips.length - 1]);
        }
      }
    }
  }, {
    key: "onBlurEvent",
    value: function onBlurEvent(event) {
      if (this.state.chips) return this.props.onBlur(this.state.chips);
    }
  }, {
    key: "clearInvalidChars",
    value: function clearInvalidChars(event) {
      var value = event.target.value;

      if (this.state.INVALID_CHARS.test(value)) {
        event.target.value = value.replace(this.state.INVALID_CHARS, '');
      } else if (value.length > this.props.maxlength) {
        event.target.value = value.substr(0, this.props.maxlength);
      }
    }
  }, {
    key: "updateChips",
    value: function updateChips(event) {
      if (!this.props.max || this.state.chips.length < this.props.max) {
        var value = event.target.value;

        if (!value) return;

        var chip = value.trim().toLowerCase();

        if (chip && this.state.chips.indexOf(chip) < 0) {
          this.setState({
            chips: (0, _reactAddonsUpdate2.default)(this.state.chips, {
              $push: [chip]
            })
          });
        }
      }

      event.target.value = '';
    }
  }, {
    key: "deleteChip",
    value: function deleteChip(chip) {
      var index = this.state.chips.indexOf(chip);

      if (index >= 0) {
        this.setState({
          chips: (0, _reactAddonsUpdate2.default)(this.state.chips, {
            $splice: [[index, 1]]
          })
        });
      }
    }
  }, {
    key: "focusInput",
    value: function focusInput(event) {
      var children = event.target.children;

      if (children.length) children[children.length - 1].focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var chips = this.state.chips.map(function (chip, index) {
        return _react2.default.createElement(
          "span",
          { className: "chip", key: index },
          _react2.default.createElement(
            "span",
            { className: "chip-value" },
            chip
          ),
          _react2.default.createElement(
            "button",
            { type: "button", className: "chip-delete-button", onClick: _this2.deleteChip.bind(_this2, chip) },
            "x"
          )
        );
      });

      var placeholder = !this.props.max || chips.length < this.props.max ? this.props.placeholder : '';
      var customClassName = this.props.className;
      return _react2.default.createElement(
        "div",
        { className: "chips " + customClassName, onClick: this.focusInput },
        chips,
        _react2.default.createElement("input", { type: "text",
          className: "chips-input",
          placeholder: placeholder,
          onKeyDown: this.onKeyDown,
          onKeyUp: this.clearInvalidChars,
          onBlur: this.onBlurEvent
        })
      );
    }
  }]);

  return Chips;
}(_react2.default.Component), _class.propTypes = {
  chips: _react.PropTypes.array,
  max: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  maxlength: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  placeholder: _react.PropTypes.string
}, _temp);
exports.default = Chips;