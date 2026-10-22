import Field, { Form, SubmitButton } from '../../components/ui/Field.jsx'
import LogoWall from '../../components/ui/LogoWall.jsx'
import { GINTO, H2_SCALE } from '../../components/ui/type.js'
import StreakBackdrop from '../../components/company/StreakBackdrop.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { logoWallHeading, logoWallLogos, partnerPage as page } from '../../data/leadForms.js'

// /partner – SPEC_PAGES_C T2 F1a (`04-Form`) + F3 LogoWall. Footer comes from SiteLayout.
// F1a section: column centred, max-width 1440, padding 180px 32px 120px (>=1200) / 180px 20px 120px (<1200), gap 80.
//   Inner row max-width 1200, space-between, align start: text column 600 + form card 600 (>=1200). Below 1200: column,
//   gap 55 (810–1199) / 53 (phone), both full width.
//   Text column gap 27: H1 Cirka 75/72 -> 58/58 -> 48/50 -> 40/40 (= H2_SCALE steps), left; body block 361 wide
//   (>=1200) / full width, Ginto 16/22.4 (>=1200) / 14/19.6, two paragraphs 20 apart, mailto link #4348DC -> hover
//   #5F63D9 (instant).
//   Glass card: padding 40px 32px, bg rgba(255,255,255,.7), radius 16, shadow 0 6px 73.64px rgba(150,150,150,.3),
//   backdrop blur 10, overflow hidden. Form column gap 20: first + last name (200 x 52 each, gap 14; stacked gap 20
//   <810, still 200 wide as on live), work email, company website (url), textarea 100, outline submit. All fields required, placeholders end "*".
// Native validation only; the Form never sends data and shows a local success message.
// Decorative streaks behind the card: StreakBackdrop (CSS stand-in for the live JPG).

export default function PartnerPage() {
  useDocumentTitle(page.docTitle)
  const f = page.fields
  return (
    <>
      <section data-section="partner-form" className="mx-auto flex w-full max-w-page flex-col items-center gap-20 overflow-x-clip px-5 pb-[120px] pt-[180px] lg:px-8">
        <div className="flex w-full max-w-[1200px] flex-col gap-[53px] md:gap-[55px] lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          <div className="relative z-[1] flex w-full flex-col gap-[27px] lg:w-[600px]">
            <h1 className={`text-ink ${H2_SCALE}`}>{page.title}</h1>
            <div className={`ui-inline flex flex-col gap-5 text-ink lg:w-[361px] ${GINTO} text-para-14-phone lg:text-body-16`}>
              {page.body.map((html, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
              ))}
            </div>
          </div>

          <div className="relative w-full lg:w-[600px]">
            <StreakBackdrop />
            <div className="relative flex flex-col gap-12 overflow-hidden rounded-card bg-white/70 px-8 py-10 shadow-glass-form backdrop-blur-tag">
              <Form success={page.success} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 md:flex-row md:gap-3.5">
                  <Field skin="outline" required {...f.firstName} className="w-[200px]" />
                  <Field skin="outline" required {...f.lastName} className="w-[200px]" />
                </div>
                <Field skin="outline" required {...f.email} />
                <Field skin="outline" required {...f.website} />
                <Field skin="outline" required {...f.message} />
                <SubmitButton variant="outline">{page.submitLabel}</SubmitButton>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <LogoWall heading={logoWallHeading} logos={logoWallLogos} />
    </>
  )
}
