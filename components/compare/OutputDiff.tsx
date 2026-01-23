'use client';

import { useState } from 'react';
import type { ReceiptExpanded } from '@/lib/types';

export default function OutputDiff({
  left,
  right,
  mode
}: {
  left: ReceiptExpanded;
  right: ReceiptExpanded;
  mode: string;
}) {
  const [activeMode, setActiveMode] = useState(mode);
  return (
    <div className="rounded-panel border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Output Diff</h3>
        <div className="flex gap-2 text-xs">
          {['side_by_side', 'slider', 'blink'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveMode(item)}
              className="rounded-button border border-border px-2 py-1"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 text-xs text-secondary">
        Mode: {activeMode}. Left outputs CID {left.outputs_cid}. Right outputs CID{' '}
        {right.outputs_cid}.
      </div>
    </div>
  );
}
