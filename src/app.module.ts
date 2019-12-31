import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from "path";
import {SubAppModule} from './sub-app/sub-app.module';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {CoinModule} from './coin/coin.module';
import {AuthService} from "./auth/auth.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule, AuthModule],
      useFactory: async (configService: ConfigService, authService: AuthService) => ({
        context: ({req}) => {
          authService.validateToken(req);
          return ({req});
        },
        typePaths: ['./**/*.graphql'],
        definitions: {
          path: join(process.cwd(), 'src/graphql.ts'),
        },
        debug: false,
        playground: true,
      }),
      inject: [ConfigService, AuthService],
    }),
    SubAppModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO'),
      }),
      inject: [ConfigService],
    }),
    CoinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
