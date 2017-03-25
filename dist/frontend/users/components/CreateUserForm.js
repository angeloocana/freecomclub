import React from 'react';
import { User } from 'ptz-user-domain';
import Errors from '../../core/components/Errors';
import TextInput from '../../core/components/TextInput';
class CreateUserForm extends React.Component {
    constructor() {
        super(...arguments);
        this.userArgs = {};
        this.createUserCallBack = (user) => {
            console.log('createUserCallBack', user);
            this.setState({ user });
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            console.log('createUserSubmit e', e);
            const userArgs = {
                displayName: this.userArgs.displayName.value(),
                email: this.userArgs.email.value(),
                password: this.userArgs.password.value(),
                userName: this.userArgs.userName.value()
            };
            console.log('userArgs', userArgs);
            this.props.createUser(userArgs, this.createUserCallBack);
        };
    }
    render() {
        const errors = this.state && this.state.user ? this.state.user.errors : [];
        return (React.createElement("section", null,
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("fieldset", null,
                    React.createElement("legend", null, "Create User"),
                    React.createElement(TextInput, { label: "Display Name", ref: (f) => (this.userArgs.displayName = f), possibleErrors: User.displayNameErrors, errors: errors }),
                    React.createElement(TextInput, { label: "User Name", ref: (f) => (this.userArgs.userName = f), possibleErrors: User.userNameErrors, errors: errors }),
                    React.createElement(TextInput, { label: "E-mail", ref: (f) => (this.userArgs.email = f), possibleErrors: User.emailErrors, errors: errors }),
                    React.createElement(TextInput, { label: "Password", ref: (f) => (this.userArgs.password = f), possibleErrors: User.passwordErrors, errors: errors }),
                    React.createElement(Errors, { errors: errors }),
                    React.createElement("button", { type: "submit" }, "Create User")))));
    }
}
CreateUserForm.propTypes = {
    createUser: React.PropTypes.func
};
export default CreateUserForm;
