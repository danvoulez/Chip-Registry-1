'use client';

export default function FilterBar({
  filters,
  onChange
}: {
  filters: Record<string, string | null>;
  onChange: (next: Record<string, string | null>) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 rounded-panel border border-border bg-surface p-3 text-xs">
      {Object.entries(filters).map(([key, value]) => (
        <label key={key} className="flex flex-col gap-1 text-secondary">
          {key}
          <input
            value={value ?? ''}
            onChange={(event) => onChange({ ...filters, [key]: event.target.value || null })}
            className="rounded-button border border-border bg-transparent px-2 py-1 text-primary"
          />
        </label>
      ))}
    </div>
  );
}
