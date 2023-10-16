import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { KnexConnection } from './KnexConnection';

@Module({
  imports: [ConfigModule],
  providers: [KnexConnection],
  exports: [KnexConnection],
})
export class DatabaseModule {}
