import { Route } from 'react-router-dom'
import AeoDetail from '../pages/product/AeoDetail.jsx'
import ProductHome from '../pages/product/ProductHome.jsx'
import Copilot from '../pages/product/Copilot.jsx'
import Voice from '../pages/product/Voice.jsx'
import CompetitorDetail from '../pages/product/CompetitorDetail.jsx'
import About from '../pages/company/About.jsx'
import Careers from '../pages/company/Careers.jsx'
import { aeoIndustrySlugs, aeoProductSlugs } from '../data/productPages.js'

// Routes for the "product" template group. Owned by that group's builder; App.jsx
// spreads these in. siteRoutes render inside <SiteLayout> (global nav/footer),
// standaloneRoutes render with their own chrome.
//   SPEC_PAGES_A T1 AEO detail: /product/<slug> (7) + /industry/<slug> (3), one data-driven template.
//   SPEC_PAGES_A T2 product landings: /product, /product/coach, /product/voice.
//   SPEC_PAGES_B T8 competitor detail: /competitors/<slug> (the six slugs linked from /competitors).
//   SPEC_PAGES_C T1 company: /about, /careers.
export const siteRoutes = [
  <Route key="product" path="/product" element={<ProductHome />} />,
  <Route key="product-coach" path="/product/coach" element={<Copilot />} />,
  <Route key="product-voice" path="/product/voice" element={<Voice />} />,
  ...aeoProductSlugs.map((slug) => <Route key={`aeo-${slug}`} path={`/product/${slug}`} element={<AeoDetail key={slug} slug={slug} />} />),
  ...aeoIndustrySlugs.map((slug) => <Route key={`aeo-${slug}`} path={`/industry/${slug}`} element={<AeoDetail key={slug} slug={slug} />} />),
  <Route key="about" path="/about" element={<About />} />,
  <Route key="careers" path="/careers" element={<Careers />} />,
  // unknown slugs render the 404 page from inside the template
  <Route key="competitor-detail" path="/competitors/:slug" element={<CompetitorDetail />} />,
]
export const standaloneRoutes = []
