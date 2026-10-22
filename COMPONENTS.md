# Shared page primitives – catalog

Template builders should assemble pages from these components and not rebuild them. Every value comes from
`SPEC_PAGES_A.md` (A), `SPEC_PAGES_B.md` (B) or `SPEC_PAGES_C.md` (C). Each file's header comment lists the
measurements it implements. Tokens live in `tailwind.config.cjs` under "pages: shared primitives".

- Location: `src/components/ui/<Name>.jsx`. Hooks and motion constants: `src/lib/useActiveSection.js` and
  `src/lib/uiMotion.js`. Descendant CSS (rich text, markers, field placeholders): `src/components/ui/ui.css`, which
  the components import themselves.
- Type scales: `src/components/ui/type.js` exports `H1_SCALE`, `H2_SCALE`, `H3_SCALE`, `H4_SCALE`, `QUOTE_SCALE`,
  `SUB_SCALE`, `BODY_SCALE`, `SMALL_SCALE` and `BAND_SCALE`. Each is a full responsive class string with the
  Cirka→Fraunces tracking override already re-applied at every breakpoint. Use them in templates as well.
- Breakpoints: base <810 (phone), `md` 810–1199 (tablet, measured at 1000), `lg` 1200–1439 (measured at 1280),
  `xl` ≥1440.
- Data: see `src/data/README.md`. Shared JSDoc types (`RichTextBlock`, `TocItem`, `Compare*`, `LogoEntry`,
  `FaqItem`) are in `src/data/types.js`.
- Showcase: `src/pages/__Primitives.jsx` renders every primitive with Kestrel sample data. It is dev-only; to mount
  it, add this line to `App.jsx` outside `<SiteLayout>`:
  `{import.meta.env.DEV && <Route path="/__primitives" element={<Primitives />} />}` with
  `import Primitives from './pages/__Primitives.jsx'`.
- Motion: everything respects `prefers-reduced-motion`. Spring and tween values are the measured or fitted ones in
  `src/lib/uiMotion.js`. Section-level scroll reveals are not part of these primitives; the specs list almost none
  for these templates.

---

## How overlapping specs were merged

| Concept | Spec sources | One component |
|---|---|---|
| Section heading | A P2 "band" (Ginto 64/77); C T1 SectionHeading (Cirka H2 + sub); A T2.3, B T7–T9 headers (Cirka 60 + sub, gap 16) | `SectionHeading` with `variant` stack/band, `size` h2/h3, `subTone` hero/soft, `gap`, `align` |
| Rich text | A P1 prose; B §R blog + article; C T3 legal (and C A1/A4 paragraphs, which use the blog tokens) | `RichText` with `variant` prose/blog/article/legal. `ProseSection` and `SplitText` compose it. |
| FAQ accordion | A T5.4 P7; B R.6 hairline; B T7 QuestionAccordion; B T8 FaqCards | `FaqAccordion` with `look` panel/hairline/rows/cards |
| Form fields | A P5 DemoForm (T6, T1.7b) = B T8 form; C Field outline/soft; B T4 pill email row | `Field` with `skin` demo/outline/soft/pill, plus `FileDropZone`, `SubmitButton`, `Form`. `DemoForm` is a preset. |
| Filters | B T1 story chips; B T3 tabs; B T5 topic chips; A T3.3 sidebar categories | `FilterChips` with `variant` story/tabs/topic/sidebar |
| TOC / scroll-spy | B T4 HoverTOC; B T6 TickTOC + InlineTOC (and the B T2 side-menu spy) | `Toc.jsx` (HoverToc / TickToc / InlineToc) on top of one `useActiveSection` + `scrollToId` (Lenis) |
| Comparison tables | B T7 "grid"; B T8 "matrix"; A T5.3 pricing table | One `CompareTable` with `variant` grid/matrix/pricing. They share one data shape and the `CellValue` renderer. |
| Logo strips | CLONE_SPEC §7 Proof marquee; A T1.2/T2/T3 tickers; B T7–T9 strips; C A3 + F3 LogoWall | `LogoMarquee` (generic engine) + `LogoWall` (heading + reveal) |
| Carousels with arrows | A T2.3 CardCarousel; B T3 CardRail | `CardCarousel` with `variant` snap/rail |
| Simple hero | A T2.1/T3.1; B T1/T7/T10; C nominate/404/careers (type only) | `HeroHeadline` |

Not to be confused: **SplitText** is C's two-column text block. The per-letter title animation is **LetterReveal**.

---

## Primitives

### RichText — `ui/RichText.jsx`
Renders `RichTextBlock[]`: `p` (inline HTML: a/strong/em/br), `h2`/`h3`/`h4` (with `id`, auto-slugged if missing),
`ul`/`ol`, `blockquote` (+`cite`), `takeaways`, `image` (+`caption`), `video`, `table`, `code`.
Exports `tocFromBlocks(blocks, { levels })` and `slugify`.

| variant | spec | key tokens |
|---|---|---|
| `prose` | A P1 (T1.3/T1.8/T1.9, T2, T3.4) | 20/26 → 18/23.4 → 16/20.8, #808080; 20px block gap; disc bullets, 1.24em indent; H3 Ginto 32/32 |
| `blog` | B §R, T4 (900 wide); also C A1/A4 paragraphs | 20/26 rgba(0,0,0,.75); h2 38/42, h3 32/32, h4 24/28 (unmeasured); "•" markers; list mt 38 after p; blockquote 1px rule |
| `article` | B §R, T6 (800 wide) | as blog; h2 28/34 (24/30 phone), h3 22/28 (20/26); key-takeaways box |
| `legal` | C T3 (920 wide) | 20/26 #000 pre-wrap; H4 Cirka 40/36 (36/36 <1440); rhythm 24 / 20 / 72 (≥1200, otherwise 24); "- " lists |

```jsx
<RichText blocks={post.body} variant="blog" className="max-w-[900px]" />
const toc = tocFromBlocks(post.body, { levels: [2, 3] })
```

### SectionHeading — `ui/SectionHeading.jsx`
Props: `title`, `sub`, `variant` ('stack' | 'band'), `size` ('h2' 75/72 scale | 'h3' 60/60 scale), `subTone` ('hero'
24/30 #000 scale | 'soft' 20/26 rgba(0,0,0,.75) scale), `align`, `gap` (24 for C, 16 for A/B headers), `as`.
Used by C careers C2–C5 (stack h2), A T1.4 (band), A T2.3 /product heading (use `variant="band"` plus a sub
paragraph, or stack with a band-style title), B T7/T8/T9 section headers (stack h3, gap 16), and B RelatedStories
(stack h2).
```jsx
<SectionHeading title="Join the team" sub="…" />                       // C C3–C5
<SectionHeading size="h3" gap={16} title="…" sub="…" />                 // B T7 sections
<SectionHeading variant="band" title="…" />                             // A T1.4
```

### HeroHeadline — `ui/HeroHeadline.jsx`
The simple centred hero: H1 96/77/58/40 + optional sub + actions. It has no pill, photos or WebGL. Props: `title`,
`sub`, `subSize` ('hero' | 'body'), `subColor` ('body' #333 | 'ink' #000 | 'muted3' #808080), `subMaxWidth`,
`actions`, `gap` (H1→sub: 16 homepage, 12 B T1, 37 B T10 / C nominate), `actionsGap`, `as`. The page sets the
section padding through `className`.
Used by A T2.1 (/product, /coach, /voice), A T3.1, B T1/T7/T10 and C F1b. For C 404, use `as="h2"` with the H2
scale, or compose `SUB_SCALE` directly.
```jsx
<HeroHeadline className="px-5 pt-[180px] md:px-8 lg:px-16" title="…" sub="…" subColor="ink"
  actions={<><Button variant="dark">Book a demo</Button><Button variant="light">Start free trial</Button></>} />
```

### SplitText — `ui/SplitText.jsx`
C A1/A4: heading left, rich text right (gap 100), stacked below 1200. Props: `title`, `blocks`, `pt` (200 | 100),
`lgTight` (A1 96/38 quirk at 1280 vs A4 96/100), `as`, `headingAs`.
```jsx
<SplitText title="Our mission" blocks={about.mission} />                         // A1 header, pt 200
<SplitText pt={100} lgTight={false} as="main" headingAs="h2" title="Team" blocks={about.team} />
```

### ProseSection — `ui/ProseSection.jsx`
A P1 shell (max-w 1200, padding 60/80, H2 → items 48, items 40, H3 → body 12) around `RichText variant="prose"`.
Props: `title`, `items: [{ title?, blocks }]`, `tabletPad` (80 | 32), `phonePad` (80 | 20, where 80 is the measured
230px-column quirk on T1 and /voice).
Used by A T1.3 Tools, T1.8 Related Reading, T1.9 static FAQ, all T2 pages, and T3.4.
```jsx
<ProseSection title="…" items={page.tools} />
<ProseSection title="Frequently asked" items={page.faq} tabletPad={32} phonePad={20} />
```

### LetterReveal — `ui/LetterReveal.jsx`
Per-letter reveal (A T5.4): opacity .001 / y 20 → 1 / 0, all letters together, 450ms fitted ease-out, once on
entering the viewport. Props: `text`, `as`, `className`. `FaqAccordion look="panel"` uses it for its title.

### Field, FileDropZone, SubmitButton, Form — `ui/Field.jsx`
These forms never send data. `Form` always calls `preventDefault()`. Native validation (`required`, `type=email`,
`type=url`) runs first, then a local success message (`success` prop) replaces the form.

Field props: `skin`, `type` (text/email/url/tel/select/textarea), `label`, `hideLabel`, `name`, `placeholder`,
`required`, `options` (select), `bordered` (demo email), `boxHeight={74}` (demo "anything else").

| skin | spec | control |
|---|---|---|
| `outline` | C partner | 52 tall (textarea 100), r8, inset 2px #E5E5E5, focus 1px #0099FF, placeholder-only label |
| `soft` | C nominate | Cirka 40/36 label, 58 tall (textarea 145), r14.49, rgba(187,187,187,.15), Inter 20.29 #999, focus 1px #0099FF |
| `demo` | A P5 / B T8 | Cirka 700 16/19.2 label, 40 tall #FAFAFA r8; `bordered` = 44 tall r10 1px border, focus #0F0F10 + 2px blue glow |
| `pill` | B T4 PostCTA | 40 tall, r100, rgba(187,187,187,.15) |

`SubmitButton variant`: `demo` (109x34 #0D0D0D), `outline` (C partner, 2px #222, arrow rotates −45° on hover),
`block` (C nominate, full width 58, hover #404040), `pill` (B T4, #333).
`FileDropZone` (C nominate): 141 tall, a click-anywhere file input; it shows the chosen file names.
```jsx
<Form className="flex flex-col gap-5">
  <Field skin="outline" type="email" name="email" label="Work email" placeholder="Work email*" required />
  <Field skin="outline" type="textarea" name="msg" label="Message" placeholder="Tell us more*" required />
  <SubmitButton variant="outline">Submit</SubmitButton>
</Form>
```

### DemoForm — `ui/DemoForm.jsx`
Preset of the A P5 / B T8 demo form: heading Cirka 700 24/23, then email (bordered), two selects, "anything else" and
"how did you hear", then Submit. Props: `title`, `fields` (defaults to `DEMO_FIELDS`), `nameRow` (first/last pair,
A T1.7b), `card` (rgba(255,255,255,.84) r16 p22), `submitLabel`.
Used by A T6 /get-a-demo (no card), A T1.7b healthcare (card + nameRow), and B T8 VsHero (card).
```jsx
<DemoForm card title="See it in action" />
```

### FaqAccordion — `ui/FaqAccordion.jsx`
Props: `items: FaqItem[]`, `look`, `title`, `layout` ('sidebar', panel only), `single`, `defaultOpen`.

| look | spec | notes |
|---|---|---|
| `panel` | A T5.4 pricing | white rows, hover/open #F7F7F7, Cirka 30/30 Q, chevron 180°, spring .6/0; with `title`, a sticky 40% title column using LetterReveal |
| `rows` | B T7 | white rows, Cirka 30→24 Q at max-w 80%, caret #252E3D, spring k400/c40; `title` gives a centred Cirka 60 H2 |
| `hairline` | B R.6 article (T6; also T8/T12 pattern) | top hairline #E8E8E8, Ginto 20/26 Q, 28px #F4F4F4 plus rotating 45°, instant answer, first item open |
| `cards` | B T8 | bordered white cards r16 with layered shadow, Cirka 26/26 Q, "+"/"−", ~150ms open |

```jsx
<FaqAccordion look="panel" title="FAQs" items={pricing.faq} />
<FaqAccordion look="hairline" items={article.faq} />
```
The B T12 /faq page is a static document. Render it with `RichText` per answer instead.

### FeatureRows — `ui/FeatureRows.jsx`
Props: `rows: [{ eyebrow?, title, body, image?: { src, alt, position }, cta?: { label, href } }]`, `variant`,
`startSide`.

| variant | spec |
|---|---|
| `472` | A T1.5: 472² alternating (image-left gap 48 / r8, image-right gap 95 / r6), eyebrow + H3 32/32 + body #808080 |
| `callout` | A T1.7: one image-left row plus `Button` dark lg |
| `600` | A T2.4: 600² image r12 + 600 text column (H2 38/42, body, button), rows 92 apart |

```jsx
<FeatureRows rows={page.rows} />
<FeatureRows variant="callout" rows={[page.callout]} />
<FeatureRows variant="600" rows={product.rows} className="py-[46px]" />
```

### IntegrationCard — `ui/IntegrationCard.jsx`
A P4: #F7F7F7 card (hover #EEEEEE, 200ms), 36px glyph logo, 20/26 name, and a 2-line clamped 14/18 description.
Used by A T3.3 (2 × 421 grid, gap 20) and A T4 "Other apps" (2 × 587).
```jsx
<IntegrationCard name="Helpdock" description="…" href="/integrations/helpdock" logo={{ shape: 'square' }} />
```

### RuledFrame, PlansRow, Footnotes — `ui/RuledFrame.jsx`; PricingCard — `ui/PricingCard.jsx`
A T5.2. The frame (1px rgba(24,24,24,.07), max-w 1280) wraps the plans, the footnotes and the compare table.
PricingCard props: `name`, `price`, `per`, `note`, `cta`, `bestFor`, `groups: [{ label, rows: [{ label, value }] }]`,
`featuresHref`.
```jsx
<RuledFrame>
  <PlansRow>{plans.map((p) => <PricingCard key={p.name} {...p} />)}</PlansRow>
  <Footnotes note="…" link={{ label: '…', href: '/pricing.md' }} />
  <div id="compare"><CompareTable variant="pricing" columns={cols} groups={groups} /></div>
</RuledFrame>
```

### CompareTable — `ui/CompareTable.jsx`
Props: `variant`, `columns: CompareColumn[]` (`columns[0]` is the label column), `groups: CompareGroup[]`, `title`.
Values: `true`, `false`, `'partial'`, a string, or `{ text, note, align }`. `CellValue` is exported.

| variant | spec | layout |
|---|---|---|
| `grid` | B T7 (6 tables) | sticky blurred header (top 120), 3 equal columns, grey cells; phone: label row plus two value cells |
| `matrix` | B T8 | bordered card, tinted "us" column, green check / red minus icons; phone: one card per row |
| `pricing` | A T5.3 | sticky header with plan CTAs, accordion bands (first open, spring .45), horizontal scroll with a sticky first column below 1200 |

### CardCarousel — `ui/CardCarousel.jsx` (also exports `CarouselCard`)
Props: `items`, `variant` ('snap' A T2.3 | 'rail' B T3), `card` ('square' 332² | 'rectangle' 332×217),
`title` (rail), `renderItem`, `label`, `trackClassName` (track padding such as /voice's full-bleed-right `pl-8`).
Snap: snap-center, right fade, black round arrows that hide at the ends, 390ms fitted scroll to the next snap point.
Rail: ring arrows in the header, scrolls one viewport per click in 350ms.
```jsx
<CardCarousel items={channels} card="square" />
<CardCarousel variant="rail" title="Podcasts" items={podcasts} renderItem={(p) => <BlogCard post={p} width={360} />} />
```

### FilterChips — `ui/FilterChips.jsx`
Props: `items: [{ id, label, count?, theme?, glyph? }]`, `value`/`defaultValue`, `onChange`, `variant`, `label`.
Variants: `story` (B T1, themed fill animating in 425ms), `tabs` (B T3, ring tabs, hover #CCCCCC), `topic` (B T5,
dark active chip with counts), `sidebar` (A T3.3 category list). The template does the filtering and URL syncing.

### SearchInput — `ui/SearchInput.jsx`; LoadMoreButton — `ui/LoadMoreButton.jsx`
B T5. SearchInput is 380×48 with a pill border (#E8E8E8) and `onChange(value)` (local only). LoadMoreButton is
179×42 with a #DCDCDC border and Inter 500 16 text; pass `onClick`, and `hidden` once everything is shown.

### Toc — `ui/Toc.jsx` (`HoverToc`, `TickToc`, `InlineToc`, default `Toc variant=…`) + `lib/useActiveSection.js`
All three take `items: TocItem[]`. Build them with `tocFromBlocks`. TickToc also reads `minute` and `summary` for its
popover and tick widths. Scroll-spy (`useActiveSection(ids, { line: 160 })`) is IntersectionObserver-only. Clicks
call `scrollToId(id, { offset: 120 })`, which goes through Lenis.

| | spec | where |
|---|---|---|
| `HoverToc` | B T4 blog post | ≥1200, fixed left; expands on hover with a gradient backdrop (0.3s cubic-bezier(.65,0,.35,1)) |
| `TickToc` | B T6 article | ≥1200, fixed left 28; ticks grow on hover and the hovered tick shows a popover |
| `InlineToc` | B T6 <1200 | `<details>` box above the body |

The B T2 story side menu should call `useActiveSection(sectionHeadingIds)` and `scrollToId`. It needs heading ids,
not whole sections.
```jsx
const toc = tocFromBlocks(article.body)
<TickToc items={toc} /> <InlineToc items={toc} /> <ShareRail /> <CtaChip … />
```

### ShareRail — `ui/ShareRail.jsx`; CtaChip — `ui/CtaChip.jsx`
ShareRail (B T4/T6, ≥1200, fixed right 24): copy link (clipboard), two share links, a divider and four placeholder
"summarise with an assistant" links, each with a tooltip. Pass `items` to change them.
CtaChip (B T6, fixed bottom): `tag`, `label`, `href`, `trailing`, `trailingHref`, `showAfter` (300),
`hideAtSelector` ('footer'). On article pages, use it instead of VideoTeaser.

### EmployeeCard — `ui/EmployeeCard.jsx`
C A5/C4. Props: `quote`, `name`, `role`, `flag` (emoji), `photo: { src, position }`, `profileHref`, `layout`
('horizontal' 242 tall, photo right | 'vertical'), `tint` (pink/cream/peach/grey/lavender; `EMPLOYEE_TINTS`).
The grids are the template's job (about: row gap 16; careers: 2 columns). The careers phone carousel is a Stories
variant (deferred).

### LogoMarquee — `ui/LogoMarquee.jsx`; LogoWall — `ui/LogoWall.jsx`
LogoMarquee props: `logos: LogoEntry[]` (default `DEFAULT_LOGOS`), `speed` (px/s; 50 strips, 30 homepage tickers,
50.8 A T1.2), `direction` ('left' | 'right'), `gap` (96), `height` (uniform logo height, e.g. 20 for tickers),
`card` (bordered 132-tall card with edge mask, default true), `width` (px number or CSS value).
It uses the same engine as Proof (global `.marquee-left/right` keyframes, loop = stack + gap) and measures how many
copies are needed.
LogoWall (C F3): Cirka 30→24 heading, a strip at viewport − 40, and a fade-up reveal (§7 tween).
```jsx
<LogoMarquee width={1200} logos={industryLogos} />                     // A T1.2 ticker card
<LogoMarquee card={false} height={20} speed={30} direction="right" />  // homepage-style ticker
<LogoWall heading="Trusted by CX leaders" logos={logos} />            // C /partner, /nominate
```

---

## Usage by template (quick index)

| Template | Primitives |
|---|---|
| A T1 AEO detail | ProseSection (Tools/Related/FAQ), SectionHeading band, FeatureRows 472 + callout, LogoMarquee (1200), DemoForm card+nameRow (healthcare) |
| A T2 product landings | HeroHeadline, LogoMarquee, ProseSection, CardCarousel snap, FeatureRows 600, SectionHeading |
| A T3 / T4 integrations | HeroHeadline, LogoMarquee (1400), FilterChips sidebar, IntegrationCard, ProseSection |
| A T5 pricing | RuledFrame/PlansRow/PricingCard/Footnotes, CompareTable pricing, FaqAccordion panel |
| A T6 get-a-demo | DemoForm (+ Button light md) |
| B T1 story index | HeroHeadline, FilterChips story |
| B T2 story detail | useActiveSection + scrollToId (side menu), RichText (body paragraphs; see gaps), SectionHeading h2 |
| B T3 blog index | FilterChips tabs, CardCarousel rail |
| B T4 blog post | RichText blog, HoverToc, ShareRail, Field pill + SubmitButton pill (PostCTAs), SectionHeading |
| B T5 article index | SearchInput, FilterChips topic, LoadMoreButton |
| B T6 article | RichText article, TickToc, InlineToc, ShareRail, CtaChip, FaqAccordion hairline |
| B T7 competitors | HeroHeadline, LogoMarquee, SectionHeading h3, FaqAccordion rows, CompareTable grid |
| B T8 competitor detail | DemoForm card, LogoMarquee, CompareTable matrix, FaqAccordion cards |
| B T9 report | LogoMarquee, SectionHeading |
| B T10 thoughts | HeroHeadline (subSize body, subColor muted3) |
| C T1 about/careers | SplitText, EmployeeCard, LogoMarquee (about strip), SectionHeading |
| C T2 partner/nominate | Field outline/soft, FileDropZone, SubmitButton outline/block, Form, LogoWall, HeroHeadline (nominate) |
| C T3 legal | RichText legal (+ centred H1 with H1_SCALE) |

---

## Homepage component variants (Proof, Stories, Button)

The homepage components take variant props. Defaults render the homepage unchanged (verified against a
Playwright baseline at 1440/1000/390). The tokens are in the "homepage variants" block of `tailwind.config.cjs`.

### Proof — `components/Proof.jsx`
The marquee now runs on `ui/LogoMarquee` (motionId `proof-marquee`).

| prop | default | notes |
|---|---|---|
| `variant` | `'home'` | `'logos'` = C A3 /about block: heading only (homepage H2 scale), section bg `bg-about-fade` (#FFF→#F9F9F9), padding 80 (phone `80px 32px`), gap 52, then one bordered single-row strip (50 px/s) at **every** width (container width: 1280/1120/840/326). No reveal. 488 tall @1440 with a 2-line heading. |
| `heading` | Kestrel placeholder | `'logos'` only |
| `logos` | 7 of `DEFAULT_LOGOS` | `'logos'` only. `LogoEntry` may carry `opacity` / `filter` (C A3: two logos `saturate(0)`, one also `.58`). |
```jsx
<Proof variant="logos" heading="Trusted by teams of every size" logos={aboutLogos} />
```
`LogoMarquee` also gained `motionId` (data-motion value, default `logo-marquee`) and per-logo `opacity`/`filter`.

### Stories — `components/Stories.jsx`
`card` selects the variant. `'home'` (default) is the homepage carousel and ignores every other prop. All other
cards use the homepage Slideshow engine: 5s autoplay while in view, spring .6/0 slide, drag, 4 copies, inactive
`scale` with the homepage originX behaviour, and 12px #FF29E5 dots at inactive .2.

| card | spec | defaults (all overridable) |
|---|---|---|
| `wide` | A T1.6 (ai-agents, financial-services, healthcare) | slot 956x393, `gap` 48 (step 1004), `scale` .9, pager pill overlaid 70 below. Below 1200 there is **no slider**: one static card (`below1200: 'static'`). `tint`: `'pink'` (#FEEAFC / #400B39) or `'peach'` (#FCEDE8 / #3B1208). Includes the "See customer story" pill (arrow 13→18 + −45° on hover). Section 737 tall @1440. |
| `split` / `testimonial` | A /product split card = B T8 "customers love us" (same Framer card) | slot 956x394 (image 456 + panel 500), `gap` 32 (pitch 988), `scale` .9, pager pill overlaid 70 below. Below 1200: slider with `mobileItem` 315 (315x603 column card), `mobileGap` 20, `mobilePager` `'soft'` (#F4F4F4), `mobilePagerGap` 42. Per-item `tint`: `'peach'` #FDECE8, `'pink'` #FFEBFD, `'green'` #E7F4E8. |
| `employee` | C careers phone carousel | `EmployeeCard layout="vertical"`, `item` 294, `gap` 12 (pitch 306), `scale` .9, pager in flow 12 below, 8 dots. One geometry at every width; the template shows it below 810 (`md:hidden`) and the grid above. No section shell or heading: wrap it yourself. |

Other props: `items`, `title` (Cirka 60 H3 scale via SectionHeading), `sub` (20/26 rgba(0,0,0,.75), gap 16),
`interval` (s), `pager` (`'pill'|'soft'`), `pagerGap`, `pagerOverlay`, `below1200` (`'static'|'slider'|'same'`),
`className`. Section shell for `wide`/`split`/`testimonial`: bg #fff, padding `102px 32px`, gap 80, `overflow-x: clip`
(neighbours bleed to the viewport edges, as on live).
Item shapes: wide/split = `{ quote, name, role, img, photo?, logo?: { name, shape, w, h }, href?, cta?, tint? }`;
employee = `EmployeeCard` props. `VariantSlideshow` is also exported for custom cards (`items`, `renderItem`, `item`,
`gap`, `scale`, `interval`, `pager`, `pagerGap`, `pagerOverlay`, `label`).
```jsx
<Stories card="wide" tint="peach" title="Care teams on Kestrel" items={page.stories} />            // A T1.6
<Stories card="split" title="Who runs on Kestrel?" items={product.stories} />                       // A /product
<Stories card="testimonial" title="Customers love us" sub="…" items={comp.testimonials} />           // B T8
<div className="md:hidden"><Stories card="employee" items={careers.team} /></div>                   // C careers <810
```

### Button — `components/Button.jsx`
| prop | values (default first) | notes |
|---|---|---|
| `variant` | `dark` \| `light` \| `outline` | `outline` (C partner): link, 115x50 (105x45 @810–1199), 2px #222, radius 50, label 16/18 (13/13 tablet, 14/18 phone) + 10px arrow rotating −45° on hover (pill spring). `size` is ignored. |
| `size` | `lg` (42) \| `md` (34) \| `xl` (50) | `xl` = C careers hero: 50 tall, padding 16px 24px, label 14/18 |
| `href` | `'#'` | `/…` renders a react-router `<Link>` (still an `<a>`); `#` and external stay `<a>` |
| `onClick` | – | passed through |
Dark/light buttons now include the hidden glow layer from CLONE_SPEC §5 / C T6: blur 12, opacity 0, brand-gradient-A
square 1.4x wide, `data-motion="button-glow"`. It is static. The live 72°/s rotation is left for the animation pass.
```jsx
<Button size="xl" href="#open-roles">See open roles</Button>          // C careers hero
<Button variant="outline" href="/partner">Apply</Button>              // outline link
<Button href="/">Back home</Button>                                   // C 404 (identical to Main Large)
```

### Nav / Footer links
Nav and Footer now link to the clone routes with react-router `<Link>`. Story, blog, article and competitor links go
to their index pages. Link clicks close the desktop dropdown and the phone menu. "Log in", "Start free trial",
"Service Index", the footer "Agent-to-agent support" and "Awards", cookie settings, the AI/social round buttons and
the footer announcement pill stay `#` because no route matches them.
