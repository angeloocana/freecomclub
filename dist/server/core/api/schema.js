'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userGraphQL = require('../../users/api/userGraphQL');

var _userGraphQL2 = _interopRequireDefault(_userGraphQL);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Schema(db) {
    var userSchema = (0, _userGraphQL2.default)(db);
    var counter = 42;
    var data = [42, 43, 44];
    var counters = [{ counter: 42 }, { counter: 43 }];
    var counterType = new _graphql.GraphQLObjectType({
        name: 'Counter',
        fields: function fields() {
            return {
                counter: { type: _graphql.GraphQLInt }
            };
        }
    });
    var store = {};
    var linkType = new _graphql.GraphQLObjectType({
        name: 'Link',
        fields: function fields() {
            return {
                id: {
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
                    resolve: function resolve(obj) {
                        return obj._id;
                    }
                },
                title: { type: _graphql.GraphQLString },
                url: { type: _graphql.GraphQLString }
            };
        }
    });
    var linkConnection = (0, _graphqlRelay.connectionDefinitions)({
        name: 'Link',
        nodeType: linkType
    });
    var storeType = new _graphql.GraphQLObjectType({
        name: 'Store',
        fields: function fields() {
            return {
                id: (0, _graphqlRelay.globalIdField)('Store'),
                linkConnection: {
                    type: linkConnection.connectionType,
                    args: _graphqlRelay.connectionArgs,
                    resolve: function resolve(_, args) {
                        console.log('limit', args.first);
                        return (0, _graphqlRelay.connectionFromPromisedArray)(db.collection('links').find({}).limit(args.first).toArray(), args);
                    }
                },
                userConnection: userSchema.getUserConnection()
            };
        }
    });
    var outputStore = {
        type: storeType,
        resolve: function resolve() {
            return store;
        }
    };
    var createLinkMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
        name: 'CreateLink',
        inputFields: {
            title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
            url: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
        },
        outputFields: {
            linkEdge: {
                type: linkConnection.edgeType,
                resolve: function resolve(obj) {
                    return { node: obj.ops[0], cursor: obj.insertedId };
                }
            },
            store: outputStore
        },
        mutateAndGetPayload: function mutateAndGetPayload(_ref) {
            var title = _ref.title,
                url = _ref.url;

            return db.collection('links').insertOne({ title: title, url: url });
        }
    });
    var schema = new _graphql.GraphQLSchema({
        query: new _graphql.GraphQLObjectType({
            name: 'Query',
            fields: function fields() {
                return {
                    store: {
                        type: storeType,
                        resolve: function resolve() {
                            return store;
                        }
                    },
                    counter: {
                        type: _graphql.GraphQLInt,
                        resolve: function resolve() {
                            return counter;
                        }
                    },
                    message: {
                        type: _graphql.GraphQLString,
                        resolve: function resolve() {
                            return "Hello GraphQL!";
                        }
                    },
                    data: {
                        type: new _graphql.GraphQLList(_graphql.GraphQLInt),
                        resolve: function resolve() {
                            return data;
                        }
                    },
                    counters: {
                        type: new _graphql.GraphQLList(counterType),
                        resolve: function resolve() {
                            return counters;
                        }
                    },
                    links: {
                        type: new _graphql.GraphQLList(linkType),
                        resolve: function resolve() {
                            return db.collection('links').find({}).toArray();
                        }
                    }
                };
            }
        }),
        mutation: new _graphql.GraphQLObjectType({
            name: 'Mutation',
            fields: function fields() {
                return {
                    createLink: createLinkMutation,
                    saveUser: userSchema.getSaveUserMutation(outputStore)
                };
            }
        })
    });
    return schema;
}
exports.default = Schema;