import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ARROW_HOVER } from '../lib/uiMotion.js'

// Shared button (CLONE_SPEC §5).
// Variants: 'dark' (Main, #1A1A1A) / 'light' (Outline, white); sizes 'lg' (124/140x42, 14px 24px) / 'md' (108x34, 10px 16px).
// Layers kept for fidelity: title-relative (invisible, sizes the button), title-absolute-top (visible),
// title-absolute-bot (hidden duplicate in #666). Live never moves the title layers on hover (top stays
// translateY(-50%), bot stays put) – no label swap, so the bot layer stays hidden.
// Hover motion (measured on live): wrapper shadow alpha 0 -> 1 and back, symmetric. Re-measured from the
// pointerover event: .008@53ms .027@86 .07@119 .15@152 .298@185 .557@220 .765@252 .886@286 .95@320 .98@354
// .996@386 (out mirrors it) -> 60ms hold + 0.36s cubic-bezier(.6,.15,.25,1) (max error .006). The hold is live's
// Framer hover pipeline (CSS :hover on the same page has none); the clone's old 0.34s curve led by ~50ms.
//
// Page-template additions (defaults unchanged):
// - size 'xl' (SPEC_PAGES_C C1 careers hero): 50 tall, padding 16px 24px, label 14/18 weight 500 (Main variant
//   with height 50 instead of 42); no hover change measured beyond the shared shadow.
// - variant 'outline' (SPEC_PAGES_C partner, "VARIANT of Button Outline"), rendered as a link: 115x50 (105x45
//   @810–1199), padding 16px 24px, transparent, radius 50, 2px solid #222, label Ginto Medium 16/18 #000 (13/13
//   @810–1199, 14/18 phone) + 10x10 arrow, gap 4. Hover: arrow rotates −45° (announcement-pill spring, as
//   SubmitButton "outline"); label/border unchanged. `size` is ignored for this variant.
// - hidden glow layer (CLONE_SPEC §5, SPEC_PAGES_C T6): blur(12px), opacity 0, a brand-gradient-A square ≈1.4x the
//   button width. Live rotates it at 72°/s (5s/turn, linear, infinite) but it stays at opacity 0 in every measured
//   state; the layer is rendered static here with data-motion="button-glow" for the animation pass.
// - internal hrefs ("/…") render a react-router <Link> (same <a> element); "#" and external hrefs stay <a>.

const VARIANTS = {
  dark: 'bg-ink-900 text-white shadow-btn-dark-rest hover:shadow-btn-dark-hover',
  light: 'bg-white text-ink-900 shadow-btn-light-rest hover:shadow-btn-light-hover',
}
const RIMS = { dark: 'shadow-btn-rim-dark', light: 'shadow-btn-rim-light' }
const HOVER_MOTION = 'transition-shadow delay-[60ms] duration-[360ms] ease-[cubic-bezier(0.6,0.15,0.25,1)] motion-reduce:transition-none'
const SIZES = { lg: 'h-[42px] px-6', md: 'h-[34px] px-4', xl: 'h-[50px] px-6' }
const TEXT = { lg: 'text-label', md: 'text-label', xl: 'text-small' }

const isInternal = (href) => typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')

// <a> for "#" / external, react-router <Link> for internal routes.
function Anchor({ href, ...rest }) {
  return isInternal(href) ? <Link to={href} {...rest} /> : <a href={href} {...rest} />
}
const MotionLink = motion.create(Link)

function Arrow() {
  // 10x10 arrow (same drawing as SubmitButton "outline")
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1 5h8M5.5 1.5 9 5 5.5 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function OutlineButton({ href, children, className, onClick }) {
  const reduce = useReducedMotion()
  const Comp = isInternal(href) ? MotionLink : motion.a
  const target = isInternal(href) ? { to: href } : { href }
  return (
    <Comp
      {...target}
      onClick={onClick}
      data-motion="button-arrow-hover"
      initial="rest"
      animate="rest"
      whileHover={reduce ? undefined : 'hover'}
      className={`inline-flex h-[50px] items-center gap-1 rounded-hero-tag border-2 border-solid border-outline-border bg-transparent px-6 font-sans font-medium text-tag text-ink md:h-[45px] md:text-label-13 lg:h-[50px] lg:text-tag max-md:text-small ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <motion.span className="flex" variants={{ rest: { rotate: 0, transition: ARROW_HOVER }, hover: { rotate: -45, transition: ARROW_HOVER } }}>
        <Arrow />
      </motion.span>
    </Comp>
  )
}

export default function Button({ variant = 'dark', size = 'lg', href = '#', children, className = '', onClick }) {
  if (variant === 'outline') {
    return (
      <OutlineButton href={href} className={className} onClick={onClick}>
        {children}
      </OutlineButton>
    )
  }
  return (
    <Anchor
      href={href}
      onClick={onClick}
      data-motion="button-hover"
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-pill font-sans font-medium ${TEXT[size]} ${HOVER_MOTION} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {/* hidden rotating glow (opacity 0 in every measured state; rotation left to the animation pass) */}
      <span aria-hidden="true" data-motion="button-glow" className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 blur-[12px]">
        <span className="aspect-square w-[140%] shrink-0 bg-brand-4" />
      </span>
      <span className="invisible whitespace-nowrap" data-layer="title-relative">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap" data-layer="title-absolute-top">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex translate-y-full items-center justify-center whitespace-nowrap text-muted opacity-0"
        data-layer="title-absolute-bot"
      >
        {children}
      </span>
      {/* Framer ::after inner border, 2px */}
      <span aria-hidden="true" className={`pointer-events-none absolute inset-0 rounded-pill ${RIMS[variant]}`} />
    </Anchor>
  )
}
