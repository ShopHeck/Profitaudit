import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { demoAudit, demoProject } from '@/db/seed/demo-data';

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-sm text-slate-400">Current plan</p><p className="mt-2 text-2xl font-semibold">Free</p><p className="text-sm text-slate-400">3 issues visible per audit</p></Card>
        <Card><p className="text-sm text-slate-400">Projects</p><p className="mt-2 text-2xl font-semibold">1</p></Card>
        <Card><p className="text-sm text-slate-400">Latest overall score</p><p className="mt-2 text-2xl font-semibold">{demoAudit.overall_score}</p></Card>
      </section>

      <Card>
        <h3 className="text-lg font-semibold">Project cards</h3>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 p-4">
          <div>
            <p className="font-medium">{demoProject.name}</p>
            <p className="text-sm text-slate-400">{demoProject.domain}</p>
          </div>
          <Link href="/audit/audit_demo_example_home"><Button>Open latest audit</Button></Link>
        </div>
      </Card>
    </div>
  );
}
