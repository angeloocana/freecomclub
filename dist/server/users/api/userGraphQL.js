'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userRepository = require('../repository/userRepository');

var _userRepository2 = _interopRequireDefault(_userRepository);

var _entityBaseGraphQL = require('../../core/api/entityBaseGraphQL');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserSchema(db) {
    var userRepository = (0, _userRepository2.default)(db);
    var userType = new _graphql.GraphQLObjectType({
        name: 'User',
        fields: function fields() {
            return {
                id: _entityBaseGraphQL.id,
                userName: { type: _graphql.GraphQLString },
                email: { type: _graphql.GraphQLString },
                emailConfirmed: { type: _graphql.GraphQLBoolean },
                displayName: { type: _graphql.GraphQLString },
                imgUrl: { type: _graphql.GraphQLString },
                createdBy: _entityBaseGraphQL.createdBy,
                dtChanged: _entityBaseGraphQL.dtChanged
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
                return (0, _graphqlRelay.connectionFromPromisedArray)(userRepository.find({ limit: args.first }), args);
            }
        };
    }
    function getCreateUserMutation(outputStore) {
        return (0, _graphqlRelay.mutationWithClientMutationId)({
            name: 'CreateUser',
            inputFields: {
                userName: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                email: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                displayName: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                password: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
            },
            outputFields: {
                userEdge: {
                    type: userConnection.edgeType,
                    resolve: function resolve(obj) {
                        return { node: obj.ops[0], cursor: obj.insertedId };
                    }
                },
                store: outputStore
            },
            mutateAndGetPayload: userRepository.add
        });
    }
    return {
        getCreateUserMutation: getCreateUserMutation,
        getUserConnection: getUserConnection
    };
}
exports.default = UserSchema;