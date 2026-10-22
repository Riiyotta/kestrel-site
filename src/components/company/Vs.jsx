import { KestrelMark } from '../Logo.jsx'
import DemoForm from '../ui/DemoForm.jsx'
import { CIRKA, H4_SCALE } from '../ui/type.js'
import '../ui/ui.css'

// Competitor detail building blocks – SPEC_PAGES_B T8 (/competitors/:slug, Kestrel vs a generic CATEGORY).
// Exports CategoryIcon, VsTitle, VsHero, VsIntroCards, VsFeatureCards.
//
// VsTitle: row (gap 14, wraps): [52x52 tile + "Kestrel"] "vs" [tile + category], tile -> word gap 10. Words Cirka
//   60/60 −2.4 (50/50 @1200–1439, 36/36 −1.44 below 1200). Tile white, radius 12, padding 12.05px 15.07px (our mark
//   21x28; the competitor tile holds a generic category glyph instead of a logo).
// VsHero: full-bleed bg #FEEAFC, padding 120px 64px 20px (120 32 20 @1200–1439 and tablet, 120 20 20 phone); row
//   max-w 1440: left column 777 (720 @1280; padding 40px 20px, gap 42) + right column 525 (486 @1280; padding
//   40px 20px) holding DemoForm card (485 wide). <1200: column, copy first then the form.
//   Left: VsTitle + subtitle Cirka 40/36 −1.6 (gap 12; 36/36 below 1440 – not measured), then the copy block
//   (gap 24): intro Ginto 16/22.4 #000 (14/19.6 <1200), bold "difference" lead-in + ul of 4 (disc, li padding-left
//   19.8), closing line with a bold lead-in ("In production at") + customer names.
// VsIntroCards (Proof-Section, padding 80, max-w 1200; phone padding 56px 16px): row gap 18, two cards (category
//   first, Kestrel second) bg #F8F8F8, radius 16, padding 19, column gap 16: header (gap 10) tile + "What is X?"
//   Ginto 20/26 rgba(0,0,0,.75); body Ginto 16/22.4 #000. Phone stacked.
// VsFeatureCards: 3 x 393 (gap 10, top-aligned), bg #FAFAFA, radius 16, padding 24, gap 24: 48x48 tile #4348DC
//   radius 12 padding 8 with a 32px white glyph; title Ginto 20/26 rgba(0,0,0,.75) + body Ginto 16/22.4 #666, gap 4.
//   <1200 not measured: stacked (1 column), as the phone screenshot.
// No motion (B T8 has none besides the slideshow and the FAQ cards).

const GLYPHS = {
  // legacy chatbots: a decision tree
  tree: <path d="M16 6v6m0 0H8v6m8-6h8v6M8 18v4m16-4v4M5 22h6v4H5zM21 22h6v4h-6zM13 2h6v4h-6z" />,
  // helpdesk add-ons: an inbox tray with a plus
  inbox: <path d="M4 18v8h24v-8M4 18l4-12h16l4 12M4 18h7l2 3h6l2-3h7M16 9v6m-3-3h6" />,
  // build your own: code brackets
  code: <path d="m11 9-7 7 7 7m10-14 7 7-7 7M18 6l-4 20" />,
  // outsourced BPO: a headset
  headset: <path d="M6 18v-3a10 10 0 0 1 20 0v3M6 18h4v7H6zm16 0h4v7h-4zm4 7c0 2-2 3-5 3h-3" />,
  // phone trees / IVR: a keypad
  keypad: <path d="M9 6h2v2H9zm6 0h2v2h-2zm6 0h2v2h-2zM9 12h2v2H9zm6 0h2v2h-2zm6 0h2v2h-2zM9 18h2v2H9zm6 0h2v2h-2zm6 0h2v2h-2zm-6 6h2v2h-2z" />,
  // single-channel assistants: one speech bubble
  bubble: <path d="M5 7h22v14H14l-6 5v-5H5z" />,
  // feature-card glyphs
  check: <path d="m7 16 6 6 12-12" />,
  coin: <path d="M16 5a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm0 5v12m-3-9h5a2 2 0 0 1 0 4h-4a2 2 0 0 0 0 4h5" />,
  layers: <path d="M16 5 4 11l12 6 12-6-12-6Zm-12 11 12 6 12-6M4 21l12 6 12-6" />,
  shield: <path d="M16 4 6 8v7c0 6 4 11 10 13 6-2 10-7 10-13V8L16 4Zm-4 12 3 3 6-6" />,
  bolt: <path d="M18 3 7 18h8l-2 11 12-16h-8l1-10Z" />,
  people: <path d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 11c0-4 3-7 7-7s7 3 7 7m3-11a3.5 3.5 0 1 0 0-7m2 11c3 .5 5 3 5 7" />,
}

export function CategoryIcon({ name, size = 28, className = 'text-ink' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {GLYPHS[name] || GLYPHS.bubble}
      </g>
    </svg>
  )
}

function Tile({ children }) {
  return <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-playbook bg-white px-[15.07px] py-[12.05px]">{children}</span>
}

const WORD = `${CIRKA} text-vs-word-md tracking-display-sub lg:text-h3-lg lg:tracking-display-sub xl:text-h3-xl xl:tracking-display-sub text-ink`

export function VsTitle({ them, as: Tag = 'h1', align = 'start' }) {
  return (
    <Tag className={`flex flex-wrap items-center gap-3.5 ${align === 'center' ? 'justify-center' : ''} ${WORD}`}>
      <span className="flex items-center gap-2.5">
        <Tile>
          <KestrelMark className="h-7 w-auto" />
        </Tile>
        Kestrel
      </span>
      <span>vs</span>
      <span className="flex items-center gap-2.5">
        <Tile>
          <CategoryIcon name={them.icon} />
        </Tile>
        {them.name}
      </span>
    </Tag>
  )
}

const BODY = 'font-sans text-para-14-phone text-ink lg:text-body-16'

export function VsHero({ data }) {
  const { them, hero } = data
  return (
    <section data-section="vs-hero" className="w-full bg-tint-pink px-5 pb-5 pt-[120px] md:px-8 xl:px-16">
      <div className="mx-auto flex w-full max-w-page flex-col lg:flex-row lg:justify-between">
        <div className="flex w-full flex-col gap-[42px] px-5 py-10 lg:w-[720px] xl:w-[777px]">
          <div className="flex flex-col gap-3">
            <VsTitle them={them} />
            <p className={`text-ink ${H4_SCALE}`}>{hero.subtitle}</p>
          </div>
          <div className="flex flex-col gap-6">
            <p className={BODY}>{hero.intro}</p>
            <p className={`${BODY} font-bold`}>{hero.differenceLabel}</p>
            <ul className={`list-disc pl-5 ${BODY}`}>
              {hero.bullets.map((b, i) => (
                <li key={i} className="pl-[2px]">
                  {b}
                </li>
              ))}
            </ul>
            <p className={BODY}>
              <strong>In production at</strong> {hero.trustedBy}
            </p>
          </div>
        </div>
        <div className="w-full px-5 py-10 lg:w-[486px] xl:w-[525px]">
          <DemoForm card title="Book a walkthrough" />
        </div>
      </div>
    </section>
  )
}

export function VsIntroCards({ data }) {
  const cards = [
    { title: `What is a ${data.them.singular}?`, body: data.intro.them, tile: <CategoryIcon name={data.them.icon} /> },
    { title: 'What is Kestrel?', body: data.intro.us, tile: <KestrelMark className="h-7 w-auto" /> },
  ]
  return (
    <section data-section="vs-intro" className="mx-auto flex w-full max-w-[1200px] flex-col gap-[18px] px-4 py-14 md:flex-row md:p-20 lg:px-0">
      {cards.map((c, i) => (
        <article key={i} className="flex flex-1 flex-col gap-4 rounded-card bg-vs-card p-[19px]">
          <div className="flex items-center gap-2.5">
            <Tile>{c.tile}</Tile>
            <h2 className="font-sans text-body-20 text-body-75">{c.title}</h2>
          </div>
          <p className="font-sans text-body-16 text-ink">{c.body}</p>
        </article>
      ))}
    </section>
  )
}

export function VsFeatureCards({ items }) {
  return (
    <div data-ui="vs-feature-cards" className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-2.5 lg:grid-cols-3">
      {items.map((f, i) => (
        <article key={i} className="flex flex-col gap-6 rounded-card bg-field p-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-playbook bg-brand-indigo p-2">
            <CategoryIcon name={f.icon} size={32} className="text-white" />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-body-20 text-body-75">{f.title}</h3>
            <p className="font-sans text-body-16 text-muted">{f.body}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
