# Kestrel marketing site: information architecture

Source: LORIKEET clone (React 18 + Vite + Tailwind v3) of a marketing site, placeholder content for the fictional product Kestrel; codebase at /Users/riyaghosh/V3/LORIKEET, specs CLONE_SPEC.md + SPEC_PAGES_A/B/C.md
Status: **partly planned: 24 templates are built and routed (AEO detail was routed by the product group during this pass); 6 templates (product overview/coach/voice, competitor detail, about, careers) come from the specs and have no page or route in src/routes/product.jsx yet** · production approved: **false**
71 routes · 30 templates · 120 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Article detail, AEO detail, Customer story detail) account for 29 of 71 routes (41%). The remaining 42 routes span 27 templates.

| template | routes | share |
|---|---:|---:|
| Article detail | 11 | 15% |
| AEO detail | 10 | 14% |
| Customer story detail | 8 | 11% |
| Blog post | 8 | 11% |
| Competitor detail | 6 | 8% |
| Integration detail | 2 | 3% |
| Legal | 2 | 3% |
| llms.txt | 2 | 3% |
| Homepage | 1 | 1% |
| Product landing: overview | 1 | 1% |
| Product landing: coach | 1 | 1% |
| Product landing: voice | 1 | 1% |
| Integrations library | 1 | 1% |
| Pricing | 1 | 1% |
| Get a demo | 1 | 1% |
| Customer story index | 1 | 1% |
| Blog index | 1 | 1% |
| Article index | 1 | 1% |
| Competitors index | 1 | 1% |
| Report landing | 1 | 1% |
| Thoughts on CX | 1 | 1% |
| Glossary | 1 | 1% |
| FAQ document | 1 | 1% |
| Company: about | 1 | 1% |
| Company: careers | 1 | 1% |
| Lead form: partner | 1 | 1% |
| Lead form: nominate | 1 | 1% |
| Jobs board microsite | 1 | 1% |
| Press kit | 1 | 1% |
| 404 not found | 1 | 1% |

## Page chrome

**38 routes carry chrome = `full`** — Homepage, Customer story index, Customer story detail, Blog index, Blog post, Article index, Competitors index, Competitor detail, Report landing, Thoughts on CX, Glossary, FAQ document, Company: about, Company: careers, Lead form: partner, Lead form: nominate, Legal, 404 not found.

**28 routes carry chrome = `full-no-teaser`** — AEO detail, Product landing: overview, Product landing: coach, Product landing: voice, Integrations library, Integration detail, Pricing, Article detail.

**4 routes carry chrome = `none`** — Get a demo, Press kit, llms.txt.

**1 routes carry chrome = `own`** — Jobs board microsite.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `chrome.nav` | CHROME | 26 | 66 | `src/components/Nav.jsx (via src/layouts/SiteLayout.jsx)` | Every template rendered inside SiteLayout; absent on the jobs board, press kit, get-a-demo and llms.txt. |
| `chrome.footer` | CHROME | 26 | 66 | `src/components/Footer.jsx (via src/layouts/SiteLayout.jsx)` | Every template rendered inside SiteLayout; absent on the jobs board, press kit, get-a-demo and llms.txt. |
| `chrome.video-teaser` | CHROME | 18 | 38 | `src/components/VideoTeaser.jsx (via src/layouts/SiteLayout.jsx)` | SiteLayout templates except every product, industry, pricing and integrations page, and article detail (which uses the sticky CTA chip instead). |
| `navigation.share-rail` | NAVIGATION | 2 | 19 | `src/components/ui/ShareRail.jsx` | Blog post and article detail pages. |
| `content.prose-tools` | CONTENT | 4 | 13 | `src/components/ui/ProseSection.jsx (RichText variant=prose)` | AEO detail pages and the product overview, coach and voice landings. |
| `content.related-reading` | CONTENT | 4 | 13 | `src/components/ui/ProseSection.jsx (related variant)` | AEO detail product pages and the product overview, coach and voice landings. |
| `content.prose-faq` | CONTENT | 4 | 13 | `src/components/ui/ProseSection.jsx (faq padding variant)` | AEO detail pages and the product overview, coach and voice landings. |
| `proof.logo-ticker` | PROOF | 3 | 12 | `src/components/ui/LogoMarquee.jsx` | AEO detail pages, product overview and competitors index. |
| `hero.article-header` | HERO | 1 | 11 | `src/pages/content/ArticleDetail.jsx (inline header)` | Article detail pages. |
| `content.rich-text-article` | CONTENT | 1 | 11 | `src/components/ui/RichText.jsx (variant=article)` | Article detail pages. |
| `content.keep-reading` | CONTENT | 1 | 11 | `src/components/content/GuideCard.jsx > RelatedGuideCard` | Article detail pages. |
| `content.faq-accordion-hairline` | CONTENT | 1 | 11 | `src/components/ui/FaqAccordion.jsx (look=hairline)` | Article detail pages. |
| `navigation.tick-toc` | NAVIGATION | 1 | 11 | `src/components/ui/Toc.jsx > TickToc` | Article detail pages. |
| `navigation.inline-toc` | NAVIGATION | 1 | 11 | `src/components/ui/Toc.jsx > InlineToc` | Article detail pages. |
| `cta.article-chip` | CTA | 1 | 11 | `src/components/ui/CtaChip.jsx` | Article detail pages. |
| `proof.logo-ticker-labelled` | PROOF | 5 | 10 | `src/components/ui/LogoMarquee.jsx (with page-level label)` | Coach and voice landings, integrations library, competitor detail and report landing. |
| `hero.split` | HERO | 1 | 10 | `src/components/product/SplitHero.jsx` | AEO detail pages (product capability and industry pages). |
| `proof.stories-wide` | PROOF | 1 | 10 | `src/components/Stories.jsx (card=wide)` | AEO detail pages that carry stories (ai-agents, financial-services, healthcare). |
| `feature.heading-band` | FEATURE | 1 | 10 | `src/components/ui/SectionHeading.jsx (variant=band)` | AEO detail pages. |
| `feature.rows-472` | FEATURE | 1 | 10 | `src/components/ui/FeatureRows.jsx (variant=472)` | AEO detail pages. |
| `form.event-demo` | FORM | 1 | 10 | `src/components/product/EventBlock.jsx` | AEO detail healthcare page only. |
| `cta.callout-row` | CTA | 1 | 10 | `src/components/ui/FeatureRows.jsx (variant=callout)` | AEO detail pages. |
| `hero.headline` | HERO | 8 | 8 | `src/components/ui/HeroHeadline.jsx` | Product overview, coach and voice landings, integrations library, story index, thoughts index, competitors index and nominate. |
| `hero.story` | HERO | 1 | 8 | `src/components/content/StoryHero.jsx` | Customer story detail pages. |
| `hero.post-header` | HERO | 1 | 8 | `src/pages/content/BlogPost.jsx (inline header)` | Blog post pages. |
| `content.story-sections` | CONTENT | 1 | 8 | `src/components/content/StorySection.jsx` | Customer story detail pages. |
| `content.related-stories` | CONTENT | 1 | 8 | `src/components/content/StoryCard.jsx > RelatedStoryCard (+ ui/SectionHeading)` | Customer story detail pages. |
| `content.rich-text-blog` | CONTENT | 1 | 8 | `src/components/ui/RichText.jsx (variant=blog)` | Blog post pages. |
| `content.related-posts` | CONTENT | 1 | 8 | `src/components/content/BlogCard.jsx (grid in src/pages/content/BlogPost.jsx)` | Blog post pages. |
| `navigation.story-side-menu` | NAVIGATION | 1 | 8 | `src/components/content/StorySideMenu.jsx` | Customer story detail pages. |
| `navigation.hover-toc` | NAVIGATION | 1 | 8 | `src/components/ui/Toc.jsx > HoverToc` | Blog post pages. |
| `cta.post-ctas` | CTA | 1 | 8 | `src/components/content/PostCTAs.jsx` | Blog post pages. |
| `proof.stories-split` | PROOF | 2 | 7 | `src/components/Stories.jsx (card=split / card=testimonial)` | Product overview and competitor detail. |
| `hero.vs` | HERO | 1 | 6 | _not yet built_ | Competitor detail pages (planned). |
| `content.faq-accordion-cards` | CONTENT | 1 | 6 | `src/components/ui/FaqAccordion.jsx (look=cards)` | Competitor detail pages (planned page; component exists). |
| `compare.vs-intro-cards` | COMPARE | 1 | 6 | _not yet built_ | Competitor detail pages (planned). |
| `compare.matrix` | COMPARE | 1 | 6 | `src/components/ui/CompareTable.jsx (variant=matrix)` | Competitor detail pages (planned page; component exists). |
| `compare.vs-feature-cards` | COMPARE | 1 | 6 | _not yet built_ | Competitor detail pages (planned). |
| `chrome.assistant-note` | CHROME | 2 | 2 | `src/components/Stories.jsx > AssistantNote` | Homepage and get-a-demo only. |
| `proof.logo-wall` | PROOF | 2 | 2 | `src/components/ui/LogoWall.jsx` | Partner and nominate lead-form pages. |
| `feature.card-carousel` | FEATURE | 2 | 2 | `src/components/ui/CardCarousel.jsx (variant=snap)` | Product overview and voice landing (planned pages; component exists). |
| `media.integration-orbit` | MEDIA | 2 | 2 | `src/components/commerce/IntegrationOrbit.jsx` | Product overview and integrations library. |
| `media.video-frame` | MEDIA | 2 | 2 | _not yet built_ | Coach and voice landings (planned). |
| `hero.integration-detail` | HERO | 1 | 2 | `src/components/commerce/DetailHeader.jsx` | Integration detail pages. |
| `content.integration-body` | CONTENT | 1 | 2 | `src/pages/IntegrationDetail.jsx (inline body) + src/components/commerce/MetaCard.jsx` | Integration detail pages. |
| `content.other-apps` | CONTENT | 1 | 2 | `src/components/ui/IntegrationCard.jsx (grid in src/pages/IntegrationDetail.jsx)` | Integration detail pages. |
| `content.legal-document` | CONTENT | 1 | 2 | `src/pages/company/LegalPage.jsx + src/components/ui/RichText.jsx (variant=legal)` | Privacy policy and terms of service. |
| `content.llms-txt` | CONTENT | 1 | 2 | `public/llms.txt + src/pages/LlmsTxtRedirect.jsx` | The llms-txt redirect and the llms.txt file. |
| `chrome.jobs-header` | CHROME | 1 | 1 | `src/components/cxjobs/JobsHeader.jsx` | Jobs board only. |
| `chrome.jobs-footer` | CHROME | 1 | 1 | `src/components/cxjobs/JobsFooter.jsx` | Jobs board only. |
| `hero.home` | HERO | 1 | 1 | `src/components/Hero.jsx` | Homepage only. |
| `hero.pricing-title` | HERO | 1 | 1 | `src/pages/Pricing.jsx (inline hero)` | Pricing only. |
| `hero.blog-title` | HERO | 1 | 1 | `src/pages/content/BlogIndex.jsx (inline header)` | Blog index only. |
| `hero.article-intro` | HERO | 1 | 1 | `src/pages/content/ArticleIndex.jsx (inline intro) + src/components/ui/SearchInput.jsx` | Article index only. |
| `hero.report` | HERO | 1 | 1 | `src/components/content/Report.jsx > ReportHero` | Report landing only. |
| `hero.glossary` | HERO | 1 | 1 | `src/pages/content/Glossary.jsx (inline glossary-hero)` | Glossary only. |
| `hero.doc-header` | HERO | 1 | 1 | `src/components/content/FaqDocument.jsx > DocHeader` | FAQ document only. |
| `hero.avatar` | HERO | 1 | 1 | _not yet built_ | Careers only (planned). |
| `hero.jobs` | HERO | 1 | 1 | `src/pages/CxJobs.jsx (inline hero) + src/components/cxjobs/JobsButton.jsx` | Jobs board only. |
| `proof.home-bento` | PROOF | 1 | 1 | `src/components/Proof.jsx (variant=home)` | Homepage only. |
| `proof.stories-home` | PROOF | 1 | 1 | `src/components/Stories.jsx (card=home)` | Homepage only. |
| `proof.about-logos` | PROOF | 1 | 1 | `src/components/Proof.jsx (variant=logos)` | About only (planned page; component exists). |
| `proof.coach-quote-card` | PROOF | 1 | 1 | _not yet built_ | Coach landing only (planned). |
| `proof.case-study-card` | PROOF | 1 | 1 | _not yet built_ | Voice landing only (planned). |
| `proof.quote-panel` | PROOF | 1 | 1 | `src/components/content/Report.jsx > QuotePanel` | Report landing only. |
| `proof.story-rail` | PROOF | 1 | 1 | `src/components/content/Report.jsx > StoryRail` | Report landing only. |
| `proof.employee-quotes` | PROOF | 1 | 1 | `src/components/ui/EmployeeCard.jsx (layout=horizontal)` | About only (planned page; card component exists). |
| `proof.employee-testimonials` | PROOF | 1 | 1 | `src/components/ui/EmployeeCard.jsx + src/components/Stories.jsx (card=employee)` | Careers only (planned page; card and carousel components exist). |
| `proof.jobs-featured-ticker` | PROOF | 1 | 1 | `src/components/cxjobs/SilkJobCard.jsx (marquee composed in src/pages/CxJobs.jsx > FeaturedTicker)` | Jobs board only. |
| `proof.jobs-stats` | PROOF | 1 | 1 | `src/components/cxjobs/StatsRow.jsx` | Jobs board only. |
| `feature.compare-cards` | FEATURE | 1 | 1 | `src/components/Compare.jsx` | Homepage only. |
| `feature.tools-arc` | FEATURE | 1 | 1 | `src/components/Tools.jsx` | Homepage only. |
| `feature.confidence` | FEATURE | 1 | 1 | `src/components/Confidence.jsx` | Homepage only. |
| `feature.system-find` | FEATURE | 1 | 1 | `src/components/Integrations.jsx` | Homepage only. |
| `feature.playbook` | FEATURE | 1 | 1 | `src/components/Playbook.jsx` | Homepage only. |
| `feature.rows-600` | FEATURE | 1 | 1 | `src/components/ui/FeatureRows.jsx (variant=600)` | Product overview only (planned page; component exists). |
| `feature.coach-bento` | FEATURE | 1 | 1 | _not yet built_ | Coach landing only (planned). |
| `feature.split-explainer` | FEATURE | 1 | 1 | _not yet built_ | Voice landing only (planned). |
| `feature.difference-cards` | FEATURE | 1 | 1 | `src/components/company/FeatureCardGrid.jsx` | Competitors index only. |
| `feature.values-bento` | FEATURE | 1 | 1 | _not yet built_ | Careers only (planned). |
| `feature.jobs-mcp` | FEATURE | 1 | 1 | `src/components/cxjobs/McpFlowIllustration.jsx (section composed in src/pages/CxJobs.jsx)` | Jobs board only. |
| `content.blog-grid` | CONTENT | 1 | 1 | _not yet built_ | Product overview only (planned). |
| `content.integration-catalog` | CONTENT | 1 | 1 | `src/components/commerce/IntegrationCatalog.jsx (+ ui/FilterChips variant=sidebar, ui/IntegrationCard)` | Integrations library only. |
| `content.integration-setup` | CONTENT | 1 | 1 | `src/components/commerce/SetupSection.jsx` | Integrations library only. |
| `content.story-card-list` | CONTENT | 1 | 1 | `src/components/content/StoryCard.jsx + src/components/ui/FilterChips.jsx (variant=story)` | Story index only. |
| `content.blog-featured` | CONTENT | 1 | 1 | `src/components/content/BlogFeatured.jsx` | Blog index only. |
| `content.blog-rail` | CONTENT | 1 | 1 | `src/components/ui/CardCarousel.jsx (variant=rail) + src/components/content/BlogCard.jsx` | Blog index only. |
| `content.blog-browse` | CONTENT | 1 | 1 | `src/components/ui/FilterChips.jsx (variant=tabs) + src/components/content/BlogCard.jsx` | Blog index only. |
| `content.guide-featured` | CONTENT | 1 | 1 | `src/components/content/GuideCard.jsx > GuideFeatured` | Article index only. |
| `content.guide-grid` | CONTENT | 1 | 1 | `src/components/content/GuideCard.jsx > GuideCard + src/components/ui/LoadMoreButton.jsx` | Article index only. |
| `content.faq-accordion-panel` | CONTENT | 1 | 1 | `src/components/ui/FaqAccordion.jsx (look=panel)` | Pricing only. |
| `content.faq-accordion-rows` | CONTENT | 1 | 1 | `src/components/ui/FaqAccordion.jsx (look=rows)` | Competitors index only. |
| `content.finding-cards` | CONTENT | 1 | 1 | `src/components/content/Report.jsx > FindingCards` | Report landing only. |
| `content.numbered-contents` | CONTENT | 1 | 1 | `src/components/content/Report.jsx > NumberedContents` | Report landing only. |
| `content.post-wall` | CONTENT | 1 | 1 | `src/components/content/PostWall.jsx` | Thoughts index only. |
| `content.term-index` | CONTENT | 1 | 1 | `src/components/content/TermIndex.jsx` | Glossary only. |
| `content.faq-document` | CONTENT | 1 | 1 | `src/components/content/FaqDocument.jsx` | FAQ document only. |
| `content.split-text` | CONTENT | 1 | 1 | `src/components/ui/SplitText.jsx` | About only (planned page; component exists). |
| `content.open-roles` | CONTENT | 1 | 1 | _not yet built_ | Careers only (planned). |
| `content.jobs-open-roles` | CONTENT | 1 | 1 | `src/components/cxjobs/JobCard.jsx (grid in src/pages/CxJobs.jsx)` | Jobs board only. |
| `content.press-intro` | CONTENT | 1 | 1 | `src/components/presskit/DocSection.jsx (id=intro, DocHeaderRow)` | Press kit only. |
| `content.press-logo` | CONTENT | 1 | 1 | `src/components/presskit/AssetPreview.jsx + DownloadTile.jsx (in DocSection id=logo)` | Press kit only. |
| `content.press-color` | CONTENT | 1 | 1 | `src/components/presskit/ColorSwatch.jsx (in DocSection id=color)` | Press kit only. |
| `content.press-typography` | CONTENT | 1 | 1 | `src/components/presskit/TypeSpecimen.jsx (in DocSection id=typography)` | Press kit only. |
| `content.not-found` | CONTENT | 1 | 1 | `src/pages/NotFound.jsx` | The catch-all not-found route; detail templates also render it for unknown slugs. |
| `compare.grid-tables` | COMPARE | 1 | 1 | `src/components/ui/CompareTable.jsx (variant=grid)` | Competitors index only. |
| `commerce.plans` | COMMERCE | 1 | 1 | `src/components/ui/RuledFrame.jsx (PlansRow, Footnotes) + src/components/ui/PricingCard.jsx` | Pricing only. |
| `commerce.compare-features` | COMMERCE | 1 | 1 | `src/components/ui/CompareTable.jsx (variant=pricing)` | Pricing only. |
| `form.demo-signup` | FORM | 1 | 1 | `src/components/ui/DemoForm.jsx + src/components/commerce/SchedulerPlaceholder.jsx (in src/pages/GetADemo.jsx)` | Get-a-demo only. |
| `form.partner` | FORM | 1 | 1 | `src/pages/company/PartnerPage.jsx + src/components/ui/Field.jsx (skin=outline) + src/components/company/StreakBackdrop.jsx` | Partner only. |
| `form.nominate` | FORM | 1 | 1 | `src/components/ui/Field.jsx (skin=soft, FileDropZone, SubmitButton variant=block)` | Nominate only. |
| `navigation.topic-bar` | NAVIGATION | 1 | 1 | `src/components/content/TopicBar.jsx` | Article index only. |
| `navigation.doc-sidebar` | NAVIGATION | 1 | 1 | `src/components/presskit/DocSidebar.jsx` | Press kit only. |
| `navigation.press-contents` | NAVIGATION | 1 | 1 | `src/components/presskit/DocSection.jsx (contents section in src/pages/PressKit.jsx)` | Press kit only. |
| `cta.coach-banner` | CTA | 1 | 1 | _not yet built_ | Coach landing only (planned). |
| `cta.jobs-report` | CTA | 1 | 1 | `src/pages/CxJobs.jsx (inline report-cta) + src/components/cxjobs/JobsButton.jsx` | Jobs board only. |
| `media.photo-collage` | MEDIA | 1 | 1 | _not yet built_ | About only (planned). |
| `media.photo-gallery` | MEDIA | 1 | 1 | _not yet built_ | Careers only (planned). |
| `media.demo-art` | MEDIA | 1 | 1 | `src/components/commerce/DemoArt.jsx` | Get-a-demo only. |
| `media.press-hero` | MEDIA | 1 | 1 | `src/components/presskit/KestrelLockup.jsx (in src/pages/PressKit.jsx)` | Press kit only. |

**16 shared sections** appear in more than one template and belong in a component library.

**104 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

**15 sections have no `implementedBy` yet** — not necessarily missing, just not linked to a component in this pass: `hero.vs`, `compare.vs-intro-cards`, `compare.vs-feature-cards`, `media.video-frame`, `hero.avatar`, `proof.coach-quote-card`, `proof.case-study-card`, `feature.coach-bento`, `feature.split-explainer`, `feature.values-bento`, `content.blog-grid`, `content.open-roles`, `cta.coach-banner`, `media.photo-collage`, `media.photo-gallery`.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.home` | page-local |
| 3 | PROOF | `proof.home-bento` | page-local |
| 4 | FEATURE | `feature.compare-cards` | page-local |
| 5 | FEATURE | `feature.tools-arc` | page-local |
| 6 | FEATURE | `feature.confidence` | page-local |
| 7 | FEATURE | `feature.system-find` | page-local |
| 8 | FEATURE | `feature.playbook` | page-local |
| 9 | PROOF | `proof.stories-home` | page-local |
| 10 | CHROME | `chrome.assistant-note` | shared ×2 |
| 11 | CHROME | `chrome.footer` | shared ×26 |
| 12 | CHROME | `chrome.video-teaser` | shared ×18 |

### AEO detail — `template.aeo-detail`

10 routes · `/product/ai-agents`, `/product/guardrails`, `/product/how-it-works`, `/product/outbound`, `/product/quality-assurance`, `/product/simulations`, `/product/trust`, `/industry/financial-services`, `/industry/healthcare`, `/industry/insurance` · chrome: **full-no-teaser**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.split` | page-local |
| 3 | PROOF | `proof.logo-ticker` | shared ×3 |
| 4 | CONTENT | `content.prose-tools` | shared ×4 |
| 5 | FEATURE | `feature.heading-band` | page-local |
| 6 | FEATURE | `feature.rows-472` | page-local |
| 7 | PROOF | `proof.stories-wide` | page-local |
| 8 | CTA | `cta.callout-row` | page-local |
| 9 | FORM | `form.event-demo` | page-local |
| 10 | CONTENT | `content.related-reading` | shared ×4 |
| 11 | CONTENT | `content.prose-faq` | shared ×4 |
| 12 | CHROME | `chrome.footer` | shared ×26 |

### Product landing: overview — `template.product-overview`

1 route · `/product` · chrome: **full-no-teaser**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.headline` | shared ×8 |
| 3 | PROOF | `proof.logo-ticker` | shared ×3 |
| 4 | CONTENT | `content.prose-tools` | shared ×4 |
| 5 | FEATURE | `feature.card-carousel` | shared ×2 |
| 6 | FEATURE | `feature.rows-600` | page-local |
| 7 | MEDIA | `media.integration-orbit` | shared ×2 |
| 8 | PROOF | `proof.stories-split` | shared ×2 |
| 9 | CONTENT | `content.related-reading` | shared ×4 |
| 10 | CONTENT | `content.prose-faq` | shared ×4 |
| 11 | CONTENT | `content.blog-grid` | page-local |
| 12 | CHROME | `chrome.footer` | shared ×26 |

### Product landing: coach — `template.product-coach`

1 route · `/product/coach` · chrome: **full-no-teaser**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.headline` | shared ×8 |
| 3 | MEDIA | `media.video-frame` | shared ×2 |
| 4 | PROOF | `proof.logo-ticker-labelled` | shared ×5 |
| 5 | CONTENT | `content.prose-tools` | shared ×4 |
| 6 | FEATURE | `feature.coach-bento` | page-local |
| 7 | PROOF | `proof.coach-quote-card` | page-local |
| 8 | CTA | `cta.coach-banner` | page-local |
| 9 | CONTENT | `content.related-reading` | shared ×4 |
| 10 | CONTENT | `content.prose-faq` | shared ×4 |
| 11 | CHROME | `chrome.footer` | shared ×26 |

### Product landing: voice — `template.product-voice`

1 route · `/product/voice` · chrome: **full-no-teaser**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.headline` | shared ×8 |
| 3 | MEDIA | `media.video-frame` | shared ×2 |
| 4 | PROOF | `proof.logo-ticker-labelled` | shared ×5 |
| 5 | CONTENT | `content.prose-tools` | shared ×4 |
| 6 | FEATURE | `feature.card-carousel` | shared ×2 |
| 7 | FEATURE | `feature.split-explainer` | page-local |
| 8 | PROOF | `proof.case-study-card` | page-local |
| 9 | CONTENT | `content.related-reading` | shared ×4 |
| 10 | CONTENT | `content.prose-faq` | shared ×4 |
| 11 | CHROME | `chrome.footer` | shared ×26 |

### Integrations library — `template.integrations-library`

1 route · `/integrations` · chrome: **full-no-teaser**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.headline` | shared ×8 |
| 3 | MEDIA | `media.integration-orbit` | shared ×2 |
| 4 | PROOF | `proof.logo-ticker-labelled` | shared ×5 |
| 5 | CONTENT | `content.integration-catalog` | page-local |
| 6 | CONTENT | `content.integration-setup` | page-local |
| 7 | CHROME | `chrome.footer` | shared ×26 |

### Integration detail — `template.integration-detail`

2 routes · `/integrations/:slug` · chrome: **full-no-teaser**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.integration-detail` | page-local |
| 3 | CONTENT | `content.integration-body` | page-local |
| 4 | CONTENT | `content.other-apps` | page-local |
| 5 | CHROME | `chrome.footer` | shared ×26 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **full-no-teaser**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.pricing-title` | page-local |
| 3 | COMMERCE | `commerce.plans` | page-local |
| 4 | COMMERCE | `commerce.compare-features` | page-local |
| 5 | CONTENT | `content.faq-accordion-panel` | page-local |
| 6 | CHROME | `chrome.footer` | shared ×26 |

### Get a demo — `template.get-a-demo`

1 route · `/get-a-demo` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | FORM | `form.demo-signup` | page-local |
| 2 | MEDIA | `media.demo-art` | page-local |
| 3 | CHROME | `chrome.assistant-note` | shared ×2 |

### Customer story index — `template.story-index`

1 route · `/customer-stories` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.headline` | shared ×8 |
| 3 | CONTENT | `content.story-card-list` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×26 |
| 5 | CHROME | `chrome.video-teaser` | shared ×18 |

### Customer story detail — `template.story-detail`

8 routes · `/customer-stories/:slug` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.story` | page-local |
| 3 | NAVIGATION | `navigation.story-side-menu` | page-local |
| 4 | CONTENT | `content.story-sections` | page-local |
| 5 | CONTENT | `content.related-stories` | page-local |
| 6 | CHROME | `chrome.footer` | shared ×26 |
| 7 | CHROME | `chrome.video-teaser` | shared ×18 |

### Blog index — `template.blog-index`

1 route · `/blog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.blog-title` | page-local |
| 3 | CONTENT | `content.blog-featured` | page-local |
| 4 | CONTENT | `content.blog-rail` | page-local |
| 5 | CONTENT | `content.blog-browse` | page-local |
| 6 | CHROME | `chrome.footer` | shared ×26 |
| 7 | CHROME | `chrome.video-teaser` | shared ×18 |

### Blog post — `template.blog-post`

8 routes · `/blog/:slug` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.post-header` | page-local |
| 3 | CONTENT | `content.rich-text-blog` | page-local |
| 4 | CTA | `cta.post-ctas` | page-local |
| 5 | CONTENT | `content.related-posts` | page-local |
| 6 | NAVIGATION | `navigation.hover-toc` | page-local |
| 7 | NAVIGATION | `navigation.share-rail` | shared ×2 |
| 8 | CHROME | `chrome.footer` | shared ×26 |
| 9 | CHROME | `chrome.video-teaser` | shared ×18 |

### Article index — `template.article-index`

1 route · `/articles` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.article-intro` | page-local |
| 3 | CONTENT | `content.guide-featured` | page-local |
| 4 | NAVIGATION | `navigation.topic-bar` | page-local |
| 5 | CONTENT | `content.guide-grid` | page-local |
| 6 | CHROME | `chrome.footer` | shared ×26 |
| 7 | CHROME | `chrome.video-teaser` | shared ×18 |

### Article detail — `template.article-detail`

11 routes · `/articles/:slug` · chrome: **full-no-teaser**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.article-header` | page-local |
| 3 | NAVIGATION | `navigation.inline-toc` | page-local |
| 4 | CONTENT | `content.rich-text-article` | page-local |
| 5 | CONTENT | `content.faq-accordion-hairline` | page-local |
| 6 | CONTENT | `content.keep-reading` | page-local |
| 7 | NAVIGATION | `navigation.tick-toc` | page-local |
| 8 | NAVIGATION | `navigation.share-rail` | shared ×2 |
| 9 | CTA | `cta.article-chip` | page-local |
| 10 | CHROME | `chrome.footer` | shared ×26 |

### Competitors index — `template.competitor-index`

1 route · `/competitors` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.headline` | shared ×8 |
| 3 | PROOF | `proof.logo-ticker` | shared ×3 |
| 4 | FEATURE | `feature.difference-cards` | page-local |
| 5 | CONTENT | `content.faq-accordion-rows` | page-local |
| 6 | COMPARE | `compare.grid-tables` | page-local |
| 7 | CHROME | `chrome.footer` | shared ×26 |
| 8 | CHROME | `chrome.video-teaser` | shared ×18 |

### Competitor detail — `template.competitor-detail`

6 routes · `/competitors/:slug` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.vs` | page-local |
| 3 | PROOF | `proof.logo-ticker-labelled` | shared ×5 |
| 4 | COMPARE | `compare.vs-intro-cards` | page-local |
| 5 | COMPARE | `compare.matrix` | page-local |
| 6 | COMPARE | `compare.vs-feature-cards` | page-local |
| 7 | PROOF | `proof.stories-split` | shared ×2 |
| 8 | CONTENT | `content.faq-accordion-cards` | page-local |
| 9 | CHROME | `chrome.footer` | shared ×26 |
| 10 | CHROME | `chrome.video-teaser` | shared ×18 |

### Report landing — `template.report-landing`

1 route · `/content/the-handoff-gap` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.report` | page-local |
| 3 | PROOF | `proof.logo-ticker-labelled` | shared ×5 |
| 4 | CONTENT | `content.finding-cards` | page-local |
| 5 | PROOF | `proof.quote-panel` | page-local |
| 6 | CONTENT | `content.numbered-contents` | page-local |
| 7 | PROOF | `proof.story-rail` | page-local |
| 8 | CHROME | `chrome.footer` | shared ×26 |
| 9 | CHROME | `chrome.video-teaser` | shared ×18 |

### Thoughts on CX — `template.thoughts-index`

1 route · `/thoughts-on-cx` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.headline` | shared ×8 |
| 3 | CONTENT | `content.post-wall` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×26 |
| 5 | CHROME | `chrome.video-teaser` | shared ×18 |

### Glossary — `template.glossary`

1 route · `/glossary` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.glossary` | page-local |
| 3 | CONTENT | `content.term-index` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×26 |
| 5 | CHROME | `chrome.video-teaser` | shared ×18 |

### FAQ document — `template.faq`

1 route · `/faq` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.doc-header` | page-local |
| 3 | CONTENT | `content.faq-document` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×26 |
| 5 | CHROME | `chrome.video-teaser` | shared ×18 |

### Company: about — `template.company-about`

1 route · `/about` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | CONTENT | `content.split-text` | page-local |
| 3 | MEDIA | `media.photo-collage` | page-local |
| 4 | PROOF | `proof.about-logos` | page-local |
| 5 | PROOF | `proof.employee-quotes` | page-local |
| 6 | CHROME | `chrome.footer` | shared ×26 |
| 7 | CHROME | `chrome.video-teaser` | shared ×18 |

### Company: careers — `template.company-careers`

1 route · `/careers` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.avatar` | page-local |
| 3 | MEDIA | `media.photo-gallery` | page-local |
| 4 | FEATURE | `feature.values-bento` | page-local |
| 5 | PROOF | `proof.employee-testimonials` | page-local |
| 6 | CONTENT | `content.open-roles` | page-local |
| 7 | CHROME | `chrome.footer` | shared ×26 |
| 8 | CHROME | `chrome.video-teaser` | shared ×18 |

### Lead form: partner — `template.lead-form-partner`

1 route · `/partner` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | FORM | `form.partner` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×2 |
| 4 | CHROME | `chrome.footer` | shared ×26 |
| 5 | CHROME | `chrome.video-teaser` | shared ×18 |

### Lead form: nominate — `template.lead-form-nominate`

1 route · `/nominate` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | HERO | `hero.headline` | shared ×8 |
| 3 | FORM | `form.nominate` | page-local |
| 4 | PROOF | `proof.logo-wall` | shared ×2 |
| 5 | CHROME | `chrome.footer` | shared ×26 |
| 6 | CHROME | `chrome.video-teaser` | shared ×18 |

### Legal — `template.legal`

2 routes · `/privacy-policy`, `/terms-of-service` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | CONTENT | `content.legal-document` | page-local |
| 3 | CHROME | `chrome.footer` | shared ×26 |
| 4 | CHROME | `chrome.video-teaser` | shared ×18 |

### Jobs board microsite — `template.cx-jobs`

1 route · `/cx-jobs` · chrome: **own**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.jobs-header` | page-local |
| 2 | HERO | `hero.jobs` | page-local |
| 3 | PROOF | `proof.jobs-featured-ticker` | page-local |
| 4 | PROOF | `proof.jobs-stats` | page-local |
| 5 | FEATURE | `feature.jobs-mcp` | page-local |
| 6 | CONTENT | `content.jobs-open-roles` | page-local |
| 7 | CTA | `cta.jobs-report` | page-local |
| 8 | CHROME | `chrome.jobs-footer` | page-local |

### Press kit — `template.press-kit`

1 route · `/press-kit` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | NAVIGATION | `navigation.doc-sidebar` | page-local |
| 2 | MEDIA | `media.press-hero` | page-local |
| 3 | CONTENT | `content.press-intro` | page-local |
| 4 | NAVIGATION | `navigation.press-contents` | page-local |
| 5 | CONTENT | `content.press-logo` | page-local |
| 6 | CONTENT | `content.press-color` | page-local |
| 7 | CONTENT | `content.press-typography` | page-local |

### 404 not found — `template.not-found`

1 route · `*` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.nav` | shared ×26 |
| 2 | CONTENT | `content.not-found` | page-local |
| 3 | CHROME | `chrome.footer` | shared ×26 |
| 4 | CHROME | `chrome.video-teaser` | shared ×18 |

### llms.txt — `template.llms-txt`

2 routes · `/llms-txt`, `/llms.txt` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | CONTENT | `content.llms-txt` | page-local |

## Section reference

### CHROME

_Page-level frame around the template body: global nav, footer, floating video teaser, microsite header/footer, hidden assistant note._

**`chrome.nav`** — Global fixed glass-pill navigation (CLONE_SPEC section 4): brand mark, Product / Industries / Resources mega-dropdowns, Log in and Start free trial actions; phone pill menu below 810px.

· Every template rendered inside SiteLayout; absent on the jobs board, press kit, get-a-demo and llms.txt. · appears on 66 routes · implemented by `src/components/Nav.jsx (via src/layouts/SiteLayout.jsx)`

**`chrome.footer`** — Footer V5 (CLONE_SPEC section 14): CTA glass card with announcement pill, link card, wordmark and bottom bar over Unicorn stripes; only the CTA heading copy changes between pages.

· Every template rendered inside SiteLayout; absent on the jobs board, press kit, get-a-demo and llms.txt. · appears on 66 routes · implemented by `src/components/Footer.jsx (via src/layouts/SiteLayout.jsx)`

**`chrome.video-teaser`** — Floating bottom-corner video teaser card (.lvc), shown by SiteLayout unless the path matches its NO_TEASER list.

· SiteLayout templates except every product, industry, pricing and integrations page, and article detail (which uses the sticky CTA chip instead). · appears on 38 routes · implemented by `src/components/VideoTeaser.jsx (via src/layouts/SiteLayout.jsx)`

**`chrome.assistant-note`** — Single centred AI-assistant note line (CLONE_SPEC 13b): Inter 16 #828282 at opacity 0, present in the DOM for screen readers and LLM crawlers.

· Homepage and get-a-demo only. · appears on 2 routes · implemented by `src/components/Stories.jsx > AssistantNote`

**`chrome.jobs-header`** — Jobs-board microsite's own fixed header bar (SPEC_PAGES_C J0), replacing the global nav; Inter, square corners, #EEEEEE page.

· Jobs board only. · appears on 1 routes · implemented by `src/components/cxjobs/JobsHeader.jsx`

**`chrome.jobs-footer`** — Jobs-board microsite's own link-column footer (SPEC_PAGES_C J7), replacing Footer V5.

· Jobs board only. · appears on 1 routes · implemented by `src/components/cxjobs/JobsFooter.jsx`

### HERO

_The page-opening block: headline, sub, actions and any hero art._

**`hero.home`** — Homepage hero (CLONE_SPEC section 6): announcement pill, H1 + sub, dark/light CTA pair, scroll-scaled photo collage over the Unicorn WebGL background.

· Homepage only. · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.headline`** — Simple centred hero: H1 on the 96/77/58/40 scale + optional sub + optional action row, no pill or photo stage. Per-page props change sub colour/size and gap; competitors index and /product/voice place it over the homepage Unicorn-stripes background.

· Product overview, coach and voice landings, integrations library, story index, thoughts index, competitors index and nominate. · appears on 8 routes · implemented by `src/components/ui/HeroHeadline.jsx`

**`hero.split`** — AEO split hero (SPEC_PAGES_A T1.1): text column (H1, paragraph, optional intro, dark/light buttons, industry byline and self-serve line) beside a 542px square media tile (video or Rive placeholder).

· AEO detail pages (product capability and industry pages). · appears on 10 routes · implemented by `src/components/product/SplitHero.jsx`

**`hero.pricing-title`** — Pricing title row (SPEC_PAGES_A T5.1): left H1 'Pricing' on the H2 scale with a 517px statement paragraph to the right, stacked below 1200px.

· Pricing only. · appears on 1 routes · implemented by `src/pages/Pricing.jsx (inline hero)`

**`hero.integration-detail`** — Integration detail header (SPEC_PAGES_A T4): Back link to the library, 52px icon tile + Cirka 60 H1, grey lede, phone-only category line.

· Integration detail pages. · appears on 2 routes · implemented by `src/components/commerce/DetailHeader.jsx`

**`hero.story`** — Customer-story hero (SPEC_PAGES_B T2) in two data-selected variants: big pull-quote, or split image + title.

· Customer story detail pages. · appears on 8 routes · implemented by `src/components/content/StoryHero.jsx`

**`hero.blog-title`** — Blog index title block (SPEC_PAGES_B T3 IndexTitle): left-aligned H1 + lede, no eyebrow or search.

· Blog index only. · appears on 1 routes · implemented by `src/pages/content/BlogIndex.jsx (inline header)`

**`hero.post-header`** — Blog post header (SPEC_PAGES_B T4 PostHeader, centred): back link, H1, byline, optional 900px hero image slot.

· Blog post pages. · appears on 8 routes · implemented by `src/pages/content/BlogPost.jsx (inline header)`

**`hero.article-intro`** — Article index intro row (SPEC_PAGES_B T5): uppercase eyebrow, H1, lede, and a pill search input on the right.

· Article index only. · appears on 1 routes · implemented by `src/pages/content/ArticleIndex.jsx (inline intro) + src/components/ui/SearchInput.jsx`

**`hero.article-header`** — Article header (SPEC_PAGES_B T6, left-aligned variant of PostHeader): breadcrumb, topic chip, H1, description, author byline with 'Updated' date, 800px wide.

· Article detail pages. · appears on 11 routes · implemented by `src/pages/content/ArticleDetail.jsx (inline header)`

**`hero.vs`** — Competitor 'Us vs Them' hero (SPEC_PAGES_B T8 VsHero): full-bleed pink panel, logo-tile title row, subtitle, intro copy with bulleted differences, and a DemoForm card on the right.

· Competitor detail pages (planned). · appears on 6 routes

**`hero.report`** — Report hero (SPEC_PAGES_B T9 R2 Hero): gradient art panel with H1, lede, 'read the report' card and a what-you'll-learn grid.

· Report landing only. · appears on 1 routes · implemented by `src/components/content/Report.jsx > ReportHero`

**`hero.glossary`** — Glossary split hero on a warm off-white band (SPEC_PAGES_B T11): eyebrow, H1, intro paragraph.

· Glossary only. · appears on 1 routes · implemented by `src/pages/content/Glossary.jsx (inline glossary-hero)`

**`hero.doc-header`** — Small left-aligned document header (SPEC_PAGES_B T12 DocHeader): Cirka 40 H1, grey lede, 'last updated' line.

· FAQ document only. · appears on 1 routes · implemented by `src/components/content/FaqDocument.jsx > DocHeader`

**`hero.avatar`** — Careers avatar hero (SPEC_PAGES_C C1): ten floating avatar photos around a two-line H1 and one xl 'see open roles' button.

· Careers only (planned). · appears on 1 routes

**`hero.jobs`** — Jobs-board hero (SPEC_PAGES_C J1): eyebrow, Inter headline and a 'browse roles' jobs button, in the microsite's own square-corner style.

· Jobs board only. · appears on 1 routes · implemented by `src/pages/CxJobs.jsx (inline hero) + src/components/cxjobs/JobsButton.jsx`

### PROOF

_Social proof: logo tickers and walls, testimonial and story slideshows, employee quotes, pull quotes, stats._

**`proof.home-bento`** — Homepage Proof section (CLONE_SPEC section 7): bento of quote and stat cards above the bordered logo marquee card.

· Homepage only. · appears on 1 routes · implemented by `src/components/Proof.jsx (variant=home)`

**`proof.stories-home`** — Homepage customer-stories carousel (CLONE_SPEC section 13) with the pink-dot pager.

· Homepage only. · appears on 1 routes · implemented by `src/components/Stories.jsx (card=home)`

**`proof.logo-ticker`** — Bordered logo-marquee card with no heading of its own, directly under a hero (SPEC_PAGES_A T1.2 / T2 /product; SPEC_PAGES_B T7 hero strip).

· AEO detail pages, product overview and competitors index. · appears on 12 routes · implemented by `src/components/ui/LogoMarquee.jsx`

**`proof.logo-ticker-labelled`** — Short centred 'trusted by' label line above a logo-marquee strip (label typography varies: Cirka 30 on coach/voice/integrations, Cirka 18 on competitor detail, grey Ginto 14 on the report). Integrations shows two opposing tickers on phones.

· Coach and voice landings, integrations library, competitor detail and report landing. · appears on 10 routes · implemented by `src/components/ui/LogoMarquee.jsx (with page-level label)`

**`proof.logo-wall`** — LogoWall (SPEC_PAGES_C F3): Cirka 30 heading, viewport-wide strip, fade-up reveal on entering view.

· Partner and nominate lead-form pages. · appears on 2 routes · implemented by `src/components/ui/LogoWall.jsx`

**`proof.about-logos`** — About-page logo block (SPEC_PAGES_C A3): heading only on a white-to-#F9F9F9 fade, then one bordered single-row strip at every width, no reveal.

· About only (planned page; component exists). · appears on 1 routes · implemented by `src/components/Proof.jsx (variant=logos)`

**`proof.stories-wide`** — Wide story slideshow (SPEC_PAGES_A T1.6): 956x393 photo + tinted quote panel card, pink or peach tint, 'See customer story' pill; one static card below 1200px. Optional per page.

· AEO detail pages that carry stories (ai-agents, financial-services, healthcare). · appears on 10 routes · implemented by `src/components/Stories.jsx (card=wide)`

**`proof.stories-split`** — Split-card testimonial slideshow: 456px image + tinted quote panel per slide (peach / pink / green), Cirka 60 heading + sub, pager pill; becomes a 315px column card slider below 1200px. Same Framer card on /product ('who runs on Kestrel') and competitor detail ('customers love us').

· Product overview and competitor detail. · appears on 7 routes · implemented by `src/components/Stories.jsx (card=split / card=testimonial)`

**`proof.coach-quote-card`** — Coach QuoteCard (SPEC_PAGES_A T2.7 block 2): 335px photo + grey glass text card with a long Cirka quote, highlighted <mark> span, name and role.

· Coach landing only (planned). · appears on 1 routes

**`proof.case-study-card`** — Voice case-study card (SPEC_PAGES_A T2.9): section header, then a black-bordered 1376x400 card with co-branded photo, H3, paragraph and link.

· Voice landing only (planned). · appears on 1 routes

**`proof.quote-panel`** — Report pull-quote panel (SPEC_PAGES_B T9 R2 Pull Quote): full-bleed gradient panel with one large quote, sharing art and radius with the report hero.

· Report landing only. · appears on 1 routes · implemented by `src/components/content/Report.jsx > QuotePanel`

**`proof.story-rail`** — Report customer rail (SPEC_PAGES_B T9 R2 Customers): H2 + right-aligned sub + horizontal rail of themed story cards.

· Report landing only. · appears on 1 routes · implemented by `src/components/content/Report.jsx > StoryRail`

**`proof.employee-quotes`** — About-page employee quote cards (SPEC_PAGES_C A5): two horizontal EmployeeCards in one row, no heading.

· About only (planned page; card component exists). · appears on 1 routes · implemented by `src/components/ui/EmployeeCard.jsx (layout=horizontal)`

**`proof.employee-testimonials`** — Careers testimonials (SPEC_PAGES_C C4): SectionHeading + eight EmployeeCards in a two-column grid; below 810px a Stories employee carousel replaces the grid.

· Careers only (planned page; card and carousel components exist). · appears on 1 routes · implemented by `src/components/ui/EmployeeCard.jsx + src/components/Stories.jsx (card=employee)`

**`proof.jobs-featured-ticker`** — Jobs-board featured-roles ticker (SPEC_PAGES_C J2): marquee of silk-gradient job cards.

· Jobs board only. · appears on 1 routes · implemented by `src/components/cxjobs/SilkJobCard.jsx (marquee composed in src/pages/CxJobs.jsx > FeaturedTicker)`

**`proof.jobs-stats`** — Jobs-board brand banner stats row (SPEC_PAGES_C J3).

· Jobs board only. · appears on 1 routes · implemented by `src/components/cxjobs/StatsRow.jsx`

### FEATURE

_Product or company explanation modules: feature rows, bento panels, carousels of capabilities, value cards._

**`feature.compare-cards`** — Homepage Compare cards (CLONE_SPEC section 8): Card-01/02 inside the Gradient Flow section with a time-based loop.

· Homepage only. · appears on 1 routes · implemented by `src/components/Compare.jsx`

**`feature.tools-arc`** — Homepage 'your tools' icon arc over the gradient tree (CLONE_SPEC section 9).

· Homepage only. · appears on 1 routes · implemented by `src/components/Tools.jsx`

**`feature.confidence`** — Homepage logo-icon glow, 'Confidence' header and brain tags over Unicorn (CLONE_SPEC section 10).

· Homepage only. · appears on 1 routes · implemented by `src/components/Confidence.jsx`

**`feature.system-find`** — Homepage system-find block: integration icons joined by connector lines (CLONE_SPEC section 11).

· Homepage only. · appears on 1 routes · implemented by `src/components/Integrations.jsx`

**`feature.playbook`** — Homepage playbook header, bottom tree and playbook card fan (CLONE_SPEC section 12).

· Homepage only. · appears on 1 routes · implemented by `src/components/Playbook.jsx`

**`feature.heading-band`** — Centred Ginto 64/77 H2 band introducing the feature rows (SPEC_PAGES_A T1.4).

· AEO detail pages. · appears on 10 routes · implemented by `src/components/ui/SectionHeading.jsx (variant=band)`

**`feature.rows-472`** — Three alternating image/text rows with 472px square media, eyebrow, H3 and grey body (SPEC_PAGES_A T1.5).

· AEO detail pages. · appears on 10 routes · implemented by `src/components/ui/FeatureRows.jsx (variant=472)`

**`feature.rows-600`** — Five alternating 600px-square image + text rows, each with H2 38/42, body and a dark button (SPEC_PAGES_A T2.4).

· Product overview only (planned page; component exists). · appears on 1 routes · implemented by `src/components/ui/FeatureRows.jsx (variant=600)`

**`feature.card-carousel`** — Snap card carousel with heading + sub, right-edge fade and black round arrows (SPEC_PAGES_A T2.3): square channel cards on /product, rectangle principle cards on /voice.

· Product overview and voice landing (planned pages; component exists). · appears on 2 routes · implemented by `src/components/ui/CardCarousel.jsx (variant=snap)`

**`feature.coach-bento`** — Coach bento stack (SPEC_PAGES_A T2.7): repeated header + grey BentoPanel blocks (tabs-bottom, split media + stacked tab items, analytics), interleaved with the quote card and CTA banner.

· Coach landing only (planned). · appears on 1 routes

**`feature.split-explainer`** — Voice split explainer (SPEC_PAGES_A T2.8): centred H2 + sub + button, then a 648px phone-UI image beside three large paragraphs.

· Voice landing only (planned). · appears on 1 routes

**`feature.difference-cards`** — Competitors-index 'difference' grid (SPEC_PAGES_B T7 Section 2): SectionHeading + 3x2 grey cards with black glyph, Cirka title and short body.

· Competitors index only. · appears on 1 routes · implemented by `src/components/company/FeatureCardGrid.jsx`

**`feature.values-bento`** — Careers values bento (SPEC_PAGES_C C3): SectionHeading + 2 + 3 value cards.

· Careers only (planned). · appears on 1 routes

**`feature.jobs-mcp`** — Jobs-board AI-assistant section (SPEC_PAGES_C J4): eyebrow, H2, connect button and an MCP flow illustration standing in for the live third-party iframe.

· Jobs board only. · appears on 1 routes · implemented by `src/components/cxjobs/McpFlowIllustration.jsx (section composed in src/pages/CxJobs.jsx)`

### CONTENT

_The substantive body of a route: rich text, card lists and grids, FAQ blocks, documents._

**`content.prose-tools`** — ProseSection 'Tools Section' (SPEC_PAGES_A P1 / T1.3): H2 + rich prose with bullets and links + H3 sub-blocks, 1040px column.

· AEO detail pages and the product overview, coach and voice landings. · appears on 13 routes · implemented by `src/components/ui/ProseSection.jsx (RichText variant=prose)`

**`content.related-reading`** — Related reading (SPEC_PAGES_A T1.8): ProseSection with an H3 and a bulleted link list, no H2. Absent on the industry pages.

· AEO detail product pages and the product overview, coach and voice landings. · appears on 13 routes · implemented by `src/components/ui/ProseSection.jsx (related variant)`

**`content.prose-faq`** — Static FAQ list (SPEC_PAGES_A T1.9): ProseSection H2 + question H3 / answer paragraph pairs, never collapses.

· AEO detail pages and the product overview, coach and voice landings. · appears on 13 routes · implemented by `src/components/ui/ProseSection.jsx (faq padding variant)`

**`content.blog-grid`** — Product BlogGrid (SPEC_PAGES_A T2.6): top rule, left H2, three blog cards and a centred 'view all' light button.

· Product overview only (planned). · appears on 1 routes

**`content.integration-catalog`** — Filterable integration catalogue (SPEC_PAGES_A T3.3): sticky sidebar category filter beside category blocks of IntegrationCards.

· Integrations library only. · appears on 1 routes · implemented by `src/components/commerce/IntegrationCatalog.jsx (+ ui/FilterChips variant=sidebar, ui/IntegrationCard)`

**`content.integration-setup`** — Integrations setup steps + static FAQ (SPEC_PAGES_A T3.4): full-width prose variant with numbered H3 steps, support paragraphs and a short Q/A list.

· Integrations library only. · appears on 1 routes · implemented by `src/components/commerce/SetupSection.jsx`

**`content.integration-body`** — Integration detail body (SPEC_PAGES_A T4): overview / what it is / how to integrate blocks beside a sticky MetaCard (website, category, Get a demo).

· Integration detail pages. · appears on 2 routes · implemented by `src/pages/IntegrationDetail.jsx (inline body) + src/components/commerce/MetaCard.jsx`

**`content.other-apps`** — 'Other apps' grid (SPEC_PAGES_A T4): H2 + category H3, then up to four IntegrationCards from the same category; fades in on load.

· Integration detail pages. · appears on 2 routes · implemented by `src/components/ui/IntegrationCard.jsx (grid in src/pages/IntegrationDetail.jsx)`

**`content.story-card-list`** — Customer-story index body (SPEC_PAGES_B T1): themed category filter chips over a list of featured, wide and quote StoryCards.

· Story index only. · appears on 1 routes · implemented by `src/components/content/StoryCard.jsx + src/components/ui/FilterChips.jsx (variant=story)`

**`content.story-sections`** — Story body chapters (SPEC_PAGES_B T2 Content-Section): up to five chapters, each with a heading, paragraphs and a per-chapter media slot (image, illustration, image + quote card, big quote, or none).

· Customer story detail pages. · appears on 8 routes · implemented by `src/components/content/StorySection.jsx`

**`content.related-stories`** — 'Read other stories' (SPEC_PAGES_B T2): SectionHeading + up to three related story cards.

· Customer story detail pages. · appears on 8 routes · implemented by `src/components/content/StoryCard.jsx > RelatedStoryCard (+ ui/SectionHeading)`

**`content.blog-featured`** — Blog featured post with sticky image beside the three latest posts (SPEC_PAGES_B T3).

· Blog index only. · appears on 1 routes · implemented by `src/components/content/BlogFeatured.jsx`

**`content.blog-rail`** — Tinted 'Podcasts' rail of BlogCards with ring arrows in the header (SPEC_PAGES_B T3 CardRail).

· Blog index only. · appears on 1 routes · implemented by `src/components/ui/CardCarousel.jsx (variant=rail) + src/components/content/BlogCard.jsx`

**`content.blog-browse`** — 'Browse all' block (SPEC_PAGES_B T3): ring filter tabs synced to ?selected-category, then a three-column BlogCard grid.

· Blog index only. · appears on 1 routes · implemented by `src/components/ui/FilterChips.jsx (variant=tabs) + src/components/content/BlogCard.jsx`

**`content.rich-text-blog`** — Blog post body (SPEC_PAGES_B section R 'blog'): 900px RichText with 20/26 text, h2 38/42, bullet markers, blockquote rule, embedded video.

· Blog post pages. · appears on 8 routes · implemented by `src/components/ui/RichText.jsx (variant=blog)`

**`content.related-posts`** — Related posts under a blog post (SPEC_PAGES_B T4): H2 + two 588px BlogCards.

· Blog post pages. · appears on 8 routes · implemented by `src/components/content/BlogCard.jsx (grid in src/pages/content/BlogPost.jsx)`

**`content.guide-featured`** — Featured guide card on the article index (SPEC_PAGES_B T5 GuideFeatured).

· Article index only. · appears on 1 routes · implemented by `src/components/content/GuideCard.jsx > GuideFeatured`

**`content.guide-grid`** — Guide card grid filtered by topic, search and sort, paged with a Load more button (SPEC_PAGES_B T5).

· Article index only. · appears on 1 routes · implemented by `src/components/content/GuideCard.jsx > GuideCard + src/components/ui/LoadMoreButton.jsx`

**`content.rich-text-article`** — Article body (SPEC_PAGES_B section R 'article'): 800px RichText with h2 28/34, key-takeaways box, blockquote and ordered/unordered lists.

· Article detail pages. · appears on 11 routes · implemented by `src/components/ui/RichText.jsx (variant=article)`

**`content.keep-reading`** — 'Keep reading' row of three related guide cards (SPEC_PAGES_B T6).

· Article detail pages. · appears on 11 routes · implemented by `src/components/content/GuideCard.jsx > RelatedGuideCard`

**`content.faq-accordion-panel`** — Pricing FAQ accordion (SPEC_PAGES_A T5.4): white rows turning #F7F7F7 on hover/open, Cirka 30 questions, rotating chevron, sticky LetterReveal title column.

· Pricing only. · appears on 1 routes · implemented by `src/components/ui/FaqAccordion.jsx (look=panel)`

**`content.faq-accordion-hairline`** — In-article FAQ (SPEC_PAGES_B R.6): hairline-separated Ginto 20 questions with a rotating grey plus, first item open, instant answer.

· Article detail pages. · appears on 11 routes · implemented by `src/components/ui/FaqAccordion.jsx (look=hairline)`

**`content.faq-accordion-rows`** — 'Questions to ask' accordion (SPEC_PAGES_B T7): centred Cirka 60 title, white rows with caret, spring open.

· Competitors index only. · appears on 1 routes · implemented by `src/components/ui/FaqAccordion.jsx (look=rows)`

**`content.faq-accordion-cards`** — Competitor FAQ cards (SPEC_PAGES_B T8 FaqCards): Cirka 60 H2, 900px stack of bordered shadowed white cards with +/- toggles, all closed by default.

· Competitor detail pages (planned page; component exists). · appears on 6 routes · implemented by `src/components/ui/FaqAccordion.jsx (look=cards)`

**`content.finding-cards`** — Report findings (SPEC_PAGES_B T9 R2 Findings): H2 + three stat cards with mini charts.

· Report landing only. · appears on 1 routes · implemented by `src/components/content/Report.jsx > FindingCards`

**`content.numbered-contents`** — Report 'what's inside' (SPEC_PAGES_B T9): H2, lede and medium CTA beside a numbered contents list.

· Report landing only. · appears on 1 routes · implemented by `src/components/content/Report.jsx > NumberedContents`

**`content.post-wall`** — Three-column masonry wall of social-post cards (SPEC_PAGES_B T10 PostWall + SocialPostCard); two columns at tablet, one on phone.

· Thoughts index only. · appears on 1 routes · implemented by `src/components/content/PostWall.jsx`

**`content.term-index`** — Glossary A-Z term index (SPEC_PAGES_B T11): letter heading + hairline + three-column term links per letter group; links point at /glossary/<slug>, which has no route yet.

· Glossary only. · appears on 1 routes · implemented by `src/components/content/TermIndex.jsx`

**`content.faq-document`** — Static FAQ document (SPEC_PAGES_B T12): topic sections of always-visible Q&As rendered as rich text, with an (empty on live) sticky index column.

· FAQ document only. · appears on 1 routes · implemented by `src/components/content/FaqDocument.jsx`

**`content.split-text`** — Two-column text block (SPEC_PAGES_C A1 / A4): heading left, rich-text paragraphs right, stacked below 1200px. Used twice on /about: mission header (H1) and team block (H2).

· About only (planned page; component exists). · appears on 1 routes · implemented by `src/components/ui/SplitText.jsx`

**`content.open-roles`** — Careers open roles (SPEC_PAGES_C C5): SectionHeading + third-party jobs-list widget placeholder.

· Careers only (planned). · appears on 1 routes

**`content.legal-document`** — Legal document (SPEC_PAGES_C T3): centred H1, then a 920px RichText legal column of Cirka H4 sections and pre-wrap paragraphs.

· Privacy policy and terms of service. · appears on 2 routes · implemented by `src/pages/company/LegalPage.jsx + src/components/ui/RichText.jsx (variant=legal)`

**`content.jobs-open-roles`** — Jobs-board open roles (SPEC_PAGES_C J5): H2 + 'see all' text link + JobCard grid.

· Jobs board only. · appears on 1 routes · implemented by `src/components/cxjobs/JobCard.jsx (grid in src/pages/CxJobs.jsx)`

**`content.press-intro`** — Press-kit intro doc section: 'Brand Guidelines' H1 left, three intro paragraphs right.

· Press kit only. · appears on 1 routes · implemented by `src/components/presskit/DocSection.jsx (id=intro, DocHeaderRow)`

**`content.press-logo`** — Press-kit '01 Logo' section: light and dark lockup previews and a 2x2 icon grid, each with JPG/PNG/SVG/EPS download tiles.

· Press kit only. · appears on 1 routes · implemented by `src/components/presskit/AssetPreview.jsx + DownloadTile.jsx (in DocSection id=logo)`

**`content.press-color`** — Press-kit '02 Color' section: primary palette swatches, black/white secondary circles, 2x2 gradient palette.

· Press kit only. · appears on 1 routes · implemented by `src/components/presskit/ColorSwatch.jsx (in DocSection id=color)`

**`content.press-typography`** — Press-kit '03 Typography' section: two paragraphs, serif and sans specimen rows, licence footnote.

· Press kit only. · appears on 1 routes · implemented by `src/components/presskit/TypeSpecimen.jsx (in DocSection id=typography)`

**`content.not-found`** — 404 content block (SPEC_PAGES_C T6): centred H2 'page doesn't exist', hero-scale sub and a dark 'back home' button.

· The catch-all not-found route; detail templates also render it for unknown slugs. · appears on 1 routes · implemented by `src/pages/NotFound.jsx`

**`content.llms-txt`** — Plain-text markdown llms.txt (H1 brand, summary, link lists) served as a static file; /llms-txt redirects to it.

· The llms-txt redirect and the llms.txt file. · appears on 2 routes · implemented by `public/llms.txt + src/pages/LlmsTxtRedirect.jsx`

### COMPARE

_Kestrel-versus-category comparison tables and intro cards._

**`compare.grid-tables`** — Competitors-index comparison tables (SPEC_PAGES_B T7): SectionHeading then one 'grid' CompareTable per competitor category, sticky blurred header; each table links to its /competitors/<slug> detail page.

· Competitors index only. · appears on 1 routes · implemented by `src/components/ui/CompareTable.jsx (variant=grid)`

**`compare.vs-intro-cards`** — Two 'What is X?' intro cards with logo tiles (SPEC_PAGES_B T8 VsIntroCards).

· Competitor detail pages (planned). · appears on 6 routes

**`compare.matrix`** — Us-vs-Them matrix table (SPEC_PAGES_B T8): centred title row + sub, bordered card with tinted 'us' column, check / minus icons; one card per row on phones.

· Competitor detail pages (planned page; component exists). · appears on 6 routes · implemented by `src/components/ui/CompareTable.jsx (variant=matrix)`

**`compare.vs-feature-cards`** — Row of three grey feature cards with an indigo 48px icon tile under the matrix (SPEC_PAGES_B T8 FeatureCard, indigo-tile skin). FeatureCardGrid only implements the black-glyph skin so far.

· Competitor detail pages (planned). · appears on 6 routes

### COMMERCE

_Pricing plans and plan comparison._

**`commerce.plans`** — Ruled frame with three PricingCards (price, CTA, best-for, feature groups) and footnotes (SPEC_PAGES_A T5.2).

· Pricing only. · appears on 1 routes · implemented by `src/components/ui/RuledFrame.jsx (PlansRow, Footnotes) + src/components/ui/PricingCard.jsx`

**`commerce.compare-features`** — Plan compare table (SPEC_PAGES_A T5.3): sticky header with plan CTAs, accordion bands, horizontal scroll with sticky first column below 1200px.

· Pricing only. · appears on 1 routes · implemented by `src/components/ui/CompareTable.jsx (variant=pricing)`

### FORM

_Lead capture: demo, partner and nomination forms._

**`form.demo-signup`** — Get-a-demo form column (SPEC_PAGES_A T6): back link, DemoForm without card, light 'free trial' button and legal links; on submit a scheduler placeholder replaces the form.

· Get-a-demo only. · appears on 1 routes · implemented by `src/components/ui/DemoForm.jsx + src/components/commerce/SchedulerPlaceholder.jsx (in src/pages/GetADemo.jsx)`

**`form.event-demo`** — Healthcare event block (SPEC_PAGES_A T1.7b): event copy and benefit lines beside a DemoForm card with first/last name row. Optional; healthcare only.

· AEO detail healthcare page only. · appears on 10 routes · implemented by `src/components/product/EventBlock.jsx`

**`form.partner`** — Partner hero + form (SPEC_PAGES_C F1a): two-column hero text beside a glass form card with outline fields and an outline submit button over a streak backdrop.

· Partner only. · appears on 1 routes · implemented by `src/pages/company/PartnerPage.jsx + src/components/ui/Field.jsx (skin=outline) + src/components/company/StreakBackdrop.jsx`

**`form.nominate`** — Nominate form (SPEC_PAGES_C F2): wide labelled form with soft fields, file drop zone and full-width block submit.

· Nominate only. · appears on 1 routes · implemented by `src/components/ui/Field.jsx (skin=soft, FileDropZone, SubmitButton variant=block)`

### NAVIGATION

_In-page wayfinding: tables of contents, scroll-spy menus, share rails, filter/topic bars, doc sidebars._

**`navigation.story-side-menu`** — Sticky story side menu (SPEC_PAGES_B T2): facts list + chapter scroll-spy links, desktop only.

· Customer story detail pages. · appears on 8 routes · implemented by `src/components/content/StorySideMenu.jsx`

**`navigation.hover-toc`** — Fixed left table of contents that expands labels on hover (SPEC_PAGES_B T4 HoverTOC), at 1200px and up.

· Blog post pages. · appears on 8 routes · implemented by `src/components/ui/Toc.jsx > HoverToc`

**`navigation.tick-toc`** — Fixed left tick rail TOC with hover popover showing minute and summary (SPEC_PAGES_B T6 TickTOC), at 1200px and up.

· Article detail pages. · appears on 11 routes · implemented by `src/components/ui/Toc.jsx > TickToc`

**`navigation.inline-toc`** — 'In this guide' <details> TOC above the article body, below 1200px only (SPEC_PAGES_B T6).

· Article detail pages. · appears on 11 routes · implemented by `src/components/ui/Toc.jsx > InlineToc`

**`navigation.share-rail`** — Fixed right share rail (SPEC_PAGES_B T4/T6): copy link, two share links, divider, four 'summarise with an assistant' links with tooltips.

· Blog post and article detail pages. · appears on 19 routes · implemented by `src/components/ui/ShareRail.jsx`

**`navigation.topic-bar`** — Sticky topic bar on the article index (SPEC_PAGES_B T5): dark-active topic chips with counts synced to ?topic, plus a sort select.

· Article index only. · appears on 1 routes · implemented by `src/components/content/TopicBar.jsx`

**`navigation.doc-sidebar`** — Press-kit sticky left sidebar (SPEC_PAGES_C T5), standing in for the global nav: logo link, 'Contents' anchor list, Home link; a top block on phones.

· Press kit only. · appears on 1 routes · implemented by `src/components/presskit/DocSidebar.jsx`

**`navigation.press-contents`** — Press-kit 'Contents' doc section: two-column row with Contents heading and three anchor rows.

· Press kit only. · appears on 1 routes · implemented by `src/components/presskit/DocSection.jsx (contents section in src/pages/PressKit.jsx)`

### CTA

_Calls to action that sit inside the body: callout rows, CTA cards, banners, sticky chips._

**`cta.callout-row`** — Single image-left callout row with H3, body and a dark lg button (SPEC_PAGES_A T1.7).

· AEO detail pages. · appears on 10 routes · implemented by `src/components/ui/FeatureRows.jsx (variant=callout)`

**`cta.coach-banner`** — Indigo CTA banner (SPEC_PAGES_A T2.7 block 4): Cirka 60 white H3 top-left, dark 'see demo' button bottom-right.

· Coach landing only (planned). · appears on 1 routes

**`cta.post-ctas`** — Two CTA cards after a blog post (SPEC_PAGES_B T4 PostCTAs): free-trial card and book-a-call card with pill email field.

· Blog post pages. · appears on 8 routes · implemented by `src/components/content/PostCTAs.jsx`

**`cta.article-chip`** — Sticky bottom CTA chip (SPEC_PAGES_B T6 ArticleCtaChip): tag, label, trailing trial link; shows after 300px, hides at the footer. Replaces the video teaser on articles.

· Article detail pages. · appears on 11 routes · implemented by `src/components/ui/CtaChip.jsx`

**`cta.jobs-report`** — Jobs-board report CTA (SPEC_PAGES_C J6): split card with eyebrow, H2, copy and 'get the template' jobs button.

· Jobs board only. · appears on 1 routes · implemented by `src/pages/CxJobs.jsx (inline report-cta) + src/components/cxjobs/JobsButton.jsx`

### MEDIA

_Media-led blocks whose content is an illustration, photo set or video rather than text._

**`media.integration-orbit`** — Integration orbit (SPEC_PAGES_A T2.5): rotating glass rings of integration tiles linking to detail pages. On /product a 474px orbit sits beside an H2, paragraph and arrow button; on /integrations the 818px orbit sits under the hero.

· Product overview and integrations library. · appears on 2 routes · implemented by `src/components/commerce/IntegrationOrbit.jsx`

**`media.video-frame`** — Product video player (SPEC_PAGES_A VideoFrame): bordered rounded video with custom control bar; 1200px on coach, full-width autoplay-muted on voice. Placeholder video/poster.

· Coach and voice landings (planned). · appears on 2 routes

**`media.photo-collage`** — About photo collage (SPEC_PAGES_C A2): one large photo with two overlapping small photos.

· About only (planned). · appears on 1 routes

**`media.photo-gallery`** — Careers photo gallery (SPEC_PAGES_C C2): SectionHeading + six-photo gallery.

· Careers only (planned). · appears on 1 routes

**`media.demo-art`** — Get-a-demo art column (SPEC_PAGES_A T6 DemoArt): gradient art panel with a customer quote card.

· Get-a-demo only. · appears on 1 routes · implemented by `src/components/commerce/DemoArt.jsx`

**`media.press-hero`** — Press-kit 16:9 hero: indigo field with a white Kestrel lockup.

· Press kit only. · appears on 1 routes · implemented by `src/components/presskit/KestrelLockup.jsx (in src/pages/PressKit.jsx)`
