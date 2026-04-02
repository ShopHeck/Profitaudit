import { CrawlSnapshot } from '@/types/domain';

export async function crawlUrl(url: string): Promise<CrawlSnapshot> {
  return {
    url,
    title: 'Example — Growth platform for modern teams',
    metaDescription: 'A benefit-led platform to improve conversion and marketing outcomes across channels.',
    headings: ['Grow revenue without guesswork', 'Trusted by teams', 'How it works'],
    hasCanonical: true,
    indexable: true,
    internalLinksCount: 4,
    imageMissingAltCount: 3,
    contentWords: 540,
    lcpMs: 2900,
    mobileFriendly: true,
    ctaAboveFold: false,
    trustSignals: 2,
    formFields: 7
  };
}
