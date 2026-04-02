import Stripe from 'stripe';
import { Plan } from '@/types/domain';
import { STRIPE_PRICE_IDS } from '@/lib/stripe/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function createCheckoutSession({
  plan,
  customerEmail,
  userId,
  successUrl,
  cancelUrl
}: {
  plan: Exclude<Plan, 'free'>;
  customerEmail: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: customerEmail,
    line_items: [{ price: STRIPE_PRICE_IDS[plan], quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId, plan }
  });
}

export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  return {
    userId: session.metadata?.userId,
    plan: session.metadata?.plan,
    customerId: session.customer,
    subscriptionId: session.subscription
  };
}
