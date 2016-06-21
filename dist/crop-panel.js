"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _selectrect = require("./selectrect");

var _selectrect2 = _interopRequireDefault(_selectrect);

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CropPanel = (_temp = _class = function (_React$Component) {
  _inherits(CropPanel, _React$Component);

  function CropPanel(attrs) {
    _classCallCheck(this, CropPanel);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CropPanel).call(this, attrs));

    _this.imgOnLoad = _this.imgOnLoad.bind(_this);
    _this.updateSelection = _this.updateSelection.bind(_this);
    _this.deleteImage = _this.deleteImage.bind(_this);
    _this.select = _this.select.bind(_this);
    return _this;
  }

  _createClass(CropPanel, [{
    key: "imgOnLoad",
    value: function imgOnLoad(image) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var x = image.offsetWidth;
        var y = image.offsetHeight;

        _this2.setState({
          landscape: x / y > _this2.props.aspectRatio
        }, function () {
          resolve(image);
        }, function () {
          reject();
        });
      });
    }
  }, {
    key: "deleteImage",
    value: function deleteImage(event) {
      this.props.cancelCrop(event);
      this.props.onDeleteImage(event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props$buttons = this.props.buttons;
      var buttons = _props$buttons === undefined ? [] : _props$buttons;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement("a", { className: "reveal-modal-bg", style: { display: 'block' }, onClick: this.props.cancelCrop }),
        _react2.default.createElement(
          "div",
          { className: "cropPreview " + (this.state && this.state.landscape ? "landscapeOrientation" : "portraitOrientation") },
          _react2.default.createElement(_selectrect2.default, {
            imgOnLoad: this.imgOnLoad,
            backgroundSrc: this.props.originalSrc,
            updateSelection: this.updateSelection,
            aspectRatio: this.props.aspectRatio,
            size: this.props.size }),
          _react2.default.createElement(
            "div",
            { className: "controlGroup" },
            buttons.map(function (button, idx) {
              switch (button) {
                case 'crop':
                  return _react2.default.createElement(
                    _materialUi.FlatButton,
                    { key: idx, primary: true, onClick: _this3.select },
                    _this3.props.cropLabel || 'Crop'
                  );
                case 'delete':
                  return _react2.default.createElement(
                    _materialUi.FlatButton,
                    { key: idx, onClick: _this3.deleteImage },
                    _this3.props.deleteLabel || 'Delete'
                  );
                case 'refocus':
                  return _react2.default.createElement(
                    _materialUi.FlatButton,
                    { key: idx, primary: true, onClick: _this3.select },
                    _this3.props.refocusLabel || 'Focus'
                  );
                default:
                  return null;
              }
            })
          )
        )
      );
    }
  }, {
    key: "updateSelection",
    value: function updateSelection(x0, y0, x1, y1) {
      this.setState({ x0: x0, y0: y0, x1: x1, y1: y1 });
    }
  }, {
    key: "select",
    value: function select() {
      this.props.onSelectRegion({
        x: this.state.x0,
        y: this.state.y0,
        width: this.state.x1 - this.state.x0,
        height: this.state.y1 - this.state.y0
      });
    }
  }]);

  return CropPanel;
}(_react2.default.Component), _class.displayName = "CropPanel", _class.propTypes = {
  originalSrc: _react2.default.PropTypes.string,
  onSelectRegion: _react2.default.PropTypes.func.isRequired,
  cancelCrop: _react2.default.PropTypes.func.isRequired,
  aspectRatio: _react2.default.PropTypes.number,
  size: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number).isRequired,
  onDeleteImage: _react2.default.PropTypes.func,
  buttons: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.oneOf(['crop', 'delete', 'upload', 'refocus'])),
  loading: _react2.default.PropTypes.bool,
  cropLabel: _react2.default.PropTypes.string.isRequired,
  deleteLabel: _react2.default.PropTypes.string.isRequired,
  refocusLabel: _react2.default.PropTypes.string.isRequired
}, _temp);
exports.default = CropPanel;