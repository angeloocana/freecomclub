function UserRepository(db) {
    function getUserDbCollection() {
        return db.collection('users');
    }
    function add({ userName, email, displayName }, callback) {
        getUserDbCollection()
            .insertOne({ userName, email, displayName }, callback);
    }
    function find(query, options, callback) {
        getUserDbCollection()
            .find(query, {}, options, callback);
    }
    function getByUserName(userName, callback) {
        getUserDbCollection()
            .findOne({ userName }, callback);
    }
    function getByEmail(email, callback) {
        getUserDbCollection()
            .findOne({ email }, callback);
    }
    return {
        add,
        find,
        getByUserName,
        getByEmail
    };
}
export default UserRepository;
