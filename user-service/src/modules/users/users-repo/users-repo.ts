import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/KnexConnection';
import { ServiceCreateUserDto } from '../dto/service/ServiceCreateUser.dto';
import { ServiceUpdateUserDto } from '../dto/service/ServiceUpdateUser.dto';
import { ConfigProvider } from 'src/config/config-provider/config-provider';
import { TUser } from '../types/User.type';

export const USERS_REPO = 'USERS_REPO';

export interface IUsersRepo {
  getAll(): Promise<TUser[]>;

  getById(idUser: number): Promise<TUser | undefined>;

  getByUsername(username: string): Promise<TUser | undefined>;

  insert(
    createUserDto: ServiceCreateUserDto,
    trx?: Knex,
  ): Promise<
    {
      id: number;
    }[]
  >;

  updateUser(
    idUser: number,
    updateUserDto: ServiceUpdateUserDto,
    trx?: Knex,
  ): Promise<
    {
      id: number;
    }[]
  >;

  checkUpdatedColumns(
    newUserDto: ServiceUpdateUserDto,
    oldUser: Omit<TUser, 'password' | 'username'>,
  ): {
    tableName: string;
    columnName: string;
    oldValue: string;
    newValue: string;
    entityId: number;
  }[];
}

@Injectable()
export class UsersRepo implements IUsersRepo {
  constructor(
    @Inject(KNEX_CONNECTION) private readonly connection: Knex,
    private readonly configProvider: ConfigProvider,
  ) {}

  async getAll() {
    const users: TUser[] = await this.connection('users')
      .select(
        'user_id',
        'username',
        'password',
        'email',
        'firstname',
        'middlename',
        'lastname',
        'date_of_birth',
      )
      .orderBy('username');
    return users;
  }

  async getById(idUser: number) {
    const user: TUser | undefined = await this.connection('users')
      .where('user_id', idUser)
      .first();
    return user;
  }

  async getByUsername(username: string) {
    const user: TUser | undefined = await this.connection('users')
      .where('username', username)
      .first();
    return user;
  }

  async insert(
    createUserDto: ServiceCreateUserDto,
    trx: Knex = this.connection,
  ) {
    const ids: { id: number }[] = await trx('users')
      .insert({
        username: createUserDto.username,
        password: createUserDto.password,
        email: createUserDto.email,
        firstname: createUserDto.firstname,
        lastname: createUserDto.lastname,
        middlename: createUserDto.middlename,
        date_of_birth: createUserDto.dateOfBirth,
      })
      .returning('user_id');
    return ids;
  }

  async updateUser(
    idUser: number,
    updateUserDto: ServiceUpdateUserDto,
    trx: Knex = this.connection,
  ) {
    const ids: { id: number }[] = await trx('users')
      .update({
        email: updateUserDto.email,
        firstname: updateUserDto.firstname,
        lastname: updateUserDto.lastname,
        middlename: updateUserDto.middlename,
        date_of_birth: updateUserDto.dateOfBirth,
      })
      .where({ user_id: idUser })
      .returning('user_id');
    return ids;
  }

  checkUpdatedColumns(
    newUserDto: ServiceUpdateUserDto,
    oldUser: Omit<TUser, 'password' | 'username'>,
  ) {
    const tableName = `${this.configProvider.databaseSchema}.users`;
    const columns: {
      tableName: string;
      columnName: string;
      oldValue: string;
      newValue: string;
      entityId: number;
    }[] = [];
    if (newUserDto.email)
      columns.push({
        tableName,
        columnName: 'email',
        oldValue: oldUser.email,
        newValue: newUserDto.email,
        entityId: oldUser.user_id,
      });
    if (newUserDto.firstname)
      columns.push({
        tableName,
        columnName: 'firstname',
        oldValue: oldUser.firstname,
        newValue: newUserDto.firstname,
        entityId: oldUser.user_id,
      });
    if (newUserDto.middlename)
      columns.push({
        tableName,
        columnName: 'middlename',
        oldValue: oldUser.middlename,
        newValue: newUserDto.middlename,
        entityId: oldUser.user_id,
      });
    if (newUserDto.lastname)
      columns.push({
        tableName,
        columnName: 'lastname',
        oldValue: oldUser.lastname,
        newValue: newUserDto.lastname,
        entityId: oldUser.user_id,
      });
    if (newUserDto.dateOfBirth)
      columns.push({
        tableName,
        columnName: 'date_of_birth',
        oldValue: oldUser.date_of_birth,
        newValue: newUserDto.dateOfBirth,
        entityId: oldUser.user_id,
      });
    return columns;
  }
}
