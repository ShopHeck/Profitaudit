'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plan } from '@/types/domain';

type PaidPlan = Exclude<Plan, 'free'>;

const plans = [
  { key: 'free', price: '$0', features: 'Top 3 issues, limited AI suggestions', cta: 'Get started' },
  { key: 'starter', price: '$49', features: 'Full single-page audit + weekly rescans', cta: 'Upgrade to starter' },
  { key: 'growth', price: '$149', features: 'Multi-page audits + competitor section + export', cta: 'Upgrade to growth' },
  { key: 'agency', price: '$399', features: 'White-label reports + unlimited client projects', cta: 'Upgrade to agency' }
] as const;

export function PricingGrid({
  currentPlan,
  userEmail,
  userId
}: {
  currentPlan: Plan;
  userEmail?: string;
  userId?: string;
}) {
  const [loadingPlan, setLoadingPlan] = useState<PaidPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(plan: PaidPlan) {
    if (!userEmail || !userId) {
      setError('Please sign in first to start checkout.');
      return;
    }

    setError(null);
    setLoadingPlan(plan);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ plan, email: userEmail, userId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ? JSON.stringify(data.error) : 'Unable to start checkout.');
      }

      if (!data.url) {
        throw new Error('Checkout URL missing from API response.');
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unknown checkout error.');
      setLoadingPlan(null);
    }
  }

  return (
    <div>
      {error && <p className="mt-4 rounded border border-rose-500/50 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>}
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.key;
          const isPaidPlan = plan.key !== 'free';
          const isLoading = loadingPlan === plan.key;

          return (
            <Card key={plan.key} className={plan.key === 'growth' ? 'border-brand-500/50' : ''}>
              {plan.key === 'growth' && <p className="text-xs uppercase tracking-wider text-brand-300">Most popular</p>}
              <h3 className="text-lg font-semibold capitalize">{plan.key}</h3>
              <p className="mt-2 text-3xl font-bold">{plan.price}<span className="text-sm text-slate-400">/mo</span></p>
              <p className="mt-2 text-sm text-slate-300">{plan.features}</p>
              <Button
                className="mt-4 w-full"
                disabled={isCurrent || isLoading || loadingPlan !== null}
                variant={isCurrent ? 'secondary' : 'default'}
                onClick={isPaidPlan ? () => startCheckout(plan.key) : undefined}
              >
                {isCurrent ? 'Current Plan' : isLoading ? 'Redirecting...' : plan.cta}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
