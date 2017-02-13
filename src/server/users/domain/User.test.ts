import User from './User';
import { contains, notContains } from 'ptz-assert';

describe('User', () => {
    describe('UserName', ()=>{
        it('Add error when empty username', ()=>{
            var user = new User({userName:'', email:'', displayName:''});
            contains(user.errors, 'ERROR_USER_USERNAME_REQUIRED');
        });

        it('Do not add error when valid username',()=>{
            var user = new User({userName:'angeloocana', email:'', displayName:''});

            notContains(user.errors, 'ERROR_USER_USERNAME_REQUIRED');
        });
    });

    describe('Email', ()=>{
        it('Add error when empty email', ()=>{
            var user = new User({userName:'', email:'', displayName:''});
            contains(user.errors, 'ERROR_USER_EMAIL_REQUIRED');
        });
        
        it('Add error when invalid email', ()=>{
            var user = new User({userName:'', email:'angeloocanagmail.com', displayName:''});
            contains(user.errors, 'ERROR_USER_EMAIL_INVALID');
        });


        it('Do not add error when valid email',()=>{
            var user = new User({userName:'angeloocana', email:'angeloocana@gmail.com', displayName:''});

            notContains(user.errors, 'ERROR_USER_EMAIL_REQUIRED');
            notContains(user.errors, 'ERROR_USER_EMAIL_INVALID');
        });
    });

});
