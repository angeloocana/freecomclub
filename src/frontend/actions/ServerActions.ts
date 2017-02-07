import AppDispatcher from '../AppDispatcher';
import {ActionTypes} from '../Constants';

var ServerActions = {
	receiveLinks(links){
		console.log('2. In Server Actions');
		AppDispatcher.dispatch({
			actionType: ActionTypes.RECEIVE_LINKS,
			links
		});
	}
};

export default ServerActions;
