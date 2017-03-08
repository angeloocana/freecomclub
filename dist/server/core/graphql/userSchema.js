'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function UserSchema(userApp) {
    var userType = new _graphql.GraphQLObjectType({
        name: 'User',
        fields: function fields() {
            return {
                id: { type: _graphql.GraphQLString },
                userName: { type: _graphql.GraphQLString },
                email: { type: _graphql.GraphQLString },
                emailConfirmed: { type: _graphql.GraphQLBoolean },
                displayName: { type: _graphql.GraphQLString },
                imgUrl: { type: _graphql.GraphQLString },
                errors: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
            };
        }
    });
    var userConnection = (0, _graphqlRelay.connectionDefinitions)({
        name: 'User',
        nodeType: userType
    });
    function getUserConnection() {
        return {
            type: userConnection.connectionType,
            args: _graphqlRelay.connectionArgs,
            resolve: function resolve(_, args) {
                console.log('getting users');
                return (0, _graphqlRelay.connectionFromPromisedArray)(userApp.find({}, { limit: args.first }), args);
            }
        };
    }
    function getSaveUserMutation(outputStore) {
        return (0, _graphqlRelay.mutationWithClientMutationId)({
            name: 'SaveUser',
            inputFields: {
                id: { type: _graphql.GraphQLString },
                userName: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                email: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                displayName: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                password: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
            },
            outputFields: {
                userEdge: {
                    type: userConnection.edgeType,
                    resolve: function resolve(user) {
                        console.log('ql user', user);
                        return { node: user, cursor: user.id };
                    }
                },
                store: outputStore
            },
            mutateAndGetPayload: userApp.save
        });
    }
    return {
        getSaveUserMutation: getSaveUserMutation,
        getUserConnection: getUserConnection
    };
}
exports.default = UserSchema;