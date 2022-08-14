import { Controller, Body, HttpStatus, Param, Res, Get, Post, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async index(@Res() response) {
      try {
        const UserData = await this.userService.findAll();
        return response.status(HttpStatus.OK).json({
            message: 'All User Details',
            data: UserData,
        });
          } catch (err) {
            return response.status(err.status).json(err.response);
          }
            };

    @Post()
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userService.create(createUserDto);

            return response.status(HttpStatus.CREATED).json({
                message:'New User', 
                data: newUser,
            });
        } catch(err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User Not Created',
                error: 'Bad Request!'
            });
        }
    };

    @Put('/:id')
    async updateUser(@Res() response, @Param('id') userId: string, 
    @Body() updateUserDto: UpdateUserDto) {
        try {
            const existingUser = await this.userService.update(userId, updateUserDto);

            return response.status(HttpStatus.OK).json({
                message: 'User Updated',
                data: existingUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteUser(@Res() response, @Param('id') userId: string) {
        try {
            const deletedUser = await this.userService.delete(userId);

            return response.status(HttpStatus.OK).json({
                message: 'User Deleted',
                data: deletedUser
            });
        } catch(err) {
            return response.status(err.status).json(err.response)
        }
    }


}
