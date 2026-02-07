import { HazelModule } from '@hazeljs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@HazelModule({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
