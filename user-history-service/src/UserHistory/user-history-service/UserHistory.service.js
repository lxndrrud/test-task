export class UserHistoryService {
  /**
   * @param {import('../user-history-repository/UserHistory.repository').UserHistoryRepository} userHistoryRepo
   */
  constructor(userHistoryRepo) {
    this.userHistoryRepo = userHistoryRepo;
  }

  /**
   * @param {string} tableName
   * @param {string} columnName
   * @param {any} oldValue
   * @param {any} newValue
   * @param {number} entityId
   */
  async createHistoryRecord(
    tableName,
    columnName,
    oldValue,
    newValue,
    entityId
  ) {
    const id = await this.userHistoryRepo.insert({
      tableName,
      columnName,
      oldValue,
      newValue,
      entityId,
    });
    return id;
  }
}
