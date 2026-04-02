import { describe, expect, it } from 'vitest';
import { scoreSeo } from '../lib/scoring/seo';
import { scoreCro } from '../lib/scoring/cro';
import { scoreOverall, scoreRevenueLeak, estimateUplift } from '../lib/scoring/revenue';
import { CrawlSnapshot } from '../types/domain';

const baseline: CrawlSnapshot = {
  url: 'https://example.com',
  title: 'Great SaaS product for revenue growth and optimization',
  metaDescription: 'A benefit oriented meta description that clearly explains value and conversion outcomes in detail.',
  headings: ['Increase conversion rate with confidence', 'Proof', 'How it works'],
  hasCanonical: true,
  indexable: true,
  internalLinksCount: 6,
  imageMissingAltCount: 0,
  contentWords: 900,
  lcpMs: 1800,
  mobileFriendly: true,
  ctaAboveFold: true,
  trustSignals: 4,
  formFields: 3
};

describe('scoring helpers', () => {
  it('scores seo out of 50', () => {
    const score = scoreSeo(baseline);
    expect(score).toBeLessThanOrEqual(50);
    expect(score).toBeGreaterThan(35);
  });

  it('scores cro out of 50', () => {
    const score = scoreCro(baseline);
    expect(score).toBeLessThanOrEqual(50);
    expect(score).toBeGreaterThan(35);
  });

  it('derives overall and revenue leak', () => {
    const overall = scoreOverall(30, 20);
    const leak = scoreRevenueLeak(overall);
    expect(overall).toBe(50);
    expect(leak).toBe(50);
  });

  it('estimates uplift ranges deterministically', () => {
    const uplift = estimateUplift({
      traffic: 10000,
      conversionRate: 0.02,
      averageValue: 100,
      revenueLeakScore: 40
    });
    expect(uplift).toEqual({ conservative: 1200, likely: 2000, aggressive: 3200 });
  });
});
