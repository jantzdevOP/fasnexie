import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ group: 'creators', storefronts: true, earnings: true });
}
