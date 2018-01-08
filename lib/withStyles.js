'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _insertCss = require('./insertCss');

var _insertCss2 = _interopRequireDefault(_insertCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withStyles(...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class WithStyles extends _react.Component {
      componentWillMount() {
        const removeCss = styles.map(x => x._insertCss ? x._insertCss({}, _insertCss2.default) : () => {}); // eslint-disable-line no-underscore-dangle, max-len

        this.removeCss = () => {
          removeCss.forEach(f => f());
        };
      }

      componentWillUnmount() {
        if (this.removeCss && typeof this.removeCss === 'function') {
          setTimeout(this.removeCss, 0);
        }
      }

      render() {
        return _react2.default.createElement(ComposedComponent, this.props);
      }
    }

    const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

    WithStyles.displayName = `WithStyles(${displayName})`;
    WithStyles.ComposedComponent = ComposedComponent;

    return (0, _hoistNonReactStatics2.default)(WithStyles, ComposedComponent);
  };
}

exports.default = withStyles;