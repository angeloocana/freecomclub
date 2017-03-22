import AppDispatcher from '../../AppDispatcher';
import { ActionTypes } from '../linkConstants';
var ServerActions = {
    receiveLinks(links) {
        console.log('2. In Link Server Actions');
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_LINKS,
            links
        });
    }
};
export default ServerActions;
