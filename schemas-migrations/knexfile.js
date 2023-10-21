// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  migration: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 7432,
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
    searchPath: "public",
  },
};
