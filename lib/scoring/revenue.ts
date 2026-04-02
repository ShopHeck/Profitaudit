export function scoreOverall(seoScore: number, croScore: number): number {
  return Math.round(seoScore + croScore);
}

export function scoreRevenueLeak(overallScore: number): number {
  return Math.min(100, Math.max(0, 100 - overallScore));
}

export function estimateUplift({
  traffic,
  conversionRate,
  averageValue,
  revenueLeakScore
}: {
  traffic: number;
  conversionRate: number;
  averageValue: number;
  revenueLeakScore: number;
}) {
  const currentRevenue = traffic * conversionRate * averageValue;
  const leakFactor = revenueLeakScore / 100;
  const likely = currentRevenue * leakFactor * 0.25;

  return {
    conservative: Math.round(likely * 0.6),
    likely: Math.round(likely),
    aggressive: Math.round(likely * 1.6)
  };
}
