import 'reflect-metadata';
import { HazelApp, BuiltInHealthChecks } from '@hazeljs/core';
import { SwaggerModule } from '@hazeljs/swagger';
import { PrismaService } from '@hazeljs/prisma';
import { AppModule } from './app.module';

async function bootstrap() {
  // Setup Swagger documentation (must be called before app creation)
  SwaggerModule.setRootModule(AppModule);

  const app = new HazelApp(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  // Register health checks
  app.registerHealthCheck(BuiltInHealthChecks.memoryCheck(500));
  app.registerHealthCheck(BuiltInHealthChecks.eventLoopCheck(100));

  // Register graceful shutdown handler for Prisma
  const prisma = app.getContainer().resolve(PrismaService);
  app.registerShutdownHandler({
    name: 'database',
    handler: async () => {
      await prisma.$disconnect();
      console.log('Database connection closed');
    },
    timeout: 5000,
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
}

bootstrap();
