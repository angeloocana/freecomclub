import React from 'react';
import Relay from 'react-relay';
import { User } from 'ptz-user-domain';
import SaveUserMutation from "../mutations/SaveUserMutation";
import UserComponent from './User';
import CreateUserForm from './CreateUserForm';
class UserReport extends React.Component {
    constructor() {
        super(...arguments);
        this.setLimit = (e) => {
            var newLimit = Number(e.target.value);
            this.props.relay.setVariables({ limit: newLimit });
            console.log('newLimit', newLimit);
            console.log('relay', this.props.relay);
        };
        this.createUser = (userArgs, cb) => {
            const user = new User(userArgs);
            console.log('user', user);
            Relay.Store.commitUpdate(new SaveUserMutation({
                user,
                store: this.props.store
            }), this.createUserCallBacks(cb));
        };
    }
    createUserCallBacks(cb) {
        return {
            onFailure: transaction => {
                console.log('onFailure response', transaction);
                cb(transaction);
            },
            onSuccess: response => {
                console.log('onSuccess response', response);
                console.log('user response', response.saveUser.userEdge.node);
                cb(response.saveUser.userEdge.node);
            }
        };
    }
    render() {
        var content = this.props.store.userConnection.edges.map(edge => {
            return React.createElement(UserComponent, { key: edge.node.id, user: edge.node });
        });
        return (React.createElement("section", null,
            React.createElement("h1", null, "Users"),
            React.createElement(CreateUserForm, { createUser: this.createUser }),
            React.createElement("label", { htmlFor: 'pagination-limit' }, "Showing"),
            React.createElement("select", { id: 'pagination-limit', onChange: this.setLimit, defaultValue: this.props.relay.variables.limit },
                React.createElement("option", { value: "10" }, "10"),
                React.createElement("option", { value: "20" }, "20")),
            React.createElement("ul", null, content)));
    }
}
UserReport = Relay.createContainer(UserReport, {
    initialVariables: {
        limit: 20
    },
    fragments: {
        store: () => Relay.QL `
        fragment on Store{
            id,
            userConnection(first: $limit){
                edges{
                    node{
                        id,
                        ${UserComponent.getFragment('user')},
                        errors
                    }
                }
            }
        }
       `
    }
});
export default UserReport;
