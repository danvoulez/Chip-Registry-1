'use client';

import clsx from 'clsx';
import Tooltip from '@/components/ui/Tooltip';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { abbreviateCid } from '@/lib/utils/cid';
import type { CidStr } from '@/lib/types';
import { useToastStore } from '@/components/ui/Toast';

const toneStyles: Record<string, string> = {
  proof: 'border-proof text-proof',
  verify: 'border-verify text-verify',
  warn: 'border-warn text-warn',
  fail: 'border-fail text-fail'
};

export default function CidPill({
  label,
  cid,
  abbr_chars = 7,
  variant = 'proof',
  copy = true
}: {
  label: string;
  cid: CidStr;
  abbr_chars?: number;
  variant?: 'proof' | 'verify' | 'warn' | 'fail';
  copy?: boolean;
}) {
  const { copy: copyToClipboard } = useCopyToClipboard();
  const toast = useToastStore((state) => state.show);
  const shortCid = abbreviateCid(cid, abbr_chars);

  const handleCopy = async () => {
    if (!copy) return;
    const ok = await copyToClipboard(cid);
    toast(ok ? 'Copied!' : 'Copy failed');
  };

  return (
    <Tooltip label={cid}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`${label} ${cid}`}
        className={clsx(
          'flex items-center gap-2 rounded-pill border px-3 py-1 text-xs font-mono',
          'bg-[rgba(59,130,246,0.10)]',
          toneStyles[variant]
        )}
      >
        <span className="text-secondary">{label}</span>
        <span>{shortCid}</span>
      </button>
    </Tooltip>
  );
}
