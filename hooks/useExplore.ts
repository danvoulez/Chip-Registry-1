import { useInfiniteQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';

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

interface ExploreResponse {
  items: ExploreItem[];
  next_cursor: string | null;
}

export const useExplore = (filters: Record<string, string | null>) => {
  return useInfiniteQuery({
    queryKey: ['explore', filters],
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams({
        ...Object.fromEntries(Object.entries(filters).filter(([, value]) => value != null))
      });
      if (pageParam) params.set('cursor', pageParam as string);
      return apiFetch<ExploreResponse>(`/api/mock/explore?${params.toString()}`);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.next_cursor
  });
};
