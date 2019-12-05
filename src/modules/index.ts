import {RootModule} from "./root";
import {AuthModule} from "./auth";
import SubAppModule from './subapp';
import {GraphQLModule} from "@graphql-modules/core";

export const rootModule = new GraphQLModule({imports: [RootModule, AuthModule, SubAppModule]});
