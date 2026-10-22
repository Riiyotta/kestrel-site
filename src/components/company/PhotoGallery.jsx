import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'

// PhotoGallery – SPEC_PAGES_C C2 (/careers "about us"): SectionHeading (H2 + hero-scale #000 sub, gap 24), 32 above
//   a 6-photo gallery over a decorative backdrop.
//   Section padding 102 (102px 32px @810–1199, 102px 24px phone), bg #fff, overflow hidden.
//   Gallery row: gap 30.39, 3 columns of 2 stacked photos (gap 16): left 288x250 x2, centre 576x308 over 576x186,
//   right 312x250 x2 @1440 (columns keep these proportions at 1280 / 1000). Phone: one column of 6 photos, 342 wide,
//   same aspects, gap 30.39. All radius 16, no border/shadow (team photos -> stock / tint placeholders).
//   Backdrop (live: 1200x685 PNG of blurred brand light streaks) -> blurred brand-colour bars behind the photos.
// Motion: each photo fades opacity 0 -> 1 when it enters the viewport, once, ≈400ms ease-out (spec: 0.11@67ms,
//   0.88@277, 1@390). Top and bottom rows trigger separately because each photo has its own trigger.
//   prefers-reduced-motion: shown immediately.

const FADE = { duration: 0.4, ease: 'easeOut' }

function Photo({ photo, aspect }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      data-motion="gallery-photo"
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={FADE}
      className={`relative w-full overflow-hidden rounded-card bg-gradient-to-br from-tint-pink via-tint-lavender to-tint-yellow ${aspect}`}
    >
      {photo?.src ? <img src={photo.src} alt={photo.alt || ''} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" /> : null}
    </motion.div>
  )
}

export default function PhotoGallery({ title, sub, photos }) {
  const [a, b, c, d, e, f] = photos
  return (
    <section data-section="gallery" className="flex flex-col items-center gap-8 overflow-hidden bg-white px-6 py-[102px] md:px-8 lg:px-[102px]">
      <SectionHeading title={title} sub={sub} subTone="hero" />
      <div className="relative w-full max-w-[1236px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[4%] bottom-[-6%] top-[30%]">
          <span className="absolute left-[20%] top-[40%] h-[10%] w-[40%] -rotate-12 rounded-pill bg-brand-magenta/60 blur-[28px]" />
          <span className="absolute left-[45%] top-[70%] h-[12%] w-[45%] rotate-6 rounded-pill bg-brand-indigo/50 blur-[28px]" />
          <span className="absolute left-[5%] top-[85%] h-[8%] w-[35%] rounded-pill bg-brand-sun/60 blur-[24px]" />
        </div>
        <div className="relative flex flex-col gap-[30.39px] md:flex-row">
          <div className="flex flex-col gap-[30.39px] md:w-[23.29%] md:gap-4">
            <Photo photo={a} aspect="aspect-[288/250]" />
            <Photo photo={d} aspect="aspect-[288/250]" />
          </div>
          <div className="flex flex-col gap-[30.39px] md:w-[46.57%] md:gap-4">
            <Photo photo={b} aspect="aspect-[576/308]" />
            <Photo photo={e} aspect="aspect-[576/186]" />
          </div>
          <div className="flex flex-col gap-[30.39px] md:w-[25.23%] md:gap-4">
            <Photo photo={c} aspect="aspect-[312/250]" />
            <Photo photo={f} aspect="aspect-[312/250]" />
          </div>
        </div>
      </div>
    </section>
  )
}
