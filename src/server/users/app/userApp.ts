import User from '../domain/User';

interface IUserApp {
    save(user: IUser):Promise<IUser>;
    find(query: any, options: { limit: number }):Promise<IUser[]>;

    getAuthToken(userNameOrEmail, password);
    verifyAuthToken(token);
}

function UserApp(userRepository:IUserRepository): IUserApp {

    async function save(user: IUser):Promise<IUser>{
        user = new User(user);

        if(!user.isValid())
            return Promise.resolve(user);       

        var otherUsers = await userRepository.getOtherUsersWithSameUserNameOrEmail(user);

        if(user.otherUsersWithSameUserNameOrEmail(otherUsers))
            return Promise.resolve(user);       

        user = await userRepository.save(user);
    }

    function find(query, {limit}) {
        return userRepository.find(query, { limit });
    }

    function getAuthToken(userNameOrEmail, password) {

    }

    function verifyAuthToken(token) {

    }

    return {
        save,
        find,
        getAuthToken,
        verifyAuthToken
    }
}

export default UserApp;
