# Book Management System Frontend

React/Vite frontend for the Book Management System. It provides the public landing page, authentication screens, protected dashboard pages, book management views, user views, and API service integration with the NestJS backend.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Axios
- Tailwind CSS
- lucide-react icons
- react-hot-toast

## Project Setup

Install frontend dependencies from the `frontend` folder:

```bash
npm install
```

The frontend API client is configured to call the backend API. Make sure the backend is running before using authenticated dashboard features.

Expected local backend URL:

```text
http://localhost:3000
```

Expected local frontend URL:

```text
http://localhost:5173
```

## Running the App

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

## Backend and Swagger

Start the backend from `../backend`:

```bash
npm run start:dev
```

Backend API:

```text
http://localhost:3000
```

Swagger API documentation:

```text
http://localhost:3000/api
```

Use Swagger to inspect request/response shapes or manually test endpoints. For protected endpoints, log in with `POST /auth/login`, then authorize with the returned JWT token.

## Main Routes

| Route | Description |
|---|---|
| `/` | Public landing page |
| `/login` | Login form |
| `/register` | Registration form |
| `/dashboard` | Protected dashboard overview |
| `/dashboard/books` | Protected book management page |
| `/dashboard/users` | Protected user management page |
| `/dashboard/profile` | Protected profile page |

## API Services

Frontend API calls are organized under `src/services/`:

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

## Testing and Quality Checks

Run the production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Current note: no dedicated frontend test runner is configured yet. Use build and lint checks until a test framework is added.

## Folder Structure

```text
frontend/
+-- public/
+-- src/
|   +-- components/
|   |   +-- auth/
|   |   +-- dashboard/
|   |   +-- landing/
|   |   +-- ui/
|   +-- context/
|   +-- data/
|   +-- hooks/
|   +-- lib/
|   +-- pages/
|   |   +-- auth/
|   |   +-- dashboard/
|   |   +-- public/
|   +-- routes/
|   +-- services/
|   +-- App.tsx
|   +-- main.tsx
+-- vite.config.js
```
