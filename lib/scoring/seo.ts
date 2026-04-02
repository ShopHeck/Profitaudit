import { CrawlSnapshot } from '@/types/domain';

export function scoreSeo(snapshot: CrawlSnapshot): number {
  let score = 0;
  score += snapshot.title.length >= 30 && snapshot.title.length <= 60 ? 8 : 3;
  score += snapshot.metaDescription.length >= 120 && snapshot.metaDescription.length <= 160 ? 6 : 2;
  score += snapshot.headings.length >= 3 ? 6 : 2;
  score += snapshot.hasCanonical ? 6 : 1;
  score += snapshot.indexable ? 6 : 0;
  score += snapshot.internalLinksCount >= 5 ? 6 : 2;
  score += snapshot.imageMissingAltCount === 0 ? 6 : Math.max(1, 6 - snapshot.imageMissingAltCount);
  score += snapshot.contentWords >= 600 ? 6 : 2;
  score += snapshot.lcpMs < 2500 ? 6 : 2;

  return Math.min(50, Math.max(0, score));
}
