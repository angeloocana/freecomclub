import UserApp from './userApp';
import UserRepository from '../repository/userRepository';
import { ok, throws } from 'ptz-assert';
import { stub } from 'sinon';

var userRepository = UserRepository(null);
var userApp = UserApp(userRepository);

stub(userRepository, 'save').returns({});

describe('UserApp', ()=>{
    describe('save', ()=>{
        it('throw error if user is invalid', ()=>{
           throws(()=>{
                var user = {userName:'', email:'', displayName:''};
                userApp.save(user);            
            });
        });

        it('call repository if User is valid', ()=>{
            var user:IUser = {userName:'angeloocana', email:'angeloocana@gmail.com', displayName: ''};
            userApp.save(user);
            ok(userRepository.save['called']);
        });
    });
});
