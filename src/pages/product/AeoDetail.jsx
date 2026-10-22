import Stories from '../../components/Stories.jsx'
import FeatureRows from '../../components/ui/FeatureRows.jsx'
import LogoMarquee from '../../components/ui/LogoMarquee.jsx'
import ProseSection from '../../components/ui/ProseSection.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import EventBlock from '../../components/product/EventBlock.jsx'
import ProductArt from '../../components/product/ProductArt.jsx'
import SplitHero from '../../components/product/SplitHero.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { getAeoPage } from '../../data/productPages.js'
import NotFound from '../NotFound.jsx'

// AEO detail – SPEC_PAGES_A T1, one data-driven template for /product/{ai-agents, guardrails, how-it-works,
// outbound, quality-assurance, simulations, trust} (src/data/productPages.js) and /industry/{financial-services,
// healthcare, insurance} (src/data/industryPages.js). Nav/Footer come from SiteLayout.
// Section order: T1.1 SplitHero -> T1.2 logo ticker -> T1.3 Tools prose -> T1.4 H2 band -> T1.5 FeatureRows 472 x3
//   -> T1.6 Stories "wide" (optional, tint pink/peach) -> T1.7 callout (+ T1.7b healthcare EventBlock) -> T1.8
//   Related reading (optional; absent on industry pages) -> T1.9 static FAQ -> Footer.
// T1.2 ticker: wrapper column, padding 32px 89px (>=1200) / 32px (810–1199) / 32px 20px, 196 tall at every width;
//   LogoMarquee card 1200 max (1102 @1280, 936 @1000, 350 @390), 11 logos, 50.8 px/s, no reveal.
// T1.9 FAQ: ProseSection with padding 60px 32px @1000 and 60px 20px @390 (Tools/Related keep the 80px quirk).
// Motion: none of the sections reveal on scroll (T1 has no scroll reveals). Loops: ticker, story slideshow.

export default function AeoDetail({ slug }) {
  const page = getAeoPage(slug)
  useDocumentTitle(page ? page.docTitle : 'Page not found | Kestrel')
  if (!page) return <NotFound />
  const art = (a) => <ProductArt scene={a.scene} tint={a.tint} />
  return (
    <div data-page="aeo-detail" data-slug={slug}>
      <SplitHero hero={page.hero} h1Size={page.h1Size} />

      <div data-section="ticker" className="flex flex-col items-center px-5 py-8 md:px-8 lg:px-[89px]">
        <div className="w-full max-w-[1200px]">
          <LogoMarquee logos={page.logos} speed={50.8} label="Teams using Kestrel" />
        </div>
      </div>

      <ProseSection title={page.tools.title} items={page.tools.items} />

      <SectionHeading variant="band" title={page.band} />

      <FeatureRows rows={page.rows.map((r) => ({ ...r, art: art(r.art) }))} />

      {page.stories ? <Stories card="wide" tint={page.stories.tint} title={page.stories.title} items={page.stories.items} /> : null}

      <FeatureRows variant="callout" rows={[{ ...page.callout, art: art(page.callout.art) }]} className={page.event ? '!pb-0' : ''} />
      {page.event ? <EventBlock event={page.event} /> : null}

      {page.related ? <ProseSection items={[{ title: page.related.title, blocks: [{ type: 'ul', items: page.related.links }] }]} /> : null}

      <ProseSection
        title={page.faq.title}
        tabletPad={32}
        phonePad={20}
        items={page.faq.items.map((f) => ({ title: f.q, blocks: [{ type: 'p', html: f.a }] }))}
      />
    </div>
  )
}
