import UserApp from '../app/userApp';
import { id, createdBy, dtChanged } from '../../core/api/entityBaseGraphQL';

import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString
} from 'graphql';

import {
    connectionDefinitions,
    mutationWithClientMutationId,
    connectionArgs,
    connectionFromPromisedArray
} from 'graphql-relay';


function UserSchema(db) {

    var userApp = UserApp(db);


    var userType = new GraphQLObjectType({
        name: 'User',
        fields: () => ({
            id,
            userName: { type: GraphQLString },
            email: { type: GraphQLString },
            emailConfirmed: { type: GraphQLBoolean },
            displayName: { type: GraphQLString },
            imgUrl: { type: GraphQLString },
            createdBy,
            dtChanged
        })
    });

    var userConnection = connectionDefinitions({
        name: 'User',
        nodeType: userType
    });

    function getUserConnection() {
        return {
            type: userConnection.connectionType,
            args: connectionArgs,
            resolve: (_, args) => {
                console.log('getting users');
                return connectionFromPromisedArray(
                    userApp.find({},{ limit: args.first }),
                    args
                );
            }
        }
    }

    function getCreateUserMutation(outputStore) {

        return mutationWithClientMutationId({
            name: 'CreateUser',

            inputFields: {
                userName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                displayName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },

            outputFields: {
                userEdge: {
                    type: userConnection.edgeType,
                    resolve: (obj) => ({ node: obj.ops[0], cursor: obj.insertedId })
                },
                store: outputStore
            },

            mutateAndGetPayload: userApp.add
        });
    }

    return {
        getCreateUserMutation,
        getUserConnection
    }
}

export default UserSchema;
