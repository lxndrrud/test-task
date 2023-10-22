export class UserHistoryRepository {
  /**
   * @param {import('knex').Knex} connection
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * @param {{ tableName: string, columnName: string, oldValue: any, newValue: any, entityId: number }} payload
   * @param {import('knex').Knex} trx
   */
  async insert(payload, trx = this.connection) {
    /**@type {{ history_id: number }[]} */
    const ids = await trx("history")
      .insert({
        table_name: payload.tableName,
        column_name: payload.columnName,
        old_value: payload.oldValue || null,
        new_value: payload.newValue,
        entity_id: payload.entityId,
      })
      .returning("history_id");
    return ids;
  }

  /**
   * @param {{ tableName: string, columnName: string, oldValue: any, newValue: any, entityId: number }[]} payload
   * @param {import('knex').Knex} trx
   */
  async insertArray(payload, trx = this.connection) {
    const mapped = payload.map((el) => ({
      table_name: el.tableName,
      column_name: el.columnName,
      old_value: JSON.stringify(el.oldValue || null),
      new_value: JSON.stringify(el.newValue),
      entity_id: el.entityId,
    }));
    /**@type {{ history_id: number }[]} */
    const ids = await trx("history").insert(mapped).returning("history_id");
    return ids;
  }

  /**
   * @param {string} tableName
   * @param {number} entityId
   * @param {number} page
   * @param {number} limit
   */
  async getHistoryRecord(tableName, entityId, page = 1, limit = 10) {
    /**
     * @type {{ history_id: number,
     * table_name: string,
     * column_name: string,
     * old_value: any,
     * new_value: any,
     * entity_id: number,
     * created_at: string
     * }[]}
     * */
    const historyRecords = await this.connection("history")
      .where({
        table_name: tableName,
        entity_id: entityId,
      })
      .limit(limit)
      .offset((page - 1) * limit);
    const parsed = historyRecords.map((rec) => ({
      ...rec,
      history_id: Number(rec.history_id),
      entity_id: Number(rec.entity_id),
    }));
    return parsed;
  }

  /**
   * @param {string} tableName
   * @param {number} entityId
   */
  async countHistoryRecords(tableName, entityId) {
    const count = (
      await this.connection("history")
        .where({
          table_name: tableName,
          entity_id: entityId,
        })
        .count("history_id")
    )[0].count;
    return Number(count);
  }
}
