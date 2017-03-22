import React from 'react';

class CreateUserForm extends React.Component<any, any>{
    static propTypes = {
        createUser: React.PropTypes.func
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log('createUserSubmit e', e);

        const userArgs: IUserArgs = {
            displayName: this.refs.displayName.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            userName: this.refs.userName.value
        };

        console.log('userArgs', userArgs);

        this.props.createUser(userArgs);
    }

    render() {
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Create User</legend>
                        <input type="text" placeholder="Display Name" ref="displayName" />
                        <input type="text" placeholder="User Name" ref="userName" />
                        <input type="text" placeholder="E-mail" ref="email" />
                        <input type="text" placeholder="Password" ref="password" />
                        <button type="submit">Create User</button>
                    </fieldset>
                </form>
            </section>);
    }
}

export default CreateUserForm;
