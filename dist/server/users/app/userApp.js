'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userRepository = require('./userRepository');

var _userRepository2 = _interopRequireDefault(_userRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserApp(db) {
    var userRepository = (0, _userRepository2.default)(db);
    function add(user, callback) {
        userRepository.add(user, callback);
    }
    function find(query, _ref, callback) {
        var limit = _ref.limit;

        userRepository.find(query, { limit: limit }, callback);
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