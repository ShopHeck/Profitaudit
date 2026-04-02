import { PricingGrid } from '@/components/pricing/pricing-grid';

export default function BillingPage() {
  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-semibold">Settings & Billing</h1>
      <p className="mt-2 text-slate-300">Manage plan, payment status, and checkout links.</p>
      <PricingGrid currentPlan="free" />
    </div>
  );
}
