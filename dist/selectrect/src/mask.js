"use strict";

var React = require("react");

var Mask = module.exports = React.createClass({
	displayName: "Mask",

	propTypes: {
		color: React.PropTypes.string,
		shape: React.PropTypes.object.isRequired,
		isCropWindow: React.PropTypes.bool,
		onMouseDown: React.PropTypes.func
	},

	render: function render() {
		var style = this.props.shape;
		var className = "cropMask" + (this.props.isCropWindow ? " crop-window" : " shaded");

		return React.createElement("div", {
			style: style,
			className: className,
			onMouseDown: this.props.onMouseDown });
	}
});