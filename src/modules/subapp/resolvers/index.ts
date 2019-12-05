// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.

import {subAppService} from "../services";

const resolvers = {
    Viewer: {
        subappconnection: async () => {
            const appList = await subAppService.getAppList();
            return {edges: appList.map((it: any) => ({node: it}))}
        }
    },
};
export default resolvers;
