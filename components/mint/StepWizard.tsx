'use client';

import clsx from 'clsx';

export default function StepWizard({
  steps,
  active_index,
  onNext,
  onBack
}: {
  steps: string[];
  active_index: number;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="rounded-panel border border-border bg-surface p-4">
      <div className="flex flex-wrap gap-2 text-xs">
        {steps.map((step, index) => (
          <span
            key={step}
            className={clsx(
              'rounded-pill border px-3 py-1',
              index === active_index ? 'border-proof text-proof' : 'border-border text-secondary'
            )}
          >
            {step}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-2 text-xs">
        <button type="button" onClick={onBack} className="rounded-button border border-border px-3 py-2">
          Back
        </button>
        <button type="button" onClick={onNext} className="rounded-button border border-proof px-3 py-2 text-proof">
          Next
        </button>
      </div>
    </div>
  );
}
