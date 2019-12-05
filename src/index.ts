import config from "./config";
import {rootModule} from "./modules";

const {ApolloServer} = require('apollo-server');

const server = new ApolloServer({
    schema: rootModule.schema,
    context: (session: any) => session
});


server.listen(config.PORT).then(({url}: any) => {
    console.log(`Server ready at ${url}`);
});
