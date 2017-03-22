import AppDispatcher from '../../AppDispatcher';
import {ActionTypes} from '../userConstants';
import {EventEmitter} from 'events';

var _users = [];
console.log("UserStore");

class UserStore extends EventEmitter{
	constructor(){
		super();

		console.log("UserStore register");

		AppDispatcher.register(action => {
			console.log('UserStore action received');
			switch(action.actionType){
				case ActionTypes.RECEIVE_USERS:
					console.log('3. In Users Store');
					_users = action.users;
					this.emit('change');		
					break;
				default:
					break;
			}
		});
	}
	
	getAll(){
		return _users;
	}
}

export default new UserStore();
