// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.

import {coinService} from "../services";

const resolvers = {
    CoinRecord: {
        id: (parent: any) => parent._id.toString()
    },
    Viewer: {
        coin: async () => {
            return 0;
        },
        coinrecordconnection: async (parent: any, args: any, {user}: any) => {
            console.log(`coinrecordconnection:parent=${JSON.stringify(user)}`);
            console.log(`coinrecordconnection:parent.username=${user.username}`);
            if (!user) {
                return {edges: []}
            }
            const list = await coinService.list({username: user.username});
            return {edges: list.map((it: any) => ({node: it}))}
        }
    },
    CoinMutation: {
        create: async (_: any, {name, amount}: any, {user}: any) => {
            if (!user) {
                return {}
            }
            return await coinService.add(user.username, name, amount);
        }
    },
    Mutation: {
        coin: () => ({})
    }
};
export default resolvers;
