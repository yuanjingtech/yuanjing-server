// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
import {mutations} from "./mutations";

const resolvers = {
    Mutation: {
        auth: mutations
    }
};
export default resolvers;
