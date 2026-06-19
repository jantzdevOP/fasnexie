import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ group: 'wardrobe', operations: ['create', 'read', 'update', 'delete', 'tagging', 'gap-analysis'] });
}
