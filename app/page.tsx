import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const trustLogos = ['Used by growth teams', 'Methodology tested on 200+ pages', 'No credit card required'];

export default function LandingPage() {
  return (
    <div className="container-shell space-y-14 py-12">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-10">
        <p className="text-brand-400">Revenue-first SEO + CRO intelligence</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">Get your highest-ROI website fixes in under 60 seconds.</h1>
        <p className="mt-3 max-w-2xl text-slate-300">ProfitAudit pinpoints what is costing traffic and conversions, then prioritizes fixes by likely revenue impact.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2" placeholder="https://your-site.com" />
          <Link href="/audit/audit_demo_example_home"><Button className="w-full sm:w-auto">Run free audit</Button></Link>
          <Link href="/pricing"><Button variant="secondary" className="w-full sm:w-auto">See plans</Button></Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-400">
          {trustLogos.map((item) => <span key={item} className="rounded-full border border-slate-700 px-3 py-1">{item}</span>)}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ['Avg. audit completion', '46s'],
          ['Typical quick wins', '5'],
          ['Median projected uplift', '$3.5k/mo'],
          ['Teams audited', '120+']
        ].map(([label, value]) => (
          <Card key={label}><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-3xl font-semibold">{value}</p></Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Prioritized ROI fixes', 'Sorts your backlog by expected impact and effort level.'],
          ['Quick wins in 30 minutes', 'Find low-effort, high-return fixes your team can ship today.'],
          ['AI rewrite suggestions', 'Get conversion-ready title, headline, and CTA variants.']
        ].map(([item, description]) => (
          <Card key={item}><h3 className="font-semibold">{item}</h3><p className="mt-2 text-sm text-slate-300">{description}</p></Card>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card><h3 className="text-xl font-semibold">Why ProfitAudit vs generic SEO tools?</h3><p className="mt-2 text-slate-300">ProfitAudit connects technical and CRO issues directly to revenue upside, so teams focus on what moves pipeline first.</p></Card>
        <Card><h3 className="text-xl font-semibold">Built for free-to-paid growth</h3><p className="mt-2 text-slate-300">Free users unlock immediate wins. Premium unlocks full reports, recurring scans, competitor visibility, and exports.</p></Card>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold">See your top 5 ROI fixes now</h2>
        <p className="mt-2 text-slate-300">No setup friction. Start with a free audit and upgrade when you need deeper workflows.</p>
        <div className="mt-4">
          <Link href="/audit/audit_demo_example_home"><Button>Start free audit</Button></Link>
        </div>
      </section>
    </div>
  );
}
