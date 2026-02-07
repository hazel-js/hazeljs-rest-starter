import { HazelModule } from '@hazeljs/core';
import { ConfigModule } from '@hazeljs/config';
import { SwaggerModule } from '@hazeljs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@HazelModule({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SwaggerModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
