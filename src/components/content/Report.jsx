import { Link } from 'react-router-dom'
import Button from '../Button.jsx'
import PlaceholderLogo from '../PlaceholderLogo.jsx'
import { BODY_SCALE, CIRKA, H2_SCALE, H3_SCALE, QUOTE_SCALE } from '../ui/type.js'
import { STORY_THEME } from './storyTheme.js'
import './content.css'

// Report landing sections – SPEC_PAGES_B T9 (`R2 *`). Static: no reveal or hover motion measured.
// The gradient art (hero + pull quote) is a CSS mesh stand-in (`bg-report-mesh`, spec-suggested stops).
// CTAs reuse the homepage Button (dark): live fills #141414 vs Button's #1A1A1A (Button is not ours to change).

// ReportHero: section padding 12 (phone 8) → art radius 24 (phone 20), padding 136 40 0 (1280: 120 40 0, 1000:
//   112 32 0, 390: 100 20 0). Inner gap 56; top row gap 48: copy (gap 24, pt 6) H1 Cirka 75/72 #FFF + lede 20/26
//   rgba(255,255,255,.94) | read card 380 (360 @1280, full width <1200): #FFF, radius 20, padding 28 (22 phone),
//   shadow 0 30px 60px −30px rgba(20,14,50,.45): H2 Cirka 40/36 #141414; facts grid 154 154 gap 16, padding 22 0 20:
//   value Cirka 30/30 (28 @1280, 24 phone; 26 @1000 assumed) + label 14/18 #5F5F66 (gap 8); method 14/18 #5F5F66
//   (pt 18); CTA (pt 22) full-width dark pill. "What you will learn" (padding 28 0 40, gap 16): label Ginto Medium
//   14/14 rgba(255,255,255,.78); grid 4 × 313 gap 28 (2 cols gap 20 28 @1000, 1 col gap 16 @390): "→" + text
//   16/22.4 rgba(255,255,255,.95), row gap 10.
export function ReportHero({ hero }) {
  return (
    <section data-section="report-hero" className="p-2 md:p-3">
      <div className="overflow-clip rounded-glass bg-report-mesh px-5 pt-[100px] md:rounded-photo md:px-8 md:pt-28 lg:px-10 lg:pt-[120px] xl:pt-[136px]">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="flex flex-1 flex-col gap-6 pt-1.5">
              <h1 className={`text-white ${H2_SCALE}`}>{hero.title}</h1>
              <p className={`text-on-art-94 ${BODY_SCALE}`}>{hero.lede}</p>
            </div>
            <div data-read-card className="w-full shrink-0 rounded-glass bg-white p-[22px] shadow-read-card md:p-7 lg:w-[360px] xl:w-[380px]">
              <h2 className={`${CIRKA} text-compare-xl tracking-display-sub text-report-ink`}>{hero.cardTitle}</h2>
              <dl className="grid grid-cols-[154px_154px] gap-4 pb-5 pt-[22px]">
                {hero.facts.map((f) => (
                  <div key={f.label} className="flex flex-col gap-2">
                    <dt className={`order-2 font-sans text-small text-report-muted`}>{f.label}</dt>
                    <dd className={`order-1 text-report-ink ${QUOTE_SCALE}`}>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="pt-[18px] font-sans text-small text-report-muted">{hero.method}</p>
              <div className="pt-[22px]">
                <Button variant="dark" href="#report" className="w-full">
                  {hero.cta}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-10 pt-7">
            <p className="font-sans font-medium text-label text-on-art-78">{hero.learnLabel}</p>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-7 md:gap-y-5 lg:grid-cols-4 lg:gap-7">
              {hero.learn.map((t) => (
                <li key={t} className="flex gap-2.5 font-sans text-body-16">
                  <span aria-hidden="true" className="text-white">
                    →
                  </span>
                  <span className="text-on-art-95">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// FindingCards: padding 136 40 0, max-w 1120, gap 48: H2 Cirka 75/72 #141414 left; grid 3 × 365 gap 12 (stacked
//   <1200): card #F5F5F7, radius 24, padding 30 30 28: glyph → body (pt 40, gap 16): stat Cirka 60/60 (50 @1280,
//   40/40 @1000, 40/36 @390) + caption 16/22.4 #4E4E55.
//   Glyphs: bars = two 12px bars radius 2, heights ∝ values (26 / 13 measured for 38.2 / 19.3), #E04BD6 + #CDCEF3,
//   gap 6, bottom-aligned; donut = 44² conic-gradient(#E04BD6 0 Ndeg, #CDCEF3 Ndeg 100deg) (N = the percentage as
//   degrees, as measured), padding 7, 30² hole #F5F5F7.
function Chart({ chart }) {
  if (chart.type === 'bars') {
    const max = Math.max(...chart.values)
    return (
      <div className="flex h-[26px] items-end gap-1.5" aria-hidden="true">
        {chart.values.map((v, i) => (
          <span key={i} className={`w-3 rounded-[2px] ${i ? 'bg-report-lilac' : 'bg-report-magenta'}`} style={{ height: Math.round((v / max) * 26) }} />
        ))}
      </div>
    )
  }
  return (
    <span
      aria-hidden="true"
      className="report-chart block h-11 w-11 rounded-full p-[7px]"
      style={{ background: `conic-gradient(var(--c-mag) 0 ${chart.value}deg, var(--c-lil) ${chart.value}deg 100deg)` }}
    >
      <span className="block h-[30px] w-[30px] rounded-full bg-report-card" />
    </span>
  )
}

export function FindingCards({ findings }) {
  return (
    <section data-section="report-findings" className="px-5 pt-[136px] md:px-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-12">
        <h2 className={`text-report-ink ${H2_SCALE}`}>{findings.title}</h2>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {findings.items.map((it) => (
            <div key={it.stat} data-finding-card className="flex flex-col rounded-photo bg-report-card px-[30px] pb-7 pt-[30px]">
              <Chart chart={it.chart} />
              <div className="flex flex-col gap-4 pt-10">
                <p className={`text-report-ink ${H3_SCALE}`}>{it.stat}</p>
                <p className="font-sans text-body-16 text-report-caption">{it.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// QuotePanel: padding 128 12 0; panel radius 24, same art, padding 140 40 (88 32 @1000; 64 20 @390, radius 20),
//   gap 28, centred: quote Cirka 60/60 #FFF (50 @1280, 40/40 @1000, 40/36 @390); attribution Ginto Medium 16/18
//   rgba(255,255,255,.92) (13/13 @1000, 14/18 @390).
export function QuotePanel({ quote }) {
  return (
    <section data-section="report-quote" className="px-2 pt-32 md:px-3">
      <figure className="flex flex-col items-center gap-7 rounded-glass bg-report-mesh px-5 py-16 text-center md:rounded-photo md:px-8 md:py-[88px] lg:px-10 lg:py-[140px]">
        <blockquote className={`max-w-[1100px] text-white ${H3_SCALE}`}>{quote.text}</blockquote>
        <figcaption className="font-sans font-medium text-small text-on-art-92 md:text-attr-13 lg:text-tag">{quote.attribution}</figcaption>
      </figure>
    </section>
  )
}

// NumberedContents: padding 136 40 0, max-w 1120, row gap 72 (48 @1280; stacked gap 32 <1200). Left 524 (gap 18):
//   H2 Cirka 75/72 #141414, lede 20/26 #5F5F66, CTA (pt 10) Button dark Medium. Right list: rows padding 20 0, gap
//   12, 1px #ECECEF bottom divider; number Cirka 18/23.4 with the amber→magenta→violet gradient text (w52); text
//   Ginto 20/26 #141414 (responsive sizes not measured: the shared body scale is used).
export function NumberedContents({ contents }) {
  return (
    <section data-section="report-contents" id="report" className="px-5 pt-[136px] md:px-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-[72px]">
        <div className="flex flex-col gap-[18px] lg:w-[536px] xl:w-[524px]">
          <h2 className={`text-report-ink ${H2_SCALE}`}>{contents.title}</h2>
          <p className={`text-report-muted ${BODY_SCALE}`}>{contents.lede}</p>
          <div className="pt-2.5">
            <Button variant="dark" size="md" href="#report">
              {contents.cta}
            </Button>
          </div>
        </div>
        <ol className="flex flex-1 flex-col">
          {contents.items.map((t, i) => (
            <li key={t} className="flex gap-3 border-b border-solid border-report-rule py-5">
              <span className={`${CIRKA} report-number w-[52px] shrink-0 text-cirka-18`}>{String(i + 1).padStart(2, '0')}</span>
              <span className={`text-report-ink ${BODY_SCALE}`}>{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// StoryRail: padding 136 0 120, gap 44. Head (max-w 1200, padding 0 40; stacked gap 14 <1200): H2 Cirka 75/72 |
//   sub 20/26 #5F5F66 right-aligned (w458). Rail: row gap 20, padding 0 160 4 (1280: 0 40; 1000: 0 32; 390: 0 20,
//   gap 12), overflow-x auto, no arrows. Card 600×379: theme light, radius 24, padding 24 24 24 32, row gap 32,
//   no hover: body 264 (padding 10 0 6, space-between): logo ≈30 tall → 34 → title Cirka 30/30 −1.2 #141414 …
//   foot (gap 22): company Ginto Medium 16/18 theme mid (#801470 pink / #752512 red) + "Customer story" 14/18;
//   outline pill 150×40 (padding 0 16, 1px #141414 ring, Ginto Medium 14/14). Photo 248×331 radius 16 cover.
//   Phone: cards become column cards (photo below the text, rail ≈544 tall) – exact phone card geometry unmeasured.
const RAIL_MID = { pink: 'text-report-pink-mid', red: 'text-tag-meta-red', yellow: 'text-tag-meta-yellow', green: 'text-tag-meta-green' }

export function StoryRail({ stories }) {
  return (
    <section data-section="report-stories" className="flex flex-col gap-11 pb-[120px] pt-[136px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3.5 px-5 md:px-10 lg:flex-row lg:items-end lg:justify-between">
        <h2 className={`text-report-ink ${H2_SCALE}`}>{stories.title}</h2>
        <p className={`text-report-muted lg:max-w-[458px] lg:text-right ${BODY_SCALE}`}>{stories.sub}</p>
      </div>
      <ul className="ui-noscrollbar flex gap-3 overflow-x-auto px-5 pb-1 md:gap-5 md:px-8 lg:px-10 xl:px-40">
        {stories.items.map((s) => {
          const th = STORY_THEME[s.theme]
          return (
            <li key={s.slug} className="shrink-0">
              <Link
                to={`/customer-stories/${s.slug}`}
                data-rail-card
                className={`flex h-[520px] w-[300px] flex-col gap-6 rounded-photo p-6 md:h-[379px] md:w-[600px] md:flex-row md:gap-8 md:pl-8 ${th.light}`}
              >
                <div className="flex flex-1 flex-col justify-between pb-1.5 pt-2.5 md:w-[264px] md:flex-none">
                  <div className="flex flex-col gap-[34px]">
                    <PlaceholderLogo name={s.logo.name} shape={s.logo.shape} w={120} h={30} className={th.fill} />
                    <h3 className={`${CIRKA} text-quote tracking-display-sub text-report-ink`}>{s.title}</h3>
                  </div>
                  <div className="flex flex-col gap-[22px] pt-4">
                    <p className={`flex flex-col ${RAIL_MID[s.theme]}`}>
                      <span className="font-sans font-medium text-tag">{s.company}</span>
                      <span className="font-sans text-small">Customer story</span>
                    </p>
                    <span className="flex h-10 items-center self-start rounded-nav-pill px-4 font-sans font-medium text-label text-report-ink shadow-[inset_0_0_0_1px_theme(colors.report.ink)]">
                      View case study ›
                    </span>
                  </div>
                </div>
                <div className="h-[180px] w-full overflow-hidden rounded-card bg-card-gray md:h-[331px] md:w-[248px] md:shrink-0">
                  <img src={s.photo} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
