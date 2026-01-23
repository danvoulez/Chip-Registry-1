'use client';

import { useMemo, useState } from 'react';
import FilterBar from '@/components/explore/FilterBar';
import ReceiptCard from '@/components/explore/ReceiptCard';
import { useExplore } from '@/hooks/useExplore';
import { useCompareStore } from '@/stores/compareStore';
import { useRouter } from 'next/navigation';

interface ExploreItem {
  receipt_cid: string;
  receipt_viz_url: string | null;
  blurhash: string | null;
  chip_cid: string | null;
  world_id: string | null;
  determinism_grade: 'A' | 'B' | 'C' | null;
  verified: boolean | null;
  ts_ms: number | null;
}

export default function ExplorePage() {
  const [filters, setFilters] = useState<Record<string, string | null>>({
    chip: null,
    world: null,
    grade: null,
    verified: null
  });
  const { data, fetchNextPage, hasNextPage } = useExplore(filters);
  const router = useRouter();
  const toggleCompare = useCompareStore((state) => state.toggle);

  const items = useMemo(() => {
    const pages = data?.pages as { items: ExploreItem[] }[] | undefined;
    return pages?.flatMap((page) => page.items) ?? [];
  }, [data]);
  const hasFilters = filters.chip || filters.world || filters.grade || filters.verified !== null;

  const handleClearFilters = () => {
    setFilters({ chip: null, world: null, grade: null, verified: null });
  };

  return (
    <div className="space-y-6">
      <FilterBar filters={filters} onChange={setFilters} />
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-panel border border-border bg-surface p-12 text-center">
          <div className="mb-2 text-2xl text-secondary">No receipts found</div>
          <p className="mb-4 text-sm text-secondary">
            {hasFilters
              ? 'Try adjusting your filters to see more results.'
              : 'No receipts available at the moment.'}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-button border border-border bg-surface-hover px-4 py-2 text-xs text-primary"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
              <ReceiptCard
                key={item.receipt_cid}
                receipt_cid={item.receipt_cid}
                viz_url={item.receipt_viz_url}
                blurhash={item.blurhash}
                badges={{ verified: item.verified, grade: item.determinism_grade }}
                onOpen={() => router.push(`/focus/${item.receipt_cid}`)}
                onCompare={() => toggleCompare(item.receipt_cid as `b3:${string}`)}
                onReplay={() => console.info('Replay', item.receipt_cid)}
                onFavorite={() => console.info('Favorite', item.receipt_cid)}
              />
            ))}
          </div>
          {hasNextPage ? (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              className="rounded-button border border-border px-4 py-2 text-xs"
            >
              Load more
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
