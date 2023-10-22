import { Module } from '@nestjs/common';
import { UsersController } from './users-controller/users.controller';
import { USERS_SERVICE, UsersService } from './users-service/users-service';
import { USERS_REPO, UsersRepo } from './users-repo/users-repo';
import { DatabaseModule } from 'src/database/database.module';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [DatabaseModule, SharedModule, ConfigModule],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: USERS_REPO,
      useClass: UsersRepo,
    },
  ],
})
export class UsersModule {}
