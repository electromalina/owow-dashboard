# OWOW Dashboard (Service Portal)

This repository contains the **OWOW client dashboard**: a web portal for project stakeholders to view updates, access key documents, and (in future) manage content through an admin area.

## What this project is

- **Frontend**: Next.js (App Router) + React + TypeScript
- **Styling**: Tailwind CSS + CSS
- **Authentication**: Supabase Auth (session cookies)
- **Authorization**: role-based access using a `profiles` table (`role: "admin" | "user"`)

The current build is a **working UI prototype** with several pages backed by **mock data** (see “Current scope vs production scope”).

## How it works 

### Routing & UI composition

Next.js App Router is used. Pages live under `app/`:

- **Dashboard**: `app/(dashboard)/page.tsx` (`/`)
- **Documents**: `app/(dashboard)/documents/page.tsx` (`/documents`)
- **Document detail**: `app/(dashboard)/documents/[id]/page.tsx` (`/documents/:id`)
- **Manage/Upload (prototype UI)**: `app/(dashboard)/documents/upload/page.tsx` (`/documents/upload`)
- **Updates**: `app/(dashboard)/updates/page.tsx` (`/updates`)
- **Contact**: `app/(dashboard)/contact-info/page.tsx` (`/contact-info`)
- **Admin area (placeholder)**: `app/(dashboard)/admin/page.tsx` (`/admin`)
- **Login**: `app/(auth)/auth/page.tsx` (`/auth`)

Reusable UI building blocks live under `src/components/`, and mocked datasets live under `src/data/`.

### Authentication (Supabase)

- The app uses Supabase Auth sessions stored in cookies.
- After a successful auth provider redirect, the callback endpoint exchanges the OAuth code for a session:
  - `app/(auth)/auth/callback/route.ts` (`/auth/callback`)

### Authorization (role-based access)

Access control is enforced in two layers:

- **Edge middleware** (`middleware.ts`)
  - Redirects logged-out users to `/auth` (preserving `?next=`).
  - Prevents non-admin users from accessing `/admin`.
  - Redirects already-signed-in users away from `/auth` (to `/` or `/admin` depending on role).
- **Server-side guard** (`app/(dashboard)/admin/layout.tsx`)
  - Double-checks the user session and role before rendering admin pages.

Roles are read from Supabase table `profiles` with a `role` field (expected values: `"admin"` or `"user"`).

## Current scope vs production scope

### Implemented today

- **Login flow plumbing** with Supabase session handling (middleware + callback route).
- **Role gating** for `/admin` (admin vs non-admin).
- **Dashboard UI** composed of required widgets and cards.
- **Documents/Updates/Contact pages** with UI/UX flows.

### Prototype-only (needs backend integration)

Several sections currently use **in-repo mock data**:

- Documents list/detail uses `src/data/documents.ts`
- Updates timeline uses `src/data/updates.ts`
- “Manage Documents” page (`/documents/upload`) keeps uploads in **local React state** (no file storage)

For production, these should be backed by a database + storage (see the advisory section).

## Getting started (local development)

### Prerequisites

- Node.js 
- npm 
- A Supabase project

### Environment variables

Create/maintain a `.env.local` file at the repository root with:

- `NEXT_PUBLIC_SUPABASE_URL`
- One of:
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (legacy naming), or
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.


## Deployment notes

- This is a standard Next.js app and can be deployed to any Node-compatible platform (e.g., Vercel, Azure, AWS).
- If you use Supabase OAuth providers, configure the **redirect/callback URL** to include:
  - `https://<your-domain>/auth/callback`

## Operations & maintenance

- **Auth troubleshooting**: most “can’t login” issues are caused by missing env vars, incorrect Supabase redirect URLs, or blocked cookies.
- **Role changes**: changing a user to admin is done by updating `profiles.role = 'admin'` in Supabase.

## Project structure

- `app/`: routes, layouts, and pages (Next.js App Router)
- `lib/supabase/`: Supabase clients for browser/server/middleware
- `src/components/`: reusable components/widgets
- `src/data/`: mock datasets (replace with API/database in production)
- `public/`: static assets (including local fonts under `public/fonts/`)


