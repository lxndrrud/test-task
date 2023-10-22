import { Module } from '@nestjs/common';
import {
  PasswordHasher,
  UTILS_PASSWORD_HASHER,
} from './utils/password-hasher/password-hasher';
import {
  HistoryService,
  LOGIC_HISTORY_SERVICE,
} from './logic/history-service/history-service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: UTILS_PASSWORD_HASHER,
      useClass: PasswordHasher,
    },
    {
      provide: LOGIC_HISTORY_SERVICE,
      useClass: HistoryService,
    },
  ],
  exports: [
    {
      provide: UTILS_PASSWORD_HASHER,
      useClass: PasswordHasher,
    },
    {
      provide: LOGIC_HISTORY_SERVICE,
      useClass: HistoryService,
    },
  ],
})
export class SharedModule {}
