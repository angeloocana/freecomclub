import React from 'react';
import Relay from 'react-relay';

class User extends React.Component {
    render() {
        let { user } = this.props;
        return (
            <li>
                {user.id} <br />
                {user.email} <br />
                {user.displayName} <br />
                {user.imgUrl} <br />
                {user.userName} <br />
            </li>
        );
    }
}

User = Relay.createContainer(User, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                displayName,
                email,
                imgUrl,
                userName,
                id
            }
        `
    }
});

export default User;
