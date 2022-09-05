
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import appConfig from 'src/config/app.config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.register({
      secret: appConfig().appSecret,
      signOptions: { expiresIn: '600s' },
    }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
