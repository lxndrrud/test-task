/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema("user_history_service")
    .createTable("history", (tbl) => {
      tbl
        .bigIncrements("history_id")
        .notNullable()
        .comment("Первичный ключ исторической записи");
      tbl
        .string("table_name", 80)
        .notNullable()
        .comment("Название таблицы со схемой");
      tbl.string("column_name", 80).notNullable().comment("Название столбца");
      tbl.json("old_value").nullable().comment("Старое значение");
      tbl.json("new_value").notNullable().comment("Новое значение");
      tbl
        .bigInteger("entity_id")
        .notNullable()
        .comment("Идентификатор сущности");
      tbl
        .datetime("created_at")
        .notNullable()
        .defaultTo(knex.fn.now())
        .comment("Дата и время создания записи");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema("user_history_service")
    .dropTableIfExists("history");
};
