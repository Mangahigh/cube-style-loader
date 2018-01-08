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

  var insertCssPath = _path2.default.join(__dirname, './insertCss.js');
  return '\n    var content = require(' + (0, _loaderUtils.stringifyRequest)(this, '!!' + remainingRequest) + ');\n    // var insertCss = require(' + (0, _loaderUtils.stringifyRequest)(this, '!' + insertCssPath) + ');\n\n    if (typeof content === \'string\') {\n      content = [[module.id, content, \'\']];\n    }\n\n    module.exports = content.locals || {};\n    module.exports._getContent = function() { return content; };\n    module.exports._getCss = function() { return content.toString(); };\n    module.exports._insertCss = function(options, insertCss) {\n      return insertCss(content, options, module.id);\n    };\n    // module.exports._insertCss = function(options) { return insertCss(content, options, module.id) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (module.hot && typeof window !== \'undefined\' && window.document) {\n      var removeCss = function() {};\n      module.hot.accept(' + (0, _loaderUtils.stringifyRequest)(this, '!!' + remainingRequest) + ', function() {\n        content = require(' + (0, _loaderUtils.stringifyRequest)(this, '!!' + remainingRequest) + ');\n\n        if (typeof content === \'string\') {\n          content = [[module.id, content, \'\']];\n        }\n\n        removeCss = insertCss(content, { replace: true });\n      });\n      module.hot.dispose(function() { removeCss(); });\n    }\n  ';
};