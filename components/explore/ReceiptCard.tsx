'use client';

import CidPill from '@/components/ui/CidPill';
import ReceiptViz from '@/components/ui/ReceiptViz';
import StatusBadge from '@/components/ui/StatusBadge';

export default function ReceiptCard({
  receipt_cid,
  viz_url,
  blurhash,
  badges,
  onOpen,
  onCompare,
  onReplay,
  onFavorite
}: {
  receipt_cid: string;
  viz_url: string | null;
  blurhash: string | null;
  badges: { verified?: boolean | null; grade?: string | null };
  onOpen: () => void;
  onCompare: () => void;
  onReplay: () => void;
  onFavorite: () => void;
}) {
  return (
    <div className="rounded-card border border-border bg-surface p-3 shadow-surface">
      <ReceiptViz src={viz_url} blurhash={blurhash} alt="Receipt preview" />
      <div className="mt-3 flex items-center justify-between">
        <CidPill label="Receipt" cid={receipt_cid as `b3:${string}`} />
        {badges.verified ? (
          <StatusBadge status="done" />
        ) : (
          <StatusBadge status="failed" tone="muted" />
        )}
      </div>
      <div className="mt-2 text-xs text-secondary">Grade {badges.grade ?? '—'}</div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={onOpen}
          className="rounded-button border border-border px-2 py-1"
        >
          Open
        </button>
        <button
          type="button"
          onClick={onCompare}
          className="rounded-button border border-border px-2 py-1"
        >
          Compare
        </button>
        <button
          type="button"
          onClick={onReplay}
          className="rounded-button border border-border px-2 py-1"
        >
          Replay
        </button>
        <button
          type="button"
          onClick={onFavorite}
          className="rounded-button border border-border px-2 py-1"
        >
          Favorite
        </button>
      </div>
    </div>
  );
}
