import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ group: 'products', search: true, filtering: true });
}
