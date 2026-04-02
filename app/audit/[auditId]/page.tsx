import { AuditResults } from '@/components/audit/audit-results';
import { getAuditResultData } from '@/services/data/auditDataService';

export default async function AuditResultPage({ params }: { params: Promise<{ auditId: string }> }) {
  const { auditId } = await params;
  const data = await getAuditResultData(auditId);

  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-semibold">Audit Results</h1>
      <p className="mt-2 text-slate-300">Estimated uplift ranges are directional and not guaranteed claims.</p>
      <div className="mt-6">
        <AuditResults data={data} />
      </div>
    </div>
  );
}
