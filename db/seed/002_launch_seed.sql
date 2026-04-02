-- Additional launch seed records for premium previews and product analytics.

insert into public.usage_events (user_id, event_type, event_payload)
values
  ('00000000-0000-0000-0000-000000000001', 'audit_viewed', '{"audit_id":"00000000-0000-0000-0000-000000000201"}'),
  ('00000000-0000-0000-0000-000000000001', 'pricing_viewed', '{"source":"dashboard"}')
on conflict do nothing;
