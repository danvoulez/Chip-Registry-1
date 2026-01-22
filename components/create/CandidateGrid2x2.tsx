import CandidateCard from '@/components/create/CandidateCard';
import type { CandidateViewModel } from '@/lib/types';

export default function CandidateGrid2x2({
  candidates,
  onOpenReceipt,
  onToggleCompare,
  onVary
}: {
  candidates: CandidateViewModel[];
  onOpenReceipt: (receiptCid: string) => void;
  onToggleCompare: (receiptCid: string) => void;
  onVary: (receiptCid: string, strength: string) => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.index}
          candidate={candidate}
          onOpenReceipt={onOpenReceipt}
          onToggleCompare={onToggleCompare}
          onVary={onVary}
        />
      ))}
    </div>
  );
}
