import { prisma } from '@/lib/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, feedItemId, action } = body;

    if (!userId || !feedItemId || !['add', 'remove'].includes(action)) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    if (action === 'add') {
      // Create or ignore if already exists (due to unique constraint)
      const favourite = await prisma.feedFavourite.upsert({
        where: {
          userId_feedItemId: {
            userId,
            feedItemId,
          },
        },
        update: {},
        create: {
          userId,
          feedItemId,
        },
      });

      return NextResponse.json(favourite, { status: 201 });
    } else if (action === 'remove') {
      await prisma.feedFavourite.deleteMany({
        where: {
          userId,
          feedItemId,
        },
      });

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Feed favourite POST error:', error);
    return NextResponse.json(
      { error: 'Failed to update favourite' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const favourites = await prisma.feedFavourite.findMany({
      where: { userId },
      include: {
        feedItem: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      count: favourites.length,
      items: favourites.map((fav) => fav.feedItem),
    });
  } catch (error) {
    console.error('Feed favourite GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch favourites' },
      { status: 500 }
    );
  }
}
