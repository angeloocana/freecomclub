import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import Main from './components/main';
console.log('Hello js 3');
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
ReactDOM.render(React.createElement(Relay.RootContainer, { Component: Main, route: new HomeRoute() }), document.getElementById('react'));
console.log(Relay.QL `
        query Test{
            links{
                title
            }
        }
    `);
