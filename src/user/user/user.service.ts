import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { IUser } from 'src/interface/user.interface';
import { UpdateUserDto } from 'src/dto/update-user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<IUser>) {}
        
        async findAll(): Promise<IUser[]> {
            const allUsers = await 
            this.userModel.find().exec();
             
            return allUsers;
        };

        async create(createUserDto: CreateUserDto): Promise<IUser> {
            const createdUser = new this.userModel(createUserDto);
            
            return createdUser.save();
        };
        
        async update(userId: string, updateUserDto: UpdateUserDto ) : Promise<IUser> {
            const existingUser = await 
            this.userModel.findByIdAndUpdate(userId, updateUserDto, {
                new: true
            });

            if(!existingUser) {
                throw new NotFoundException(` User #${userId} not found`);
            }
            return existingUser;
        }

        async delete(userId: string): Promise<IUser> {
            const deletedUser = await this.userModel.findByIdAndDelete(userId);

            if(!deletedUser) {
                throw new NotFoundException(`User #${userId} Not Found`);
            }
            return deletedUser
        }
}
