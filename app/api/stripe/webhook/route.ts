import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminSupabase } from '@/lib/supabase/admin';
import { handleCheckoutCompleted, planFromPriceId } from '@/services/billing/billingService';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

async function syncSubscriptionStatus(subscription: Stripe.Subscription) {
  const admin = createAdminSupabase() as any;
  const subscriptionId = subscription.id;

  const { data: existing, error: existingError } = await admin
    .from('subscriptions')
    .select('id')
    .eq('provider_subscription_id', subscriptionId)
    .maybeSingle();

  if (existingError) {
    throw new Error(`Failed to load existing subscription: ${existingError.message}`);
  }

  if (!existing) {
    return;
  }

  const status = subscription.status;
  const isActive = status === 'active' || status === 'trialing';
  const recurringPriceId = subscription.items.data[0]?.price.id;
  const mappedPlan = planFromPriceId(recurringPriceId);

  const { error: subscriptionError } = await admin
    .from('subscriptions')
    .update({ status })
    .eq('provider_subscription_id', subscriptionId);

  if (subscriptionError) {
    throw new Error(`Failed to sync subscription status: ${subscriptionError.message}`);
  }

  const { data: subRecord, error: userLookupError } = await admin
    .from('subscriptions')
    .select('user_id')
    .eq('provider_subscription_id', subscriptionId)
    .single();

  if (userLookupError) {
    throw new Error(`Failed to load subscription user: ${userLookupError.message}`);
  }

  const { error: userError } = await admin
    .from('users')
    .update({ plan: isActive ? mappedPlan ?? 'starter' : 'free' })
    .eq('id', subRecord.user_id);

  if (userError) {
    throw new Error(`Failed to sync user plan from subscription status: ${userError.message}`);
  }
}

export async function POST(request: NextRequest) {
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const data = await handleCheckoutCompleted(session);
      return NextResponse.json({ received: true, data });
    }

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      await syncSubscriptionStatus(subscription);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown webhook error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
