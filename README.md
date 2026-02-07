# HazelJS Starter

A starter application built with [HazelJS](https://hazeljs.com) - the AI-native backend framework for TypeScript.

## Features

- Decorator-based controllers and services
- Dependency injection
- Swagger/OpenAPI documentation
- Environment configuration
- Health checks and graceful shutdown
- CORS support
- Example Users CRUD module

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
npm install
```

### Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

### Running

```bash
# Development (with ts-node)
npm run start:dev

# Build and run
npm run build
npm start
```

### API Documentation

Once running, visit [http://localhost:3000/swagger](http://localhost:3000/swagger) for interactive Swagger documentation. The raw OpenAPI spec is available at [http://localhost:3000/swagger/spec](http://localhost:3000/swagger/spec).

### Health Checks

- `GET /health` - Liveness probe
- `GET /ready` - Readiness probe
- `GET /startup` - Startup probe

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── app.controller.ts       # Root controller
├── app.service.ts          # Root service
└── users/                  # Example Users module
    ├── users.module.ts     # Module definition
    ├── users.controller.ts # CRUD endpoints
    ├── users.service.ts    # Business logic
    └── dto/
        ├── create-user.dto.ts
        └── update-user.dto.ts
```

## API Endpoints

| Method   | Path          | Description        |
| -------- | ------------- | ------------------ |
| `GET`    | `/`           | Welcome message    |
| `GET`    | `/info`       | Application info   |
| `GET`    | `/users`      | List all users     |
| `GET`    | `/users/:id`  | Get user by ID     |
| `POST`   | `/users`      | Create a new user  |
| `PUT`    | `/users/:id`  | Update a user      |
| `DELETE` | `/users/:id`  | Delete a user      |

## Adding More Modules

HazelJS follows a modular architecture. To add a new module:

1. Create a directory under `src/` (e.g., `src/posts/`)
2. Create the module, controller, service, and DTOs
3. Import the module in `app.module.ts`

```typescript
// src/posts/posts.module.ts
import { HazelModule } from '@hazeljs/core';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@HazelModule({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
```

## Available HazelJS Packages

| Package              | Description                        |
| -------------------- | ---------------------------------- |
| `@hazeljs/core`      | Core framework                     |
| `@hazeljs/config`    | Configuration management           |
| `@hazeljs/swagger`   | OpenAPI documentation              |
| `@hazeljs/auth`      | Authentication & JWT               |
| `@hazeljs/prisma`    | Prisma ORM integration             |
| `@hazeljs/cache`     | Caching (Redis/Memory)             |
| `@hazeljs/websocket` | WebSocket & SSE                    |
| `@hazeljs/cron`      | Cron job scheduling                |
| `@hazeljs/ai`        | AI integrations (OpenAI, etc.)     |
| `@hazeljs/agent`     | AI Agent Runtime                   |
| `@hazeljs/rag`       | Retrieval-Augmented Generation     |
| `@hazeljs/serverless` | AWS Lambda / GCF adapters         |
| `@hazeljs/discovery` | Service discovery                  |

## License

MIT
