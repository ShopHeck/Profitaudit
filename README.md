# ProfitAudit

ProfitAudit is a production-style SaaS MVP built with Next.js App Router, Supabase, Stripe, and a deterministic SEO+CRO scoring engine.

## Features
- Landing, pricing, auth, dashboard, audit results, billing, checkout success/cancel pages.
- Deterministic audit scoring: SEO (50), CRO (50), overall score, revenue leak score.
- Revenue uplift estimates (conservative/likely/aggressive) using traffic, CVR, and average value.
- Plan gating (Free, Starter, Growth, Agency).
- Stripe checkout + webhook route handlers.
- Supabase schema migration with RLS policies and demo seed data.
- Service-oriented modules: crawlerService, auditService, aiSuggestionService, billingService, recurringScanService.
- Demo fallback data including a seeded `example.com` audit.

## Tech stack
- Next.js 15+, TypeScript, Tailwind CSS
- shadcn-style UI primitives (`Button`, `Card`)
- Supabase Auth/Postgres/RLS
- Stripe subscriptions

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local`:
   ```bash
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   STRIPE_SECRET_KEY=...
   STRIPE_WEBHOOK_SECRET=...
   STRIPE_PRICE_STARTER=price_...
   STRIPE_PRICE_GROWTH=price_...
   STRIPE_PRICE_AGENCY=price_...
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```

## Supabase setup
1. Create a Supabase project.
2. Run `db/migrations/001_init.sql` in SQL editor.
3. Run `db/seed/001_demo_seed.sql` to seed demo user/project/audit.
4. Ensure email/password auth is enabled.

## Stripe setup
1. Create 3 recurring prices for Starter/Growth/Agency.
2. Fill env vars for Stripe keys and price IDs.
3. Add webhook endpoint: `/api/stripe/webhook`.
4. Listen for `checkout.session.completed` and sync subscription+plan in DB (hook point in `billingService`).

## Deployment notes
- Deploy on Vercel.
- Set all environment variables.
- Configure Supabase URL/keys and Stripe webhook secret for production.
- Replace placeholder crawler and AI modules with real providers over time.
- Future integrations: GA4, Search Console, Shopify, WordPress, report export workers.

## Tests
Run:
```bash
npm run test
```

Covers deterministic scoring helper behavior in `tests/scoring.test.ts`.
