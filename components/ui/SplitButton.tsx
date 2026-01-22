'use client';

import { useState } from 'react';

export default function SplitButton({
  label,
  options,
  onSelect
}: {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex">
      <button
        type="button"
        className="rounded-l-button border border-border bg-surface px-3 py-2 text-xs"
        onClick={() => onSelect(options[0])}
      >
        {label}
      </button>
      <button
        type="button"
        className="rounded-r-button border border-border bg-surface px-2 text-xs"
        onClick={() => setOpen((prev) => !prev)}
      >
        ▾
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-10 mt-2 min-w-[140px] rounded-panel border border-border bg-surface p-2 text-xs shadow-surface">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className="block w-full rounded-md px-2 py-1 text-left hover:bg-surface-hover"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
