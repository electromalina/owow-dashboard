# OWOW Dashboard

This repo is set up for **parallel development**: everyone builds their own page(s) and/or component(s) on their own branch, then we merge into `main`.

## How to work (required)
- **Never work directly on `main`**.
- **Create your own branch**: `name-feature` (examples: `nikita-documents`, `danylo-login`, `alex-budget-overview`).
- **Pull latest `main` before starting** and keep your branch up to date.
- **Commit often** with meaningful messages.\
  Commit type examples: `feat: ...`, `fix: ...`, `style: ...`, `refactor: ...`, `docs: ...`.
- **`main` must always build** and stay deployable.

## Run the project
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Where to put what (most important)
We use Next.js App Router.

### Pages (routes)
**If you are building a whole page**, you will work in `app/`.

Rule of thumb: **one URL = one folder = one `page.tsx`**.

Examples:
- **Login page**: `app/login/page.tsx` → `/login`
- **Documents page**: `app/documents/page.tsx` → `/documents`
- **Updates page**: `app/updates/page.tsx` → `/updates`
- **Admin panel** (root): `app/admin/page.tsx` → `/admin`
- **Admin sub-pages**: `app/admin/components/page.tsx` → `/admin/components`

Keep page files small: pages should mostly **compose components**, not contain big UI blocks inline.

### Components
**If you are building reusable components/widgets**, you will work in `src/components/`.

Suggested split (simple):
- `src/components/layout/` → app shell pieces (Header, Sidebar, etc.)
- `src/components/widgets/` → feature blocks (BudgetOverview, ProjectOverview, Updates, etc.)
- `src/components/ui/` → small reusable UI building blocks (Button, Input, Badge, Card, Modal)

Naming rules (from guidelines):
- **Components**: PascalCase (`BudgetOverview.tsx`)
- **Folders**: kebab-case (`project-overview/` if you need a folder)

### Who is working on what (so we don’t collide)
- **Pages contributors**: create your route folder under `app/<route>/page.tsx`, and import widgets from `src/components/...`.
- **Component contributors**: implement your widget in `src/components/widgets/<WidgetName>.tsx` (or a folder if it’s large) and export a single top-level component for easy integration.
- **App shell + auth + admin** (owner: you): header, sidebar, role-based auth, and admin UI to manipulate/configure widgets.

## Auth + admin structure (current + intended)
- `app/auth/page.tsx` → `/auth` (placeholder; can later be a landing/redirect for auth-related flows)
- `app/admin/page.tsx` → `/admin` (placeholder; will become the admin panel)

If you build `login`, create `app/login/page.tsx` (don’t put it inside `app/auth` unless we explicitly decide to).

## Styling rules
- **Tailwind CSS only**. Avoid custom CSS unless necessary.
- **No inline styles** unless dynamic.
- Use responsive utilities: `sm:`, `md:`, `lg:`.

## Design tokens (colors + fonts)
Source of truth: `app/globals.css`.

### Colors (Tailwind utilities)
Project color classes:
- `bg-black`, `bg-off-black`, `bg-white`, `bg-off-white`, `bg-beige`, `bg-yellow`, `bg-blue`, `bg-pink`, `bg-green`
- Same names work for `text-*`, `border-*`, etc.

Base tokens:
- `bg-background`, `text-foreground`

### Fonts
Font files live in `public/fonts/` and are loaded in `app/layout.tsx` via `next/font/local`.

## PR checklist (Definition of Done)
- Matches Figma
- Responsive (mobile/tablet/desktop)
- No console errors
- Uses tokens + Tailwind utilities
- Component/page naming follows conventions
- `npm run build` passes
