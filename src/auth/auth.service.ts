
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService) {}

  async validTest(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByname(username);
    if (!user) return null;
    const isValid = await bcrypt.compare(pass, user.password);
    if(!isValid) {
        throw new NotAcceptableException('Wrong Credentials');
    }
    if (user && isValid ) {
        const { password, ...result } = user;
        return result;
    }
  }

  
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    return await this.userService.create(user)
  }
}