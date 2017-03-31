import React from 'react';
import { IUser, IUserArgs, User } from 'ptz-user-domain';
import Errors from '../../core/components/Errors';
import TextInput from '../../core/components/TextInput';

class CreateUserForm extends React.Component<any, any>{
    userArgs = {};

    static propTypes = {
        createUser: React.PropTypes.func
    }

    private createUserCallBack = (user: IUser) => {
        console.log('createUserCallBack', user);
        this.setState({ user });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log('createUserSubmit e', e);

        const userArgs: IUserArgs = {
            displayName: this.userArgs.displayName.value(),
            email: this.userArgs.email.value(),
            password: this.userArgs.password.value(),
            userName: this.userArgs.userName.value()
        };

        console.log('userArgs', userArgs);

        this.props.createUser(userArgs, this.createUserCallBack);
    }

    render() {
        const errors = this.state && this.state.user ? this.state.user.errors : [];

        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Create User</legend>
                        <TextInput
                            label="Display Name"
                            ref={(f) => (this.userArgs.displayName = f)}
                            possibleErrors={User.displayNameErrors}
                            errors={errors} />
                        <TextInput
                            label="User Name"
                            ref={(f) => (this.userArgs.userName = f)}
                            possibleErrors={User.userNameErrors}
                            errors={errors} />
                        <TextInput
                            label="E-mail"
                            ref={(f) => (this.userArgs.email = f)}
                            possibleErrors={User.emailErrors}
                            errors={errors} />
                        <TextInput
                            label="Password"
                            type="password"
                            ref={(f) => (this.userArgs.password = f)}
                            possibleErrors={User.passwordErrors}
                            errors={errors} />                    
                        <button type="submit">Create User</button>
                        <Errors errors={errors} />
                    </fieldset>
                </form>
            </section>);
    }
}

export default CreateUserForm;
