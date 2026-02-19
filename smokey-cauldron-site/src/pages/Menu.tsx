import * as React from 'react'
import { useJson } from '../lib/useJson'
import { cn } from '../lib/cn'
import {
  CATEGORY_CONFIG,
  MAIN_MENU_SECTIONS,
  inferCategory,
  type CategoryId,
  type MenuData,
} from '../menu/config'

const fallback: MenuData = { items: [] }

export function Menu() {
  const { data } = useJson<MenuData>('/menu.json', fallback)
  const items = data.items ?? []

  const [mainId, setMainId] = React.useState<string | null>(MAIN_MENU_SECTIONS[0]?.id ?? null)
  const [subId, setSubId] = React.useState<CategoryId | null>(null)

  const mainSection = mainId ? MAIN_MENU_SECTIONS.find((s) => s.id === mainId) : null

  const subSectionsWithItems = React.useMemo(() => {
    if (!mainSection) return []
    return mainSection.categoryIds
      .map((catId) => {
        const config = CATEGORY_CONFIG.find((c) => c.id === catId)
        if (!config) return null
        const catItems = items
          .map((item) => ({ ...item, _category: inferCategory(item) }))
          .filter((item) => item._category === catId)
        return { ...config, items: catItems }
      })
      .filter((s): s is NonNullable<typeof s> => s !== null)
  }, [mainSection, items])

  const currentSub = subId && subSectionsWithItems.find((s) => s.id === subId)
  const displayItems = currentSub?.items ?? (subSectionsWithItems[0]?.items ?? [])
  const activeSubId = subId ?? subSectionsWithItems[0]?.id ?? null

  return (
    <main className="min-h-screen bg-[var(--charcoal)]">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* 3 main category tabs - centered like Hawksmoor */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {MAIN_MENU_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                setMainId(section.id)
                setSubId(null)
              }}
              className={cn(
                'rounded border px-4 py-2.5 text-sm font-medium transition sm:px-6 sm:py-3 sm:text-base',
                mainId === section.id
                  ? 'border-[var(--gold)] bg-[var(--gold)] text-black'
                  : 'border-[var(--gold)]/50 bg-transparent text-[var(--gold)] hover:bg-[var(--gold)]/10',
              )}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Sub-tabs + menu list (Hawksmoor-style) */}
        {mainSection && subSectionsWithItems.length > 0 && (
          <div className="mt-10">
            {/* Sub-category tabs - centered like main categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-4">
              {subSectionsWithItems.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSubId(sub.id)}
                  className={cn(
                    'rounded px-3 py-1.5 text-sm font-medium transition sm:px-4',
                    activeSubId === sub.id
                      ? 'bg-[var(--gold)]/20 text-[var(--gold)]'
                      : 'text-white/70 hover:text-white',
                  )}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Section title (like Hawksmoor À La Carte / Starters) */}
            <h2 className="mt-6 border-b border-[var(--gold)]/30 pb-2 text-xl font-semibold text-[var(--gold)] sm:text-2xl">
              {currentSub?.label ?? subSectionsWithItems[0]?.label}
            </h2>

            {/* Item list: name left, price right */}
            <ul className="mt-4 space-y-1">
              {displayItems.map((i) => (
                <li
                  key={i.name}
                  className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/5 py-3 text-sm sm:text-base"
                >
                  <div>
                    <span className="text-white/95">{i.name}</span>
                    {i.note && (
                      <p className="mt-0.5 text-xs text-white/60">{i.note}</p>
                    )}
                  </div>
                  {i.price && (
                    <span className="shrink-0 font-medium text-[var(--gold)]">{i.price}</span>
                  )}
                </li>
              ))}
            </ul>
            {displayItems.length === 0 && (
              <p className="mt-4 text-sm text-white/50">No items in this category.</p>
            )}
          </div>
        )}

        {mainSection && subSectionsWithItems.length === 0 && (
          <p className="mt-10 text-center text-sm text-white/50">
            No menu items in this section yet.
          </p>
        )}
      </div>
    </main>
  )
}
