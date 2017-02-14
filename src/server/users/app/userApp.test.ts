import UserApp from './userApp';
import UserRepository from '../repository/userRepository';
import { ok, notOk, throws } from 'ptz-assert';
import { stub } from 'sinon';

var userRepository:IUserRepository, 
userApp:IUserApp;

describe('UserApp', ()=>{
    describe('save', ()=>{
        beforeEach(()=>{
            userRepository = UserRepository(null);
            userApp = UserApp(userRepository);

            stub(userRepository, 'save').returns({});
        });

        it('do not call repository if user is invalid', async ()=>{
            var user = {userName:'', email:'', displayName:''};
            await userApp.save(user);            
            notOk(userRepository.save['called']);
        });

        it('call repository if User is valid', async ()=>{
            stub(userRepository, 'getOtherUsersWithSameUserNameOrEmail').returns([]);

            var user:IUser = {userName:'angeloocana', email:'angeloocana@gmail.com', displayName: ''};
            var userReturned = await userApp.save(user);
            ok(userRepository.save['called']);
        });
    });
});
