import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { cn } from '../lib/cn'
import type { Theme } from '../lib/theme'
import { Button } from './Button'
import { Container } from './Container'

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'rounded-lg px-3 py-2 text-sm transition hover:bg-white/10',
    isActive ? 'bg-white/10 text-[var(--gold)]' : 'text-white/85',
  )
}

export function NavBar({
  theme,
  onToggleTheme,
}: {
  theme: Theme
  onToggleTheme: () => void
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
         
          <div className="leading-tight">
            <div className="font-garamond text-sm font-semibold tracking-wide">
              The Smokey Cauldron
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/menu" className={navLinkClassName}>
            Menu
          </NavLink>
          <NavLink to="/reservation" className={navLinkClassName}>
            Reservation
          </NavLink>
          <NavLink to="/contact" className={navLinkClassName}>
            Contact
          </NavLink>
        
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'night' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </Button>
        </div>
      </Container>

      {open && (
        <div className="md:hidden">
          <div className="border-t border-white/10 bg-black/40 backdrop-blur">
            <Container className="flex items-center justify-between py-3">
              <div className="text-sm font-medium text-white/80">Navigate</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </Button>
            </Container>
            <Container className="flex flex-col gap-1 pb-4">
              <NavLink
                to="/"
                end
                className={navLinkClassName}
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/menu"
                className={navLinkClassName}
                onClick={() => setOpen(false)}
              >
                Menu
              </NavLink>
              <NavLink
                to="/reservation"
                className={navLinkClassName}
                onClick={() => setOpen(false)}
              >
                Reservation
              </NavLink>
              <NavLink
                to="/contact"
                className={navLinkClassName}
                onClick={() => setOpen(false)}
              >
                Contact
              </NavLink>
            </Container>
          </div>
        </div>
      )}
    </header>
  )
}

