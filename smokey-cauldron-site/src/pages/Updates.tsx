import * as React from 'react'
import { ExternalLink, Facebook, Instagram } from 'lucide-react'
import { FacebookPageEmbed } from '../components/FacebookPageEmbed'
import { InstagramFeed } from '../components/InstagramFeed'
import { Section } from '../components/Section'
import { INSTAGRAM_USERNAME } from '../data/defaults'
import { useSocial } from '../hooks/useSocial'

export function Updates() {
  const { data: posts } = useSocial()
  const [tab, setTab] = React.useState<'instagram' | 'facebook'>('instagram')

  return (
    <main>
      <Section
        title="Latest updates"
        subtitle="We embed the restaurant’s own social posts so images/videos come from their official pages (not random web images)."
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-5">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTab('instagram')}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                tab === 'instagram'
                  ? 'bg-white/10 text-[var(--gold)]'
                  : 'bg-transparent text-white/75 hover:bg-white/10'
              }`}
            >
              Instagram
            </button>
            <button
              onClick={() => setTab('facebook')}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                tab === 'facebook'
                  ? 'bg-white/10 text-[var(--gold)]'
                  : 'bg-transparent text-white/75 hover:bg-white/10'
              }`}
            >
              Facebook
            </button>
          </div>

          {tab === 'instagram' ? (
            <a
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
              href={`https://www.instagram.com/${INSTAGRAM_USERNAME}/`}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} /> Open Instagram <ExternalLink size={14} />
            </a>
          ) : (
            <a
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
              href="https://www.facebook.com/thesmokeycauldron/"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook size={18} /> Open Facebook <ExternalLink size={14} />
            </a>
          )}
        </div>

        {tab === 'instagram' ? (
          <>
            <div className="mb-4 text-sm text-white/75">
              Source:{' '}
              <span className="font-semibold text-white/90">
                @{INSTAGRAM_USERNAME}
              </span>
            </div>
            <InstagramFeed posts={posts} />
          </>
        ) : (
          <>
            <div className="mb-4 text-sm text-white/75">
              Source:{' '}
              <span className="font-semibold text-white/90">
                facebook.com/thesmokeycauldron
              </span>
            </div>
            <FacebookPageEmbed pageUrl="https://www.facebook.com/thesmokeycauldron/" />
            <div className="mt-4 text-xs text-white/55">
              If the timeline doesn’t load, it’s usually due to browser privacy
              settings blocking third‑party embeds. Use “Open Facebook” above.
            </div>
          </>
        )}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          If you want this to always show the newest posts, run the included
          fetch script (it updates <span className="font-mono text-white/80">public/social.json</span>).
        </div>
      </Section>
    </main>
  )
}

