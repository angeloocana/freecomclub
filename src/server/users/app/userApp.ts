import User from '../domain/User';

interface IUserApp {
    save(user: IUser):Promise<IUser>;
    find(query: any, options: { limit: number }):Promise<IUser[]>;

    getAuthToken(userNameOrEmail, password);
    verifyAuthToken(token);
}

function UserApp(userRepository:IUserRepository): IUserApp {

    async function save(user: IUser):Promise<IUser>{
        try{
            user = new User(user);
            user.throwErrorIfIsInvalid();

            var otherUsers = await userRepository.getOtherUsersWithSameUserNameOrEmail(user);

            console.log('otherUsers', otherUsers);

            user.validateOtherUsersWithSameUserNameOrEmail(otherUsers);
            console.log('user after other users validation', user);
            user.throwErrorIfIsInvalid();
            console.log('before save');
            user = await userRepository.save(user);
        }
        catch(err){
            console.log('catch err', err);
        }
        finally{
            return Promise.resolve(user);       
        }
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
