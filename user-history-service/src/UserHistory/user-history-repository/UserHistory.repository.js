export class UserHistoryRepository {
  /**
   * @param {import('knex').Knex} connection
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * @param {{ tableName: string, columnName: string, oldValue: any, newValue: any }} payload
   * @param {import('knex').Knex} trx
   */
  async insert(payload, trx = this.connection) {
    /**@type {{ id: number }[]} */
    const ids = await trx("history")
      .insert({
        table_name: payload.tableName,
        column_name: payload.columnName,
        old_value: payload.oldValue || null,
        new_value: payload.newValue,
      })
      .returning("id");
    return ids;
  }

  /**
   * @param {string} tableName
   * @param {string} columnName
   * @param {number} entityId
   * @param {number} limit
   * @param {number} offset
   */
  async getHistoryRecord(
    tableName,
    columnName,
    entityId,
    limit = 10,
    offset = 0
  ) {
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
        column_name: columnName,
        entity_id: entityId,
      })
      .limit(limit)
      .offset(offset);
    return historyRecords;
  }
}
