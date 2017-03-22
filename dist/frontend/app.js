import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import UserReport from './users/components/UserReport';
console.log('Hello app.tsx');
class HomeRoute extends Relay.Route {
}
HomeRoute.routeName = 'Home';
HomeRoute.queries = {
    store: (Component) => Relay.QL `
            query MainQuery{
                store {
                    ${Component.getFragment('store')}
                }
            }
        `
};
ReactDOM.render(React.createElement(Relay.RootContainer, { Component: UserReport, route: new HomeRoute() }), document.getElementById('react'));
