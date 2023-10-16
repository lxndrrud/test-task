import knex from 'knex';
import { ConfigProvider } from 'src/config/config-provider/config-provider';

export const KnexConnection = {
  provide: 'KNEX_CONNECTION',
  inject: [ConfigProvider],
  useFactory: (config: ConfigProvider) => {
    return knex({
      client: 'pg',
      connection: {
        host: config.databaseHost,
        port: config.databasePort,
        user: config.databaseUser,
        password: config.databasePassword,
        database: config.databaseName,
      },
      searchPath: [config.databaseSchema],
    });
  },
};
