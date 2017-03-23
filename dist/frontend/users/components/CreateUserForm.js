import React from 'react';
import Errors from '../../core/components/Errors';
class CreateUserForm extends React.Component {
    constructor() {
        super(...arguments);
        this.createUserCallBack = (user) => {
            this.user = user;
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            console.log('createUserSubmit e', e);
            const userArgs = {
                displayName: this.refs.displayName.value,
                email: this.refs.email.value,
                password: this.refs.password.value,
                userName: this.refs.userName.value
            };
            console.log('userArgs', userArgs);
            this.props.createUser(userArgs, this.createUserCallBack);
        };
    }
    render() {
        const errors = this.user ? this.user.errors : [];
        return (React.createElement("section", null,
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("fieldset", null,
                    React.createElement("legend", null, "Create User"),
                    React.createElement("input", { type: "text", placeholder: "Display Name", ref: "displayName" }),
                    React.createElement("input", { type: "text", placeholder: "User Name", ref: "userName" }),
                    React.createElement("input", { type: "text", placeholder: "E-mail", ref: "email" }),
                    React.createElement("input", { type: "text", placeholder: "Password", ref: "password" }),
                    React.createElement(Errors, { errors: errors }),
                    React.createElement("button", { type: "submit" }, "Create User")))));
    }
}
CreateUserForm.propTypes = {
    createUser: React.PropTypes.func
};
export default CreateUserForm;
