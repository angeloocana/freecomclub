import UserRepository from './userRepository';
function UserApp(db) {
    var userRepository = UserRepository(db);
    function add(user, callback) {
        userRepository.add(user, callback);
    }
    function find(query, { limit }, callback) {
        userRepository.find(query, { limit }, callback);
    }
    function getAuthToken(userNameOrEmail, password) {
    }
    function verifyAuthToken(token) {
    }
    return {
        add,
        find,
        getAuthToken,
        verifyAuthToken
    };
}
export default UserApp;
