import { DashboardOverview } from '@/components/dashboard/dashboard-overview';

export default function DashboardPage() {
  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-slate-300">Track project performance, usage, and upgrade opportunities.</p>
      <div className="mt-6">
        <DashboardOverview />
      </div>
    </div>
  );
}
