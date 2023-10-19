import { Router } from "express";
import { UserHistoryController } from "./UserHistory.controller.js";
import { UserHistoryRepository } from "./user-history-repository/UserHistory.repository.js";
import { UserHistoryService } from "./user-history-service/UserHistory.service.js";

export function UserHistoryRouterBootstrap() {
  const subrouter = Router();
  const repo = new UserHistoryRepository();
  const service = new UserHistoryService(repo);
  const controller = new UserHistoryController(service);

  subrouter.get("/", controller.getById.bind(controller));

  return subrouter;
}
