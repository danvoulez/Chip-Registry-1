export type CidStr = `b3:${string}`;
export type DidStr = `did:${string}`;
export type RunId = string;
export type WorldId = string;
export type AliasStr = string;
export type TraceId = string;

export interface CanonDoc {
  cid: CidStr;
  canon_bytes_b64: string;
  mime?: string;
}

export type ApiErrorCode =
  | 'CHIP_NOT_FOUND'
  | 'FORMULA_INVALID'
  | 'WORLD_UNAVAILABLE'
  | 'POLICY_DENIED'
  | 'BUDGET_EXCEEDED'
  | 'EXEC_TIMEOUT'
  | 'EXEC_CRASH'
  | 'RECEIPT_VERIFY_FAIL'
  | 'UNKNOWN';

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  trace_id: TraceId;
  receipt_cid: CidStr | null;
  details?: Record<string, unknown> | null;
}

export interface WorldSummary {
  world_id: WorldId;
  title: string;
  version: string;
  meta: Record<string, string>;
}

export interface ChipSummary {
  chip_cid: CidStr;
  alias: AliasStr | null;
  owner_did: DidStr | null;
  meta: Record<string, string>;
}

export interface ReceiptVizMeta {
  url: string | null;
  blurhash: string | null;
}

export type DeterminismGrade = 'A' | 'B' | 'C';

export interface ReceiptExpanded {
  receipt_cid: CidStr;
  run_id: RunId;
  candidate_index: 0 | 1 | 2 | 3;
  chip_cid: CidStr;
  formula_cid: CidStr;
  world_id: WorldId;
  world_manifest_cid: CidStr;
  inputs_cid: CidStr;
  outputs_cid: CidStr;
  telemetry_cid: CidStr;
  proof_bundle_cid: CidStr | null;
  signature: Record<string, unknown> | null;
  determinism_grade: DeterminismGrade;
  metrics: {
    runtime_ms: number;
    peak_ram_mb: number;
    cost_credits: number;
    io_bytes: number | null;
  };
  artifacts: Array<{
    capsule_cid: CidStr;
    name: string;
    mime: string;
    size_bytes: number;
    preview_url: string | null;
  }>;
  lineage: {
    parent_receipt_cids: CidStr[];
    action: 'vary' | 'remix' | 'battle' | 'replay' | 'mint' | 'unknown';
  };
}

export type CandidateStatus = 'idle' | 'queued' | 'running' | 'done' | 'failed';
export type RunStatus = 'created' | 'executing' | 'complete' | 'failed';

export interface RunEvent {
  event_cid: CidStr;
  ts_ms: number;
  run_id: RunId;
  candidate_index: 0 | 1 | 2 | 3 | null;
  type:
    | 'run.queued'
    | 'run.started'
    | 'candidate.started'
    | 'candidate.progress'
    | 'candidate.metric'
    | 'candidate.artifact'
    | 'candidate.done'
    | 'candidate.failed'
    | 'run.done';
  payload: Record<string, unknown>;
}

export interface CandidateViewModel {
  index: 0 | 1 | 2 | 3;
  status: CandidateStatus;
  receipt_cid: CidStr | null;
  failure_receipt_cid: CidStr | null;
  receipt_viz_url: string | null;
  blurhash: string | null;
  metrics: {
    runtime_ms: number | null;
    peak_ram_mb: number | null;
    cost_credits: number | null;
  };
  determinism_grade: DeterminismGrade | null;
  progress_lines: string[];
  artifacts_partial: Array<Record<string, unknown>> | null;
  last_event_cid: CidStr | null;
}
