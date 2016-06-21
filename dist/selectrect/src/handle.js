"use strict";

var React = require("react");

var Handle = module.exports = React.createClass({
	displayName: "Handle",

	propTypes: {
		x: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
		y: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
		onMouseDown: React.PropTypes.func.isRequired
	},

	render: function render() {
		return React.createElement("div", {
			onMouseDown: this.props.onMouseDown,
			className: "handle",
			style: {
				position: "absolute",
				left: this.props.x - 4,
				top: this.props.y - 4,
				width: 8,
				height: 8,
				backgroundColor: "rgba(255, 255, 255, 0.5)",
				outline: "1px solid rgba(0, 0, 0, 0.5)"
			}
		});
	}
});