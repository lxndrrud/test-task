// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  migration: {
    client: "pg",
    connection: {
      host: "test-task-db",
      port: 5432,
      database: "taskdb",
      user: "taskuser",
      password: "taskpassw0rd",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    searchPath: "user_history_service",
  },
};
