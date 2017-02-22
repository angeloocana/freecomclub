interface IUser extends IEntityBase {
    userName: string;
    email: string;
    emailConfirmed?: boolean;
    displayName: string;
    imgUrl?: string;
    password?: string;
    passwordHash?: string;
    accessToken?: string;

    otherUsersWithSameUserNameOrEmail(users: IUser[]): boolean;
}

interface IUserArgs extends IEntityBaseArgs {
    userName: string;
    email: string;
    emailConfirmed?: boolean;
    displayName: string;
    imgUrl?: string;
    password?: string;
    passwordHash?: string;
}
