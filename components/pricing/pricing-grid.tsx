import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plan } from '@/types/domain';

const plans = [
  { key: 'free', price: '$0', features: 'Top 3 issues, limited AI suggestions', cta: 'Get started' },
  { key: 'starter', price: '$49', features: 'Full single-page audit + weekly rescans', cta: 'Upgrade to starter' },
  { key: 'growth', price: '$149', features: 'Multi-page audits + competitor section + export', cta: 'Upgrade to growth' },
  { key: 'agency', price: '$399', features: 'White-label reports + unlimited client projects', cta: 'Upgrade to agency' }
] as const;

export function PricingGrid({ currentPlan }: { currentPlan: Plan }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-4">
      {plans.map((plan) => {
        const isCurrent = currentPlan === plan.key;
        return (
          <Card key={plan.key} className={plan.key === 'growth' ? 'border-brand-500/50' : ''}>
            {plan.key === 'growth' && <p className="text-xs uppercase tracking-wider text-brand-300">Most popular</p>}
            <h3 className="text-lg font-semibold capitalize">{plan.key}</h3>
            <p className="mt-2 text-3xl font-bold">{plan.price}<span className="text-sm text-slate-400">/mo</span></p>
            <p className="mt-2 text-sm text-slate-300">{plan.features}</p>
            <Button className="mt-4 w-full" disabled={isCurrent} variant={isCurrent ? 'secondary' : 'default'}>
              {isCurrent ? 'Current Plan' : plan.cta}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
