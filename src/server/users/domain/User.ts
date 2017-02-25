import EntityBase from '../../core/domain/EntityBase';
import { validateEmail } from '../../core/domain/Email';

export default class User extends EntityBase implements IUser {

    userName: string;
    email: string;
    emailConfirmed?: boolean;
    displayName: string;
    imgUrl?: string;
    password?: string;
    passwordHash?: string;

    constructor(user: IUserArgs) {
        if (!user)
            throw "ERROR_EMPTY_USER";

        super(user);

        this.userName = user.userName;
        this.email = user.email;
        this.emailConfirmed = user.emailConfirmed;
        this.displayName = user.displayName;
        this.imgUrl = user.imgUrl;
        this.password = user.password;
        this.passwordHash = user.passwordHash;

        this.isValid();
    }

    static getUserAthenticationError(userNameOrEmail: string): IUser {
        return new User({
            userName: userNameOrEmail,
            email: '',
            displayName: '',
            errors: ['ERROR_USER_INVALID_USERNAME_OR_PASSWORD']
        });
    }

    private validateUserName() {
        if (!this.userName || this.userName.length < 3)
            this.addError('ERROR_USER_USERNAME_REQUIRED');
        else
            this.userName = this.userName.toLowerCase();
    }

    private validateEmail() {
        if (!this.email)
            this.addError('ERROR_USER_EMAIL_REQUIRED');
        else if (!validateEmail(this.email))
            this.addError('ERROR_USER_EMAIL_INVALID');
        else
            this.email = this.email.toLowerCase();
    }

    isValid(): boolean {
        this.validateUserName();
        this.validateEmail();

        return super.isValid();
    }

    otherUsersWithSameUserNameOrEmail(otherUsers: IUser[]): boolean {
        if (!otherUsers)
            return;

        var error = false;

        if (otherUsers.filter(user => user.userName == this.userName).length > 0) {
            this.addError('ERROR_USER_USERNAME_IN_USE'); error = true;
        }

        if (otherUsers.filter(user => user.email == this.email).length > 0) {
            this.addError('ERROR_USER_EMAIL_IN_USE');
            error = true;
        }

        return error;
    }

    update(newUser:IUser):IUser{
        this.userName = newUser.userName;
        this.email = newUser.email;
        this.passwordHash = newUser.passwordHash;
        this.displayName = newUser.displayName;
        this.imgUrl = newUser.imgUrl;
        this.dtChanged = new Date();
         return this;
    }
}
