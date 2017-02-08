import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString
} from 'graphql';

var createdByType = new GraphQLObjectType({
    name: 'CreatedBy',
    fields: () => ({
        userId: {type: GraphQLID},
        userName: {type: GraphQLString},
        displayName: {type: GraphQLString},
        email: {type: GraphQLString},
        dtCreated: {
            type: GraphQLString,
            resolve: (obj) => new Date(obj.dtCreated).toISOString()
        },
        ip: {type: GraphQLString}
    })
});

var id =  {
    type: new GraphQLNonNull(GraphQLID),
    resolve: (obj) => obj._id
};

var createdBy =  { type: createdByType };

var dtChanged = { 
    type: GraphQLString,
    resolve: (obj) => new Date(obj.dtChanged).toISOString()
};


export {
    id,
    createdBy,
    dtChanged
}
