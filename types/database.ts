export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          auth_user_id: string;
          email: string;
          plan: 'free' | 'starter' | 'growth' | 'agency';
          created_at: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          domain: string;
          name: string;
          created_at: string;
        };
      };
      audits: {
        Row: {
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
        };
      };
      audit_issues: {
        Row: {
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
        };
      };
      ai_suggestions: {
        Row: {
          id: string;
          audit_id: string;
          type: 'title' | 'meta' | 'headline' | 'cta';
          original_text: string;
          suggested_text: string;
          variant_label: string;
          created_at: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          provider: string;
          provider_customer_id: string | null;
          provider_subscription_id: string | null;
          status: string;
          created_at: string;
        };
      };
      usage_events: {
        Row: {
          id: string;
          user_id: string;
          event_type: string;
          event_payload: Json;
          created_at: string;
        };
      };

    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
