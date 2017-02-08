function UserRepository(db) {
    function getUserDbCollection() {
        return db.collection('users');
    }
    function add({ userName, email, displayName }) {
        return getUserDbCollection()
            .insertOne({ userName, email, displayName });
    }
    function find({ limit }) {
        return getUserDbCollection()
            .find({})
            .limit(limit)
            .toArray();
    }
    return {
        add,
        find
    };
}
export default UserRepository;
