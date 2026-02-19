import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { useJson } from '../lib/useJson'
import {
  CATEGORY_CONFIG,
  CATEGORY_IMAGES,
  inferCategory,
  type CategoryId,
  type MenuData,
} from '../menu/config'

const fallback: MenuData = { items: [] }

export function MenuCategory() {
  const { categoryId } = useParams<{ categoryId: CategoryId }>()
  const { data } = useJson<MenuData>('/menu.json', fallback)

  const category = CATEGORY_CONFIG.find((c) => c.id === categoryId)

  const items = React.useMemo(() => {
    if (!category) return []
    return (data.items ?? [])
      .map((item) => ({ ...item, _category: inferCategory(item) }))
      .filter((item) => item._category === category.id)
  }, [category, data.items])

  const imgSrc =
    CATEGORY_IMAGES[categoryId as CategoryId] ??
    (categoryId ? '/menu-1.png' : '/menu-1.png')

  if (!category) {
    return (
      <main>
        <Section title="Menu section not found">
          <p className="text-sm text-white/70">
            This menu section does not exist. Please go back to the main menu and choose a
            category card.
          </p>
          <div className="mt-4">
            <Link to="/menu">
              <Button>← Back to menu</Button>
            </Link>
          </div>
        </Section>
      </main>
    )
  }

  return (
    <main>
      <Section
        title={category.label}
        subtitle="All dishes in this category — name and price only."
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link to="/menu">
            <Button variant="outline" size="sm">
              ← Back to all categories
            </Button>
          </Link>
          <div className="text-xs text-white/60">
            {items.length} item{items.length === 1 ? '' : 's'} in this section
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <img
            src={imgSrc}
            alt={category.label}
            className="h-44 w-full object-cover opacity-90 sm:h-56"
            loading="lazy"
          />
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            No items were detected for this category yet. Try running{' '}
            <span className="font-mono text-white/85">npm run fetch:data</span> again.
          </div>
        ) : (
          <ul className="space-y-0 divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/25">
            {items.map((i) => (
              <li
                key={i.name}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5"
              >
                <span className="font-medium text-white">{i.name}</span>
                {i.price && (
                  <span className="text-sm font-semibold text-[var(--gold)]">{i.price}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  )
}
