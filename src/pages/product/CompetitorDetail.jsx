import { useParams } from 'react-router-dom'
import Stories from '../../components/Stories.jsx'
import CompareTable from '../../components/ui/CompareTable.jsx'
import FaqAccordion from '../../components/ui/FaqAccordion.jsx'
import LogoMarquee from '../../components/ui/LogoMarquee.jsx'
import { BODY_SCALE, CIRKA } from '../../components/ui/type.js'
import { VsFeatureCards, VsHero, VsIntroCards, VsTitle } from '../../components/company/Vs.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { getCompetitorDetail } from '../../data/competitors.js'
import NotFound from '../NotFound.jsx'

// /competitors/:slug – SPEC_PAGES_B T8 CompetitorDetail (Kestrel vs a generic category; data in competitors.js
// `competitorDetails`, slugs = the /competitors table slugs; unknown slugs render the 404). Nav/Footer from SiteLayout.
// Order: VsHero (868 @1440) -> "trusted by" label (Cirka 18/18 −0.72 centred) + LogoMarquee strip -> VsIntroCards
//   (padding 80) -> Table section (padding 80px 32px, gap 80): centred VsTitle (Cirka 60) + sub 20/26 rgba(0,0,0,.75)
//   (gap 16, not measured), CompareTable "matrix", VsFeatureCards -> Stories "testimonial" (padding 102 32, gap 80)
//   -> FAQ section (padding 102px 32px, gap 64; phone 0 20px) with FaqAccordion "cards" + its centred max-900 H2.
// Strip block padding is not in the spec: 46 above / 40 below, read off recon/pages/competitor-detail/
//   1440-comp-zendesk.png (label at y≈914, strip 935–1067, intro cards at 1186 = strip + 40 + 80). Strip width 1280
//   (container) as in the screenshot.
// Motion: testimonial slideshow (5s, Stories engine), FAQ cards open (~150ms), marquee 50 px/s. No scroll reveals.

export default function CompetitorDetail() {
  const { slug } = useParams()
  const data = getCompetitorDetail(slug)
  useDocumentTitle(data ? data.docTitle : 'Page not found | Kestrel')
  if (!data) return <NotFound />
  return (
    <div data-page="competitor-detail" data-slug={slug} className="overflow-x-clip">
      <VsHero data={data} />

      <div data-section="strip" className="flex flex-col items-center gap-2 px-5 pb-10 pt-[46px] md:px-8">
        <p className={`${CIRKA} text-center text-announce tracking-display-sub text-ink`}>{data.stripLabel}</p>
        <div className="w-full max-w-container">
          <LogoMarquee width="100%" label="Teams using Kestrel" />
        </div>
      </div>

      <VsIntroCards data={data} />

      <section data-section="table" className="flex flex-col items-center gap-20 px-5 py-20 md:px-8">
        <div className="flex flex-col items-center gap-4">
          <VsTitle them={data.them} as="h2" align="center" />
          <p className={`text-center ${BODY_SCALE} text-body-75`}>{data.tableSub}</p>
        </div>
        <CompareTable
          variant="matrix"
          className="w-full"
          columns={[
            { key: 'label', label: '' },
            { key: 'us', label: 'Kestrel' },
            { key: 'them', label: data.them.name },
          ]}
          groups={[{ rows: data.matrix.map((r) => ({ label: r.label, values: [r.us, r.them] })) }]}
        />
        <VsFeatureCards items={data.features} />
      </section>

      <Stories card="testimonial" title={data.testimonials.title} sub={data.testimonials.sub} items={data.testimonials.items} />

      <section data-section="faq" className="px-5 py-0 md:px-8 md:py-[102px]">
        <FaqAccordion look="cards" title={`Questions teams ask when comparing Kestrel with ${data.them.singular}s`} items={data.faq} />
      </section>
    </div>
  )
}
