import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/KnexConnection';
import { ServiceCreateUserDto } from '../dto/service/ServiceCreateUser.dto';

export const USERS_REPO = 'USERS_REPO';

export interface IUsersRepo {
  getAll(): Promise<
    {
      user_id: number;
      username: string;
      password: string;
      email: string;
      firstname: string | null;
      middlename: string | null;
      lastname: string | null;
      date_of_birth: string | null;
    }[]
  >;

  getByUsername(username: string): Promise<
    | {
        user_id: number;
        username: string;
        password: string;
        email: string;
        firstname: string | null;
        middlename: string | null;
        lastname: string | null;
        date_of_birth: string | null;
      }
    | undefined
  >;

  insert(
    createUserDto: ServiceCreateUserDto,
    trx?: Knex,
  ): Promise<
    {
      id: number;
    }[]
  >;
}

@Injectable()
export class UsersRepo implements IUsersRepo {
  constructor(@Inject(KNEX_CONNECTION) private readonly connection: Knex) {}

  async getAll() {
    const users: {
      user_id: number;
      username: string;
      password: string;
      email: string;
      firstname: string | null;
      middlename: string | null;
      lastname: string | null;
      date_of_birth: string | null;
    }[] = await this.connection('users')
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

  async getByUsername(username: string) {
    const user:
      | {
          user_id: number;
          username: string;
          password: string;
          email: string;
          firstname: string | null;
          middlename: string | null;
          lastname: string | null;
          date_of_birth: string | null;
        }
      | undefined = await this.connection('users')
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
}
