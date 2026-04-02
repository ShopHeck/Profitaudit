import { CrawlSnapshot } from '@/types/domain';

export function scoreCro(snapshot: CrawlSnapshot): number {
  let score = 0;
  score += snapshot.headings[0] && snapshot.headings[0].length > 20 ? 8 : 3;
  score += snapshot.ctaAboveFold ? 8 : 2;
  score += snapshot.trustSignals >= 3 ? 7 : 3;
  score += snapshot.formFields <= 4 ? 6 : 2;
  score += snapshot.mobileFriendly ? 8 : 1;
  score += snapshot.metaDescription.includes('benefit') ? 6 : 3;
  score += snapshot.lcpMs < 2500 ? 7 : 2;

  return Math.min(50, Math.max(0, score));
}
