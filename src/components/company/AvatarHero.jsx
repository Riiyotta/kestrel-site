import { motion, useReducedMotion } from 'framer-motion'
import Button from '../Button.jsx'
import { H1_SCALE } from '../ui/type.js'

// AvatarHero – SPEC_PAGES_C C1 (/careers).
//   Section 900 tall (>=810; phone: auto, padding-top 200, 682 on live), overflow hidden, column centred
//   (justify centre >=1200, flex-end <=1199). Background: CSS stand-in for the decorative PNG (soft green radial glow
//   with faint grid lines) = bg-careers-glow, contained.
//   Content column gap 32: H1 (2 lines) Cirka 96/96 -> 77 -> 58 -> 40 centred + Button dark size "xl" (142x50,
//   label 14/18) anchoring to #open-roles.
//   10 avatar tiles 100x100, radius 24, cover.
//   >=1200: absolutely placed, mirrored left/right (x from the left edge for L, from the right edge for R):
//     1440: (37,77) (245,169) (37,398) (190,578) (51,724)   1280: (27,77) (212,169) (27,398) (163,578) (40,724)
//   <=1199: two rows of 5 tiles below the button (gap 16, rows 120 apart; first row 90 below the button, sampled from
//     the 1000/390 y values 670/790 and 452/572), row 1 moving left and row 2 right at 30 px/s, linear, infinite.
//     The section bottom sits ~10 below the second row (900 @1000, 682 @390).
// Motion (>=1200, on load): each tile opacity .001 -> 1, tween 0.8s ease [0.44,0,0.56,1]; outer tiles (x 37/51 and
//   mirrors) delay 0, inner tiles (x 190/245 and mirrors) delay 0.5s. Heading/button: no animation.
//   prefers-reduced-motion: tiles shown at once, tickers static.

const EASE = [0.44, 0, 0.56, 1]
// [className for x/y at lg and xl, inner?]
const SLOTS = [
  ['top-[77px] lg:left-[27px] xl:left-[37px]', false],
  ['top-[169px] lg:left-[212px] xl:left-[245px]', true],
  ['top-[398px] lg:left-[27px] xl:left-[37px]', false],
  ['top-[578px] lg:left-[163px] xl:left-[190px]', true],
  ['top-[724px] lg:left-[40px] xl:left-[51px]', false],
  ['top-[77px] lg:right-[27px] xl:right-[37px]', false],
  ['top-[169px] lg:right-[212px] xl:right-[245px]', true],
  ['top-[398px] lg:right-[27px] xl:right-[37px]', false],
  ['top-[578px] lg:right-[163px] xl:right-[190px]', true],
  ['top-[724px] lg:right-[40px] xl:right-[51px]', false],
]

function Tile({ src, className = '' }) {
  return (
    <span className={`block h-[100px] w-[100px] shrink-0 overflow-hidden rounded-photo bg-gradient-to-br from-tint-green via-card-gray to-tint-lavender ${className}`}>
      {src ? <img src={src} alt="" loading="eager" decoding="async" className="h-full w-full object-cover" /> : null}
    </span>
  )
}

const LOOP = 5 * (100 + 16) // one set of 5 tiles + gaps = 580px

function TickerRow({ avatars, direction }) {
  const reduce = useReducedMotion()
  return (
    <div className="w-full overflow-hidden">
      <div
        data-motion="avatar-ticker"
        data-direction={direction}
        className={`flex w-max gap-4 ${reduce ? '' : direction === 'right' ? 'marquee-right' : 'marquee-left'}`}
        style={reduce ? undefined : { '--marquee-loop': `${LOOP}px`, animationDuration: `${LOOP / 30}s` }}
      >
        {Array.from({ length: 5 }, (_, c) => avatars.map((src, i) => <Tile key={`${c}-${i}`} src={src} />))}
      </div>
    </div>
  )
}

export default function AvatarHero({ lines, cta, avatars }) {
  const reduce = useReducedMotion()
  return (
    <section data-section="avatar-hero" className="relative flex flex-col items-center justify-end overflow-hidden pb-2.5 pt-[200px] md:h-[900px] md:pt-0 lg:justify-center lg:pb-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-careers-glow bg-contain bg-center bg-no-repeat" />
      <div className="relative flex flex-col items-center gap-8 px-5">
        <h1 className={`text-center text-ink ${H1_SCALE}`}>
          {lines[0]}
          <br />
          {lines[1]}
        </h1>
        <Button size="xl" href={cta.href}>
          {cta.label}
        </Button>
      </div>

      {/* >=1200: ten floating tiles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        {SLOTS.map(([pos, inner], i) => (
          <motion.span
            key={i}
            data-motion="avatar-fade"
            className={`absolute ${pos}`}
            initial={reduce ? false : { opacity: 0.001 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: inner ? 0.5 : 0 }}
          >
            <Tile src={avatars[i]} />
          </motion.span>
        ))}
      </div>

      {/* <=1199: two opposing 30 px/s tickers */}
      <div aria-hidden="true" className="relative mt-[90px] flex w-full flex-col gap-5 lg:hidden">
        <TickerRow avatars={avatars.slice(0, 5)} direction="left" />
        <TickerRow avatars={avatars.slice(5, 10)} direction="right" />
      </div>
    </section>
  )
}
