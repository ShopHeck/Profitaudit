import { AiSuggestion, Audit, AuditIssue, Project } from '@/types/domain';

export const demoProject: Project = {
  id: 'project_demo_example',
  user_id: 'user_demo',
  domain: 'example.com',
  name: 'Example Inc',
  created_at: new Date().toISOString()
};

export const demoAudit: Audit = {
  id: 'audit_demo_example_home',
  project_id: demoProject.id,
  url: 'https://example.com',
  status: 'completed',
  overall_score: 64,
  seo_score: 33,
  cro_score: 31,
  revenue_leak_score: 36,
  traffic_estimate: 32000,
  conversion_rate: 0.015,
  average_value: 120,
  uplift_low: 2100,
  uplift_likely: 3500,
  uplift_high: 5600,
  created_at: new Date().toISOString()
};

export const demoIssues: AuditIssue[] = [
  {
    id: 'issue1',
    audit_id: demoAudit.id,
    category: 'cro',
    severity: 'critical',
    title: 'Primary CTA not above fold',
    description: 'Users do not see a clear conversion action in the hero.',
    recommendation: 'Place one high-contrast CTA button in hero and sticky mobile footer.',
    estimated_impact: 'high',
    effort_level: 'low',
    created_at: new Date().toISOString()
  },
  {
    id: 'issue2',
    audit_id: demoAudit.id,
    category: 'seo',
    severity: 'high',
    title: 'Title tag missing buyer intent modifier',
    description: 'Homepage title lacks solution + intent keyword coverage.',
    recommendation: 'Add primary keyword and business outcome phrase in title tag.',
    estimated_impact: 'high',
    effort_level: 'low',
    created_at: new Date().toISOString()
  },
  {
    id: 'issue3',
    audit_id: demoAudit.id,
    category: 'seo',
    severity: 'medium',
    title: '17 images missing alt text',
    description: 'Image accessibility and semantic relevance are limited.',
    recommendation: 'Add descriptive alt text to all product and trust asset images.',
    estimated_impact: 'medium',
    effort_level: 'medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'issue4',
    audit_id: demoAudit.id,
    category: 'cro',
    severity: 'high',
    title: 'Too many form fields',
    description: 'Lead form asks for 8 fields causing drop-off.',
    recommendation: 'Cut to 4 required fields and test progressive profiling.',
    estimated_impact: 'high',
    effort_level: 'medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'issue5',
    audit_id: demoAudit.id,
    category: 'technical',
    severity: 'medium',
    title: 'LCP above benchmark',
    description: 'Largest Contentful Paint is 3.8s on mobile.',
    recommendation: 'Compress hero media and defer non-critical scripts.',
    estimated_impact: 'medium',
    effort_level: 'high',
    created_at: new Date().toISOString()
  }
];

export const demoAiSuggestions: AiSuggestion[] = [
  {
    id: 'ai1',
    audit_id: demoAudit.id,
    type: 'headline',
    original_text: 'All-in-one growth platform',
    suggested_text: 'Turn more visitors into buyers with faster, clearer pages.',
    variant_label: 'Benefit-first',
    created_at: new Date().toISOString()
  },
  {
    id: 'ai2',
    audit_id: demoAudit.id,
    type: 'cta',
    original_text: 'Learn More',
    suggested_text: 'Get My Revenue Audit',
    variant_label: 'Action + outcome',
    created_at: new Date().toISOString()
  }
];
