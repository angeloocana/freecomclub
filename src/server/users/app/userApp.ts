import UserRepository from '../repository/userRepository';
import User from '../domain/User';

interface IUserApp {
    add(user: IUser):Promise<IUser>;
    find(query: any, options: { limit: number }):Promise<IUser[]>;

    getAuthToken(userNameOrEmail, password);
    verifyAuthToken(token);
}

function UserApp(db): IUserApp {

    var userRepository = UserRepository(db);


    function add(user: IUser):Promise<IUser>{
        user = new User(user);
        user.throwErrorIfIsInvalid();
        return userRepository.add(user);
    }

    function find(query, {limit}) {
        return userRepository.find(query, { limit });
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
