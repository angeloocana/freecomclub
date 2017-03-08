//falling to use graphql in other module
//import {UserSchema} from 'ptz-user-graphql';
import UserSchema from './userSchema';

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import{
    globalIdField,
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray,
    mutationWithClientMutationId
} from 'graphql-relay';

function Schema(userApp:IUserApp){
    
    var userSchema = UserSchema(userApp);

    var counter = 42;
    var data = [42, 43, 44];

    var counters = [{counter: 42}, {counter: 43}];
    var counterType = new GraphQLObjectType({
        name: 'Counter',
        fields: () => ({
            counter: {type: GraphQLInt}
        })
    });

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
                store:{
                    type: storeType,
                    resolve: () => store
                },
                counter:{
                    type: GraphQLInt,
                    resolve: ()=> counter
                },
                message:{
                    type: GraphQLString,
                    resolve: ()=> "Hello GraphQL!"            
                },
                data: {
                    type: new GraphQLList(GraphQLInt),
                    resolve: () => data            
                },
                counters: {
                    type: new GraphQLList(counterType),
                    resolve: () => counters
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
