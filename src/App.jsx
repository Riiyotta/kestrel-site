import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SmoothScroll from './lib/SmoothScroll.jsx'
import SiteLayout, { ScrollToTop } from './layouts/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import PressKit from './pages/PressKit.jsx'
import CxJobs from './pages/CxJobs.jsx'
import LlmsTxtRedirect from './pages/LlmsTxtRedirect.jsx'
import Primitives from './pages/__Primitives.jsx'
import * as product from './routes/product.jsx'
import * as commerce from './routes/commerce.jsx'
import * as content from './routes/content.jsx'
import * as company from './routes/company.jsx'

// Each template group owns one file in src/routes/ and exports arrays of <Route>
// elements, so groups can add pages without editing this table.
const groups = [product, commerce, content, company]

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            {groups.flatMap((g) => g.siteRoutes)}
            {/* T6: any unknown path */}
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* standalone (SPEC_PAGES_C T4 / T5): own chrome, no global nav/footer/teaser */}
          <Route path="/cx-jobs" element={<CxJobs />} />
          <Route path="/press-kit" element={<PressKit />} />
          <Route path="/llms-txt" element={<LlmsTxtRedirect />} />
          {groups.flatMap((g) => g.standaloneRoutes)}
          {import.meta.env.DEV && <Route path="/__primitives" element={<Primitives />} />}
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}
