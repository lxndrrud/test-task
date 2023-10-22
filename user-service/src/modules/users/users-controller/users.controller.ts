import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Patch,
  Post,
} from '@nestjs/common';
import { IUsersService, USERS_SERVICE } from '../users-service/users-service';
import { CreateUserDto } from '../dto/controller/CreateUser.dto';
import { UpdateUserDto } from '../dto/controller/UpdateUser.dto';

@Controller('/')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
  ) {}

  @Get('/')
  async getAll() {
    try {
      const users = await this.usersService.getAll();
      return users;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const id = await this.usersService.createUser(createUserDto);
      return id;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
  @Patch('/')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    try {
      const id = await this.usersService.updateUser(updateUserDto);
      return id;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
