'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppDispatcher = require('../AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constants = require('../Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServerActions = {
    receiveLinks: function receiveLinks(links) {
        console.log('2. In Server Actions');
        _AppDispatcher2.default.dispatch({
            actionType: _Constants.ActionTypes.RECEIVE_LINKS,
            links: links
        });
    }
};
exports.default = ServerActions;