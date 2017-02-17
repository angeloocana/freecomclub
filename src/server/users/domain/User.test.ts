import User from './User';
import { contains, notContains, equal } from 'ptz-assert';

describe('User', () => {
    describe('UserName', ()=>{
        it('Add error when empty username', ()=>{
            var user = new User({userName:'', email:'', displayName:''});
            contains(user.errors, 'ERROR_USER_USERNAME_REQUIRED');
        });

        it('Do not add error when valid username',()=>{
            var user = new User({userName:'angeloocana', email:'', displayName:''});

            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.log(user);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            notContains(user.errors, 'ERROR_USER_USERNAME_REQUIRED');
        });

        it('Should be lowercase',()=>{
            var user = new User({userName:'AnGeLoOcAnA', email:'', displayName:''});
            equal(user.userName, 'angeloocana');
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

        it('Should be lowercase',()=>{
            var user = new User({userName:'AnGeLoOcAnA', email:'AnGeLoOcAnA@gMaIl.CoM', displayName:''});
            equal(user.email, 'angeloocana@gmail.com');
        });

    });

});
