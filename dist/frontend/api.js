'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('jquery');

var _ServerActions = require('./actions/ServerActions');

var _ServerActions2 = _interopRequireDefault(_ServerActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = {
    fetchLinks: function fetchLinks() {
        console.log('1. In API');
        (0, _jquery.post)('/graphql', {
            query: '{\n                links {\n                    _id,\n                    title,\n                    url\n                }\n            }'
        }).done(function (resp) {
            console.log(resp);
            _ServerActions2.default.receiveLinks(resp.data.links);
        });
    }
};
exports.default = API;