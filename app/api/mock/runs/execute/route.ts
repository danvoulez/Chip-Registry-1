import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    run_id: `run_${Math.floor(Math.random() * 1000)}`,
    status: 'queued',
    receipt_cid: null,
    trace_id: null
  });
}
