import FaqDocument, { DocHeader } from '../../components/content/FaqDocument.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { faqDoc } from '../../data/faq.js'

// T12 FAQ – SPEC_PAGES_B T12. Main padding 140 64 0 (390: 140 20 0); Post max-w 1000, padding-bottom 120, row
// space-between: left column max-w 600, gap 48 | sticky "Index" column 220 (top 140). The live index renders empty
// (0px), so the column is kept as an empty spacer (hidden on phone) – nothing to measure.

export default function Faq() {
  useDocumentTitle('FAQ | Kestrel')
  return (
    <div data-page="faq" className="px-5 pt-[140px] md:px-16">
      <div className="mx-auto flex w-full max-w-[1000px] justify-between gap-8 pb-[120px]">
        <div className="flex w-full max-w-[600px] flex-col gap-12">
          <DocHeader title={faqDoc.title} lede={faqDoc.lede} updated={faqDoc.updated} />
          <FaqDocument sections={faqDoc.sections} />
        </div>
        <aside aria-hidden="true" className="sticky top-[140px] hidden w-[220px] shrink-0 self-start md:block" />
      </div>
    </div>
  )
}
