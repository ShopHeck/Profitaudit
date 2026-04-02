import { AiSuggestion } from '@/types/domain';

export async function generateAiSuggestions(auditId: string): Promise<AiSuggestion[]> {
  const now = new Date().toISOString();

  return [
    {
      id: crypto.randomUUID(),
      audit_id: auditId,
      type: 'title',
      original_text: 'Home | Brand',
      suggested_text: 'ProfitAudit: Find what is costing your site traffic and sales',
      variant_label: 'SEO + outcome',
      created_at: now
    },
    {
      id: crypto.randomUUID(),
      audit_id: auditId,
      type: 'meta',
      original_text: 'We help businesses grow',
      suggested_text: 'Run a 60-second SEO + CRO audit and prioritize fixes tied to revenue impact.',
      variant_label: 'Urgency + proof',
      created_at: now
    }
  ];
}
