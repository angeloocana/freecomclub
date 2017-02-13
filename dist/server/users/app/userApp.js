'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userRepository = require('../repository/userRepository');

var _userRepository2 = _interopRequireDefault(_userRepository);

var _User = require('../domain/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserApp(db) {
    var userRepository = (0, _userRepository2.default)(db);
    function add(user) {
        user = new _User2.default(user);
        user.throwErrorIfIsInvalid();
        return userRepository.add(user);
    }
    function find(query, _ref) {
        var limit = _ref.limit;

        return userRepository.find(query, { limit: limit });
    }
    function getAuthToken(userNameOrEmail, password) {}
    function verifyAuthToken(token) {}
    return {
        add: add,
        find: find,
        getAuthToken: getAuthToken,
        verifyAuthToken: verifyAuthToken
    };
}
exports.default = UserApp;