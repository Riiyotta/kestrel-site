import Stories from '../../components/Stories.jsx'
import EmployeeCard from '../../components/ui/EmployeeCard.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import AvatarHero from '../../components/company/AvatarHero.jsx'
import OpenRoles from '../../components/company/OpenRoles.jsx'
import PhotoGallery from '../../components/company/PhotoGallery.jsx'
import ValuesBento from '../../components/company/ValuesBento.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { careersPage as page } from '../../data/company.js'

// /careers – SPEC_PAGES_C T1 (doc height 6467 @1440). Nav/Footer from SiteLayout.
// C1 AvatarHero (900) -> C2 PhotoGallery (908) -> C3 ValuesBento (980) -> C4 team (1486): SectionHeading (H2 + soft
//   sub) + EmployeeCard grid, 2 columns x 4 (column gap 16, card gap 16, container 1200; 1076 @1280), single column
//   @810–1199, Stories "employee" carousel below 810 -> C5 OpenRoles (460 on live with the error fallback).
// Section wrappers: padding 102 (102px 32px tablet, 102px 24px phone), gap 80.
// Motion: avatar fade-in (0 / 0.5s, 0.8s [0.44,0,0.56,1]) and <=1199 avatar tickers (AvatarHero), gallery photo
//   fades (PhotoGallery), phone employee carousel (Stories engine, 5s). Everything else static.

export default function Careers() {
  useDocumentTitle(page.docTitle)
  const team = page.team.employees
  return (
    <div data-page="careers">
      <AvatarHero lines={page.hero.lines} cta={page.hero.cta} avatars={page.hero.avatars} />
      <PhotoGallery title={page.gallery.title} sub={page.gallery.sub} photos={page.gallery.photos} />
      <ValuesBento title={page.values.title} sub={page.values.sub} items={page.values.items} />

      <section data-section="team" className="flex flex-col items-center gap-20 overflow-hidden bg-white px-6 py-[102px] md:px-8 lg:px-[102px]">
        <SectionHeading title={page.team.title} sub={page.team.sub} titleClassName="mx-auto max-w-[900px]" />
        <div className="hidden w-full max-w-[1200px] gap-4 md:grid lg:grid-cols-2">
          {team.map((e) => (
            <EmployeeCard key={e.name} {...e} />
          ))}
        </div>
        <div className="w-full md:hidden">
          <Stories card="employee" items={team} />
        </div>
      </section>

      <OpenRoles title={page.roles.title} sub={page.roles.sub} jobs={page.roles.jobs} boardHref={page.roles.boardHref} />
    </div>
  )
}
