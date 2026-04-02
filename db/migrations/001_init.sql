-- Enable uuid generation
create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  email text not null unique,
  plan text not null default 'free' check (plan in ('free', 'starter', 'growth', 'agency')),
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  domain text not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  status text not null default 'queued',
  overall_score int not null,
  seo_score int not null,
  cro_score int not null,
  revenue_leak_score int not null,
  traffic_estimate int not null,
  conversion_rate numeric not null,
  average_value numeric not null,
  uplift_low int not null,
  uplift_likely int not null,
  uplift_high int not null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_issues (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references public.audits(id) on delete cascade,
  category text not null,
  severity text not null,
  title text not null,
  description text not null,
  recommendation text not null,
  estimated_impact text not null,
  effort_level text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_suggestions (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references public.audits(id) on delete cascade,
  type text not null,
  original_text text not null,
  suggested_text text not null,
  variant_label text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.competitors (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  competitor_domain text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  provider text not null,
  provider_customer_id text,
  provider_subscription_id text,
  status text not null,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.projects enable row level security;
alter table public.audits enable row level security;
alter table public.audit_issues enable row level security;
alter table public.ai_suggestions enable row level security;
alter table public.competitors enable row level security;
alter table public.subscriptions enable row level security;

create policy "users can read own user row" on public.users
for select using (auth.uid() = auth_user_id);

create policy "users can update own row" on public.users
for update using (auth.uid() = auth_user_id);

create policy "users can insert own row" on public.users
for insert with check (auth.uid() = auth_user_id);

create policy "users own projects" on public.projects
for all using (user_id in (select id from public.users where auth_user_id = auth.uid()))
with check (user_id in (select id from public.users where auth_user_id = auth.uid()));

create policy "users own audits" on public.audits
for all using (project_id in (
  select p.id from public.projects p
  join public.users u on u.id = p.user_id
  where u.auth_user_id = auth.uid()
)) with check (project_id in (
  select p.id from public.projects p
  join public.users u on u.id = p.user_id
  where u.auth_user_id = auth.uid()
));

create policy "users own audit issues" on public.audit_issues
for all using (audit_id in (
  select a.id from public.audits a
  join public.projects p on p.id = a.project_id
  join public.users u on u.id = p.user_id
  where u.auth_user_id = auth.uid()
));

create policy "users own ai suggestions" on public.ai_suggestions
for all using (audit_id in (
  select a.id from public.audits a
  join public.projects p on p.id = a.project_id
  join public.users u on u.id = p.user_id
  where u.auth_user_id = auth.uid()
));

create policy "users own competitors" on public.competitors
for all using (project_id in (
  select p.id from public.projects p
  join public.users u on u.id = p.user_id
  where u.auth_user_id = auth.uid()
));

create policy "users own subscriptions" on public.subscriptions
for all using (user_id in (select id from public.users where auth_user_id = auth.uid()));
