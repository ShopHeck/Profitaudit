import { PricingGrid } from '@/components/pricing/pricing-grid';

export default function PricingPage() {
  return (
    <div className="container-shell py-12">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <p className="mt-2 text-slate-300">Start free, upgrade when you need full revenue intelligence.</p>
      <PricingGrid currentPlan="free" />
    </div>
  );
}
