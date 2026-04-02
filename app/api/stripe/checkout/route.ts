import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createCheckoutSession } from '@/services/billing/billingService';

const checkoutSchema = z.object({
  plan: z.enum(['starter', 'growth', 'agency']),
  email: z.string().email(),
  userId: z.string().min(1)
});

export async function POST(request: NextRequest) {
  const parsed = checkoutSchema.safeParse(await request.json());
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

  return NextResponse.json({ url: session.url });
}
