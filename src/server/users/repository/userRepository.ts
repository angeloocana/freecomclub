interface IUserRepository{
    add(user:IUser): Promise<IUser>;
    find(query:any, options:{limit:number}): Promise<IUser[]>;
    getByUserName(userName:string): Promise<IUser>;
    getByEmail(email:string): Promise<IUser>;
}

function UserRepository(db):IUserRepository{

    function getUserDbCollection(){
        return db.collection('users');
    }

    function add({userName, email, displayName}:IUser):Promise<IUser>{
        return getUserDbCollection()
            .insertOne({userName, email, displayName});
    }

    function find(query:any, options:{limit:number}):Promise<IUser[]>{
        var result = getUserDbCollection()
            .find(query,{},options)
            .toArray();

        return result;
    } 

    function getByUserName(userName:string):Promise<IUser>{
        return getUserDbCollection()
            .findOne({userName});
    }

    function getByEmail(email:string):Promise<IUser>{
        return getUserDbCollection()
            .findOne({email});
    }

    return {
        add,
        find,
        getByUserName,
        getByEmail
    }
}

export default UserRepository;
