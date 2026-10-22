import PlaceholderLogo from '../PlaceholderLogo.jsx'
import { CIRKA } from '../ui/type.js'
import { STORY_THEME } from './storyTheme.js'

// StoryHero – SPEC_PAGES_B T2, two variants. No motion (none measured).
// quote: full-bleed theme-light, 776 tall, padding 160 80 80 (gap 32, content vertically centred). Pull quote Cirka
//   60/60 −2.4 #000 centred (50/50 @1280); tablet 689 tall, padding 96 20 80, content max-w 73%, 40/40; phone 495
//   tall, padding 96 16 24, gap 24, 24/24 −0.96 LEFT. Attribution: row gap 6 – name Ginto Medium 20/25 #000 + ","
//   Ginto Bold theme mid + role 20/26 rgba(0,0,0,.75) (18/25 + 18/23.4 @1280); <1200 stacked (name 16/16, role
//   18/23.4 tablet / 16/20.8 phone). Logo box 50 tall (31 phone). Spec text says the logo box is left-aligned in a
//   1264 box, but the reference screenshot shows the mark centred under the quote – centred here.
// split: 50/50 – left 720 theme-light, padding 160 80 80, content max-w 640, gap 16: title Cirka 60/60 left (w544);
//   name 20/25 over role 20/26 rgba(0,0,0,.75); logo 544×50. Right image 720×780 cover. Tablet: image first 1000²,
//   text panel padding 80 40, content max-w 73%, title 40/40. Phone: image 390×450, panel padding 24 16, content
//   max-w 85%, title 24/24 left, name 16/16, role 16/20.8, logo 31 tall.

export default function StoryHero({ story }) {
  const th = STORY_THEME[story.theme]
  const { hero, person, logo } = story
  if (hero.variant === 'split') {
    return (
      <section data-section="story-hero" data-variant="split" className="flex w-full flex-col lg:min-h-[776px] lg:flex-row">
        <div className="order-1 h-[450px] w-full overflow-hidden bg-card-gray md:h-auto md:aspect-square lg:order-2 lg:aspect-auto lg:h-[780px] lg:w-1/2 lg:-mt-0.5">
          {hero.image ? <img src={hero.image} alt="" className="h-full w-full object-cover" /> : null}
        </div>
        <div className={`order-2 flex w-full items-center px-4 py-6 md:px-10 md:py-20 lg:order-1 lg:w-1/2 lg:px-20 lg:pb-20 lg:pt-[160px] ${th.light}`}>
          <div className="flex max-w-[85%] flex-col gap-4 md:max-w-[73%] lg:max-w-[640px]">
            <h1 className={`${CIRKA} text-quote-phone tracking-display-sub text-ink md:text-h3-md md:tracking-display-sub lg:max-w-[544px] lg:text-h3-lg lg:tracking-display-sub xl:text-h3-xl xl:tracking-display-sub`}>
              {hero.quote}
            </h1>
            <div className="flex flex-col">
              <span className="font-sans font-medium text-[16px] leading-4 text-ink lg:text-[18px] lg:leading-[25px] xl:text-name-20">{person.name}</span>
              <span className="font-sans text-body-16-md text-body-75 md:text-body-18 xl:text-body-20">{person.role}</span>
            </div>
            <PlaceholderLogo name={logo.name} shape={logo.shape} w={130} h={31} className={`${th.fill} md:hidden`} />
            <PlaceholderLogo name={logo.name} shape={logo.shape} w={210} h={50} className={`${th.fill} hidden md:block`} />
          </div>
        </div>
      </section>
    )
  }
  return (
    <section
      data-section="story-hero"
      data-variant="quote"
      className={`flex min-h-[495px] w-full items-center px-4 pb-6 pt-24 md:min-h-[689px] md:px-5 md:pb-20 lg:min-h-[776px] lg:px-20 lg:pb-20 lg:pt-[160px] ${th.light}`}
    >
      <div className="mx-auto flex w-full flex-col gap-6 md:max-w-[73%] md:items-center md:gap-8 lg:max-w-none lg:pr-4">
        <h1 className={`${CIRKA} text-quote-phone tracking-display-sub text-ink md:text-center md:text-h3-md md:tracking-display-sub lg:text-h3-lg lg:tracking-display-sub xl:text-h3-xl xl:tracking-display-sub`}>
          {hero.quote}
        </h1>
        <p className="flex flex-col md:items-center lg:flex-row lg:gap-1.5">
          <span className="font-sans font-medium text-[16px] leading-4 text-ink lg:text-[18px] lg:leading-[25px] xl:text-name-20">
            {person.name}
            <span className={`hidden font-bold lg:inline ${th.mid}`}>,</span>
          </span>
          <span className="font-sans text-body-16-md text-body-75 md:text-body-18 xl:text-body-20">{person.role}</span>
        </p>
        <PlaceholderLogo name={logo.name} shape={logo.shape} w={130} h={31} className={`${th.fill} md:hidden`} />
        <PlaceholderLogo name={logo.name} shape={logo.shape} w={210} h={50} className={`${th.fill} hidden md:block`} />
      </div>
    </section>
  )
}
