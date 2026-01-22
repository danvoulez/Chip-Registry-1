export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
      <div>
        <h1 className="text-sm font-semibold">Creative OS</h1>
        <p className="text-xs text-secondary">Auditability is UX</p>
      </div>
      <div className="text-xs text-secondary">v0.1</div>
    </header>
  );
}
