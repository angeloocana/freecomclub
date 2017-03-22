import {post} from 'jquery';
import ServerActions from '../actions/ServerActions';

var API = {
	fetchLinks(){
		console.log('1. In API');

		post('/graphql',{
            query: `{
                links {
                    _id,
                    title,
                    url
                }
            }`
        }).done(resp => {
			console.log(resp);
			ServerActions.receiveLinks(resp.data.links);
		});
	}
};

export default API;
