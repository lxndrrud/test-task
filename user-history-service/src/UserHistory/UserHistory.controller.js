export class UserHistoryController {
  /**
   * @param {import('./user-history-service/UserHistory.service').UserHistoryService} userHistoryService
   * @param {import('../Shared/error-handler/ErrorHandler').ErrorHandler} errorHandler
   */
  constructor(userHistoryService, errorHandler) {
    this.userHistoryService = userHistoryService;
    this.errorHandler = errorHandler;
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createHistoryRecord(req, res) {
    /** @type {string | undefined} */
    const tableName = req.body.tableName;
    if (!tableName)
      return this.errorHandler.badRequest400(
        res,
        "Не указано название таблицы!"
      );
    /** @type {string | undefined} */
    const columnName = req.body.columnName;
    if (!columnName)
      return this.errorHandler.badRequest400(
        res,
        "Не указано название столбца!"
      );
    let oldValue, newValue;
    try {
      oldValue = JSON.parse(req.body.oldValue);
      newValue = JSON.parse(req.body.newValue);
      if (!newValue)
        return this.errorHandler.badRequest400(
          res,
          "Не указано новое значение!"
        );
    } catch (error) {
      return this.errorHandler.internalError500();
    }

    const entityId = Number(req.body.entityId);
    if (!entityId)
      return this.errorHandler.badRequest400(
        res,
        "Не указан идентификатор записи!"
      );

    try {
      await this.userHistoryService.createHistoryRecord(
        tableName,
        columnName,
        oldValue,
        newValue,
        entityId
      );
    } catch (error) {
      this.errorHandler.internalError500(res, error);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getHistoryRecords(req, res) {
    /** @type {string | undefined} */
    const tableName = req.body.tableName;
    if (!tableName)
      return this.errorHandler.badRequest400(
        res,
        "Не указано название таблицы!"
      );

    /** @type {string | undefined} */
    const columnName = req.body.columnName;
    if (!columnName)
      return this.errorHandler.badRequest400(
        res,
        "Не указано название столбца!"
      );

    const entityId = Number(req.body.entityId);
    if (!entityId)
      return this.errorHandler.badRequest400(
        res,
        "Не указан идентификатор записи!"
      );
  }
}
