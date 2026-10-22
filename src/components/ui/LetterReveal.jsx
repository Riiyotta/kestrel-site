import { motion, useReducedMotion } from 'framer-motion'
import { LETTER_REVEAL } from '../../lib/uiMotion.js'

// LetterReveal – per-letter title reveal (SPEC_PAGES_A T5.4, the pricing "FAQs" H2).
// Every glyph is its own span, initial opacity .001 / translateY(20px). When the title's top enters the viewport
// (bottom edge, IO amount 0) all letters animate together to opacity 1 / y 0: ~450ms ease-out
// (.75@~100ms .94@~250 1@~450, fitted cubic-bezier(.15,.7,.1,.95)), no stagger, once.
// Words are kept in nowrap groups so lines only break between words. Screen readers get the plain text.
// prefers-reduced-motion: rendered static.

const letter = {
  hidden: { opacity: 0.001, y: 20 },
  shown: { opacity: 1, y: 0, transition: LETTER_REVEAL },
}

export default function LetterReveal({ text, as = 'h2', className = '' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.h2
  const words = String(text).split(' ')
  return (
    <Tag
      data-motion="letter-reveal"
      aria-label={text}
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0 }}
    >
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true">
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => (
              <motion.span key={ci} className="inline-block" variants={letter}>
                {ch}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
