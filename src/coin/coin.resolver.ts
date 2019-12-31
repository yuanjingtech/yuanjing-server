import {Parent, ResolveProperty, Resolver} from '@nestjs/graphql';
import {CoinService} from "./coin.service";
import {CurrentUser} from "../current-user.decorator";
import {User} from "../auth/auth.resolver";

@Resolver('CoinRecord')
export class CoinRecordResolver {
    @ResolveProperty()
    id(@Parent()parent: any) {
        return parent._id.toString()
    }
}

@Resolver('Coin')
export class CoinResolver {
}

@Resolver('Viewer')
export class ViewerResolver {
    constructor(
        private readonly coinService: CoinService
    ) {
    }

    @ResolveProperty()
    async coin() {
        return 0;
    }

    @ResolveProperty()
    async coinrecordconnection(parent: any, args: any, @CurrentUser() user: User) {
        console.log(`coinrecordconnection:parent=${JSON.stringify(user)}`);
        if (!user) {
            return {edges: []}
        }
        const list = await this.coinService.list({username: user.username});
        return {edges: list.map((it: any) => ({node: it}))}
    }
}

@Resolver('CoinMutation')
export class CoinMutationResolver {
    constructor(
        private readonly coinService: CoinService
    ) {
    }

    @ResolveProperty()
    async create(_: any, {name, amount}: any, {user}: any) {
        if (!user) {
            return {}
        }
        return await this.coinService.add(user.username, name, amount);
    }
}
