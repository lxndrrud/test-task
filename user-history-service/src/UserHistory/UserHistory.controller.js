export class UserHistoryController {
  /**
   * @param {import('./user-history-service/UserHistory.service').UserHistoryService} userHistoryService
   */
  constructor(userHistoryService) {
    this.userHistoryService = userHistoryService;
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getById(req, res) {
    res.status(200).json({
      status: "ok",
    });
  }
}
