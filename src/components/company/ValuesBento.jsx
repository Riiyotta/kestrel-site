import SectionHeading from '../ui/SectionHeading.jsx'

// ValuesBento – SPEC_PAGES_C C3 (/careers principles).
//   Section padding 102 (102px 32px tablet, 102px 24px phone), gap 80; SectionHeading (H2 + soft sub).
//   Backdrop (live: 1020x582 PNG of blurred yellow / green / purple streaks) -> blurred tint bars, centred behind.
//   Bento max-w 1200, column gap 16: row 1 = 2 cards, row 2 = 3 cards (row gap 16); phone: all 5 stacked.
//   Card: padding 24, bg rgba(255,255,255,.85), radius 16, backdrop blur 12.8, overflow hidden, no border/shadow.
//     Icon chip 38x38 radius 4, pale tint bg with a 22px line icon in the darker tint; gap 12 to the content.
//     Title Cirka 24/28.8 #000; body Ginto 16/24 #000; title -> body gap 16 (row 1) / 32 (row 2).
// No hover, no motion (none measured).

const CHIP = {
  red: 'bg-tint-red text-tag-meta-red',
  lavender: 'bg-tint-lavender text-tag-meta-lavender',
  yellow: 'bg-tint-yellow text-tag-meta-yellow',
  pink: 'bg-tint-pink text-tag-meta-pink',
  green: 'bg-tint-green text-tag-meta-green',
}

const ICONS = {
  target: <path d="M11 3a8 8 0 1 0 8 8M11 7a4 4 0 1 0 4 4m-4 0 8-8m-3 0h3v3" />,
  key: <path d="M8 14a4 4 0 1 1 3.5-6L19 8v3h-2v2h-2l-1.5-1.4A4 4 0 0 1 8 14Z" />,
  ear: <path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5 2M10 9a2 2 0 0 1 4 0" />,
  heart: <path d="M11 18s-7-4.2-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 18 9c0 4.8-7 9-7 9Z" />,
  pen: <path d="M4 18l1-4L15 4l3 3L8 17l-4 1Zm9-12 3 3" />,
}

function Card({ item, tall }) {
  return (
    <article className="flex flex-1 flex-col gap-3 overflow-hidden rounded-card bg-values-card p-6 backdrop-blur-values">
      <span className={`flex h-[38px] w-[38px] items-center justify-center rounded-xs ${CHIP[item.tint] || CHIP.lavender}`}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {ICONS[item.icon]}
          </g>
        </svg>
      </span>
      <div className={`flex flex-col ${tall ? 'gap-8' : 'gap-4'}`}>
        <h3 className="font-framer font-display text-values-title text-ink">{item.title}</h3>
        <p className="font-sans text-values-body text-ink">{item.body}</p>
      </div>
    </article>
  )
}

export default function ValuesBento({ title, sub, items }) {
  const top = items.slice(0, 2)
  const bottom = items.slice(2)
  return (
    <section data-section="values" className="flex flex-col items-center gap-20 overflow-hidden bg-white px-6 py-[102px] md:px-8 lg:px-[102px]">
      <SectionHeading title={title} sub={sub} />
      <div className="relative w-full max-w-[1200px]">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[582px] w-full max-w-[1020px] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute left-[8%] top-[46%] h-[9%] w-[45%] rounded-pill bg-brand-sun/70 blur-[30px]" />
          <span className="absolute left-[50%] top-[40%] h-[10%] w-[42%] rounded-pill bg-tint-dot-green blur-[24px]" />
          <span className="absolute left-[30%] top-[62%] h-[12%] w-[40%] rounded-pill bg-brand-indigo/40 blur-[34px]" />
        </div>
        <div className="relative flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            {top.map((it, i) => (
              <Card key={i} item={it} />
            ))}
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            {bottom.map((it, i) => (
              <Card key={i} item={it} tall />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
