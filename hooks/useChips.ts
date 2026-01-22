import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { ChipSummary } from '@/lib/types';

interface ChipsResponse {
  chips: ChipSummary[];
}

export const useChips = () => {
  return useQuery({
    queryKey: ['chips'],
    queryFn: () => apiFetch<ChipsResponse>('/api/mock/chips'),
    staleTime: 5 * 60 * 1000
  });
};
