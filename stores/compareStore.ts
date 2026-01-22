import { create } from 'zustand';
import type { CidStr } from '@/lib/types';

interface CompareState {
  selected_receipt_cids: CidStr[];
  max_selected: number;
  toggle: (cid: CidStr) => void;
  clear: () => void;
  setPrimaryPair: (left: CidStr, right: CidStr) => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  selected_receipt_cids: [],
  max_selected: 4,
  toggle: (cid) =>
    set((state) => {
      const exists = state.selected_receipt_cids.includes(cid);
      if (exists) {
        return { selected_receipt_cids: state.selected_receipt_cids.filter((item) => item !== cid) };
      }
      if (state.selected_receipt_cids.length >= state.max_selected) return state;
      return { selected_receipt_cids: [...state.selected_receipt_cids, cid] };
    }),
  clear: () => set({ selected_receipt_cids: [] }),
  setPrimaryPair: (left, right) => set({ selected_receipt_cids: [left, right] })
}));
