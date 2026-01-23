import type { ReceiptExpanded } from '@/lib/types';
import { formatNumber } from '@/lib/utils/format';

export default function MetricDeltasTable({
  left,
  right
}: {
  left: ReceiptExpanded;
  right: ReceiptExpanded;
}) {
  const rows = [
    {
      label: 'Runtime',
      left: left.metrics.runtime_ms,
      right: right.metrics.runtime_ms,
      better: 'lower'
    },
    {
      label: 'Cost',
      left: left.metrics.cost_credits,
      right: right.metrics.cost_credits,
      better: 'lower'
    },
    {
      label: 'RAM',
      left: left.metrics.peak_ram_mb,
      right: right.metrics.peak_ram_mb,
      better: 'lower'
    }
  ];
  return (
    <table className="w-full text-xs text-secondary">
      <thead>
        <tr className="text-left text-tertiary">
          <th className="py-2">Metric</th>
          <th>Left</th>
          <th>Right</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-t border-border">
            <td className="py-2 text-primary">{row.label}</td>
            <td>{formatNumber(row.left)}</td>
            <td>{formatNumber(row.right)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
