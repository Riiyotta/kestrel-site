import RuledFrame, { Footnotes, PlansRow } from '../components/ui/RuledFrame.jsx'
import PricingCard from '../components/ui/PricingCard.jsx'
import CompareTable from '../components/ui/CompareTable.jsx'
import FaqAccordion from '../components/ui/FaqAccordion.jsx'
import { GINTO, H2_SCALE } from '../components/ui/type.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'
import { compareColumns, compareGroups, faq, plans, pricingPage } from '../data/pricing.js'

// /pricing – SPEC_PAGES_A T5. Nav/Footer come from SiteLayout.
// T5.1 hero: section padding 140px 48px 60px (>=1200), 88px 24px 56px (810–1199), 72px 20px 48px (phone); wrapper
//   max-w 1280, padding 0 40px, row space-between (column below 1200, gap 20; phone: no side padding, padding-top
//   60 – read off pricing-390.png, where the text starts at x 20). H1 Cirka 75/72 −3 (58 / 48/50 / 40/40) = H2_SCALE.
//   Statement max-w 517, Ginto 20/26 #000 (16/20.8 phone; the 810–1199 size is not stated – 20/26 kept).
// T5.2–T5.4 sit in one RuledFrame: PlansRow (3 PricingCards) -> Footnotes -> CompareTable "pricing" (#compare,
//   the cards' "view all features" target) -> FaqAccordion "panel" with the sticky "FAQs" title.
// Motion is all inside the primitives (band + FAQ springs, FAQ title letter reveal); no section reveals on live.

export default function Pricing() {
  useDocumentTitle('Kestrel | Pricing')
  return (
    <div data-page="pricing">
      <section className="px-5 pb-12 pt-[72px] md:px-6 md:pb-14 md:pt-[88px] lg:px-12 lg:pb-[60px] lg:pt-[140px]">
        <div className="mx-auto flex max-w-container flex-col gap-5 pt-[60px] md:px-10 md:pt-0 lg:flex-row lg:justify-between">
          <h1 className={`text-ink ${H2_SCALE}`}>{pricingPage.title}</h1>
          <p className={`max-w-[517px] ${GINTO} text-body-16-md text-ink md:text-body-20`}>{pricingPage.statement}</p>
        </div>
      </section>

      <RuledFrame>
        <PlansRow>
          {plans.map((p) => (
            <PricingCard key={p.name} {...p} />
          ))}
        </PlansRow>
        <Footnotes note={pricingPage.footnote} link={pricingPage.machineLink} />
        <div id="compare">
          <CompareTable variant="pricing" columns={compareColumns} groups={compareGroups} />
        </div>
        <FaqAccordion look="panel" title="FAQs" items={faq} />
      </RuledFrame>
    </div>
  )
}
