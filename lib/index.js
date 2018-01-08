'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require('loader-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function loader() {};
module.exports.pitch = function pitch(remainingRequest) {
  if (this.cacheable) {
    this.cacheable();
  }

  const insertCssPath = _path2.default.join(__dirname, './insertCss.js');
  return `
    var content = require(${(0, _loaderUtils.stringifyRequest)(this, `!!${remainingRequest}`)});
    // var insertCss = require(${(0, _loaderUtils.stringifyRequest)(this, `!${insertCssPath}`)});

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options, insertCss) {
      return insertCss(content, options, module.id);
    };
    // module.exports._insertCss = function(options) { return insertCss(content, options, module.id) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(${(0, _loaderUtils.stringifyRequest)(this, `!!${remainingRequest}`)}, function() {
        content = require(${(0, _loaderUtils.stringifyRequest)(this, `!!${remainingRequest}`)});

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  `;
};