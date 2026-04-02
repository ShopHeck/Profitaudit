import { demoAiSuggestions, demoAudit, demoIssues } from '@/db/seed/demo-data';
import { createServerSupabase } from '@/lib/supabase/server';
import type { AiSuggestion, Audit, AuditIssue, Plan } from '@/types/domain';

export interface AuditResultData {
  audit: Audit;
  issues: AuditIssue[];
  aiSuggestions: AiSuggestion[];
  plan: Plan;
  usingDemoData: boolean;
}

export async function getAuditResultData(auditId: string): Promise<AuditResultData> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user: authUser },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return getDemoAuditResultData();
    }

    const { data: profile } = await supabase
      .from('users')
      .select('plan')
      .eq('auth_user_id', authUser.id)
      .single();

    const plan = profile?.plan ?? 'free';

    const { data: audit, error: auditError } = await supabase
      .from('audits')
      .select('*')
      .eq('id', auditId)
      .single();

    if (auditError || !audit) {
      return getDemoAuditResultData(plan);
    }

    const { data: issues } = await supabase
      .from('audit_issues')
      .select('*')
      .eq('audit_id', audit.id)
      .order('created_at', { ascending: true });

    const { data: aiSuggestions } = await supabase
      .from('ai_suggestions')
      .select('*')
      .eq('audit_id', audit.id)
      .order('created_at', { ascending: true });

    return {
      audit,
      issues: issues ?? demoIssues,
      aiSuggestions: aiSuggestions ?? demoAiSuggestions,
      plan,
      usingDemoData: false
    };
  } catch {
    return getDemoAuditResultData();
  }
}

function getDemoAuditResultData(plan: Plan = 'free'): AuditResultData {
  return {
    audit: demoAudit,
    issues: demoIssues,
    aiSuggestions: demoAiSuggestions,
    plan,
    usingDemoData: true
  };
}
