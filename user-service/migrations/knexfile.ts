import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  migration: {
    client: 'postgresql',
    connection: {
      host: 'test-task-db',
      port: 5432,
      database: 'taskdb',
      user: 'taskuser',
      password: 'taskpassw0rd',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    searchPath: 'user_service',
  },
};

module.exports = config;
