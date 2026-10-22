# Kestrel marketing site (LORIKEET clone)

A React 18 + Vite + Tailwind v3 rebuild of a marketing site's homepage and page templates. All copy, customers, people,
logos and competitor categories are **placeholder content for a fictional product, "Kestrel"**. Brand and content
imagery is replaced with placeholders (see `IMAGE_CREDITS.md`, `ASSET_MANIFEST.md`).

```bash
npm install && npm run dev   # http://localhost:5210 (strict port)
```

- Build specs: `CLONE_SPEC.md` (homepage), `SPEC_PAGES_A.md` / `SPEC_PAGES_B.md` / `SPEC_PAGES_C.md` (page templates).
- Shared primitives catalog: `COMPONENTS.md`. Content data: `src/data/` (see `src/data/README.md`).
- Routes: `src/App.jsx` plus one file per template group in `src/routes/` (`product`, `commerce`, `content`, `company`).

## Information architecture

`ia.json` is the **only hand-edited IA file**. `IA.md` (readable doc) and `matrix.csv` (section x template matrix)
are **generated** from it. Don't edit them by hand; they are overwritten on every build.

```bash
node validate.mjs   # checks route/template totals, section references, categories
node build.mjs      # regenerates IA.md and matrix.csv
```

After you add a route, template or section, edit `ia.json` and run both commands again.

**What it covers:** 71 routes across 30 templates, built from 120 sections in 11 categories. Templates are classified
by `chrome`:

- `full`: Nav, Footer and VideoTeaser. 38 routes.
- `full-no-teaser`: Nav and Footer, with the teaser hidden by `SiteLayout`'s `NO_TEASER` list (every product,
  industry, pricing and integrations page, plus article detail). 28 routes.
- `none`: get-a-demo, press kit and llms.txt. 4 routes.
- `own`: the /cx-jobs microsite. 1 route.

The 404 catch-all counts as one nominal route. `/llms-txt` and `/llms.txt` are counted as one two-route entry.
The dev-only `/__primitives` showcase (`src/pages/__Primitives.jsx`) is tooling, so it is not counted.

**Status: partly planned.** 24 templates (60 routes) are built and routed, including AEO detail, which the product
group wired up while this IA was being written. 6 templates (11 routes) come from the specs and have no page or route
yet: product overview, coach and voice landings, competitor detail, about and careers. A section only has
`implementedBy` if its component exists on disk. 105 of the 120 sections have one. The other 15 are all in those 6
planned templates, and `IA.md` marks them as `_not yet built_`.

### Findings (from validate.mjs and build.mjs)

- **About half the routes are data-driven detail pages.** 35 of 71 routes (49%) are `:slug` pages from 5 templates:
  article detail (11), customer story (8), blog post (8), competitor detail (6) and integration detail (2). Each count
  is the number of entries in that collection's data file. The live site has more stories, posts and guides, and
  compares named competitors rather than categories. The 41 glossary term links point at `/glossary/<slug>`, which
  has no route and renders the 404, so they are not counted as a template.
- **Most sections are single-use.** 16 of 120 sections are used by more than one template, and 104 are used by only
  one. Leaving out the three global chrome sections, `hero.headline` is the most shared section (8 templates). Next
  are `proof.logo-ticker-labelled` (5 templates) and the three ProseSection blocks (tools, related reading, static
  FAQ), each on 4 templates.
- **A few components carry many distinct sections.** Some sections differ in description but share a component
  variant. Counting by component, `Stories.jsx` backs 5 sections across 6 templates (home, wide, split/testimonial and
  employee cards, plus the assistant note). `RichText` backs 4 sections across 7 templates (prose, blog, article and
  legal). `FaqAccordion` backs 4 sections across 4 templates (panel, hairline, rows and cards). `LogoMarquee` backs 2
  sections across 8 templates.

### Caveats worth a human decision

- Some spec "templates" have structurally different pages (A-T2 product landing, C-T1 company, C-T2 lead form). Each
  page is its own template here so the section lists stay accurate. The `spec` field keeps the link back to the spec.
