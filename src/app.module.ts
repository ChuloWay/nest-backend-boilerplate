import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserController } from './user/user/user.controller';
import { UserService } from './user/user/user.service';
import { UserSchema } from './model/user.schema';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost', {
            dbName: 'NestUser'
        }),
        MongooseModule.forFeature([{
            name: 'User',
            schema: UserSchema
        }])
    ],
    controllers: 
    [AppController, UserController],
    providers: [AppService, UserService],
})
export class AppModule {}