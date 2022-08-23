import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username);
    if (!user) return null;
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new NotAcceptableException('wrong credentials');
    }
    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  async login(user: any) {

    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
