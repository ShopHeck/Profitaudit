import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plan } from '@/types/domain';

const plans = [
  { key: 'free', price: '$0', features: 'Top 3 issues, limited AI suggestions' },
  { key: 'starter', price: '$49', features: 'Full single-page audit + weekly rescans' },
  { key: 'growth', price: '$149', features: 'Multi-page audits + competitor section + export' },
  { key: 'agency', price: '$399', features: 'White-label reports + unlimited client projects' }
] as const;

export function PricingGrid({ currentPlan }: { currentPlan: Plan }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-4">
      {plans.map((plan) => {
        const isCurrent = currentPlan === plan.key;
        return (
          <Card key={plan.key}>
            <h3 className="text-lg font-semibold capitalize">{plan.key}</h3>
            <p className="mt-2 text-3xl font-bold">{plan.price}<span className="text-sm text-slate-400">/mo</span></p>
            <p className="mt-2 text-sm text-slate-300">{plan.features}</p>
            <Button className="mt-4 w-full" disabled={isCurrent} variant={isCurrent ? 'secondary' : 'default'}>
              {isCurrent ? 'Current Plan' : `Upgrade to ${plan.key}`}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
