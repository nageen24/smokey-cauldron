import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'sm' | 'md'

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }
>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(245,208,111,.9)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        size === 'sm' ? 'px-3 py-2 text-sm' : 'px-4 py-2.5 text-sm sm:text-base',
        variant === 'primary' &&
          'bg-[rgba(245,208,111,.95)] text-[#0b0f1a] hover:bg-[rgba(245,208,111,1)] active:translate-y-px',
        variant === 'outline' &&
          'border border-white/15 bg-white/5 hover:bg-white/10 active:translate-y-px',
        variant === 'ghost' &&
          'bg-transparent hover:bg-white/10 active:translate-y-px',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

