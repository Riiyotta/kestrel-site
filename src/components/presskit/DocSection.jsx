// T5 DocSection: 1px left + top rule rgba(0,0,0,.1) drawn as an overlay (Intro: left only), padding 32px 32px 120px
// (side padding 20 @390), column gap 30. `pb` overrides the bottom padding (TOC 200, Color 0).
export const DISPLAY_HEADING =
  'font-framer font-display text-ink text-h2-phone tracking-display-sub md:text-h2-md md:tracking-display-sub lg:text-h2-lg lg:tracking-display-sub xl:text-h2-xl xl:tracking-display-sub'
export const BODY_TEXT = 'font-sans text-body-75 text-body-16-md md:text-body-18 xl:text-body-20'

export default function DocSection({ id, top = true, pb = 'pb-[120px]', children }) {
  return (
    <section
      id={id}
      className={`relative flex flex-col gap-[30px] px-5 pt-8 md:px-8 ${pb} after:pointer-events-none after:absolute after:inset-0 after:border-l after:border-card-border ${top ? 'after:border-t' : ''}`}
    >
      {children}
    </section>
  )
}

// Two equal halves (stays two columns on phone): heading left, body right (paragraph gap 20).
export function DocHeaderRow({ title, children, as: H = 'h2' }) {
  return (
    <div className="flex">
      <H className={`w-1/2 ${DISPLAY_HEADING}`}>{title}</H>
      <div className={`flex w-1/2 flex-col gap-5 ${BODY_TEXT}`}>{children}</div>
    </div>
  )
}
