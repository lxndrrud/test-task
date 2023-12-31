import { Module } from '@nestjs/common';
import { ConfigProvider } from './config-provider/config-provider';

@Module({
  providers: [ConfigProvider],
  exports: [ConfigProvider],
})
export class ConfigModule {}
