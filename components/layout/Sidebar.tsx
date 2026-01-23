'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const items = [
  { label: 'Create', route: '/create' },
  { label: 'Explore', route: '/explore' },
  { label: 'Compare', route: '/compare' },
  { label: 'Mint', route: '/mint' },
  { label: 'Status', route: '/status' },
  { label: 'Updates', route: '/updates' }
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-60 flex-col border-r border-border bg-surface px-4 py-6">
      <div className="mb-8 text-xs uppercase tracking-[0.3em] text-secondary">Chip Registry</div>
      <nav className="flex flex-1 flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.route}
            href={item.route}
            className={clsx(
              'rounded-button px-3 py-2 text-sm transition',
              pathname === item.route
                ? 'bg-surface-hover text-primary'
                : 'text-secondary hover:bg-surface-hover'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
