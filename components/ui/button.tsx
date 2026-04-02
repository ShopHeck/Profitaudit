import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  default: 'bg-brand-500 hover:bg-brand-700 text-white',
  secondary: 'bg-slate-800 hover:bg-slate-700 text-white',
  outline: 'border border-slate-700 hover:border-slate-500 text-slate-100',
  ghost: 'text-slate-200 hover:bg-slate-900'
};

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
