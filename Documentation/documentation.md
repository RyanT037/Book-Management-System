# Full-Stack Book Management System

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Technologies Used](#2-technologies-used)
3. [System Architecture](#3-system-architecture)
4. [Database Design](#4-database-design)
5. [API Endpoints](#5-api-endpoints)
6. [Authentication Flow](#6-authentication-flow)
7. [Security Implementation](#7-security-implementation)
8. [Input Validation](#8-input-validation)
9. [Installation Instructions](#9-installation-instructions)
10. [Setup Instructions](#10-setup-instructions)
11. [Screenshots of the Application](#11-screenshots-of-the-application)
12. [Challenges Faced](#12-challenges-faced)
13. [Conclusion](#13-conclusion)

---

## 1. Project Overview
The **Full-Stack Book Management System** is a multi-tier, robust web application engineered to catalog books, track availability configurations, and coordinate user account properties.

- **Purpose of the System**: To provide users with a dynamic, unified digital environment for indexing books, monitoring availability status, and checking structural details.
- **What Problem the Application Solves**: It addresses the fragmentation and synchronization issues typical of spreadsheet logging or analog bookkeeping. By establishing a central relational database coupled with validation schemas, it guarantees data integrity, search indexing, and real-time state management.
- **High-Level Project Objective**: To build a secure, full-stack application with JWT-based authentication, role-aware user accounts, protected API routes, password hashing, and comprehensive input validation — forming a solid foundation for the book catalog features.

---

## 2. Technologies Used
Only the packages and engines actively installed and configured in the project are documented below:

### NestJS
- **Role in System**: Serves as the high-performance backend REST API framework.
- **Why Chosen**: It provides a highly structured modular pattern using Dependency Injection, which ensures strong testability, code isolation, and easy extensibility.

### React (`^19.2.6`)
- **Role in System**: Powers the Single-Page Application (SPA) client interface.
- **Why Chosen**: React offers lightning-fast component rendering and state mapping. By selecting React 19, the UI benefits from the latest rendering optimization APIs.

### PostgreSQL
- **Role in System**: Functions as the primary relational database storage engine.
- **Why Chosen**: PostgreSQL is a highly robust, SQL-compliant, and ACID-compliant relational engine that ensures strict data durability, referential integrity, and efficient index execution for book lookups.

### Prisma ORM (`^7.8.0`)
- **Role in System**: Operates as the Object-Relational Mapping (ORM) and schema generator engine.
- **Why Chosen**: Prisma abstracts database interactions into type-safe methods. Its declarative schema makes managing changes simple, and its migration pipeline ensures repeatable setups.

### TypeScript (`^5.7.3` on Backend)
- **Role in System**: Serves as the core programming language for the backend API and build scripts.
- **Why Chosen**: TypeScript guarantees compiler-level type safety, minimizing runtime exceptions and enhancing IDE autocompletion for database and API models.

### Vite (`^8.0.12`)
- **Role in System**: Operates as the fast development server and bundler for the React client.
- **Why Chosen**: Vite provides rapid Hot Module Replacement (HMR) speeds, avoiding the slow startup cycles associated with legacy Webpack configurations.

### Node.js
- **Role in System**: Represents the physical backend environment runtime.
- **Why Chosen**: Node.js features an asynchronous event-driven loop that scales exceptionally well for concurrent network operations and enables a unified JavaScript syntax across layers.

### bcrypt
- **Role in System**: Handles cryptographic password hashing before persisting user credentials to the database.
- **Why Chosen**: bcrypt is the industry-standard adaptive hashing algorithm for passwords, providing configurable salt rounds and resistance to brute-force attacks.

### @nestjs/jwt & passport-jwt
- **Role in System**: Issues and validates JSON Web Tokens for stateless session management.
- **Why Chosen**: JWT is a compact, self-contained token standard that allows the backend to verify identity without storing session state, making the API horizontally scalable.

### class-validator & class-transformer
- **Role in System**: Enforces strict input validation rules on all incoming DTO (Data Transfer Object) payloads via decorators.
- **Why Chosen**: Integrates natively with NestJS's `ValidationPipe`, providing declarative, decorator-based validation without manual conditional checks.

---

## 3. System Architecture
The application is structured into three decoupled architectural tiers that interact continuously.

- **Frontend Layer (React + Vite)**: A single-page client application rendering the UI component trees. It interacts with the backend strictly through HTTP requests using configured Axios client handlers.
- **Backend Layer (NestJS)**: An API cluster designed with isolated modules (`AuthModule`, `UsersModule`, `PrismaModule`). It processes network endpoints via controllers, executes validation checks, manages JWT authentication, and calls the database client.
- **Prisma ORM Layer (@prisma/adapter-pg)**: An intermediate database interface layer that maps SQL tables to TypeScript definitions. It implements the custom native JavaScript connection driver `@prisma/adapter-pg` to route operations.
- **Database Layer (PostgreSQL)**: The structural persistence store holding primary keys, foreign key constraints, indices, and transactional data records.

### Architecture Flow Diagram
```text
  +-------------------------------------------------+
  |                 Frontend Layer                  |
  |             React 19 SPA (Vite 8)               |
  +-----------------------+-------------------------+
                          |
                          | HTTP REST Requests
                          v
  +-----------------------+-------------------------+
  |                 Backend Layer                   |
  |  AuthModule | UsersModule | PrismaModule        |
  |  JWT Guard  | ValidationPipe | JwtStrategy      |
  +-----------------------+-------------------------+
                          |
                          | Type-Safe DB Actions
                          v
  +-----------------------+-------------------------+
  |               Prisma ORM Layer                  |
  |            (@prisma/adapter-pg)                 |
  +-----------------------+-------------------------+
                          |
                          | Native PostgreSQL Driver
                          v
  +-----------------------+-------------------------+
  |                 Database Layer                  |
  |               PostgreSQL Instance               |
  +-------------------------------------------------+
```

### Module Structure
```text
backend/src/
├── app.module.ts          # Root module — registers ConfigModule, AuthModule, UsersModule, PrismaModule
├── main.ts                # Bootstrap — mounts global ValidationPipe
├── auth/
│   ├── auth.module.ts     # Registers JwtModule (async), PassportModule, JwtStrategy
│   ├── auth.controller.ts # POST /auth/register, POST /auth/login
│   ├── auth.service.ts    # Registration + login business logic
│   ├── jwt.strategy.ts    # Passport JWT strategy (validates Bearer tokens)
│   ├── dto/
│   │   ├── register.dto.ts  # Validated DTO for registration
│   │   └── login.dto.ts     # Validated DTO for login
│   └── decorators/
│       └── get-user.decorator.ts  # @GetUser() param decorator
└── users/
    ├── users.module.ts    # Registers UsersController, UsersService
    ├── users.controller.ts # Full CRUD — protected by JWT guard
    ├── users.service.ts   # Prisma CRUD operations with password hashing
    └── dto/
        ├── create-user.dto.ts  # Validated DTO for user creation
        └── update-user.dto.ts  # Partial DTO extending CreateUserDto
```

---

## 4. Database Design
The relational database layer features two core tables configured in `backend/prisma/schema.prisma` in a strict one-to-many relationship mapping.

```text
+-------------------+             +-----------------------+
|     User          |             |       Book            |
+-------------------+             +-----------------------+
| id (PK)           |             | id (PK)               |
| email (Unique)    | <---------+ | title                 |
| name              |             | author                |
| username (Unique) |             | isbn (Unique)         |
| password          |             | publishedYear         |
| role              |             | description           |
| createdAt         |             | available             |
|                   |             | createdAt             |
|                   |             | userId (FK)           |
+-------------------+             +-----------------------+
```

### User Model
The User model stores credentials, profile details, and role assignments for users authorized to catalog books.

| Field Name | Type | Modifiers / Attributes | Field Purpose |
| :--- | :--- | :--- | :--- |
| `id` | `Int` | `@id`, `@default(autoincrement())` | Unique auto-incremented identifier (Primary Key). |
| `email` | `String` | `@unique` | Distinct email address used for account operations. |
| `name` | `String` | None | User's profile display name. |
| `username` | `String` | `@unique` | Distinct username handle used during login checks. |
| `password` | `String` | None | bcrypt-hashed security password string (never stored in plaintext). |
| `role` | `String` | `@default("USER")` | Access role assigned to the user. Defaults to `"USER"`. Can be elevated to `"ADMIN"`. |
| `createdAt`| `DateTime`| `@default(now())` | Creation date record of the user database row. |
| `books` | `Book[]` | Virtual Relation Property | Array mapping to all Book records cataloged by this User. |

### Book Model
The Book model catalogs standard publication details and links each item to a managing user.

| Field Name | Type | Modifiers / Attributes | Field Purpose |
| :--- | :--- | :--- | :--- |
| `id` | `Int` | `@id`, `@default(autoincrement())` | Unique auto-incremented identifier (Primary Key). |
| `title` | `String` | None | The title of the book record. |
| `author` | `String` | None | The name of the book's author. |
| `isbn` | `String` | `@unique` | The International Standard Book Number (unique search key). |
| `publishedYear`| `Int` | None | Integer indicating the year the book was published. |
| `description`| `String` | None | Text area describing the book or context. |
| `available`| `Boolean`| `@default(true)` | Toggle flag indicating if the book is available. |
| `createdAt`| `DateTime`| `@default(now())` | Row creation timestamp. |
| `userId` | `Int` | Foreign Key | Integer identifying the User who cataloged the Book record. |
| `user` | `User` | Relation Mapper | Connection reference back to parent User model instance. |

### Relationship Explanation
- **One-to-Many Connection**: A `User` can own or catalog many books (`books Book[]`). Conversely, a `Book` is strictly linked to a single `User` (`user User @relation(fields: [userId], references: [id])`).
- **Database Constraints**:
  ```sql
  ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
  ```
  The database enforces referential safety with `ON DELETE RESTRICT`, preventing a user from being deleted if they have active book records cataloged in the system.

### Migrations Applied
| Migration Name | Description |
| :--- | :--- |
| `20260522183432_init` | Initial schema — creates `User` and `Book` tables with all base fields and foreign key constraints. |
| `add_role_to_user` | Adds `role String @default("USER")` column to the `User` table to support role-based access control. |

---

## 5. API Endpoints

### Authentication Endpoints (`/auth`)
These endpoints are **public** — no JWT token is required.

#### `POST /auth/register`
Registers a new user account.

- **Controller**: `AuthController`
- **Service Method**: `AuthService.register(dto)`
- **Request Body** (`RegisterDto`):
  ```json
  {
    "email": "user@example.com",
    "password": "secret123",
    "name": "John Doe",
    "username": "johndoe"
  }
  ```
- **Validation Rules**:
  - `email` — must be a valid email format (`@IsEmail`)
  - `password` — minimum 6 characters (`@MinLength(6)`)
  - `name` — required, non-empty string
  - `username` — required, non-empty string
- **Success Response** (`200 OK`):
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "username": "johndoe",
      "role": "USER",
      "createdAt": "2026-05-23T..."
    }
  }
  ```
  > **Note**: The `password` field is stripped from the response object before returning.
- **Error Responses**:
  - `400 Bad Request` — email already registered, or validation failure
  
#### `POST /auth/login`
Authenticates an existing user and returns a signed JWT access token.

- **Controller**: `AuthController`
- **Service Method**: `AuthService.login(dto)`
- **Request Body** (`LoginDto`):
  ```json
  {
    "email": "user@example.com",
    "password": "secret123"
  }
  ```
- **Validation Rules**:
  - `email` — must be a valid email format
  - `password` — required, non-empty
- **Success Response** (`200 OK`):
  ```json
  {
    "access_token": "<signed_jwt_token>"
  }
  ```
- **Error Responses**:
  - `401 Unauthorized` — user not found, or password does not match

---

### Users Endpoints (`/users`)
All endpoints in this group are **protected** — a valid `Authorization: Bearer <token>` header is required.

#### `POST /users`
Creates a new user record directly (admin-level use).

- **Guard**: `AuthGuard('jwt')`
- **Request Body** (`CreateUserDto`): `email`, `name`, `username`, `password` (min 6 chars)
- **Behaviour**: Hashes the password with bcrypt before persisting.
- **Status Code**: `201 Created`

#### `GET /users`
Returns all user records from the database. Logs the requesting user's email server-side via the `@GetUser()` decorator.

- **Guard**: `AuthGuard('jwt')`
- **Status Code**: `200 OK`
- **Response**: Array of all User objects.

#### `GET /users/:id`
Returns a single user record by their integer ID.

- **Guard**: `AuthGuard('jwt')`
- **URL Parameter**: `id` (integer)
- **Status Code**: `200 OK`

#### `PATCH /users/:id`
Partially updates an existing user record. All fields from `CreateUserDto` are optional.

- **Guard**: `AuthGuard('jwt')`
- **Request Body** (`UpdateUserDto`): Any subset of `{ email, name, username, password }`
- **Status Code**: `200 OK`

#### `DELETE /users/:id`
Permanently deletes a user record by their integer ID.

- **Guard**: `AuthGuard('jwt')`
- **URL Parameter**: `id` (integer)
- **Status Code**: `200 OK`

---

### Core Utility Endpoint
- **URL Path**: `GET /`
- **Controller**: `AppController`
- **Method Action**: `getHello()`
- **Return Type**: String (`Hello World!`)
- **Status Code**: `200 OK`

---

## 6. Authentication Flow

The system uses a **stateless JWT-based authentication** strategy implemented via `@nestjs/jwt` and `passport-jwt`.

```text
[Client]                        [Backend]
   |                                |
   |-- POST /auth/register -------->|
   |   { email, password, name,     |
   |     username }                 |
   |                                |-- Hash password (bcrypt, 10 rounds)
   |                                |-- Check email uniqueness (Prisma)
   |                                |-- Create user record
   |                                |-- Strip password from response
   |<-- { message, user (safe) } --|
   |                                |
   |-- POST /auth/login ----------->|
   |   { email, password }          |
   |                                |-- Find user by email
   |                                |-- bcrypt.compare(inputPw, hashedPw)
   |                                |-- Sign JWT { sub: userId, email }
   |<-- { access_token: "..." } ---|
   |                                |
   |-- GET /users ----------------->|
   |   Authorization: Bearer <jwt>  |
   |                                |-- JwtStrategy validates token
   |                                |-- Attaches { id, email } to request.user
   |                                |-- Route handler executes
   |<-- [ ...users ] --------------|
```

### JWT Configuration
- **Secret**: Loaded from `JWT_SECRET` environment variable via `ConfigService`.
- **Expiry**: `1d` (24 hours).
- **Algorithm**: HS256 (default).
- **Extraction**: `ExtractJwt.fromAuthHeaderAsBearerToken()` — token must be supplied in the `Authorization` header as `Bearer <token>`.

### JwtStrategy (`jwt.strategy.ts`)
The strategy validates all incoming tokens on protected routes. After successful verification, the decoded payload `{ sub, email }` is mapped to `{ id, email }` and attached to `request.user` automatically by Passport.

---

## 7. Security Implementation

### Password Hashing
Passwords are **never stored in plaintext**. Both `AuthService.register()` and `UsersService.create()` hash the raw password using bcrypt with a salt factor of `10` before calling `prisma.user.create()`.

```typescript
const hashedPassword = await bcrypt.hash(dto.password, 10);
```

### Safe Response Sanitization
After a successful registration, the `password` field is explicitly destructured and excluded before the user object is returned to the client:

```typescript
const { password: _password, ...safeUser } = user;
return { message: 'User registered successfully', user: safeUser };
```

This ensures the hashed password is never transmitted in any API response.

### Route Protection
All `/users` endpoints are protected using NestJS's `@UseGuards(AuthGuard('jwt'))` applied at the controller class level:

```typescript
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController { ... }
```

Any request without a valid, unexpired JWT will receive a `401 Unauthorized` response.

### Generic Error Messages
Login failures return the same `"Invalid credentials"` message regardless of whether the email was not found or the password was wrong. This prevents **user enumeration attacks**.

---

## 8. Input Validation

A global `ValidationPipe` is registered in `main.ts` with `whitelist: true`:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
  }),
);
```

- **`whitelist: true`**: Automatically strips any properties from incoming request bodies that are not declared in the DTO class. This prevents unexpected fields from being passed to services.

### DTO Validation Rules

#### `RegisterDto`
| Field | Decorators | Rule |
| :--- | :--- | :--- |
| `email` | `@IsEmail()`, `@IsNotEmpty()` | Must be a valid email address. |
| `password` | `@IsNotEmpty()`, `@MinLength(6)` | Must be at least 6 characters long. |
| `name` | `@IsString()`, `@IsNotEmpty()` | Must be a non-empty string. |
| `username` | `@IsString()`, `@IsNotEmpty()` | Must be a non-empty string. |

#### `LoginDto`
| Field | Decorators | Rule |
| :--- | :--- | :--- |
| `email` | `@IsEmail()` | Must be a valid email address. |
| `password` | `@IsNotEmpty()` | Must be a non-empty value. |

#### `CreateUserDto`
| Field | Decorators | Rule |
| :--- | :--- | :--- |
| `email` | `@IsEmail()`, `@IsNotEmpty()` | Must be a valid email address. |
| `name` | `@IsString()`, `@IsNotEmpty()` | Must be a non-empty string. |
| `username` | `@IsString()`, `@IsNotEmpty()` | Must be a non-empty string. |
| `password` | `@IsString()`, `@IsNotEmpty()`, `@MinLength(6)` | Must be at least 6 characters. |

#### `UpdateUserDto`
Extends `PartialType(CreateUserDto)` from `@nestjs/mapped-types`. All fields from `CreateUserDto` become **optional**, while retaining their original validation decorators when a value is supplied.

### Custom Decorator: `@GetUser()`
Located at `auth/decorators/get-user.decorator.ts`. This parameter decorator extracts the authenticated user object from the active HTTP request context (populated by `JwtStrategy.validate()`) and injects it directly into the controller method parameter.

```typescript
@Get()
findAll(@GetUser() user: { id: number; email: string }) {
  console.log('Requested by:', user.email);
  return this.usersService.findAll();
}
```

---

## 9. Installation Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL Server running locally on port `5432`

### Environment Variables
Create a `.env` file inside the `backend/` directory with the following keys:

```env
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/postgres?schema=public"
JWT_SECRET="your_strong_secret_key_here"
```

### Setup Steps
1. **Clone Repository**:
   ```bash
   git clone <repository_url>
   cd Book-Management-System
   ```

2. **Database Provisioning**:
   Ensure a local PostgreSQL instance is running on `localhost:5432`. Create a target database named `postgres` if it is not already present.

3. **Backend Environment Alignment**:
   In `backend/.env`, set your `DATABASE_URL` and `JWT_SECRET`.

4. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

5. **Prisma Client Generation & Database Sync**:
   Execute the migration pipeline to apply all schema definitions and generate the Prisma client:
   ```bash
   npx prisma migrate dev
   ```

6. **Boot Backend Server**:
   Launch the backend in watch/development mode:
   ```bash
   npm run start:dev
   ```

7. **Install Frontend Dependencies**:
   In a separate terminal session, navigate to the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

8. **Boot Frontend Server**:
   Launch the client application:
   ```bash
   npm run dev
   ```

---

## 10. Setup Instructions

The following setup steps were successfully completed:

- **GitHub Repository Setup**:
  Initialized the git repository under a clean monorepo architecture, dividing workspaces into separate `/backend` and `/frontend` directories, and configuring system-wide `.gitignore` settings.

- **NestJS Backend Initialization**:
  Structured the backend skeleton using the Nest CLI. Integrated the `@nestjs/config` module to manage environment configurations globally.

- **React/Vite Frontend Initialization**:
  Initialized the frontend single-page client application using Vite. Configured `vite.config.js` with dynamic compilation features and installed React 19 alongside helper communication frameworks.

- **PostgreSQL Database Creation**:
  Set up local databases, verified configuration mapping strings, and checked system endpoints.

- **Prisma Initialization**:
  Created `schema.prisma` mapping User and Book tables. Programmed `prisma.config.ts` using `defineConfig` to dynamically bind database paths from environment variables. Custom output path configured to `../src/generated/prisma`.

- **Migration Setup**:
  Generated and applied migration script `20260522183432_init` using `prisma migrate dev`, generating the SQL structure and applying the schema definition to PostgreSQL.

- **Authentication Module Implementation**:
  Built the complete `AuthModule` with `AuthController`, `AuthService`, `JwtStrategy`, `RegisterDto`, and `LoginDto`. Implemented JWT-based stateless authentication using `@nestjs/jwt` and `passport-jwt`. JWT secret loaded securely via `ConfigService`.

- **Security Hardening**:
  Integrated `bcrypt` for password hashing (10 salt rounds). Enforced password field stripping from registration responses. Applied generic error messages on login to prevent user enumeration.

- **Users CRUD Module**:
  Scaffolded `UsersController` and `UsersService` with full Create, Read, Update, Delete operations. All routes protected globally at the controller level by `AuthGuard('jwt')`. Password hashing also applied in `UsersService.create()`.

- **Global Validation Pipeline**:
  Registered `ValidationPipe` globally in `main.ts` with `whitelist: true` to enforce DTO validation on all incoming requests and strip unauthorized fields.

- **Custom Decorators**:
  Implemented `@GetUser()` parameter decorator to cleanly extract the authenticated user from the request context in any protected controller method.

- **Role Field Added to User Model**:
  Added a `role String @default("USER")` field to the `User` Prisma model to support future role-based access control. Migration `add_role_to_user` applied.

---

## 11. Screenshots of the Application

> [INSERT SCREENSHOT: GitHub repository]

> [INSERT SCREENSHOT: Backend running terminal]

> [INSERT SCREENSHOT: Frontend running in browser]

> [INSERT SCREENSHOT: PostgreSQL database created]

> [INSERT SCREENSHOT: Prisma migration success]

> [INSERT SCREENSHOT: Prisma schema]

> [INSERT SCREENSHOT: POST /auth/register — successful registration response]

> [INSERT SCREENSHOT: POST /auth/login — JWT token response]

> [INSERT SCREENSHOT: GET /users — protected route with Bearer token]

---

## 12. Challenges Faced

### PostgreSQL Native Connection Config Issues
Configuring the new native JavaScript PostgreSQL adapter (`@prisma/adapter-pg`) required injecting the adapter explicitly in the constructor of `PrismaService` instead of utilizing the standard internal Rust connection manager. This was resolved by constructing a pg adapter wrapper that binds to backend lifecycle hooks dynamically.

### Environment Variable Configurations for Prisma CLI
The Prisma CLI does not natively load `.env` configurations in complex workspace layouts unless directed programmatically. This was mitigated by introducing `prisma.config.ts` loading `dotenv/config` to coordinate file system paths when running migration commands.

### Monorepo Dependency Isolation
Managing separate packages inside backend and frontend folders could trigger nested git conflicts or dependency leakage. This was prevented by executing strict workspace isolations, ensuring all dependencies are installed locally in their respective root environments.

### Custom Target Client Build Locations
Using a customized target output path (`output = "../src/generated/prisma"`) for the Prisma Client required configuring custom relative imports throughout all NestJS providers. Resolving these paths was necessary to ensure TypeScript compilation steps completed without error.

### JWT Secret Configuration
Ensuring the JWT secret was correctly loaded from the `.env` file required configuring `JwtModule.registerAsync()` with `ConfigService` injection rather than a static `register()` call. This prevents the `secretOrPrivateKey must have a value` error when the module initializes before environment variables are resolved.

### DTO Import Corrections
The `UpdateUserDto` initially imported `PartialType` from `@nestjs/swagger` instead of `@nestjs/mapped-types`, causing a runtime import resolution error. This was corrected by updating the import to use the mapped-types package, which does not require Swagger to be installed.

### Password Security & Response Sanitization
The initial registration implementation returned the full user object including the hashed password. This was resolved by destructuring the user record and returning only the safe fields, ensuring sensitive data is never exposed through the API response.

---

## 13. Conclusion

- **Completed Work**: The project has successfully established a fully secured, decoupled full-stack workspace. The authentication system is operational with JWT token issuance, bcrypt password hashing, protected routes, input validation, and role-aware user accounts.
- **Current Project Readiness**: High. The authentication pipeline, database schema, ORM integration, validation layer, and security patterns are all fully operational.
- **Next Development Phase**:
  - Implement Book CRUD endpoints (`/books`) with full create, read, update, delete operations.
  - Add role-based route guards to restrict admin-only actions using the `role` field.
  - Design the interactive frontend dashboard tables and catalog creation forms.
  - Connect the React frontend to the backend API using Axios with JWT token management.
  - Add pagination and search/filter support for the book listing endpoint.
