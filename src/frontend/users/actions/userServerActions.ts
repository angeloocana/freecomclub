import AppDispatcher from '../../AppDispatcher';
import {ActionTypes} from '../userConstants';

var ServerActions = {
	receiveUsers(users){
		console.log('2. In User Server Actions');
		AppDispatcher.dispatch({
			actionType: ActionTypes.RECEIVE_USERS,
			users
		});
	}
};

export default ServerActions;
