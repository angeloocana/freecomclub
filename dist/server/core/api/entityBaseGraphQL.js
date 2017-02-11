'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dtChanged = exports.createdBy = exports.id = undefined;

var _graphql = require('graphql');

var createdByType = new _graphql.GraphQLObjectType({
    name: 'CreatedBy',
    fields: function fields() {
        return {
            userId: { type: _graphql.GraphQLID },
            userName: { type: _graphql.GraphQLString },
            displayName: { type: _graphql.GraphQLString },
            email: { type: _graphql.GraphQLString },
            dtCreated: {
                type: _graphql.GraphQLString,
                resolve: function resolve(obj) {
                    return new Date(obj.dtCreated).toISOString();
                }
            },
            ip: { type: _graphql.GraphQLString }
        };
    }
});
var id = {
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
    resolve: function resolve(obj) {
        return obj._id;
    }
};
var createdBy = { type: createdByType };
var dtChanged = {
    type: _graphql.GraphQLString,
    resolve: function resolve(obj) {
        return new Date(obj.dtChanged).toISOString();
    }
};
exports.id = id;
exports.createdBy = createdBy;
exports.dtChanged = dtChanged;