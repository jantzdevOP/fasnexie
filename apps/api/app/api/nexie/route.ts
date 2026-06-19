import { NextResponse } from 'next/server';
import { z } from 'zod';
import { buildNexieContext } from '@/lib/ai/context';

const nexieRequestSchema = z.object({
  styleDNA: z.string().min(1),
  wardrobeSummary: z.string().min(1),
  query: z.string().min(1),
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = nexieRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Invalid request payload',
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const context = buildNexieContext(parsed.data);
  return NextResponse.json({ group: 'nexie', context });
}
