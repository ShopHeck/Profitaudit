import { Plan } from '@/types/domain';

const order: Plan[] = ['free', 'starter', 'growth', 'agency'];

export function hasPlanAtLeast(current: Plan, required: Plan) {
  return order.indexOf(current) >= order.indexOf(required);
}

export function allowedIssueCount(plan: Plan) {
  if (plan === 'free') return 3;
  return Infinity;
}
