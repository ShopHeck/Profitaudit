import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { getDashboardData } from '@/services/data/dashboardDataService';

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="container-shell py-10">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs uppercase tracking-wide text-slate-300">{data.currentPlan} plan</span>
      </div>
      <p className="mt-2 text-slate-300">Track project performance, usage, and upgrade opportunities.</p>
      <div className="mt-6">
        <DashboardOverview data={data} />
      </div>
    </div>
  );
}
