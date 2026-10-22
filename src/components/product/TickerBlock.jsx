import LogoMarquee from '../ui/LogoMarquee.jsx'
import { QUOTE_SCALE } from '../ui/type.js'

// TickerBlock – SPEC_PAGES_A T2 logo tickers.
//   variant "line" (/coach, /voice): a Cirka 30/30 −1.2 centred line (28 / 26 / 24 phone) above a LogoMarquee card
//     1338 wide at 1440 (the hero wrapper width), homepage logo set, 50 px/s. The line -> card gap is not measured:
//     24 (as A T3.2). Phone keeps the bordered card (recon voice-390).
//   variant "wall" (/product `Logo Wall`): padding 46px 64px 25px, card 1184 wide (>=810). Phone = the homepage
//     phone variant (two opposing 20px tickers, 30 px/s), as the /product 390 reference shows.
// No reveal (T2 has no scroll reveals).

export default function TickerBlock({ variant = 'line', line, logos }) {
  if (variant === 'wall') {
    return (
      <div data-section="logo-wall" className="flex w-full justify-center px-5 pb-[25px] pt-[46px] md:px-16">
        <LogoMarquee logos={logos} width={1184} className="hidden md:block" label="Teams using Kestrel" />
        <div className="mask-marquee flex w-full flex-col gap-9 overflow-hidden py-4 md:hidden">
          <LogoMarquee logos={logos} card={false} height={20} speed={30} direction="left" label="Teams using Kestrel" />
          <LogoMarquee logos={logos} card={false} height={20} speed={30} direction="right" label="Teams using Kestrel" />
        </div>
      </div>
    )
  }
  return (
    <div data-section="ticker" className="flex w-full flex-col items-center gap-6">
      {line ? <p className={`text-center text-ink ${QUOTE_SCALE}`}>{line}</p> : null}
      <LogoMarquee logos={logos} width="100%" label="Teams using Kestrel" />
    </div>
  )
}
