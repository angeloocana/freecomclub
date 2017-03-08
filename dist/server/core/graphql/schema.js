'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userSchema = require('./userSchema');

var _userSchema2 = _interopRequireDefault(_userSchema);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Schema(userApp) {
    var userSchema = (0, _userSchema2.default)(userApp);
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
    console.log("userSchema", userSchema);
    console.log("userSchema.getUserConnection()>>>>>>>>>>", userSchema.getUserConnection());
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
                    saveUser: userSchema.getSaveUserMutation(outputStore)
                };
            }
        })
    });
    return schema;
}
exports.default = Schema;