import './globals.css';
import type { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import Toast from '@/components/ui/Toast';
import Providers from '@/app/providers';

export const metadata = {
  title: 'Chip Registry Creative OS',
  description: 'Showroom de execuções verificáveis'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-canvas text-primary font-ui">
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Topbar />
              <main className="flex-1 px-6 py-6">{children}</main>
            </div>
          </div>
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
