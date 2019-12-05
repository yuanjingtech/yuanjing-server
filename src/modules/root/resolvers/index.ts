// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
import {makeConnection} from "../../../relay";
import {mutations} from "./mutations";
import {getGroupList} from "../services";

const resolvers = {
    Query: {
        // groups: async (parent: any, args: any, context: any) => makeConnection(getGroupList)(args),
        test: async (parent: any, args: any, context: any) => null
    },
    Mutation: mutations
};
export default resolvers;
