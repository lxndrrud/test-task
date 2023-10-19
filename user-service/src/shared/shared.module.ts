import { Module } from '@nestjs/common';
import {
  PasswordHasher,
  UTILS_PASSWORD_HASHER,
} from './utils/password-hasher/password-hasher';

@Module({
  providers: [
    {
      provide: UTILS_PASSWORD_HASHER,
      useClass: PasswordHasher,
    },
  ],
  exports: [
    {
      provide: UTILS_PASSWORD_HASHER,
      useClass: PasswordHasher,
    },
  ],
})
export class SharedModule {}
