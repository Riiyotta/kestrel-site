import Button from '../../components/Button.jsx'
import Stories from '../../components/Stories.jsx'
import CardCarousel from '../../components/ui/CardCarousel.jsx'
import FeatureRows from '../../components/ui/FeatureRows.jsx'
import HeroHeadline from '../../components/ui/HeroHeadline.jsx'
import ProseSection from '../../components/ui/ProseSection.jsx'
import ProductArt from '../../components/product/ProductArt.jsx'
import TickerBlock from '../../components/product/TickerBlock.jsx'
import { BlogGrid, CarouselHeader, OrbitSection } from '../../components/product/ProductSections.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { productHome as page } from '../../data/productLandings.js'
import { blogPosts } from '../../data/blog.js'
import { integrationHref, orbitTiles } from '../../data/integrations.js'

// /product – SPEC_PAGES_A T2 (doc height 11824 @1440). Nav/Footer from SiteLayout.
// T2.1 hero (0–933): padding 180px 64px 0 (180px 20px phone); HeroHeadline H1 96/77/58/40 (max-w 800 @1000), sub
//   24/30 −0.48 #000 max-w 80% (1050 @1440), Button dark lg + light lg 32 below; header block padding-bottom 80;
//   then the Logo Wall (TickerBlock "wall": 1184 card, padding 46 64 25).
// P1 Tools (933–2047; padding 60px 32px @1000, 60px 20px @390).
// T2.3 channel carousel (2159–3094): 112 below Tools (section offsets), max-w 1200, gap 80, padding-bottom 102;
//   CarouselHeader (Ginto 64/77 + sub) + CardCarousel snap, 332² cards.
// T2.4 FeatureRows "600" x5 (3186–6546): 92 below the carousel, rows 92 apart, text-left first.
// T2.5 OrbitSection (6658–7292): 112 below the rows. Stories "split" (7292–8029). P1 Related, P1 FAQ. T2.6 BlogGrid.
// Motion: ticker loops, orbit loop, story slideshow 5s, carousel arrow scroll 390ms. No scroll reveals.

const art = (a) => <ProductArt scene={a.scene} tint={a.tint} />

export default function ProductHome() {
  useDocumentTitle(page.docTitle)
  return (
    <div data-page="product-home">
      <section data-section="hero" className="flex flex-col items-center px-5 pt-[180px] md:px-8 lg:px-16">
        <HeroHeadline
          className="pb-20"
          title={page.hero.title}
          titleClassName="md:max-w-[800px] lg:max-w-none"
          sub={page.hero.sub}
          subColor="ink"
          subMaxWidth="lg:max-w-[80%]"
          actionsGap={32}
          actions={
            <>
              <Button variant="dark" href="/get-a-demo">
                Book a demo
              </Button>
              <Button variant="light" href="#">
                Start free trial
              </Button>
            </>
          }
        />
      </section>
      <TickerBlock variant="wall" />

      <ProseSection title={page.tools.title} items={page.tools.items} tabletPad={32} phonePad={20} />

      <section data-section="channels" className="mx-auto mt-[112px] flex w-full max-w-[1200px] flex-col gap-20 pb-[102px]">
        <CarouselHeader title={page.carousel.title} sub={page.carousel.sub} />
        <CardCarousel items={page.carousel.items.map((it) => ({ ...it, art: art(it.art) }))} card="square" label="Channels" trackClassName="px-5 lg:px-0" />
      </section>

      <FeatureRows variant="600" className="pt-[92px]" rows={page.rows.map((r) => ({ ...r, art: art(r.art) }))} />

      <div className="mt-[112px]">
        <OrbitSection data={page.orbit} tiles={orbitTiles} hrefFor={integrationHref} />
      </div>

      <Stories card="split" title={page.stories.title} items={page.stories.items} />

      <ProseSection items={[{ title: page.related.title, blocks: [{ type: 'ul', items: page.related.links }] }]} tabletPad={32} phonePad={20} />
      <ProseSection
        title={page.faq.title}
        tabletPad={32}
        phonePad={20}
        items={page.faq.items.map((f) => ({ title: f.q, blocks: [{ type: 'p', html: f.a }] }))}
      />

      <BlogGrid title={page.blog.title} posts={blogPosts.filter((b) => !b.slug.startsWith('roost')).slice(0, 3)} cta={page.blog.cta} />
    </div>
  )
}
