import { Link } from 'react-router-dom'
import CompareTable from '../../components/ui/CompareTable.jsx'
import FaqAccordion from '../../components/ui/FaqAccordion.jsx'
import HeroHeadline from '../../components/ui/HeroHeadline.jsx'
import LogoMarquee from '../../components/ui/LogoMarquee.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import { CIRKA } from '../../components/ui/type.js'
import FeatureCardGrid from '../../components/company/FeatureCardGrid.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { competitorIndex as data } from '../../data/competitors.js'

// /competitors – SPEC_PAGES_B T7 CompetitorIndex. Footer comes from SiteLayout.
// Main: column, gap 16 (phone 120), overflow clip.
// Hero (852 tall @1440): padding 0 50 124 52 (phone 0 10 125), gap 96. Header padding-top 186 (phone 160), gap 36:
//   H1 Cirka 96/77/58/40 centred, sub hero-sub scale #000 centred (2 lines). Then the strip label Cirka 18/18 −0.72
//   centred, gap 8, LogoMarquee 1280 x 132 (default card tokens, 50 px/s).
//   Background: the homepage Unicorn-stripes stand-in (.hero-glow-placeholder, index.css), 2023 x 1299 centred
//   (x −291 @1440), static position (no scroll translate on this page). Its y is not in the spec: top 300 (>=1200) and
//   the homepage phone geometry below 1200 (width viewport + 437, aspect 827:531, top 250) were sampled from
//   recon/pages/competitor-index/{1440,390}-comp-index.png. The hero clips it at its bottom edge, as on live.
// Section 2 (padding 102 32, gap 80): SectionHeading h3 (60/50/40/40-36) + soft sub, gap 16 -> FeatureCardGrid.
// Section 4 (padding 102 32, gap 64): FaqAccordion look "rows" with its centred max-900 title.
// Section 3 (padding 102 32, gap 80): SectionHeading h3 + sub -> 6 CompareTable variant "grid" stacked 80 apart.
// Phone section padding 0 10px. The competitor column label in each table header links to the (not yet built)
// detail page /competitors/:slug.

// Section subs wrap at ~760px on live (2 lines of ~720 / ~761px @1440, sampled from the 1440 reference); the spec only
// says "full width", so the cap is a screenshot sample, not a measured value.
const SUB_MAX = 'mx-auto max-w-[780px]'

const COLUMN_US = { key: 'us', label: 'Kestrel' }
const COLUMN_LABEL = { key: 'category', label: 'Category' }

function tableProps(t) {
  return {
    columns: [
      COLUMN_LABEL,
      COLUMN_US,
      {
        key: 'them',
        label: (
          <Link to={`/competitors/${t.slug}`} className="text-ink">
            {t.against}
          </Link>
        ),
      },
    ],
    groups: [{ rows: t.rows.map((r) => ({ label: r.label, values: [r.us, r.them] })) }],
  }
}

export default function CompetitorsIndex() {
  useDocumentTitle(data.docTitle)
  const s = data.sections
  return (
    <div data-section="competitor-index" className="flex flex-col gap-[120px] overflow-clip md:gap-4">
      <section data-section="hero" className="relative flex flex-col items-center gap-24 overflow-clip px-2.5 pb-[125px] md:pb-[124px] md:pl-[52px] md:pr-[50px]">
        <div
          aria-hidden="true"
          className="hero-glow-placeholder pointer-events-none absolute left-1/2 top-[250px] aspect-[827/531] w-[calc(100%+437px)] -translate-x-1/2 lg:top-[300px] lg:aspect-auto lg:h-[1197px] lg:w-[1863px] xl:h-[1299px] xl:w-[2023px]"
        >
          <div className="hero-glow-placeholder__colour" />
          <div className="hero-glow-placeholder__stripes" />
        </div>
        <HeroHeadline gap={36} subColor="ink" title={data.hero.title} sub={data.hero.sub} className="relative pt-40 md:pt-[186px]" />
        <div className="relative flex w-full max-w-container flex-col items-center gap-2">
          <p className={`${CIRKA} text-announce tracking-display-sub text-ink`}>{data.hero.stripLabel}</p>
          <LogoMarquee width="100%" className="w-full" label="Teams using Kestrel" />
        </div>
      </section>

      <section data-section="differences" className="flex flex-col items-center gap-20 px-2.5 md:px-8 md:py-[102px]">
        <SectionHeading size="h3" gap={16} title={s.differences.title} sub={s.differences.sub} subClassName={SUB_MAX} />
        <FeatureCardGrid items={data.differences} />
      </section>

      <section data-section="questions" className="px-2.5 md:px-8 md:py-[102px]">
        <FaqAccordion look="rows" title={s.questions.title} items={data.questions} />
      </section>

      <section data-section="tables" className="flex flex-col items-center gap-20 px-2.5 md:px-8 md:py-[102px]">
        <SectionHeading size="h3" gap={16} title={s.tables.title} sub={s.tables.sub} subClassName={SUB_MAX} />
        <div className="flex w-full flex-col gap-20">
          {data.tables.map((t) => (
            <CompareTable key={t.slug} variant="grid" {...tableProps(t)} />
          ))}
        </div>
      </section>
    </div>
  )
}
