import clsx from 'clsx';
import type { CandidateStatus, RunStatus } from '@/lib/types';

const toneMap: Record<string, string> = {
  queued: 'text-proof border-proof',
  running: 'text-proof border-proof',
  done: 'text-verify border-verify',
  failed: 'text-fail border-fail',
  created: 'text-secondary border-border',
  executing: 'text-proof border-proof',
  complete: 'text-verify border-verify'
};

export default function StatusBadge({
  status,
  tone = 'auto'
}: {
  status: CandidateStatus | RunStatus;
  tone?: 'auto' | 'muted';
}) {
  return (
    <span
      className={clsx(
        'rounded-pill border px-2 py-0.5 text-xs uppercase tracking-wide',
        tone === 'muted' ? 'text-tertiary border-border' : toneMap[status]
      )}
    >
      {status}
    </span>
  );
}
