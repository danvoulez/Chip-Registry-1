import type { CidStr, RunEvent } from '@/lib/types';

const makeCid = (seed: string): CidStr => `b3:${seed}` as CidStr;

export const buildMockRunEvents = (runId: string): RunEvent[] => {
  const now = Date.now();
  const events: RunEvent[] = [];

  events.push({
    event_cid: makeCid(`event-queued-${runId}`),
    ts_ms: now,
    run_id: runId,
    candidate_index: null,
    type: 'run.queued',
    payload: { queue_position: 2 }
  });

  for (let i = 0; i < 4; i += 1) {
    const candidateIndex = i as 0 | 1 | 2 | 3;
    events.push({
      event_cid: makeCid(`event-start-${runId}-${i}`),
      ts_ms: now + i * 250,
      run_id: runId,
      candidate_index: candidateIndex,
      type: 'candidate.started',
      payload: { message: 'Starting candidate' }
    });

    ['Initializing runtime…', 'Executing chip…', 'Collecting outputs…'].forEach((text, idx) => {
      events.push({
        event_cid: makeCid(`event-progress-${runId}-${i}-${idx}`),
        ts_ms: now + i * 250 + idx * 500,
        run_id: runId,
        candidate_index: candidateIndex,
        type: 'candidate.progress',
        payload: { message: text, ratio: (idx + 1) / 3 }
      });
    });

    events.push({
      event_cid: makeCid(`event-metric-${runId}-${i}`),
      ts_ms: now + i * 250 + 1200,
      run_id: runId,
      candidate_index: candidateIndex,
      type: 'candidate.metric',
      payload: {
        runtime_ms_so_far: 3200 + i * 120,
        peak_ram_mb_so_far: 512 + i * 64,
        cost_credits_so_far: 40 + i * 5
      }
    });

    events.push({
      event_cid: makeCid(`event-done-${runId}-${i}`),
      ts_ms: now + 3500 + i * 300,
      run_id: runId,
      candidate_index: candidateIndex,
      type: 'candidate.done',
      payload: {
        receipt_cid: makeCid(`receipt-${runId}-${i}`),
        receipt_viz_url: null,
        blurhash: null,
        determinism_grade: 'A',
        metrics: {
          runtime_ms: 3200 + i * 120,
          peak_ram_mb: 512 + i * 64,
          cost_credits: 40 + i * 5
        }
      }
    });
  }

  events.push({
    event_cid: makeCid(`event-run-done-${runId}`),
    ts_ms: now + 6000,
    run_id: runId,
    candidate_index: null,
    type: 'run.done',
    payload: { message: 'Run complete' }
  });

  return events;
};
