'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

// eslint-disable-line no-unused-vars


var count = 0;

function withStyles(styles) {
  return function (ComposedComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
      _inherits(WithStyles, _Component);

      function WithStyles() {
        _classCallCheck(this, WithStyles);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WithStyles).call(this));

        _this.refCount = 0;
        ComposedComponent.prototype.renderCss = function render(css) {
          var style = void 0;
          if (_ExecutionEnvironment.canUseDOM) {
            style = this.styleId && document.getElementById(this.styleId);
            if (style) {
              if ('textContent' in style) {
                style.textContent = css;
              } else {
                style.styleSheet.cssText = css;
              }
            } else {
              this.styleId = 'dynamic-css-' + count++;
              style = document.createElement('style');
              style.setAttribute('id', this.styleId);
              style.setAttribute('type', 'text/css');

              if ('textContent' in style) {
                style.textContent = css;
              } else {
                style.styleSheet.cssText = css;
              }

              document.getElementsByTagName('head')[0].appendChild(style);
              this.refCount++;
            }
          } else {
            this.context.onInsertCss(css);
          }
        }.bind(_this);
        return _this;
      }

      _createClass(WithStyles, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          if (_ExecutionEnvironment.canUseDOM) {
            (0, _invariant2.default)(styles.use, 'The style-loader must be configured with reference-counted API.');
            styles.use();
          } else {
            this.context.onInsertCss(styles.toString());
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          styles.unuse();
          if (this.styleId) {
            this.refCount--;
            if (this.refCount < 1) {
              var style = document.getElementById(this.styleId);
              if (style) {
                style.parentNode.removeChild(style);
              }
            }
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(ComposedComponent, this.props);
        }
      }]);

      return WithStyles;
    }(_react.Component), _class.contextTypes = {
      onInsertCss: _react.PropTypes.func
    }, _temp;
  };
}

exports.default = withStyles;