//import { id, createdBy, dtChanged } from '../../core/api/entityBaseGraphQL';

import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList
} from 'graphql';

import {
    connectionDefinitions,
    mutationWithClientMutationId,
    connectionArgs,
    connectionFromPromisedArray
} from 'graphql-relay';


function UserSchema(userApp: IUserApp) {

    var userType = new GraphQLObjectType({
        name: 'User',
        fields: () => ({
            id: { type: GraphQLString },
            userName: { type: GraphQLString },
            email: { type: GraphQLString },
            emailConfirmed: { type: GraphQLBoolean },
            displayName: { type: GraphQLString },
            imgUrl: { type: GraphQLString },
            //createdBy,
            //dtChanged,
            errors: { type: new GraphQLList(GraphQLString) }
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
                    userApp.find({}, { limit: args.first }),
                    args
                );
            }
        }
    }

    function getSaveUserMutation(outputStore) {

        return mutationWithClientMutationId({
            name: 'SaveUser',

            inputFields: {
                id: { type: GraphQLString },
                userName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                displayName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                errors: { type: new GraphQLList(GraphQLString) }
            },

            outputFields: {
                userEdge: {
                    type: userConnection.edgeType,
                    resolve: (user) => {
                        console.log('ql user', user);
                        return { node: user, cursor: user.id }
                    }
                },
                store: outputStore
            },

            mutateAndGetPayload: userApp.save
        });
    }

    return {
        getSaveUserMutation,
        getUserConnection
    }
}

export default UserSchema;
