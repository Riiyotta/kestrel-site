import RichText from './RichText.jsx'
import { H2_SCALE } from './type.js'

// ProseSection – SPEC_PAGES_A P1 ("Tools Section" / "Related Reading" / static "FAQ Section"): optional H2 +
// N items of (optional H3 + rich text). Composes RichText variant "prose".
//   Section: max-w 1200 centred (1200 wide up to 1280 = min(1200, 100vw − 80) at >=1200), padding 60px 80px,
//   column gap 48 (H2 -> items), overflow clip. Items column gap 40; item H3 -> body gap 12.
//   H2: Cirka 75/72 −3 -> 58/58 -> 48/50 -> 40/40, left. H3: Ginto 32/32 −1.28 #000 at every width.
//   Body: RichText "prose" (20/26 #808080 -> 18/23.4 -> 16/20.8, 20px block gap, disc bullets, #4348DC links).
// Side padding is per page (measured live quirk):
//   tabletPad 80 (T1 Tools/Related, default) | 32 (T1 FAQ, /product, /coach)       -> 1000px wide section
//   phonePad  80 (T1 + /voice Tools/Related: 230px column, intentional) | 20 (FAQ, /product, /coach)
// Static: no accordion, no hover, no motion. (Use FaqAccordion for collapsible FAQs.)

const TABLET = { 80: 'md:px-20', 32: 'md:px-8' }
const PHONE = { 80: 'px-20', 20: 'px-5' }

export default function ProseSection({ title, items = [], tabletPad = 80, phonePad = 80, titleAs: H = 'h2', itemTitleAs: H3 = 'h3', className = '' }) {
  return (
    <section
      data-ui="prose-section"
      className={`mx-auto flex w-full flex-col gap-12 overflow-clip py-[60px] ${PHONE[phonePad] ?? 'px-20'} ${TABLET[tabletPad] ?? 'md:px-20'} lg:w-[min(1200px,calc(100%-80px))] lg:px-20 ${className}`}
    >
      {title ? <H className={`text-left text-ink ${H2_SCALE}`}>{title}</H> : null}
      <div className="flex flex-col gap-10">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-3">
            {item.title ? <H3 className="font-framer font-sans text-title-32 text-ink">{item.title}</H3> : null}
            <RichText blocks={item.blocks || []} variant="prose" />
          </div>
        ))}
      </div>
    </section>
  )
}
