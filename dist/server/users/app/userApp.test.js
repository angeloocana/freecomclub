'use strict';

var _userApp = require('./userApp');

var _userApp2 = _interopRequireDefault(_userApp);

var _userRepository = require('../repository/userRepository');

var _userRepository2 = _interopRequireDefault(_userRepository);

var _ptzAssert = require('ptz-assert');

var _sinon = require('sinon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var userRepository, userApp;
describe('UserApp', function () {
    describe('save', function () {
        beforeEach(function () {
            userRepository = (0, _userRepository2.default)(null);
            userApp = (0, _userApp2.default)(userRepository);
            (0, _sinon.stub)(userRepository, 'save').returns({});
        });
        it('do not call repository if user is invalid', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                var user;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                user = { userName: '', email: '', displayName: '' };
                                _context.next = 3;
                                return userApp.save(user);

                            case 3:
                                (0, _ptzAssert.notOk)(userRepository.save['called']);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        });
        it('call repository if User is valid', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
                var user, userReturned;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                (0, _sinon.stub)(userRepository, 'getOtherUsersWithSameUserNameOrEmail').returns([]);
                                user = { userName: 'angeloocana', email: 'angeloocana@gmail.com', displayName: '' };
                                _context2.next = 4;
                                return userApp.save(user);

                            case 4:
                                userReturned = _context2.sent;

                                (0, _ptzAssert.ok)(userRepository.save['called']);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        });
    });
});