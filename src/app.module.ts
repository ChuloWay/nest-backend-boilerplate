import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserController } from './user/user/user.controller';
import { UserService } from './user/user/user.service';
import { UserSchema } from './model/user.schema';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: '.env'
        }),
        MongooseModule.forRoot( configuration().database.host, {
            dbName:configuration().database.name
        }),
        MongooseModule.forFeature([{
            name: 'User',
            schema: UserSchema
        }]),
        AuthModule,
        JwtModule
    ],
    controllers: 
    [AppController, UserController ],
    providers: [AppService, UserService],
})
export class AppModule {}