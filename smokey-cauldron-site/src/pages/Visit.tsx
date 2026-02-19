import { ExternalLink, MapPin } from 'lucide-react'
import { Section } from '../components/Section'
import { useRestaurant } from '../hooks/useRestaurant'

export function Visit() {
  const { data } = useRestaurant()
  const coords = data.coordinates
  const mapEmbedUrl = coords
    ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=16&output=embed`
    : undefined

  return (
    <main>
      <Section
        title="Visit the restaurant"
        subtitle="Location details are pulled from `public/restaurant.json` when available."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-semibold text-white/90">Address</div>
            <div className="mt-2 text-sm text-white/70">
              {data.address ?? 'F-6 Markaz, Islamabad (open Maps for exact pin)'}
            </div>

            <div className="mt-6 text-sm font-semibold text-white/90">Hours</div>
            <div className="mt-2 text-sm text-white/70">
              {data.hours?.length ? (
                <ul className="space-y-1">
                  {data.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-6">
                      <span>{h.day}</span>
                      <span className="text-white/80">
                        {h.open} – {h.close}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                'Run the fetch script to populate hours.'
              )}
            </div>

            <div className="mt-6 text-sm font-semibold text-white/90">
              Google Maps
            </div>
            <a
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--gold)] hover:text-white"
              href={data.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={18} /> Open directions <ExternalLink size={14} />
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {mapEmbedUrl ? (
              <iframe
                title="Map"
                src={mapEmbedUrl}
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="grid h-[420px] place-items-center p-10 text-sm text-white/70">
                Map preview will appear after data is fetched.
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  )
}

