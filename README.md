# Book Management System

A full-stack Book Management System with a NestJS backend and a React/Vite frontend. The application includes public landing pages, authentication, protected dashboard pages, book management, user management, dashboard statistics, PostgreSQL persistence, validation, and Swagger API documentation.

## Tech Stack

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication with Passport
- bcrypt password hashing
- class-validator / class-transformer
- Swagger / OpenAPI

### Frontend

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Axios
- Tailwind CSS
- lucide-react icons
- react-hot-toast

## Project Structure

```text
Book-Management-System/
+-- backend/
|   +-- prisma/
|   |   +-- migrations/
|   |   +-- schema.prisma
|   +-- src/
|   |   +-- auth/
|   |   +-- books/
|   |   +-- generated/prisma/
|   |   +-- prisma/
|   |   +-- stats/
|   |   +-- users/
|   |   +-- app.module.ts
|   |   +-- main.ts
|   +-- test/
+-- frontend/
|   +-- public/
|   +-- src/
|   |   +-- components/
|   |   |   +-- auth/
|   |   |   +-- dashboard/
|   |   |   +-- landing/
|   |   |   +-- ui/
|   |   +-- context/
|   |   +-- data/
|   |   +-- hooks/
|   |   +-- lib/
|   |   +-- pages/
|   |   |   +-- auth/
|   |   |   +-- dashboard/
|   |   |   +-- public/
|   |   +-- routes/
|   |   +-- services/
|   |   +-- App.tsx
|   |   +-- main.tsx
|   +-- vite.config.js
```

## Backend Setup

Install backend dependencies:

```bash
cd backend
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

Start the backend in development mode:

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm run start:prod
```

The backend runs at:

```text
http://localhost:3000
```

Swagger API documentation is available at:

```text
http://localhost:3000/api
```

Protected endpoints use Bearer authentication. Log in through `POST /auth/login`, copy the returned `access_token`, then use Swagger's **Authorize** button with:

```text
Bearer <access_token>
```

## Frontend Setup

Install frontend dependencies:

```bash
cd frontend
npm install
```

Make sure the backend is running before using authenticated dashboard features.

Start the Vite development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

Expected local URLs:

```text
Backend:  http://localhost:3000
Frontend: http://localhost:5173
Swagger:  http://localhost:3000/api
```

## API Endpoints

### App

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | Public | App/welcome message |

### Authentication

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | Register a new user account |
| POST | `/auth/login` | Public | Log in and receive a JWT access token |

### Books

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/books` | JWT | Create a book for the authenticated user |
| GET | `/books` | JWT | Get all books |
| GET | `/books/:id` | JWT | Get one book by ID |
| PUT | `/books/:id` | JWT | Update a book as owner or admin |
| DELETE | `/books/:id` | JWT | Delete a book as admin |

### Users

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/users` | JWT admin | Create a user account |
| GET | `/users` | JWT admin | Get all users |
| GET | `/users/:id` | JWT | Get one user by ID |
| PATCH | `/users/:id` | JWT | Update a user by ID |
| DELETE | `/users/:id` | JWT admin | Delete a user by ID |

### Statistics

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/stats/public` | Public | Get landing page statistics |
| GET | `/stats/dashboard` | JWT | Get dashboard statistics |

## Frontend Routes

| Route | Description |
| --- | --- |
| `/` | Public landing page |
| `/login` | Login form |
| `/register` | Registration form |
| `/dashboard` | Protected dashboard overview |
| `/dashboard/books` | Protected book management page |
| `/dashboard/users` | Protected user management page |
| `/dashboard/profile` | Protected profile page |

## Frontend API Services

Frontend API calls are organized under `frontend/src/services/`:

```text
src/services/
+-- api.ts
+-- auth.service.ts
+-- book.service.ts
+-- stats.service.ts
+-- users.service.ts
```

Authentication state and actions are managed through:

```text
src/context/AuthContext.tsx
src/hooks/useAuthActions.ts
```

## Validation

The backend uses a global `ValidationPipe` with `whitelist: true`, so DTO decorators validate request bodies and remove undeclared fields before they reach services.

## Useful Commands

Backend:

```bash
cd backend
npm run build
npm run lint
npm run format
npx prisma migrate dev
npx prisma generate
```

Frontend:

```bash
cd frontend
npm run build
npm run lint
npm run preview
```

Current note: no dedicated frontend test runner is configured yet. Use build and lint checks until a test framework is added.
