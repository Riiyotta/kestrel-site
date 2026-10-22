import { Route } from 'react-router-dom'
import AeoDetail from '../pages/product/AeoDetail.jsx'
import { aeoIndustrySlugs, aeoProductSlugs } from '../data/productPages.js'

// Routes for the "product" template group. Owned by that group's builder; App.jsx
// spreads these in. siteRoutes render inside <SiteLayout> (global nav/footer),
// standaloneRoutes render with their own chrome.
//   SPEC_PAGES_A T1 AEO detail: /product/<slug> (7) + /industry/<slug> (3), one data-driven template.
//   SPEC_PAGES_A T2 product landings: /product, /product/coach, /product/voice.
//   SPEC_PAGES_B T8 competitor detail: /competitors/<slug> (the six slugs linked from /competitors).
//   SPEC_PAGES_C T1 company: /about, /careers.
export const siteRoutes = [
  ...aeoProductSlugs.map((slug) => <Route key={`aeo-${slug}`} path={`/product/${slug}`} element={<AeoDetail key={slug} slug={slug} />} />),
  ...aeoIndustrySlugs.map((slug) => <Route key={`aeo-${slug}`} path={`/industry/${slug}`} element={<AeoDetail key={slug} slug={slug} />} />),
]
export const standaloneRoutes = []
