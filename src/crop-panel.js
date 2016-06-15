import React from "react";
import SelectRect from "./selectrect";
import {FlatButton} from "material-ui";

export default class CropPanel extends React.Component {
  static displayName = "CropPanel";

  static propTypes = {
    originalSrc: React.PropTypes.string,
    onSelectRegion: React.PropTypes.func.isRequired,
    cancelCrop: React.PropTypes.func.isRequired,
    aspectRatio: React.PropTypes.number,
    size: React.PropTypes.arrayOf( React.PropTypes.number ).isRequired,
    onDeleteImage: React.PropTypes.func,
    buttons: React.PropTypes.arrayOf(React.PropTypes.oneOf(['crop', 'delete', 'upload', 'refocus'])),
    loading: React.PropTypes.bool,
    cropLabel: React.PropTypes.string.isRequired,
    deleteLabel: React.PropTypes.string.isRequired,
    refocusLabel: React.PropTypes.string.isRequired
  };

  constructor(attrs){
    super(attrs);

    this.imgOnLoad = this.imgOnLoad.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.select = this.select.bind(this);
  }

  imgOnLoad(image) {
    return new Promise((resolve, reject) => {
      var x = image.offsetWidth;
      var y = image.offsetHeight;

      this.setState ({
        landscape: x / y > this.props.aspectRatio
      }, () => {
        resolve(image);
      }, () => {
        reject();
      });
    });
  }

  deleteImage(event){
    this.props.cancelCrop(event);
    this.props.onDeleteImage(event);
  }

  render() {
    const {buttons = []} = this.props;
    return (
      <div>
        <a className="reveal-modal-bg" style={{display: 'block'}} onClick={ this.props.cancelCrop }></a>
        <div className={ "cropPreview " + ( this.state && this.state.landscape? "landscapeOrientation" : "portraitOrientation") }>
          <SelectRect
            imgOnLoad={ this.imgOnLoad }
            backgroundSrc={ this.props.originalSrc }
            updateSelection={ this.updateSelection }
            aspectRatio={ this.props.aspectRatio }
            size = { this.props.size }/>
          <div className="controlGroup">
            {buttons.map((button, idx)=>{
              switch (button){
                  case 'crop':
                    return <FlatButton key={idx} primary onClick={ this.select }>{this.props.cropLabel}</FlatButton>;
                  case 'delete':
                    return <FlatButton key={idx} onClick={ this.deleteImage }>{this.props.deleteLabel}</FlatButton>;
                  case'refocus':
                    return <FlatButton key={idx} primary onClick={ this.select }>{this.props.refocusLabel}</FlatButton>;
                  default: return null;
                }
              })
            }
          </div>
        </div>
      </div>
    );
  }

  updateSelection( x0, y0, x1, y1 ) {
    this.setState({ x0, y0, x1, y1 });
  }

  select() {
    this.props.onSelectRegion({
      x: this.state.x0,
      y: this.state.y0,
      width: this.state.x1 - this.state.x0,
      height: this.state.y1 - this.state.y0
    });
  }
}
