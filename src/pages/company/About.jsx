import Proof from '../../components/Proof.jsx'
import EmployeeCard from '../../components/ui/EmployeeCard.jsx'
import SplitText from '../../components/ui/SplitText.jsx'
import PhotoCollage from '../../components/company/PhotoCollage.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { aboutPage as page } from '../../data/company.js'

// /about – SPEC_PAGES_C T1 (doc height 5078 @1440). Nav/Footer from SiteLayout.
// A1 SplitText header (pt 200, H1, 4 paragraphs) -> A2 PhotoCollage -> 41px white spacer (11 phone) -> A3 Proof
//   variant "logos" (heading-only Proof-Section, about-fade bg, single-row strip at every width) -> A4 SplitText main
//   (pt 100, H2, one paragraph block with <br> breaks + 4 links) -> 150 gap -> A5 EmployeeCard grid -> 80 to the footer.
// A5 grid: >=1200 row, gap 16, container 1360 at x 40 (cards 672x242 @1440, 592 @1280); 810–1199 column, gap 16,
//   x 24 (952 wide); phone column, x 24, vertical cards (342 wide).
// Motion: about logo strip −50 px/s (inside Proof/LogoMarquee). Everything else static.

export default function About() {
  useDocumentTitle(page.docTitle)
  return (
    <div data-page="about">
      <SplitText title={page.mission.title} blocks={page.mission.blocks} />
      <PhotoCollage photos={page.collage} />
      <div aria-hidden="true" className="h-[11px] bg-white md:h-[41px]" />
      <Proof variant="logos" heading={page.logosHeading} logos={page.logos} />
      <SplitText pt={100} lgTight={false} as="main" headingAs="h2" title={page.team.title} blocks={page.team.blocks} />
      <section data-section="employees" className="mx-auto flex w-full max-w-page flex-col gap-4 px-6 pb-20 pt-[150px] lg:flex-row lg:px-10">
        {page.employees.map((e) => (
          <div key={e.name} className="lg:flex-1">
            <EmployeeCard {...e} layout="vertical" className="md:hidden" />
            <EmployeeCard {...e} className="hidden md:flex" />
          </div>
        ))}
      </section>
    </div>
  )
}
