import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma/client';
import {
  parseFeedPreferences,
  mergeFeedPreferences,
  type FeedPreferences,
} from '@/lib/feed/ranking';

const prefsSchema = z
  .object({
    boostTypes: z.array(z.string()).optional(),
    muteTypes: z.array(z.string()).optional(),
    hideTypes: z.array(z.string()).optional(),
    boostTags: z.array(z.string()).optional(),
    muteTags: z.array(z.string()).optional(),
    boostCities: z.array(z.string()).optional(),
    muteCities: z.array(z.string()).optional(),
    personalisationWeight: z.number().min(0).max(1).optional(),
    boostStrength: z.number().min(0).max(0.5).optional(),
    muteStrength: z.number().min(0).max(0.5).optional(),
  })
  .strict();

/**
 * GET /api/users/:id/preferences
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, feedPreferences: true, styleDNA: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      userId: user.id,
      preferences: parseFeedPreferences(user.feedPreferences) ?? {},
      styleDNA: user.styleDNA ? JSON.parse(user.styleDNA) : null,
    });
  } catch (err) {
    console.error('[preferences GET]', err);
    return NextResponse.json(
      { error: 'Could not load preferences' },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/users/:id/preferences — merge
 */
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const body = await request.json();
    const parsed = prefsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid preferences', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { feedPreferences: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const current = parseFeedPreferences(user.feedPreferences);
    const merged = mergeFeedPreferences(
      current,
      parsed.data as Partial<FeedPreferences>,
    );

    const updated = await prisma.user.update({
      where: { id },
      data: { feedPreferences: JSON.stringify(merged) },
      select: { id: true, feedPreferences: true },
    });

    return NextResponse.json({
      userId: updated.id,
      preferences: parseFeedPreferences(updated.feedPreferences) ?? {},
    });
  } catch (err) {
    console.error('[preferences PATCH]', err);
    return NextResponse.json(
      { error: 'Could not update preferences' },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/users/:id/preferences — replace
 */
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const body = await request.json();
    const parsed = prefsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid preferences', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { feedPreferences: JSON.stringify(parsed.data) },
      select: { id: true, feedPreferences: true },
    });

    return NextResponse.json({
      userId: updated.id,
      preferences: parseFeedPreferences(updated.feedPreferences) ?? {},
    });
  } catch (err) {
    console.error('[preferences PUT]', err);
    return NextResponse.json(
      { error: 'Could not replace preferences' },
      { status: 500 },
    );
  }
}