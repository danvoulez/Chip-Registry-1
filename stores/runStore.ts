import { create } from 'zustand';
import type { CandidateViewModel, RunEvent } from '@/lib/types';
import { applyRunEvent } from '@/lib/reducers/runReducer';
import { createCandidates } from '@/lib/mocks/seed';

interface RunStoreState {
  run_id: string | null;
  run_plan_cid: string | null;
  selected_candidate_index: 0 | 1 | 2 | 3 | null;
  candidates: CandidateViewModel[];
  seen_event_cids: Set<string>;
  resetForNewRun: () => void;
  setPlannedRun: (cid: string) => void;
  setExecutingRun: (runId: string) => void;
  selectCandidate: (index: 0 | 1 | 2 | 3 | null) => void;
  applyEvent: (event: RunEvent) => void;
}

export const useRunStore = create<RunStoreState>((set, get) => ({
  run_id: null,
  run_plan_cid: null,
  selected_candidate_index: null,
  candidates: createCandidates,
  seen_event_cids: new Set(),
  resetForNewRun: () =>
    set({
      run_id: null,
      run_plan_cid: null,
      selected_candidate_index: null,
      candidates: createCandidates.map((candidate) => ({ ...candidate })),
      seen_event_cids: new Set()
    }),
  setPlannedRun: (cid) => set({ run_plan_cid: cid }),
  setExecutingRun: (runId) => set({ run_id: runId }),
  selectCandidate: (index) => set({ selected_candidate_index: index }),
  applyEvent: (event) =>
    set((state) => {
      const nextState = applyRunEvent(
        {
          run_id: state.run_id,
          candidates: [...state.candidates],
          seen_event_cids: new Set(state.seen_event_cids)
        },
        event
      );
      return {
        candidates: nextState.candidates,
        seen_event_cids: nextState.seen_event_cids
      };
    })
}));
