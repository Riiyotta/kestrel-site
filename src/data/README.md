# src/data – template content

Page templates render from plain JS data files here, never from copy hard-coded in JSX.

## Convention

- **One file per collection**, named after the collection in camelCase: `stories.js`, `blogPosts.js`,
  `guides.js` (articles), `competitors.js`, `integrations.js`, `pricing.js`, `legal.js`, `team.js`, `faq.js`, …
  Single pages with their own content get one file each (`about.js`, `careers.js`, `pricingPage.js`).
- **Shapes follow the spec interfaces** exactly (field names and nesting), so a template can be checked against its
  spec: e.g. `StorySummary` / `StoryDetail` (SPEC_PAGES_B T1/T2), `BlogPostSummary` / `BlogPost` (B T3/T4),
  `GuideSummary` / `Article` (B T5/T6), `CompetitorIndex` / `CompetitorDetail` (B T7/T8), `ReportPage` (B T9),
  `SocialPost` (B T10), `GlossaryIndex` (B T11), `FaqDoc` (B T12). Group A and C give no TS interfaces; mirror the
  props of the primitive that renders the data (see `COMPONENTS.md`).
- Shared types live in `src/data/types.js` as JSDoc typedefs: `RichTextBlock`, `TocItem`, `CompareColumn` /
  `CompareRow` / `CompareGroup`, `LogoEntry`, `FaqItem`. Reference them in a file header with
  `/** @type {import('./types.js').RichTextBlock[]} */`.
- **Named exports**, one per collection plus small helpers if needed:
  `export const stories = [...]`, `export const getStory = (slug) => stories.find((s) => s.slug === slug)`.
  Collections that have a detail page need a stable `slug`.
- **Long-form text is `RichTextBlock[]`** (rendered by `RichText`); inline formatting is an HTML subset
  (`<a>`, `<strong>`, `<em>`, `<br>`) inside `html` / `items` strings. Data files are trusted source, never user input.
- **Copy is original placeholder text for the fictional product "Kestrel"**, with fictional customers, people and
  competitor *categories*. Match the spec's role, line count and approx char count (`n≈`); never paste or
  paraphrase live-site copy. Omit the hidden "AI Agent Instructions" layer.
- **Images**: brand/content imagery is placeholder. Point `src` at `/assets/...` files (see `IMAGE_CREDITS.md`) or
  leave it empty and let the primitive draw its tint/gradient placeholder box at the measured size. Logos are
  `{ name, shape, w, h }` entries rendered by `PlaceholderLogo`.
- Keep files side-effect free (no fetches, no Date.now()): forms and lists are static and must not send data.

## Existing files

- `cxJobs.js` – /cx-jobs microsite (SPEC_PAGES_C T4).
- `stories.js` – customer stories (B T1/T2): `stories`, `storyQuotes`, `storyIndex` (T1 order), `STORY_CATEGORIES`, `getStory`.
- `blog.js` – blog (B T3/T4): `blogPosts`, `BLOG_CATEGORIES`, `BLOG_INDEX`, `getBlogPost`.
- `articles.js` – CX guides (B T5/T6): `articles` (h2 blocks may carry `minute` + `summary` for TickToc), `ARTICLE_INDEX`, `ARTICLE_CTA`, `getArticle`.
- `report.js` (B T9), `thoughts.js` (B T10), `glossary.js` (B T11), `faq.js` (B T12, answers rendered with RichText variant "faq").
- `legal.js` – /privacy-policy, /terms-of-service (SPEC_PAGES_C T3): `legalPages`, `getLegalPage(slug)`; sample legal text only.
- `leadForms.js` – /partner, /nominate (SPEC_PAGES_C T2): `partnerPage`, `nominatePage`, `logoWallLogos`, `logoWallHeading`.
- `competitors.js` – /competitors (SPEC_PAGES_B T7): `competitorIndex` (Kestrel vs generic categories; table `slug`s for /competitors/:slug).
- `types.js` – shared JSDoc typedefs (no runtime exports).
