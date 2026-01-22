'use client';

import { create } from 'zustand';
import { useEffect } from 'react';

interface ToastState {
  message: string | null;
  show: (message: string) => void;
  clear: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  show: (message) => set({ message }),
  clear: () => set({ message: null })
}));

export default function Toast() {
  const message = useToastStore((state) => state.message);
  const clear = useToastStore((state) => state.clear);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => clear(), 2200);
    return () => clearTimeout(timer);
  }, [message, clear]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 rounded-button border border-border bg-surface px-4 py-2 text-sm shadow-surface">
      <span aria-live="polite">{message}</span>
    </div>
  );
}
