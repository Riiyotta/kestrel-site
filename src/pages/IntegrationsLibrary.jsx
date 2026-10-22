import { useEffect, useState } from 'react'
import HeroHeadline from '../components/ui/HeroHeadline.jsx'
import LogoMarquee from '../components/ui/LogoMarquee.jsx'
import { QUOTE_SCALE } from '../components/ui/type.js'
import Button from '../components/Button.jsx'
import IntegrationOrbit from '../components/commerce/IntegrationOrbit.jsx'
import IntegrationCatalog from '../components/commerce/IntegrationCatalog.jsx'
import SetupSection from '../components/commerce/SetupSection.jsx'
import useDocumentTitle from '../lib/useDocumentTitle.js'
import { categories, categoryItems, integrationHref, integrationsPage as page, orbitTiles } from '../data/integrations.js'

// /integrations – SPEC_PAGES_A T3. Nav/Footer come from SiteLayout.
// T3.1 hero (0–1458 @1440): padding 180px 64px 80px (180px 32px 80px @1280/1000, 180px 20px 80px phone), column gap
//   96 between the text block and the orbit. HeroHeadline: H1 96/96 (77 / 58 / 40), sub 24/30 −0.48 #333 max-w 793,
//   one Button dark lg with arrow (264x42). IntegrationOrbit 818 (338 phone).
// T3.2 (1458–1707): heading Cirka 30/30 −1.2 centred, wrapper padding 0 20px 63px, gap 24; LogoMarquee card at
//   viewport − 40 (1400 / 1240 / 960); phone = two opposing 20px tickers (homepage phone variant, 108 tall). Ticker
//   speed is not stated for T3: the A-template 50px/s strip speed is used (30px/s for the phone pair, as homepage).
// T3.3 IntegrationCatalog (1707–4372). T3.4 SetupSection (4372–6350).
// Motion: orbit loop (in IntegrationOrbit). The on-load fades of the catalogue blocks are flagged for the
// animation pass (data-motion="catalog-appear"), not implemented here.

function usePhone() {
  const q = '(max-width: 809.98px)'
  const [phone, setPhone] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setPhone(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return phone
}

export default function IntegrationsLibrary() {
  useDocumentTitle('Kestrel | Integration library')
  const phone = usePhone()
  return (
    <div data-page="integrations">
      <section className="flex flex-col items-center gap-24 overflow-x-clip px-5 pb-20 pt-[180px] md:px-8 xl:px-16">
        <HeroHeadline
          title={page.title}
          sub={page.sub}
          subColor="body"
          subMaxWidth="max-w-[793px]"
          actions={
            <Button variant="dark" href={page.cta.href}>
              {page.cta.label}
            </Button>
          }
        />
        <IntegrationOrbit size={phone ? 338 : 818} tiles={orbitTiles} hrefFor={integrationHref} />
      </section>

      <section className="flex flex-col items-center gap-6 px-5 pb-[63px]">
        <h2 className={`text-center text-ink ${QUOTE_SCALE}`}>{page.tickerHeading}</h2>
        {phone ? (
          <div className="mask-marquee flex w-full flex-col gap-9 overflow-hidden py-4">
            <LogoMarquee card={false} height={20} speed={30} direction="left" />
            <LogoMarquee card={false} height={20} speed={30} direction="right" />
          </div>
        ) : (
          <LogoMarquee width="100%" />
        )}
      </section>

      <IntegrationCatalog categories={categories} itemsFor={categoryItems} hrefFor={integrationHref} />
      <SetupSection setup={page.setup} />
    </div>
  )
}
