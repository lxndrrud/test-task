import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.schema.createSchemaIfNotExists('user_service');
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropSchema('user_service');
}
