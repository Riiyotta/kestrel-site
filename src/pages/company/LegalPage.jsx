import RichText from '../../components/ui/RichText.jsx'
import { H1_SCALE } from '../../components/ui/type.js'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { getLegalPage } from '../../data/legal.js'

// LegalPage – SPEC_PAGES_C T3 (/privacy-policy, /terms-of-service). One template, content from src/data/legal.js.
//   Column: flex column centred, max-width 1000, margin 0 auto, padding 160px 40px 96px (>=1200) / 160px 32px 96px
//   (<1200) -> content 920 / 936 @1000 / 326 @390.
//   H1: Cirka 96/77/58/40 (H1_SCALE), centred.
//   Rhythm: H1 -> first block and section -> next H4 = 72 (>=1200). Below 1200 the live pages differ (privacy 24,
//   terms 100, a Framer inconsistency); kept per page via `sectionGapSm` because it is a one-class change.
//   H4 -> body 24 and paragraph -> paragraph 20 come from RichText variant "legal" (ui.css).
//   Body Ginto 20/26 -> 18/23.4 -> 16/20.8 #000 pre-wrap; H4 Cirka 40/36 (36/36 <1440). No TOC, no motion.
//   The stray "P22 Mackinac" first H4 on terms @390 is normalised to the Cirka H4 (spec).

// Below-1200 gaps. Class names written out so Tailwind sees them. The RichText override needs `!` to beat the
// `.rt--legal > * + :is(h2,h3,h4)` rule in ui.css regardless of stylesheet order.
const GAP_SM = {
  24: { col: 'gap-6', body: '' },
  100: { col: 'gap-[100px]', body: 'max-lg:[&>*+h4]:!mt-[100px]' },
}

export default function LegalPage({ slug }) {
  const page = getLegalPage(slug)
  useDocumentTitle(page.docTitle)
  const gap = GAP_SM[page.sectionGapSm] ?? GAP_SM[24]
  return (
    <article
      data-section="legal"
      data-page={page.slug}
      className={`mx-auto flex w-full max-w-[1000px] flex-col items-center px-8 pb-24 pt-40 lg:gap-[72px] lg:px-10 ${gap.col}`}
    >
      <h1 className={`w-full text-center text-ink ${H1_SCALE}`}>{page.title}</h1>
      <RichText blocks={page.body} variant="legal" className={`w-full ${gap.body}`} />
    </article>
  )
}
