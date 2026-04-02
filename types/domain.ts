export type Plan = 'free' | 'starter' | 'growth' | 'agency';

export interface User {
  id: string;
  auth_user_id: string;
  email: string;
  plan: Plan;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  domain: string;
  name: string;
  created_at: string;
}

export interface Audit {
  id: string;
  project_id: string;
  url: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  overall_score: number;
  seo_score: number;
  cro_score: number;
  revenue_leak_score: number;
  traffic_estimate: number;
  conversion_rate: number;
  average_value: number;
  uplift_low: number;
  uplift_likely: number;
  uplift_high: number;
  created_at: string;
}

export interface AuditIssue {
  id: string;
  audit_id: string;
  category: 'seo' | 'cro' | 'technical';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommendation: string;
  estimated_impact: 'low' | 'medium' | 'high';
  effort_level: 'low' | 'medium' | 'high';
  created_at: string;
}

export interface AiSuggestion {
  id: string;
  audit_id: string;
  type: 'title' | 'meta' | 'headline' | 'cta';
  original_text: string;
  suggested_text: string;
  variant_label: string;
  created_at: string;
}

export interface CrawlSnapshot {
  url: string;
  title: string;
  metaDescription: string;
  headings: string[];
  hasCanonical: boolean;
  indexable: boolean;
  internalLinksCount: number;
  imageMissingAltCount: number;
  contentWords: number;
  lcpMs: number;
  mobileFriendly: boolean;
  ctaAboveFold: boolean;
  trustSignals: number;
  formFields: number;
}
