interface IUserRepository{
    add(user:IUser, callback:(err, user:IUser) => void);
    find(query:any, options:{limit:number}, callback:(err, user:IUser[]) => void);
    getByUserName(userName:string, callback:(err, user:IUser) => void);
    getByEmail(email:string, callback:(err, user:IUser) => void);
}

function UserRepository(db):IUserRepository{

    function getUserDbCollection(){
        return db.collection('users');
    }

    function add({userName, email, displayName}:IUser, 
                 callback:(err, user:IUser)=>void){
        getUserDbCollection()
            .insertOne({userName, email, displayName},
                      callback);
    }

    function find(query:any, options:{limit:number}, 
                  callback:(err, users:IUser[])=>void){
        getUserDbCollection()
            .find(query,{},options,callback);
    } 

    function getByUserName(userName:string, 
                           callback:(err, user:IUser)=>void){
        getUserDbCollection()
            .findOne({userName}, callback);
    }

    function getByEmail(email:string, 
                        callback:(err, user:IUser)=>void){
        getUserDbCollection()
            .findOne({email}, callback);
    }

    return {
        add,
        find,
        getByUserName,
        getByEmail
    }
}

export default UserRepository;
