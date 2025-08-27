import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { userMutations, userQueries } from './resolvers/userResolver.js';
import { BooksMutations, booksQuery } from './resolvers/booksResolver.js';
import { borrowQueries, borrowMutations } from './resolvers/borrowResolver.js';
import { reportQueries } from './resolvers/reportResolver.js';

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        ...userQueries,
        ...booksQuery,
        ...borrowQueries,
        ...reportQueries
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        ...userMutations,
        ...BooksMutations,
        ...borrowMutations
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});