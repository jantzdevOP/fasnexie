import { NextResponse } from 'next/server';
import { paymentProviders } from '@/lib/payments/providers';

export async function GET() {
  return NextResponse.json({ group: 'payments', providers: paymentProviders });
}
