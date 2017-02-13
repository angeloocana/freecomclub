import UserApp from './userApp';
import {throws} from 'ptz-assert';

var db = null;
var userApp = UserApp(db);

describe('UserApp', ()=>{
    describe('add', ()=>{
        it('throw error if user is invalid', ()=>{
           throws(()=>{
                var user = {};
                userApp.add(user);            
            });
        });

        it('call repository if User is valid'
                    /*, ()=>{
            var user:IUser = {userName:'angeloocana', email:'angeloocana@gmail.com'};
            userApp.add(user);

        }*/
          );
    });
});
