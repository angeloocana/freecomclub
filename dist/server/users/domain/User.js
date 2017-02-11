import EntityBase from '../../core/domain/EntityBase';
export default class User extends EntityBase {
    constructor(user) {
        super(user);
        this.userName = user.userName;
        this.email = user.email;
        this.emailConfirmed = user.emailConfirmed;
        this.displayName = user.displayName;
        this.imgUrl = user.imgUrl;
        this.password = user.password;
        this.passwordHash = user.passwordHash;
    }
}
