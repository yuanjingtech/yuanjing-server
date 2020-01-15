import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {Activity} from "../interfaces/activity.interface";
import {CreateActivityDto} from "../dto/create-activity.dto";
import {ActivityOrderByInput, PageInput} from "../graphql";

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectModel('Activity') private readonly model: Model<Activity>
    ) {
    }

    async create(createActivityDto: CreateActivityDto): Promise<Activity> {
        console.log(`ActivitiesService:create:${JSON.stringify(createActivityDto)}`);
        const createdActivity: Model<Activity> = new this.model(createActivityDto);
        return await createdActivity.save();
    }

    async findAll(): Promise<Activity[]> {
        return await this.model.find().exec();
    }

    async find(param: any, page: PageInput): Promise<Activity[]> {
        const query = this.model.find({});
        if (page.last) {
            query.sort({_id: -1});
            if (page.before) {
                query.where("_id").lt(page.before);
            }
            query.limit(page.last + 1)
        } else if (page.first) {
            query.sort({_id: 1});
            if (page.after) {
                query.where("_id").gt(page.after);
            }
            query.limit(page.first + 1)
        }
        return await query.exec();
    }
}
