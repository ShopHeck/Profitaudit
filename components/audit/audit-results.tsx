import { Card } from '@/components/ui/card';
import { allowedIssueCount } from '@/lib/access/plans';
import { Plan } from '@/types/domain';
import { demoAiSuggestions, demoAudit, demoIssues } from '@/db/seed/demo-data';

export function AuditResults({ plan = 'free' as Plan }) {
  const visibleIssues = demoIssues.slice(0, allowedIssueCount(plan));
  const isPremiumLocked = plan === 'free';

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-slate-400">Overall Score</p><p className="mt-2 text-3xl font-semibold">{demoAudit.overall_score}</p></Card>
        <Card><p className="text-sm text-slate-400">SEO Score</p><p className="mt-2 text-3xl font-semibold">{demoAudit.seo_score}/50</p></Card>
        <Card><p className="text-sm text-slate-400">CRO Score</p><p className="mt-2 text-3xl font-semibold">{demoAudit.cro_score}/50</p></Card>
        <Card><p className="text-sm text-slate-400">Revenue Leak</p><p className="mt-2 text-3xl font-semibold">{demoAudit.revenue_leak_score}</p></Card>
      </section>

      <Card>
        <h3 className="text-lg font-semibold">Top 5 fixes by ROI</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {demoIssues.slice(0, 5).map((issue) => <li key={issue.id}>• {issue.title}</li>)}
        </ul>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold">Quick wins in 30 minutes</h3>
        <p className="mt-2 text-sm text-slate-300">Tighten title/meta messaging, move CTA above fold, and reduce lead form fields.</p>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold">AI rewritten title/meta/headline/CTA suggestions</h3>
        <div className="mt-3 space-y-3">
          {demoAiSuggestions.slice(0, isPremiumLocked ? 1 : demoAiSuggestions.length).map((suggestion) => (
            <div key={suggestion.id} className="rounded-lg border border-slate-800 p-3">
              <p className="text-xs uppercase text-slate-400">{suggestion.type} · {suggestion.variant_label}</p>
              <p className="mt-1 text-sm text-slate-400">{suggestion.original_text}</p>
              <p className="text-sm font-medium">{suggestion.suggested_text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold">Detailed issue list</h3>
        <p className="mt-2 text-xs text-slate-400">Filters: category and severity (placeholder)</p>
        <div className="mt-3 space-y-3">
          {visibleIssues.map((issue) => (
            <div key={issue.id} className="rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{issue.title}</p>
                <span className="rounded-full bg-slate-800 px-2 py-1 text-xs uppercase">{issue.severity}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{issue.description}</p>
              <p className="mt-2 text-sm">Recommendation: {issue.recommendation}</p>
            </div>
          ))}
        </div>
        {isPremiumLocked && <p className="mt-4 rounded-lg border border-brand-500/40 bg-brand-500/10 p-3 text-sm">Upgrade to Starter+ to unlock full issue list, competitor section, and export.</p>}
      </Card>

      <Card><h3 className="text-lg font-semibold">Competitor comparison</h3><p className="text-sm text-slate-300">Available on Growth+ plans (placeholder).</p></Card>
      <Card><h3 className="text-lg font-semibold">Export</h3><p className="text-sm text-slate-300">PDF/CSV export available on Growth+ plans (placeholder).</p></Card>
    </div>
  );
}
