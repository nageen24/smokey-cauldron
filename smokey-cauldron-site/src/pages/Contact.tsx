import * as React from 'react'
import { Send } from 'lucide-react'
import { Button } from '../components/Button'
import { Section } from '../components/Section'

export function Contact() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [message, setMessage] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Contact — The Smokey Cauldron')
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '(not provided)'}\n\nMessage:\n${message}\n`,
    )
    window.location.href = `mailto:info@smokeycauldron.pk?subject=${subject}&body=${body}`
  }

  return (
    <main>
      <Section
        title="Get in Touch"
        subtitle="Have a question? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible."
        centerTitle
        titleClassName="font-garamond"
        subtitleClassName="font-garamond"
      >
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-md space-y-4 rounded-2xl border border-white/10 bg-[var(--burgundy)]/10 p-6 sm:p-8"
        >
          <label className="block">
            <span className="text-xs font-medium text-white/80">Name *</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-white/80">Email *</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
              placeholder="your@email.com"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-white/80">Phone (optional)</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
              placeholder="+92 300 1234567"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-white/80">Message *</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30"
              placeholder="Your message..."
            />
          </label>
          <Button type="submit" className="w-full">
            Send message <Send size={18} className="ml-2 inline-block" />
          </Button>
        </form>
      </Section>
    </main>
  )
}
