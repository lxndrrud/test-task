import { HistoryRecordArrayCreateDtoSchema } from "./dto/HistoryRecord.dto.js";

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
  async createHistoryRecords(req, res) {
    const payload = req.body.payload;
    if (!payload)
      return this.errorHandler.badRequest400(res, "Не указано тело запроса!");
    const { error, value } =
      HistoryRecordArrayCreateDtoSchema.validate(payload);
    if (error) return this.errorHandler.badRequest400(res, error);

    try {
      await this.userHistoryService.createHistoryRecords(value);
      res.status(200).end();
    } catch (error) {
      this.errorHandler.internalError500(res, error);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getHistoryRecords(req, res) {
    const tableName = req.query.tableName;
    if (!tableName)
      return this.errorHandler.badRequest400(
        res,
        "Не указано название таблицы!"
      );
    const entityId = req.query.entityId;
    if (!entityId)
      return this.errorHandler.badRequest400(
        res,
        "Не указан идентификатор сущности!"
      );
    const page = Number(req.query.currentPage);
    const limit = Number(req.query.pageLimit);

    try {
      const result = await this.userHistoryService.getHistoryRecords(
        tableName,
        entityId,
        page || undefined,
        limit || undefined
      );
      res.status(200).json(result);
    } catch (error) {
      this.errorHandler.internalError500(res, error);
    }
  }
}
