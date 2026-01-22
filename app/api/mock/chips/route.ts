import { NextResponse } from 'next/server';
import { chips } from '@/lib/mocks/seed';

export async function GET() {
  return NextResponse.json({
    chips
  });
}
