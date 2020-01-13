import {Module} from '@nestjs/common';
import {AuthMutationResolver, ViewerResolver} from "./auth.resolver";
import {AuthService} from './auth.service';
import {LocalStrategy} from "./local.strategy";
import {jwtConstants} from "./constants";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '10years'},
        }),
    ],
    providers: [ViewerResolver, AuthMutationResolver, AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}
