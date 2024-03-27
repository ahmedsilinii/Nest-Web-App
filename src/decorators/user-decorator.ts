import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const User = createParamDecorator(
    //context = request + response
    (data : unknown, ctx : ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
)