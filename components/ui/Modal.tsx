'use client';

import { ReactNode } from 'react';

export default function Modal({
  open,
  title,
  children,
  onClose
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-panel border border-border bg-surface p-6 shadow-surface">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{title}</h3>
          <button type="button" onClick={onClose} className="text-xs text-secondary">
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
