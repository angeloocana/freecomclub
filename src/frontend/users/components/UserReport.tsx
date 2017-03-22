import React from 'react';
import Relay from 'react-relay';

import { IUserArgs, User } from 'ptz-user-domain';

import SaveUserMutation from "../mutations/SaveUserMutation";

import UserComponent from './User';
import CreateUserForm from './CreateUserForm';

class UserReport extends React.Component<any, any>{
    setLimit = (e) => {
        var newLimit = Number(e.target.value);
        this.props.relay.setVariables({ limit: newLimit });
        console.log('newLimit', newLimit);
        console.log('relay', this.props.relay);
    }

    createUser = (userArgs) => {
        const user = new User(userArgs);

        console.log('user', user);

        Relay.Store.update(
            new SaveUserMutation({
                user,
                store: this.props.store
            })
        );
    }


    render() {
        var content = this.props.store.userConnection.edges.map(edge => {
            return <UserComponent key={edge.node.id} user={edge.node} />;
        });

        return (
            <section>
                <h1>Users</h1>
                <CreateUserForm createUser={this.createUser} />
                <label htmlFor='pagination-limit'>Showing</label>
                <select id='pagination-limit' onChange={this.setLimit}
                    defaultValue={this.props.relay.variables.limit}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <ul>
                    {content}
                </ul>
            </section>);
    }
}

UserReport = Relay.createContainer(UserReport, {
    initialVariables: {
        limit: 20
    },
    fragments: {
        store: () => Relay.QL`
        fragment on Store{
            id,
            userConnection(first: $limit){
                edges{
                    node{
                        id,
                        ${UserComponent.getFragment('user')}
                    }
                }
            }
        }
       `
    }
});

export default UserReport;
