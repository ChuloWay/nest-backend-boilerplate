import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt'

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({
        description: 'The First name of the User'
    })
    firstname: string;

    @Prop({
        description: 'The Last name of the User'
    })
    lastname: string;

    @Prop({
        description: 'The Last name of the User'
    })
    username: string;

    @Prop({
        description: 'The Password of the User'
    })
    password: string;

    @Prop({
        description: 'The Email of the User'
    })
    email: string;
}


export const UserSchema = SchemaFactory.createForClass(User);

