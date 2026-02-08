import { HazelModule } from '@hazeljs/core';
import { AuthController } from './auth.controller';
import { AuthLocalService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@HazelModule({
  controllers: [AuthController],
  providers: [AuthLocalService, JwtAuthGuard],
  exports: [AuthLocalService, JwtAuthGuard],
})
export class AuthModule {}
