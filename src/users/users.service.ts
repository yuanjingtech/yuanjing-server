import {ConflictException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {User} from "../interfaces/user.interface";
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User | null> {
        if (await this.findOne(createUserDto.username) != null) {
            throw new ConflictException();
        }
        const createdUser = new this.userModel(createUserDto);
        await createdUser.save();
        return await this.findOne(createUserDto.username)
    }

    async findOne(username: string): Promise<User | null> {
        return (await this.userModel.findOne({username: username}))._doc;
    }
}
