"use strict";

import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
var Mask = require( "./mask" );
var Handle = require( "./handle" );
var geometry = require( "./geometry" );

var SelectRect = module.exports = React.createClass({
	displayName: "SelectRect",

	propTypes: {
		backgroundSrc: React.PropTypes.string.isRequired,
		updateSelection: React.PropTypes.func.isRequired,
		imgOnLoad: React.PropTypes.func,
		size: React.PropTypes.arrayOf( React.PropTypes.number ).isRequired
	},

	render: function() {
		var style = { position: "relative" };
		return (
			<div
				className="selectRect"
				style={ style }>
				<img
					id="img"
					onLoad={event => {
						this.props.imgOnLoad(event.target)
						.then(this.imgOnLoad);
					}}
					src={ this.props.backgroundSrc }
					ref={ "image" } />
				{ this.renderMask( this.getTopRect() )}
				{ this.renderMask( this.getLeftRect() )}
				{ this.renderWindow( this.getCenterRect() )}
				{ this.renderMask( this.getRightRect() )}
				{ this.renderMask( this.getBottomRect() )}
				{ this.renderHandles() }
			</div>
		); // TODO: center pan & crosshair
	},

	getInitialState: function() {
		return {
			x0: 0,
			y0: 0,
			x1: this.props.size[ 0 ],
			y1: this.props.size[ 1 ]
		};
	},

	imgOnLoad: function( img ) {
		var scale = img.offsetWidth / img.naturalWidth;


		if ((img.offsetWidth / img.offsetHeight) < this.props.aspectRatio) {
			this.setState({
				x0: 0,
				y0: 0,
				x1: img.offsetWidth,
				y1: img.offsetWidth / this.props.aspectRatio
			});
		} else {
			this.setState({
				x0: 0,
				y0: 0,
				x1: img.offsetHeight * this.props.aspectRatio,
				y1: img.offsetHeight
			});
		}

		if( this.props.imgOnLoad ) {
			this.props.imgOnLoad( img );
		}

		var initialSize = this.realScale(this.state.x1, this.state.y1);

		this.props.updateSelection( 0, 0, initialSize[0], initialSize[1] );
	},

	renderHandles: function() {
		return _.range( 4 ).map( function( i ) {
			var ix = i % 2;
			var iy = Math.floor( i / 2 );

			return (
				<Handle
					x={ ix? this.state.x1: this.state.x0 }
					y={ iy? this.state.y1: this.state.y0 }
					onMouseDown={ this.startDragHandle( ix, iy )}
					key={ i }/>
			);
		}.bind( this ));
	},

	startDragHandle: function( ix, iy ) {
		return function( event ) {
			this.setState({
				dragging: [ ix, iy ],
				origin: [
					this.state[ !ix? "x1": "x0" ],
					this.state[ !iy? "y1": "y0" ]
				],
				handle: [
					this.state[ ix? "x1": "x0" ],
					this.state[ iy? "y1": "y0" ]
				]
			});

			window.addEventListener("mousemove", this.dragHandle);
			window.addEventListener("mouseup", this.endDragPan);
		}.bind( this );
	},

	startPan: function() {
		return function( event ) {
			this.setState({
				panning: true
			});

			window.addEventListener("mousemove", this.pan);
			window.addEventListener("mouseup", this.endDragPan);
		}.bind( this );
	},

	endDragPan: function() {
		console.log("end drag pan");
		this.setState({
			dragging: null,
			panning: null
		});

		window.removeEventListener("mousemove", this.pan);
		window.removeEventListener("mousemove", this.dragHandle);
		window.removeEventListener("mouseup", this.endDragPan);
	},

	dragHandle: function( event ) {
		event.preventDefault();
		event.stopPropagation();

		var ix = this.state.dragging[ 0 ];
		var iy = this.state.dragging[ 1 ];

		var bounds = this.refs.image.getBoundingClientRect();
		var mx = Math.floor( Math.max( 0, event.clientX - bounds.left ) - this.state.origin[0] );
		var my = Math.floor( Math.max( 0, event.clientY - bounds.top ) - this.state.origin[1] );

		var newRect = geometry.constrainScale(
			geometry.scaleByHandle(
				[[ this.state.x0, this.state.y0 ],
				[ this.state.x1, this.state.y1 ]],
				this.props.size,
				this.state.origin,
				this.state.handle,
				[ mx, my ]
			),
			[ bounds.width, bounds.height ]
		);

		if( newRect[0][0] < 0 || newRect[0][1] < 0 ) {
			return;
		}

		var img = ReactDOM.findDOMNode( this.refs.image );
		var scale = img.width / img.naturalWidth;
		if(( newRect[1][0] - newRect[0][0] ) < this.props.size[0] * scale || ( newRect[1][1] - newRect[0][1] ) < this.props.size[1] * scale ) {
			return;
		}

		this.setState({
			x0: newRect[0][0],
			y0: newRect[0][1],
			x1: newRect[1][0],
			y1: newRect[1][1]
		});

		var scaled = this.realScale( this.state.x0, this.state.y0, this.state.x1, this.state.y1 );
		this.props.updateSelection( scaled[0], scaled[1], scaled[2], scaled[3] );
	},

	realScale: function() {
		var img = ReactDOM.findDOMNode( this.refs.image );
		var scale = img.width / img.naturalWidth;

		return Array.prototype.map.call( arguments, function( n ) {
			return n / scale;
		});
	},

	pan: function( event ) {
		var bounds = this.refs.image.getBoundingClientRect();
		var x = Math.floor( event.clientX - bounds.left );
		var y = Math.floor( event.clientY - bounds.top );

		var newRect = [[
			x - this.getWidth() / 2,
			y - this.getHeight() / 2
		], [
			x + this.getWidth() / 2,
			y + this.getHeight() / 2
		]];

		newRect = geometry.constrainTranslation( newRect, [ bounds.width, bounds.height ]);

		this.setState({
			x0: newRect[0][0],
			y0: newRect[0][1],
			x1: newRect[1][0],
			y1: newRect[1][1]
		});

		var scaled = this.realScale( this.state.x0, this.state.y0, this.state.x1, this.state.y1 );
		this.props.updateSelection( scaled[0], scaled[1], scaled[2], scaled[3] );
	},

	getWidth: function() {
		return this.state.x1 - this.state.x0;
	},

	getHeight: function() {
		return this.state.y1 - this.state.y0;
	},

	getTopRect: function() {
		return {
			left: 0,
			top: 0,
			right: 0,
			height: this.state.y0
		};
	},

	getLeftRect: function() {
		return {
			left: 0,
			top: this.state.y0,
			width: this.state.x0,
			height: this.getHeight()
		};
	},

	getCenterRect: function() {
		return {
			left: this.state.x0,
			top: this.state.y0,
			width: this.getWidth(),
			height: this.getHeight()
		};
	},

	getRightRect: function() {
		return {
			left: this.state.x0 + this.getWidth(),
			top: this.state.y0,
			right: 0,
			height: this.getHeight()
		};
	},

	getBottomRect: function() {
		return {
			left: 0,
			top: this.state.y0 + this.getHeight(),
			right: 0,
			bottom: 4 // WTF?
		};
	},

	renderMask: function( rect ) {
		return (
			<Mask shape={ rect }/>
		);
	},

	renderWindow: function( rect ) {
		return (
			<Mask
				shape={ rect }
				isCropWindow
				onMouseDown={ this.startPan() }/>
		);
	}
});
