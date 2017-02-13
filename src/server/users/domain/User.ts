import EntityBase from '../../core/domain/EntityBase';
import {validateEmail} from '../../core/domain/Email';

export default class User extends EntityBase implements IUser{

    userName:string;
    email:string;
    emailConfirmed:boolean;
    displayName:string;
    imgUrl:string;
    password:string;
    passwordHash:string;

    constructor(user:IUser){
        if(!user)
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

    private validateUserName(){
         if(!this.userName || this.userName.length < 3)
            this.addError('ERROR_USER_USERNAME_REQUIRED');
    }

    private validateEmail(){
        if(!this.email)
            this.addError('ERROR_USER_EMAIL_REQUIRED');

        if(!validateEmail(this.email))
            this.addError('ERROR_USER_EMAIL_INVALID');
    }

    isValid():boolean{
        this.validateUserName();
        this.validateEmail();

        return super.isValid();
    }
}
