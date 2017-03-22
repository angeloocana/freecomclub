import UserSchema from './userSchema';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
function Schema(userApp) {
    var userSchema = UserSchema(userApp);
    var store = {};
    var storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            id: globalIdField('Store'),
            userConnection: userSchema.getUserConnection()
        })
    });
    var outputStore = {
        type: storeType,
        resolve: () => store
    };
    console.log("userSchema", userSchema);
    console.log("userSchema.getUserConnection()>>>>>>>>>>", userSchema.getUserConnection());
    var schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                store: {
                    type: storeType,
                    resolve: () => store
                }
            })
        }),
        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: () => ({
                saveUser: userSchema.getSaveUserMutation(outputStore)
            })
        })
    });
    return schema;
}
export default Schema;
