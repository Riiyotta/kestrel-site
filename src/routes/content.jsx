import { Route } from 'react-router-dom'
import StoryIndex from '../pages/content/StoryIndex.jsx'
import StoryDetail from '../pages/content/StoryDetail.jsx'
import BlogIndex from '../pages/content/BlogIndex.jsx'
import BlogPost from '../pages/content/BlogPost.jsx'
import ArticleIndex from '../pages/content/ArticleIndex.jsx'
import ArticleDetail from '../pages/content/ArticleDetail.jsx'
import ReportLanding from '../pages/content/ReportLanding.jsx'
import ThoughtsIndex from '../pages/content/ThoughtsIndex.jsx'
import Glossary from '../pages/content/Glossary.jsx'
import Faq from '../pages/content/Faq.jsx'

// Routes for the "content" template group (SPEC_PAGES_B T1–T6, T9–T12). Owned by that group's builder; App.jsx
// spreads these in. siteRoutes render inside <SiteLayout> (global nav/footer), standaloneRoutes render with their
// own chrome. Detail pages render NotFound for unknown slugs.
export const siteRoutes = [
  <Route key="stories" path="/customer-stories" element={<StoryIndex />} />,
  <Route key="story" path="/customer-stories/:slug" element={<StoryDetail />} />,
  <Route key="blog" path="/blog" element={<BlogIndex />} />,
  <Route key="blog-post" path="/blog/:slug" element={<BlogPost />} />,
  <Route key="articles" path="/articles" element={<ArticleIndex />} />,
  <Route key="article" path="/articles/:slug" element={<ArticleDetail />} />,
  <Route key="report" path="/content/the-handoff-gap" element={<ReportLanding />} />,
  <Route key="thoughts" path="/thoughts-on-cx" element={<ThoughtsIndex />} />,
  <Route key="glossary" path="/glossary" element={<Glossary />} />,
  <Route key="faq" path="/faq" element={<Faq />} />,
]
export const standaloneRoutes = []
