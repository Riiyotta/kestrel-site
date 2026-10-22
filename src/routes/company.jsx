import { Route } from 'react-router-dom'
import LegalPage from '../pages/company/LegalPage.jsx'
import PartnerPage from '../pages/company/PartnerPage.jsx'
import NominatePage from '../pages/company/NominatePage.jsx'
import CompetitorsIndex from '../pages/company/CompetitorsIndex.jsx'

// Routes for the "company" template group. Owned by that group's builder; App.jsx
// spreads these in. siteRoutes render inside <SiteLayout> (global nav/footer),
// standaloneRoutes render with their own chrome.
//   SPEC_PAGES_C T3 Legal: /privacy-policy, /terms-of-service (one template, src/data/legal.js)
//   SPEC_PAGES_C T2 Lead form: /partner, /nominate (src/data/leadForms.js)
//   SPEC_PAGES_B T7 CompetitorIndex: /competitors (src/data/competitors.js). Detail pages /competitors/:slug are
//   not built yet and fall through to the 404.
export const siteRoutes = [
  <Route key="privacy-policy" path="/privacy-policy" element={<LegalPage key="privacy-policy" slug="privacy-policy" />} />,
  <Route key="terms-of-service" path="/terms-of-service" element={<LegalPage key="terms-of-service" slug="terms-of-service" />} />,
  <Route key="partner" path="/partner" element={<PartnerPage />} />,
  <Route key="nominate" path="/nominate" element={<NominatePage />} />,
  <Route key="competitors" path="/competitors" element={<CompetitorsIndex />} />,
]
export const standaloneRoutes = []
