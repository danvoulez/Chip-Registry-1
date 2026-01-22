import { create } from 'zustand';
import type { CanonDoc, CidStr } from '@/lib/types';

interface WorkbenchState {
  ctx_presets: CanonDoc[];
  knob_presets: CanonDoc[];
  artifact_refs: CidStr[];
  pinned_receipts: CidStr[];
  addCtxPreset: (doc: CanonDoc) => void;
  addKnobPreset: (doc: CanonDoc) => void;
  pinReceipt: (cid: CidStr) => void;
  unpinReceipt: (cid: CidStr) => void;
}

export const useWorkbenchStore = create<WorkbenchState>((set) => ({
  ctx_presets: [],
  knob_presets: [],
  artifact_refs: [],
  pinned_receipts: [],
  addCtxPreset: (doc) => set((state) => ({ ctx_presets: [...state.ctx_presets, doc] })),
  addKnobPreset: (doc) => set((state) => ({ knob_presets: [...state.knob_presets, doc] })),
  pinReceipt: (cid) => set((state) => ({ pinned_receipts: [...state.pinned_receipts, cid] })),
  unpinReceipt: (cid) =>
    set((state) => ({ pinned_receipts: state.pinned_receipts.filter((item) => item !== cid) }))
}));
