import { useRef } from 'react'
import { motion } from 'framer-motion'
import LogoMarquee from './LogoMarquee.jsx'
import { REVEAL_06, useReducedMotion, useScrollTrigger } from '../../lib/motion.js'
import { QUOTE_SCALE } from './type.js'

// LogoWall – SPEC_PAGES_C F3 (/partner, /nominate; also the "trusted by" strips of A T2/T3 and B T8 with their
// own widths). Built on LogoMarquee.
//   Section: column centred, padding 63px 20px, gap 24 (312 tall @1440).
//   Heading Cirka #000 centred: 30/30 −1.2 (1440) / 28/28 (1280) / 26/26 (1000) / 24/24 −0.96, 2 lines in 262 (390).
//   Strip: viewport − 40 wide (the section padding) x 132, single row at every width, 50 px/s leftward.
//   Reveal: strip opacity 0 / y 80 -> 1 / 0 when it enters the viewport (same tween as the homepage §7 strip:
//   0.6s Framer ease-out, once, triggered when the translated top – layout top + 80 – reaches the viewport bottom).

export default function LogoWall({ heading, logos, speed = 50, reveal = true, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { on, instant } = useScrollTrigger(ref, { offset: -80, once: true, enabled: reveal && !reduce })
  return (
    <section data-ui="logo-wall" className={`flex w-full flex-col items-center gap-6 px-5 py-[63px] ${className}`}>
      {heading ? <h2 className={`max-w-[262px] text-center text-ink md:max-w-none ${QUOTE_SCALE}`}>{heading}</h2> : null}
      <div ref={ref} className="w-full">
        <motion.div
          data-motion="logo-wall-reveal"
          initial={false}
          animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={instant ? { duration: 0 } : REVEAL_06}
        >
          <LogoMarquee logos={logos} speed={speed} />
        </motion.div>
      </div>
    </section>
  )
}
