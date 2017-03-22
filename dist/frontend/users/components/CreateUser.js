import React from 'react';
import Relay from 'react-relay';
import { User } from 'ptz-user-domain';
import SaveUserMutation from "../mutations/SaveUserMutation";
class CreateUser extends React.Component {
    constructor() {
        super(...arguments);
        this.handleSubmit = (e) => {
            e.preventDefault();
            const userArgs = {
                displayName: this.refs.displayName.value,
                email: this.refs.email.value,
                password: this.refs.password.value,
                userName: this.refs.userName.value
            };
            const user = new User(userArgs);
            Relay.Store.update(new SaveUserMutation({
                user,
                store: this.props.store
            }));
        };
    }
    render() {
        return (React.createElement("section", null,
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("fieldset", null,
                    React.createElement("legend", null, "Create User"),
                    React.createElement("input", { type: "text", placeholder: "Display Name", ref: "displayName" }),
                    React.createElement("input", { type: "text", placeholder: "User Name", ref: "userName" }),
                    React.createElement("input", { type: "text", placeholder: "E-mail", ref: "email" }),
                    React.createElement("input", { type: "text", placeholder: "Password", ref: "password" }),
                    React.createElement("button", { type: "submit" }, "Create User")))));
    }
}
export default CreateUser;
