-- Launch-readiness improvements: usage tracking, stronger constraints, and indexes.

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  event_type text not null,
  event_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_projects_user_created on public.projects(user_id, created_at desc);
create index if not exists idx_audits_project_created on public.audits(project_id, created_at desc);
create index if not exists idx_audit_issues_audit_severity on public.audit_issues(audit_id, severity);
create index if not exists idx_ai_suggestions_audit_created on public.ai_suggestions(audit_id, created_at);
create index if not exists idx_usage_events_user_created on public.usage_events(user_id, created_at desc);

alter table public.audits
  add constraint audits_status_check check (status in ('queued', 'running', 'completed', 'failed'));

alter table public.audit_issues
  add constraint audit_issues_category_check check (category in ('seo', 'cro', 'technical')),
  add constraint audit_issues_severity_check check (severity in ('low', 'medium', 'high', 'critical')),
  add constraint audit_issues_estimated_impact_check check (estimated_impact in ('low', 'medium', 'high')),
  add constraint audit_issues_effort_level_check check (effort_level in ('low', 'medium', 'high'));

alter table public.ai_suggestions
  add constraint ai_suggestions_type_check check (type in ('title', 'meta', 'headline', 'cta'));

alter table public.usage_events enable row level security;

create policy "users own usage events" on public.usage_events
for all using (user_id in (select id from public.users where auth_user_id = auth.uid()));
