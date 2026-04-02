import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { allowedIssueCount } from '@/lib/access/plans';
import type { AuditResultData } from '@/services/data/auditDataService';

export function AuditResults({ data }: { data: AuditResultData }) {
  const visibleIssues = data.issues.slice(0, allowedIssueCount(data.plan));
  const isPremiumLocked = data.plan === 'free';

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <Card className="border-brand-500/40 shadow-lg shadow-brand-500/15">
          <p className="text-sm text-slate-300">Overall Score</p>
          <p className="mt-2 text-5xl font-bold leading-none">{data.audit.overall_score}</p>
          <p className="mt-2 text-xs text-slate-400">Combines SEO and CRO performance</p>
        </Card>
        <Card className="ring-1 ring-slate-700/60">
          <p className="text-sm text-slate-400">SEO Score</p>
          <p className="mt-2 text-4xl font-semibold">{data.audit.seo_score}<span className="text-lg text-slate-400">/50</span></p>
        </Card>
        <Card className="ring-1 ring-slate-700/60">
          <p className="text-sm text-slate-400">CRO Score</p>
          <p className="mt-2 text-4xl font-semibold">{data.audit.cro_score}<span className="text-lg text-slate-400">/50</span></p>
        </Card>
        <Card className="ring-1 ring-rose-500/30">
          <p className="text-sm text-slate-400">Revenue Leak</p>
          <p className="mt-2 text-4xl font-semibold text-rose-300">{data.audit.revenue_leak_score}</p>
        </Card>
      </section>

      <Card className="border-brand-500/50 bg-gradient-to-br from-brand-500/20 to-slate-950">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold">Top 5 fixes by ROI</h3>
            <p className="mt-1 text-sm text-slate-200">Start here first—these actions typically produce the largest near-term lift.</p>
          </div>
          {isPremiumLocked && <Link href="/pricing"><Button>Unlock full playbook</Button></Link>}
        </div>
        <ul className="mt-4 space-y-3">
          {data.issues.slice(0, 5).map((issue, index) => (
            <li key={issue.id} className="rounded-lg border border-slate-700/70 bg-slate-900/70 p-3">
              <p className="text-sm font-semibold text-brand-300">#{index + 1} Priority</p>
              <p className="text-base font-medium">{issue.title}</p>
              <p className="text-sm text-slate-300">{issue.recommendation}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold">AI rewritten title/meta/headline/CTA suggestions</h3>
        <div className="mt-3 space-y-3">
          {data.aiSuggestions.slice(0, isPremiumLocked ? 1 : data.aiSuggestions.length).map((suggestion) => (
            <div key={suggestion.id} className="rounded-lg border border-slate-800 p-3">
              <p className="text-xs uppercase text-slate-400">{suggestion.type} · {suggestion.variant_label}</p>
              <p className="mt-1 text-sm text-slate-400">{suggestion.original_text}</p>
              <p className="text-sm font-medium">{suggestion.suggested_text}</p>
            </div>
          ))}
        </div>
        {isPremiumLocked && <p className="mt-4 text-sm text-brand-300">Upgrade to unlock additional AI variants and multi-page copy recommendations.</p>}
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Detailed issue list</h3>
          {isPremiumLocked && <Link href="/pricing" className="text-sm text-brand-400 hover:underline">See all issues</Link>}
        </div>
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[1px]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-wide text-brand-300">Premium</p>
            <h3 className="text-lg font-semibold">Competitor comparison</h3>
            <p className="text-sm text-slate-300">Benchmark share-of-voice, page speed, and on-page conversion signals against peers.</p>
            <Link href="/pricing" className="mt-4 inline-block"><Button>Unlock on Growth</Button></Link>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[1px]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-wide text-brand-300">Premium</p>
            <h3 className="text-lg font-semibold">Export center</h3>
            <p className="text-sm text-slate-300">Export branded PDF, CSV issue feeds, and client-ready summaries.</p>
            <Link href="/pricing" className="mt-4 inline-block"><Button>Unlock exports</Button></Link>
          </div>
        </Card>
      </div>

      {data.usingDemoData && <p className="text-xs text-slate-500">Showing demo fallback data until account data is connected.</p>}
    </div>
  );
}
