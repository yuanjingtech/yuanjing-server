import {Injectable, Res, UseGuards} from "@nestjs/common";
import {Args, Parent, Resolver, ResolveProperty, Mutation, Query} from "@nestjs/graphql"
import {GqlAuthGuard} from "../gql-auth.guard";
import {CurrentUser} from "../current-user.decorator";
import {AuthService} from "./auth.service";

export type User = { username: string };

@Resolver('Viewer')
export class ViewerResolver {
    @Query('viewer')
    async viewer() {
        console.log(`viewer`);
        return {}
    }

    @UseGuards(GqlAuthGuard)
    @ResolveProperty()
    async username(@Parent() root: any, @Args() args: any, @CurrentUser() currentUser?: User) {
        console.log(`username:${JSON.stringify(currentUser)}`);
        return currentUser?.username ?? "";
    }
}

@Resolver("AuthMutation")
export class AuthMutationResolver {
    constructor(private readonly authService: AuthService) {
    }

    @Mutation()
    async auth() {
        console.log(`auth`);
        return {}
    }

    @ResolveProperty('createToken')
    async createToken(@Parent() root: any, @Args("username") username: string, @Args("password") password: string): Promise<string> {
        console.log(`createToken`);
        const result = await this.authService.login({username, password});
        if (result == null) return "";
        return `Bearer ${result.access_token || ""}`;
    }
}
