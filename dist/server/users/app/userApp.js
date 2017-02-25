'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _User = require('../domain/User');

var _User2 = _interopRequireDefault(_User);

var _bcryptjs = require('bcryptjs');

var _jwtSimple = require('jwt-simple');

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

function UserApp(userRepository) {
    var tokenSecret, passwordSalt;
    passwordSalt = tokenSecret = process.env.PASSWORD_SALT;
    function hashPassword(user) {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (user.password) {
                                _context.next = 2;
                                break;
                            }

                            return _context.abrupt('return', Promise.resolve(user));

                        case 2:
                            if (passwordSalt) {
                                _context.next = 4;
                                break;
                            }

                            throw 'passwordSalt not added to process.env.';

                        case 4:
                            _context.next = 6;
                            return (0, _bcryptjs.hash)(user.password, passwordSalt);

                        case 6:
                            user.passwordHash = _context.sent;

                            user.password = undefined;
                            return _context.abrupt('return', Promise.resolve(user));

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    }
    function save(user) {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
            var isUpdate, otherUsers, users, userDb;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            isUpdate = !!user.id;

                            user = new _User2.default(user);
                            _context2.next = 4;
                            return hashPassword(user);

                        case 4:
                            user = _context2.sent;

                            if (user.isValid()) {
                                _context2.next = 7;
                                break;
                            }

                            return _context2.abrupt('return', Promise.resolve(user));

                        case 7:
                            _context2.next = 9;
                            return userRepository.getOtherUsersWithSameUserNameOrEmail(user);

                        case 9:
                            otherUsers = _context2.sent;

                            if (!user.otherUsersWithSameUserNameOrEmail(otherUsers)) {
                                _context2.next = 12;
                                break;
                            }

                            return _context2.abrupt('return', Promise.resolve(user));

                        case 12:
                            if (!isUpdate) {
                                _context2.next = 18;
                                break;
                            }

                            _context2.next = 15;
                            return userRepository.getByIds([user.id]);

                        case 15:
                            users = _context2.sent;
                            userDb = new _User2.default(users[0]);

                            user = userDb.update(user);

                        case 18:
                            _context2.next = 20;
                            return userRepository.save(user);

                        case 20:
                            user = _context2.sent;
                            return _context2.abrupt('return', Promise.resolve(user));

                        case 22:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));
    }
    function find(query, _ref) {
        var limit = _ref.limit;

        return userRepository.find(query, { limit: limit });
    }
    function authenticateUser(userNameOrEmail, password) {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
            var user, userError, res;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return userRepository.getByUserNameOrEmail(userNameOrEmail);

                        case 2:
                            user = _context3.sent;
                            userError = _User2.default.getUserAthenticationError(userNameOrEmail);

                            if (user) {
                                _context3.next = 6;
                                break;
                            }

                            return _context3.abrupt('return', Promise.resolve(userError));

                        case 6:
                            _context3.next = 8;
                            return (0, _bcryptjs.compare)(password, user.passwordHash);

                        case 8:
                            res = _context3.sent;

                            if (!res) {
                                _context3.next = 13;
                                break;
                            }

                            return _context3.abrupt('return', Promise.resolve(user));

                        case 13:
                            return _context3.abrupt('return', Promise.resolve(userError));

                        case 14:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));
    }
    function getAuthToken(userNameOrEmail, password) {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee4() {
            var user;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return authenticateUser(userNameOrEmail, password);

                        case 2:
                            user = _context4.sent;

                            if (user.isValid()) user.accessToken = (0, _jwtSimple.encode)(user, tokenSecret);
                            return _context4.abrupt('return', Promise.resolve(user));

                        case 5:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));
    }
    function verifyAuthToken(token) {
        var user = (0, _jwtSimple.decode)(token, passwordSalt);
        return Promise.resolve(user);
    }
    return {
        save: save,
        find: find,
        getAuthToken: getAuthToken,
        verifyAuthToken: verifyAuthToken,
        hashPassword: hashPassword,
        authenticateUser: authenticateUser
    };
}
exports.default = UserApp;