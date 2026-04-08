import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tenders = await prisma.tender.findMany({
      orderBy: { deadline: 'asc' },
    });
    return NextResponse.json(tenders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tenders' }, { status: 500 });
  }
}
