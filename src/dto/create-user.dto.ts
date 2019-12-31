import {IsString, IsInt} from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;
}
