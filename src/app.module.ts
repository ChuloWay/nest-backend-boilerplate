import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './model/user.entity';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
            type:'sqlite',
            database: 'db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,  
        }),
        TypeOrmModule.forFeature([UserEntity]),  
        UsersModule,
        AuthModule
    ],
    controllers: 
    [AppController, ],
    providers: [AppService, UserService],
})
export class AppModule {}