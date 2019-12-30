import config from "./config";
import {rootModule} from "./modules";
import {authService} from "./modules/auth/services";

const {ApolloServer} = require('apollo-server');

const server = new ApolloServer({
    schema: rootModule.schema,
    context: async (session: any) => {
        const authorization = session.req?.headers.authorization;
        const user = await authService.authenticate(authorization);
        return {...session, authorization, user};
    }
});


server.listen(config.PORT).then(({url}: any) => {
    console.log(`Server ready at ${url}`);
});
