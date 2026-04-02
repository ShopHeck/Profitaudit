import { scoreSeo } from '@/lib/scoring/seo';
import { scoreCro } from '@/lib/scoring/cro';
import { estimateUplift, scoreOverall, scoreRevenueLeak } from '@/lib/scoring/revenue';
import { generateIssues } from '@/lib/scoring/issues';
import { crawlUrl } from '@/services/crawler/crawlerService';
import { generateAiSuggestions } from '@/services/ai/aiSuggestionService';

export async function runAudit(url: string) {
  const snapshot = await crawlUrl(url);
  const seoScore = scoreSeo(snapshot);
  const croScore = scoreCro(snapshot);
  const overallScore = scoreOverall(seoScore, croScore);
  const revenueLeakScore = scoreRevenueLeak(overallScore);

  const auditId = crypto.randomUUID();
  const uplift = estimateUplift({
    traffic: 32000,
    conversionRate: 0.015,
    averageValue: 120,
    revenueLeakScore
  });

  const issues = generateIssues(snapshot, auditId);
  const aiSuggestions = await generateAiSuggestions(auditId);

  return {
    id: auditId,
    url,
    status: 'completed' as const,
    overall_score: overallScore,
    seo_score: seoScore,
    cro_score: croScore,
    revenue_leak_score: revenueLeakScore,
    traffic_estimate: 32000,
    conversion_rate: 0.015,
    average_value: 120,
    uplift_low: uplift.conservative,
    uplift_likely: uplift.likely,
    uplift_high: uplift.aggressive,
    issues,
    aiSuggestions
  };
}
