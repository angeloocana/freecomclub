'use strict';

var _userApp = require('./userApp');

var _userApp2 = _interopRequireDefault(_userApp);

var _ptzAssert = require('ptz-assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = null;
var userApp = (0, _userApp2.default)(db);
describe('UserApp', function () {
    describe('add', function () {
        it('throw error if user is invalid', function () {
            (0, _ptzAssert.throws)(function () {
                var user = {};
                userApp.add(user);
            });
        });
        it('call repository if User is valid');
    });
});