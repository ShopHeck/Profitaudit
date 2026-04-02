import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800/80 bg-slate-950/90">
          <div className="container-shell flex h-16 items-center justify-between">
            <Link href="/" className="text-lg font-semibold">ProfitAudit</Link>
            <nav className="flex items-center gap-4 text-sm text-slate-300">
              <Link href="/pricing">Pricing</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/login">Login</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
