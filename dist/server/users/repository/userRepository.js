'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function UserRepository(db) {
    function getUserDbCollection() {
        return db.collection('users');
    }
    function add(_ref) {
        var userName = _ref.userName,
            email = _ref.email,
            displayName = _ref.displayName;

        return getUserDbCollection().insertOne({ userName: userName, email: email, displayName: displayName });
    }
    function find(query, options) {
        var result = getUserDbCollection().find(query, {}, options).toArray();
        return result;
    }
    function getByUserName(userName) {
        return getUserDbCollection().findOne({ userName: userName });
    }
    function getByEmail(email) {
        return getUserDbCollection().findOne({ email: email });
    }
    return {
        add: add,
        find: find,
        getByUserName: getByUserName,
        getByEmail: getByEmail
    };
}
exports.default = UserRepository;