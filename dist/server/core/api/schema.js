'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ptzUserGraphql = require('ptz-user-graphql');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function Schema(userApp) {
    var userSchema = (0, _ptzUserGraphql.UserSchema)(userApp);
    var testeSchema = (0, _ptzUserGraphql.TesteSchema)();
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
    var storeType = new _graphql.GraphQLObjectType({
        name: 'Store',
        fields: function fields() {
            return {
                id: (0, _graphqlRelay.globalIdField)('Store'),
                testeConnection: testeSchema.getTesteConnection(),
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
    console.log("userSchema.getSaveUserMutation(outputStore)>>>>>>>>>>", userSchema.getSaveUserMutation(outputStore));
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
                    }
                };
            }
        }),
        mutation: new _graphql.GraphQLObjectType({
            name: 'Mutation',
            fields: function fields() {
                return {
                    saveTeste: testeSchema.getSaveTesteMutation(outputStore),
                    saveUser: userSchema.getSaveUserMutation(outputStore)
                };
            }
        })
    });
    return schema;
}
exports.default = Schema;