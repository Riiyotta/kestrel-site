import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import VideoTeaser from '../components/VideoTeaser.jsx'

// Resets scroll on route change; Lenis owns scrolling, so go through it when present.
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Pages where live has no floating video teaser: every SPEC_PAGES_A page (product, industry,
// pricing, integrations), and article detail, which uses a sticky CtaChip instead (SPEC_PAGES_B T6).
const NO_TEASER = [/^\/product(\/|$)/, /^\/industry\//, /^\/pricing\/?$/, /^\/integrations(\/|$)/, /^\/articles\/[^/]+/]

// Global chrome (nav, footer, video teaser) used by every page except the
// standalone ones (cx-jobs, press-kit, get-a-demo), which render their own (SPEC_PAGES_C).
export default function SiteLayout() {
  const { pathname } = useLocation()
  const showTeaser = !NO_TEASER.some((re) => re.test(pathname))
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      {showTeaser && <VideoTeaser />}
    </>
  )
}
