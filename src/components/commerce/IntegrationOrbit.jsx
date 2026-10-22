import { motion, useReducedMotion } from 'framer-motion'
import PlaceholderLogo from '../PlaceholderLogo.jsx'
import { KestrelMark } from '../Logo.jsx'

// IntegrationOrbit – SPEC_PAGES_A T2.5 (/integrations hero at 818, phone 338; /product uses 474).
// Every geometry value is the 474 design times `size / 474` (spec: "the 818 version scales every value x1.726").
//   Glow (Ellipse 1143): 474² rgba(255,195,248,.5) circle, filter blur 64 (818: 111 – token per size).
//   Glass discs: rgba(255,255,255,.4), backdrop-filter blur 64, circular. Diameters 388 / 300 / 212 / 121.
//     The spec lists 388, 424, ≈300, 121; the 1440 screenshot shows ring edges at 670 / 520 / 366 / 208 px
//     (= 388 / 301 / 212 / 120 at 474) and no 732px (424) ring, so 212 is used for the third disc (see report).
//   Ring outlines: 1px rgba(0,0,0,.1) – sampled from the screenshot (spec: "not DOM borders, match visually").
//   12 tiles, 33px at 474 (spec 32–34 → 57 at 818), white, radius 4.11 (7.08 @818), layered shadow; glyph ~60% of
//     the tile (spec logo 17–26 → placeholder glyph). Each tile links to its integration page.
//   Centre: brand mark 36x46 (Kestrel placeholder mark).
// Motion (loop, the spec's only orbit motion): each ring's tile layer rotates at ±8.04°/s (≈44.8s per turn), linear,
// infinite, adjacent rings in opposite directions. Tiles counter-rotate at the same rate so they stay upright (the
// spec's "their own transform rotates by the same rate"; the screenshot shows upright tiles). Only the tile layers
// rotate: the discs are circles, so rotating them would be invisible and expensive under backdrop-filter (spec
// "Hardest to match" #2). No tile hover change (measured). prefers-reduced-motion: static.

const BASE = 474
const RINGS = [388, 300, 212] // tile rings, outer -> inner
const DISCS = [388, 300, 212, 121]
const TILE = 33
const TURN_S = 360 / 8.04 // 44.78s per revolution

export default function IntegrationOrbit({ size = 474, tiles = [], hrefFor = () => '#', className = '' }) {
  const reduce = useReducedMotion()
  const k = size / BASE
  const big = size >= 600
  const tile = TILE * k
  const px = (v) => `${v * k}px`

  return (
    <div
      data-ui="integration-orbit"
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* pink glow */}
      <div aria-hidden="true" className={`absolute inset-0 rounded-full bg-orbit-glow ${big ? 'blur-orbit' : 'blur-orbit-sm'}`} />
      {/* glass discs, largest first */}
      {DISCS.map((d) => (
        <div
          key={d}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-card-border bg-marquee-bg backdrop-blur-orbit"
          style={{ width: px(d), height: px(d) }}
        />
      ))}
      {/* centre mark 36x46 */}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ width: px(36), height: px(46) }}>
        <div style={{ transform: `scale(${(46 * k) / 28})` }}>
          <KestrelMark />
        </div>
      </div>
      {/* rotating tile layers */}
      {RINGS.map((d, ri) => {
        const dir = ri % 2 === 0 ? 1 : -1
        const ringTiles = tiles.filter((t) => t.ring === ri)
        const spin = reduce ? undefined : { rotate: [0, 360 * dir] }
        const counter = reduce ? undefined : { rotate: [0, -360 * dir] }
        const loop = { duration: TURN_S, ease: 'linear', repeat: Infinity }
        return (
          <motion.div
            key={d}
            data-motion="orbit-ring"
            data-deg-per-s={8.04 * dir}
            className="pointer-events-none absolute left-1/2 top-1/2"
            style={{ width: px(d), height: px(d), marginLeft: -(d * k) / 2, marginTop: -(d * k) / 2 }}
            animate={spin}
            transition={loop}
          >
            {ringTiles.map((t) => {
              const a = (t.angle * Math.PI) / 180
              const r = (d * k) / 2
              return (
                <div
                  key={t.slug}
                  className="pointer-events-auto absolute"
                  style={{ left: r + r * Math.sin(a) - tile / 2, top: r - r * Math.cos(a) - tile / 2, width: tile, height: tile }}
                >
                  <motion.a
                    href={hrefFor(t)}
                    aria-label={`${t.name} integration`}
                    className={`flex h-full w-full items-center justify-center bg-white ${big ? 'shadow-orbit-tile' : 'shadow-orbit-tile-sm'}`}
                    style={{ borderRadius: px(4.11) }}
                    animate={counter}
                    transition={loop}
                  >
                    <PlaceholderLogo name={t.name} shape={t.logo?.shape} w={tile * 0.6} h={tile * 0.6} mark markScale={1} />
                  </motion.a>
                </div>
              )
            })}
          </motion.div>
        )
      })}
    </div>
  )
}
