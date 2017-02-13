'use strict';

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _ptzAssert = require('ptz-assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('User', function () {
    describe('UserName', function () {
        it('Add error when empty username', function () {
            var user = new _User2.default({ userName: '', email: '', displayName: '' });
            (0, _ptzAssert.contains)(user.errors, 'ERROR_USER_USERNAME_REQUIRED');
        });
        it('Do not add error when valid username', function () {
            var user = new _User2.default({ userName: 'angeloocana', email: '', displayName: '' });
            (0, _ptzAssert.notContains)(user.errors, 'ERROR_USER_USERNAME_REQUIRED');
        });
    });
    describe('Email', function () {
        it('Add error when empty email', function () {
            var user = new _User2.default({ userName: '', email: '', displayName: '' });
            (0, _ptzAssert.contains)(user.errors, 'ERROR_USER_EMAIL_REQUIRED');
        });
        it('Add error when invalid email', function () {
            var user = new _User2.default({ userName: '', email: 'angeloocanagmail.com', displayName: '' });
            (0, _ptzAssert.contains)(user.errors, 'ERROR_USER_EMAIL_INVALID');
        });
        it('Do not add error when valid email', function () {
            var user = new _User2.default({ userName: 'angeloocana', email: 'angeloocana@gmail.com', displayName: '' });
            (0, _ptzAssert.notContains)(user.errors, 'ERROR_USER_EMAIL_REQUIRED');
            (0, _ptzAssert.notContains)(user.errors, 'ERROR_USER_EMAIL_INVALID');
        });
    });
});