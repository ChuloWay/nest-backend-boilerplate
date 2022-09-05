import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserEntity } from './model/user.entity';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 200, description: 'Registers a User' })
  @ApiBody({ type: [UserEntity] })
  async register(@Body() user: any) {
    return this.authService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiResponse({
    status: 200,
    description: 'Signs a Jwt Token For Logged In User',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({ status: 200, description: 'Gets User Profile' })
  getProfile(@Request() req) {
    return req.user;
  }
}
