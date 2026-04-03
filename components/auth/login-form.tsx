'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Unable to sign in right now. Please verify your environment configuration.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        type="email"
        required
        className="w-full rounded border border-slate-700 bg-slate-950 p-2"
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        type="password"
        required
        className="w-full rounded border border-slate-700 bg-slate-950 p-2"
      />
      {error && <p className="rounded border border-rose-500/50 bg-rose-500/10 p-2 text-sm text-rose-200">{error}</p>}
      <Button className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign in'}</Button>
      <p className="text-sm text-slate-400">No account? <Link href="/signup" className="text-brand-500">Create one</Link></p>
    </form>
  );
}
