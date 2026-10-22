// Responsive type-scale class strings shared by the ui primitives. Breakpoints: base <810 (phone), md 810–1199
// (tablet, measured at 1000), lg 1200–1439 (measured at 1280), xl >=1440. Cirka -> Fraunces needs the
// `tracking-display-sub` override re-applied after every fontSize token (see tailwind.config.cjs letterSpacing).
// Class names are written out in full so Tailwind's content scanner sees them.

export const CIRKA = 'font-framer font-display'
export const GINTO = 'font-framer font-sans'

// Hero H1: 96/96 -> 77/77 -> 58/58 -> 40/40 (CLONE_SPEC §1/§15/§16; A T2.1, B T1/T7/T10, C F1b/C1/T3).
export const H1_SCALE = `${CIRKA} text-h1-phone tracking-display-sub md:text-h1-md md:tracking-display-sub lg:text-h1-lg lg:tracking-display-sub xl:text-h1-xl xl:tracking-display-sub`
// Section H2: 75/72 -> 58/58 -> 48/50 -> 40/40 (A P1, C SectionHeading, B related/keep-reading).
export const H2_SCALE = `${CIRKA} text-h2-phone tracking-display-sub md:text-h2-md md:tracking-display-sub lg:text-h2-lg lg:tracking-display-sub xl:text-h2-xl xl:tracking-display-sub`
// "H3" 60/60 -> 50/50 -> 40/40 -> 40/36 (A T1.6 / B T7/T8 section H2s, pricing price).
export const H3_SCALE = `${CIRKA} text-h3-phone tracking-display-sub md:text-h3-md md:tracking-display-sub lg:text-h3-lg lg:tracking-display-sub xl:text-h3-xl xl:tracking-display-sub`
// 40/36 at 1440, 36/36 below (B story/legal section headings, C soft-field label).
export const H4_SCALE = `${CIRKA} text-compare-lg tracking-display-sub xl:text-compare-xl xl:tracking-display-sub`
// 30/30 -> 28/28 -> 26/26 -> 24/24 (C LogoWall heading, A plan name / FAQ list headings).
export const QUOTE_SCALE = `${CIRKA} text-quote-phone tracking-display-sub md:text-quote-md md:tracking-display-sub lg:text-quote-lg lg:tracking-display-sub xl:text-quote xl:tracking-display-sub`

// Hero sub 24/30 -> 19/23 -> 15/18 -> 14/17 (homepage tokens; md tracking tuned for Inter as in Hero.jsx).
export const SUB_SCALE = `${GINTO} text-sub-phone md:text-sub-md md:tracking-sub-md-inter lg:text-sub-lg xl:text-sub-xl`
// Body 20/26 -> 18/23.4 (810–1439) -> 16/20.8 (A P1/P3, C SectionHeading soft sub, B lede).
export const BODY_SCALE = `${GINTO} text-body-16-md md:text-body-18 xl:text-body-20`
// Small 14/18 -> 13/18 (810–1439) -> 13/14.3 phone (A eyebrow / byline).
export const SMALL_SCALE = `${GINTO} text-small-13-tight md:text-small-13 xl:text-small`
// Band H2 (Ginto): 64/77 (>=1200) -> 42/50 -> 32/38 (A P2).
export const BAND_SCALE = `${GINTO} text-band-phone md:text-band-md lg:text-band-xl`
