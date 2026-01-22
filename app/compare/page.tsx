'use client';

import { useCompareStore } from '@/stores/compareStore';
import { useReceipt } from '@/hooks/useReceipt';
import MetricDeltasTable from '@/components/compare/MetricDeltasTable';
import OutputDiff from '@/components/compare/OutputDiff';

export default function ComparePage() {
  const selected = useCompareStore((state) => state.selected_receipt_cids);
  const leftCid = selected[0];
  const rightCid = selected[1];

  const left = useReceipt(leftCid ?? '');
  const right = useReceipt(rightCid ?? '');

  if (!leftCid || !rightCid) {
    return <div className="text-sm text-secondary">Select two receipts to compare.</div>;
  }

  if (!left.data?.receipt_expanded || !right.data?.receipt_expanded) {
    return <div className="text-sm text-secondary">Loading receipts...</div>;
  }

  return (
    <div className="space-y-6">
      <MetricDeltasTable left={left.data.receipt_expanded} right={right.data.receipt_expanded} />
      <OutputDiff left={left.data.receipt_expanded} right={right.data.receipt_expanded} mode="side_by_side" />
    </div>
  );
}
