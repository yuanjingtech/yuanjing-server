import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {GqlExecutionContext} from "@nestjs/graphql";
import {Observable} from "rxjs";

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    console.log(`GqlAuthGuard.getRequest`);
    const ctx = GqlExecutionContext.create(context);
    // const req = ctx.getContext().req;
    const req = ctx.switchToHttp().getRequest();
    console.log(`GqlAuthGuard:req=${req}`);
    return req;
  }
}
