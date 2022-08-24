import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller()
export class AuthController {
    constructor(private authService : AuthService) { }  

@Get('login')
getHello(): string {
    return this.authService.getHello()
}

@UseGuards(AuthGuard('local'))
@Post('login')
async login(@Request() req) {
    return this.authService.login(req.user)
}

}
