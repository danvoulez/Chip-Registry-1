'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api/client';
import { useRunStore } from '@/stores/runStore';
import CidPill from '@/components/ui/CidPill';

interface PlanResponse {
  run_plan_cid: string;
  plan_doc: { cid: string } | null;
  gate: {
    allowed: boolean;
    reason: string | null;
    decision_cid: string | null;
  };
}

interface ExecuteResponse {
  run_id: string;
}

export default function Omnibox() {
  const [chipRef, setChipRef] = useState('chip_alpha');
  const [formulaRef, setFormulaRef] = useState('formula_v1');
  const [worldId, setWorldId] = useState('world_1');
  const [mode, setMode] = useState<'fast' | 'relax'>('fast');
  const [theme, setTheme] = useState('');
  const [gateDenied, setGateDenied] = useState<PlanResponse['gate'] | null>(null);

  const runPlanCid = useRunStore((state) => state.run_plan_cid);
  const setPlannedRun = useRunStore((state) => state.setPlannedRun);
  const setExecutingRun = useRunStore((state) => state.setExecutingRun);

  const canRun = chipRef && formulaRef && worldId;

  const handlePlan = async () => {
    const response = await apiFetch<PlanResponse>('/api/mock/runs/plan', {
      method: 'POST',
      body: JSON.stringify({ chip_ref: chipRef, formula_ref: formulaRef, world_id: worldId, mode, theme })
    });
    setGateDenied(response.gate.allowed ? null : response.gate);
    setPlannedRun(response.run_plan_cid);
  };

  const handleExecute = async () => {
    if (!runPlanCid) return;
    const response = await apiFetch<ExecuteResponse>('/api/mock/runs/execute', {
      method: 'POST',
      body: JSON.stringify({ run_plan_cid: runPlanCid })
    });
    setExecutingRun(response.run_id);
  };

  return (
    <div className="rounded-panel border border-border bg-surface p-4 shadow-surface">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs text-secondary">
          Chip
          <input
            value={chipRef}
            onChange={(event) => setChipRef(event.target.value)}
            className="rounded-button border border-border bg-transparent px-3 py-2 text-sm text-primary"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs text-secondary">
          Formula
          <input
            value={formulaRef}
            onChange={(event) => setFormulaRef(event.target.value)}
            className="rounded-button border border-border bg-transparent px-3 py-2 text-sm text-primary"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs text-secondary">
          World
          <input
            value={worldId}
            onChange={(event) => setWorldId(event.target.value)}
            className="rounded-button border border-border bg-transparent px-3 py-2 text-sm text-primary"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs text-secondary">
          Theme
          <input
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            className="rounded-button border border-border bg-transparent px-3 py-2 text-sm text-primary"
          />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
        <button
          type="button"
          disabled={!canRun}
          onClick={handlePlan}
          className="rounded-button border border-border bg-surface-hover px-3 py-2 text-xs text-primary disabled:opacity-50"
        >
          Plan
        </button>
        <button
          type="button"
          disabled={!runPlanCid || Boolean(gateDenied)}
          onClick={handleExecute}
          className="rounded-button border border-proof bg-proof/20 px-3 py-2 text-xs text-proof disabled:opacity-50"
        >
          Execute
        </button>
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value as 'fast' | 'relax')}
          className="rounded-button border border-border bg-transparent px-3 py-2 text-xs text-secondary"
        >
          <option value="fast">Fast</option>
          <option value="relax">Relax</option>
        </select>
      </div>
      {runPlanCid ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <CidPill label="Plan" cid={runPlanCid as `b3:${string}`} />
        </div>
      ) : null}
      {gateDenied ? (
        <div className="mt-4 rounded-card border border-warn bg-warn/10 p-3 text-xs text-warn">
          Gate denied: {gateDenied.reason}
          {gateDenied.decision_cid ? (
            <div className="mt-2">
              <CidPill label="Decision" cid={gateDenied.decision_cid as `b3:${string}`} variant="warn" />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
