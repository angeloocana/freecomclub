"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _User = require("../domain/User");

var _User2 = _interopRequireDefault(_User);

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
    function save(user) {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            var otherUsers;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            user = new _User2.default(user);

                            if (user.isValid()) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt("return", Promise.resolve(user));

                        case 3:
                            _context.next = 5;
                            return userRepository.getOtherUsersWithSameUserNameOrEmail(user);

                        case 5:
                            otherUsers = _context.sent;

                            if (!user.otherUsersWithSameUserNameOrEmail(otherUsers)) {
                                _context.next = 8;
                                break;
                            }

                            return _context.abrupt("return", Promise.resolve(user));

                        case 8:
                            _context.next = 10;
                            return userRepository.save(user);

                        case 10:
                            user = _context.sent;

                        case 11:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    }
    function find(query, _ref) {
        var limit = _ref.limit;

        return userRepository.find(query, { limit: limit });
    }
    function getAuthToken(userNameOrEmail, password) {}
    function verifyAuthToken(token) {}
    return {
        save: save,
        find: find,
        getAuthToken: getAuthToken,
        verifyAuthToken: verifyAuthToken
    };
}
exports.default = UserApp;