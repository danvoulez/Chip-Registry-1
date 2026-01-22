import { useEffect, useRef } from 'react';
import type { RunEvent } from '@/lib/types';
import { useRunStore } from '@/stores/runStore';

const backoffSchedule = [250, 500, 1000, 2000, 5000];

export const useSseRunEvents = (runId: string | null, onEvent?: (event: RunEvent) => void) => {
  const attemptRef = useRef(0);
  const storeApply = useRunStore((state) => state.applyEvent);

  useEffect(() => {
    if (!runId) return;
    let eventSource: EventSource | null = null;
    let mounted = true;

    const connect = () => {
      if (!mounted) return;
      eventSource = new EventSource(`/api/mock/runs/${runId}/events`);
      eventSource.onmessage = (message) => {
        const data = JSON.parse(message.data) as RunEvent;
        storeApply(data);
        onEvent?.(data);
      };

      eventSource.onerror = () => {
        eventSource?.close();
        attemptRef.current += 1;
        if (attemptRef.current > 10) return;
        const delay = backoffSchedule[Math.min(attemptRef.current - 1, backoffSchedule.length - 1)];
        setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      mounted = false;
      eventSource?.close();
    };
  }, [runId, onEvent, storeApply]);
};
