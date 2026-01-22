import clsx from 'clsx';

export interface MetricItem {
  label: string;
  value: string;
  unit?: string;
  emphasis?: boolean;
}

export default function MetricsStrip({
  items,
  layout = 'row'
}: {
  items: MetricItem[];
  layout?: 'row' | 'grid';
}) {
  return (
    <div className={clsx('gap-4', layout === 'grid' ? 'grid grid-cols-2' : 'flex flex-wrap')}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col">
          <span className="text-xs text-secondary">{item.label}</span>
          <span className={clsx('text-sm', item.emphasis && 'text-verify font-semibold')}>
            {item.value}
            {item.unit ? <span className="text-tertiary"> {item.unit}</span> : null}
          </span>
        </div>
      ))}
    </div>
  );
}
