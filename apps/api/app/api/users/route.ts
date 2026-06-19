import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ group: 'users', feature: 'Style DNA + profile preferences' });
}
