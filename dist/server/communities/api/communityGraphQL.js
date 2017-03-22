import CommunityApp from '../app/communityApp';
import { id, createdBy, dtChanged } from '../../core/api/entityBaseGraphQL';
import { GraphQLObjectType, GraphQLString } from 'graphql';
function CommunitySchema(db) {
    var communityApp = CommunityApp(db);
    var communityType = new GraphQLObjectType({
        name: 'Community',
        fields: () => ({
            id,
            name: { type: GraphQLString },
            createdBy,
            dtChanged
        })
    });
}
export default CommunitySchema;
