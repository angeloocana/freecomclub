function UserRepository(db):IUserRepository{

    function getUserDbCollection(){
        return db.collection('users');
    }

    async function save(user:IUser):Promise<IUser>{
        var result = await getUserDbCollection()
            .replaceOne({_id: user.id},user,{upsert:true});
            user = result.ops[0];
            user.id = result.upsertedId._id;
            console.log('result', result);
            console.log('saved user', user);
        return Promise.resolve(user);
    }

    function find(query:any, options:{limit:number}):Promise<IUser[]>{
        var result = getUserDbCollection()
            .find(query,{},options)
            .toArray();

        return result;
    } 

    function getOtherUsersWithSameUserNameOrEmail(user:IUser):Promise<IUser[]>{
        var query = { _id:{$ne:user.id}, 
                        $or:[{email: user.email},
                            {userName: user.userName}]
                    };

        return getUserDbCollection()
            .find(query,{userName:1,email:1})
            .toArray();
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
        save,
        find,
        getByUserName,
        getByEmail,
        getOtherUsersWithSameUserNameOrEmail
    }
}

export default UserRepository;
