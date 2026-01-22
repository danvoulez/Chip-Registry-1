import { NextResponse } from 'next/server';
import { receiptExpandedSeed } from '@/lib/mocks/seed';

export async function GET(request: Request, { params }: { params: { receiptCid: string } }) {
  const receiptCid = params.receiptCid as `b3:${string}`;
  const receiptExpanded = receiptExpandedSeed(receiptCid, 0);

  return NextResponse.json({
    receipt: {
      cid: receiptCid,
      canon_bytes_b64: 'e30=',
      mime: 'application/json'
    },
    receipt_expanded: receiptExpanded,
    receipt_viz: {
      url: null,
      blurhash: null
    }
  });
}
