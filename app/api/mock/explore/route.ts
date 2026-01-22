import { NextResponse } from 'next/server';
import { exploreReceipts } from '@/lib/mocks/seed';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursorParam = searchParams.get('cursor');
  const limit = 20;
  const start = cursorParam ? Number(cursorParam) : 0;
  const slice = exploreReceipts.slice(start, start + limit);
  const next_cursor = start + limit < exploreReceipts.length ? String(start + limit) : null;

  return NextResponse.json({
    items: slice,
    next_cursor
  });
}
