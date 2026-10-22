import JobsHeader from '../components/cxjobs/JobsHeader.jsx'
import JobsButton, { JOBS_COLUMN, JobsEyebrow, JobsH2, JobsTextLink } from '../components/cxjobs/JobsButton.jsx'
import SilkJobCard from '../components/cxjobs/SilkJobCard.jsx'
import StatsRow from '../components/cxjobs/StatsRow.jsx'
import McpFlowIllustration from '../components/cxjobs/McpFlowIllustration.jsx'
import JobCard from '../components/cxjobs/JobCard.jsx'
import JobsFooter from '../components/cxjobs/JobsFooter.jsx'
import { featuredRoles, footerColumns, openRoles, stats } from '../data/cxJobs.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'

// T4 Jobs board microsite (SPEC_PAGES_C.md T4). Standalone: own header/footer, no global nav/footer/teaser.
// Page bg #EEE, Inter throughout, square corners. Sections stack with a 10px pitch (sampled from the section map:
// y 354 -> 364, 887 -> 897, ...) and the page ends with a gutter-sized bottom space (sampled: 64 @1440, 18 @390).

// J2 ticker: 8 cards 348 wide + 20 gap -> one loop = 8 x 368 = 2944px at 38.8 px/s (Framer Ticker, linear).
const CARD_PITCH = 348 + 20
const TICKER_SPEED = 38.8

function FeaturedTicker() {
  const loop = featuredRoles.length * CARD_PITCH
  return (
    <section aria-label="Featured roles" className="overflow-x-clip pb-8">
      <div className={JOBS_COLUMN}>
        {/* Cards Row: starts at the left gutter, max 1200, track not clipped (bleeds to both viewport edges) */}
        <div className="max-w-jobs-cards">
          <div
            className="marquee-left flex w-max gap-5"
            data-motion="jobs-ticker"
            style={{ '--marquee-loop': `${loop}px`, animationDuration: `${loop / TICKER_SPEED}s` }}
          >
            {[0, 1].map((rep) =>
              featuredRoles.map((r, i) => (
                <div key={`${rep}-${i}`} aria-hidden={rep === 1 || undefined} className="contents">
                  <SilkJobCard {...r} delay={-i * 1.7} />
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function CxJobs() {
  useDocumentTitle('Kestrel Jobs | Every CX role that uses AI')
  return (
    <div className="min-h-screen bg-jobs-bg pb-[18px] font-inter text-ink md:pb-6 lg:pb-16">
      <JobsHeader />
      <main className="flex flex-col gap-2.5">
        {/* J1 Hero: padding 120 0 48 (phone 96 0 40) */}
        <section className={`${JOBS_COLUMN} pb-10 pt-24 md:pb-12 md:pt-[120px]`}>
          <div className="flex flex-col gap-7 md:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
            <div className="flex flex-col gap-5 lg:w-jobs-title-lg lg:max-w-jobs-title-lg lg:shrink-0 xl:w-jobs-title-xl xl:max-w-jobs-title-xl">
              <JobsEyebrow>Support + AI roles · refreshed weekly</JobsEyebrow>
              <h1 className="text-jobs-h1-phone font-medium md:text-jobs-h1-md lg:text-jobs-h1-lg xl:text-jobs-h1-xl">
                Every CX role where AI does the real work.
              </h1>
            </div>
            <div className="flex flex-col items-start gap-5 lg:flex-1 lg:pl-[150px]">
              <p className="text-jobs-body text-jobs-muted">
                We collect open customer-support roles at teams that put AI to work every day, not just in the pitch deck.
                Each listing is reviewed by hand, grouped by function and level, and free to search for anyone who
                wants the next step.
              </p>
              <JobsButton href="#open-roles">Browse roles</JobsButton>
            </div>
          </div>
        </section>

        <FeaturedTicker />

        <div className={JOBS_COLUMN}>
          <StatsRow stats={stats} />
        </div>

        {/* J4 AI assistant: padding 96 0 80 (tablet 72 0 64, phone 52 0 44), centred column gap 56 */}
        <section id="ask-ai" className={`${JOBS_COLUMN} flex flex-col items-center gap-14 pb-11 pt-[52px] md:pb-16 md:pt-[72px] lg:pb-20 lg:pt-24`}>
          <div className="flex max-w-jobs-ai-head flex-col items-center gap-6 text-center">
            <JobsEyebrow>Search it from your chat</JobsEyebrow>
            <JobsH2>Already inside your AI assistant.</JobsH2>
            <JobsButton>Connect the MCP server</JobsButton>
          </div>
          <McpFlowIllustration />
        </section>

        {/* J5 Open roles: panel #F4F4F5, padding 44 (tablet 44 24, phone 44 0 0), column gap 36 */}
        <section id="open-roles" className={`${JOBS_COLUMN} flex flex-col gap-9 bg-jobs-panel pt-11 md:px-6 md:pb-11 lg:p-11`}>
          <div className="flex flex-col gap-3 px-3 md:flex-row md:items-end md:justify-between md:px-0">
            <JobsH2>Every open role, in one list.</JobsH2>
            <JobsTextLink href="/cx-jobs" className="text-jobs-13-tight">
              View all
            </JobsTextLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {openRoles.map((r) => (
              <JobCard key={r.title} {...r} />
            ))}
          </div>
        </section>

        {/* J6 Report CTA: section padding 32 0 (tablet 16 0 64, phone 12 0 48) */}
        <section className={`${JOBS_COLUMN} pb-12 pt-3 md:pb-16 md:pt-4 lg:py-8`}>
          <div className="flex flex-col bg-white lg:flex-row">
            <div className="flex flex-col items-start justify-center gap-[22px] px-7 py-9 md:p-14 lg:w-[495px] lg:shrink-0 xl:w-[564px]">
              <JobsEyebrow>The template</JobsEyebrow>
              <JobsH2>Writing a role spec for an AI-first team?</JobsH2>
              <p className="text-jobs-body text-jobs-muted">
                Kestrel helps support teams plan the roles that run alongside AI agents. We turned what we learned into a
                free job description template you can copy, edit and post today, with notes on the skills that matter.
              </p>
              <JobsButton>Get the template</JobsButton>
            </div>
            {/* image placeholder (editorial portrait on live): tint-token gradient block, aspect 748x460 */}
            <div aria-hidden="true" className="aspect-[748/460] w-full bg-gradient-to-br from-tint-pink via-tint-yellow to-tint-lavender lg:w-auto lg:min-w-0 lg:flex-1" />
          </div>
        </section>

        <div className={JOBS_COLUMN}>
          <JobsFooter columns={footerColumns} />
        </div>
      </main>
    </div>
  )
}
