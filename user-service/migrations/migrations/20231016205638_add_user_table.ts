import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.schema
    .withSchema('user_service')
    .createTableIfNotExists('users', (tbl) => {
      tbl
        .bigIncrements('user_id')
        .notNullable()
        .comment('Первичный ключ пользователя');
      tbl.string('username', 50).notNullable().comment('Логин пользователя');
      tbl.string('password', 200).notNullable().comment('Пароль пользователя');
      tbl
        .string('email', 50)
        .notNullable()
        .comment('Адрес эл. почты пользователя');
      tbl.string('firstname', 50).nullable().comment('Имя пользователя');
      tbl.string('middlename', 50).nullable().comment('Отчество пользователя');
      tbl.string('lastname', 50).nullable().comment('Фамилия пользователя');
      tbl.date('date_of_birth').nullable().comment('Дата рождения');
    });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.withSchema('user_service').dropTable('users');
}
