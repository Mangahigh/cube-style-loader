'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _mocha = require('mocha');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _withStyles = require('./withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.document = _jsdom2.default.jsdom('<!doctype html><html><body></body></html>'); /* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions, react/no-multi-comp */

global.window = document.defaultView;
global.navigator = global.window.navigator;

(0, _mocha.describe)('withStyles(...styles)(WrappedComponent)', function () {
  (0, _mocha.it)('Should call insetCss and removeCss functions provided by context', function (done) {
    var Provider = function (_Component) {
      (0, _inherits3.default)(Provider, _Component);

      function Provider() {
        (0, _classCallCheck3.default)(this, Provider);
        return (0, _possibleConstructorReturn3.default)(this, (Provider.__proto__ || (0, _getPrototypeOf2.default)(Provider)).apply(this, arguments));
      }

      (0, _createClass3.default)(Provider, [{
        key: 'getChildContext',
        value: function getChildContext() {
          return { insertCss: this.props.insertCss };
        }
      }, {
        key: 'render',
        value: function render() {
          return _react.Children.only(this.props.children);
        }
      }]);
      return Provider;
    }(_react.Component);

    Provider.propTypes = {
      insertCss: _propTypes2.default.func.isRequired,
      children: _propTypes2.default.node.isRequired
    };

    Provider.childContextTypes = {
      insertCss: _propTypes2.default.func.isRequired
    };

    var Foo = function (_Component2) {
      (0, _inherits3.default)(Foo, _Component2);

      function Foo() {
        (0, _classCallCheck3.default)(this, Foo);
        return (0, _possibleConstructorReturn3.default)(this, (Foo.__proto__ || (0, _getPrototypeOf2.default)(Foo)).apply(this, arguments));
      }

      (0, _createClass3.default)(Foo, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement('div', null);
        }
      }]);
      return Foo;
    }(_react.Component);

    var FooWithStyles = (0, _withStyles2.default)('')(Foo);
    var insertCss = _sinon2.default.spy(function () {
      return done;
    });
    var container = document.createElement('div');

    _reactDom2.default.render(_react2.default.createElement(
      Provider,
      { insertCss: insertCss },
      _react2.default.createElement(FooWithStyles, null)
    ), container);
    _reactDom2.default.unmountComponentAtNode(container);
    (0, _chai.expect)(insertCss.calledOnce).to.be.true;
  });

  (0, _mocha.it)('Should set the displayName correctly', function () {
    (0, _chai.expect)((0, _withStyles2.default)('')(function (_Component3) {
      (0, _inherits3.default)(Foo, _Component3);

      function Foo() {
        (0, _classCallCheck3.default)(this, Foo);
        return (0, _possibleConstructorReturn3.default)(this, (Foo.__proto__ || (0, _getPrototypeOf2.default)(Foo)).apply(this, arguments));
      }

      (0, _createClass3.default)(Foo, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement('div', null);
        }
      }]);
      return Foo;
    }(_react.Component)).displayName).to.equal('WithStyles(Foo)');

    (0, _chai.expect)((0, _withStyles2.default)('')((0, _createReactClass2.default)({
      displayName: 'Bar',
      render: function render() {
        return _react2.default.createElement('div', null);
      }
    })).displayName).to.equal('WithStyles(Bar)');

    (0, _chai.expect)((0, _withStyles2.default)('')((0, _createReactClass2.default)({
      render: function render() {
        return _react2.default.createElement('div', null);
      }
    })).displayName).to.be.oneOf(['WithStyles(Component)', 'WithStyles(Constructor)']);
  });

  (0, _mocha.it)('Should expose the component with styles as ComposedComponent', function () {
    var Container = function (_Component4) {
      (0, _inherits3.default)(Container, _Component4);

      function Container() {
        (0, _classCallCheck3.default)(this, Container);
        return (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).apply(this, arguments));
      }

      (0, _createClass3.default)(Container, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement('div', null);
        }
      }]);
      return Container;
    }(_react.Component);

    var decorated = (0, _withStyles2.default)('')(Container);
    (0, _chai.expect)(decorated.ComposedComponent).to.equal(Container);
  });

  (0, _mocha.it)('Hoists non-react statics of the composed component', function () {
    var Foo = function (_Component5) {
      (0, _inherits3.default)(Foo, _Component5);

      function Foo() {
        (0, _classCallCheck3.default)(this, Foo);
        return (0, _possibleConstructorReturn3.default)(this, (Foo.__proto__ || (0, _getPrototypeOf2.default)(Foo)).apply(this, arguments));
      }

      (0, _createClass3.default)(Foo, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement('div', null);
        }
      }]);
      return Foo;
    }(_react.Component);

    Foo.someStaticProperty = true;

    var decorated = (0, _withStyles2.default)('')(Foo);
    (0, _chai.expect)(decorated.someStaticProperty).to.equal(true);
  });

  (0, _mocha.it)('Does not hoist react statics of the composed component', function () {
    var Foo = function (_Component6) {
      (0, _inherits3.default)(Foo, _Component6);

      function Foo() {
        (0, _classCallCheck3.default)(this, Foo);
        return (0, _possibleConstructorReturn3.default)(this, (Foo.__proto__ || (0, _getPrototypeOf2.default)(Foo)).apply(this, arguments));
      }

      (0, _createClass3.default)(Foo, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement('div', null);
        }
      }]);
      return Foo;
    }(_react.Component);

    Foo.propTypes = true;

    var decorated = (0, _withStyles2.default)('')(Foo);
    (0, _chai.expect)(decorated.propTypes).to.not.equal(true);
  });
});