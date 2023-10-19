import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepo, USERS_REPO } from '../users-repo/users-repo';
import { CreateUserDto } from '../dto/controller/CreateUser.dto';
import {
  IPasswordHasher,
  UTILS_PASSWORD_HASHER,
} from 'src/shared/utils/password-hasher/password-hasher';
import { ServiceCreateUserDto } from '../dto/service/ServiceCreateUser.dto';

export const USERS_SERVICE = 'USERS_SERVICE';

export interface IUsersService {
  getAll(): Promise<
    {
      user_id: number;
      username: string;
      email: string;
      firstname: string;
      middlename: string;
      lastname: string;
      date_of_birth: string;
    }[]
  >;

  createUser(createUserDto: CreateUserDto): Promise<number>;
}

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USERS_REPO) private readonly usersRepo: IUsersRepo,
    @Inject(UTILS_PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async getAll() {
    const users = await this.usersRepo.getAll();
    return users;
  }

  async createUser(createUserDto: CreateUserDto) {
    const checkExist = await this.usersRepo.getByUsername(
      createUserDto.username,
    );
    if (checkExist)
      throw new Error('Пользователь с таким ником уже существует!');
    const newPassword = await this.passwordHasher.hash(createUserDto.password);
    const serviceDto = new ServiceCreateUserDto(
      createUserDto.username,
      newPassword,
      createUserDto.email,
      createUserDto.firstname,
      createUserDto.middlename,
      createUserDto.lastname,
      createUserDto.dateOfBirth,
    );
    const id = (await this.usersRepo.insert(serviceDto))[0].id;
    return id;
  }
}
