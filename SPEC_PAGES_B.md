Source: https://www.lorikeetcx.ai/

# Lorikeet – page templates B (stories, blog, articles, competitors, content/report, thoughts, glossary, FAQ)

Companion to `/Users/riyaghosh/V3/LORIKEET/CLONE_SPEC.md` (homepage). This file covers only what differs from the homepage. Every global token (fonts, colours, radii, glass shadow, Lenis, breakpoints, Nav, Footer, Button, AnnouncementPill, VideoTeaser) is **as in CLONE_SPEC.md §0–§5 / §14** unless stated otherwise.

Measured with headless Chromium (Playwright 1.63, `--use-angle=metal`) on the live site, 2026-10-22, at **1440 / 1280 / 1000 / 390** wide (900 tall). Values are computed styles / bounding rects; doc-y = absolute page y.
Reference screenshots (viewport resized to full doc height, so no stitching artefacts): `/Users/riyaghosh/V3/LORIKEET/recon/pages/<template>/<width>-<page>.png`.

CONTENT RULE (from brief): rebuild copy is for the fictional product **Kestrel**, with fictional customers and fictional competitor *categories*. Copy is described below only by role, type, max-width, line count, approx char count (`n≈`) and a 2–4 word gist. Brand photos/logos → placeholders.

Breakpoints (Framer, same as homepage): phone `<810`, tablet `810–1199.98`, desktop `1200–1439.98`, desktop-XL `≥1440`. 1000 = tablet variant (first time measured – the homepage spec never sampled tablet), 1280 = desktop.

---

## 0. Template map (clustering)

| # | Template (name used below) | URLs measured | Framer root layers (1440) | Pages within template differ… |
|---|---|---|---|---|
| T1 | **StoryIndex** | `/customer-stories` | `Collection-Page` › `Hero Headline` + `Variant-All-Desktop` (`Stories-Category` chips + `Customer-Stories-01/02` card list) | single page |
| T2 | **StoryDetail** | `/customer-stories/how-summ-…`, `/customer-stories/how-nft-marketplace-magic-eden-…` | `Hero-Quote-Desktop` **or** `Hero-Split-Desktop` › `Storie-Section` (`Side-Menu-Section` + `Storie-Content` with `Content-Section-1..5`) › `Read more` | **structurally in 2 places**: hero variant (`quote` vs `split`), and per-section media slot (image / illustration / image+quote card / big quote / none). Everything else content-only. |
| T3 | **BlogIndex** | `/blog` | `Container` (title + search) › `Main` (featured 1 + 3 side) › `Section` (tinted rail, 5 cards) › `Section` (grid of ~80 cards with filter tabs) | single page |
| T4 | **BlogPost** | `/blog/launching-b2a` | `Header` › `Post` (`Header post`, `Content + Share`, `Blog CTAs`, `Related Posts List`) + fixed `Side Table of Contents` + `Blog Share + AI Summary` | (one sampled; layer set is a CMS template) |
| T5 | **ArticleIndex** | `/articles` | `section` › `Intro row`, `Featured`, sticky `Topic bar`, `Guide card` ×9 | single page |
| T6 | **ArticleDetail** | `/articles/customer-service-metrics`, `/articles/what-is-a-good-nps-score` | `main` › `Post` + fixed left `nav` (share rail) + `Share + AI Summary` | content-only (identical layer trees; heights differ) |
| T7 | **CompetitorIndex** | `/competitors` | `Main` › `Hero`, `Section 2`, `Section 4`, `Section 3` | single page |
| T8 | **CompetitorDetail** | `/competitors/lorikeet-vs-zendesk`, `/competitors/lorikeet-vs-sierra` | `Desktop - 1` (hero) › logo strip › `Proof-Section` › `Main` (`Table`, `Desktop` CTA, `Faq`) | content-only (identical trees; row counts differ) |
| T9 | **ReportLanding** | `/content/the-support-exception` | `R2 Hero`, `R2 Trust`, `R2 Findings`, `R2 Pull Quote`, `R2 Whats Inside`, `R2 Customers` | single page |
| T10 | **ThoughtsIndex** | `/thoughts-on-cx` | `Hero` › `Posts` (3 masonry columns) | single page |
| T11 | **Glossary** | `/glossary` | `Hero Section` › `Content Section` › `Terms List` | single page |
| T12 | **FAQ** | `/faq` | `Main` › `Post` (sidebar + Q&A body) | single page |

All 12 templates share: **Nav v2** (identical to homepage, CLONE_SPEC §4), **Footer V5** (identical to homepage incl. CTA glass + Unicorn stripes, CLONE_SPEC §14 – only the CTA heading text varies), Dot-Cursor, VideoTeaser `.lvc`, cookie banner, and a hidden `AI Agent Instructions (hidden)` layer (opacity 0, 1x1, contains machine-directed text – do **not** reproduce its content; omit). Footer starts directly after the last template section (no extra spacer) – `Footer-scroll-trigger` is an invisible 703px band overlapping the footer (unused).

**No scroll-reveal animations** exist on any of these templates: a load-time probe (every `[data-framer-name]` with opacity<0.05 or inline transform, then scrolled into view and sampled every 50ms) found none except carousels/accordions noted per template. The `matrix(1,0,0,1,-w/2,-h/2)` transforms on `Image` layers are Framer's image centring, not animation. So, unlike the homepage, these pages are static apart from hover states, tabs, accordions, carousels and the sticky/scroll-spy sidebars.

---

## 1. Shared tokens introduced by these templates

### 1.1 Category colour themes (stories, story cards, chips)
Each customer story has a `theme`. Every story surface uses the trio (light bg / dark text+ring / mid meta) – reuse homepage tint tokens where they already exist:

| theme (site category) | light (card bg, button inner) | dark (title, ring, button label) | mid (name/role) | chip icon dot |
|---|---|---|---|---|
| pink ("Finance") | `#FEEAFC` (= `blush`) | `#400B39` | `#801573` | `#FFC9F9` |
| yellow ("Complex SaaS") | `#FBF6E4` (= `cream`) | `#3F3306` | `#7D6508` | `#FBEFC1` |
| red ("Health") | `#FDECE9` | `#3B1208` | `#752512` | `#F9C8BC` |
| green ("Energy") | `#E7F4E8` (= `mint`) | `#0C2D10` | `#185B1F` | `#C8E9CB` |
| neutral ("All" chip) | `#E5E5E5` | `#1A1A1A` | – | `#E5E5E5` |

Suggested Tailwind additions: `theme-{pink,yellow,red,green}-{light,dark,mid,dot}`. The "dark" and "mid" values for pink/yellow/green equal the homepage tag/meta tints (`#400B39`, `#801573`, …), so these are an extension, not a new palette.

### 1.2 Tinted logos and icons
Customer logos and small glyphs (arrow, chip icons) are rendered as **`div` with `background-color: <theme dark>` + CSS `mask-image: url(logo.svg)`** (`Mask-CSM-Connector` layers), i.e. single-colour logos tinted per theme. Rebuild: a `<TintedMark src color />` component (`mask-image`, `mask-size: contain`, `mask-repeat: no-repeat`, `mask-position: left center`) – feed it placeholder SVG marks.

### 1.3 `PillLinkButton` (story "See results" button) – NEW shared atom
- Desktop (`Collection-button-Desktop`) **141×50** outer: bg = theme dark, `padding: 2px`, radius 50 → inner `Inner-Color` 137×46, bg = theme light, `padding: 16px 24px`, radius 50, row gap 4: label Ginto Medium 14/14 theme-dark (n≈11, gist "see results") + 13×13 arrow (tinted mask).
- Mobile (`Collection-Button-Mobile`) **125×42**, inner padding `12px 16px`, same type.
- **Hover is driven by the parent card** (the whole card is the link): inner bg light → dark, label + arrow colour dark → light. Measured on a wide card: 0ms light → 159ms ≈ 60% → 312ms done (≈`rgb(57,0,49)` – slight overshoot) → settles 600ms. Use a spring `{stiffness≈300, damping≈30}` or `0.3s cubic-bezier(.2,.8,.2,1)`.

### 1.4 Card hover lift (story cards)
Story cards have `box-shadow: 1px 3px 30px rgba(0,0,0,0)` at rest → **`rgba(0,0,0,.2)`** on hover (same curve as 1.3, ~300ms with a tiny overshoot to .204). No scale/translate. On wide cards the shadow is applied to the two child panels (text panel and image) separately; on Featured cards to the card.

---

## T1. StoryIndex – `/customer-stories`

Screenshots: `recon/pages/story-index/1440-cs-index.png`, `390-cs-index.png`. Doc height 12527 @1440 (11 795 before footer), 12440 @1280, 11588 @1000, 13174 @390.

### Section list & reuse
| section | class | notes |
|---|---|---|
| Nav | (a) IDENTICAL `Nav` | – |
| Hero headline | (b) VARIANT of `Hero` headline block | no announcement pill, no CTAs, no photo stage; just H1 + sub. See below |
| Category chips | (c) NEW `FilterChips` | – |
| Story card list | (c) NEW `StoryCard` (4 layouts) | – |
| Footer | (a) IDENTICAL `Footer` | CTA heading text differs only |

### Layout
- `Collection-Page`: column, centred, gap **64**, padding **160 80 80** (1440/1280), **120 40 80** (1000), **120 16 32** (390). Content width 1120 @1440/1280 (`Variant-All-Desktop` `max-width:100%` inside 1280 container but cards are 1120 → effectively **max-width 1120, centred**), 920 @1000, 358 @390.
- **Hero Headline** (`Hero Headline`): column, gap 12, padding `8px 32px` (390: `8px 0`), centred.
  - H1 (gist "our customers", n≈13, 1 line) Cirka **96/96 ls −3.84** #000 centre @1440; **77/77 −3.08** @1280; **58/58 −2.32** @1000; @390 rendered as H2 Cirka **40/36 −1.6**, 2 lines (phone copy is longer, n≈34).
  - Sub (n≈88, gist "trusted by teams") Ginto Regular **24/30 −0.48 #000** centre, width **511 → 2 lines** @1440; 19/23 −0.38 w410 2 lines @1280; 15/18 −0.3 w309 3 lines @1000; 14/17 −0.28 w358 2 lines @390.
  - Hero → chips gap 64.
- **FilterChips** (`Stories-Category` › `Draggable-Container`): row gap **8**, centred (@390 left-aligned, row 454 wide inside 358 → horizontally scrollable/draggable, `overflow:hidden` + drag). 5 chips: All + 4 categories.
  - Chip = `Stack-Border` (1px ring: bg `#E5E5E5`, padding 1, radius 50, h 36) › `Stack-Fill` (bg #FFF, padding `8px 10px`, radius 50, row gap 8) › icon dot **18×18** circle (theme dot colour, padding 1) holding a 12×12 tinted glyph + label Ginto Medium **14/14** in theme dark (All: #1A1A1A); gap icon→label 5.23. Widths @1440: 62 / 96 / 89 / 91 / 137.
  - Selected: ring `#999999`, fill = theme light (All: `#E5E5E5`). Unselected: ring `#E5E5E5`, fill white. **No hover change** (measured).
  - Click → fill animates white → theme light in ≈400ms (ease-out; 113ms `rgb(255,254,255)`, 270ms `rgb(254,240,253)`, 425ms final) and the list swaps to the category variant (e.g. `Variant-Finance-Desktop`, 9 cards). URL does not change. No list transition measured (instant swap).
  - @390 label 11/14.
- **Card list**: column gap **32** (desktop/tablet), **24** between list groups @390 (cards themselves gap 32). "All" shows **20 cards** in this order: F-R, F-L, W-R, F-L, W-L, W-R, F-L, W-L, Q, W-L, Q, F-R, F-L, W-L, W-R, F-L, W-L, F-L, W-R, F-R (F = Featured, W = Wide, Q = Quote, R/L = image side). Drive layout from data (`layout: 'featured'|'wide'|'quote'`, `imageSide`).

### StoryCard – Featured (`Featured - Image Right/Left`)
- 1120×**675**, row, gap 8, padding 16, radius 16, bg theme light, shadow token 1.4. Image side alternates.
- Text column `Hero Container` 472×643 (padding 8) › `Content` (padding 8, column, **space-between**):
  - Title H3 Cirka **60/60 −2.4** theme dark, width 440, 4–5 lines (n≈60–90, gist "how X handles Y"). 1280: 50/50 −2; 1000: 40/40 −1.6 (w354).
  - 16px gap → PillLinkButton (1.3).
  - Bottom row (space-between, align end): name Ginto **Bold 20/25** theme mid + role Ginto Regular **20/26** theme mid (n≈8–16 / 15–40, 1–2 lines, width 306) | customer logo TintedMark ≤126×30 right-aligned. 1280/1000: name 16/25, role 18/23.4 (1280) / 16/20.8 (1000).
- Image `customer-image` **608×643**, radius **6**, `object-fit: cover` (content photo → placeholder; sources ~1:1 or 2:3 portrait, cover-cropped to ≈0.95 aspect).
- 1000: card 920×554; text col 386×522; image 494×522.

### StoryCard – Wide (`Wide-Card-Image-Right/left`)
- 1120×**320**, row gap **16**, radius 16, no bg on the wrapper.
- Text panel 801×320, bg theme light, radius 16, padding 16 (+8 inner) – same content as Featured but title is **H4 Cirka 40/40 −1.6** (w753, 1–2 lines, n≈50–75); 1280: 36/36 −1.44; 1000: 34/34 −1.36 (panel 601 wide). Name/role row width 438, logo area up to 307 wide.
- Image panel **303×320**, radius **16**, cover (content photo → placeholder).
- Hover: shadow token on both panels + button invert.

### StoryCard – Quote (`Quote`)
- 1120×320, bg theme dark, padding **1** (=1px ring), radius 16 → inner white, radius 15, padding 16 (+8), column centred gap **24**.
- Quote H4 Cirka **40/40 −1.6** theme dark, centred, max-width **820**, 3–5 lines (n≈140–245, gist "customer testimonial" with typographic quotes). Name Ginto Bold 20/25 + role Ginto Regular 20/26 theme mid, centred. 1280: quote 36/36.
- Not a link: no hover.

### Phone (390)
- All non-quote cards collapse to `Featured - Mobile`: 358 wide, column, gap 8, padding `16px 16px 24px`, radius 16, theme bg. Image **first**: 326×345, radius 6, cover. Text block padding 8+8, column gap **32**: title H4 Cirka **30/28 −1.2** (3 lines, w294); PillLinkButton mobile (125×42); name Ginto **Bold 11/11** + role Ginto Regular **14/18.2** (w204) with logo 82×30 right. Card heights 629–646.
- `Quote-Mobile`: 358×243, 1px ring, inner padding **32**, gap 32; quote Cirka **24/24 −0.96** centred (5–8 lines); name Ginto Medium 11/14, role Ginto Regular 11/11, theme mid.

### Motion
- No load/scroll animations. Hover (1.3, 1.4). Chip select (above).

### Data shape
```ts
type StoryTheme = 'pink' | 'yellow' | 'red' | 'green';
interface StorySummary {
  slug: string; theme: StoryTheme; category: 'finance'|'health'|'energy'|'saas';
  layout: 'featured' | 'wide' | 'quote'; imageSide?: 'left' | 'right';
  cardTitle: string;            // 50–90 chars (featured/wide) 
  quote?: string;               // quote layout only, 140–245 chars
  person: { name: string; role: string };   // role 15–40 chars
  logo: string;                 // single-colour SVG (tinted via mask)
  cardImage?: string;           // featured 608x643 / wide 303x320 crops
}
```

---

## T2. StoryDetail – `/customer-stories/:slug`

Screenshots: `recon/pages/story-detail/{1440,390}-cs-summ.png` (quote hero), `{1440,390}-cs-magic.png` (split hero). Doc height @1440: 5295 (summ), 5097 (magic).
Note: Framer layer names inside this template are stale (e.g. "Arbor needed AI…", "Snowbound by Daniel Farò") – they are CMS slots, ignore the names.

### Section list & reuse
| section | class | notes |
|---|---|---|
| Nav | (a) `Nav` | – |
| Hero (quote or split) | (c) NEW `StoryHero` (2 variants) | – |
| Sticky side menu (facts + chapter scroll-spy) | (c) NEW `StorySideMenu` | desktop only (≥1200) |
| Body sections 1–5 | (c) NEW `StorySection` + media blocks | – |
| "Read other stories" | (c) NEW `RelatedStories` using a 4th StoryCard layout (`Story-Card-Desktop`) | – |
| Footer | (a) `Footer` | – |

### StoryHero – variant `quote` (`Hero-Quote-Desktop`)
- Full-bleed 1440×**776**, bg theme light, padding **160 80 80**, content column left-aligned (`Content` padding-right 16, gap **32**), content block vertically centred.
- Title = big pull-quote H3 Cirka **60/60 −2.4 #000, centred**, width 1264, **7 lines** for n≈348 (gist "agent connects customers"). 1280: 50/50 −2, 6 lines; 1000 (tablet `Hero-Quote-Tablet`, 689 tall, padding `96px 20px 80px`, content `max-width 73%` = 701): Cirka 40/40 −1.6 centred, 9 lines; 390 (`Hero-Quote-Mobile`, 495 tall, padding `96px 16px 24px`, gap 24): **Cirka 24/24 −0.96, left-aligned**, 10 lines.
- Attribution row `Rep. 1` (centred row, gap 6): name Ginto Medium **20/25 #000** + "," in Ginto Bold theme mid + role Ginto Regular **20/26 rgba(0,0,0,.75)** (n≈31). 1280: 18/25 + 18/23.4. 1000 & 390: stacked column (name Ginto Medium 16/16, role 18/23.4 / 16/20.8).
- Customer logo TintedMark, box 1264×**50** (left-aligned, height 50 → logo scales to 50 tall; mobile 31 tall).

### StoryHero – variant `split` (`Hero-Split-Desktop`)
- 1440×776 split 50/50: left `Hero Container` 720 wide, bg theme light, padding 160 80 80, `Content` max-width 640 (560 actual), gap **16**: Title H3 Cirka 60/60 −2.4 #000 **left**, w544, 8 lines (n≈168, quote); name Ginto Medium 20/25 #000 over role Ginto Regular 20/26 rgba(0,0,0,.75) (stacked); logo 544×50.
- Right `hero-Image` 720×780 (y −2), `object-fit: cover`, no radius (content photo → placeholder, source ≈1:1.04).
- Tablet (`Hero-Split-Tablet`, 1000): image **first**, 1000×1000; text panel below 441 tall, padding 80 40, content max-width 73%, title Cirka 40/40 4 lines.
- Phone (`Hero-Split-Mobile`): image 390×450 on top; text panel 268 tall, padding `24px 16px`, content max-width 85%, title Cirka 24/24 −0.96 left 5 lines, name Ginto Medium 16/16, role 16/20.8, logo 304×31.

### Body layout (`Storie-Section`)
- Row, gap **32**, padding **64 80**, max-width 1440, centred, bg #fff. Two columns: `Side-Menu-Section` 296 wide (x 135 @1440 – the pair is centred: 296 + 32 + 843 = 1171) and `Storie-Content` **max-width 843** column.
- 1280: menu x 80, content 792 wide. 1000/390: **side menu hidden**, content column centred (1000: 843 wide; 390: full width with section padding `24px 16px`). Section padding: 1000 `64px 20px`, 390 `32px 0`.

### StorySideMenu (`5 Sections Menu - Variant N`) – sticky
- Wrapper `position: sticky; top: 112px` (inside the 296-wide column which stretches to the section height, so it sticks until the body ends).
- Card 296×377: padding **32 24**, radius 16, bg `rgba(255,255,255,.6)`, `backdrop-filter: blur(6.15px)`, shadow **`0 4px 80.2px rgba(0,0,0,.1)`**. Content column gap **40**:
  - Facts block (gap 22): three label/value pairs – label Ginto Regular **14/18 #666666** (Company / Industry / Company size), value Ginto Medium **14/14 #000** (gap 8; Industry value gap 12). 
  - "In this article" label (same as fact label), gap 16, then `Chapter-Container` row gap 8:
    - **Progress rail**: 2px wide, 61 tall (padding 5 top/bottom inside a 71 column), radius 47, bg `linear-gradient(180deg, #FF29E5 0%, #FACB12 51.92%, #4348DC 100%)`; covered by a `#F2F2F2` 4×65 overlay whose `translateY` grows with scroll (reveals the gradient top→bottom). Measured: translateY 0 at scrollY≈389, +22.24px per 400px scroll (0.0556 px/px), clamps at 113px (≥65 = fully revealed at scrollY≈1560; clamp at ≈2422) @1440 on a 2160-tall body. Rebuild: `useScroll({ target: bodyRef, offset: ['start 0.43', 'end 0.57'] })` → `translateY: [0, 113]` (or simply scaleY of the gradient 0→1 over the first ~57% of that progress).
    - Chapter links (column gap 4): rows 199×21, label Ginto Medium **14/18**; active `#1A1A1A`, inactive `#808080`; `cursor:pointer`; click scrolls to the section anchor.
  - **Scroll-spy**: active chapter switches when the next `Content-Section` top passes ≈110–200px from the viewport top (Framer variants `Variant 1/3/4`; measured active=1 at scrollY 1000, =2 at 1600, =3 at 2700). Colour swap is instant (no measured tween).
- Sections are anchored by invisible `Link-anchor-0N` layers (100px tall, absolutely placed at the bottom of the preceding section).

### StorySection (`Content-Section-N`, N = 1..5)
- Column, gap **48**, padding `24px 0` (390: `24px 16px`), `overflow: hidden`.
- `Paragraph-0N`: column gap **24**, padding `0 110px` @1440 (→ text width **623**), `0 56px 0 46px`/`0 56px` @1280 (680–690), `0 56px` @1000 (731), none @390 (358, `max-width 460`).
  - Section heading (role: chapter title, n≈10–13, 1 line, gist "the challenge") Cirka **40/36 −1.6 #000** (1280/1000/390: **36/36 −1.44**). First one is an `h1`, the rest `h4` (semantic quirk – use h2 in rebuild).
  - Body: Ginto Regular **16/22.4 #000**, paragraphs separated by **20px** margin-top; 3–11 lines per paragraph @1440 (n≈200–880). 1000/390: **14/19.6**.
- **Media slot** (one optional block after the paragraph):
  1. `image-0N` – 843×**486** (aspect 1.734), radius **20**, overflow hidden, img cover (content screenshot/photo → placeholder). 1280: 792×457. 390: 358×206 radius **16**.
  2. `Illustration-container` – decorative integration diagram, 843×120 visible: two **75×75** white icon tiles (padding 14, radius 9.4, shadow `0 2.17px 8.68px rgba(0,0,0,.15), 0 0 2.17px rgba(0,0,0,.15)`, 47×47 logo) at x+92 and x+659, a 100×101 centre glow tile (brand mark glow, same recipe as homepage logo-icon glow at small scale), joined by two wide SVG connector curves (2083×498 / 1918×498 viewBoxes) that extend off-canvas, masked `linear-gradient(270deg, transparent 3%, #000 15%, #000 85.04%, transparent 98%)`. Third-party logos → placeholders. Reuse the homepage **Integrations** tile + line styling (variant (b) of `Integrations`).
  3. `FAQ-Card-Left-Desktop` (image + stat/quote card): row gap 24: `Image-Card` **409×409** theme-light bg radius 16 with a 294×340 UI screenshot (radius `16px 16px 0 0`, shadow `18px 18px 60px rgba(151,151,151,.2)`, anchored bottom, 48px top inset); right `Featured Card` max-width 410, padding 32, radius 16, transparent bg, text Cirka **40/36 −1.6** #000 (n≈46, 2 lines, gist "97% faster X"). 1280: image card 358. 390 (`FAQ-Card-Mobile`): column, theme bg, quote card first (padding `48px 32px 20px`, centred text) then image card 358×358.
  4. `Featured Card-01` (big quote): 843×290, padding 24, radius 16, `backdrop-filter: blur(39.6px)`, transparent; quote H4 Cirka **40/36 −1.6 #000 centred** (w795, 5 lines, n≈260), gap 30, attribution centred: name Ginto Medium 14/14 #000, role Ginto Regular 14/18 #000.
- Measured section heights @1440 (summ): 866 / 811 / 354; (magic) 886 / 410 / 175 / 338 / 24 (empty 5th slot renders as 24px padding – rebuild should skip empty sections).

### RelatedStories (`Read more`)
- Section 1440×626, padding **64 80**, column gap 32: H2 "read other stories" (n≈18) Cirka **75/72 −3** centred (1280 58/58; 1000 48/50; 390 Cirka 40/40) – same as homepage H2 token.
- `Random CMS - Desktop` row of **3** `Story-Card-Desktop` cards (random selection), each **413×394** (gap 14 → 413+14+413+13+413 within 1280… measured x 80/507/933), padding 24, radius 16, theme-light bg, `cursor:pointer`; column space-between: TintedMark logo 340×30 (left) → gap 32 → title H4 Cirka **40/40 −1.6** theme dark (w365, 3–5 lines) → PillLinkButton at bottom. 1280: title 36/36, cards 3 across. **1000: 2 cards** 358×358 (`Small-Desktop`, gap 40, title 34/34); **390: 1 card** 358×358 (title Cirka 30/28).
- Hover: same button invert + shadow as 1.3/1.4 (variant `Collection-Button Desktop - Hover`).

### Motion (T2)
- Sticky side menu, progress-rail reveal and scroll-spy as above. Hovers on related cards. No reveal animations.

### Data shape
```ts
interface StoryDetail extends StorySummary {
  hero: { variant: 'quote' | 'split'; quote: string /* 160–350 chars */; image?: string /* split only, ~1:1 */ };
  person: { name: string; role: string };
  facts: { company: string; industry: string; size: string };
  sections: Array<{            // 3–5
    id: string; navLabel: string;      // 10–13 chars, shown in side menu
    heading: string; body: string[];  // paragraphs, 200–880 chars each
    media?: { type: 'image'; src: string }               // 843x486
          | { type: 'illustration'; leftIcon: string; rightIcon: string }
          | { type: 'imageStat'; src: string; text: string /* ~46 chars */ }
          | { type: 'quote'; text: string; name: string; role: string };
  }>;
  related?: string[];   // 3 slugs (site picks randomly)
}
```

---

## T3. BlogIndex – `/blog`

Screenshots: `recon/pages/blog-index/{1440,390}-blog-index.png`. Doc height 15237 @1440 (grid of 85 cards, no pagination), 14347 @1280, 22703 @1000, ~33100 @390.

### Section list & reuse
| section | class |
|---|---|
| Page title block | (c) NEW `IndexTitle` (left-aligned H1 + lede) – reused by T5 with eyebrow |
| Featured + 3 latest (sticky featured) | (c) NEW `BlogFeatured` |
| Tinted horizontal rail ("Podcasts") with arrows | (c) NEW `CardRail` |
| "Browse all" + category tabs + 3-col grid | (c) NEW `FilterTabs` + `BlogCard` grid |
| Footer | (a) `Footer` |

### Shared atom: `BlogCard` (`Variant 1`) – also used by T4 related posts
- Column, gap **24**, `cursor:pointer`, whole card is a link.
- Image box: radius **8**, `overflow: clip`, aspect **≈1.905** (360×189, 416×219, 440×231, 588×309, 802×421); img `object-fit: cover`. Images are brand-styled cover art (gradient + title + logo) → **content → placeholder** (generate gradient cover placeholders at 2048×1075).
- Title H3 Ginto Regular **24/24 ls −0.96 #000**, 2–3 lines, n≈50–75. (Featured big card: H2 Ginto Regular **44/48 −1.76**, 2 lines, w802.)
- Meta row: padding-top **24**, row gap 8 (featured: 14): date Ginto Regular **16/16 ls −0.32 #000** (n≈6–12, "Month D") · 4×4 dot `#17171C` radius 9999 · reading time "N Mins" Ginto Regular 16/16 #000.
- A zero-height category `Link` row (126×0) precedes the title – unused, skip.
- **Hover**: image scales **1 → 1.07** (transform on the image layer inside the clipped box), ≈500ms ease-out (0.004 @60ms, 0.062 @290ms, 0.07 @620ms → `transition: transform .5s cubic-bezier(.22,1,.36,1)`). Nothing else changes.

### Layout @1440
- **IndexTitle** (`Container`): padding **160 64 36**, inner max-width 1440 (content 1312), column gap 24, left-aligned: H1 (gist "the perch", n≈9) Cirka **75/72 −3 #000** 1 line; lede (n≈66, 1 line) Ginto Regular **20/26 rgba(0,0,0,.75)**.
- **BlogFeatured** (`Main`, padding `0 64 40`): row gap **70**: left `Featured Post` 802 wide, **`position: sticky; top: 120px`** (stays while the right column scrolls past) – image 802×421 + gap 36 + title/meta; right column 440 wide, gap **48**, 3 BlogCards (image 440×231, card 343 tall). Section height 1165.
- **CardRail** (`Section`, bg **`rgba(66,71,219,.04)`** – faint indigo tint, full-bleed, padding **80 64**, column gap 24, `overflow:hidden`): header row space-between: H2 (gist "podcasts", n≈8) Cirka **40/36 −1.6 #000** + `Arrows` (gap 8): Prev/Next 40×40 radius 100, transparent bg with `::after` 1px ring `rgba(18,18,18,.18)`, 20×20 chevron icon #000. Prev is hidden at start (screenshot) – show only when scrolled. Track: cards 360 wide (image 360×189), gap **32**, overflowing past the right edge (5 cards; total 1928 > 1312). **Next** click scrolls the track by up to one viewport, clamped to the end (measured −616px = max offset) in ≈350ms ease-out (85% at 210ms). No hover on arrows.
- **Browse all** (`Section`, padding **80 64**, gap 24): H2 Cirka 40/36 (n≈10) → `FilterTabs` row (padding-top 16, gap 8): tab = 38 tall, padding `4px 12px`, bg **#FBFBFB**, radius 100, `::after` 1px ring **#DEDEDE** (active: **#000**), label Ginto Regular **18/30 ls −0.36 #000**. 6 tabs ("All" + 5 categories). Hover: bg #FBFBFB → **#CCCCCC** (≈200ms ease). Click: updates URL `?selected-category=<slug>` and filters the grid client-side (measured 86 → 15 cards; no transition).
- Grid: **3 columns × 416**, column gap **32**, row pitch **386** (cards 306/330/354 tall depending on title lines → use `gap: 56px 32px` with `align-items: start`, or `grid-auto-rows: 330px; row-gap: 56px`). **85 cards rendered at once, no pagination / load-more / search.**

### Responsive
| | 1280 | 1000 (tablet) | 390 |
|---|---|---|---|
| title block padding | 160 64 36 | **136 40 32** | **120 24 32** |
| H1 | Cirka 58/58 −2.32 | 48/50 −1.92 | 40/40 −1.6 |
| lede | 18/23.4 | 18/23.4 | 16/20.8, 2 lines |
| featured | 642 wide (sticky) + 440 column, gap 70; featured title Ginto **32/36 −1.28**; meta 14/14 −0.28 | stacked: featured 920 (not sticky in effect) then the 3 latest as **full-width cards** (image 880×462), gap 28; featured title 24/26 −0.96 | stacked 342 wide; featured title 24/26 2 lines; latest cards image 342×180, gap 24 |
| rail section | padding 80 64, H2 36/36 | padding **72 40**, gap 20 | padding **64 24**, gap 20 |
| tabs | label 18/23 | 18/23 | 18/23, row scrolls horizontally |
| grid | 3 × **363**, gap 32 | **2 × 454** | **1 × 358** |

### Data shape
```ts
interface BlogPostSummary {
  slug: string; title: string;            // 50–75 chars
  date: string; readingMinutes: number;   // "October 20", "4 Mins"
  category: 'podcast'|'cx'|'ai-learnings'|'product-updates'|'company-news';
  cover: string;                          // ~1.9:1 cover art
  featured?: boolean; rail?: 'podcasts';  // which slots it appears in
}
```

---

## T4. BlogPost – `/blog/:slug`

Screenshots: `recon/pages/blog-post/{1440,390}-blog-b2a.png`. Doc height 5342 @1440.

### Section list & reuse
| section | class |
|---|---|
| Back link + H1 + byline | (c) NEW `PostHeader` (centred) |
| Optional hero image | (c) part of `PostHeader` (slot exists, 900 wide, radius 8; empty on the sampled post → height 0) |
| Rich-text body (+ embedded video) | (c) NEW `Prose` variant **"blog"** (see §R) |
| Floating left TOC | (c) NEW `HoverTOC` (fixed, code component) |
| Floating right share rail | (c) NEW `ShareRail` (fixed) – also on T6 |
| Two CTA cards (trial + book-a-call form) | (c) NEW `PostCTAs` (uses (a) `Button` Outline-Medium) |
| Related posts (2) | (b) reuse T3 `BlogCard` (588 wide) under an H2 |
| Footer | (a) `Footer` |

### Layout @1440
- Wrapper `Header`: padding **160 24 0**, centred; `Post` max-width **1200**, column gap **30**, padding-bottom 50.
- **PostHeader** (`Header post`, max-width **900**, column gap 40; inner gap **28**):
  - Back link "← all posts" (n≈11) Ginto Regular **20/26 #000**, centred, no underline.
  - H1 (n≈48, 2 lines) Cirka **75/72 −3 #000 centred**, width 900. Gap 32 to byline.
  - Byline row (gap 10, centred): avatar 21×21 radius **4** (author photo → placeholder) + name Ginto Regular **14/18 #000** (gap 10) · "|" separator (Inter 15.75/18.9 #000 – renders as a thin bar) · `<time>` 14/18 · "|" · "N Mins" 14/14.
  - Hero image slot (900 × auto, radius 8) – empty here.
- **Body** column (`Content + Share`): content column max-width **900**, gap **32** between blocks: rich text → **video** 900×506 radius 8 (`<video>`, content → placeholder poster) → rich text → CTA grid.
- **PostCTAs**: grid `442px 442px`, gap 16. Both cards: padding **24 48 24 24**, radius **8**, column gap 20, `overflow: clip`.
  - Trial card: bg **#1A1A1A**; title Ginto Regular **24/24 −0.96 #FFF** (n≈32); body Ginto Regular **16/22.4 rgba(255,255,255,.8)** (n≈73, 2 lines, w370); then **(a) Button "Outline-Medium"** 124×34 (white, label #1A1A1A – same as homepage outline button at Medium size, padding 10 16).
  - Book-a-call card: bg **#F4F6F8**; title 24/24 #000 (n≈11); body 16/22.4 **#666666** (n≈31); inline form row (gap 8): input pill 261×40, bg `rgba(187,187,187,.15)`, radius 100, padding 12, `transition: background, box-shadow`; submit pill 101×40, bg **#333333**, radius 100, padding **14 24**, label Ginto Medium **16/18 #FBFBFB**.
  - 1000: cards stack (column gap 10), each 900 wide (156 tall), body 14/19.6. 390: stacked 342 wide, trial card padding **24 12**.
- **Related posts**: H2 (n≈13) Cirka **75/72 −3** left (gap 30 above list); list row gap **24**: 2 × BlogCard **588** wide (image 588×309). 1000: 2 × 464. 390: column, 342 wide, gap 24.

### HoverTOC (fixed left, desktop only)
- `nav` `position: fixed; left: 0; top: 50%; transform: translateY(-50%)`, padding-left 24, width 250, column gap **6** (one row per h2/h3 in the body).
- Collapsed: each row 226×8 with a **tick** `height 2px; radius 999` – width **12px** (inactive) / **20px** (active section). Colours: active = an accent (measured `#4B4BF7` when the first heading was active, `#EC4899` when the second was – treat as a per-item accent cycling through brand colours), past = **#A3A3A3**, upcoming = **#D4D4D4**. Labels hidden (`opacity 0; translateX(-8px); max-width 0`).
- Hover anywhere on the nav → **expanded**: gap 6 → **22**, width → 460, ticks fade to 0, labels fade in & slide to x 0 (h3 labels indented `padding-left 14px`), and a backdrop `linear-gradient(to right, rgba(255,255,255,.97) 0%, rgba(255,255,255,.95) 42%, rgba(255,255,255,0) 100%)` (460×100vh, fixed) fades in. All transitions **0.3s cubic-bezier(.65,0,.35,1)** (labels' colour .2s, tick opacity .22s).
- Label type: 12/16, weight 500, active label **#737373**, others **#A3A3A3**, `white-space: nowrap`. **Live-site bug**: the label font-family is `"ABC Ginto"` (not loaded) so it renders in Times – use the Ginto-Medium substitute in the rebuild.
- Click a row → smooth-scroll to that heading. Scroll-spy updates active tick.

### ShareRail (fixed right) – also T6
- `position: fixed; right: 24px; top: 50%; transform: translateY(-50%)`, 52×319, column gap **6**, padding **8**, radius **999**, bg **rgba(255,255,255,.9)**, `backdrop-filter: blur(12px)`, shadow **`0 0 0 1px rgba(0,0,0,.06), 0 8px 24px -8px rgba(0,0,0,.12)`**. Visible at all scroll positions (also over the hero).
- Items (36×36 round buttons, 18px icons, #1A1A1A/#000): copy-link (stroke icon), LinkedIn, X, **divider** 20×1 `#E5E5E5`, then 4 "summarize with <AI assistant>" links (third-party glyphs → generic placeholder icons).
- Hover: bg → **#F4F6F8** (+ transform; `transition: background-color .2s, transform .2s cubic-bezier(.65,0,.35,1)`); tooltip to the left (10px gap): bg **#1A1A1A**, radius 6, padding `6px 8px`, Ginto Regular **12/14 #FFF**, fades in `opacity .15s` and slides from translateX(4px) to 0.
- 1000/390: rail not present in the measured layout; a "Share" label (13/16 `rgba(255,255,255,.6)`) + copy-link chip appears inline instead (not fully measured – low priority).

### Responsive type (PostHeader / body)
| role | 1440 | 1280 | 1000 | 390 |
|---|---|---|---|---|
| back link | 20/26 | 18/23.4 | 18/23.4 (left-aligned) | 16/20.8 |
| H1 | Cirka 75/72 −3 centre | 58/58 −2.32 | 48/50 −1.92 (1 line) | **40/40 −1.6, left**, 3 lines |
| byline | 14/18 | 13/18 | 13/18 (left) | 13/14.3 |
| body p | 20/26 | 18/23.4 | 18/23.4 | 16/20.8 |
| h2 / h3 | 38/42 −1.52 / 32/32 −1.28 | same | same | same (h2 wraps 3 lines) |
| related H2 | 75/72 | 58/58 | 48/50 | 40/40 |
Container: `Post` 1200 max (1280 → 900 body at x190; 1000 → 952 wide with body 900; 390 → 342, `max-width 730`).

### Data shape
```ts
interface BlogPost extends BlogPostSummary {
  author: { name: string; avatar: string };
  heroImage?: string;                 // 900 wide, radius 8
  body: RichTextBlock[];              // see §R; headings feed HoverTOC
  related: string[];                  // 2 slugs
}
type RichTextBlock =
  | { type: 'p'; html: string } | { type: 'h2' | 'h3' | 'h4'; text: string; id: string }
  | { type: 'ul' | 'ol'; items: string[] } | { type: 'blockquote'; text: string; cite?: string }
  | { type: 'image'; src: string; alt: string; caption?: string } | { type: 'video'; src: string; poster: string }
  | { type: 'table'; head: string[]; rows: string[][] } | { type: 'code'; text: string };
```

---

## T5. ArticleIndex – `/articles` ("CX guides")

Screenshots: `recon/pages/article-index/{1440,390}-art-index.png`. Doc height 4384 @1440.

### Section list & reuse
| section | class |
|---|---|
| Intro row (eyebrow, H1, lede, search input) | (c) NEW – `IndexTitle` with eyebrow + `SearchInput` |
| Featured guide card | (c) NEW `GuideFeatured` |
| Sticky topic bar (chips with counts + sort select) | (c) NEW `TopicBar` |
| Guide grid + "Load more" | (c) NEW `GuideCard` grid + `LoadMoreButton` |
| Footer | (a) `Footer` |

### Layout @1440
- `section` padding **148 80 0**, inner column max-width **1280**, gap **56**.
- **Intro row** (row, space-between, align end): left `Intro` max-width 820, gap 18: eyebrow (n≈9, uppercase copy, gist "cx guides") Ginto Medium **14/14 #787878**; H1 (n≈48, 2 lines) Cirka **60/60 −2.4 #000**, left; lede (n≈107, 2 lines, max-width **580**) Ginto Regular **20/26 #666666**. Right: **SearchInput** 380×48, radius 999, 1px **#E8E8E8**, bg #FFF, padding `14px 14px 14px 36px`, 16×16 search icon at left 10px (vertically centred). Focus style not measured.
- **GuideFeatured** (`Featured card`): 1280×425, row gap **48**, padding **16**, bg **#F7F7F7**, radius **28**, align centre, `cursor:pointer`. Image 699×393 (≈16:9) radius **18** cover (content → placeholder). Body (padding `8px 24px 8px 0`, column gap 16):
  - Meta row gap 8: "latest guide" pill (white, radius 999, padding `5px 10px`, Ginto Medium 14/14 #000) · category Ginto Regular **14/18 #787878** · "·" · `<time>` 14/18 #787878.
  - Title H2 Cirka **40/36 −1.6 #000**, w477, 3 lines (n≈72).
  - Description Ginto Regular **16/22.4 #666666**, 3 lines (n≈157), clamped (`overflow: clip`, `display: flow-root`).
  - Foot (padding-top 12, space-between): author avatar 24×24 radius **7** (+ name, empty here) | dark pill "read the guide →" 149×38, bg **#1A1A1A**, radius 999, padding **12 18**, Ginto Medium 14/14 #FFF.
  - No hover change measured on the card or pill.
- **TopicBar**: **`position: sticky; top: 84px`** (sticks just below the nav), 1280×64, padding `14px 0`, bg **rgba(255,255,255,.94)**, row space-between:
  - Chips (gap 8): 36 tall, padding `0 14px`, radius 999, row gap 8, label Ginto Medium **14/14**, count `<small>` Ginto Regular **12/12 at opacity .5**. Active: bg **#1A1A1A**, text #FFF. Inactive: bg **#F4F4F4**, text **#3C3C3C**; hover bg → **#EAEAEA**; `transition: background-color .2s cubic-bezier(.65,0,.35,1), color .2s`. 5 chips ("All" + 4 topics). Click → `?topic=<Topic+Name>` and filters client-side.
  - Sort select 180×36, radius 8, 1px #E8E8E8, padding 10, label **Inter 14/14 w500 #595959** (n≈13, gist "most relevant"), 8×8 chevron.
- **Grid**: `display:grid; grid-template-columns: repeat(3, 406px); gap: 48px 28px` (grid has a 3px transparent border → cards at x+3). **9 cards visible**, then **LoadMoreButton** centred 48 below: 179×42, padding **12 20**, radius 999, 1px **#DCDCDC**, bg #FFF, label **Inter 16/16 w500 #1A1A1A** (n≈16, gist "load more guides"). All 488 cards are in the DOM; load-more reveals the next page client-side.
- **GuideCard**: column gap **14**, `cursor:pointer`: image 406×228 (≈16:9) radius **16** cover; meta (category · date, 14/18 #787878, gap 8); title H2 Cirka **30/30 −1.2 #000**, 2–3 lines (n≈60–80), clipped; description Ginto Regular **16/22.4 #6E6E6E**, 2 lines (n≈150), clipped; author row avatar 24×24 radius 7 + name Ginto Regular 14/18 #787878 (n≈17; empty on some cards). Card heights 431–461. **No hover change** (measured).
- Avatar placeholder on the live site is a generated striped SVG (decorative) when no author photo.

### Responsive
| | 1280 | 1000 | 390 |
|---|---|---|---|
| section padding | 148 32 0 (content 1216) | 148 32 0 (936) | **124 20 0** (350) |
| intro row | row; H1 50/50 −2 (2 lines), lede 18/23.4 | **column**, gap 28; H1 40/40 −1.6 (1 line) | column; H1 Cirka 40/36 3 lines; lede 16/20.8 |
| featured | row: image 663×373 + body 473; title 36/36 −1.44; meta 13/18 | **column**: image 904×508 then body (padding 8 8 12), title 36/36 2 lines, desc 14/19.6 | column: image 330×186, title 36/36 4 lines |
| grid | 3 × 385 | **2 × 451** | **1 × 344** |

### Data shape
```ts
interface GuideSummary {
  slug: string; title: string /* 60–80 */; description: string /* ~150 */;
  topic: string; date: string; author?: { name: string; avatar?: string };
  cover: string /* 16:9 */; featured?: boolean;
}
// index also needs topic counts: { topic: string; count: number }[]
```

---

## T6. ArticleDetail – `/articles/:slug`

Screenshots: `recon/pages/article-detail/{1440,390}-art-metrics.png`, `{1440,390}-art-nps.png`. Doc height 9287 / 9585 @1440. Both sampled articles share an identical layer tree – content-only differences (paragraph/list counts, presence of blockquote / ordered list).

### Section list & reuse
| section | class |
|---|---|
| Breadcrumb + topic chip + H1 + description + byline | (b) VARIANT of T4 `PostHeader` – **left-aligned**, 800 wide, adds breadcrumb, topic chip, description, "Updated <date>" |
| Mobile/tablet "In this guide" `<details>` | (c) NEW `InlineTOC` (<1200 only) |
| Rich-text body | (c) `Prose` variant **"article"** (§R) incl. Key-Takeaways box, blockquote, ul/ol |
| In-article FAQ accordion | (c) NEW `FaqAccordion` (shared with T8/T12 – see §R.6) |
| "Keep reading" 3 related cards | (c) NEW `RelatedGuideCard` |
| Fixed left "In this guide" tick rail with hover popover | (c) NEW `TickTOC` (desktop) – sibling of T4 HoverTOC |
| Fixed right share rail | (a) T4 `ShareRail` |
| Sticky bottom CTA chip `.lae-chip` | (c) NEW `ArticleCtaChip` (replaces homepage `VideoTeaser` on articles – `.lvc` absent here) |
| Footer | (a) `Footer` |

### Layout @1440
- `main` padding **160 64 0**, `overflow: clip`; `Post` column gap **52**, max-width 1440 (content 1312).
- **Header** (`Header post`, max-width **800**, centred column, items left-aligned; inner gap 24):
  - Breadcrumb row (gap 8): "articles" link Ginto Regular **14/18 #000** · "›" Inter 13/18.2 −0.1 **#9AA0A6** · **topic chip** (bg **#F4F4F4**, radius **8**, padding `6px 10px`, Ginto Medium 14/14 #000, n≈9).
  - `Header` (gap 28): H1 Cirka **75/72 −3 #000 left**, 2 lines (n≈53); description Ginto Regular **20/26 #666666**, 2 lines (n≈150); byline row (gap 12): avatar 21×21 radius 4 + name Ginto Regular 14/18 #000 · "·" (#9AA0A6) · "Updated" 14/18 #666 + `<time>` 14/18 #000.
- **Content column** 800 wide (x 320), gap **40**: `Article Extras` (0 tall on desktop) → Prose → FAQ.
- **Keep reading**: H2 Cirka 75/72 −3 left (n≈12) at x64 then a row of 3 `RelatedGuideCard` (424 wide, gap 20, full 1312 container): column gap 10, image 424×230 radius **4** with a white topic pill overlaid top-right (radius 177, padding `6px 12px`, **Inter Display 12/12 #666**), title Cirka **20/26 #000** (2 lines, n≈72) with a 16×16 striped avatar glyph at right.
- Spacing: header → content 52; FAQ → keep-reading ≈ 116.

### TickTOC (fixed left, ≥1200)
- `nav[aria-label="In this guide"]` `position: fixed; left: 28px; top: 50%; translateY(-50%)`, 56 wide; one 10px-tall button per h2 (incl. "Key takeaways" and "FAQ"); each holds a tick `height 2px; width 14px; radius 999`: active **#4B4BF7 @ .9 opacity**, others **#111 @ .22**. Nav `transition: opacity .3s cubic-bezier(.65,0,.35,1)`.
- Hover over the rail: ticks grow to section-proportional widths (≈35–56px) and opacity → ~.9–1 (spring-like ease-out, ~400ms: 60ms 26px, 150ms 42px, 300ms 48px, 600ms 50px), and a **popover card** for the hovered tick appears at left 76: white, radius **16**, padding `14px 16px`, width 272, shadow **`0 2px 6px -2px rgba(0,0,0,.08), 0 16px 36px -12px rgba(0,0,0,.22)`**; from `opacity 0, scale .97, translateX(-6px)` → `1, 1, 0` (≈350ms ease-out; 60ms .35, 150ms .73, 300ms .95). Content: "NN · N min in" Ginto Medium **12/16 #7D7D7D** (mb 4); heading Ginto Medium **14/19 −0.14 #000**; summary Ginto Regular **13/19 #6E6E6E** (mt 4, 3 lines).
- Click → scroll to that h2.

### InlineTOC (<1200)
- `<details>` 800 wide (390: 350), padding `0 18px`, radius 16, `box-shadow: inset 0 0 0 1px #E8E8E8`; `summary` 52 tall, Ginto Medium **15/15 #000** ("in this guide") with chevron at right; open list `ol` padding `0 0 16px 20px`, gap 10, items Ginto Regular **15/21 #5A5A5A** buttons. Collapsed by default.

### ArticleCtaChip (fixed bottom)
- `.lae-chip`: `position: fixed; bottom: 24px; left: 50%; translateX(-50%)`, 486×38, bg #FFF, radius 999, padding `0 14px 0 4px`, gap 10, shadow **`0 0 0 1px #E2E2E2, 0 10px 24px -12px rgba(0,0,0,.2)`**.
- Content: dark tag pill 57×30 (bg **#111**, radius 999, padding `0 12px`, Ginto Medium 12/12 #FFF, n≈4 "demo") + label Ginto Regular **14/14 #1E1E1E** (n≈42, gist "watch it resolve X") + 14px arrow; 1×18 separator **#E2E2E2**; trailing link Ginto 14/14 w500 **#111** (n≈16, "start free trial").
- Visibility: hidden (`opacity 0; translateY(14px); pointer-events none`) at scrollY <≈300 and again near the footer (≈7600 on a 9287 page); shown otherwise. `transition: opacity .4s, transform .4s cubic-bezier(.65,0,.35,1)`.

### Responsive
| role | 1440 | 1280 | 1000 | 390 |
|---|---|---|---|---|
| main padding | 160 64 0 | 160 32 0 | 160 32 0 | 160 20 0 |
| H1 | Cirka 75/72 −3 | 58/58 −2.32 | 48/50 −1.92 | 40/40 −1.6 (3 lines) |
| description | 20/26 #666 | 18/23.4 | 18/23.4 | 16/20.8 (4 lines) |
| breadcrumb / byline | 14/18 | 13/18 | 13/18 | 13/14.3; byline wraps to 2 rows |
| body / h2 / h3 | 20/26, 28/34, 22/28 | 18/23.4, 28/34, 22/28 | same as 1280 | **16/20.8, 24/30 −0.72, 20/26 −0.4** |
| FAQ H2 / question | 75/72 / 20/26 | 58/58 / 20/26 | 48/50 / 20/26 | 40/40 / **18/24 −0.18** |
| keep-reading | 3 × 424 | 3 × 392 | 2 cols (title Cirka 26/26 −1.04) | 1 × 350 |
| TickTOC / ShareRail | yes | yes | no → InlineTOC | no → InlineTOC |

### Data shape
```ts
interface Article {
  slug: string; topic: string; title: string /* ~50 */; description: string /* ~150 */;
  author: { name: string; avatar: string }; updated: string;
  body: RichTextBlock[];           // h2 sections feed TickTOC (+ per-section summary & minute offset for the popover)
  takeaways: string[];             // rendered as Key Takeaways box (§R.5)
  faq: { q: string; a: string }[]; // 7 items typical
  related: string[];               // 3 guide slugs
}
```

---

## §R. Rich-text (`Prose`) styles – shared by T2 (story body paragraphs), T4, T6, T11, T12

All prose is Framer `RichTextContainer` output; links are not underlined. **Two variants** differ only in width/heading scale:

| element | **blog** variant (T4, width 900) | **article** variant (T6, width 800) |
|---|---|---|
| p | Ginto Regular **20/26 `rgba(0,0,0,.75)`**, paragraphs `margin-top: 20px` (first 0) | same |
| first p (lede) | same style, often a single italic `em` line ("update:" / "last updated:") | same |
| h2 | Ginto Regular **38/42 ls −1.52 #000**, `margin-top: 40px`, mb 0 | Ginto Regular **28/34 ls −0.84 #000**, mt 40 |
| h3 | Ginto Regular **32/32 ls −1.28 #000**, mt 40 | Ginto Regular **22/28 ls −0.44 #000**, mt 40 |
| h4 | not present in samples – use 24/28 −0.48 (interpolated, unmeasured) | – |
| strong | weight **700** of the same family (live site synthesises bold from Ginto Regular) – use the Ginto-Bold substitute | same |
| em | italic of Ginto Regular (`ABC Ginto Regular Italic` family exists) | same |
| a | colour **#4348DC** (= brand indigo), no underline, inherits size; `strong a` = bold indigo CTA line | same |

Responsive (both variants): p **18/23.4** at 1000–1439, **16/20.8** <810; article h2 **24/30 −0.72**, h3 **20/26 −0.4** <810; blog headings keep 38/42 and 32/32 at all widths.

### R.1 Lists
- `ul`/`ol`: `margin-top: 38px` (when following a paragraph), `padding-left: 0`, `list-style: none`.
- `li`: `padding-left: 24.76px`, `position: relative`, same type as p (20/26 rgba(0,0,0,.75)); items have no extra gap (each li wraps a p).
- Marker: `li::before { content: "•"; position: absolute; left: 0; top: 0; width: 11.67px; color: rgba(0,0,0,.75) }` (same font). Ordered: `content: counter(list-item) "."` (width ≈16.8px).
### R.2 Blockquote
- `margin-top: 20px; padding-left: 21px; position: relative`; rule `::before` absolute left 0, **1px wide, full height, `#DDDDDD`, radius 1**.
- Quote paragraphs Ginto Regular **18/32.4 #666666**; attribution line ("- source") is a second p with mt 20, same style.
### R.3 Images / video / captions
- Inline media: full prose width, **radius 8**, `overflow: clip` (blog: `<video>` 900×506). Article/blog hero image slot: width = prose width, radius 8. No captions were present in any sampled page – if needed, use Ginto Regular 14/18 #666 mt 12 (unmeasured).
### R.4 Tables, code
- **Not present** on any sampled page (both articles, blog post, FAQ, glossary). Competitor comparison tables are layout components, not prose (see T8). If the data includes tables, style from T8's table tokens; code blocks unmeasured.
### R.5 Key Takeaways box (article)
- Heading `h2` styled as a box header: Ginto Medium **15/20 −0.15 #000**, `padding: 16px 24px`, border **1px #E4E4E4** (bottom **#EAEAEA**), `border-radius: 14px 14px 0 0`, mt 40.
- Following `ul`: flex column gap **10**, padding **14px 24px 20px**, borders 1px #E4E4E4 left/right/bottom, `border-radius: 0 0 14px 14px`; items Ginto Regular **16/25 rgba(0,0,0,.75)**, `padding-left: 18px`, marker `::before` **5×5 dot #A0A0A0 radius 9, top 10px, left 2px**.
### R.6 FaqAccordion (article FAQ; same pattern on T8 / T12 – see there for their own tokens)
- Section H2 (Cirka 75/72) + rich-text block: an h2 duplicate in prose style (38/42) then Q/A pairs.
- Question `h3`: Ginto Regular **20/26 −0.2 #000**, `padding: 20px 48px 20px 0`, **border-top 1px #E8E8E8**, `cursor:pointer`, `position: relative`; icon `::after` **28×28 circle #F4F4F4** at right (left 772 of 800, top 33 → vertically centred) with a 24-box plus glyph (`stroke #111`, width 1.8, round caps, path `M12 7v10M7 12h10`).
- Answer `p` Ginto Regular **17/26 rgba(0,0,0,.75)**, mt 20; collapsed = `display:none` (no height animation – instant). Open state rotates the plus **45°** (→ ×) over ≈300ms ease-in-out (50ms 0.5°, 150ms 22°, 300ms 44°). First item open by default; items toggle independently.

---

## T7. CompetitorIndex – `/competitors`

Screenshots: `recon/pages/competitor-index/{1440,390}-comp-index.png`. Doc height 10121 @1440. Rebuild compares **Kestrel vs generic categories** (e.g. "legacy helpdesk bots", "single-assistant AI", "build-it-yourself") – one table per category.

### Section list & reuse
| section | class | notes |
|---|---|---|
| Hero (H1 + sub on Unicorn stripes) + "proudly supporting" logo strip | (b) VARIANT of `Hero` headline block + (a) `Proof` logo marquee (`General` strip) | no pill/CTAs/photos; Unicorn bg identical to homepage (`Hero-Unicorn-Bg`, 2023×1299 at x −291, same 66→84% mask, **static position** – no scroll translate measured); marquee identical tokens (1280×132, radius 16, bg rgba(255,255,255,.4), 17/83% edge mask, gap 96, 3× Logo-Stack 4140) |
| "Difference" 3×2 feature cards | (c) NEW `FeatureCardGrid` |
| "Questions to ask" 10-item accordion | (c) NEW `QuestionAccordion` |
| 6 comparison tables with sticky headers | (c) NEW `ComparisonTable` (variant "grid") |
| Footer | (a) `Footer` |

### Layout @1440
- `Main` column gap **16**, `overflow: clip`.
- **Hero** (852 tall, padding `0 50 124 52`, gap 96): `Header` padding-top **186**, gap 36: H1 (n≈34, gist "why brands choose X", 2 lines) Cirka **96/96 −3.84 #000 centre** (1274 wide); sub (n≈146, 2 lines) Ginto Regular **24/30 −0.48 #000** centre. Then strip label (n≈18, "proudly supporting") Cirka **18/18 −0.72 #000** centre, gap 8, marquee 1280×132.
- **Section 2** (padding **102 32**, gap 80): header left-stacked full width (gap 16): H2 (n≈23) Cirka **60/60 −2.4 #000 centre**; sub (n≈162, 2 lines) Ginto Regular **20/26 rgba(0,0,0,.75)** centre. Grid 3 × **416** (gap 16 col / 16 row; 80/512/944), cards 216 tall: bg **#F7F7F7**, radius 16, padding `16px 24px 16px 16px`, column gap 16, rest shadow `0 3px 30px rgba(0,0,0,0)`: icon ~35×36 (black glyph SVG, decorative → own icons) → title H3 Cirka **26/26 −1.04 #000** (n≈23, 1 line) → info Ginto Regular **14/18 #000** (n≈160–220, 3–4 lines). No hover change measured.
- **Section 4** (padding 102 32, gap 64): H2 (n≈50, 2 lines) Cirka 60/60 centre, max-width **900**; `Questions` column max-width **900**, gap **32**:
  - Item (`Desktop - Closed`): 900×71, padding `20px 10px`, bg #FFF, radius 10, `cursor:pointer`; row space-between: question H3 Cirka **30/30 −1.2 #000** (n≈50–70, "N. can it …", max-width 80%) + 21×21 icon (Phosphor-style 256 viewBox glyph, fill **#252E3D**).
  - Open: `Answer` row grows 1 → content height (~67) with opacity 0→1: spring-like, 66ms h59/op.64, 204ms h66/op.94, settled ≈500ms → `transition: { type: 'spring', stiffness≈400, damping≈40 }` or `height .25s ease-out + opacity .3s`. Answer copy style not captured (rendered only when open; assume Ginto Regular 16/22.4 #666 – **unmeasured**).
- **Section 3** (padding 102 32, gap 80): header (H2 Cirka 60/60 + sub 20/26 centre) then **6 ComparisonTables** stacked (gap 80), each:
  - Wrapper max-width 1280, column gap 20.
  - **Sticky header row**: `position: sticky; top: 120px`, grid `420px 420px 420px` gap 10, padding `20px 0`, bg **rgba(255,255,255,.2)**, `backdrop-filter: blur(20px)`, radius 8; cells padding-left 12, label Cirka **30/30 −1.2 #000** ("category" | "<us>" | "<competitor>").
  - Rows (column gap 10): grid 3 × 420 gap 10; first cell bg **#F7F7F7**, radius 4, padding 20, Ginto Regular **16/22.4 #000** (row label, n≈10–35), vertically centred; value cells bg **#FBFBFB**, radius 4, padding `20px 10px`, Ginto Regular **16/22.4 #666666** left (n≈50–125, 1–3 lines). Row heights 62/85/107 (driven by text). 5–9 rows per table.

### Responsive
| | 1280 | 1000 | 390 |
|---|---|---|---|
| H1 / sub | 77/77 −3.08 / 19/23 −0.38 | 58/58 −2.32 / 15/18 −0.3 | 40/40 −1.6 / 14/17 −0.28 (hero padding `0 10 125`, header pt 160) |
| section H2 | 50/50 −2 | 40/40 −1.6 | Cirka 40/36 −1.6 (2–3 lines) |
| feature grid | 3 × 395 | **2 × 460**, cards 198 | **1 × 370**, info 13/14.3 |
| question | Cirka 28/28 | 26/26 | 24/24 (3 lines, list gap 24) |
| tables | 3 × 399, header 28/28 | 3 × 305, cell text **14/19.6**, header 26/26 | stacked: per-row label (370 wide) then two 180-wide value cells; headers Cirka 24/24 |
| section padding | 102 32 | 102 32 | `0 10px`, `Main` gap **120** |

### Data shape
```ts
interface CompetitorIndex {
  hero: { title: string; sub: string };
  differences: { icon: string; title: string; body: string }[];        // 6
  questions: { q: string; a: string }[];                                // 10
  tables: { against: string /* category label */; rows: { label: string; us: string; them: string }[] }[]; // 6
}
```

---

## T8. CompetitorDetail – `/competitors/:slug` (Kestrel vs <category>)

Screenshots: `recon/pages/competitor-detail/{1440,390}-comp-{zendesk,sierra}.png`. Doc height 6514 / 6365 @1440 – identical trees, content-only differences (row counts, card text heights).

### Section list & reuse
| section | class | notes |
|---|---|---|
| Pink split hero: "Us vs Them" title + intro copy/bullets (left) + demo request form (right) | (c) NEW `VsHero` + `DemoForm` | – |
| "Trusted by" label + logo strip | (a) `Proof` marquee strip (`General`) | label Cirka 18/18 −0.72 centre (n≈68, 1 line) |
| Two "What is X?" intro cards | (c) NEW `VsIntroCards` | – |
| Comparison table (check / minus / text) + 3 feature cards | (c) NEW `ComparisonTable` variant **"matrix"** + `FeatureCard` (icon tile variant) | – |
| "Customers love us" testimonial slideshow | (b) VARIANT of homepage `Stories` carousel | same Framer Slideshow, autoplay ≈5s, same pink dot pager; different card (image-left + tinted quote panel) |
| FAQ (bordered cards) | (c) NEW `FaqCards` | – |
| Footer | (a) `Footer` |

### VsHero @1440
- Full-bleed section 1440×868, bg **#FEEAFC** (theme pink light), padding **120 64 20**; inner row max-width 1440 (1312): left column 777 wide (padding `40px 20px`, gap **42**), right column 525 (padding `40px 20px`).
- Title row (gap 14, wraps): [logo tile + "Us"] "vs" [logo tile + "Them"] – each word Cirka **60/60 −2.4 #000**; logo tile **52×52**, white, radius **12**, padding `12.05px 15.07px` (holds our 21×28 mark / competitor 40×40 logo – in rebuild use a generic category icon). Gap tile→word 10.
- Subtitle (n≈51, 2 lines) Cirka **40/36 −1.6 #000**, gap 12 under title.
- Copy block (gap 24): intro paragraph Ginto Regular **16/22.4 #000** (n≈450, 5 lines, w737); bold lead-in "the difference:" (`strong`, 700) then `ul` of 4 items (li `padding-left: 19.8px`, default disc bullets, text 16/22.4, 1–2 lines, n≈90–140); closing line with bold "trusted by" + names.
- **DemoForm** card: 485×648, bg **rgba(255,255,255,.84)**, radius **16**, padding 22 → inner padding 20, column gap 20: heading `strong` Cirka **24/23 ls −0.48 w700 #0D0D0D** (n≈17, "see it in action"); fields (gap 20), each label `strong` Cirka **16/19.2 w700 #0D0D0D** + control: email input 401×44, bg **#FAFAFA**, radius **10**, 1px **rgba(136,136,136,.6)**, padding 12, `transition: .2s ease-in-out`; selects 401×40 bg #FAFAFA radius 8 (options Ginto Regular 14/16.8; placeholder rgba(0,0,0,.4)); textarea-ish 401×74; text input 401×40. Submit pill 109×34, bg **#0D0D0D**, radius 450, padding **8 24**, label Ginto Medium **14/18 #FBFBFB** ("submit →"). (Form posts to a third-party; rebuild as a static, non-submitting form.)
- 1280: hero 887 tall, padding 120 32 20, columns 720 / 486, title words Cirka 50/50 −2. 1000 & 390: **column** – copy first then form (form 720 tall); title words Cirka 36/36 −1.44; body 14/19.6; 390 padding `120 20 20`, columns 350 wide.

### VsIntroCards (`Proof-Section`, padding 80, max-width 1200)
- Row gap **18**: two cards 591 wide, bg **#F8F8F8**, radius 16, padding **19**, column gap 16: header row (gap 10) = 52×52 logo tile (as above) + question "what is <X>?" Ginto Regular **20/26 rgba(0,0,0,.75)**; body Ginto Regular **16/22.4 #000** (n≈390–460, 6–7 lines). Competitor card first, ours second. 390: stacked (padding `56px 16px`).

### ComparisonTable – "matrix" variant (`Table` section, padding **80 32**, gap 80)
- Header: Us-vs-Them title row (same as hero, centred, Cirka 60/60) + sub Ginto Regular 20/26 rgba(0,0,0,.75) centre (n≈26).
- Table (code component, max-width **1200**): bg #FFF, radius **16**, 1px **#E5E7EB**, shadow **`0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.04)`**, `overflow: hidden`.
  - Head row 62 tall, bg **#FAFAFB**, bottom border 1px #E5E7EB: label column 479 wide (padding `20px 16px 20px 24px`, empty), "us" column 359 (bg **rgba(79,70,229,.04)** tint), "them" column 359; column titles weight 500 **16/20.8 ls −0.16 #111827**, centred.
  - Body rows: min 57–61 tall, bottom border 1px **#F3F4F6**, `transition: background-color .16s` (hover tint – value not captured). Label cell padding `18px 16px 18px 24px`, weight 500 **15/21 #111827**; value cells centred, padding `18px 0` (us, tinted) / `18px 24px 18px 0` (them): either a **24×24 status icon** – yes = circle **#34D399** with white check (`M7 12.5L10.5 16L17 9`, stroke 2.5, round), no/partial = circle **#FB7185** with white 10×2.5 bar (rx 1.25) – or text 400 **14/19.6 #374151** centred (n≈20–50). ~13 rows.
  - Font note: the component declares family `"ABC Ginto"` with weights 400/500 (falls back on the live site) – use the Ginto Regular/Medium substitutes.
  - Phone (390): each row becomes a card (370 wide, radius ~12, 1px #E5E7EB): label (weight 500, 15–16px #111827) then two sub-rows "us" / "them" (label 14px **#6B7280** left, icon or text right), separated by 1px #F3F4F6 – see `recon/pages/competitor-detail/390-comp-zendesk.png`.
- **FeatureCard** row (under the table, 3 × **393**, gap 10, y-aligned top): bg **#FAFAFA**, radius 16, padding 24, gap 24; icon tile **48×48 bg #4348DC radius 12 padding 8** with a 32px white glyph; title Ginto Regular **20/26 rgba(0,0,0,.75)** (n≈30); body Ginto Regular **16/22.4 #666666** (n≈300, 7 lines), gap 4.

### Testimonial slideshow (`Desktop` section, padding **102 32**, gap 80) – (b) variant of homepage Stories
- Header: H2 (n≈17, "customers love us") Cirka **60/60 −2.4** centre + sub 20/26 rgba(0,0,0,.75) centre.
- Slideshow max-width 1200, visible slot **956×393** centred; slides 3 (t1–t3) × clones; inactive slides **scale .9** (860×354), gap 32 (pitch 988). Autoplay: next slide every **≈5.0s** (measured t1→t2 at 4.6s, settle 5.1s; t2→t3 at 9.7s), transition ≈500ms, same easing as homepage Stories (expo-out). `cursor: grab` (draggable).
- Card: row – `Image-Card` 456×394 (radius `16 0 0 16`, photo cover, content → placeholder) + `Featured Card` 500×394 (radius `0 16 16 0`, padding 21.6, column space-between, bg per card: **#FDECE8** / **#FFEBFD** / **#E7F4E8**): quote Cirka **40/36 −1.6 #000** (n≈80–215, 3–7 lines) and attribution name Ginto Medium **20/25 #000** + role Ginto Regular **20/26 rgba(0,0,0,.75)**.
- Pager: 3 dots exactly as homepage Stories (12px, **#FF29E5**, inactive opacity .2, button paddings `12px 6px` with 12px outer ends), centred 70px below.
- 1000/390 (`Mobile-Slideshow`): card becomes a **315×603 column** (image top 315×~315, quote panel below), neighbours peek; pager in a light pill (#F4F4F4-ish background) – see 390 screenshot.

### FaqCards (`Faq` section, padding **102 32**, gap 64; 390: padding `0 20px`)
- H2 (n≈54, 2 lines) Cirka 60/60 centre, max-width 900.
- List max-width **900**, gap **18**; item `<section>`: padding **18**, bg #FFF, radius **16**, 1px **#EBECED**, shadow **`0 .6px .6px -1.25px rgba(0,0,0,.18), 0 2.29px 2.29px -2.5px rgba(0,0,0,.16), 0 10px 10px -3.75px rgba(0,0,0,.06)`**; header row space-between, `cursor:pointer`: question Cirka **26/26 #0F0F10** (n≈30–55) + "+" glyph Cirka 28/28 **#5A616E** in a 28×28 box (open → "−").
- Answer: Ginto Regular **18/34.2 #595959**, margin-top 16, width 862; opens in ≈150ms (height + opacity .84→1; measured 66→258→287px by 150ms) → `height auto` spring/ease-out .2s.
- All closed by default; 6–10 items.

### Data shape
```ts
interface CompetitorDetail {
  slug: string; them: { name: string /* category label */; icon: string };
  hero: { subtitle: string; intro: string; bullets: string[]; trustedBy: string };
  intro: { them: string; us: string };                 // "what is X?" bodies
  matrix: { label: string; us: true | false | string; them: true | false | string }[];  // ~13 rows
  features: { icon: string; title: string; body: string }[];   // 3
  testimonials: { quote: string; name: string; role: string; image: string; tint: string }[]; // 3
  faq: { q: string; a: string }[];
}
```

---

## T9. ReportLanding – `/content/the-support-exception` (gated-report landing page)

Screenshots: `recon/pages/report-landing/{1440,390}-content-tse.png`. Doc height 5601 @1440. One-off page built from `R2 *` sections; reusable as a "research report" template.

### Section list & reuse
| section | class | notes |
|---|---|---|
| `R2 Hero` – gradient art panel with H1, lede, "read the report" card, "what you'll learn" grid | (c) NEW `ReportHero` | uses (a) `Button` Main "Full-Width" (dark, 324×42) |
| `R2 Trust` – label + logo strip | (a) `Proof` marquee strip (1392 wide here, padding `56px 24px 8px`, gap 26) | label Ginto Regular **14/18 #9A9AA2** centre (n≈68) |
| `R2 Findings` – H2 + 3 stat cards with mini charts | (c) NEW `FindingCards` |
| `R2 Pull Quote` – full-bleed gradient panel with big quote | (c) NEW `QuotePanel` (shares art + radius with ReportHero) |
| `R2 Whats Inside` – H2/lede/CTA + numbered list | (c) NEW `NumberedContents` | CTA = (a) `Button` Main-Medium (135×34) |
| `R2 Customers` – H2 + right-aligned sub + horizontal story rail | (c) NEW `StoryRail` card (themed like §1.1) |
| Footer | (a) `Footer` |

### ReportHero @1440
- Section padding **12** → `Hero Art` 1416×773, radius **24**, `overflow: clip`, padding **136 40 0**; background = full-bleed **decorative gradient image** (orange→pink→violet blurred mesh; 1416×434 source, `object-fit: cover`) – recreate with a CSS mesh: `radial-gradient` blobs of `#E8A33D`, `#E04BD6`, `#6F6FE6` on `#F07A3C`, or a placeholder image. The nav pill floats over it.
- `Hero Inner` column gap **56**: `Hero Top` row gap **48**:
  - `Hero Copy` (908 wide, padding-top 6, gap 24): H1 (n≈58, 2 lines) Cirka **75/72 −3 #FFFFFF** left; lede (n≈252, 3 lines) Ginto Regular **20/26 rgba(255,255,255,.94)**.
  - `Read Card` 380×416: bg #FFF, radius **20**, padding **28**, shadow **`0 30px 60px -30px rgba(20,14,50,.45)`**: H2 (n≈16) Cirka **40/36 −1.6 #141414**; `Facts` grid `154px 154px`, gap 16, padding `22px 0 20px`: value Cirka **30/30 −1.2 #141414** + label Ginto Regular **14/18 #5F5F66** (gap 8; 3 facts); `Method` (padding-top 18): Ginto Regular 14/18 #5F5F66 (n≈170, 4 lines); `CTA` (padding-top 22): full-width dark pill 324×42 (bg **#141414**, label Ginto Medium 14/14 #FFF) – homepage Button "Main" stretched.
  - `What you will learn` (padding `28px 0 40px`, gap 16): label Ginto Medium **14/14 rgba(255,255,255,.78)**; grid **4 × 313**, gap 28: each item row gap 10 = "→" Ginto Regular 16/22.4 #FFF + text Ginto Regular **16/22.4 rgba(255,255,255,.95)** (n≈80–90, 2–3 lines).
- 1280: art 1256×750, padding 120 40 0, H1 58/58 −2.32, lede 18/23.4, read card 360 wide, fact values 28/28. 1000: **column** (art 976×901, padding `112 32 0`): copy → read card full width (912, 304 tall) → learn grid 2 cols (gap `20px 28px`); H1 48/50. 390: section padding 8, art radius **20**, padding `100 20 0`; H1 Cirka 40/40 (3 lines); lede 16/20.8; read card padding 22; learn grid 1 col (gap 16); fact values 24/24.

### FindingCards (`R2 Findings`, padding **136 40 0**, inner max-width **1120**, gap 48)
- H2 (n≈39, 1 line) Cirka **75/72 −3 #141414** left.
- Grid `repeat(3, 365px)`, gap **12**; card bg **#F5F5F7**, radius **24**, padding **30 30 28**, column: glyph (top) → body (padding-top 40, gap 16): stat Cirka **60/60 −2.4 #141414** (n≈3) + caption Ginto Regular **16/22.4 #4E4E55** (n≈135–165, 4 lines).
- Glyphs (pure CSS, decorative-data): **bars** – two 12px-wide bars radius 2, heights 26 and 13 (≈ values 38.2% / 19.3%), colours **#E04BD6** and **#CDCEF3**, gap 6, bottom-aligned; **donut** – 44×44 circle `conic-gradient(#E04BD6 0 Ndeg, #CDCEF3 Ndeg 100deg)` (N = the percentage as degrees of a 100° sweep – as measured: 71deg / 69deg), padding 7, hole 30×30 `#F5F5F7` radius 50%.
- 1280: stat 50/50; 1000/390: cards stacked full width (gap 12), stat 40/40 (390: 40/36).

### QuotePanel (`R2 Pull Quote`, padding **128 12 0**)
- Panel 1416×446, radius 24, same gradient art as hero, padding **140 40**, column gap 28, centred: quote (n≈78, 2 lines) Cirka **60/60 −2.4 #FFF** centre; attribution Ginto Medium **16/18 rgba(255,255,255,.92)** (n≈54).
- 1280: 50/50; 1000: padding 88 32, 40/40, attribution 13/13; 390: radius 20, padding 64 20, Cirka 40/36 (4 lines), attribution 14/18.

### NumberedContents (`R2 Whats Inside`, padding **136 40 0**, max-width 1120, row gap **72**)
- Left (524, gap 18): H2 (n≈14) Cirka 75/72 −3 #141414; lede Ginto Regular **20/26 #5F5F66** (n≈110, 2 lines); CTA (padding-top 10) Main-Medium dark button 135×34 (bg **#141414**).
- Right list (524): rows `padding: 20px 0`, gap 12, divider `::after` **1px #ECECEF** bottom; number "01"… in Cirka **18/23.4** with **gradient text** `linear-gradient(90deg, #E8A33D 0%, #E04BD6 55%, #6F6FE6 100%)` (`background-clip: text; color: transparent`), width 52; item text Ginto Regular **20/26 #141414** (n≈50–80, 1–2 lines). 9 rows.
- 1280: gap 48, columns 536; 1000/390: stacked (gap 32), list full width.

### StoryRail (`R2 Customers`, padding **136 0 120**, gap 44)
- Head (max-width 1200, padding `0 40px`, row space-between): H2 Cirka 75/72 −3 #141414 (n≈17) | sub Ginto Regular **20/26 #5F5F66 right-aligned** (n≈69, 2 lines, w458). 1000/390: stacked, gap 14.
- Rail: row gap **20**, padding `0 160px 4px` (1280: `0 40px`; 1000: `0 32px`; 390: `0 20px`, gap 12), `overflow-x: auto` (horizontal scroll, no arrows).
- Card 600×379: theme light bg (pink `#FEEAFC` / red `#FDECE9`), radius **24**, padding **24 24 24 32**, row gap 32, `cursor:pointer`, **no hover change**: body 264 wide (column space-between, padding `10px 0 6px`): logo (≈30 tall, content → placeholder TintedMark) → gap 34 → title H5 Cirka **30/30 −1.2 #141414** (n≈50–60, 3 lines) … foot (gap 22): company Ginto Medium **16/18** theme mid (`#801470` / `#752512`) + "customer story" Ginto Regular 14/18 theme mid; outline pill "view case study ›" 150×40, padding `0 16px`, radius 999, `::after` 1px **#141414** ring, Ginto Medium 14/14 #141414. Photo 248×331 radius **16** cover (content → placeholder).
- 390: cards stack inside the rail as taller column cards (rail 544 tall).

### Data shape
```ts
interface ReportPage {
  hero: { title: string; lede: string; facts: { value: string; label: string }[]; method: string; cta: string; learn: string[] /* 4 */ };
  trustLabel: string;
  findings: { title: string; items: { stat: string; caption: string; chart: { type: 'bars'; values: [number, number] } | { type: 'donut'; value: number } }[] };
  quote: { text: string; attribution: string };
  contents: { title: string; lede: string; items: string[] /* 9 */ };
  stories: { title: string; sub: string; items: { slug: string; theme: StoryTheme; logo: string; title: string; company: string; photo: string }[] };
}
```

---

## T10. ThoughtsIndex – `/thoughts-on-cx` (social-post wall)

Screenshots: `recon/pages/thoughts-index/{1440,390}-thoughts.png`. Doc height 5571 @1440.

### Section list & reuse
| section | class |
|---|---|
| Hero (H1 + long grey intro, centred) | (b) VARIANT of `Hero` headline block (no pill/CTA/photos; intro is grey) |
| 3-column masonry of LinkedIn-style post cards | (c) NEW `PostWall` + `SocialPostCard` |
| Footer | (a) `Footer` |

### Layout @1440
- Hero: padding **160 32 0**, `Wrapper` max-width **1024**, gap **37**: H1 (n≈14) Cirka **96/96 −3.84 #000** centre; intro (n≈380, 5 lines) Ginto Regular **20/26 #808080** centre, max-width **760**.
- `Posts`: row gap **20**, padding **64 32 32**, max-width 1440 → **3 independent columns** `List 1..3` (445 wide each, column gap 20 between cards) – a masonry made of 3 flex columns; posts are pre-assigned to columns (4 per column, 12 posts total), not CSS columns.
- **SocialPostCard** (embedded-post look, uses the **system font stack** `-apple-system, …` – intentionally not the brand fonts): max-width 500, padding **24**, bg **#F3F4F9**, radius **8**, 1px border **#808080** (as computed), shadow **`0 2px 12px rgba(0,0,0,.08)`**:
  - Header row (space-between, mb 16): avatar 38×38 round (photo → placeholder) + name system **18px w600 #000** + headline system **14/19.6 #000** (mb 4) | 24×24 network glyph (brand blue **#0077B5** – use a neutral "external link"/generic social icon in the rebuild).
  - Body (mb 16): system **14/21 #000**, clamped to ~9 lines (189px) with a "show more" text button (system **16px w600 #0077B5**, margin 8px 0) that toggles to "show less" and expands the text (instant).
  - Optional media: image 395×auto (e.g. 395×136), radius **8**, cover (content → placeholder).
  - Footer: relative time ("1mo") system 14px **rgba(0,0,0,.6)**.
  - No hover state.
- Responsive: 1280 – H1 77/77, intro 18/23.4 (4 lines), 3 columns × 392; 1000 – H1 58/58, **2 columns × 458** (the third list is not rendered); 390 – H1 Cirka 40/40, intro 16/20.8 (9 lines), single column 342 wide (lists stacked), posts padding `64 24 32`.

### Data shape
```ts
interface SocialPost { author: { name: string; headline: string; avatar: string }; body: string; image?: string; age: string; url: string; column: 1 | 2 | 3 }
```

---

## T11. Glossary – `/glossary` (A–Z term index)

Screenshots: `recon/pages/glossary/{1440,390}-glossary.png`. Doc height 7355 @1440. Detail pages (`/glossary/<term>`) are outside this brief and were not sampled.

### Section list & reuse
| section | class |
|---|---|
| Split hero on warm off-white | (c) NEW `GlossaryHero` |
| Letter sections (heading + hairline + 3-col term links) | (c) NEW `TermIndex` |
| Footer | (a) `Footer` |

- **No A–Z jump bar, no search, no accordion** on the live page – just 22 letter groups (142 terms) in one long list.

### Layout @1440
- `Hero Section`: bg **#FBFAF9**, padding **140 60 80**, inner row max-width **1200**, gap **60**, align centre: left (570, gap 24): eyebrow Ginto Regular **14/18 #000** (n≈8, "glossary"); H1 (n≈29, 2 lines) Cirka **60/60 −2.4 #000**; right (570): intro Ginto Regular **20/26 rgba(0,0,0,.75)** (n≈214, 4 lines).
- `Content Section` padding-top 60 (bottom 80 = section gap), `Terms List` column gap **100**, each letter group max-width **1200**, gap **20**: letter H2 Cirka **40/36 −1.6 #000** → `Divider` 1px **rgba(24,24,24,.07)** full width → grid `repeat(3, 384px)`, gap **12px 24px**: term links Ginto Regular **14/18 #000**, no underline at rest, **hover → underline** (instant). 1–4 rows per letter (3–14 terms).
- Responsive: 1280 – hero padding 120 40 60 (gap 40, columns 520), eyebrow 13/18, H1 Cirka 50/50 −2, intro 18/23.4, letters Cirka 36/36 −1.44, links 13px; 1000 – hero **stacked** (gap 24), padding 120 32 48, grid 3 × ~296; 390 – hero padding 120 20 40, eyebrow 13/14.3, H1 Cirka 40/36, intro 16/20.8, letters Cirka 36/36, **grid 2 columns**, group gap **32**, links 13px.

### Data shape
```ts
interface GlossaryIndex { intro: string; groups: { letter: string; terms: { label: string; slug: string }[] }[] }
```

---

## T12. FAQ – `/faq` (static Q&A document)

Screenshots: `recon/pages/faq/{1440,390}-faq.png`. Doc height 11364 @1440 (very long; all answers always visible).

### Section list & reuse
| section | class |
|---|---|
| Header (H1, lede, "last updated") | (c) NEW – small left-aligned `DocHeader` |
| 8 topic sections × 42 Q&As (not collapsible) | (c) NEW `FaqDocument` (prose-like, see §R for list/link rules) |
| Sticky right "Index" column | present in layout (`position: sticky; top: 140px`, 220 wide) but **renders empty (0 px tall) on the live site** – rebuild may add a section index or leave empty; not measurable |
| Footer | (a) `Footer` |

### Layout @1440
- `Main` padding **140 64 0**; `Post` max-width **1000** (x 220), padding-bottom 120, row space-between: `Left column` max-width **600**, gap **48** | `Index` 220.
- Header (gap 24): H1 (n≈12) Cirka **40/36 −1.6 #000**; lede (n≈62) Ginto Regular **16/22.4 #737373**; "last updated …" Ginto Regular **11/11 −0.22 #666666**.
- Topic section (gap 10, padding-bottom 32): H2 Cirka **30/30 −1.2 #000** (n≈15); then Q/A flow: question H3 Cirka **18/23.4 #000** (mt 8 except first), answer p Ginto Regular **14/22.4 #737373** (mt **12**, 4–8 lines, n≈400–720). Lists inside answers: li `padding-left: 17.3px`, same 14/22.4 #737373, bullet `::before` as §R.1. `strong` uses **Ginto Bold** 14/22.4 #737373. Inline links are **#737373 with no underline** (indistinguishable – consider underlining in rebuild).
- Responsive: 1280/1000 – H1 36/36 −1.44, H2 28/28 (1000: 26/26), lede 1000 14/19.6; 390 – padding 140 20 0, single 350 column (index hidden), H2 24/24, questions wrap to 2 lines.

### Data shape
```ts
interface FaqDoc { title: string; lede: string; updated: string; sections: { title: string; items: { q: string; a: RichTextBlock[] }[] }[] }  // 8 sections, 42 items
```

---

## Z1. Reuse table (all templates)

| Section | T# | Class | Existing component / notes |
|---|---|---|---|
| Nav | all | (a) | `Nav` – identical |
| Footer (CTA glass + link card + wordmark, Unicorn stripes) | all | (a) | `Footer` – identical; only CTA heading copy changes |
| Floating video teaser `.lvc` | most | (a) | `VideoTeaser` – **absent on T6** (replaced by `ArticleCtaChip`) |
| Index hero headline (H1 96 + sub 24) | T1, T7, T10 | (b) | `Hero` headline block without pill / CTAs / photo stage (T7 keeps the Unicorn bg; T10 grey intro) |
| Logo marquee strip (`General`) | T7, T8, T9 | (a) | `Proof` logo strip (single ticker) – label differs |
| H2 75/72 section heading | T2, T4, T6, T9 | (a) | homepage H2 token |
| Stories slideshow + pink dot pager | T8 | (b) | `Stories` – different card (image-left + tinted quote), 956×393 active, autoplay 5s |
| Buttons (Main/Outline, Medium/Large/Full-width) | T4, T9 | (a) | `Button` |
| Integration icon tiles + connector lines | T2 | (b) | `Integrations` tile styling at 75px with mask-faded SVG curves |
| Story cards (featured / wide / quote / related) | T1, T2 | (c) | NEW `StoryCard` + `PillLinkButton` + `TintedMark` |
| Filter chips (category, icon dot) | T1 | (c) | NEW `FilterChips` |
| Story hero (quote / split) | T2 | (c) | NEW `StoryHero` |
| Sticky facts + chapter scroll-spy menu | T2 | (c) | NEW `StorySideMenu` |
| Story sections + media blocks | T2 | (c) | NEW `StorySection` |
| Index title (H1 75 + lede) | T3, T5 | (c) | NEW `IndexTitle` |
| Sticky featured + latest list | T3 | (c) | NEW `BlogFeatured` |
| Tinted card rail with arrows | T3 | (c) | NEW `CardRail` |
| Underline-ring filter tabs | T3 | (c) | NEW `FilterTabs` |
| Blog card (1.9:1 image, hover zoom 1.07) | T3, T4 | (c) | NEW `BlogCard` |
| Post header (centred) / article header (left) | T4, T6 | (c) | NEW `PostHeader` (2 alignments) |
| Prose (blog / article variants) | T4, T6, T12 | (c) | NEW `Prose` (§R) |
| Hover TOC (left, labels on hover) | T4 | (c) | NEW `HoverTOC` |
| Tick TOC + popover | T6 | (c) | NEW `TickTOC` |
| Inline `<details>` TOC | T6 (<1200) | (c) | NEW `InlineTOC` |
| Share rail (fixed right) | T4, T6 | (c) | NEW `ShareRail` |
| Post CTA cards (trial + email form) | T4 | (c) | NEW `PostCTAs` |
| Article bottom CTA chip | T6 | (c) | NEW `ArticleCtaChip` |
| Guide featured card / guide card / topic bar / search / load-more | T5 | (c) | NEW `GuideFeatured`, `GuideCard`, `TopicBar`, `SearchInput`, `LoadMoreButton` |
| Related guide cards | T6 | (c) | NEW `RelatedGuideCard` |
| FAQ accordions (3 styles) | T6, T7, T8 | (c) | NEW `FaqAccordion` (hairline rows), `QuestionAccordion` (white rows + caret), `FaqCards` (bordered cards, +/−) – can be one component with 3 skins |
| Feature cards (grey, icon) | T7, T8 | (c) | NEW `FeatureCard` (2 skins: black glyph / indigo tile) |
| Comparison tables | T7, T8 | (c) | NEW `ComparisonTable` ("grid" + "matrix" variants) |
| Vs hero + demo form | T8 | (c) | NEW `VsHero`, `DemoForm` |
| Report hero / finding cards / quote panel / numbered list / story rail | T9 | (c) | NEW `ReportHero`, `FindingCards`, `QuotePanel`, `NumberedContents`, `StoryRail` |
| Social post wall | T10 | (c) | NEW `PostWall`, `SocialPostCard` |
| Glossary hero + term index | T11 | (c) | NEW `GlossaryHero`, `TermIndex` |
| FAQ document | T12 | (c) | NEW `DocHeader`, `FaqDocument` |

## Z2. Assets (classification – all content imagery → placeholders)

| template | asset | size / aspect | class |
|---|---|---|---|
| T1/T2/T9 | customer photos (`customer-image`, story hero split image, rail photos) | 608×643 (≈0.95), 303×320, 720×780, 248×331; sources 617–1254 px JPG/PNG | **content** → placeholder people/office photos |
| T1/T2/T9 | customer logos (masked SVG), category glyphs, arrow | 30–50 px tall, tinted | **brand** → generic placeholder marks |
| T2 | body screenshots (`image-0N`) 843×486 (1.734); UI card 294×340; integration logos 47×47 | **content** → placeholder UI shots / generic icons |
| T3/T4 | blog cover art (gradient + title + logo) | 1.905:1 (2048×1075 sources) | **content** → generated gradient covers |
| T4 | in-post video 900×506 | 16:9 | **content** → poster placeholder |
| T4/T6 | author avatars | 21×21 / 24×24 radius 4/7 | **content** |
| T5/T6 | guide covers 16:9 (406×228, 699×393, 424×230) | **content** |
| T8 | testimonial photos 456×394; competitor logo 40×40 | **content / third-party brand** → generic category icon |
| T9 | gradient mesh art (hero + quote panel) 1416×434 source, cover | **decorative** → CSS mesh |
| T7/T9 | Unicorn Studio WebGL stripes (T7 hero) | 2023×1299 canvas | **decorative** (same as homepage hero) |
| T10 | post avatars 38×38, post images 395 wide | **content** (third-party) |
| all | footer badges / AI-assistant icons | as homepage | per CLONE_SPEC |

Fonts: no new font files beyond the homepage set, except (a) `"ABC Ginto"` generic family declared by the TOC / table code components (never loaded – renders as fallback) and (b) system `-apple-system` stack in T10 cards, and `Inter Display` 12px in T6 related-card pills.

## Z3. Not measured / limitations
- **Tablet (1000) for T2 split hero, T3 grid, T8 slideshow** measured structurally; fine hover/motion only at 1440.
- Answer typography of T7 `QuestionAccordion` (only rendered when open; open animation measured, text style not).
- T8 table **row-hover background** (`transition: background-color .16s` exists; colour not captured).
- T4 share rail / TOC behaviour below 1200 (inline "Share" chip exists; not fully dumped).
- Story-card / blog-card **focus** styles, search-input focus, form validation states – not inspected.
- T1 filter list transition (appears instant; Framer variant swap) – no animation recorded.
- T12 sticky "Index" renders 0px tall on the live site – nothing to measure.
- Glossary detail pages, other blog posts with hero images / tables / code blocks – none in sample; §R.3/§R.4 note unmeasured fallbacks.
- WebGL (Unicorn) internals – canvas-rendered, see CLONE_SPEC §20.

## Z4. Hardest to match
1. **Three TOC/scroll systems**: T2 sticky facts card with gradient progress rail + scroll-spy, T4 HoverTOC (expand-on-hover with gradient backdrop, cubic-bezier(.65,0,.35,1) 0.3s), T6 TickTOC with section-proportional tick widths and spring popover – each needs IntersectionObserver/`useScroll` logic plus Lenis-aware smooth-scroll on click.
2. **Story card system** – 4 layouts × 4 colour themes, CSS-mask-tinted logos, card-driven button inversion with spring timing, and the alternating featured/wide/quote order driven from data.
3. **Comparison tables** – two different table systems (Framer grid with sticky blurred header at top 120 vs. code-component matrix with tinted "us" column and check/minus icons) that each collapse to stacked cards on phone.
4. **Typography drift** – many roles use Cirka at large sizes with tight tracking (75/72 −3, 60/60 −2.4) and line counts matter (hero quotes 7–10 lines, story titles 4–5 lines in 440px). Substitute fonts will need letter-spacing tuning; also several components on the live site fall back to Times/system fonts (TOC labels, table, social cards) – decide deliberately.
5. **Report page art** (T9) – the blurred gradient mesh behind white type and the conic-gradient donuts must read well without the source image.
