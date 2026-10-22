import { useMemo, useState } from 'react'
import FilterChips from '../ui/FilterChips.jsx'
import IntegrationCard from '../ui/IntegrationCard.jsx'
import { GINTO, QUOTE_SCALE } from '../ui/type.js'

// IntegrationCatalog – SPEC_PAGES_A T3.3. Sidebar filter + category blocks of IntegrationCards (P4).
// @1440: wrapper padding 70px 64px 0 (bottom 62 sampled: last card -> setup section start on the 1440 PNG); inner
//   row 1200 wide, gap 32.
//   Sidebar 25% (300), padding-right 16, column gap 42, sticky top 140 (>=1200): count line "NN Integrations"
//   16/22.4 #000; "Category" 16/22.4 #000 + FilterChips variant "sidebar" (gap 8). A 1px rule on its right edge is
//   sampled from the screenshots (#9DC0D5; not in the spec text).
//   List (868) column gap 56; block gap 32; header gap 8: H2 Cirka 30/30 −1.2 (28 / 26 / 24) + description
//   16/22.4 #8A8A8A (14/19.6 below 1200; paragraphs 20 apart, sampled). Grid 2 x 421, gap 20, 3px transparent
//   border; 1 column on phone.
// Tablet (810–1199): the sidebar becomes a top bar – count line, then "Category" + 4 chips 235x40, gap 10, in one row.
//   Live clips that 1084px row at 936; here it scrolls sideways instead so the last chip stays reachable.
// Phone: count line only (no filter UI).
// Filter: clicking a category shows only that block; clicking the active one again shows all (not measured on
//   live). The count is the number of unique integrations shown (live shows "0 Integrations" after filtering – a
//   live bug, not reproduced).
// Motion: none here. The live on-load appear (blocks opacity .001 -> 1, spring {duration .8 Ticketing / .6 Telephony
//   and Knowledge base, bounce 0}, none on Tools and actions) is left to the animation pass: each block carries
//   data-motion="catalog-appear" + data-appear-duration.

const APPEAR = { ticketing: 0.8, telephony: 0.6, knowledge: 0.6 }

function CategoryBlock({ cat, items, hrefFor }) {
  return (
    <section
      id={`category-${cat.id}`}
      data-motion={APPEAR[cat.id] ? 'catalog-appear' : undefined}
      data-appear-duration={APPEAR[cat.id]}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <h2 className={`text-left text-ink ${QUOTE_SCALE}`}>{cat.label}</h2>
        <div className="flex flex-col gap-5">
          {cat.description.map((p, i) => (
            <p key={i} className={`${GINTO} text-para-14-phone text-catalog-desc lg:text-body-16`}>
              {p}
            </p>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 border-[3px] border-transparent md:grid-cols-2">
        {items.map((it) => (
          <IntegrationCard key={it.slug} name={it.name} description={it.description} logo={it.logo} href={hrefFor(it)} />
        ))}
      </div>
    </section>
  )
}

export default function IntegrationCatalog({ categories, itemsFor, hrefFor, id = 'catalog', className = '' }) {
  const [active, setActive] = useState(null)
  const shown = active ? categories.filter((c) => c.id === active) : categories
  const count = useMemo(() => new Set(shown.flatMap((c) => c.items)).size, [shown])
  const chips = categories.map((c) => ({ id: c.id, label: c.label }))

  return (
    <section id={id} data-ui="integration-catalog" className={`scroll-mt-[120px] px-5 pb-[62px] pt-[70px] md:px-8 xl:px-16 ${className}`}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 lg:flex-row">
        <aside className="shrink-0 border-r border-catalog-rule lg:w-1/4 lg:self-start lg:sticky lg:top-[140px] lg:pr-4">
          <div className="flex flex-col gap-[42px]">
            <p className={`${GINTO} text-body-16 text-ink`} aria-live="polite">
              {count} Integrations
            </p>
            <div className="hidden min-w-0 md:flex md:flex-row md:items-center md:gap-2.5 lg:flex-col lg:items-stretch lg:gap-2">
              <p className={`${GINTO} shrink-0 text-body-16 text-ink`}>Category</p>
              <FilterChips
                variant="sidebar"
                label="Category"
                items={chips}
                value={active}
                onChange={(next) => setActive((cur) => (cur === next ? null : next))}
                className="min-w-0 md:max-lg:flex-row md:max-lg:gap-2.5 md:max-lg:overflow-x-auto"
                itemClassName="md:max-lg:h-10 md:max-lg:w-[235px] md:max-lg:shrink-0"
              />
            </div>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-14">
          {shown.map((cat) => (
            <CategoryBlock key={cat.id} cat={cat} items={itemsFor(cat)} hrefFor={hrefFor} />
          ))}
        </div>
      </div>
    </section>
  )
}
