import { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { globalIdField, connectionDefinitions, connectionArgs, connectionFromPromisedArray, mutationWithClientMutationId } from 'graphql-relay';
function Schema(db) {
    var counter = 42;
    var data = [42, 43, 44];
    var counters = [{ counter: 42 }, { counter: 43 }];
    var counterType = new GraphQLObjectType({
        name: 'Counter',
        fields: () => ({
            counter: { type: GraphQLInt }
        })
    });
    var store = {};
    var linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: (obj) => obj._id
            },
            title: { type: GraphQLString },
            url: { type: GraphQLString }
        })
    });
    var linkConnection = connectionDefinitions({
        name: 'Link',
        nodeType: linkType
    });
    var storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            id: globalIdField('Store'),
            linkConnection: {
                type: linkConnection.connectionType,
                args: connectionArgs,
                resolve: (_, args) => {
                    console.log('limit', args.first);
                    return connectionFromPromisedArray(db.collection('links').find({}).limit(args.first).toArray(), args);
                }
            }
        })
    });
    var createLinkMutation = mutationWithClientMutationId({
        name: 'CreateLink',
        inputFields: {
            title: { type: new GraphQLNonNull(GraphQLString) },
            url: { type: new GraphQLNonNull(GraphQLString) }
        },
        outputFields: {
            linkEdge: {
                type: linkConnection.edgeType,
                resolve: (obj) => ({ node: obj.ops[0], cursor: obj.insertedId })
            },
            store: {
                type: storeType,
                resolve: () => store
            }
        },
        mutateAndGetPayload: ({ title, url }) => {
            return db.collection('links').insertOne({ title, url });
        }
    });
    var schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                store: {
                    type: storeType,
                    resolve: () => store
                },
                counter: {
                    type: GraphQLInt,
                    resolve: () => counter
                },
                message: {
                    type: GraphQLString,
                    resolve: () => "Hello GraphQL!"
                },
                data: {
                    type: new GraphQLList(GraphQLInt),
                    resolve: () => data
                },
                counters: {
                    type: new GraphQLList(counterType),
                    resolve: () => counters
                },
                links: {
                    type: new GraphQLList(linkType),
                    resolve: () => db.collection('links').find({}).toArray()
                }
            })
        }),
        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: () => ({
                createLink: createLinkMutation
            })
        })
    });
    return schema;
}
export default Schema;
