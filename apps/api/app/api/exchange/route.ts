import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ group: 'exchange', modules: ['trading', 'portfolio', 'assets'] });
}
