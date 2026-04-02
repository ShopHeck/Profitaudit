# ProfitAudit

ProfitAudit is a production-oriented SaaS MVP built with Next.js App Router, Supabase, Stripe, and a deterministic SEO + CRO scoring engine.

## MVP capabilities
- Conversion-focused landing page with clear CTA, proof copy, and trust indicators.
- Hierarchical audit results UI with dominant score cards and a primary “Top 5 fixes by ROI” section.
- Upgrade prompts across dashboard and audit flow, plus locked premium sections for free users.
- Current-plan badges in Dashboard and Settings/Billing.
- Credibility-enhanced pricing page with trust copy and FAQ.
- Typed Supabase clients and typed server-side queries with demo fallback data.
- Hardened Stripe server routes with explicit validation and error handling.

## Tech stack
- Next.js 15+, TypeScript, Tailwind CSS
- Supabase Auth + Postgres + RLS
- Stripe subscriptions + webhooks
- Vitest for deterministic scoring tests

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file from example:
   ```bash
   cp .env.example .env.local
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

## Database setup
1. Apply migrations in order:
   - `db/migrations/001_init.sql`
   - `db/migrations/002_launch_readiness.sql`
2. Seed local/demo data:
   ```bash
   DATABASE_URL=postgres://... npm run db:seed
   ```

## Seed files
- `db/seed/001_demo_seed.sql` – baseline user, project, and audit demo records.
- `db/seed/002_launch_seed.sql` – launch analytics demo events.

## Billing setup
1. Create recurring Stripe prices for Starter, Growth, and Agency plans.
2. Set env vars from `.env.example`.
3. Add webhook endpoint: `/api/stripe/webhook`.
4. Enable `checkout.session.completed` events.

## Testing
```bash
npm run test
```
