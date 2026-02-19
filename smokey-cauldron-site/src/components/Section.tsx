import type { PropsWithChildren } from 'react'
import { cn } from '../lib/cn'
import { Container } from './Container'

export function Section({
  title,
  subtitle,
  children,
  className,
  centerTitle,
  titleClassName,
  subtitleClassName,
}: PropsWithChildren<{
  title?: string
  subtitle?: string
  className?: string
  centerTitle?: boolean
  titleClassName?: string
  subtitleClassName?: string
}>) {
  return (
    <section className={cn('py-14 sm:py-16', className)}>
      <Container>
        {(title || subtitle) && (
          <div className={cn('mb-8', centerTitle && 'text-center')}>
            {title && (
              <h2 className={cn('text-balance text-2xl font-semibold tracking-tight text-white/95 sm:text-3xl', titleClassName)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn('mt-2 max-w-2xl text-pretty text-sm text-white/70 sm:text-base', centerTitle && 'mx-auto', subtitleClassName)}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}

