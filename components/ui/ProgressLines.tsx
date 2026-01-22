import clsx from 'clsx';

export interface ProgressLine {
  state: 'done' | 'active' | 'pending';
  text: string;
}

export default function ProgressLines({ lines, max_lines = 6 }: { lines: ProgressLine[]; max_lines?: number }) {
  return (
    <ul className="space-y-1 text-xs text-secondary">
      {lines.slice(0, max_lines).map((line, index) => (
        <li key={`${line.text}-${index}`} className="flex items-center gap-2">
          <span
            className={clsx(
              'h-1.5 w-1.5 rounded-full',
              line.state === 'done' && 'bg-verify',
              line.state === 'active' && 'bg-proof',
              line.state === 'pending' && 'bg-tertiary'
            )}
          />
          <span>{line.text}</span>
        </li>
      ))}
    </ul>
  );
}
