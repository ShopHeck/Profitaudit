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

## Required environment variables
Copy `.env.example` to `.env.local` and fill all values.

### App
- `NEXT_PUBLIC_APP_URL` – local/public app origin used for redirect URLs.

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon public key.
- `SUPABASE_SERVICE_ROLE_KEY` – service role key used by Stripe webhook sync.
- `DATABASE_URL` – Postgres connection string for `npm run db:seed`.

### Stripe
- `STRIPE_SECRET_KEY` – Stripe secret key.
- `STRIPE_WEBHOOK_SECRET` – Stripe webhook signing secret.
- `STRIPE_PRICE_STARTER` – recurring Starter price ID.
- `STRIPE_PRICE_GROWTH` – recurring Growth price ID.
- `STRIPE_PRICE_AGENCY` – recurring Agency price ID.

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file from example:
   ```bash
   cp .env.example .env.local
   ```
3. Apply migrations in order:
   - `db/migrations/001_init.sql`
   - `db/migrations/002_launch_readiness.sql`
4. Seed local/demo data:
   ```bash
   DATABASE_URL=postgres://... npm run db:seed
   ```
5. Run development server:
   ```bash
   npm run dev
   ```

## Auth and billing behavior
- Sign-up writes to `auth.users`, and database trigger `handle_auth_user_created` automatically creates/updates matching `public.users`.
- Stripe checkout metadata includes `userId` + `plan`.
- `checkout.session.completed` webhook upserts `public.subscriptions` and updates `public.users.plan`.
- `customer.subscription.updated` and `customer.subscription.deleted` keep subscription status and user plan in sync.

## Seed files
- `db/seed/001_demo_seed.sql` – baseline user, project, audit, issue, and AI suggestion records.
- `db/seed/002_launch_seed.sql` – launch analytics demo events.

## Testing
```bash
npm run test
npm run build
```

## Launch checklist
Use this before shipping any local/staging environment:

1. **Environment and secrets**
   - [ ] `.env.local` exists and all vars from `.env.example` are set.
   - [ ] Stripe price IDs match intended Starter/Growth/Agency products.
   - [ ] Webhook secret is from the active Stripe endpoint.

2. **Database and RLS**
   - [ ] `001_init.sql` and `002_launch_readiness.sql` both applied.
   - [ ] RLS enabled on all public tables (`users`, `projects`, `audits`, `audit_issues`, `ai_suggestions`, `competitors`, `subscriptions`, `usage_events`).
   - [ ] Auth trigger `on_auth_user_created` exists and inserts into `public.users`.

3. **Billing flow**
   - [ ] Start checkout from Settings → Billing while signed in.
   - [ ] Confirm Stripe sends `checkout.session.completed` to `/api/stripe/webhook`.
   - [ ] Verify `public.subscriptions` row exists and `public.users.plan` changed from `free`.
   - [ ] Verify downgrade/cancel webhooks return users to `free` plan.

4. **UI gating and data states**
   - [ ] Free users only see limited issues/AI suggestions and locked Growth+ modules.
   - [ ] Paid users can access full issue/AI sections.
   - [ ] Dashboard/Audit render demo fallback, loading/error states, and empty states cleanly.

5. **Preflight checks**
   - [ ] `npm run test` passes.
   - [ ] `npm run build` passes.
   - [ ] `npm run dev` launches without manual code edits.
