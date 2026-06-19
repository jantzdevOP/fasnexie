import { NextResponse } from 'next/server';
import { buildNexieContext } from '@/lib/ai/context';

export async function POST(request: Request) {
  const body = (await request.json()) as { styleDNA: string; wardrobeSummary: string; query: string };
  const context = buildNexieContext(body);
  return NextResponse.json({ group: 'nexie', context });
}
