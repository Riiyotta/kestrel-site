import LogoMarquee from '../../components/ui/LogoMarquee.jsx'
import { FindingCards, NumberedContents, QuotePanel, ReportHero, StoryRail } from '../../components/content/Report.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { report } from '../../data/report.js'

// T9 ReportLanding – SPEC_PAGES_B T9: R2 Hero → R2 Trust → R2 Findings → R2 Pull Quote → R2 Whats Inside →
// R2 Customers. Trust: padding 56 24 8, gap 26; label Ginto 14/18 #9A9AA2 centred; LogoMarquee strip 1392 wide
// (Proof `General` tokens: 132 tall card, gap 96, 50 px/s). The Footer follows directly.

export default function ReportLanding() {
  useDocumentTitle('The Handoff Gap | Kestrel')
  return (
    <div data-page="report-landing">
      <ReportHero hero={report.hero} />
      <section data-section="report-trust" className="flex flex-col items-center gap-[26px] px-6 pb-2 pt-14">
        <p className="text-center font-sans text-small text-report-trust">{report.trustLabel}</p>
        <LogoMarquee width="min(1392px, 100%)" label="Customer logos" />
      </section>
      <FindingCards findings={report.findings} />
      <QuotePanel quote={report.quote} />
      <NumberedContents contents={report.contents} />
      <StoryRail stories={report.stories} />
    </div>
  )
}
