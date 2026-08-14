import { prisma } from '@/lib/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        styleDNA: true,
        feedPreferences: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('User preferences GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user preferences' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { styleDNA, feedPreferences } = body;

    // Validate if provided
    if (styleDNA && typeof styleDNA === 'string') {
      JSON.parse(styleDNA); // Ensure valid JSON
    }
    if (feedPreferences && typeof feedPreferences === 'string') {
      JSON.parse(feedPreferences); // Ensure valid JSON
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(styleDNA !== undefined && { styleDNA }),
        ...(feedPreferences !== undefined && { feedPreferences }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        styleDNA: true,
        feedPreferences: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('User preferences PATCH error:', error);
    return NextResponse.json(
      { error: 'Failed to update user preferences' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { styleDNA, feedPreferences } = body;

    if (!styleDNA && !feedPreferences) {
      return NextResponse.json(
        { error: 'At least one field is required' },
        { status: 400 }
      );
    }

    // Validate if provided
    if (styleDNA && typeof styleDNA === 'string') {
      JSON.parse(styleDNA);
    }
    if (feedPreferences && typeof feedPreferences === 'string') {
      JSON.parse(feedPreferences);
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(styleDNA !== undefined && { styleDNA }),
        ...(feedPreferences !== undefined && { feedPreferences }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        styleDNA: true,
        feedPreferences: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('User preferences PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update user preferences' },
      { status: 500 }
    );
  }
}
