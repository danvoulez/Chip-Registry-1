import type { CanonDoc } from '@/lib/types';

const safeDecodeBase64 = (value: string) => {
  if (!value) return '';
  try {
    return atob(value);
  } catch {
    return '';
  }
};

export const prettyCanon = (doc: CanonDoc | null) => {
  if (!doc?.canon_bytes_b64) return '{}';
  const decoded = safeDecodeBase64(doc.canon_bytes_b64);
  return decoded || '{}';
};
