'use strict';

var _userApp = require('./userApp');

var _userApp2 = _interopRequireDefault(_userApp);

var _userRepository = require('../repository/userRepository');

var _userRepository2 = _interopRequireDefault(_userRepository);

var _ptzAssert = require('ptz-assert');

var _sinon = require('sinon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRepository = (0, _userRepository2.default)(null);
var userApp = (0, _userApp2.default)(userRepository);
(0, _sinon.stub)(userRepository, 'save').returns({});
describe('UserApp', function () {
    describe('save', function () {
        it('throw error if user is invalid', function () {
            (0, _ptzAssert.throws)(function () {
                var user = { userName: '', email: '', displayName: '' };
                userApp.save(user);
            });
        });
        it('call repository if User is valid', function () {
            var user = { userName: 'angeloocana', email: 'angeloocana@gmail.com', displayName: '' };
            userApp.save(user);
            (0, _ptzAssert.ok)(userRepository.save['called']);
        });
    });
});