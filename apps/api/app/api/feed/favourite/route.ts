import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { z } from 'zod';

const bodySchema = z.object({
  userId: z.string().min(1),
  feedItemId: z.string().min(1),
  /** true = favourite, false = unfavourite */
  favourited: z.boolean(),
});

/**
 * POST /api/feed/favourite
 * Toggle favourite for a feed item (requires existing user + feed item in DB).
 */
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid body', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { userId, feedItemId, favourited } = parsed.data;

    if (favourited) {
      await prisma.feedFavourite.upsert({
        where: {
          userId_feedItemId: { userId, feedItemId },
        },
        create: { userId, feedItemId },
        update: {},
      });
      return NextResponse.json({ favourited: true });
    }

    await prisma.feedFavourite.deleteMany({
      where: { userId, feedItemId },
    });
    return NextResponse.json({ favourited: false });
  } catch (err) {
    console.error('[feed/favourite]', err);
    return NextResponse.json(
      { error: 'Could not update favourite' },
      { status: 500 },
    );
  }
}

/**
 * GET /api/feed/favourite?userId=...
 * List favourited feed item ids for a user.
 */
export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }

  try {
    const rows = await prisma.feedFavourite.findMany({
      where: { userId },
      select: { feedItemId: true },
    });
    return NextResponse.json({
      ids: rows.map((r) => r.feedItemId),
    });
  } catch {
    return NextResponse.json({ ids: [] });
  }
}