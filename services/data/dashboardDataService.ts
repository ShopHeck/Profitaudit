import { demoAudit, demoProject } from '@/db/seed/demo-data';
import { createServerSupabase } from '@/lib/supabase/server';
import type { Plan, Project } from '@/types/domain';

export interface DashboardData {
  currentPlan: Plan;
  projects: Project[];
  latestOverallScore: number;
  usingDemoData: boolean;
  userId?: string;
  userEmail?: string;
}

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user: authUser },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return getDemoDashboardData();
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, plan, email')
      .eq('auth_user_id', authUser.id)
      .single();

    if (profileError || !profile) {
      return getDemoDashboardData();
    }

    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });

    if (projectsError || !projects?.length) {
      return {
        currentPlan: profile.plan,
        projects: [demoProject],
        latestOverallScore: demoAudit.overall_score,
        usingDemoData: true,
        userId: profile.id,
        userEmail: profile.email
      };
    }

    const latestProject = projects[0];
    const { data: latestAudit, error: auditError } = await supabase
      .from('audits')
      .select('overall_score')
      .eq('project_id', latestProject.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    return {
      currentPlan: profile.plan,
      projects,
      latestOverallScore: auditError || !latestAudit ? demoAudit.overall_score : latestAudit.overall_score,
      usingDemoData: false,
      userId: profile.id,
      userEmail: profile.email
    };
  } catch {
    return getDemoDashboardData();
  }
}

function getDemoDashboardData(): DashboardData {
  return {
    currentPlan: 'free',
    projects: [demoProject],
    latestOverallScore: demoAudit.overall_score,
    usingDemoData: true
  };
}
