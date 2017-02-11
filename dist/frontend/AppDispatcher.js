'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flux = require('flux');

var _flux2 = _interopRequireDefault(_flux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppDispatcher = new _flux2.default.Dispatcher();
exports.default = AppDispatcher;