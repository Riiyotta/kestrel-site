import RichText from './RichText.jsx'
import { CIRKA } from './type.js'

// SplitText – two-column text block: heading left, rich text right (SPEC_PAGES_C T1 A1 "mission" header and A4
// "team" main on /about). Not to be confused with LetterReveal (per-letter animation).
//   Layout: flex row, gap 100, max-w 1440, padding `${pt}px 64px 0` (pt 200 for A1, 100 for A4); columns equal
//   (606 @1440, 526 @1280). <=1199: column, gap 24, padding `${pt}px 32px 0`, both columns full width.
//   Heading: Cirka #000 left. 1440 77/38 −3.08 (line-height 38 < size is the measured quirk – keeps the right
//   column top aligned at y=pt); 1280 96/38 (A1, `lgTight`) or 96/100 (A4) −3.84 (bigger than 1440: Framer
//   quirk, measured); 1000 58/38 −2.32; 390 40/36 −1.6.
//   Body: RichText variant "blog" = Ginto 20/26 rgba(0,0,0,.75) / 18/23.4 (810–1439) / 16/20.8, 20px paragraph
//   spacing, links #4348DC -> #5F63D9 instant – exactly the C A1/A4 paragraph tokens.
// No motion.

export default function SplitText({ title, blocks = [], pt = 200, lgTight = true, as: Tag = 'header', headingAs: H = 'h1', className = '' }) {
  const lg = lgTight ? 'lg:text-split-lg-tight' : 'lg:text-split-lg'
  return (
    <Tag
      data-ui="split-text"
      className={`mx-auto flex w-full max-w-page flex-col gap-6 px-8 lg:flex-row lg:gap-[100px] lg:px-16 ${pt === 100 ? 'pt-[100px]' : 'pt-[200px]'} ${className}`}
    >
      <div className="min-w-0 lg:flex-1">
        <H
          className={`text-left text-ink ${CIRKA} text-h3-phone tracking-display-sub md:text-split-md md:tracking-display-sub ${lg} lg:tracking-display-sub xl:text-split-xl xl:tracking-display-sub`}
        >
          {title}
        </H>
      </div>
      <RichText blocks={blocks} variant="blog" className="min-w-0 lg:flex-1" />
    </Tag>
  )
}
