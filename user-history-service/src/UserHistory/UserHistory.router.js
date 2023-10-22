import { Router } from "express";
import { UserHistoryController } from "./UserHistory.controller.js";
import { UserHistoryRepository } from "./user-history-repository/UserHistory.repository.js";
import { UserHistoryService } from "./user-history-service/UserHistory.service.js";
import { KnexConnection } from "../Database/KnexConnection.js";
import { ErrorHandler } from "../Shared/error-handler/ErrorHandler.js";

export function UserHistoryRouterBootstrap() {
  const subrouter = Router();
  const errorHandler = new ErrorHandler();
  const repo = new UserHistoryRepository(KnexConnection);
  const service = new UserHistoryService(KnexConnection, repo);
  const controller = new UserHistoryController(service, errorHandler);

  subrouter.post("/", controller.createHistoryRecords.bind(controller));

  subrouter.get("/", controller.getHistoryRecords.bind(controller));

  return subrouter;
}
