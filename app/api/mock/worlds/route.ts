import { NextResponse } from 'next/server';
import { worlds } from '@/lib/mocks/seed';

export async function GET() {
  return NextResponse.json({
    worlds
  });
}
