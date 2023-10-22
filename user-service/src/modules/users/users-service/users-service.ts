import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepo, USERS_REPO } from '../users-repo/users-repo';
import { CreateUserDto } from '../dto/controller/CreateUser.dto';
import {
  IPasswordHasher,
  UTILS_PASSWORD_HASHER,
} from 'src/shared/utils/password-hasher/password-hasher';
import { ServiceCreateUserDto } from '../dto/service/ServiceCreateUser.dto';
import { ConfigProvider } from 'src/config/config-provider/config-provider';
import {
  IHistoryService,
  LOGIC_HISTORY_SERVICE,
} from 'src/shared/logic/history-service/history-service';
import { UpdateUserDto } from '../dto/controller/UpdateUser.dto';
import { ServiceUpdateUserDto } from '../dto/service/ServiceUpdateUser.dto';
import { TUser } from '../types/User.type';
import { KNEX_CONNECTION } from 'src/database/KnexConnection';
import { Knex } from 'knex';

export const USERS_SERVICE = 'USERS_SERVICE';

export interface IUsersService {
  getAll(): Promise<TUser[]>;

  createUser(createUserDto: CreateUserDto): Promise<number>;

  updateUser(updateUserDto: UpdateUserDto): Promise<void>;
}

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USERS_REPO) private readonly usersRepo: IUsersRepo,
    @Inject(LOGIC_HISTORY_SERVICE)
    private readonly historyService: IHistoryService,
    @Inject(KNEX_CONNECTION) private readonly connectionForTrx: Knex,
    @Inject(UTILS_PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
    private readonly configProvider: ConfigProvider,
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

  async updateUser(updateUserDto: UpdateUserDto) {
    const serviceDto = new ServiceUpdateUserDto(
      updateUserDto.email,
      updateUserDto.firstname,
      updateUserDto.middlename,
      updateUserDto.lastname,
      updateUserDto.dateOfBirth,
    );
    const user = await this.usersRepo.getById(updateUserDto.idUser);
    if (!user)
      throw new Error('Пользователь с таким идентификатором не найден!');
    const checkedDto = this.checkUpdatedColumns(serviceDto, user);
    const columns = this.usersRepo.checkUpdatedColumns(checkedDto, user);
    const trx = await this.connectionForTrx.transaction();
    try {
      await this.usersRepo.updateUser(updateUserDto.idUser, checkedDto, trx);
      await this.historyService.createHistoryRecords(columns);
      await trx.commit();
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  checkUpdatedColumns(
    serviceDto: ServiceUpdateUserDto,
    user: Omit<TUser, 'password' | 'username'>,
  ) {
    const newServiceDto = new ServiceUpdateUserDto(
      serviceDto.email,
      serviceDto.firstname,
      serviceDto.middlename,
      serviceDto.lastname,
      serviceDto.dateOfBirth,
    );
    if (user.email === serviceDto.email) newServiceDto.email = undefined;
    if (user.firstname === serviceDto.firstname)
      newServiceDto.firstname = undefined;
    if (user.middlename === serviceDto.middlename)
      newServiceDto.middlename = undefined;
    if (user.lastname === serviceDto.lastname)
      newServiceDto.lastname = undefined;
    if (user.date_of_birth === serviceDto.dateOfBirth)
      newServiceDto.dateOfBirth = undefined;
    return newServiceDto;
  }
}
