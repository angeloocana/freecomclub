interface IUser extends IEntityBase{
    userName:string;
    email:string;
    emailConfirmed?:boolean;
    displayName:string;
    imgUrl?:string;
    password?:string;
    passwordHash?:string;
}
