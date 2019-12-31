import {Args, Mutation, ResolveProperty, Resolver} from '@nestjs/graphql';
import {UsersService} from "./users.service";
import {User} from "../graphql";

@Resolver('User')
export class UserResolver {

}

@Resolver('UserMutation')
export class UserMutationResolver {
    constructor(
        private readonly usersService: UsersService
    ) {
    }

    @Mutation()
    async user() {
        return {}
    }

    @ResolveProperty()
    async create(@Args('username') username: string, @Args('password')password: string): Promise<User> {
        console.log(`create(${username},${password})`);
        const user = await this.usersService.create({username, password});
        if (user == null) return null;
        console.log(`${JSON.stringify(user)}`);
        return {id: user.username, username: user.username};
    }
}
