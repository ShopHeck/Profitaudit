import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { handleCheckoutCompleted } from '@/services/billing/billingService';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

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

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown webhook error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
