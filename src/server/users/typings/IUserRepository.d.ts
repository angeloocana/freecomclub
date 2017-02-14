interface IUserRepository{
    save(user:IUser): Promise<IUser>;
    find(query:any, options:{limit:number}): Promise<IUser[]>;
    getByUserName(userName:string): Promise<IUser>;
    getByEmail(email:string): Promise<IUser>;
    getOtherUsersWithSameUserNameOrEmail(user:IUser): Promise<IUser[]>;
}


