import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    index() : string {
        return "Returns Users";
    }
}
