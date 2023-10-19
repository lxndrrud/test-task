export class UserHistoryService {
  /**
   * @param {import('../user-history-repository/UserHistory.repository').UserHistoryRepository} userHistoryRepo
   */
  constructor(userHistoryRepo) {
    this.userHistoryRepo = userHistoryRepo;
  }
}
