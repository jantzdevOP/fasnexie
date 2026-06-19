import { NextResponse } from 'next/server';
import { betterAuthConfig } from '@/lib/auth/config';

export async function GET() {
  return NextResponse.json({ group: 'auth', config: betterAuthConfig });
}
