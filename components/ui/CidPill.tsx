'use client';

import { useState, useRef, useEffect } from 'react';
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
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (!copy) return;
    const ok = await copyToClipboard(cid);
    toast(ok ? 'Copied full CID!' : 'Copy failed');
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (!copy) return;
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const handleCopyFull = async () => {
    const ok = await copyToClipboard(cid);
    toast(ok ? 'Copied full CID!' : 'Copy failed');
    setShowMenu(false);
  };

  const handleCopyShort = async () => {
    const ok = await copyToClipboard(shortCid);
    toast(ok ? 'Copied short CID!' : 'Copy failed');
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu]);

  return (
    <>
      <Tooltip label={cid}>
        <button
          type="button"
          onClick={handleCopy}
          onContextMenu={handleContextMenu}
          aria-label={`${label} ${cid}. Click to copy full CID, right-click for options.`}
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
      {showMenu && (
        <div
          ref={menuRef}
          className="fixed z-50 rounded-card border border-border bg-surface shadow-lg"
          style={{ left: `${menuPos.x}px`, top: `${menuPos.y}px` }}
        >
          <button
            type="button"
            onClick={handleCopyFull}
            className="block w-full px-4 py-2 text-left text-xs text-primary hover:bg-surface-hover"
          >
            Copy full CID
          </button>
          <button
            type="button"
            onClick={handleCopyShort}
            className="block w-full px-4 py-2 text-left text-xs text-primary hover:bg-surface-hover"
          >
            Copy short CID
          </button>
        </div>
      )}
    </>
  );
}
