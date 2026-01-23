import type { CandidateViewModel, RunEvent } from '@/lib/types';

export interface RunState {
  run_id: string | null;
  candidates: CandidateViewModel[];
  seen_event_cids: Set<string>;
}

export const applyRunEvent = (state: RunState, event: RunEvent): RunState => {
  if (state.seen_event_cids.has(event.event_cid)) return state;
  state.seen_event_cids.add(event.event_cid);

  if (state.run_id && event.run_id !== state.run_id) return state;

  if (!event.candidate_index && event.type.startsWith('candidate.')) return state;

  const updateCandidate = (index: number, updater: (candidate: CandidateViewModel) => void) => {
    const candidate = state.candidates[index];
    if (!candidate) return;
    updater(candidate);
    candidate.last_event_cid = event.event_cid;
  };

  if (event.type === 'run.queued') {
    state.candidates.forEach((candidate) => {
      if (candidate.status === 'idle') {
        candidate.status = 'queued';
      }
    });
  }

  if (event.type === 'candidate.started') {
    updateCandidate(event.candidate_index as number, (candidate) => {
      candidate.status = 'running';
      const message = (event.payload.message as string | undefined) ?? null;
      if (message) candidate.progress_lines.unshift(message);
      candidate.progress_lines = candidate.progress_lines.slice(0, 6);
    });
  }

  if (event.type === 'candidate.progress') {
    updateCandidate(event.candidate_index as number, (candidate) => {
      const message = (event.payload.message as string | undefined) ?? 'Working…';
      candidate.progress_lines.unshift(message);
      candidate.progress_lines = candidate.progress_lines.slice(0, 6);
    });
  }

  if (event.type === 'candidate.metric') {
    updateCandidate(event.candidate_index as number, (candidate) => {
      const payload = event.payload as {
        runtime_ms_so_far?: number;
        peak_ram_mb_so_far?: number;
        cost_credits_so_far?: number;
      };
      candidate.metrics.runtime_ms = payload.runtime_ms_so_far ?? candidate.metrics.runtime_ms;
      candidate.metrics.peak_ram_mb = payload.peak_ram_mb_so_far ?? candidate.metrics.peak_ram_mb;
      candidate.metrics.cost_credits =
        payload.cost_credits_so_far ?? candidate.metrics.cost_credits;
    });
  }

  if (event.type === 'candidate.artifact') {
    updateCandidate(event.candidate_index as number, (candidate) => {
      candidate.artifacts_partial = [...(candidate.artifacts_partial ?? []), event.payload];
    });
  }

  if (event.type === 'candidate.done') {
    updateCandidate(event.candidate_index as number, (candidate) => {
      const payload = event.payload as {
        receipt_cid: CandidateViewModel['receipt_cid'];
        receipt_viz_url: string | null;
        blurhash: string | null;
        determinism_grade: CandidateViewModel['determinism_grade'];
        metrics?: CandidateViewModel['metrics'];
      };
      candidate.status = 'done';
      candidate.receipt_cid = payload.receipt_cid;
      candidate.receipt_viz_url = payload.receipt_viz_url ?? null;
      candidate.blurhash = payload.blurhash ?? null;
      candidate.determinism_grade = payload.determinism_grade ?? null;
      candidate.metrics = payload.metrics ?? candidate.metrics;
    });
  }

  if (event.type === 'candidate.failed') {
    updateCandidate(event.candidate_index as number, (candidate) => {
      const payload = event.payload as {
        failure_receipt_cid?: CandidateViewModel['failure_receipt_cid'];
        message?: string;
      };
      candidate.status = 'failed';
      candidate.failure_receipt_cid = payload.failure_receipt_cid ?? null;
      if (payload.message) {
        candidate.progress_lines.unshift(payload.message);
        candidate.progress_lines = candidate.progress_lines.slice(0, 6);
      }
    });
  }

  return state;
};
