import { H4_SCALE } from '../ui/type.js'

// TermIndex – SPEC_PAGES_B T11 `Terms List`. No A–Z bar, search or accordion (as live).
// Column gap 100 (phone 32); each letter group max-w 1200, gap 20: letter H2 Cirka 40/36 −1.6 (36/36 <1440) →
// 1px rgba(24,24,24,.07) divider → grid repeat(3, 384px) gap 12 24 (2 columns on phone): term links Ginto 14/18 #000
// (13px <1440), no underline at rest, underline on hover (instant).
// Term detail pages are outside the brief (spec T11), so links point at /glossary/<slug> for when they exist.

export default function TermIndex({ groups }) {
  return (
    <div data-ui="term-index" className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:gap-[100px]">
      {groups.map((g) => (
        <section key={g.letter} aria-labelledby={`letter-${g.letter}`} className="flex flex-col gap-5">
          <h2 id={`letter-${g.letter}`} className={`text-ink ${H4_SCALE}`}>
            {g.letter}
          </h2>
          <hr className="h-px w-full border-0 bg-rule-soft" />
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3">
            {g.terms.map((t) => (
              <li key={t.slug}>
                <a href={`/glossary/${t.slug}`} className="font-sans text-small-13 text-ink hover:underline xl:text-small">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
