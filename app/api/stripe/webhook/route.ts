import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { handleCheckoutCompleted } from '@/services/billing/billingService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    return NextResponse.json({ error: `Webhook Error: ${(error as Error).message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const data = await handleCheckoutCompleted(session);
    return NextResponse.json({ received: true, data });
  }

  return NextResponse.json({ received: true });
}
