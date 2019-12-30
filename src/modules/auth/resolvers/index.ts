// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
import {authService, userService} from "../services";

const resolvers = {
    Viewer: {
        username: async (root: any, args: any, {req, res,}: any) => {
            try {
                const authorization = req.headers.authorization;
                const user = await authService.authenticate(authorization);
                return user?.username || "";
            } catch (e) {
                console.log(e);
                return ""
            }
        }
    },
    Query: {
        viewer: () => ({})
    },
    AuthMutation: {
        createToken: async (root: any, args: { username: string, password: string }, context: any) => {
            console.log(`create token,`);
            let {username, password} = args;
            console.log(`${(username)}:${(password)}`);
            return `Basic ${Buffer.from(`${(username)}:${(password)}`).toString('base64')}`
        }
    },
    Mutation: {
        auth: () => ({})
    }
};
export default resolvers;
