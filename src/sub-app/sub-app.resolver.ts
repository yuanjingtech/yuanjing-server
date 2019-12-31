import {Injectable} from "@nestjs/common";
import {Query, Parent, ResolveProperty, Args, Resolver} from "@nestjs/graphql"
import {PageInput, Viewer} from "../graphql";
import {SubAppService} from "./sub-app.service";

@Resolver('Viewer')
export class ViewerResolver {
    constructor(
        private readonly subAppService: SubAppService
    ) {
    }

    @Query('viewer')
    async viewer() {
        console.log(`viewer`);
        return {}
    }

    @ResolveProperty()
    async subappconnection(@Parent() viewer: Viewer, @Args() page: PageInput): Promise<any> {
        console.log(`subappconnection`);
        const appList = await this.subAppService.getAppList();
        return {edges: appList.map((it: any) => ({node: it}))}
    }
}
