import {RootModule} from "./root";
import {AuthModule} from "./auth";
import SubAppModule from './subapp';
import {GraphQLModule} from "@graphql-modules/core";
import CoinModule from "./coin";

export const rootModule = new GraphQLModule({imports: [RootModule, SubAppModule, CoinModule, AuthModule]});
