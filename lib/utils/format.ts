export const formatNumber = (value: number | null) => {
  if (value == null) return '—';
  return new Intl.NumberFormat('en-US').format(value);
};
