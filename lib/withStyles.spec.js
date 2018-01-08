'use strict';

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

(0, _mocha.describe)('withStyles(...styles)(WrappedComponent)', () => {
  (0, _mocha.it)('Should call insetCss and removeCss functions provided by context', done => {
    class Provider extends _react.Component {
      getChildContext() {
        return { insertCss: this.props.insertCss };
      }

      render() {
        return _react.Children.only(this.props.children);
      }
    }

    Provider.propTypes = {
      insertCss: _propTypes2.default.func.isRequired,
      children: _propTypes2.default.node.isRequired
    };

    Provider.childContextTypes = {
      insertCss: _propTypes2.default.func.isRequired
    };

    class Foo extends _react.Component {
      render() {
        return _react2.default.createElement('div', null);
      }
    }

    const FooWithStyles = (0, _withStyles2.default)('')(Foo);
    const insertCss = _sinon2.default.spy(() => done);
    const container = document.createElement('div');

    _reactDom2.default.render(_react2.default.createElement(
      Provider,
      { insertCss: insertCss },
      _react2.default.createElement(FooWithStyles, null)
    ), container);
    _reactDom2.default.unmountComponentAtNode(container);
    (0, _chai.expect)(insertCss.calledOnce).to.be.true;
  });

  (0, _mocha.it)('Should set the displayName correctly', () => {
    (0, _chai.expect)((0, _withStyles2.default)('')(class Foo extends _react.Component {
      render() {
        return _react2.default.createElement('div', null);
      }
    }).displayName).to.equal('WithStyles(Foo)');

    (0, _chai.expect)((0, _withStyles2.default)('')((0, _createReactClass2.default)({
      displayName: 'Bar',
      render() {
        return _react2.default.createElement('div', null);
      }
    })).displayName).to.equal('WithStyles(Bar)');

    (0, _chai.expect)((0, _withStyles2.default)('')((0, _createReactClass2.default)({
      render() {
        return _react2.default.createElement('div', null);
      }
    })).displayName).to.be.oneOf(['WithStyles(Component)', 'WithStyles(Constructor)']);
  });

  (0, _mocha.it)('Should expose the component with styles as ComposedComponent', () => {
    class Container extends _react.Component {
      render() {
        return _react2.default.createElement('div', null);
      }
    }

    const decorated = (0, _withStyles2.default)('')(Container);
    (0, _chai.expect)(decorated.ComposedComponent).to.equal(Container);
  });

  (0, _mocha.it)('Hoists non-react statics of the composed component', () => {
    class Foo extends _react.Component {
      render() {
        return _react2.default.createElement('div', null);
      }
    }
    Foo.someStaticProperty = true;

    const decorated = (0, _withStyles2.default)('')(Foo);
    (0, _chai.expect)(decorated.someStaticProperty).to.equal(true);
  });

  (0, _mocha.it)('Does not hoist react statics of the composed component', () => {
    class Foo extends _react.Component {
      render() {
        return _react2.default.createElement('div', null);
      }
    }
    Foo.propTypes = true;

    const decorated = (0, _withStyles2.default)('')(Foo);
    (0, _chai.expect)(decorated.propTypes).to.not.equal(true);
  });
});