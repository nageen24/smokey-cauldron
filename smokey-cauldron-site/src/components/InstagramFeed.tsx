import * as React from 'react'
import type { SocialPost } from '../types'
import { cn } from '../lib/cn'

declare global {
  interface Window {
    instgrm?: { Embeds?: { process?: () => void } }
  }
}

function useInstagramEmbedScript(enabled: boolean) {
  React.useEffect(() => {
    if (!enabled) return

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-instagram-embed="true"]',
    )
    if (existing) {
      window.instgrm?.Embeds?.process?.()
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = 'https://www.instagram.com/embed.js'
    script.dataset.instagramEmbed = 'true'
    script.onload = () => window.instgrm?.Embeds?.process?.()
    document.body.appendChild(script)
  }, [enabled])
}

export function InstagramFeed({
  posts,
  className,
}: {
  posts: SocialPost[]
  className?: string
}) {
  const hasEmbeds = posts.some((p) => p.oembedHtml)
  useInstagramEmbedScript(hasEmbeds)

  return (
    <div className={cn('grid gap-6 md:grid-cols-2', className)}>
      {posts.map((p) => {
        const key = `${p.platform}:${p.url}`
        if (p.oembedHtml) {
          return (
            <div
              key={key}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3"
              dangerouslySetInnerHTML={{ __html: p.oembedHtml }}
            />
          )
        }

        return (
          <a
            key={key}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <div className="text-sm font-semibold text-white/90">
              Instagram post
            </div>
            <div className="mt-2 break-all text-sm text-white/70">{p.url}</div>
            <div className="mt-4 text-sm text-[var(--gold)] group-hover:text-white">
              Open on Instagram →
            </div>
          </a>
        )
      })}
    </div>
  )
}

