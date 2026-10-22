// EmployeeCard – SPEC_PAGES_C A5 / C4 team quote card (about + careers). Grids / the careers phone carousel are
// the template's job (the carousel is a Stories-slideshow variant).
//
// layout "horizontal" (Framer Variant 1): row, 242 tall, radius 8, bg = tint, no border/shadow. Text container
//   (card − 242 wide, padding 16px 12px 12px, radius 9.43) holds a 214-tall space-between column: quote Cirka
//   16/14.4 (line-height .9) ls normal #0C2D10, then a bottom row (space-between, align end): name Ginto Bold
//   11.79/14.74 #000 + flag emoji (gap 8) over role Ginto 11.79/14.74 #000 | 18x18 profile glyph link (black, no
//   hover). Photo frame 242x242, padding 12 -> photo 218x218 radius 6 cover, on the right.
//   (The live text container's backdrop-filter blur(23.36px) has no visible effect: omitted.)
// layout "vertical" (Variant 2, phone + careers carousel): column, square photo frame (card width, padding 12,
//   radius 6 photo) on top, text container below (234 tall, same padding/type). About @390: 342x576.
// tint: pink #FFEAFC | cream #FBF6E5 | peach #FEECEA | grey #E5E5E5 | lavender #E9E9F8 (cards cycle through them).

const TINTS = {
  pink: 'bg-employee-pink',
  cream: 'bg-employee-cream',
  peach: 'bg-employee-peach',
  grey: 'bg-card-gray',
  lavender: 'bg-tint-lavender',
}
export const EMPLOYEE_TINTS = Object.keys(TINTS)

function ProfileGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="fill-ink">
      <path d="M3 1.5h12A1.5 1.5 0 0 1 16.5 3v12a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 15V3A1.5 1.5 0 0 1 3 1.5Zm6 3.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm-4.2 9.2h8.4c-.4-2-2.1-3.3-4.2-3.3s-3.8 1.3-4.2 3.3Z" />
    </svg>
  )
}

export default function EmployeeCard({ quote, name, role, flag, photo, profileHref = '#', layout = 'horizontal', tint = 'pink', className = '' }) {
  const vertical = layout === 'vertical'
  const text = (
    <div className={`flex min-w-0 flex-col rounded-emp-text pb-3 pl-3 pr-3 pt-4 ${vertical ? 'h-[234px] w-full' : 'h-full flex-1'}`}>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-[14.15px]">
          <p className="font-framer font-display text-emp-quote text-tag-text-green">{quote}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-sans text-emp-name font-bold text-ink">
              {name}
              {flag ? <span className="text-[15px] leading-none">{flag}</span> : null}
            </p>
            <p className="truncate font-sans text-emp-name text-ink">{role}</p>
          </div>
          <a href={profileHref} aria-label={`${name} profile`} className="shrink-0">
            <ProfileGlyph />
          </a>
        </div>
      </div>
    </div>
  )
  const photoFrame = (
    <div className={`shrink-0 p-3 ${vertical ? 'aspect-square w-full' : 'h-[242px] w-[242px]'}`}>
      <div className="h-full w-full overflow-hidden rounded-photo-sm bg-gradient-to-br from-tint-yellow via-card-gray to-tint-lavender">
        {photo?.src ? <img src={photo.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" style={photo.position ? { objectPosition: photo.position } : undefined} /> : null}
      </div>
    </div>
  )
  return (
    <article data-ui="employee-card" data-layout={layout} className={`flex overflow-hidden rounded-sm ${TINTS[tint] || TINTS.pink} ${vertical ? 'flex-col' : 'h-[242px] flex-row'} ${className}`}>
      {vertical ? photoFrame : text}
      {vertical ? text : photoFrame}
    </article>
  )
}
