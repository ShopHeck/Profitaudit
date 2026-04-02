'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/dashboard`;

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectTo }
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setSuccess('Account created. Check your email to verify your account, then sign in.');
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Unable to sign up right now. Please verify your environment configuration.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-2xl font-semibold">Create account</h1>
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
        minLength={8}
        className="w-full rounded border border-slate-700 bg-slate-950 p-2"
      />
      {error && <p className="rounded border border-rose-500/50 bg-rose-500/10 p-2 text-sm text-rose-200">{error}</p>}
      {success && <p className="rounded border border-emerald-500/50 bg-emerald-500/10 p-2 text-sm text-emerald-200">{success}</p>}
      <Button className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Creating account...' : 'Sign up'}</Button>
      <p className="text-sm text-slate-400">Already have an account? <Link href="/login" className="text-brand-500">Login</Link></p>
    </form>
  );
}
