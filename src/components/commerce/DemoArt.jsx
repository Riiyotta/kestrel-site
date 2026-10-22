import { GINTO } from '../ui/type.js'

// DemoArt – SPEC_PAGES_A T6 right column ("Frame 299").
//   Column 733 wide, padding 12.5 (1440); 500 wide / padding 12 (1000); full width / padding 12 (390).
//   Art card: radius 8, overflow hidden, decorative gradient art (live PNG -> CSS `bg-demo-art`), 708x875 @1440,
//   476x813 @1000, 366x424 @390 (card padding 20px 10px there). The 1px edge on the PNG is sampled
//   (rgba(0,0,0,.1) = card-border).
//   Centred glass quote card: outer 385x384, padding 12, rgba(255,255,255,.3), radius 16, backdrop blur 30; inner
//   361x360 white, radius 8, padding 24, space-between: 29x29 quote glyph + quote Ginto Medium 18/27 #000 (≈92
//   chars, 3 lines); 313x6 divider; avatar row gap 7.1: photo 78x78 radius 6.51 + name Ginto 20/26 rgba(0,0,0,.75)
//   (16/20.8 phone) + role 16/22.4 #000 (14/19.6 phone).
// Static (spec: no motion on this page).

export default function DemoArt({ quote, person }) {
  return (
    <div className="flex w-full flex-col p-3 md:w-1/2 md:shrink-0 lg:w-auto lg:flex-1 lg:p-[12.5px]">
      <div className="flex h-[424px] items-center justify-center overflow-hidden rounded-sm border border-card-border bg-demo-art px-2.5 py-5 md:h-auto md:flex-1 md:p-0">
        <figure className="m-0 w-full max-w-[385px] rounded-card bg-glass-30 p-3 backdrop-blur-demo-quote">
          <div className="flex min-h-[336px] flex-col justify-between rounded-sm bg-white p-6 md:h-[360px]">
            <div className="flex flex-col gap-4">
              <svg width="29" height="29" viewBox="0 0 29 29" aria-hidden="true" className="fill-ink">
                <path d="M4 9h7v7c0 4-2 7-6 8l-1-2c2-1 3-3 3-5H4Zm13 0h7v7c0 4-2 7-6 8l-1-2c2-1 3-3 3-5h-3Z" />
              </svg>
              <blockquote className={`m-0 ${GINTO} font-medium text-quote-18-27 text-ink`}>{quote}</blockquote>
            </div>
            <figcaption className="flex flex-col gap-6">
              <span aria-hidden="true" className="flex h-1.5 items-center">
                <span className="h-0.5 w-full bg-ink" />
              </span>
              <span className="flex items-end gap-[7.1px]">
                <img src={person.photo} alt="" width="78" height="78" className="h-[78px] w-[78px] rounded-demo-avatar border border-ink object-cover" />
                <span className="flex flex-col">
                  <span className={`${GINTO} text-body-16-md text-body-75 md:text-body-20`}>{person.name}</span>
                  <span className={`${GINTO} text-para-14-phone text-ink md:text-body-16`}>{person.role}</span>
                </span>
              </span>
            </figcaption>
          </div>
        </figure>
      </div>
    </div>
  )
}
