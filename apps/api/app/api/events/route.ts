import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ group: 'events', ticketing: true });
}
