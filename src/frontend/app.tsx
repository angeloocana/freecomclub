import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
//import Main from './links/components/main';
import UserReport from './users/components/UserReport';

console.log('Hello app.tsx');

class HomeRoute extends Relay.Route {
    static routeName = 'Home';
    static queries = {
        store: (Component) => Relay.QL`
            query MainQuery{
                store {
                    ${Component.getFragment('store')}
                }
            }
        `
    }
}

ReactDOM.render(
    <Relay.RootContainer
        Component={UserReport}
        route={new HomeRoute()}
    />,
    document.getElementById('react'));
