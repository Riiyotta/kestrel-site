import Button from '../Button.jsx'
import PlaceholderLogo from '../PlaceholderLogo.jsx'
import ProductArt from './ProductArt.jsx'
import { BODY_SCALE, CIRKA, H2_SCALE, H3_SCALE } from '../ui/type.js'

// Coach bento stack – SPEC_PAGES_A T2.7 (/product/coach). Exports BentoBlock (header + BentoPanel), QuoteCard and
// CtaBanner. The page composes them inside the stack wrapper (padding 0 64px 20px, inner max-w 1200, gap 64).
//
// BentoBlock: block padding-top 50, column gap 42.
//   Header (gap 12): H2 Cirka 75/72 −3 left (H2 scale; 40/40 phone) + p Ginto 20/26 #666 (BODY scale), max-w 828.
//   Panel: bg #F2F2F2, radius 24, overflow clip.
//     layout "tabs-bottom": media 1200x549 on top, then 3 equal columns (400 wide, padding 32, column gap 25):
//       H3 Ginto 32/32 −1.28 + p 20/26 #808080. Phone: 350 wide, columns stacked.
//     layout "split": row; media 600 wide (600x671 or 600x600 – `mediaHeight`) + tabs column 600 (padding 24px 0)
//       with 3 stacked items (padding 32, column gap 25). `mediaSide` left | right. <1200 stacked, media first
//       (aspect kept). Live media = muted looping in-view videos / screenshots -> static ProductArt.
// QuoteCard: padding-top 50, row gap 16: photo 335² r16 + text card (flex 1, 849 @1440) #F2F2F2 r16 p24, backdrop
//   blur 39.6 (reused token): quote h5 Cirka 30/30 −1.2 with an inline <mark> bg #D7D5F1; footer row: name Ginto
//   Medium 20/25 #1C1C1C + role Ginto 20/26 #1C1C1C, customer logo 128x36 right. Phone stacked, photo 350², quote
//   24/24. Tablet (not measured): side by side from 810 (photo 335²), bento columns 3-up from 810.
// CtaBanner: 1200x205, bg #4348DC, radius 16, padding 24: H3 Cirka 60/60 −2.4 #FFF top-left, Button dark lg
//   bottom-right. Phone 350x159, H3 40/36.
// Motion: none measured (live bento videos play in view; static posters here).
function Item({ item }) {
  return (
    <div className="flex flex-col gap-[25px] p-8">
      <h3 className="font-framer font-sans text-title-32 text-ink">{item.title}</h3>
      <p className={`${BODY_SCALE} text-muted-3`}>{item.body}</p>
    </div>
  )
}

export function BentoBlock({ block }) {
  const { layout = 'tabs-bottom', mediaSide = 'left', mediaHeight = 600 } = block
  const media = (
    <div
      className={`relative w-full shrink-0 overflow-hidden ${
        layout === 'split' ? `lg:w-1/2 ${mediaHeight === 671 ? 'aspect-[600/671]' : 'aspect-square'}` : 'aspect-[1200/549]'
      }`}
    >
      <ProductArt scene={block.art.scene} tint={block.art.tint} />
    </div>
  )
  return (
    <div data-ui="bento-block" className="flex flex-col gap-[42px] pt-[50px]">
      <div className="flex flex-col gap-3">
        <h2 className={`text-left text-ink ${H2_SCALE}`}>{block.title}</h2>
        <p className={`max-w-[828px] ${BODY_SCALE} text-muted`}>{block.sub}</p>
      </div>
      {layout === 'split' ? (
        <div className={`flex flex-col overflow-clip rounded-photo bg-panel ${mediaSide === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          {media}
          <div className="flex w-full flex-col justify-center py-6 lg:w-1/2">
            {block.items.map((it, i) => (
              <Item key={i} item={it} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col overflow-clip rounded-photo bg-panel">
          {media}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {block.items.map((it, i) => (
              <Item key={i} item={it} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function QuoteCard({ quote }) {
  return (
    <figure data-ui="quote-card" className="flex flex-col gap-4 pt-[50px] md:flex-row">
      <div className="aspect-square w-full shrink-0 overflow-hidden rounded-card bg-gradient-to-br from-tint-lavender via-card-gray to-tint-yellow md:h-[335px] md:w-[335px]">
        {quote.img ? <img src={quote.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : null}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-8 rounded-card bg-panel p-6 backdrop-blur-quote-card">
        <blockquote>
          <h5 className={`${CIRKA} text-quote-phone tracking-display-sub text-ink xl:text-quote xl:tracking-display-sub`}>
            {quote.before}
            <mark className="bg-mark text-ink">{quote.mark}</mark>
            {quote.after}
          </h5>
        </blockquote>
        <figcaption className="flex items-end justify-between gap-4">
          <div>
            <p className="font-sans font-medium text-name-20 text-quote-ink">{quote.name}</p>
            <p className="font-sans text-body-20 text-quote-ink">{quote.role}</p>
          </div>
          <PlaceholderLogo name={quote.logo.name} shape={quote.logo.shape} w={128} h={36} />
        </figcaption>
      </div>
    </figure>
  )
}

export function CtaBanner({ title, cta }) {
  return (
    <div data-ui="cta-banner" className="flex h-[159px] flex-col justify-between rounded-card bg-brand-indigo p-6 md:h-[205px]">
      <h3 className={`text-white ${H3_SCALE}`}>{title}</h3>
      <div className="flex justify-end">
        <Button variant="dark" href={cta.href}>
          {cta.label}
        </Button>
      </div>
    </div>
  )
}
