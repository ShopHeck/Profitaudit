import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createCheckoutSession } from '@/services/billing/billingService';

const checkoutSchema = z.object({
  plan: z.enum(['starter', 'growth', 'agency']),
  email: z.string().email(),
  userId: z.string().min(1)
});

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const parsed = checkoutSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await createCheckoutSession({
      plan: parsed.data.plan,
      customerEmail: parsed.data.email,
      userId: parsed.data.userId,
      successUrl: `${baseUrl}/checkout/success`,
      cancelUrl: `${baseUrl}/checkout/cancel`
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Checkout session created without URL.' }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown checkout error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
