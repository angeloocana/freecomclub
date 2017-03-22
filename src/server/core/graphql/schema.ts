//falling to use graphql in other module
//import {UserSchema} from 'ptz-user-graphql';
import UserSchema from './userSchema';
//import { IUserApp } from 'ptz-user-app';

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import {
    globalIdField,
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray,
    mutationWithClientMutationId
} from 'graphql-relay';

function Schema(userApp: IUserApp) {

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
