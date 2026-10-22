import PlaceholderLogo from '../PlaceholderLogo.jsx'
import { KestrelMark } from '../Logo.jsx'
import { CIRKA, H4_SCALE } from '../ui/type.js'
import { STORY_THEME } from './storyTheme.js'
import './content.css'

// StorySection – SPEC_PAGES_B T2 `Content-Section-N`. Column gap 48, padding 24 0 (phone 24 16), overflow hidden.
//   Paragraph block: column gap 24, padding 0 110 @1440 (text 623), 0 56 @1280/1000, none @390 (max-w 460).
//   Heading (h2 here; live uses h1/h4) Cirka 40/36 −1.6 (36/36 <1440). Body Ginto 16/22.4 #000, paragraphs mt 20
//   (14/19.6 <1200). Optional media slot after the text:
//   image        843×486 radius 20 (phone radius 16), cover.
//   illustration 843×120: two 75×75 white tiles (padding 14, radius 9.4, layered shadow, 47×47 logo) at x+92 / x+659,
//                a 100×101 centre glow tile, joined by wide curves faded with the 3%/15%/85%/98% mask.
//   imageStat    row gap 24: 409² theme-light card (358 @1280) holding a 294×340 UI shot (radius 16 16 0 0, shadow
//                18px 18px 60px rgba(151,151,151,.2), 48 top inset, anchored bottom) + text card (max-w 410,
//                padding 32) Cirka 40/36. Phone: one theme card, text first (padding 48 32 20, centred), image 358².
//   quote        843×290, padding 24, radius 16, blur 39.6: quote Cirka 40/36 centred; gap 30; name Ginto Medium
//                14/14 + role 14/18, centred.
// The section id sits on the heading (scroll-spy/anchor target, per COMPONENTS.md).

function UiShot({ rows, className = '' }) {
  return (
    <div className={`flex h-[340px] w-[294px] flex-col gap-4 rounded-t-card bg-white px-5 pt-6 shadow-ui-shot ${className}`}>
      <div className="flex items-center gap-1.5">
        <KestrelMark className="h-3.5 w-auto" />
        <span className="font-sans font-medium text-name-12 text-ink">Result</span>
      </div>
      <table className="w-full border-collapse font-sans text-name-12">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i === 0 ? 'font-medium text-ink' : 'text-muted'}>
              {r.map((c, j) => (
                <td key={j} className={`py-2 ${j === 0 ? 'text-left' : 'text-center'}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Tile({ logo, className = '' }) {
  return (
    <div className={`absolute top-1/2 flex h-[75px] w-[75px] -translate-y-1/2 items-center justify-center rounded-int-tile bg-white p-3.5 shadow-int-tile ${className}`}>
      <PlaceholderLogo name={logo.name} shape={logo.shape} w={47} h={47} mark markScale={0.7} />
    </div>
  )
}

function Media({ media, theme }) {
  const th = STORY_THEME[theme]
  if (media.type === 'image') {
    return (
      <div className="aspect-[843/486] w-full overflow-hidden rounded-card bg-card-gray md:rounded-glass">
        <img src={media.src} alt={media.alt || ''} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
    )
  }
  if (media.type === 'illustration') {
    return (
      <div className="relative h-[120px] w-full" aria-hidden="true">
        <svg className="int-connector absolute inset-0 h-full w-full" viewBox="0 0 843 120" preserveAspectRatio="none" fill="none">
          <path d="M-200 100 C 60 100, 80 60, 129 60 S 330 60, 421 60" className="stroke-line-gray" strokeWidth="1.5" />
          <path d="M421 60 C 520 60, 600 60, 696 60 S 900 20, 1100 20" className="stroke-line-gray" strokeWidth="1.5" />
        </svg>
        <Tile logo={media.left} className="left-[10.9%]" />
        <div className="absolute left-1/2 top-1/2 flex h-[101px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="absolute inset-3 rounded-icon-tile-inner bg-brand-ring opacity-60 blur-glow" />
          <span className="relative flex h-[75px] w-[75px] items-center justify-center rounded-int-tile bg-white shadow-int-tile">
            <KestrelMark />
          </span>
        </div>
        <Tile logo={media.right} className="left-[78.2%]" />
      </div>
    )
  }
  if (media.type === 'imageStat') {
    return (
      <div className={`flex flex-col overflow-hidden rounded-card md:flex-row md:items-center md:gap-6 md:overflow-visible md:rounded-none md:bg-transparent ${th.light}`}>
        <div className={`relative order-2 flex h-[358px] w-full shrink-0 items-end justify-center overflow-hidden rounded-card pt-12 md:order-1 md:h-[409px] md:w-[409px] lg:h-[358px] lg:w-[358px] xl:h-[409px] xl:w-[409px] ${th.light}`}>
          <UiShot rows={media.rows} />
        </div>
        <p className={`${CIRKA} order-1 max-w-[410px] px-8 pb-5 pt-12 text-center text-ink md:order-2 md:p-8 md:text-left ${H4_SCALE}`}>{media.text}</p>
      </div>
    )
  }
  if (media.type === 'quote') {
    return (
      <figure className="flex w-full flex-col items-center gap-[30px] rounded-card p-6 text-center backdrop-blur-quote-card">
        <blockquote className={`text-ink ${H4_SCALE}`}>{media.text}</blockquote>
        <figcaption className="flex flex-col items-center gap-1">
          <span className="font-sans font-medium text-label text-ink">{media.name}</span>
          <span className="font-sans text-small text-ink">{media.role}</span>
        </figcaption>
      </figure>
    )
  }
  return null
}

export default function StorySection({ section, theme }) {
  return (
    <section data-story-section={section.id} className="flex flex-col gap-12 overflow-hidden px-4 py-6 md:px-0">
      <div className="flex max-w-[460px] flex-col gap-6 md:max-w-none md:px-14 xl:px-[110px]">
        <h2 id={section.id} className={`text-ink ${H4_SCALE}`}>
          {section.heading}
        </h2>
        <div className="font-sans text-para-14-phone text-ink lg:text-body-16">
          {section.body.map((t, i) => (
            <p key={i} className={i ? 'mt-5' : ''}>
              {t}
            </p>
          ))}
        </div>
      </div>
      {section.media ? <Media media={section.media} theme={theme} /> : null}
    </section>
  )
}
