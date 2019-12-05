import {GraphQLModule} from '@graphql-modules/core';
import 'graphql-import-node'; // You should add this at the begininng of your entry file.
import * as typeDefs from './schema.graphql';
import resolvers from './resolvers';

export interface ISession {
    req: Request;
    res: Response;
}

export const AuthModule = new GraphQLModule({
    typeDefs,
    resolvers,
    context: session => session
});
