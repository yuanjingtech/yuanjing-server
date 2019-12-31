import {createParamDecorator} from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, [root, args, ctx, info]) => {
    console.log(`CurrentUser=${JSON.stringify(ctx.req.user)}`);
    console.log(`${ctx.req.header("Authorization")}`);
    return ctx.req && ctx.req.user;
},);
