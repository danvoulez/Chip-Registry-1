import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    run_plan_cid: 'b3:plan0000000001',
    plan_doc: { cid: 'b3:plan0000000001' },
    quote: null,
    expected_runtime_ms: 4200,
    gate: {
      allowed: true,
      reason: null,
      decision_cid: null
    }
  });
}
