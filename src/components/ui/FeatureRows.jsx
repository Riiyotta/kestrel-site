import Button from '../Button.jsx'
import { BODY_SCALE, SMALL_SCALE } from './type.js'

// FeatureRows – SPEC_PAGES_A P3 (T1.5), T1.7 callout and T2.4 600² rows. Image boxes are content placeholders
// (pass `image: { src, alt, position }` or leave empty for a tint block of the same box).
//
// variant "472" (default, T1.5): section max-w 1200, padding 60px 80px (tablet 60px 32px, phone 60px 20px), rows
//   82 apart. >=1200: row 1040 wide, centred items; image-left rows gap 48 + text 520, image 472² radius 8;
//   image-right rows gap 95 + text 473, image radius 6. <1200: column, gap 32, image first, square image full width.
//   Text column gap 16: eyebrow Ginto 14/18 #9C9C96 (13/18 810–1439, 13/14.3 phone) -> H3 Ginto 32/32 −1.28 #000
//   -> body Ginto 20/26 #808080 (18/23.4, 16/20.8). Rows alternate starting image-left (`startSide`).
// variant "callout" (T1.7): the same shell with one image-left row (472², radius 8, text 520, gap 16) and a
//   `Button` dark lg under the body. Tablet + phone padding 60px 32px (image 326² @390).
// variant "600" (T2.4 /product): rows 1200x600, 92 apart, max-w 1200 (1152 @1280 = 64px gutters), no gap between
//   image (600², radius 12) and text column (600 wide, padding 32px 48px 32px 0 when text is left /
//   32px 0 32px 48px when right, column gap 25): H2 Ginto 38/42 −1.52 -> body 20/26 #808080 -> Button dark lg.
//   First row text-left. <1200 stacked, image first (936² / 350²), text padding-top 24 on phone (tablet value not measured: 24 too). Section
//   vertical padding is not in the spec (rows only) – pass className.
// No hover, no motion (A T1 / T2: none measured).
// Optional `row.art` (ReactNode, added for the product templates): drawn inside the image box when there is no
// `image.src` (e.g. a ProductArt illustration). Rows without it render exactly as before.

const PLACEHOLDER = 'bg-gradient-to-br from-tint-lavender via-white to-tint-pink'

function Img({ image, art, className }) {
  return (
    <div className={`relative aspect-square w-full shrink-0 overflow-hidden ${PLACEHOLDER} ${className}`}>
      {!image?.src && art ? art : null}
      {image?.src ? (
        <img src={image.src} alt={image.alt || ''} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={image.position ? { objectPosition: image.position } : undefined} />
      ) : null}
    </div>
  )
}

function Row472({ row, imageLeft, callout }) {
  return (
    <div className={`flex w-full flex-col gap-8 lg:w-[1040px] lg:items-center ${imageLeft ? 'lg:flex-row lg:gap-12' : 'lg:flex-row-reverse lg:gap-[95px]'}`}>
      <Img image={row.image} art={row.art} className={`lg:w-[472px] ${imageLeft ? 'rounded-sm' : 'rounded-photo-sm'}`} />
      <div className={`flex w-full flex-col gap-4 lg:shrink-0 ${imageLeft ? 'lg:w-[520px]' : 'lg:w-[473px]'}`}>
        {row.eyebrow ? <p className={`${SMALL_SCALE} text-feature-eyebrow`}>{row.eyebrow}</p> : null}
        <h3 className="font-framer font-sans text-title-32 text-ink">{row.title}</h3>
        <p className={`${BODY_SCALE} text-muted-3`}>{row.body}</p>
        {callout && row.cta ? (
          <div>
            <Button variant="dark" href={row.cta.href || '#'}>
              {row.cta.label}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function Row600({ row, textLeft }) {
  return (
    <div className={`flex w-full flex-col lg:items-stretch ${textLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
      <Img image={row.image} art={row.art} className="rounded-playbook lg:w-1/2" />
      <div className={`flex w-full flex-col justify-center gap-[25px] rounded-playbook pt-6 lg:w-1/2 lg:py-8 ${textLeft ? 'lg:pl-0 lg:pr-12' : 'lg:pl-12 lg:pr-0'}`}>
        <h2 className="font-framer font-sans text-title-38 text-ink">{row.title}</h2>
        {(Array.isArray(row.body) ? row.body : [row.body]).map((p, i) => (
          <p key={i} className={`${BODY_SCALE} text-muted-3`}>
            {p}
          </p>
        ))}
        {row.cta ? (
          <div>
            <Button variant="dark" href={row.cta.href || '#'}>
              {row.cta.label}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function FeatureRows({ rows = [], variant = '472', startSide = 'left', className = '' }) {
  if (variant === '600') {
    return (
      <section data-ui="feature-rows" data-variant="600" className={`mx-auto flex w-full max-w-[1328px] flex-col gap-[92px] px-5 md:px-8 lg:px-16 ${className}`}>
        {rows.map((row, i) => (
          <Row600 key={i} row={row} textLeft={i % 2 === 0} />
        ))}
      </section>
    )
  }
  const callout = variant === 'callout'
  const list = callout ? rows.slice(0, 1) : rows
  return (
    <section
      data-ui="feature-rows"
      data-variant={variant}
      className={`mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[82px] py-[60px] ${callout ? 'px-8' : 'px-5 md:px-8'} lg:px-20 ${className}`}
    >
      {list.map((row, i) => (
        <Row472 key={i} row={row} callout={callout} imageLeft={callout || (i % 2 === 0) === (startSide === 'left')} />
      ))}
    </section>
  )
}
