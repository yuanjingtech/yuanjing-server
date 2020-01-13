import {Args, Mutation, Parent, ResolveProperty, Resolver} from '@nestjs/graphql';
import {CurrentUser} from "../current-user.decorator";
import {User} from "../auth/auth.resolver";
import {ActivitiesService} from "./activities.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../gql-auth.guard";
import {ActivityOrderByInput, ActivityRecord, PageInput} from "../graphql";
import {Activity} from "../interfaces/activity.interface";
import moment = require("moment");

@Resolver('ActivityRecord')
export class ActivityRecordResolver {
    @ResolveProperty()
    id(@Parent()parent: any) {
        return parent._id.toString()
    }

    @ResolveProperty()
    createdAt(@Parent() parent: any) {
        return parent._id.getTimestamp()
    }
}

@Resolver('Activity')
export class ActivityResolver {
}

@Resolver('Viewer')
export class ViewerResolver {
    constructor(
        private readonly activityService: ActivitiesService
    ) {
    }

    @UseGuards(GqlAuthGuard)
    @ResolveProperty()
    async activityrecordconnection(
        @Parent() parent: any,
        @Args("page") page: PageInput,
        @Args("orderBy") order: ActivityOrderByInput,
        @CurrentUser() user: User
    ) {
        const list = await this.activityService.find({}, page);
        switch (order) {
            case ActivityOrderByInput.id_asc:
                list.sort(((a: any, b: any) => a._id.getTimestamp() - b._id.getTimestamp()));
                break;
            case ActivityOrderByInput.id_desc:
                list.sort(((a: any, b: any) => b._id.getTimestamp() - a._id.getTimestamp()));
                break;
        }
        return {edges: list.map((it: any) => ({node: it}))}
    }
}

@Resolver('ActivityMutation')
export class ActivityMutationResolver {
    constructor(
        private readonly activitiesService: ActivitiesService
    ) {
    }

    @Mutation()
    async activity() {
        return {}
    }

    @UseGuards(GqlAuthGuard)
    @ResolveProperty()
    async create(_: any, @Args() {type, title, code, url, expire}: any, @CurrentUser()user ?: User): Promise<ActivityRecord | null> {
        console.log(`mutation:create:user=${JSON.stringify(user)}`);
        if (!user) {
            return null;
        }
        let expireTime = moment().add(7, "day").utc().toDate();
        if (expire) {
            expireTime = moment(expire).utc().toDate()
        }
        const createdActivity: any = await this.activitiesService.create({type, title, code, url, username: user.username, expire: expireTime});
        return createdActivity;
    }
}
