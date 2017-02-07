import AppDispatcher from '../AppDispatcher';
import { ActionTypes } from '../Constants';
import { EventEmitter } from 'events';
var _links = [];
console.log("LinkStore");
class LinkStore extends EventEmitter {
    constructor() {
        super();
        console.log("LinkStore register");
        AppDispatcher.register(action => {
            console.log('LinkStore action received');
            switch (action.actionType) {
                case ActionTypes.RECEIVE_LINKS:
                    console.log('3. In Links Store');
                    _links = action.links;
                    this.emit('change');
                    break;
                default:
                    break;
            }
        });
    }
    getAll() {
        return _links;
    }
}
export default new LinkStore();
