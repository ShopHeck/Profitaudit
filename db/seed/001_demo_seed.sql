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

insert into public.audit_issues (
  id,
  audit_id,
  category,
  severity,
  title,
  description,
  recommendation,
  estimated_impact,
  effort_level
)
values
  ('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000201', 'cro', 'critical', 'Primary CTA not above fold', 'Users do not see a clear conversion action in the hero.', 'Place one high-contrast CTA button in hero and sticky mobile footer.', 'high', 'low'),
  ('00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000201', 'seo', 'high', 'Title tag missing buyer intent modifier', 'Homepage title lacks solution + intent keyword coverage.', 'Add primary keyword and business outcome phrase in title tag.', 'high', 'low'),
  ('00000000-0000-0000-0000-000000000303', '00000000-0000-0000-0000-000000000201', 'seo', 'medium', '17 images missing alt text', 'Image accessibility and semantic relevance are limited.', 'Add descriptive alt text to all product and trust asset images.', 'medium', 'medium')
on conflict do nothing;

insert into public.ai_suggestions (
  id,
  audit_id,
  type,
  original_text,
  suggested_text,
  variant_label
)
values
  ('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000201', 'headline', 'All-in-one growth platform', 'Turn more visitors into buyers with faster, clearer pages.', 'Benefit-first'),
  ('00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000201', 'cta', 'Learn More', 'Get My Revenue Audit', 'Action + outcome')
on conflict do nothing;
