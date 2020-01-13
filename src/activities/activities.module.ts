import {Module} from '@nestjs/common';
import {ActivitiesService} from './activities.service';
import {ActivityMutationResolver, ActivityRecordResolver, ViewerResolver} from './activities.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import {ActivitySchema} from "../schemas/activity.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Activity', schema: ActivitySchema}])],
  providers: [ActivitiesService, ViewerResolver, ActivityRecordResolver, ActivityMutationResolver]
})
export class ActivitiesModule {
}
