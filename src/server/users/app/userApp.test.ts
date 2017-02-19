import dotenv from 'dotenv';
dotenv.config();

import UserApp from './userApp';
import User from '../domain/User';
import UserRepository from '../repository/userRepository';
import {
    ok,
    notOk,
    throws,
    equal,
    contains,
    notContains,
    emptyArray
} from 'ptz-assert';
import {stub} from 'sinon';

var userRepository : IUserRepository,
    userApp : IUserApp;
var userRepositorySaveCalls = 0;

describe('UserApp', () => {
    describe('save', () => {
        beforeEach(() => {
            userRepositorySaveCalls = 0;
            userRepository = UserRepository(null);

            userRepository.save = async function (user) {
                userRepositorySaveCalls++;
                return Promise.resolve(user);
            };

            stub(userRepository, 'getOtherUsersWithSameUserNameOrEmail').returns([]);
            userApp = UserApp(userRepository);
        });

        it('hash password', async() => {
            var user : IUserArgs = {
                userName: 'angeloocana',
                email: 'angeloocana@gmail.com',
                displayName: 'Ângelo Ocanã',
                password: 'testPassword'
            };

            user = await userApp.save(user);

            ok(user.passwordHash, 'passwordHash not set');
            notOk(user.password, 'password not empty');
        });

        it('do not call repository if user is invalid', async() => {
            var user = {
                userName: '',
                email: '',
                displayName: ''
            };
            await userApp.save(user);
            equal(userRepositorySaveCalls, 0);
        });

        it('call repository if User is valid', async() => {
            var user : IUserArgs = {
                userName: 'angeloocana',
                email: 'angeloocana@gmail.com',
                displayName: ''
            };
            await userApp.save(user);
            equal(userRepositorySaveCalls, 1);
        });
    });

    describe('getAuthToken', () => {
        beforeEach(() => {
            userRepository = UserRepository(null);
            userApp = UserApp(userRepository);
        });

        it('User not found should return user with error', async() => {
            var userName = 'angeloocana';
            stub(userRepository, 'getByUserNameOrEmail').returns(null);

            var user = await userApp.getAuthToken(userName, 'teste');

            contains(user.errors, 'ERROR_USER_INVALID_USERNAME_OR_PASSWORD');
        });

        it('User found but incorrect password should return user with error', async() => {
            var password = 'testeteste';

            var user = new User({userName: 'angeloocana', email: '', displayName: '', password});

            user = await userApp.hashPassword(user);

            stub(userRepository, 'getByUserNameOrEmail').returns(user);

            user = await userApp.getAuthToken(user.userName, 'incorrectPassword');

            contains(user.errors, 'ERROR_USER_INVALID_USERNAME_OR_PASSWORD');

        });
        it('User found and correct password should return the user', async() => {
            var password = 'testeteste';

            var user = new User({userName: 'angeloocana', email: 'alanmarcell@live.com', displayName: '', password});

            user = await userApp.hashPassword(user);

            stub(userRepository, 'getByUserNameOrEmail').returns(user);

            user = await userApp.getAuthToken(user.userName, password);

            ok(user);
            emptyArray(user.errors);
        });
    })
});
