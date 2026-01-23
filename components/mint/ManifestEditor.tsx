'use client';

import CidPill from '@/components/ui/CidPill';

export default function ManifestEditor({
  chip_manifest,
  formula_manifest,
  readonly_cids,
  onChange,
  onValidate
}: {
  chip_manifest: Record<string, unknown>;
  formula_manifest: Record<string, unknown>;
  readonly_cids: string[];
  onChange: (next: { chip: Record<string, unknown>; formula: Record<string, unknown> }) => void;
  onValidate: () => void;
}) {
  return (
    <div className="rounded-panel border border-border bg-surface p-4">
      <div className="flex flex-wrap gap-2">
        {readonly_cids.map((cid) => (
          <CidPill key={cid} label="CID" cid={cid as `b3:${string}`} />
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <textarea
          value={JSON.stringify(chip_manifest, null, 2)}
          onChange={(event) =>
            onChange({ chip: JSON.parse(event.target.value || '{}'), formula: formula_manifest })
          }
          className="min-h-[180px] rounded-card border border-border bg-transparent p-3 font-mono text-xs text-secondary"
        />
        <textarea
          value={JSON.stringify(formula_manifest, null, 2)}
          onChange={(event) =>
            onChange({ chip: chip_manifest, formula: JSON.parse(event.target.value || '{}') })
          }
          className="min-h-[180px] rounded-card border border-border bg-transparent p-3 font-mono text-xs text-secondary"
        />
      </div>
      <div className="mt-4 text-xs">
        <button
          type="button"
          onClick={onValidate}
          className="rounded-button border border-proof px-3 py-2 text-proof"
        >
          Validate
        </button>
      </div>
    </div>
  );
}
