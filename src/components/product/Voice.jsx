import Button from '../Button.jsx'
import ProductArt from './ProductArt.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { CIRKA, SUB_SCALE } from '../ui/type.js'
import '../ui/ui.css'

// /product/voice bespoke sections – SPEC_PAGES_A T2.8 SplitExplainer and T2.9 CaseStudyCard.
//
// SplitExplainer (`Layout / 105 /`): padding 112px 32px, max-w 1440, column gap 80.
//   Header centred, gap 46 to the button: H2 Cirka 60/60 −2.4 (H3 scale) + sub 20/26 rgba(0,0,0,.75) (title -> sub
//   gap not measured: 16, as the other T2 headers) + Button dark lg.
//   Body row gap 80: image 648x673 radius 12 (content -> ProductArt) + text column 648, column gap 27: 3 paragraphs
//   Ginto 24/30 −0.48 #000 (hero-sub scale; 14/17 phone). <1200 stacked, image first.
// CaseStudyCard: section as T2.8 (padding 112px 32px, gap 80, header H2 + sub). Card 1376x400, bg #FBFBFB, radius
//   12, 1px solid #000, overflow hidden: image 640x400 (co-branded photo -> ProductArt) + content (padding 48,
//   column gap 32): H3 Cirka 40/36 −1.6 (36/36 phone) -> p Ginto 16/22.4 #000 (14/19.6 phone) with an inline
//   #4348DC link -> Button dark lg. Phone stacked 350 wide.
// Motion: none.

export function SplitExplainer({ data }) {
  return (
    <section data-section="split-explainer" className="mx-auto flex w-full max-w-page flex-col items-center gap-20 px-8 py-[112px] max-md:px-5">
      <div className="flex flex-col items-center gap-[46px]">
        <SectionHeading size="h3" gap={16} title={data.title} sub={data.sub} titleClassName="max-w-[1100px] mx-auto" />
        <Button variant="dark" href={data.cta.href}>
          {data.cta.label}
        </Button>
      </div>
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        <div className="relative aspect-[648/673] w-full shrink-0 overflow-hidden rounded-playbook lg:w-[calc(50%-40px)]">
          <ProductArt scene={data.art.scene} tint={data.art.tint} />
        </div>
        <div className="flex w-full flex-col gap-[27px] lg:w-[calc(50%-40px)]">
          {data.paragraphs.map((t, i) => (
            <p key={i} className={`${SUB_SCALE} text-ink`}>
              {t}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CaseStudyCard({ data }) {
  return (
    <section data-section="case-study" className="mx-auto flex w-full max-w-page flex-col items-center gap-20 px-5 py-[112px] md:px-8">
      <SectionHeading size="h3" gap={16} title={data.title} sub={data.sub} />
      <article className="flex w-full flex-col overflow-hidden rounded-playbook border border-ink bg-meta-card lg:h-[400px] lg:flex-row">
        <div className="relative aspect-[640/400] w-full shrink-0 lg:aspect-auto lg:h-full lg:w-[46.5%]">
          <ProductArt scene={data.art.scene} tint={data.art.tint} />
        </div>
        <div className="flex flex-col items-start justify-center gap-8 p-6 md:p-12">
          <h3 className={`${CIRKA} text-compare-lg tracking-display-sub text-ink xl:text-compare-xl xl:tracking-display-sub`}>{data.cardTitle}</h3>
          <p className="ui-inline font-sans text-para-14-phone text-ink md:text-body-16" dangerouslySetInnerHTML={{ __html: data.body }} />
          <Button variant="dark" href={data.cta.href}>
            {data.cta.label}
          </Button>
        </div>
      </article>
    </section>
  )
}
