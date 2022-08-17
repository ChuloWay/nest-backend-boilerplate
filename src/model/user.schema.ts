import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
    @ApiProperty({
        description: 'The First name of the User'
    })
    firstname: string;

    @ApiProperty({
        description: 'The Last name of the User'
    })
    lastname: string;

    @ApiProperty({
        description: 'The Email of the User'
    })
    email: string;

    @ApiProperty({
        description: 'The Phone number of the User'
    })
    phone: number
}

export const UserSchema = SchemaFactory.createForClass(User);