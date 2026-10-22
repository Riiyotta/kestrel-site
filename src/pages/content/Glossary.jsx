import { BODY_SCALE, H3_SCALE, SMALL_SCALE } from '../../components/ui/type.js'
import TermIndex from '../../components/content/TermIndex.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { glossary } from '../../data/glossary.js'

// T11 Glossary – SPEC_PAGES_B T11.
// Hero: bg #FBFAF9, padding 140 60 80 (1280: 120 40 60; 1000: 120 32 48, stacked gap 24; 390: 120 20 40); inner row
//   max-w 1200, gap 60 (40 @1280), centred: left 570 (520 @1280, gap 24): eyebrow 14/18 (13/18, 13/14.3), H1 Cirka
//   60/60 (50 / 40 / 40-36); right 570: intro 20/26 rgba(0,0,0,.75) (18/23.4, 16/20.8).
// Content: padding-top 60, bottom 80, TermIndex. Side padding of the content block follows the hero's.

export default function Glossary() {
  useDocumentTitle('Glossary | Kestrel')
  return (
    <div data-page="glossary">
      <section data-section="glossary-hero" className="bg-glossary-bg px-5 pb-10 pt-[120px] md:px-8 md:pb-12 lg:px-10 lg:pb-[60px] xl:px-[60px] xl:pb-20 xl:pt-[140px]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 lg:flex-row lg:items-center lg:gap-10 xl:gap-[60px]">
          <div className="flex flex-col gap-6 lg:w-[520px] lg:shrink-0 xl:w-[570px]">
            <p className={`text-ink ${SMALL_SCALE}`}>{glossary.eyebrow}</p>
            <h1 className={`text-ink ${H3_SCALE}`}>{glossary.title}</h1>
          </div>
          <p className={`text-body-75 lg:w-[520px] xl:w-[570px] ${BODY_SCALE}`}>{glossary.intro}</p>
        </div>
      </section>
      <section data-section="glossary-terms" className="px-5 pb-20 pt-[60px] md:px-8 lg:px-10 xl:px-[60px]">
        <TermIndex groups={glossary.groups} />
      </section>
    </div>
  )
}
