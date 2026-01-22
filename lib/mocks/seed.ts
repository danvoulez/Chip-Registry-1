import type { CandidateViewModel, CidStr, ReceiptExpanded, WorldSummary, ChipSummary } from '@/lib/types';

const makeCid = (seed: string): CidStr => `b3:${seed}` as CidStr;

export const worlds: WorldSummary[] = Array.from({ length: 6 }).map((_, i) => ({
  world_id: `world_${i + 1}`,
  title: `World ${i + 1}`,
  version: `v${1 + i}.0.0`,
  meta: { region: 'global' }
}));

export const chips: ChipSummary[] = Array.from({ length: 12 }).map((_, i) => ({
  chip_cid: makeCid(`chip${i + 1}`.padEnd(12, '0')),
  alias: `chip_${i + 1}`,
  owner_did: `did:example:owner${i + 1}`,
  meta: { category: 'core' }
}));

export const createCandidates: CandidateViewModel[] = [0, 1, 2, 3].map((index) => ({
  index: index as 0 | 1 | 2 | 3,
  status: 'idle',
  receipt_cid: null,
  failure_receipt_cid: null,
  receipt_viz_url: null,
  blurhash: null,
  metrics: {
    runtime_ms: null,
    peak_ram_mb: null,
    cost_credits: null
  },
  determinism_grade: null,
  progress_lines: [],
  artifacts_partial: null,
  last_event_cid: null
}));

export const receiptExpandedSeed = (receiptCid: CidStr, idx: 0 | 1 | 2 | 3): ReceiptExpanded => ({
  receipt_cid: receiptCid,
  run_id: `run_${idx}`,
  candidate_index: idx,
  chip_cid: makeCid(`chip${idx}`.padEnd(12, '0')),
  formula_cid: makeCid(`formula${idx}`.padEnd(12, '0')),
  world_id: `world_${idx + 1}`,
  world_manifest_cid: makeCid(`world${idx}`.padEnd(12, '0')),
  inputs_cid: makeCid(`inputs${idx}`.padEnd(12, '0')),
  outputs_cid: makeCid(`outputs${idx}`.padEnd(12, '0')),
  telemetry_cid: makeCid(`telemetry${idx}`.padEnd(12, '0')),
  proof_bundle_cid: makeCid(`proof${idx}`.padEnd(12, '0')),
  signature: null,
  determinism_grade: 'A',
  metrics: {
    runtime_ms: 3200 + idx * 180,
    peak_ram_mb: 512 + idx * 64,
    cost_credits: 42 + idx * 3,
    io_bytes: 1024 * 1024
  },
  artifacts: [
    {
      capsule_cid: makeCid(`capsule${idx}`.padEnd(12, '0')),
      name: 'artifact.png',
      mime: 'image/png',
      size_bytes: 2048,
      preview_url: null
    }
  ],
  lineage: {
    parent_receipt_cids: [],
    action: 'replay'
  }
});

export const exploreReceipts = Array.from({ length: 60 }).map((_, i) => ({
  receipt_cid: makeCid(`receipt${i}`.padEnd(16, '0')),
  receipt_viz_url: null,
  blurhash: null,
  chip_cid: makeCid(`chip${i}`.padEnd(12, '0')),
  world_id: `world_${(i % 6) + 1}`,
  determinism_grade: (['A', 'B', 'C'] as const)[i % 3],
  verified: i % 2 === 0,
  ts_ms: Date.now() - i * 3600 * 1000
}));
