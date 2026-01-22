import { useEffect } from 'react';

interface Hotkey {
  keys: string[];
  onTrigger: () => void;
}

export const useHotkeys = (hotkeys: Hotkey[]) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      hotkeys.forEach((hotkey) => {
        const isMatch = hotkey.keys.every((key) => {
          if (key === 'g') return event.key.toLowerCase() === 'g';
          return event.key.toLowerCase() === key.toLowerCase();
        });
        if (isMatch) {
          event.preventDefault();
          hotkey.onTrigger();
        }
      });
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hotkeys]);
};
