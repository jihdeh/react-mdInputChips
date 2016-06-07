"use strict";

var React = require( "react" );

var Mask = module.exports = React.createClass({
	displayName: "Mask",

	propTypes: {
		color: React.PropTypes.string,
		shape: React.PropTypes.object.isRequired,
		isCropWindow: React.PropTypes.bool,
		onMouseDown: React.PropTypes.func
	},

	render: function() {
		var style = this.props.shape;
		const className = "cropMask" +
			(this.props.isCropWindow? " crop-window" : " shaded");

		return (
			<div
				style={ style }
				className={className}
				onMouseDown={ this.props.onMouseDown }/>
		);
	}
});
