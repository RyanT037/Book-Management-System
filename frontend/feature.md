# Frontend Feature Documentation

This document describes the Book Management System frontend: the public marketing site, auth UI, admin dashboard shell, shared design system, and the authentication layer prepared for backend integration.

## Overview

The frontend is a React + TypeScript SPA styled entirely with **Tailwind CSS v4**. It presents a cohesive purple/blue admin aesthetic across the landing page, login/register flows, and dashboard.

```
LandingPage (/)
    ├── PublicNavbar, Hero, Features, About, Stats, Testimonials, CTA, Footer
    │
Login / Register (/login, /register)
    ├── AuthLayout + React Hook Form built-in validation
    └── (Day 5) useAuthActions → auth.service → Backend
    │
Dashboard (/dashboard)
    ├── DashboardLayout (sidebar + header)
    └── Stat cards (mock data until Day 5)
```

**Current status:** UI/UX is production-ready. Login and register use **mock submit handlers** with toast feedback and navigation to `/dashboard`. Stats, testimonials, and dashboard metrics use **fake frontend data**. Protected routes and full API wiring are planned for **Day 5**.

---

## Tech Stack

| Package | Purpose |
|---------|---------|
| React 19 + TypeScript | UI framework and type safety |
| Vite 8 | Dev server and build tool |
| Tailwind CSS v4 + `@tailwindcss/vite` | All UI styling (utility classes only) |
| React Router DOM | Client-side routing |
| React Hook Form | Form state and built-in validation |
| Axios | HTTP client (auth service) |
| React Hot Toast | Notifications |
| Lucide React | Icons |

---

## Routes

Defined in `src/routes/AppRoutes.tsx`, mounted from `src/App.tsx`.

| Route | Page | Description |
|-------|------|-------------|
| `/` | `LandingPage` | Public marketing landing page |
| `/login` | `Login` | Sign-in form (UI preview; backend on Day 5) |
| `/register` | `Register` | Sign-up form (UI preview; backend on Day 5) |
| `/dashboard` | `DashboardPage` | Admin dashboard with mock stat cards |
| `*` | Redirect → `/` | Catch-all |

Protected routes are **not** implemented yet — all pages are publicly accessible.

---

## Design System (Tailwind)

### Configuration

- **`src/index.css`** — `@import 'tailwindcss'`, brand/stat colors in `@theme`, base body styles, custom utilities.
- **`vite.config.js`** — `tailwindcss()` Vite plugin.
- **`index.html`** — Inter font from Google Fonts.

### Brand tokens (`@theme`)

| Token | Usage |
|-------|--------|
| `brand-50` … `brand-900` | Primary purple/indigo palette |
| `stat-blue`, `stat-indigo`, `stat-purple`, `stat-coral` | Dashboard and landing stat cards |
| `shadow-card`, `shadow-card-hover` | Card elevation |

### Custom utilities

- `text-gradient-brand` — Gradient heading text
- `bg-gradient-hero` — Landing hero background
- `bg-gradient-cta` — CTA section background

### Shared UI components (`src/components/ui/`)

| Component | Description |
|-----------|-------------|
| `Button` | Variants: `primary`, `secondary`, `outline`, `ghost`; sizes: `sm`, `md`, `lg` |
| `Input` | Label, error, hint support; focus and validation states |
| `Checkbox` | Styled checkbox with label |
| `Card` | White rounded card with optional hover lift |
| `Container` | Centered max-width wrapper (`default`, `narrow`, `wide`) |
| `Section` | Page section with background variants and built-in `Container` |

### Utilities

- **`src/lib/cn.ts`** — Conditional class name helper.

---

## Landing Page

**File:** `src/pages/public/LandingPage.tsx`

Composes section components from `src/components/landing/`:

| Section | File | Content |
|---------|------|---------|
| Navbar | `PublicNavbar.tsx` | Logo, anchor links, Login / Get Started CTAs, mobile menu |
| Hero | `HeroSection.tsx` | Headline, subtext, CTAs, gradient accents, stat preview cards |
| Features | `FeaturesSection.tsx` | Six feature cards (Book Management, Auth, Borrowing, etc.) |
| About | `AboutSection.tsx` | Two-column copy, benefits list, illustration placeholder, mini stats |
| Stats | `StatsSection.tsx` | Four animated-style stat cards (mock data) |
| Testimonials | `TestimonialsSection.tsx` | Three review cards (mock data) |
| CTA | `CtaSection.tsx` | Gradient banner, Register Now + Login buttons |
| Footer | `LandingFooter.tsx` | Quick links, social placeholders, copyright |

**Mock data:** `src/data/landing.data.ts` — features, stats, testimonials, about stats.

Stats and testimonials include `TODO: Connect to backend API on Day 5` in code where applicable.

---

## Auth Pages (UI)

**Files:** `src/pages/auth/Login.tsx`, `src/pages/auth/Register.tsx`  
**Layout:** `src/components/auth/AuthLayout.tsx` — split-screen: branded gradient panel (desktop) + centered form card.

### Validation

Forms use **React Hook Form** with inline validation rules.

### Login features

- Email and password fields with inline errors
- Remember me checkbox
- Forgot password placeholder (toast only until Day 5)
- Loading state on submit
- Link to `/register`

### Register features

- Name, email, password, confirm password
- Loading state on submit
- Link to `/login`

### Submit behavior (current)

Mock delay (~900ms), success toast, navigate to `/dashboard`.  
Comments in code: `TODO: Connect to backend API on Day 5 — useAuthActions().login()` / `.register()`.

---

## Dashboard

**File:** `src/pages/dashboard/DashboardPage.tsx`

Matches the library admin dashboard design language: white sidebar, top header, colored stat cards on `bg-slate-50`.

### Layout components (`src/components/dashboard/`)

| Component | Role |
|-----------|------|
| `DashboardLayout` | Sidebar + header + main content; mobile overlay |
| `DashboardSidebar` | Nav items (Dashboard, Category, Author, Books, etc.) |
| `DashboardHeader` | Title bar, Home link, profile avatar placeholder |
| `StatCard` | Colored metric card with “View Details” |

### State

Dashboard mobile sidebar state uses simple React `useState` inside `DashboardLayout`.

### Mock data

**File:** `src/data/dashboard.data.ts` — `dashboardStats`, `sidebarNavItems`.  
`TODO: Connect to backend API on Day 5` on the dashboard stats grid.

---

## Authentication Layer (Backend-Ready)

Infrastructure from the initial auth feature remains in place for Day 5 integration.

### Flow (when wired)

```
Login / Register pages
        ↓
  useAuthActions (hook)
        ↓
  auth.service (API)  →  Backend /auth/*
        ↓
  AuthContext (state + localStorage)
```

### `src/types/auth.types.ts`

| Type | Description |
|------|-------------|
| `Role` | `USER` \| `ADMIN` |
| `User` | User object from register |
| `LoginCredentials` | email, password |
| `RegisterCredentials` | name, username, email, password |
| `AuthResponse` | `access_token`, optional `user` |
| `AuthContextValue` | Context shape |

### `src/services/auth.service.ts`

- Axios instance with `VITE_API_URL` base URL.
- `login(credentials)` — `POST /auth/login`
- `register(credentials)` — `POST /auth/register`

### `src/context/AuthContext.tsx`

- **`AuthProvider`** — Holds `token`, `user`, `isLoading`.
- **`useAuth()`** — Read auth state.
- Persists `access_token` and `user` in `localStorage`.
- `setAuth`, `logout`, `isAuthenticated`.

### `src/hooks/useAuthActions.ts`

| Action | Behavior |
|--------|----------|
| `login` | API login, `setAuth`, toast, navigate |
| `register` | API register, `setAuth`, toast, navigate |
| `logout` | Clear session |

**Note:** Auth pages currently do **not** call this hook; swap mock `onSubmit` handlers on Day 5.

---

## App Entry & Configuration

### `src/main.jsx`

- `BrowserRouter`
- `AuthProvider`
- `App`
- `Toaster` (Tailwind-styled via `toastOptions.className`)

### `src/App.tsx`

Renders `AppRoutes` only.

### `vite.config.js`

- React plugin + Tailwind Vite plugin
- Dev proxy: `/auth` → `http://localhost:3000`

### `tsconfig.json` & `src/vite-env.d.ts`

TypeScript for `.ts`/`.tsx` and `import.meta.env.VITE_API_URL`.

---

## File Structure

```
src/
├── App.tsx
├── main.jsx
├── index.css
├── lib/
│   └── cn.ts
├── routes/
│   └── AppRoutes.tsx
├── pages/
│   ├── public/
│   │   └── LandingPage.tsx
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   └── dashboard/
│       └── DashboardPage.tsx
├── components/
│   ├── ui/           # Button, Input, Card, Container, Section, Checkbox
│   ├── landing/      # Hero, Features, About, Stats, Testimonials, CTA, Footer, Navbar
│   ├── auth/         # AuthLayout
│   └── dashboard/    # Layout, Sidebar, Header, StatCard
├── data/
│   ├── landing.data.ts
│   └── dashboard.data.ts
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useAuthActions.ts
├── services/
│   └── auth.service.ts
└── types/
    └── auth.types.ts
```

---

## Environment

| Variable | Default | Purpose |
|----------|---------|---------|
| `VITE_API_URL` | `''` (relative) | API base URL. Use `http://localhost:3000` for production or when not using the Vite proxy |

---

## How to Run

1. Install dependencies (from `frontend/`):

   ```bash
   npm install
   ```

2. Start the backend (optional for UI-only preview): `npm run start:dev` on port 3000.

3. Start the frontend:

   ```bash
   npm run dev
   ```

4. Open in the browser:

   - `/` — Landing page
   - `/login` — Login
   - `/register` — Register
   - `/dashboard` — Dashboard (mock stats)

5. Production build:

   ```bash
   npm run build
   ```

---

## Day 5 Integration Checklist

- [ ] Wire `Login` / `Register` submit to `useAuthActions()`
- [ ] Keep register form fields aligned with the backend DTO
- [ ] Replace mock stats in `landing.data.ts` and `dashboard.data.ts` with API calls
- [ ] Add protected routes for `/dashboard` and admin pages
- [ ] Attach JWT from `AuthContext` to book and library API requests

After full integration, the JWT remains in `localStorage` under `access_token` for `Authorization: Bearer <token>` on API calls.
