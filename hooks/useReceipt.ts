import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { ReceiptExpanded, ReceiptVizMeta, CanonDoc } from '@/lib/types';

interface ReceiptResponse {
  receipt: CanonDoc | null;
  receipt_expanded: ReceiptExpanded | null;
  receipt_viz: ReceiptVizMeta | null;
}

export const useReceipt = (receiptCid: string) => {
  return useQuery({
    queryKey: ['receipt', receiptCid],
    queryFn: () => apiFetch<ReceiptResponse>(`/api/mock/receipts/${receiptCid}`),
    staleTime: 60 * 60 * 1000,
    enabled: Boolean(receiptCid)
  });
};
