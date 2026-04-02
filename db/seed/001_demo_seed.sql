insert into public.users (id, auth_user_id, email, plan)
values
('00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'demo@profitaudit.app', 'free')
on conflict do nothing;

insert into public.projects (id, user_id, domain, name)
values ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'example.com', 'Example Inc')
on conflict do nothing;

insert into public.audits (
  id, project_id, url, status, overall_score, seo_score, cro_score, revenue_leak_score,
  traffic_estimate, conversion_rate, average_value, uplift_low, uplift_likely, uplift_high
)
values (
  '00000000-0000-0000-0000-000000000201',
  '00000000-0000-0000-0000-000000000101',
  'https://example.com',
  'completed',
  64, 33, 31, 36,
  32000, 0.015, 120, 2100, 3500, 5600
)
on conflict do nothing;
