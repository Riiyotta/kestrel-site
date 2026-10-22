import Field, { FileDropZone, Form, SubmitButton } from '../../components/ui/Field.jsx'
import HeroHeadline from '../../components/ui/HeroHeadline.jsx'
import LogoWall from '../../components/ui/LogoWall.jsx'
import { H4_SCALE } from '../../components/ui/type.js'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { logoWallHeading, logoWallLogos, nominatePage as page } from '../../data/leadForms.js'

// /nominate – SPEC_PAGES_C T2 F1b hero + F2 form + F3 LogoWall. Footer comes from SiteLayout.
// F1b: padding 160px 32px 0, column centred, wrapper max-width 1024, gap 37. H1 = two separate centred lines on the
//   homepage H1 scale (96/77/58/40); sub = homepage hero-sub scale (24/19/15/14) #000.
// F2 (`Pricing` section): padding 100px 32px 32px (phone 100px 24px 32px). Form max-width 800, padding 28.98 (0 on
//   phone), column gap 28.98. Name + Email side by side (gap 14.49; stacked <810), then domain (url), "what happened"
//   textarea (145, optional), upload drop zone, full-width block submit.
//   Every field: soft skin – Cirka 40/36 label (36/36 <1440), gap 14.49, 58-tall control.
//   Measured form widths kept: 674 @1000 (x 163) and 308 @390 (live quirks, trivially replicable).
//   Upload label uses the same label style as the fields (FileDropZone itself has no label).
//   Submit: full width x 58, label 14 (13 at 810–1439; live's 10px @1000 normalised to 13 per spec).
// Name, email and domain are required (native validation); the story and the file are optional. Nothing is sent.

export default function NominatePage() {
  useDocumentTitle(page.docTitle)
  const f = page.fields
  return (
    <>
      <section data-section="nominate-hero" className="flex flex-col items-center px-8 pt-40">
        <div className="w-full max-w-[1024px]">
          <HeroHeadline
            gap={37}
            subColor="ink"
            title={page.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            sub={page.sub}
          />
        </div>
      </section>

      <section data-section="nominate-form" className="flex flex-col items-center gap-[29px] px-6 pb-8 pt-[100px] md:px-8">
        <Form
          success={page.success}
          className="flex w-full max-w-[308px] flex-col gap-[28.98px] md:max-w-[674px] md:p-[28.98px] lg:max-w-[800px]"
          successClassName="w-full max-w-[308px] md:max-w-[674px] md:p-[28.98px] lg:max-w-[800px]"
        >
          <div className="flex flex-col gap-[28.98px] md:flex-row md:gap-[14.49px]">
            <Field skin="soft" required {...f.name} className="md:flex-1" />
            <Field skin="soft" required {...f.email} className="md:flex-1" />
          </div>
          <Field skin="soft" required {...f.domain} />
          <Field skin="soft" {...f.story} />
          <div className="flex flex-col gap-[14.49px]">
            <span className={`text-ink ${H4_SCALE}`}>{page.upload.label}</span>
            <FileDropZone name={page.upload.name} helper={page.upload.helper} />
          </div>
          <SubmitButton variant="block">{page.submitLabel}</SubmitButton>
        </Form>
      </section>

      <LogoWall heading={logoWallHeading} logos={logoWallLogos} />
    </>
  )
}
