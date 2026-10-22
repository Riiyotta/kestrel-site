import Button from '../../components/Button.jsx'
import ProseSection from '../../components/ui/ProseSection.jsx'
import { H1_SCALE, BODY_SCALE } from '../../components/ui/type.js'
import { BentoBlock, CtaBanner, QuoteCard } from '../../components/product/Coach.jsx'
import TickerBlock from '../../components/product/TickerBlock.jsx'
import VideoFrame from '../../components/product/VideoFrame.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { copilotPage as page } from '../../data/productLandings.js'

// /product/coach – SPEC_PAGES_A T2 (doc height 11965 @1440). Nav/Footer from SiteLayout.
// T2.1 hero (0–1760): wrapper padding 0 50px 90px 52px (tablet 32 / phone 20 sides: not measured), inner Hero
//   padding-top 160, column gap 62 between text / video / buttons / ticker. H1 96/77/58/40 (1 line); two paragraphs
//   Ginto 20/26 #333 max-w 700 (16/20.8 phone; paragraph gap not measured: 20). VideoFrame "coach" 1200x628. Buttons
//   dark + light lg. TickerBlock "line" (Cirka 30 line + 1338 card).
// P1 Tools (padding 60px 32px @1000, 60px 20px @390). T2.7 bento stack (wrapper padding 0 64px 20px, max-w 1200,
//   gap 64): BentoBlock / QuoteCard / CtaBanner from src/components/product/Coach.jsx. P1 Related, P1 FAQ.
// Motion: ticker loop only (no scroll reveals; live bento videos are static posters here).

export default function Copilot() {
  useDocumentTitle(page.docTitle)
  return (
    <div data-page="copilot">
      <section data-section="hero" className="flex flex-col items-center gap-[62px] px-5 pb-[90px] pt-40 md:px-8 lg:pl-[52px] lg:pr-[50px]">
        <div className="flex w-full flex-col items-center gap-4 md:px-8">
          <h1 className={`text-center text-ink ${H1_SCALE}`}>{page.hero.title}</h1>
          <div className="flex max-w-[700px] flex-col gap-5">
            {page.hero.paragraphs.map((t, i) => (
              <p key={i} className={`text-center ${BODY_SCALE} text-body`}>
                {t}
              </p>
            ))}
          </div>
        </div>
        <VideoFrame variant="coach" art={page.hero.art} label="Copilot product video" className="max-w-[1200px]" />
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="dark" href="/get-a-demo">
            Book a demo
          </Button>
          <Button variant="light" href="#">
            Start free trial
          </Button>
        </div>
        <TickerBlock line={page.hero.tickerLine} />
      </section>

      <ProseSection title={page.tools.title} items={page.tools.items} tabletPad={32} phonePad={20} />

      <section data-section="bento" className="px-5 pb-5 md:px-8 lg:px-16">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-16">
          {page.bento.map((b, i) => {
            if (b.kind === 'quote') return <QuoteCard key={i} quote={b} />
            if (b.kind === 'cta') return <CtaBanner key={i} title={b.title} cta={b.cta} />
            return <BentoBlock key={i} block={b} />
          })}
        </div>
      </section>

      <ProseSection items={[{ title: page.related.title, blocks: [{ type: 'ul', items: page.related.links }] }]} tabletPad={32} phonePad={20} />
      <ProseSection
        title={page.faq.title}
        tabletPad={32}
        phonePad={20}
        items={page.faq.items.map((f) => ({ title: f.q, blocks: [{ type: 'p', html: f.a }] }))}
      />
    </div>
  )
}
