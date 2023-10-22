export class UserHistoryService {
  /**
   * @param {import('knex').Knex} connectionForTrx
   * @param {import('../user-history-repository/UserHistory.repository').UserHistoryRepository} userHistoryRepo
   */
  constructor(connectionForTrx, userHistoryRepo) {
    this.connectionForTrx = connectionForTrx;
    this.userHistoryRepo = userHistoryRepo;
  }

  /**
   * @param {{ tableName,
   * columnName,
   * oldValue,
   * newValue,
   * entityId }[]} recordsList
   */
  async createHistoryRecords(recordsList) {
    const trx = await this.connectionForTrx.transaction();
    try {
      const ids = await this.userHistoryRepo.insertArray(recordsList, trx);
      await trx.commit();
      return ids;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  /**
   *
   * @param {string} tableName
   * @param {number} entityId
   * @param {number} page
   * @param {number} limit
   */
  async getHistoryRecords(tableName, entityId, page = 1, limit = 10) {
    const [records, count] = await Promise.all([
      this.userHistoryRepo.getHistoryRecord(tableName, entityId, page, limit),
      this.userHistoryRepo.countHistoryRecords(tableName, entityId),
    ]);
    return {
      pagination: {
        firstPage: 1,
        currentPage: page,
        lastPage: Math.floor(count / limit) + 1,
        pageLimit: limit,
        count: count,
      },
      records,
    };
  }
}
