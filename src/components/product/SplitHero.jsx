import { Link } from 'react-router-dom'
import '../ui/ui.css'
import Button from '../Button.jsx'
import ProductArt from './ProductArt.jsx'
import { BODY_SCALE, CIRKA, H2_SCALE, SMALL_SCALE } from '../ui/type.js'

// SplitHero – SPEC_PAGES_A T1.1 (all 10 AEO detail pages).
//   Wrapper: flex row centred, overflow clip, max-w 1440, padding 160px 64px 40px (>=1200) / 160px 32px 40px
//   (810–1199) / 160px 20px 40px (phone).
//   Inner: row, gap 26, max-w 1110 (936 @1000); phone = column, gap 26, media first.
//   Text column 542 (455 @1000, 350 phone), column gap 24, justify centre, align start:
//     H1 product pages Cirka 75/72 −3 -> 58/58 -> 48/50 -> 40/40 (= H2 scale);
//     H1 healthcare/insurance (`h1Size` 60) Cirka 60/60 −2.4 -> 50/50 -> 40/40 -> 40/40;
//     lede + optional intro Ginto 20/26 -> 18/23.4 -> 16/20.8 #666 (intro may carry one #4348DC link);
//     optional byline Ginto 14/18 -> 13/18 -> 13/14.3 #666 (industry pages);
//     CTA group (column gap 14): Button dark lg + Button light lg (gap 12), then the optional self-serve line
//     Ginto 14/18 #333 whose first words are an underlined link in the same colour.
//   Media: 542² (455² / 350²), radius 8, overflow clip, vertically centred. Live = mux video or Rive tile over a
//     still -> static ProductArt panel (content placeholder, same footprint).
// Motion: none (buttons keep the homepage hover).

const H1_60 = `${CIRKA} text-h2-phone tracking-display-sub md:text-h3-md md:tracking-display-sub lg:text-h3-lg lg:tracking-display-sub xl:text-h3-xl xl:tracking-display-sub`

export default function SplitHero({ hero, h1Size = 75 }) {
  return (
    <section data-section="split-hero" className="mx-auto flex w-full max-w-page justify-center overflow-clip px-5 pb-10 pt-40 md:px-8 lg:px-16">
      <div className="flex w-full max-w-[350px] flex-col-reverse gap-[26px] md:max-w-[936px] md:flex-row lg:max-w-[1110px]">
        <div className="flex w-full flex-col items-start justify-center gap-6 md:w-[455px] md:shrink-0 lg:w-[542px]">
          <h1 className={`text-ink ${h1Size === 60 ? H1_60 : H2_SCALE}`}>{hero.title}</h1>
          <p className={`${BODY_SCALE} text-muted`}>{hero.lede}</p>
          {hero.intro ? <p className={`ui-inline ${BODY_SCALE} text-muted`} dangerouslySetInnerHTML={{ __html: hero.intro }} /> : null}
          {hero.byline ? <p className={`${SMALL_SCALE} text-muted`}>{hero.byline}</p> : null}
          <div className="flex flex-col items-start gap-3.5">
            <div className="flex flex-wrap gap-3">
              <Button variant="dark" href="/get-a-demo">
                Book a demo
              </Button>
              <Button variant="light" href="#">
                Start free trial
              </Button>
            </div>
            {hero.selfServe ? (
              <p className="font-sans text-small text-body">
                <Link to={hero.selfServe.href || '/pricing'} className="underline">
                  {hero.selfServe.link}
                </Link>{' '}
                {hero.selfServe.rest}
              </p>
            ) : null}
          </div>
        </div>
        <div className="relative aspect-square w-full shrink-0 self-center overflow-clip rounded-sm md:w-[455px] lg:w-[542px]">
          <ProductArt scene={hero.art?.scene} tint={hero.art?.tint} />
        </div>
      </div>
    </section>
  )
}
