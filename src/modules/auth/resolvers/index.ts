// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
import {userService} from "../services";

const resolvers = {
    Viewer: {
        username: async (root: any, args: any, {req, res,}: any) => {
            try {
                const authorization = req.headers.authorization;
                console.log(`resolvers,username,authorization=${authorization}`);
                if (!authorization || authorization.indexOf('Basic ') === -1) {
                    console.log('no authorization');
                    return "";
                }
                // verify auth credentials
                const base64Credentials = authorization.split(' ')[1];
                console.log(`base64Credentials=${base64Credentials}`);
                const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
                console.log(`credentials=${credentials}`);
                const [username, password] = credentials.split(':');
                console.log(`${username} ${password}`);
                const user = await userService.authenticate(username, password);
                return user.username;
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
