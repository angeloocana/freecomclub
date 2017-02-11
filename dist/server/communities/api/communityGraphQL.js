'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _communityApp = require('../app/communityApp');

var _communityApp2 = _interopRequireDefault(_communityApp);

var _entityBaseGraphQL = require('../../core/api/entityBaseGraphQL');

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CommunitySchema(db) {
    var communityApp = (0, _communityApp2.default)(db);
    var communityType = new _graphql.GraphQLObjectType({
        name: 'Community',
        fields: function fields() {
            return {
                id: _entityBaseGraphQL.id,
                name: { type: _graphql.GraphQLString },
                createdBy: _entityBaseGraphQL.createdBy,
                dtChanged: _entityBaseGraphQL.dtChanged
            };
        }
    });
}
exports.default = CommunitySchema;