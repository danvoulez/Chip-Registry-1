import type { CidStr } from '@/lib/types';

export const abbreviateCid = (cid: CidStr, chars = 7) => {
  const prefix = cid.slice(0, 3 + chars);
  const suffix = cid.slice(-chars);
  return `${prefix}…${suffix}`;
};
