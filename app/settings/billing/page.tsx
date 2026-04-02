import { PricingGrid } from '@/components/pricing/pricing-grid';
import { getDashboardData } from '@/services/data/dashboardDataService';

export default async function BillingPage() {
  const data = await getDashboardData();

  return (
    <div className="container-shell py-10">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold">Settings & Billing</h1>
        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs uppercase tracking-wide text-slate-300">{data.currentPlan} plan</span>
      </div>
      <p className="mt-2 text-slate-300">Manage plan, payment status, and checkout links.</p>
      <PricingGrid currentPlan={data.currentPlan} />
    </div>
  );
}
