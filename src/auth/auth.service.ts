import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {
    }

    async validateUser(username: string, password: string): Promise<any> {
        console.log(`AuthService.validateUser(${username},${password})`);
        const user = await this.usersService.findOne(username);
        if (user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async validateToken(req: any) {
        const authorization = req.header('Authorization');
        if (authorization) {
            const user = this.jwtService.decode(authorization.replace('Bearer ', ''));
            console.log(`${JSON.stringify(user)}`);
            req.user = {username: user.sub};
        }
    }

    async login({username, password}: { username: string; password: string; }): Promise<any | null> {
        console.log(`login`);
        const user = await this.validateUser(username, password);
        if (user != null) {
            console.log(`login:user=${JSON.stringify(user)}`);
            const payload = {name: user.username, sub: user.userId};
            return {
                access_token: this.jwtService.sign(payload, {subject: user.username}),
            };
        }
        return null
    }
}
