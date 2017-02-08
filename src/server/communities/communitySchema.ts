import CommunityRepository from './communityRepository';
import { id, createdBy, dtChanged } from '../data/entityBaseSchema';

import {
 GraphQLObjectType,
 GraphQLString
} from 'graphql';

import {

} from 'graphql-relay';


function CommunitySchema(db){

    var communityRepository = CommunityRepository(db);

    var communityType = new GraphQLObjectType({
        name: 'Community',
        fields: () => ({
            id,
            name: {type: GraphQLString},
            createdBy,
            dtChanged            
        })
    });
}

export default CommunitySchema;
