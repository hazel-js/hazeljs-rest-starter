import { HazelModule } from '@hazeljs/core';
import { ConfigModule } from '@hazeljs/config';
import { SwaggerModule } from '@hazeljs/swagger';
import { PrismaModule } from '@hazeljs/prisma';
import { JwtModule } from '@hazeljs/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@HazelModule({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.forRoot({
      secret: process.env.JWT_SECRET || 'hazeljs-starter-dev-secret-change-me',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    }),
    SwaggerModule,
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
