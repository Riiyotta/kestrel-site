// StreakBackdrop – CSS stand-in for the decorative JPG behind the /partner glass form card (SPEC_PAGES_C F1a):
// horizontal pink / yellow / indigo motion-blur streaks fanning out from behind the card, recreated with blurred
// brand-gradient bars (brand.magenta / brand.sun / brand.indigo, CLONE_SPEC §0).
// Box size + x offset from the card's left edge, as measured on live:
//   >=1200: 1267x682, card at x 720 / y 180 and image at x 401 / y 105  -> left −319, top −75
//   810–1199 (1000): 1427x1091 at x −300 (card x 20)                     -> left −320
//   phone (390): 1277x1131 at x −563 (card x 20)                         -> left −583
// The image's y below 1200 was not measured: it is centred vertically on the card there (assumption).
// Bar positions are percentages of the box, sampled from recon/pages/form/partner-1440.png. Static (no motion).
// The parent must be `relative`; the page section clips horizontal overflow.

const BARS = [
  // magenta, fanning left from behind the card's left edge
  { cls: 'left-[9%] top-[13%] h-[3%] w-[22%] from-transparent to-brand-magenta' },
  { cls: 'left-[13%] top-[22%] h-[6%] w-[16%] from-transparent to-brand-magenta' },
  { cls: 'left-[6%] top-[33%] h-[8%] w-[22%] from-transparent to-brand-magenta' },
  { cls: 'left-[12%] top-[47%] h-[6%] w-[16%] from-transparent to-brand-magenta' },
  { cls: 'left-[3%] top-[58%] h-[4%] w-[24%] from-transparent to-brand-magenta' },
  { cls: 'left-[16%] top-[70%] h-[3%] w-[12%] from-transparent to-brand-magenta' },
  // sun, under the card and fading right
  { cls: 'left-[34%] top-[64%] h-[12%] w-[34%] from-brand-sun to-transparent' },
  { cls: 'left-[40%] top-[80%] h-[6%] w-[30%] from-brand-sun to-transparent' },
  { cls: 'left-[52%] top-[89%] h-[3%] w-[24%] from-transparent to-brand-sun' },
  { cls: 'left-[50%] top-[47%] h-[14%] w-[20%] from-brand-sun to-transparent opacity-50' },
  // indigo, fanning right from behind the card's right edge
  { cls: 'left-[68%] top-[36%] h-[5%] w-[22%] from-brand-indigo to-transparent' },
  { cls: 'left-[70%] top-[48%] h-[8%] w-[24%] from-brand-indigo to-transparent' },
  { cls: 'left-[64%] top-[62%] h-[9%] w-[30%] from-brand-indigo to-transparent' },
  { cls: 'left-[60%] top-[78%] h-[4%] w-[32%] from-brand-indigo to-transparent' },
]

export default function StreakBackdrop() {
  return (
    <div
      aria-hidden="true"
      data-ui="streak-backdrop"
      className="pointer-events-none absolute left-[-583px] top-1/2 h-[1131px] w-[1277px] -translate-y-1/2 md:left-[-320px] md:h-[1091px] md:w-[1427px] lg:left-[-319px] lg:top-[-75px] lg:h-[682px] lg:w-[1267px] lg:translate-y-0"
    >
      {BARS.map((b, i) => (
        <span key={i} className={`absolute rounded-pill bg-gradient-to-r blur-[10px] ${b.cls}`} />
      ))}
    </div>
  )
}
