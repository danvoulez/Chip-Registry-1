import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { WorldSummary } from '@/lib/types';

interface WorldsResponse {
  worlds: WorldSummary[];
}

export const useWorlds = () => {
  return useQuery({
    queryKey: ['worlds'],
    queryFn: () => apiFetch<WorldsResponse>('/api/mock/worlds'),
    staleTime: 5 * 60 * 1000
  });
};
