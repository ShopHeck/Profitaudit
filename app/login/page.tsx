import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="container-shell flex min-h-[70vh] items-center justify-center py-12">
      <form className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <input placeholder="Email" className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
        <input placeholder="Password" type="password" className="w-full rounded border border-slate-700 bg-slate-950 p-2" />
        <Button className="w-full">Sign in</Button>
        <p className="text-sm text-slate-400">No account? <Link href="/signup" className="text-brand-500">Create one</Link></p>
      </form>
    </div>
  );
}
