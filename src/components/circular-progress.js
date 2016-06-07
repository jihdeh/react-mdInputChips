import React from "react";
import {CircularProgress} from "material-ui";

export default class LoadCircularProgress extends React.Component {
  render() {
    const {style = {}, className = ""} = this.props;
    console.log(this.props, 'oks pops');
    return (
      <CircularProgress
        {...this.props}
        className={("progressIndicator " + (className || "")).trim()}
        style={Object.assign({}, {
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          margin: "auto",
        }, style)}/>
    );
  }
}
