# HazelJS Starter

A starter application built with [HazelJS](https://hazeljs.com) - the AI-native backend framework for TypeScript.

## Features

- Decorator-based controllers and services
- Dependency injection
- JWT authentication with protected routes
- PostgreSQL database with Prisma ORM
- Swagger/OpenAPI documentation
- Environment configuration
- Health checks and graceful shutdown
- CORS support
- Docker Compose for local development

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Docker & Docker Compose (for PostgreSQL)

### Installation

```bash
npm install
```

### Database Setup

Start PostgreSQL with Docker:

```bash
docker compose up -d
```

Generate the Prisma client and run migrations:

```bash
npm run db:generate
npm run db:migrate -- --name init
```

Optionally seed the database:

```bash
npm run db:seed
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
├── types/
│   └── hazeljs-auth.d.ts   # Auth type augmentations
├── auth/                   # Authentication module
│   ├── auth.module.ts
│   ├── auth.controller.ts  # Register, login, profile
│   ├── auth.service.ts     # JWT + bcrypt logic
│   └── dto/
│       ├── register.dto.ts
│       └── login.dto.ts
└── users/                  # Users module (protected)
    ├── users.module.ts
    ├── users.controller.ts # CRUD endpoints with @Auth
    ├── users.service.ts    # Prisma-backed service
    └── dto/
        ├── create-user.dto.ts
        └── update-user.dto.ts
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed script
docker-compose.yml          # PostgreSQL container
```

## API Endpoints

### Public

| Method | Path              | Description              |
| ------ | ----------------- | ------------------------ |
| `GET`  | `/`               | Welcome message          |
| `GET`  | `/info`           | Application info         |
| `POST` | `/auth/register`  | Register a new user      |
| `POST` | `/auth/login`     | Login, returns JWT token |

### Protected (requires `Authorization: Bearer <token>`)

| Method   | Path              | Description              |
| -------- | ----------------- | ------------------------ |
| `GET`    | `/auth/profile`   | Get current user profile |
| `GET`    | `/users`          | List all users           |
| `GET`    | `/users/:id`      | Get user by ID           |
| `POST`   | `/users`          | Create a new user        |
| `PUT`    | `/users/:id`      | Update a user            |
| `DELETE` | `/users/:id`      | Delete a user            |

## Authentication Flow

1. **Register** -- `POST /auth/register` with `{ name, email, password }` to create an account and receive an `accessToken`
2. **Login** -- `POST /auth/login` with `{ email, password }` to get an `accessToken`
3. **Access protected routes** -- include `Authorization: Bearer <accessToken>` header

## Database Commands

```bash
npm run db:generate       # Generate Prisma client
npm run db:migrate        # Create and apply migrations
npm run db:migrate:deploy # Apply migrations (production)
npm run db:push           # Push schema without migration
npm run db:seed           # Seed the database
npm run db:studio         # Open Prisma Studio GUI
npm run db:reset          # Reset database and re-apply migrations
```

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
