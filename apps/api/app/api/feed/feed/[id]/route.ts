import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { FEED_SEED } from '@/lib/data/feed-seed';

/**
 * GET /api/feed/:id
 * Single feed item detail.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const row = await prisma.feedItem.findUnique({ where: { id } });
    if (row) {
      return NextResponse.json({
        item: {
          ...row,
          publishedAt: row.publishedAt.toISOString(),
        },
      });
    }
  } catch (err) {
    console.warn('[feed/:id] DB error', err);
  }

  const seed = FEED_SEED.find((i) => i.id === id);
  if (seed) {
    return NextResponse.json({ item: seed });
  }

  return NextResponse.json({ error: 'Feed item not found' }, { status: 404 });
}