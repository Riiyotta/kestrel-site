import Logo from '../Logo.jsx'

// T5 DocSidebar ("Navigation"): 18% of viewport (>=810), sticky top 0, height = content (300 @1440), white, column gap 24,
// padding-bottom 30. Logo at (32, 22); the 72px logo row height is sampled from the screenshot (Intro link at y ~97).
// Contents: padding 0 32px 30px (phone 0 20px 30px), gap 10, anchor links 14/18 (13/18 @1000-1439, 13/14.3 @390),
// 1px bottom rule rgba(0,0,0,.1) across the full width. "Home": padding 0 20px 0 32px, 14/18 #666.
// No hover / active state measured (no scroll-spy). Phone: normal (non-sticky) top block.
const LINK_TYPE = 'text-small-13-tight md:text-small-13 xl:text-small'

// Lenis owns scrolling: route in-page anchor clicks through it so the jump is smoothed like the rest of the site.
export function scrollToAnchor(e, hash) {
  const el = document.querySelector(hash)
  if (!el) return
  e.preventDefault()
  if (window.lenis) window.lenis.scrollTo(el)
  else el.scrollIntoView()
  window.history.replaceState(null, '', hash)
}

export default function DocSidebar({ links }) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 bg-white pb-[30px] md:sticky md:top-0 md:w-press-sidebar md:self-start">
      <div className="flex h-[72px] items-start px-8 pt-[22px]">
        <Logo href="/" />
      </div>
      <nav aria-label="Contents" className={`flex flex-col gap-2.5 px-5 pb-[30px] font-sans text-ink shadow-[inset_0_-1px_0] shadow-card-border md:px-8 ${LINK_TYPE}`}>
        {links.map((l) => (
          <a key={l.hash} href={l.hash} onClick={(e) => scrollToAnchor(e, l.hash)}>
            {l.label}
          </a>
        ))}
      </nav>
      <a href="/" className={`pl-8 pr-5 font-sans text-muted ${LINK_TYPE}`}>
        Home
      </a>
    </aside>
  )
}
