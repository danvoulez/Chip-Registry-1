'use client';

import StatusBadge from '@/components/ui/StatusBadge';
import ReceiptViz from '@/components/ui/ReceiptViz';
import MetricsStrip from '@/components/ui/MetricsStrip';
import CidPill from '@/components/ui/CidPill';
import SplitButton from '@/components/ui/SplitButton';
import type { CandidateViewModel } from '@/lib/types';
import { formatMs } from '@/lib/utils/time';
import { formatNumber } from '@/lib/utils/format';

export default function CandidateCard({
  candidate,
  onOpenReceipt,
  onToggleCompare,
  onVary
}: {
  candidate: CandidateViewModel;
  onOpenReceipt: (receiptCid: string) => void;
  onToggleCompare: (receiptCid: string) => void;
  onVary: (receiptCid: string, strength: string) => void;
}) {
  return (
    <div className="rounded-card border border-border bg-surface p-4 shadow-surface">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Candidate {candidate.index + 1}</h3>
        <StatusBadge status={candidate.status} />
      </div>
      <div className="mt-3">
        <ReceiptViz
          src={candidate.receipt_viz_url}
          blurhash={candidate.blurhash}
          alt={`Receipt ${candidate.index}`}
        />
      </div>
      <div className="mt-3">
        <MetricsStrip
          layout="grid"
          items={[
            { label: 'Runtime', value: formatMs(candidate.metrics.runtime_ms ?? 0) },
            { label: 'Peak RAM', value: `${formatNumber(candidate.metrics.peak_ram_mb)} MB` },
            { label: 'Cost', value: `${formatNumber(candidate.metrics.cost_credits)} credits` }
          ]}
        />
      </div>
      {candidate.receipt_cid ? (
        <div className="mt-3">
          <CidPill label="Receipt" cid={candidate.receipt_cid} />
        </div>
      ) : null}
      {candidate.status === 'done' && candidate.receipt_cid ? (
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => onOpenReceipt(candidate.receipt_cid as string)}
            className="rounded-button border border-border bg-surface-hover px-3 py-2"
          >
            View Receipt
          </button>
          <button
            type="button"
            onClick={() => onToggleCompare(candidate.receipt_cid as string)}
            className="rounded-button border border-border bg-surface-hover px-3 py-2"
          >
            Compare
          </button>
          <SplitButton
            label="Vary"
            options={['subtle', 'strong']}
            onSelect={(strength) => onVary(candidate.receipt_cid as string, strength)}
          />
        </div>
      ) : null}
      {candidate.progress_lines.length > 0 ? (
        <div className="mt-3 space-y-1 text-xs text-secondary">
          {candidate.progress_lines.slice(0, 3).map((line, index) => (
            <div key={`${line}-${index}`}>• {line}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
