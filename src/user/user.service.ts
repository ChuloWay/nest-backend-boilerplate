import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
    
  async findOne(id: any): Promise<any> {
    return await this.userRepository.findOne({where: { id }});
  }

  async findByname(username: string): Promise<UserEntity | undefined> {
    const user = this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async create(user: CreateUserDto) {
    const { password } = user
    const saltorRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltorRounds);
    user.password = hashedPassword
    const newUser = await this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async update(user: UserEntity): Promise<UpdateResult> {
    return await this.userRepository.update(user.id, user);
  }

  async delete(user): Promise<DeleteResult> {
    return await this.userRepository.delete(user);
  }
}
