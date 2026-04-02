import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="container-shell space-y-14 py-12">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-10">
        <p className="text-brand-500">Get revenue-focused audit insights</p>
        <h1 className="mt-3 text-4xl font-semibold">Find what’s costing your site traffic and sales.</h1>
        <p className="mt-3 max-w-2xl text-slate-300">Get a full SEO + CRO audit in under 60 seconds. See the fixes most likely to increase revenue.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2" placeholder="https://your-site.com" />
          <Link href="/audit/audit_demo_example_home"><Button>Audit My Site</Button></Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {['Overall Score', 'SEO Score', 'CRO Score', 'Revenue Leak'].map((item) => (
          <Card key={item}><p className="text-sm text-slate-400">{item}</p><p className="mt-2 text-3xl font-semibold">84</p></Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {['Prioritized ROI fixes', 'Quick wins in 30 minutes', 'AI rewrite suggestions'].map((item) => (
          <Card key={item}><h3 className="font-semibold">{item}</h3><p className="mt-2 text-sm text-slate-300">Production-ready workflow for conversion-focused audits.</p></Card>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card><h3 className="text-xl font-semibold">Why ProfitAudit vs generic SEO tools?</h3><p className="mt-2 text-slate-300">ProfitAudit ties technical and CRO issues to potential revenue impact so teams prioritize what matters.</p></Card>
        <Card><h3 className="text-xl font-semibold">Built for upgrading</h3><p className="mt-2 text-slate-300">Free users unlock the first wins. Paid plans unlock full reports, recurring scans, competitor views, and exports.</p></Card>
      </section>

      <section className="text-center">
        <Link href="/pricing"><Button>View Plans</Button></Link>
      </section>
    </div>
  );
}
