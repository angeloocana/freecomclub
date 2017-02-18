import User from '../domain/User';
import { hash, compare } from 'bcrypt';

interface IUserApp {
    save(user: IUser): Promise<IUser>;
    find(query: any, options: { limit: number }): Promise<IUser[]>;

    getAuthToken(userNameOrEmail, password);
    verifyAuthToken(token);
    hashPassword(user: IUser): Promise<IUser>;
}

function UserApp(userRepository: IUserRepository): IUserApp {

    async function hashPassword(user: IUser): Promise<IUser> {
        if (!user.password)
            return Promise.resolve(user);

        var salt = process.env.PASSWORD_SALT;
        if (!salt)
            throw 'passwordSalt not added to process.env.';

        user.passwordHash = await hash(user.password, salt);
        user.password = undefined;

        return Promise.resolve(user);
    }

    async function save(user: IUser): Promise<IUser> {
        user = new User(user);

        user = await hashPassword(user);

        if (!user.isValid())
            return Promise.resolve(user);

        var otherUsers = await userRepository.getOtherUsersWithSameUserNameOrEmail(user);

        if (user.otherUsersWithSameUserNameOrEmail(otherUsers))
            return Promise.resolve(user);

        user = await userRepository.save(user);

        return Promise.resolve(user);
    }

    function find(query, {limit}) {
        return userRepository.find(query, { limit });
    }

    async function getAuthToken(userNameOrEmail, password) {
        var user = await userRepository.getByUserNameOrEmail(userNameOrEmail);
        var userError = new User({
            userName: userNameOrEmail,
            email: '',
            displayName: '',
            errors: ['ERROR_USER_INVALID_USERNAME_OR_PASSWORD']
        });

        if (!user) 
            return Promise.resolve(userError);
        
        var res = await compare(password, user.passwordHash);

        if (res)
            return Promise.resolve(user);
        else
            return Promise.resolve(userError);
    }

    function verifyAuthToken(token) {

    }

    return {
        save,
        find,
        getAuthToken,
        verifyAuthToken,
        hashPassword
    }
}

export default UserApp;
