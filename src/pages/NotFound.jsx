import Button from '../components/Button.jsx'
import useDocumentTitle from '../lib/useDocumentTitle.js'

// T6 404 (SPEC_PAGES_C.md T6). Rendered inside SiteLayout (global Nav, Footer V5 directly below, video teaser).
// Content: centred column, padding 160 (phone 160px 49px 49px); text group gap 20 (4 @1000, 16 @390), then 48 to the
// button. H2 uses the Cirka 75/72 | 58/58 | 48/50 | 40/40 steps (= the h2 tokens; Fraunces substitute + its tracking
// override as on the homepage), max-width 80% on tablet, 244 on phone. Sub = the homepage hero-sub scale.
// Button: homepage Button, dark / large, links to "/".
export default function NotFound() {
  useDocumentTitle('404 | Kestrel')
  return (
    <section data-section="not-found" className="flex flex-col items-center px-[49px] pb-[49px] pt-[160px] md:p-[160px]">
      <div className="flex w-full flex-col items-center gap-4 text-center md:gap-1 lg:gap-5">
        <h2 className="max-w-notfound-phone font-framer font-display text-h2-phone tracking-display-sub text-ink md:max-w-[80%] md:text-h2-md md:tracking-display-sub lg:max-w-none lg:text-h2-lg lg:tracking-display-sub xl:text-h2-xl xl:tracking-display-sub">
          That page isn&apos;t here
        </h2>
        <p className="font-sans text-sub-phone text-ink md:text-sub-md lg:text-sub-lg xl:text-sub-xl">
          Let&apos;s get you back to somewhere useful on the Kestrel site.
        </p>
      </div>
      <Button variant="dark" size="lg" href="/" className="mt-12">
        Back home
      </Button>
    </section>
  )
}
