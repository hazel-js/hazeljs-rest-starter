import 'reflect-metadata';
import { HazelApp, BuiltInHealthChecks } from '@hazeljs/core';
import { SwaggerModule } from '@hazeljs/swagger';
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

  // Register graceful shutdown handler
  app.registerShutdownHandler({
    name: 'cleanup',
    handler: async () => {
      console.log('Cleaning up resources...');
    },
    timeout: 5000,
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
}

bootstrap();
