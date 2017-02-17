import dotenv from 'dotenv';
dotenv.config();

import UserApp from './userApp';
import UserRepository from '../repository/userRepository';
import { ok, notOk, throws, equal } from 'ptz-assert';
import { stub } from 'sinon';

var userRepository:IUserRepository, 
userApp:IUserApp;
var userRepositorySaveCalls = 0;

describe('UserApp', ()=>{
    describe('save', ()=>{
        beforeEach(()=>{
            userRepositorySaveCalls = 0;
            userRepository = UserRepository(null);
            
            userRepository.save = async function(user){
                userRepositorySaveCalls++;
                return Promise.resolve(user);
            };

            stub(userRepository, 'getOtherUsersWithSameUserNameOrEmail').returns([]);
            userApp = UserApp(userRepository);
        });

        it('hash password',async ()=>{
            var user:IUser = {userName:'angeloocana', email:'angeloocana@gmail.com', displayName: 'Ângelo Ocanã', password: 'testPassword'};

            user = await userApp.save(user);

            ok(user.passwordHash, 'passwordHash not set');
            notOk(user.password, 'password not empty');
        });

        it('do not call repository if user is invalid', async ()=>{
            var user = {userName:'', email:'', displayName:''};
            await userApp.save(user);            
            equal(userRepositorySaveCalls, 0);
        });

        it('call repository if User is valid', async ()=>{
            var user:IUser = {userName:'angeloocana', email:'angeloocana@gmail.com', displayName: ''};
            await userApp.save(user);
            equal(userRepositorySaveCalls, 1);
        });
    });
});
