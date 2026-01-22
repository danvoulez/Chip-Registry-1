export const formatMs = (value: number | null) => {
  if (value == null) return '—';
  if (value < 1000) return `${value.toFixed(0)} ms`;
  return `${(value / 1000).toFixed(2)} s`;
};
