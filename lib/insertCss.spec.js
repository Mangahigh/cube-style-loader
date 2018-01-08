'use strict';

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _mocha = require('mocha');

var _chai = require('chai');

var _insertCss = require('./insertCss');

var _insertCss2 = _interopRequireDefault(_insertCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions, react/no-multi-comp */
global.document = _jsdom2.default.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

(0, _mocha.describe)('insertCss(styles, options)', function () {
  (0, _mocha.it)('Should insert and remove <style> element', function () {
    var css = 'body { color: red; }';
    var removeCss = (0, _insertCss2.default)([[1, css]]);
    var style = global.document.getElementById('s1-0');
    (0, _chai.expect)(style).to.be.ok;
    (0, _chai.expect)(style.textContent).to.be.equal(css);
    (0, _chai.expect)(removeCss).to.be.func;
    removeCss();
    style = global.document.getElementById('s1-0');
    (0, _chai.expect)(style).to.be.null;
  });

  (0, _mocha.it)('Should insert and remove multiple <style> elements for a single module', function () {
    var css1 = 'body { color: red; }';
    var css2 = 'body { color: blue; }';
    var removeCss = (0, _insertCss2.default)([[1, css1], [1, css2]]);
    var style = global.document.getElementsByTagName('style');
    (0, _chai.expect)(style.length).to.be.equal(2);
    (0, _chai.expect)(style[0].textContent).to.be.equal(css1);
    (0, _chai.expect)(style[1].textContent).to.be.equal(css2);
    (0, _chai.expect)(removeCss).to.be.func;
    removeCss();
    style = global.document.getElementsByTagName('style');
    (0, _chai.expect)(style.length).to.be.equal(0);
  });
});