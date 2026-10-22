import { Route } from 'react-router-dom'
import Pricing from '../pages/Pricing.jsx'
import GetADemo from '../pages/GetADemo.jsx'
import IntegrationsLibrary from '../pages/IntegrationsLibrary.jsx'
import IntegrationDetail from '../pages/IntegrationDetail.jsx'

// Routes for the "commerce" template group. Owned by that group's builder; App.jsx
// spreads these in. siteRoutes render inside <SiteLayout> (global nav/footer),
// standaloneRoutes render with their own chrome.
export const siteRoutes = [
  <Route key="pricing" path="/pricing" element={<Pricing />} />,
  <Route key="integrations" path="/integrations" element={<IntegrationsLibrary />} />,
  // T4 detail pages come from src/data/integrations.js (api, mcp); other slugs render the 404 page
  <Route key="integration-detail" path="/integrations/:slug" element={<IntegrationDetail />} />,
]
export const standaloneRoutes = [<Route key="get-a-demo" path="/get-a-demo" element={<GetADemo />} />]
