'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ptzUserGraphql = require('ptz-user-graphql');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function UserSchemaTest(userApp) {
    var userSchema = (0, _ptzUserGraphql.UserSchema)(userApp);
    function getUserConnection() {
        return {
            type: userSchema.connectionType,
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
                    type: userSchema.edgeType,
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
exports.default = _ptzUserGraphql.UserSchema;