import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { DashboardData } from '@/services/data/dashboardDataService';

const planBadgeStyles: Record<DashboardData['currentPlan'], string> = {
  free: 'bg-slate-700/70 text-slate-100',
  starter: 'bg-blue-600/30 text-blue-200',
  growth: 'bg-violet-600/30 text-violet-100',
  agency: 'bg-amber-500/20 text-amber-100'
};

export function DashboardOverview({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-400">Current plan</p>
          <div className="mt-2 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${planBadgeStyles[data.currentPlan]}`}>
              {data.currentPlan}
            </span>
            {data.currentPlan === 'free' && <span className="text-xs text-slate-400">3 issues visible per audit</span>}
          </div>
          {data.currentPlan === 'free' && (
            <Link href="/pricing" className="mt-3 inline-block text-sm text-brand-400 underline-offset-4 hover:underline">
              Upgrade for full issue visibility and exports
            </Link>
          )}
        </Card>
        <Card><p className="text-sm text-slate-400">Projects</p><p className="mt-2 text-2xl font-semibold">{data.projects.length}</p></Card>
        <Card>
          <p className="text-sm text-slate-400">Latest overall score</p>
          <p className="mt-2 text-2xl font-semibold">{data.latestOverallScore}</p>
          <p className="text-xs text-slate-400">Benchmark: 80+ = strong conversion foundation</p>
        </Card>
      </section>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Project cards</h3>
          {data.currentPlan === 'free' && (
            <Link href="/pricing" className="text-sm text-brand-400 hover:underline">Unlock recurring scans</Link>
          )}
        </div>
        <div className="mt-4 space-y-3">
          {data.projects.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-700 p-4 text-sm text-slate-400">No projects yet. Run your first audit from the homepage.</p>
          ) : (
            data.projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between rounded-xl border border-slate-800 p-4">
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-slate-400">{project.domain}</p>
                </div>
                {data.usingDemoData ? (
                  <Link href="/audit/audit_demo_example_home"><Button>Open demo audit</Button></Link>
                ) : (
                  <Button disabled variant="secondary">Audit route coming soon</Button>
                )}
              </div>
            ))
          )}
        </div>
      </Card>

      <Card className="border-brand-500/40 bg-brand-500/10">
        <h3 className="text-lg font-semibold">Premium unlocks</h3>
        <p className="mt-2 text-sm text-slate-200">Get competitor tracking, recurring scans, full issue feeds, and white-label exports.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/pricing"><Button>Upgrade now</Button></Link>
          <Link href="/settings/billing"><Button variant="secondary">Compare plans</Button></Link>
        </div>
      </Card>

      {data.usingDemoData && <p className="text-xs text-slate-500">Showing demo fallback data until account data is connected.</p>}
    </div>
  );
}
