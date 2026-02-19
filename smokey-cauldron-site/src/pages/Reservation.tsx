import * as React from 'react'
import { Section } from '../components/Section'

const RESTAURANT_OPTIONS = ['The Smokey Cauldron']
const TITLE_OPTIONS = ['Dr', 'Miss', 'Mr', 'Mrs', 'Ms'] as const

export function Reservation() {
  const [restaurant, setRestaurant] = React.useState(RESTAURANT_OPTIONS[0])
  const [title, setTitle] = React.useState<Title>('Mr')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [date, setDate] = React.useState('')
  const [comments, setComments] = React.useState('')
  const [newsletter, setNewsletter] = React.useState(false)
  const [consent, setConsent] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  type Title = (typeof TITLE_OPTIONS)[number]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main>
      <Section
        title="Book a table"
        subtitle="Fine dining at The Smokey Cauldron. Fill out the form below to request a reservation."
        centerTitle
        titleClassName="font-garamond"
        subtitleClassName="font-garamond"
      >
        {submitted ? (
          <div className="mx-auto max-w-md rounded-2xl border border-[var(--gold)]/30 bg-[var(--potion)]/40 p-6 text-center">
            <p className="text-sm font-medium text-[var(--gold)]">
              Thank you for your reservation request.
            </p>
            <p className="mt-2 text-xs text-white/70">
              We will respond using the contact details you provided. For immediate
              confirmation, please call us or email info@smokeycauldron.pk.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-xl space-y-5 rounded-2xl border border-white/10 bg-black/30 p-6 sm:p-8"
          >
            <label className="block">
              <span className="text-xs font-medium text-white/80">Restaurant *</span>
              <select
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
              >
                {RESTAURANT_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-medium text-white/80">Title *</span>
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value as Title)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
              >
                {TITLE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-white/80">First name *</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
                  placeholder="First name"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-white/80">Last name *</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
                  placeholder="Last name"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-medium text-white/80">Email *</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
                placeholder="your@email.com"
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-white/80">Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
                placeholder="+92 300 1234567"
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-white/80">Date *</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-white/80">Comments *</span>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
                rows={3}
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
                placeholder="Preferred time, special requests, dietary needs…"
              />
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="mt-1 rounded border-white/20 bg-black/40 text-[var(--gold)] focus:ring-[var(--gold)]/50"
              />
              <span className="text-xs text-white/75">
                Notify me about special offers.
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-1 rounded border-white/20 bg-black/40 text-[var(--gold)] focus:ring-[var(--gold)]/50"
              />
              <span className="text-xs text-white/75">
                I consent to having this website store my submitted information so they can
                respond to my inquiry, and I have read and agree to the Privacy Policy. *
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--gold)] px-4 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--gold)]/90 active:translate-y-px"
            >
              Submit
            </button>
          </form>
        )}
      </Section>
    </main>
  )
}
