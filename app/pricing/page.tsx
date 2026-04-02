import { Card } from '@/components/ui/card';
import { PricingGrid } from '@/components/pricing/pricing-grid';

const faq = [
  {
    q: 'Can I start free and upgrade later?',
    a: 'Yes. Your historical audits and project data remain available when you upgrade.'
  },
  {
    q: 'Do you guarantee revenue uplift?',
    a: 'No. We provide directional estimates based on observed technical and CRO factors.'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. ProfitAudit uses Supabase RLS and secure Stripe billing with no card storage on our servers.'
  }
];

export default function PricingPage() {
  return (
    <div className="container-shell py-12">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <p className="mt-2 text-slate-300">Start free, upgrade when you need full revenue intelligence.</p>

      <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-300">
        <span className="rounded-full border border-slate-700 px-3 py-1">Secure Stripe checkout</span>
        <span className="rounded-full border border-slate-700 px-3 py-1">Cancel anytime</span>
        <span className="rounded-full border border-slate-700 px-3 py-1">Trusted by in-house and agency growth teams</span>
      </div>

      <PricingGrid currentPlan="free" />

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {faq.map((item) => (
            <Card key={item.q}>
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
