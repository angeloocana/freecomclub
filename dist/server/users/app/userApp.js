'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _User = require('../domain/User');

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
                            _context.prev = 0;

                            user = new _User2.default(user);
                            user.throwErrorIfIsInvalid();
                            _context.next = 5;
                            return userRepository.getOtherUsersWithSameUserNameOrEmail(user);

                        case 5:
                            otherUsers = _context.sent;

                            console.log('otherUsers', otherUsers);
                            user.validateOtherUsersWithSameUserNameOrEmail(otherUsers);
                            console.log('user after other users validation', user);
                            user.throwErrorIfIsInvalid();
                            console.log('before save');
                            _context.next = 13;
                            return userRepository.save(user);

                        case 13:
                            user = _context.sent;
                            _context.next = 19;
                            break;

                        case 16:
                            _context.prev = 16;
                            _context.t0 = _context['catch'](0);

                            console.log('catch err', _context.t0);

                        case 19:
                            _context.prev = 19;
                            return _context.abrupt('return', Promise.resolve(user));

                        case 22:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 16, 19, 22]]);
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