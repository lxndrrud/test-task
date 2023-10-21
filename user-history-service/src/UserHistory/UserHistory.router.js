import { Router } from "express";
import { UserHistoryController } from "./UserHistory.controller.js";
import { UserHistoryRepository } from "./user-history-repository/UserHistory.repository.js";
import { UserHistoryService } from "./user-history-service/UserHistory.service.js";

export function UserHistoryRouterBootstrap() {
  const subrouter = Router();
  const repo = new UserHistoryRepository();
  const service = new UserHistoryService(repo);
  const controller = new UserHistoryController(service);

  subrouter.post("/", controller.createHistoryRecord.bind(controller));

  subrouter.get("/", controller.getHistoryRecords.bind(controller));

  return subrouter;
}
