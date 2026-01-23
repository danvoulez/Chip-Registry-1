'use client';

import { useCompareStore } from '@/stores/compareStore';
import { useReceipt } from '@/hooks/useReceipt';
import MetricDeltasTable from '@/components/compare/MetricDeltasTable';
import OutputDiff from '@/components/compare/OutputDiff';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useToastStore } from '@/components/ui/Toast';

export default function ComparePage() {
  const selected = useCompareStore((state) => state.selected_receipt_cids);
  const leftCid = selected[0];
  const rightCid = selected[1];
  const { copy: copyToClipboard } = useCopyToClipboard();
  const toast = useToastStore((state) => state.show);

  const left = useReceipt(leftCid ?? '');
  const right = useReceipt(rightCid ?? '');

  const handleCopyPermalink = async () => {
    if (!leftCid || !rightCid) return;
    const url = `${window.location.origin}/compare?left=${encodeURIComponent(leftCid)}&right=${encodeURIComponent(rightCid)}`;
    const ok = await copyToClipboard(url);
    toast(ok ? 'Comparison link copied!' : 'Copy failed');
  };

  if (!leftCid || !rightCid) {
    return <div className="text-sm text-secondary">Select two receipts to compare.</div>;
  }

  if (!left.data?.receipt_expanded || !right.data?.receipt_expanded) {
    return <div className="text-sm text-secondary">Loading receipts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">Compare Receipts</h1>
        <button
          type="button"
          onClick={handleCopyPermalink}
          className="rounded-button border border-border bg-surface-hover px-4 py-2 text-xs text-primary"
          aria-label="Copy shareable comparison link"
        >
          Copy Link
        </button>
      </div>
      <MetricDeltasTable left={left.data.receipt_expanded} right={right.data.receipt_expanded} />
      <OutputDiff
        left={left.data.receipt_expanded}
        right={right.data.receipt_expanded}
        mode="side_by_side"
      />
    </div>
  );
}
