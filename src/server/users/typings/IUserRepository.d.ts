interface IUserRepository {
    save(user: IUser): Promise<IUser>;
    find(query: any, options: { limit: number }): Promise<IUser[]>;
    getByUserNameOrEmail(userNameOrEmail: string): Promise<IUser>;
    getOtherUsersWithSameUserNameOrEmail(user: IUser): Promise<IUser[]>;
    getByIds(ids: string[]): Promise<IUser[]>;
}


