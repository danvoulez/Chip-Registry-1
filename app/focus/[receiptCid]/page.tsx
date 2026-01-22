'use client';

import { useState } from 'react';
import { useReceipt } from '@/hooks/useReceipt';
import ReceiptViz from '@/components/ui/ReceiptViz';
import MetricsStrip from '@/components/ui/MetricsStrip';
import CidPill from '@/components/ui/CidPill';
import InspectorDrawer from '@/components/layout/InspectorDrawer';
import { formatMs } from '@/lib/utils/time';
import { formatNumber } from '@/lib/utils/format';

export default function FocusPage({ params }: { params: { receiptCid: string } }) {
  const { data } = useReceipt(params.receiptCid);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Receipt');

  const receipt = data?.receipt_expanded;

  if (!receipt) {
    return <div className="text-sm text-secondary">Loading receipt…</div>;
  }

  return (
    <div className="space-y-6">
      <ReceiptViz src={data?.receipt_viz?.url ?? null} blurhash={data?.receipt_viz?.blurhash ?? null} alt="Receipt" />
      <div className="flex flex-wrap gap-2">
        <CidPill label="Chip" cid={receipt.chip_cid} />
        <CidPill label="Formula" cid={receipt.formula_cid} />
        <CidPill label="World" cid={receipt.world_manifest_cid} />
        <CidPill label="Inputs" cid={receipt.inputs_cid} />
        <CidPill label="Outputs" cid={receipt.outputs_cid} />
        <CidPill label="Telemetry" cid={receipt.telemetry_cid} />
        <CidPill label="Receipt" cid={receipt.receipt_cid} />
        {receipt.proof_bundle_cid ? <CidPill label="Proof" cid={receipt.proof_bundle_cid} /> : null}
      </div>
      <MetricsStrip
        items={[
          { label: 'Runtime', value: formatMs(receipt.metrics.runtime_ms), emphasis: true },
          { label: 'Peak RAM', value: `${formatNumber(receipt.metrics.peak_ram_mb)} MB` },
          { label: 'Cost', value: `${formatNumber(receipt.metrics.cost_credits)} credits` }
        ]}
      />
      <div className="rounded-panel border border-border bg-surface p-4 text-xs text-secondary">
        Outputs panel placeholder. Logs panel placeholder.
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="rounded-button border border-border px-3 py-2"
        >
          Open Inspector
        </button>
        <button type="button" className="rounded-button border border-border px-3 py-2">
          Verify Now
        </button>
      </div>
      <InspectorDrawer
        open={drawerOpen}
        tabs={['Receipt', 'Telemetry', 'Proof Bundle', 'Lineage', 'Errors']}
        active_tab={activeTab}
        onClose={() => setDrawerOpen(false)}
        onTab={setActiveTab}
      >
        <div>Active tab: {activeTab}</div>
      </InspectorDrawer>
    </div>
  );
}
