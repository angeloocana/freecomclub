'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _User = require('../domain/User');

var _User2 = _interopRequireDefault(_User);

var _bcryptjs = require('bcryptjs');

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
    function hashPassword(user) {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            var salt;
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
                            salt = process.env.PASSWORD_SALT;

                            if (salt) {
                                _context.next = 5;
                                break;
                            }

                            throw 'passwordSalt not added to process.env.';

                        case 5:
                            _context.next = 7;
                            return (0, _bcryptjs.hash)(user.password, salt);

                        case 7:
                            user.passwordHash = _context.sent;

                            user.password = undefined;
                            return _context.abrupt('return', Promise.resolve(user));

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    }
    function save(user) {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
            var otherUsers;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            user = new _User2.default(user);
                            _context2.next = 3;
                            return hashPassword(user);

                        case 3:
                            user = _context2.sent;

                            if (user.isValid()) {
                                _context2.next = 6;
                                break;
                            }

                            return _context2.abrupt('return', Promise.resolve(user));

                        case 6:
                            _context2.next = 8;
                            return userRepository.getOtherUsersWithSameUserNameOrEmail(user);

                        case 8:
                            otherUsers = _context2.sent;

                            if (!user.otherUsersWithSameUserNameOrEmail(otherUsers)) {
                                _context2.next = 11;
                                break;
                            }

                            return _context2.abrupt('return', Promise.resolve(user));

                        case 11:
                            _context2.next = 13;
                            return userRepository.save(user);

                        case 13:
                            user = _context2.sent;
                            return _context2.abrupt('return', Promise.resolve(user));

                        case 15:
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
    function getAuthToken(userNameOrEmail, password) {
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
                            userError = new _User2.default({
                                userName: userNameOrEmail,
                                email: '',
                                displayName: '',
                                errors: ['ERROR_USER_INVALID_USERNAME_OR_PASSWORD']
                            });

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
    function verifyAuthToken(token) {}
    return {
        save: save,
        find: find,
        getAuthToken: getAuthToken,
        verifyAuthToken: verifyAuthToken,
        hashPassword: hashPassword
    };
}
exports.default = UserApp;