import Stripe from 'stripe';
import { Plan } from '@/types/domain';
import { STRIPE_PRICE_IDS } from '@/lib/stripe/config';
import { createAdminSupabase } from '@/lib/supabase/admin';

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error('Missing STRIPE_SECRET_KEY.');
  }

  return new Stripe(key);
}

function requirePriceId(plan: Exclude<Plan, 'free'>) {
  const priceId = STRIPE_PRICE_IDS[plan];

  if (!priceId) {
    throw new Error(`Missing Stripe price ID for plan: ${plan}`);
  }

  return priceId;
}

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
  return getStripeClient().checkout.sessions.create({
    mode: 'subscription',
    customer_email: customerEmail,
    line_items: [{ price: requirePriceId(plan), quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId, plan }
  });
}


export function planFromPriceId(priceId: string | undefined): Exclude<Plan, 'free'> | null {
  if (!priceId) return null;

  if (priceId === STRIPE_PRICE_IDS.starter) return 'starter';
  if (priceId === STRIPE_PRICE_IDS.growth) return 'growth';
  if (priceId === STRIPE_PRICE_IDS.agency) return 'agency';

  return null;
}

export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const plan = session.metadata?.plan as Plan | undefined;
  const userId = session.metadata?.userId;
  const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
  const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

  if (!userId || !plan || !customerId || !subscriptionId) {
    throw new Error('Webhook session metadata is incomplete.');
  }

  const admin = createAdminSupabase() as any;

  const { error: subscriptionError } = await admin.from('subscriptions').upsert(
    {
      user_id: userId,
      provider: 'stripe',
      provider_customer_id: customerId,
      provider_subscription_id: subscriptionId,
      status: 'active'
    },
    {
      onConflict: 'provider_subscription_id'
    }
  );

  if (subscriptionError) {
    throw new Error(`Failed to persist subscription: ${subscriptionError.message}`);
  }

  const { error: userUpdateError } = await admin
    .from('users')
    .update({ plan })
    .eq('id', userId);

  if (userUpdateError) {
    throw new Error(`Failed to update user plan: ${userUpdateError.message}`);
  }

  return {
    userId,
    plan,
    customerId,
    subscriptionId
  };
}
