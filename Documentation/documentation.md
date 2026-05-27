# Full-Stack Book Management System

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [System Architecture](#3-system-architecture)
4. [Backend Application](#4-backend-application)
5. [Frontend Application](#5-frontend-application)
6. [Database Design](#6-database-design)
7. [API Endpoints](#7-api-endpoints)
8. [Authentication and Authorization](#8-authentication-and-authorization)
9. [Validation and Security](#9-validation-and-security)
10. [Setup and Installation](#10-setup-and-installation)
11. [Implemented User Workflows](#11-implemented-user-workflows)
12. [Migrations](#12-migrations)
13. [Challenges Faced](#13-challenges-faced)
14. [Current Status and Next Steps](#14-current-status-and-next-steps)

---

## 1. Project Overview

The **Full-Stack Book Management System** is a complete web application for managing a digital book catalog with secure user accounts, role-aware access control, dashboard statistics, and a React-based administration interface.

The system now includes:

- Public landing page with application statistics.
- User registration and login.
- JWT-protected dashboard routes.
- Book creation, listing, editing, searching, and deletion workflows.
- User management for administrators.
- Profile editing for authenticated users.
- PostgreSQL persistence through Prisma ORM.
- Swagger API documentation at `/api`.

The main goal of the project is to provide a reliable library/catalog management foundation where users can manage books while administrators can oversee users and restricted operations.

---

## 2. Technology Stack

### Backend

| Technology | Version / Package | Role |
| :--- | :--- | :--- |
| NestJS | `@nestjs/* ^11.0.1` | Modular REST API framework. |
| TypeScript | `^5.7.3` | Type-safe backend language. |
| PostgreSQL | Local server | Relational database. |
| Prisma ORM | `prisma`, `@prisma/client ^7.8.0` | Type-safe database schema and query layer. |
| Prisma PostgreSQL Adapter | `@prisma/adapter-pg ^7.8.0` | Native JavaScript PostgreSQL driver adapter. |
| bcrypt | `^6.0.0` | Password hashing. |
| Passport JWT | `@nestjs/passport`, `passport-jwt` | JWT authentication strategy. |
| Nest JWT | `@nestjs/jwt ^11.0.2` | Token signing and verification support. |
| class-validator | `^0.15.1` | DTO validation. |
| Swagger | `@nestjs/swagger`, `swagger-ui-express` | API documentation UI. |

### Frontend

| Technology | Version / Package | Role |
| :--- | :--- | :--- |
| React | `^19.2.6` | Single-page frontend application. |
| React DOM | `^19.2.6` | Browser rendering. |
| Vite | `^8.0.12` | Development server and build tool. |
| TypeScript | `^6.0.3` | Type-safe frontend code. |
| React Router | `react-router-dom ^7.15.1` | Client-side routing. |
| Axios | `^1.16.1` | HTTP client for backend requests. |
| React Hook Form | `^7.76.1` | Form handling for book workflows. |
| React Hot Toast | `^2.6.0` | User notifications. |
| Tailwind CSS | `^4.3.0` | Utility-first styling. |
| Lucide React | `^1.16.0` | UI icons. |

---

## 3. System Architecture

The application is organized as a monorepo with separate backend and frontend projects:

```text
Book-Management-System/
|-- backend/        # NestJS API, Prisma schema, migrations
|-- frontend/       # React/Vite SPA
`-- Documentation/  # Project documentation
```

### Runtime Architecture

```text
+-------------------------------------------------+
|                 Frontend Layer                  |
|   React 19 SPA, React Router, Axios, Tailwind   |
+-----------------------+-------------------------+
                        |
                        | HTTP REST Requests
                        | Authorization: Bearer <jwt>
                        v
+-----------------------+-------------------------+
|                  Backend Layer                  |
| AuthModule | UsersModule | BooksModule | Stats  |
| JwtStrategy | ValidationPipe | Swagger | CORS   |
+-----------------------+-------------------------+
                        |
                        | Prisma Client Queries
                        v
+-----------------------+-------------------------+
|                Prisma ORM Layer                 |
| Generated client at backend/src/generated/prisma |
| PostgreSQL adapter: @prisma/adapter-pg          |
+-----------------------+-------------------------+
                        |
                        | Native PostgreSQL Driver
                        v
+-----------------------+-------------------------+
|               PostgreSQL Database              |
| User table | Book table | Role enum             |
+-------------------------------------------------+
```

### Backend Module Structure

```text
backend/src/
|-- app.module.ts
|-- app.controller.ts
|-- app.service.ts
|-- main.ts
|-- auth/
|   |-- auth.module.ts
|   |-- auth.controller.ts
|   |-- auth.service.ts
|   |-- jwt.strategy.ts
|   `-- dto/
|-- books/
|   |-- books.module.ts
|   |-- books.controller.ts
|   |-- books.service.ts
|   `-- dto/
|-- stats/
|   |-- stats.module.ts
|   |-- stats.controller.ts
|   `-- stats.service.ts
|-- users/
|   |-- users.module.ts
|   |-- users.controller.ts
|   |-- users.service.ts
|   `-- dto/
|-- prisma/
|   |-- prisma.module.ts
|   `-- prisma.service.ts
`-- generated/prisma/
```

### Frontend Structure

```text
frontend/src/
|-- App.tsx
|-- main.tsx
|-- routes/
|   `-- AppRoutes.tsx
|-- context/
|   `-- AuthContext.tsx
|-- services/
|   |-- api.ts
|   |-- auth.service.ts
|   |-- book.service.ts
|   |-- stats.service.ts
|   `-- users.service.ts
|-- pages/
|   |-- public/
|   |-- auth/
|   `-- dashboard/
|-- components/
|   |-- auth/
|   |-- dashboard/
|   |-- landing/
|   `-- ui/
`-- types/
```

---

## 4. Backend Application

The backend is a NestJS REST API running on port `3000` by default. It uses `ConfigModule` globally, connects to PostgreSQL through `PrismaService`, and enables CORS for the frontend development origin:

```typescript
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

### Main Backend Modules

| Module | Purpose |
| :--- | :--- |
| `AuthModule` | Handles registration, login, JWT signing, and JWT validation. |
| `UsersModule` | Handles user CRUD operations and admin-only user management. |
| `BooksModule` | Handles book CRUD operations with owner/admin authorization rules. |
| `StatsModule` | Provides public and authenticated dashboard statistics. |
| `PrismaModule` | Provides a shared Prisma database client. |

### Swagger Documentation

Swagger is configured in `backend/src/main.ts` and is available at:

```text
http://localhost:3000/api
```

The Swagger document includes:

- Authentication endpoints.
- Bearer token configuration.
- Users endpoints.
- Books endpoints.
- Statistics endpoints.
- Request and response examples.

---

## 5. Frontend Application

The frontend is a React/Vite single-page application running on port `5173` by default. It communicates with the backend using Axios.

### Routes

| Route | Page | Access |
| :--- | :--- | :--- |
| `/` | Landing page | Public |
| `/login` | Login form | Public |
| `/register` | Registration form | Public |
| `/dashboard` | Dashboard overview | Protected |
| `/dashboard/books` | Book management table | Protected |
| `/dashboard/users` | User management table | Intended for admins |
| `/dashboard/profile` | Profile editing page | Protected |
| `*` | Redirects to `/` | Public |

### Authentication State

Authentication state is stored in `AuthContext`. The frontend persists:

- `access_token` in `localStorage`.
- `user` profile data in `localStorage`.

Axios request interceptors attach the JWT automatically:

```text
Authorization: Bearer <access_token>
```

Axios response interceptors clear the local token and user data when the API returns `401 Unauthorized`.

### Implemented UI Areas

- Public marketing/landing page.
- Login page.
- Register page.
- Dashboard overview with live statistics.
- Books table with search, create, edit, and delete modals.
- Users table with create, edit, and delete modals.
- Profile page with account editing.
- Shared dashboard layout, sidebar, header, buttons, inputs, and cards.

---

## 6. Database Design

The database is defined in `backend/prisma/schema.prisma`.

### Prisma Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  username  String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())

  books Book[]
}

enum Role {
  USER
  ADMIN
}

model Book {
  id            Int      @id @default(autoincrement())
  title         String
  author        String
  isbn          String   @unique
  publishedYear Int
  description   String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  userId Int
  user   User @relation(fields: [userId], references: [id])
}
```

### User Table

| Field | Type | Constraint / Behavior |
| :--- | :--- | :--- |
| `id` | `Int` | Primary key, auto-incremented. |
| `email` | `String` | Unique. Used for login. |
| `name` | `String` | User display name. |
| `username` | `String` | Unique handle. |
| `password` | `String` | bcrypt hash. |
| `role` | `Role` | Enum: `USER` or `ADMIN`; defaults to `USER`. |
| `createdAt` | `DateTime` | Defaults to creation timestamp. |
| `books` | `Book[]` | One-to-many relation to books. |

### Book Table

| Field | Type | Constraint / Behavior |
| :--- | :--- | :--- |
| `id` | `Int` | Primary key, auto-incremented. |
| `title` | `String` | Required title. |
| `author` | `String` | Required author. |
| `isbn` | `String` | Unique ISBN value. |
| `publishedYear` | `Int` | Publication year. |
| `description` | `String` | Book description. |
| `createdAt` | `DateTime` | Defaults to creation timestamp. |
| `updatedAt` | `DateTime` | Automatically updated by Prisma. |
| `userId` | `Int` | Foreign key to `User`. |
| `user` | `User` | Parent user relation. |

### Relationship

A user can catalog many books. Each book belongs to one user.

```text
User 1 ------ * Book
```

The database uses the Prisma-generated relation between `Book.userId` and `User.id`.

---

## 7. API Endpoints

Base URL during development:

```text
http://localhost:3000
```

### Core Endpoint

| Method | Path | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Returns `Hello World!`. |

### Authentication Endpoints

| Method | Path | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Creates a new user account with role `USER`. |
| `POST` | `/auth/login` | Public | Authenticates a user and returns a JWT access token plus user profile. |

#### `POST /auth/register`

Request:

```json
{
  "email": "reader@example.com",
  "password": "password123",
  "name": "Jane Reader",
  "username": "janereader"
}
```

Current response:

```json
{
  "user": {
    "id": 1,
    "email": "reader@example.com",
    "name": "Jane Reader",
    "username": "janereader",
    "role": "USER"
  }
}
```

#### `POST /auth/login`

Request:

```json
{
  "email": "reader@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "access_token": "<jwt-token>",
  "user": {
    "id": 1,
    "email": "reader@example.com",
    "name": "Jane Reader",
    "username": "janereader",
    "role": "USER",
    "createdAt": "2026-05-27T08:00:00.000Z"
  }
}
```

### Books Endpoints

All book endpoints require a JWT bearer token.

| Method | Path | Auth | Role Rule | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/books` | Required | Any authenticated user | Creates a book linked to the logged-in user. |
| `GET` | `/books` | Required | Any authenticated user | Returns all books, newest first. |
| `GET` | `/books/:id` | Required | Any authenticated user | Returns one book by ID. |
| `PUT` | `/books/:id` | Required | Owner or admin | Updates a book. |
| `DELETE` | `/books/:id` | Required | Admin only | Deletes a book. |

#### Create Book Body

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "publishedYear": 2008,
  "description": "A practical guide to writing readable and maintainable code."
}
```

### Users Endpoints

All user endpoints require a JWT bearer token. Some actions are explicitly admin-only in the controller.

| Method | Path | Auth | Role Rule | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/users` | Required | Admin only | Creates a user account. |
| `GET` | `/users` | Required | Admin only | Returns all users. |
| `GET` | `/users/:id` | Required | Authenticated user | Returns one user by ID. |
| `PATCH` | `/users/:id` | Required | Authenticated user | Updates a user. |
| `DELETE` | `/users/:id` | Required | Admin only | Deletes a user. |

#### Create User Body

```json
{
  "email": "staff@example.com",
  "name": "Staff User",
  "username": "staffuser",
  "password": "password123",
  "role": "USER"
}
```

### Statistics Endpoints

| Method | Path | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/stats/public` | Public | Returns public landing page totals. |
| `GET` | `/stats/dashboard` | Required | Returns dashboard totals for authenticated users. |

#### Public Stats Response

```json
{
  "totalBooks": 120,
  "registeredUsers": 35,
  "activeAuthors": 48,
  "recentBooks": 12
}
```

#### Dashboard Stats Response

```json
{
  "totalBooks": 120,
  "totalUsers": 35,
  "activeAuthors": 48,
  "recentBooks": 12
}
```

---

## 8. Authentication and Authorization

### JWT Authentication Flow

```text
[Client]                         [Backend]
   |                                 |
   |-- POST /auth/login ------------>|
   |   email + password              |
   |                                 |-- Find user by email
   |                                 |-- Compare bcrypt hash
   |                                 |-- Sign JWT payload
   |<-- access_token + user ---------|
   |                                 |
   |-- GET /books ------------------>|
   |   Authorization: Bearer token   |
   |                                 |-- JwtStrategy validates token
   |                                 |-- req.user = { id, email, role }
   |<-- protected response ----------|
```

The JWT payload includes:

```json
{
  "sub": 1,
  "email": "reader@example.com",
  "role": "USER"
}
```

`JwtStrategy.validate()` maps this payload into:

```typescript
{ id: payload.sub, email: payload.email, role: payload.role }
```

### Role Rules

| Action | USER | ADMIN |
| :--- | :---: | :---: |
| Register account | Yes | Yes |
| Login | Yes | Yes |
| View books | Yes | Yes |
| Create books | Yes | Yes |
| Update own books | Yes | Yes |
| Update another user's books | No | Yes |
| Delete books | No | Yes |
| View all users | No | Yes |
| Create users | No | Yes |
| Delete users | No | Yes |

### Stateless Logout

The backend does not maintain server-side sessions. Logging out is handled on the frontend by clearing the stored JWT and user profile from `localStorage`.

---

## 9. Validation and Security

### Global Validation Pipe

The backend registers a global validation pipe:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
  }),
);
```

This validates DTO decorators and strips unknown request body properties.

### DTO Validation

#### `RegisterDto`

| Field | Rule |
| :--- | :--- |
| `email` | Required valid email. |
| `password` | Required, minimum 6 characters. |
| `name` | Required string. |
| `username` | Required string. |

#### `LoginDto`

| Field | Rule |
| :--- | :--- |
| `email` | Valid email. |
| `password` | Required. |

#### `CreateBookDto`

| Field | Rule |
| :--- | :--- |
| `title` | Required string. |
| `author` | Required string. |
| `isbn` | Required string. |
| `publishedYear` | Integer. |
| `description` | String. |

#### `CreateUserDto`

| Field | Rule |
| :--- | :--- |
| `email` | Required valid email. |
| `name` | Required string. |
| `username` | Required string. |
| `password` | Required string, minimum 6 characters. |
| `role` | Optional enum: `USER` or `ADMIN`. |

### Password Security

Passwords are hashed using bcrypt with 10 salt rounds:

```typescript
await bcrypt.hash(password, 10);
```

Login compares the submitted password against the stored hash:

```typescript
await bcrypt.compare(dto.password, user.password);
```

### Response Sanitization

User responses select safe fields only. Password hashes are not returned from registration, login, user list, user detail, or user update responses.

### Generic Login Errors

Login failures return `Invalid credentials`, whether the email is missing or the password is wrong. This reduces user enumeration risk.

---

## 10. Setup and Installation

### Prerequisites

- Node.js 18 or higher.
- npm.
- PostgreSQL running locally.
- A database available through `DATABASE_URL`.

### Backend Environment

Create `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres?schema=public"
JWT_SECRET="generate-your-own-random-secret-key"
PORT=3000
```

The included example file is `backend/.env.example`.

### Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

Backend URLs:

```text
API:     http://localhost:3000
Swagger: http://localhost:3000/api
```

### Frontend Environment

The frontend defaults to `http://localhost:3000` for the API. To override it, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

### Useful Commands

Backend:

```bash
npm run start:dev
npm run build
npm run lint
npm run test
npm run test:e2e
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## 11. Implemented User Workflows

### Public Visitor

1. Opens the landing page at `/`.
2. Views public application statistics from `/stats/public`.
3. Navigates to login or registration.

### Registered User

1. Logs in through `/login`.
2. Receives a JWT and user profile.
3. Accesses `/dashboard`.
4. Views dashboard statistics.
5. Opens `/dashboard/books`.
6. Searches books by title, author, ISBN, or description.
7. Creates a new book.
8. Updates books they own.
9. Updates their profile at `/dashboard/profile`.

### Administrator

1. Logs in with an account whose role is `ADMIN`.
2. Views dashboard totals, including user totals.
3. Manages all users from `/dashboard/users`.
4. Creates user accounts and assigns roles.
5. Updates any book.
6. Deletes books.
7. Deletes users.

---

## 12. Migrations

The project has the following Prisma migrations:

| Migration | Purpose |
| :--- | :--- |
| `20260522183432_init` | Initial database setup. |
| `20260523203415_add_user_role` | Adds the `Role` enum and `role` field to users. |
| `20260524162329_add_books` | Adds book catalog support. |
| `20260524162757_add_books` | Follow-up book schema migration. |
| `20260524162856_add_books` | Follow-up book schema migration. |
| `20260525090633_update_book_entity` | Removes `available` and `quantity` from books. |

The final active `Book` model contains `title`, `author`, `isbn`, `publishedYear`, `description`, timestamps, and `userId`.

---

## 13. Challenges Faced

### Prisma 7 PostgreSQL Adapter Setup

The project uses Prisma 7 with the native JavaScript PostgreSQL adapter. This required creating `PrismaService` with `PrismaPg` and passing the adapter to the generated Prisma client.

### Custom Prisma Client Output

The Prisma client is generated into:

```text
backend/src/generated/prisma
```

This required importing generated client types from the custom output location instead of the default `@prisma/client` runtime path.

### JWT Secret Loading

JWT validation depends on `JWT_SECRET` being available through `ConfigService`. The strategy uses `config.getOrThrow<string>('JWT_SECRET')` to fail fast when the secret is missing.

### Role-Based Permissions

The system evolved from basic JWT protection into role-aware behavior. Books now use owner/admin update rules, admin-only delete rules, and users endpoints restrict list/create/delete operations to admins.

### Frontend Token Persistence

The frontend stores authentication state locally and uses Axios interceptors to attach tokens to every API request. It also clears local auth state after a `401` response to avoid stale sessions.

### Dashboard and Landing Stats

Statistics are calculated from real database records using counts and author grouping. This allows both the landing page and dashboard to reflect current system data.

---

## 14. Current Status and Next Steps

### Completed

- NestJS backend application.
- PostgreSQL database schema.
- Prisma migrations and generated client.
- JWT login flow.
- Public user registration.
- bcrypt password hashing.
- Role enum with `USER` and `ADMIN`.
- Protected books API.
- Admin-aware users API.
- Public and protected statistics API.
- Swagger documentation at `/api`.
- React landing page.
- React auth pages.
- Protected dashboard routes.
- Books management UI.
- Users management UI.
- Profile editing UI.
- Axios API layer with token injection.

### Current Implementation Notes

- Public registration creates a `USER` account and returns the safe user object.
- Login returns both `access_token` and the safe user profile.
- Logout is stateless and handled by clearing frontend storage.
- User list/create/delete actions are admin-only on the backend.
- Book deletion is admin-only on the backend.
- Book updates are allowed for the book owner or an admin.

### Recommended Next Steps

- Align the registration frontend with the backend response, or update the backend to issue a token on registration.
- Hide or restrict the users page in the frontend for non-admin users.
- Add backend authorization checks so users can only update their own profile unless they are admins.
- Add pagination and server-side search for large book lists.
- Add automated tests for auth, books, users, and stats.
- Add seed data for local development and demos.
- Add deployment documentation for production environments.
