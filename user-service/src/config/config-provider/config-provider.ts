import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigProvider {
  public readonly databaseHost = process.env.DB_HOST;
  public readonly databasePort = Number(process.env.DB_PORT);
  public readonly databaseUser = process.env.DB_USER;
  public readonly databasePassword = process.env.DB_PASSWORD;
  public readonly databaseName = process.env.DB_NAME;
  public readonly databaseSchema = process.env.DB_SCHEMA;
}
