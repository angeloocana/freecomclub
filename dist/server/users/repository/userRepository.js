'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function UserRepository(db) {
    function getUserDbCollection() {
        return db.collection('users');
    }
    function add(_ref, callback) {
        var userName = _ref.userName,
            email = _ref.email,
            displayName = _ref.displayName;

        getUserDbCollection().insertOne({ userName: userName, email: email, displayName: displayName }, callback);
    }
    function find(query, options, callback) {
        getUserDbCollection().find(query, {}, options, callback);
    }
    function getByUserName(userName, callback) {
        getUserDbCollection().findOne({ userName: userName }, callback);
    }
    function getByEmail(email, callback) {
        getUserDbCollection().findOne({ email: email }, callback);
    }
    return {
        add: add,
        find: find,
        getByUserName: getByUserName,
        getByEmail: getByEmail
    };
}
exports.default = UserRepository;