import Button from '../../components/Button.jsx'
import CardCarousel from '../../components/ui/CardCarousel.jsx'
import ProseSection from '../../components/ui/ProseSection.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import { BODY_SCALE, H1_SCALE, SUB_SCALE } from '../../components/ui/type.js'
import ProductArt from '../../components/product/ProductArt.jsx'
import TickerBlock from '../../components/product/TickerBlock.jsx'
import VideoFrame from '../../components/product/VideoFrame.jsx'
import { CaseStudyCard, SplitExplainer } from '../../components/product/Voice.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { voicePage as page } from '../../data/productLandings.js'

// /product/voice – SPEC_PAGES_A T2 (doc height 9382 @1440). Nav/Footer from SiteLayout.
// T2.1 hero (0–1882): wrapper padding 0 50px 60px 52px, inner padding-top 160, column gap 62. Background = the
//   homepage Hero-Unicorn-Bg stand-in (same classes as Hero.jsx: .hero-glow-placeholder + .hero-glow-drift),
//   2023x1299 (1863x1197 @1200–1439) centred at y 122, mask 66→84% (in the class), static position (no scroll
//   transform on /voice). Below 1200 the homepage phone geometry (viewport + 437 wide, 827:531) is used; its top
//   (230) is sampled from recon/pages/product-landing/voice-390.png.
//   Text: H1 96/77/58/40 max-w 850 (2 lines); Subheading 24/30 −0.48 #000 (hero-sub scale) + Intro 20/26 #1A1A1A
//   (16/20.8 phone), gap 37; buttons below the text. VideoFrame "voice" 1338x753 (autoplay, hidden controls).
//   TickerBlock "line" ("supporting" line + 1338 card).
// P1 Tools + Related keep the 80px phone padding (230px column quirk), FAQ uses 32 / 20.
// T2.3 principles carousel: padding 102px 0 102px 32px (full-bleed right, max-w 1440), gap 80; heading Cirka 60/60
//   left + sub left (SectionHeading h3, align left, gap 16); CardCarousel snap, 332x217 "rectangle" cards.
// T2.8 SplitExplainer, T2.9 CaseStudyCard (src/components/product/Voice.jsx).
// Motion: glow drift (homepage stand-in loop), ticker loop, carousel arrow scroll 390ms. No scroll reveals.

const art = (a) => <ProductArt scene={a.scene} tint={a.tint} />

export default function Voice() {
  useDocumentTitle(page.docTitle)
  return (
    <div data-page="voice">
      <section data-section="hero" className="relative flex flex-col items-center gap-[62px] overflow-clip px-5 pb-[60px] pt-40 md:px-8 lg:pl-[52px] lg:pr-[50px]">
        <div
          aria-hidden="true"
          className="hero-glow-placeholder hero-glow-drift pointer-events-none absolute left-1/2 top-[230px] aspect-[827/531] w-[calc(100%+437px)] -translate-x-1/2 lg:top-[122px] lg:aspect-auto lg:h-[1197px] lg:w-[1863px] xl:h-[1299px] xl:w-[2023px]"
        >
          <div className="hero-glow-placeholder__colour" />
          <div className="hero-glow-placeholder__stripes" />
        </div>
        <div className="relative flex w-full max-w-[850px] flex-col items-center gap-8 md:px-8">
          <h1 className={`text-center text-ink ${H1_SCALE}`}>{page.hero.title}</h1>
          <div className="flex flex-col items-center gap-[37px] text-center">
            <p className={`${SUB_SCALE} text-ink`}>{page.hero.sub}</p>
            <p className={`${BODY_SCALE} text-ink-900`}>{page.hero.intro}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="dark" href="/get-a-demo">
              Book a demo
            </Button>
            <Button variant="light" href="#">
              Start free trial
            </Button>
          </div>
        </div>
        <VideoFrame variant="voice" art={page.hero.art} label="Kestrel Voice video" className="relative" />
        <div className="relative w-full">
          <TickerBlock line={page.hero.tickerLine} />
        </div>
      </section>

      <ProseSection title={page.tools.title} items={page.tools.items} />

      <section data-section="principles" className="mx-auto flex w-full max-w-page flex-col gap-20 py-[102px] pl-5 md:pl-8">
        <SectionHeading size="h3" gap={16} align="left" title={page.carousel.title} sub={page.carousel.sub} className="pr-5 md:pr-8" />
        <CardCarousel items={page.carousel.items.map((it) => ({ ...it, art: art(it.art) }))} card="rectangle" label="Voice principles" />
      </section>

      <SplitExplainer data={page.explainer} />
      <CaseStudyCard data={page.caseStudy} />

      <ProseSection items={[{ title: page.related.title, blocks: [{ type: 'ul', items: page.related.links }] }]} />
      <ProseSection
        title={page.faq.title}
        tabletPad={32}
        phonePad={20}
        items={page.faq.items.map((f) => ({ title: f.q, blocks: [{ type: 'p', html: f.a }] }))}
      />
    </div>
  )
}
