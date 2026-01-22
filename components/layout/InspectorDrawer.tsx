'use client';

import clsx from 'clsx';

export default function InspectorDrawer({
  open,
  tabs,
  active_tab,
  onClose,
  onTab,
  children
}: {
  open: boolean;
  tabs: string[];
  active_tab: string;
  onClose: () => void;
  onTab: (tab: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <aside
      className={clsx(
        'fixed right-0 top-0 z-40 h-full w-96 border-l border-border bg-surface p-4 transition-transform',
        open ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Inspector</h3>
        <button type="button" onClick={onClose} className="text-xs text-secondary">
          Close
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTab(tab)}
            className={clsx(
              'rounded-pill border px-3 py-1 text-xs',
              tab === active_tab ? 'border-proof text-proof' : 'border-border text-secondary'
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 text-xs text-secondary">{children}</div>
    </aside>
  );
}
