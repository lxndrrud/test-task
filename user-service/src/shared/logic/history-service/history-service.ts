import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigProvider } from 'src/config/config-provider/config-provider';

export const LOGIC_HISTORY_SERVICE = 'LOGIC_HISTORY_SERVICE';

export interface IHistoryService {
  createHistoryRecords(
    payload: {
      tableName: string;
      columnName: string;
      oldValue: any;
      newValue: any;
      entityId: number;
    }[],
  ): Promise<void>;
}

@Injectable()
export class HistoryService implements IHistoryService {
  constructor(private readonly configProvider: ConfigProvider) {}

  async createHistoryRecords(
    payload: {
      tableName: string;
      columnName: string;
      oldValue: any;
      newValue: any;
      entityId: number;
    }[],
  ) {
    await axios.post(`${this.configProvider.historyServiceUrl}/`, {
      payload,
    });
  }
}
