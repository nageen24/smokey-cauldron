import { cn } from '../lib/cn'

export function FacebookPageEmbed({
  pageUrl,
  className,
}: {
  pageUrl: string
  className?: string
}) {
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    pageUrl,
  )}&tabs=timeline&width=500&height=900&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-white/10 bg-white/5',
        className,
      )}
    >
      <iframe
        title="Facebook timeline"
        src={src}
        width="500"
        height="900"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="h-[900px] w-full"
      />
    </div>
  )
}

