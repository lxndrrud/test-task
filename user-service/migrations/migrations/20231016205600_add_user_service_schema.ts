import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createSchema('user_service');
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropSchemaIfExists('user_service');
}
