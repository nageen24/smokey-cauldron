import {
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Utensils,
} from 'lucide-react'
import { Container } from './Container'
import { GOOGLE_MAPS_URL, INSTAGRAM_USERNAME } from '../data/defaults'

export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-black/60">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--gold)]/20 bg-black/40 px-3 py-2">
              {/* <img
                src="/favicon.svg"
                alt=""
                className="h-8 w-8 shrink-0 rounded-lg object-contain"
                width={32}
                height={32}
              /> */}
              <div className="leading-tight">
                <div className="font-garamond text-sm font-semibold tracking-wide text-white/90">
                  The Smokey Cauldron
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs sm:text-sm">
            <div className="font-semibold text-white/90">Visit us</div>
            <div className="mt-3 space-y-2 text-white/70">
              <div className="inline-flex items-start gap-2">
                <MapPin size={16} className="mt-[2px] shrink-0 text-[var(--gold)]" aria-hidden />
                <span>near Pizza Hut, F-6 Markaz F-6, Islamabad, Pakistan</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Clock size={16} className="shrink-0 text-[var(--gold)]" aria-hidden />
                <span>Daily · 11:30 AM – 12:00 AM</span>
              </div>
              <a
                className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-white"
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={16} className="shrink-0" aria-hidden />
                Open in Google Maps
              </a>
            </div>
          </div>

          <div className="text-xs sm:text-sm">
            <div className="font-semibold text-white/90">Contact</div>
            <div className="mt-3 space-y-2 text-white/70">
              <div className="inline-flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-[var(--gold)]" aria-hidden />
                <span>+92 51 8430133</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-[var(--gold)]" aria-hidden />
                <span>Reservations: info@smokeycauldron.pk</span>
              </div>
            </div>
          </div>

          <div className="text-xs sm:text-sm">
            <div className="font-semibold text-white/90">Social</div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-white/75">
              <a
                href={`https://www.instagram.com/${INSTAGRAM_USERNAME}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-black/40 px-3 py-1.5 text-xs text-[var(--gold)] hover:bg-[var(--gold)]/10"
              >
                <Instagram size={16} className="shrink-0" aria-hidden />
                Instagram
              </a>
              </div>
              <div>
              <a
                href="https://www.facebook.com/thesmokeycauldron/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-black/40 px-3 py-1.5 text-xs text-[var(--gold)] hover:bg-[var(--gold)]/10"
              >
                <Facebook size={16} className="shrink-0" aria-hidden />
                Facebook
              </a>
            </div>
            
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-4 text-[0.7rem] text-white/45">
          <span className="font-garamond">© {new Date().getFullYear()} The Smokey Cauldron. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  )
}
