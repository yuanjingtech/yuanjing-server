import {Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {Request} from "@nestjs/common"
import {AuthService} from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly authService: AuthService,
  ) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: any) {
    console.log(`getProfile`);
    return req.user;
  }
}
