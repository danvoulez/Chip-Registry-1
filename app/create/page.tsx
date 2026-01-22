'use client';

import Omnibox from '@/components/create/Omnibox';
import CandidateGrid2x2 from '@/components/create/CandidateGrid2x2';
import { useRunStore } from '@/stores/runStore';
import { useCompareStore } from '@/stores/compareStore';
import { useSseRunEvents } from '@/hooks/useSseRunEvents';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
  const runId = useRunStore((state) => state.run_id);
  const candidates = useRunStore((state) => state.candidates);
  const toggleCompare = useCompareStore((state) => state.toggle);

  useSseRunEvents(runId);

  return (
    <div className="space-y-6">
      <Omnibox />
      <CandidateGrid2x2
        candidates={candidates}
        onOpenReceipt={(cid) => router.push(`/focus/${cid}`)}
        onToggleCompare={(cid) => toggleCompare(cid as `b3:${string}`)}
        onVary={(cid, strength) => {
          console.info('Vary', cid, strength);
        }}
      />
    </div>
  );
}
