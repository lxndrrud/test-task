import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { IUsersService, USERS_SERVICE } from '../users-service/users-service';
import { CreateUserDto } from '../dto/controller/CreateUser.dto';

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
}
