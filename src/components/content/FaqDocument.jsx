import RichText, { slugify } from '../ui/RichText.jsx'
import { CIRKA, H4_SCALE, QUOTE_SCALE } from '../ui/type.js'
import './content.css'

// DocHeader + FaqDocument – SPEC_PAGES_B T12 (static, nothing collapses).
// DocHeader (gap 24): H1 Cirka 40/36 −1.6 (36/36 <1440); lede Ginto 16/22.4 #737373 (14/19.6 @1000 only);
//   "last updated" Ginto 11/11 −0.22 #666.
// Topic section (gap 10, padding-bottom 32): H2 Cirka 30/30 −1.2 (28 @1280, 26 @1000, 24 phone); then the Q/A flow:
//   question h3 Cirka 18/23.4 #000 (mt 8 except the first), answer RichText variant "faq" (content.css: 14/22.4
//   #737373, mt 12, "•" lists with li padding-left 17.3, bold = Inter 700, links #737373 + underline).

export function DocHeader({ title, lede, updated }) {
  return (
    <header className="flex flex-col gap-6">
      <h1 className={`text-ink ${H4_SCALE}`}>{title}</h1>
      <p className="font-sans text-body-16 text-muted-7 md:text-para-14-phone lg:text-body-16">{lede}</p>
      <p className="font-sans text-new-tag text-muted">{updated}</p>
    </header>
  )
}

export default function FaqDocument({ sections }) {
  return (
    <div data-ui="faq-document" className="flex flex-col">
      {sections.map((s) => (
        <section key={s.title} id={slugify(s.title)} className="flex flex-col gap-2.5 pb-8">
          <h2 className={`text-ink ${QUOTE_SCALE}`}>{s.title}</h2>
          <div>
            {s.items.map((it, i) => (
              <div key={it.q}>
                <h3 className={`${CIRKA} text-cirka-18 text-ink ${i ? 'mt-2' : ''}`}>{it.q}</h3>
                <RichText blocks={it.a} variant="faq" className="mt-3" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
