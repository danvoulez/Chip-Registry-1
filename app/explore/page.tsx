'use client';

import { useMemo, useState } from 'react';
import FilterBar from '@/components/explore/FilterBar';
import ReceiptCard from '@/components/explore/ReceiptCard';
import { useExplore } from '@/hooks/useExplore';
import { useCompareStore } from '@/stores/compareStore';
import { useRouter } from 'next/navigation';

export default function ExplorePage() {
  const [filters, setFilters] = useState({ chip: null, world: null, grade: null, verified: null });
  const { data, fetchNextPage, hasNextPage } = useExplore(filters);
  const router = useRouter();
  const toggleCompare = useCompareStore((state) => state.toggle);

  const items = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  return (
    <div className="space-y-6">
      <FilterBar filters={filters} onChange={setFilters} />
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
    </div>
  );
}
