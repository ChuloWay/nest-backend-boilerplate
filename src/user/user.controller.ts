import {
  Controller,
  Body,
  HttpStatus,
  Param,
  Res,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserEntity } from '../model/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiResponse({ status: 200, description: 'Return a list of users' })
  @ApiBody({ type: [UserEntity] })
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
  }

  @Get('one/:id')
  @ApiResponse({ status: 200, description: 'Get Single User' })
  @ApiBody({ type: [UserEntity] })
  async findUser(@Res() response, @Param('id') id) {
    try {
      const user = await this.userService.findOne(id);
      return response.status(HttpStatus.CREATED).json({
        message: 'User Found',
        data: user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    };
  };


  @Put(':id/update')
  @ApiResponse({ status: 200, description: 'Update a User' })
  @ApiBody({ type: [UserEntity] })
  async update(
    @Res() response,
    @Param('id') id,
    @Body() userData: UserEntity,
  ): Promise<any> {
    try {
      userData.id = Number(id);
      const user = await this.userService.update(userData);
      return response.status(HttpStatus.OK).json({
        message: 'User Updated',
        data: user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id/delete')
  @ApiResponse({ status: 200, description: 'Delete a User' })
  @ApiBody({ type: [UserEntity] })
  async delete(@Res() response, @Param('id') id) {
    try {
      const deletedUser = await this.userService.delete(id);
      return response.status(HttpStatus.OK).json({
        message: 'User Deleted',
        data: deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
