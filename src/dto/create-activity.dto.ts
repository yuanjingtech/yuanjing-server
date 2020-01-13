import {IsString} from "class-validator";

export class CreateActivityDto {
    @IsString()
    readonly type: string;

    @IsString()
    readonly title: string;

    @IsString()
    readonly code: string;

    @IsString()
    readonly url: string;

    @IsString()
    readonly username: string;

    readonly expire: Date;
}
