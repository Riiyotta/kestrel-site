import { useParams } from 'react-router-dom'
import DetailHeader from '../components/commerce/DetailHeader.jsx'
import MetaCard from '../components/commerce/MetaCard.jsx'
import IntegrationCard from '../components/ui/IntegrationCard.jsx'
import { BODY_SCALE, GINTO, QUOTE_SCALE } from '../components/ui/type.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'
import NotFound from './NotFound.jsx'
import { getIntegration, integrationHref, otherApps } from '../data/integrations.js'

// /integrations/:slug – SPEC_PAGES_A T4 (built for the entries in src/data/integrations.js that carry `detail`:
// /integrations/api and /integrations/mcp; any other slug renders the 404 page).
// Layout @1440: wrapper padding 120px 64px 0 (side padding below 1440 not stated: 32 tablet/1280, 20 phone as T3);
//   frame max-w 1200, column gap 40: DetailHeader -> body row (gap 66): main (834 @1440, 754 @1280, full width
//   <=1199; column gap 30.45; 3 blocks gap 12: H2/H3 Ginto 28/32 −1.12 #000 + p 20/26 rgba(0,0,0,.75) -> 18/23.4 ->
//   16/20.8) + MetaCard (300, sticky top 120, hidden <=1199).
// "Other apps": padding-top 40, column gap 32; header row gap 6: H2 "Other apps" + H3 category, Cirka 30/30 −1.2
//   (28 / 26 / 24); grid 2 x 587 (1 column phone) of 4 IntegrationCards, 3px transparent border as in T3.3.
// Motion: the live on-load fade of "Other apps" (opacity .001 -> 1, spring {duration .6, bounce 0}) is flagged for
//   the animation pass (data-motion="other-apps-appear"), not implemented here.

export default function IntegrationDetail() {
  const { slug } = useParams()
  const item = getIntegration(slug)
  useDocumentTitle(item?.detail ? `Kestrel | ${item.name} integration` : 'Kestrel | Page not found')
  if (!item?.detail) return <NotFound />
  const { detail } = item
  const others = otherApps(slug)

  return (
    <div data-page="integration-detail" className="px-5 pt-[120px] md:px-8 xl:px-16">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 bg-white">
        <DetailHeader name={item.name} lede={detail.lede} category={detail.category} logo={item.logo} />
        <div className="flex gap-[66px]">
          <article className="flex min-w-0 flex-1 flex-col gap-[30.45px]">
            {detail.sections.map((s) => {
              const H = s.as
              return (
                <div key={s.heading} className="flex flex-col gap-3">
                  <H className={`${GINTO} text-detail-h2 text-ink`}>{s.heading}</H>
                  <p className={`${BODY_SCALE} text-body-75`}>{s.text}</p>
                </div>
              )
            })}
          </article>
          <MetaCard website={item.website} category={detail.category} className="hidden lg:flex" />
        </div>
        <section data-motion="other-apps-appear" data-appear-duration="0.6" className="flex flex-col gap-8 pt-10">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <h2 className={`text-ink ${QUOTE_SCALE}`}>Other apps</h2>
            <h3 className={`text-ink ${QUOTE_SCALE}`}>{detail.category}</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 border-[3px] border-transparent md:grid-cols-2">
            {others.map((o) => (
              <IntegrationCard key={o.slug} name={o.name} description={o.description} logo={o.logo} href={integrationHref(o)} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
