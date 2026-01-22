import type { CanonDoc } from '@/lib/types';

export const prettyCanon = (doc: CanonDoc | null) => {
  if (!doc) return '{}';
  return atob(doc.canon_bytes_b64 || '');
};
