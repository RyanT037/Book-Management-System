# Book Management System Backend

NestJS REST API for the Book Management System. It provides authentication, user management, book management, dashboard statistics, Prisma/PostgreSQL persistence, validation, and Swagger API documentation.

## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication with Passport
- bcrypt password hashing
- class-validator / class-transformer
- Swagger / OpenAPI

## Project Setup

Install backend dependencies from the `backend` folder:

```bash
npm install
```

Create a `.env` file in `backend/`:

```env
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/book_management?schema=public"
JWT_SECRET="replace-with-a-strong-secret"
PORT=3000
```

Run Prisma migrations and generate the Prisma client:

```bash
npx prisma migrate dev
```

## Running the API

Development mode:

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm run start:prod
```

By default, the API runs at:

```text
http://localhost:3000
```

## Swagger Documentation

Swagger is configured in `src/main.ts` and is available after starting the backend:

```text
http://localhost:3000/api
```

Protected endpoints use Bearer authentication. Log in through `POST /auth/login`, copy the returned `access_token`, then use Swagger's **Authorize** button with:

```text
Bearer <access_token>
```

## API Endpoints

### App

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | Public | Health/welcome message |

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a new user account |
| POST | `/auth/login` | Public | Log in and receive a JWT access token |

### Books

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/books` | JWT | Create a book for the authenticated user |
| GET | `/books` | JWT | Get all books |
| GET | `/books/:id` | JWT | Get one book by ID |
| PUT | `/books/:id` | JWT | Update a book as owner or admin |
| DELETE | `/books/:id` | JWT | Delete a book as admin |

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users` | JWT admin | Create a user account |
| GET | `/users` | JWT admin | Get all users |
| GET | `/users/:id` | JWT | Get one user by ID |
| PATCH | `/users/:id` | JWT | Update a user by ID |
| DELETE | `/users/:id` | JWT admin | Delete a user by ID |

### Statistics

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/stats/public` | Public | Get landing page statistics |
| GET | `/stats/dashboard` | JWT | Get dashboard statistics |

## Validation

The app uses a global `ValidationPipe` with `whitelist: true`, so DTO decorators validate request bodies and remove undeclared fields before they reach services.

## Testing

Run unit tests:

```bash
npm test
```

Run e2e tests:

```bash
npm run test:e2e
```

Generate coverage:

```bash
npm run test:cov
```

Current note: the template spec files have been removed, so `npm test` will report no tests until new specs are added.

## Useful Commands

```bash
npm run build
npm run lint
npm run format
npx prisma migrate dev
npx prisma generate
```

## Folder Structure

```text
backend/
+-- prisma/
|   +-- migrations/
|   +-- schema.prisma
+-- src/
|   +-- auth/
|   +-- books/
|   +-- generated/prisma/
|   +-- prisma/
|   +-- stats/
|   +-- users/
|   +-- app.module.ts
|   +-- main.ts
+-- test/
```
