import UserRepository from '../repository/userRepository';

interface IUserApp {
    add(user: IUser, callback: (err, user: IUser) => void);
    find(query: any, options: { limit: number }, callback: (err, user: IUser[]) => void);

    getAuthToken(userNameOrEmail, password);
    verifyAuthToken(token);
}

function UserApp(db): IUserApp {

    var userRepository = UserRepository(db);


    function add(user: IUser,
        callback: (err, user: IUser) => void) {
        userRepository.add(user, callback);
    }

    function find(query, {limit}, callback) {
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
    }
}

export default UserApp;
