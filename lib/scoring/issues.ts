import { CrawlSnapshot, AuditIssue } from '@/types/domain';

export function generateIssues(snapshot: CrawlSnapshot, auditId: string): AuditIssue[] {
  const issues: AuditIssue[] = [];

  if (snapshot.title.length < 30) {
    issues.push(issue(auditId, 'seo', 'high', 'Title tag is too short', 'Your title is under 30 characters.', 'Expand the title with target keyword + value proposition.', 'high', 'low'));
  }

  if (!snapshot.ctaAboveFold) {
    issues.push(issue(auditId, 'cro', 'critical', 'Primary CTA not visible above the fold', 'Visitors may not know the next action quickly.', 'Move one primary CTA into hero and repeat after proof blocks.', 'high', 'low'));
  }

  if (snapshot.imageMissingAltCount > 0) {
    issues.push(issue(auditId, 'seo', 'medium', 'Missing image alt text', `${snapshot.imageMissingAltCount} images lack alt text.`, 'Add descriptive alt text for all key images.', 'medium', 'medium'));
  }

  if (snapshot.formFields > 5) {
    issues.push(issue(auditId, 'cro', 'high', 'Form friction is high', 'Lead form has too many required fields.', 'Cut required fields to 3-4 and defer secondary fields.', 'high', 'medium'));
  }

  if (issues.length === 0) {
    issues.push(issue(auditId, 'technical', 'low', 'No major blocking issues found', 'Baseline audit looks healthy with opportunities for incremental gains.', 'Run a multi-page crawl for deeper optimization opportunities.', 'low', 'low'));
  }

  return issues;
}

function issue(
  auditId: string,
  category: AuditIssue['category'],
  severity: AuditIssue['severity'],
  title: string,
  description: string,
  recommendation: string,
  estimated_impact: AuditIssue['estimated_impact'],
  effort_level: AuditIssue['effort_level']
): AuditIssue {
  return {
    id: crypto.randomUUID(),
    audit_id: auditId,
    category,
    severity,
    title,
    description,
    recommendation,
    estimated_impact,
    effort_level,
    created_at: new Date().toISOString()
  };
}
