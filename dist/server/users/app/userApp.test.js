'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _userApp = require('./userApp');

var _userApp2 = _interopRequireDefault(_userApp);

var _User = require('../domain/User');

var _User2 = _interopRequireDefault(_User);

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

_dotenv2.default.config();

var userRepository, userApp;
var userRepositorySaveCalls = 0;
describe('UserApp', function () {
    describe('save', function () {
        beforeEach(function () {
            userRepositorySaveCalls = 0;
            userRepository = (0, _userRepository2.default)(null);
            userRepository.save = function (user) {
                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    userRepositorySaveCalls++;
                                    return _context.abrupt('return', Promise.resolve(user));

                                case 2:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            };
            (0, _sinon.stub)(userRepository, 'getOtherUsersWithSameUserNameOrEmail').returns([]);
            userApp = (0, _userApp2.default)(userRepository);
        });
        it('hash password', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
                var user;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                user = {
                                    userName: 'angeloocana',
                                    email: 'angeloocana@gmail.com',
                                    displayName: 'Ângelo Ocanã',
                                    password: 'testPassword'
                                };
                                _context2.next = 3;
                                return userApp.save(user);

                            case 3:
                                user = _context2.sent;

                                console.log('user.passwordHash-----', user.passwordHash);
                                (0, _ptzAssert.ok)(user.passwordHash, 'passwordHash not set');
                                (0, _ptzAssert.notOk)(user.password, 'password not empty');

                            case 7:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        });
        it('do not call repository if user is invalid', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
                var user;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                user = { userName: '', email: '', displayName: '' };
                                _context3.next = 3;
                                return userApp.save(user);

                            case 3:
                                (0, _ptzAssert.equal)(userRepositorySaveCalls, 0);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        });
        it('call repository if User is valid', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee4() {
                var user;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                user = { userName: 'angeloocana', email: 'angeloocana@gmail.com', displayName: '' };
                                _context4.next = 3;
                                return userApp.save(user);

                            case 3:
                                (0, _ptzAssert.equal)(userRepositorySaveCalls, 1);

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        });
    });
    describe('getAuthToken', function () {
        beforeEach(function () {
            userRepository = (0, _userRepository2.default)(null);
            userApp = (0, _userApp2.default)(userRepository);
        });
        it('User not found should return user with error', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee5() {
                var userName, user;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                userName = 'angeloocana';

                                (0, _sinon.stub)(userRepository, 'getByUserNameOrEmail').returns(null);
                                _context5.next = 4;
                                return userApp.getAuthToken(userName, 'teste');

                            case 4:
                                user = _context5.sent;

                                (0, _ptzAssert.contains)(user.errors, 'ERROR_USER_INVALID_USERNAME_OR_PASSWORD');

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        });
        it('User found but incorrect password should return user with error', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee6() {
                var password, user;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                password = 'testeteste';
                                user = new _User2.default({
                                    userName: 'angeloocana',
                                    email: '',
                                    displayName: '',
                                    password: password
                                });
                                _context6.next = 4;
                                return userApp.hashPassword(user);

                            case 4:
                                user = _context6.sent;

                                (0, _sinon.stub)(userRepository, 'getByUserNameOrEmail').returns(user);
                                _context6.next = 8;
                                return userApp.getAuthToken(user.userName, 'incorrectPassword');

                            case 8:
                                user = _context6.sent;

                                (0, _ptzAssert.contains)(user.errors, 'ERROR_USER_INVALID_USERNAME_OR_PASSWORD');

                            case 10:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        });
        it('User found and correct password should return the user', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee7() {
                var password, user;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                password = 'testeteste';
                                user = new _User2.default({
                                    userName: 'angeloocana',
                                    email: 'alanmarcell@live.com',
                                    displayName: '',
                                    password: password
                                });
                                _context7.next = 4;
                                return userApp.hashPassword(user);

                            case 4:
                                user = _context7.sent;

                                (0, _sinon.stub)(userRepository, 'getByUserNameOrEmail').returns(user);
                                _context7.next = 8;
                                return userApp.getAuthToken(user.userName, password);

                            case 8:
                                user = _context7.sent;

                                (0, _ptzAssert.ok)(user);
                                (0, _ptzAssert.emptyArray)(user.errors);

                            case 11:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));
        });
    });
});