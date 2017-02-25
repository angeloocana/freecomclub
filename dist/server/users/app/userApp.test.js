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

                                (0, _ptzAssert.ok)(user.passwordHash, 'passwordHash not set');
                                (0, _ptzAssert.notOk)(user.password, 'password not empty');

                            case 6:
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
                                user = {
                                    userName: '',
                                    email: '',
                                    displayName: ''
                                };
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
                                user = {
                                    userName: 'angeloocana',
                                    email: 'angeloocana@gmail.com',
                                    displayName: ''
                                };
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
    describe('authenticateUser', function () {
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
                                return userApp.authenticateUser(userName, 'teste');

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
                                user = new _User2.default({ userName: 'angeloocana', email: '', displayName: '', password: password });
                                _context6.next = 4;
                                return userApp.hashPassword(user);

                            case 4:
                                user = _context6.sent;

                                (0, _sinon.stub)(userRepository, 'getByUserNameOrEmail').returns(user);
                                _context6.next = 8;
                                return userApp.authenticateUser(user.userName, 'incorrectPassword');

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
                                user = new _User2.default({ userName: 'angeloocana', email: 'alanmarcell@live.com', displayName: '', password: password });
                                _context7.next = 4;
                                return userApp.hashPassword(user);

                            case 4:
                                user = _context7.sent;

                                (0, _sinon.stub)(userRepository, 'getByUserNameOrEmail').returns(user);
                                _context7.next = 8;
                                return userApp.authenticateUser(user.userName, password);

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
    describe('getAuthToken', function () {
        beforeEach(function () {
            userRepository = (0, _userRepository2.default)(null);
            userApp = (0, _userApp2.default)(userRepository);
        });
        it('When user is valid password generate token', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee8() {
                var user, userToken;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                user = new _User2.default({
                                    userName: 'lnsilva',
                                    email: 'lucas.neris@globalpoints.com.br', displayName: 'Lucas Neris',
                                    password: '123456'
                                });
                                _context8.next = 3;
                                return userApp.hashPassword(user);

                            case 3:
                                user = _context8.sent;

                                (0, _sinon.stub)(userRepository, 'getByUserNameOrEmail').returns(user);
                                _context8.next = 7;
                                return userApp.getAuthToken('lnsilva', '123456');

                            case 7:
                                userToken = _context8.sent;

                                (0, _ptzAssert.ok)(userToken.accessToken, 'Empty Token');

                            case 9:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));
        });
        it('When user is invalid password does not generate token', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee9() {
                var user, userToken;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                user = _User2.default.getUserAthenticationError('');

                                (0, _sinon.stub)(userRepository, 'getByUserNameOrEmail').returns(null);
                                _context9.next = 4;
                                return userApp.getAuthToken('lnsilva', '123456');

                            case 4:
                                userToken = _context9.sent;

                                (0, _ptzAssert.notOk)(userToken.accessToken, 'Not Empty Token');

                            case 6:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));
        });
    });
    describe('verifyAuthToken', function () {
        beforeEach(function () {
            userRepository = (0, _userRepository2.default)(null);
            userApp = (0, _userApp2.default)(userRepository);
        });
        it('Invalid token throws exception', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee10() {
                var hasError, userByToken;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                hasError = false;
                                _context10.prev = 1;
                                _context10.next = 4;
                                return userApp.verifyAuthToken('Invalid_Token');

                            case 4:
                                userByToken = _context10.sent;
                                _context10.next = 10;
                                break;

                            case 7:
                                _context10.prev = 7;
                                _context10.t0 = _context10['catch'](1);

                                hasError = true;

                            case 10:
                                (0, _ptzAssert.ok)(hasError);

                            case 11:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this, [[1, 7]]);
            }));
        });
        it('Valid token return user', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee11() {
                var user, userToken, userByToken;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                user = new _User2.default({
                                    userName: 'lnsilva',
                                    email: 'lucas.neris@globalpoints.com.br',
                                    displayName: 'Lucas Neris',
                                    password: '123456'
                                });
                                _context11.next = 3;
                                return userApp.hashPassword(user);

                            case 3:
                                user = _context11.sent;

                                (0, _sinon.stub)(userRepository, 'getByUserNameOrEmail').returns(user);
                                _context11.next = 7;
                                return userApp.getAuthToken('lnsilva', '123456');

                            case 7:
                                userToken = _context11.sent;

                                (0, _ptzAssert.ok)(userToken.accessToken, 'Empty Token');
                                _context11.next = 11;
                                return userApp.verifyAuthToken(userToken.accessToken);

                            case 11:
                                userByToken = _context11.sent;

                                (0, _ptzAssert.equal)(userByToken.id, user.id, 'User Id dont match');
                                (0, _ptzAssert.equal)(userByToken.email, user.email, 'User Id dont match');
                                (0, _ptzAssert.equal)(userByToken.userName, user.userName, 'User Id dont match');
                                (0, _ptzAssert.equal)(userByToken.displayName, user.displayName, 'User Id dont match');

                            case 16:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));
        });
    });
});