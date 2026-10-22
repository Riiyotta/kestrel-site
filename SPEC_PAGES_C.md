Source: https://www.lorikeetcx.ai/

# Page templates, group C: /about, /careers, /cx-jobs, /partner, /press-kit, /nominate, /privacy-policy, /terms-of-service, /llms-txt, 404

Companion to `CLONE_SPEC.md` (homepage). Section refs like "§7" point to CLONE_SPEC.md. Every value was measured on the live site with headless Chromium (`getComputedStyle` / `getBoundingClientRect`) at 1440x900, 1280x900, 1000x900 and 390x844. Framer breakpoints are the same as the homepage (§2): xl ≥1440, lg 1200–1439, md (tablet) 810–1199, base <810. 1000 is the tablet variant.

CONTENT RULE (as in CLONE_SPEC.md): copy is recorded as role, type, line count, ~char count and a 2–4 word gist only. Team photos, customer logos, investor logos and press assets are brand content: only dimensions, aspect, radius and count are recorded. Use Kestrel placeholders.

Reference screenshots (full page, 1440 and 390): `/Users/riyaghosh/V3/LORIKEET/recon/pages/<template>/<page>-<width>.png`.

Global chrome that appears on every page except where noted:
- **Nav**: same `Nav v2 Desktop (scroll)` / phone pill as the homepage (§4, §16). IDENTICAL, no prop differences. Not present on `/cx-jobs` (own header) or `/press-kit` (own sidebar).
- **Footer**: same `Footer V5` (§14), 1733px tall at 1440 on every page that has it. IDENTICAL. Not present on `/cx-jobs` (own footer) or `/press-kit` (no footer).
- **Video teaser** (§16 `.lvc`) and the hidden `AI Agent Instructions` / `Dot-Cursor` layers: present on the same pages as the Nav. IDENTICAL.
- **Cookie banner** (third-party consent widget, on every page incl. homepage): fixed bottom-right, 360x74 at x 1060 / y 806 (1440x900), white, radius 8, `box-shadow: inset 0 0 0 1px rgba(0,0,0,.15)`, text Ginto Regular 14/16.8 `#444444` (2 lines, ~68 chars, "we use cookies"), "Okay" button 52x34 bg `#F7F7F7` radius 338, Ginto Regular 14/14 `#444`. Optional in the rebuild; if built, make it a separate `CookieBanner` used app-wide.

---

## 0. Template map

| template | URLs | how pages differ | page height @1440 |
|---|---|---|---|
| **T1 Company** (`CompanyPage`: long-form two-column text + photo collage/gallery + logo strip + employee quote cards) | `/about`, `/careers` | **Structurally different** section lists, built from the same shared blocks: both use the `EmployeeCard` grid; `/about` adds the two-column text blocks, collage and logo strip; `/careers` adds the avatar hero, photo gallery, values bento and an Ashby jobs list. Treat as one template family with a section array. | 5078 / 6467 |
| **T2 Lead form** (`FormPage`: hero + form + logo wall) | `/partner`, `/nominate` | **Structurally different hero/form layout** (partner = 2-column text + glass form card; nominate = centred hero + wide labelled form with file upload). They share `LogoWall` and the Footer. Implement one `FormPage` with two layout variants plus a shared `Field` primitive. | 2811 / 3428 |
| **T3 Legal** (`LegalPage`: single 920px rich-text column) | `/privacy-policy`, `/terms-of-service` | **Content only** (identical layout and type). Two small measured quirks listed in §T3. | 7592 / 9778 |
| **T4 Jobs board microsite** (`JobsBoardPage`, own header/footer, no global nav) | `/cx-jobs` | single page | 3735 |
| **T5 Press kit** (`PressKitPage`, left sidebar + documentation content, no global nav/footer) | `/press-kit` | single page | 7878 |
| **T6 404** (`NotFoundPage`) | any unknown path, e.g. `/this-page-does-not-exist-xyz` (HTTP 404, title "404 | <brand>") | single | 2265 |
| **– llms.txt** (not an HTML template) | `/llms-txt` → **308 redirect** to `/llms.txt` | `text/plain; charset=utf-8`, 158 lines / ~20.4 KB markdown (H1 brand, `>` summary, link lists). Rebuild: ship a static `public/llms.txt` with placeholder Kestrel markdown, plus a redirect `/llms-txt → /llms.txt` (308) in the host config / router. No layout to build. | – |

---

## T1. COMPANY template (`/about`, `/careers`)

Screenshots: `recon/pages/company/about-1440.png`, `about-390.png`, `careers-1440.png`, `careers-390.png`.

### T1 section order and reuse

`/about` (1440, y / height):
| # | section | y | h | class |
|---|---|---|---|---|
| A1 | Two-column intro `header` ("mission" H1 left, 4 paragraphs right) | 0 | 832 | **NEW** `SplitText` |
| A2 | Photo collage (1 large + 2 overlapping small photos) | 832 | 866 | **NEW** `PhotoCollage` |
| – | 41px white spacer | 1698 | 41 | – |
| A3 | `Proof-Section` heading + logo marquee | 1739 | 488 | **VARIANT of `Proof`** |
| A4 | Two-column `main` ("team" H2 left, 1 long paragraph with inline links right) | 2227 | 646 | **NEW `SplitText`** (same as A1) |
| A5 | Employee quote cards, 2 cards in one row | 3023 | 242 | **NEW** `EmployeeCard` grid |

Vertical gaps on /about @1440: A4 ends at 2873 → cards start 3023 (**150**); cards end 3265 → footer 3345 (**80**). @1000: A4 ends 2199 → cards 2349 (150). @390: A4 ends 2701 → cards 2851 (150).
| – | Footer V5 | 3345 | 1733 | IDENTICAL `Footer` |

`/careers` (1440):
| # | section (Framer layer) | y | h | class |
|---|---|---|---|---|
| C1 | `Header / 142 /` avatar hero (10 floating avatars, 2-line H1, 1 button) | 0 | 900 | **NEW** `AvatarHero` |
| C2 | `Gallery / 2 /` heading + 6-photo gallery | 900 | 908 | **NEW** `PhotoGallery` (heading block = shared `SectionHeading`) |
| C3 | `Gallery / 10 /` heading + values bento (2 + 3 cards) | 1808 | 980 | **NEW** `ValuesBento` |
| C4 | `Testimonial / 34 /` heading + 8 employee cards (2 cols x 4) | 2788 | 1486 | **NEW `EmployeeCard` grid** (same component as A5); phone = **VARIANT of `Stories` carousel** |
| C5 | `Testimonial / 34 /` heading + Ashby open-roles list | 4274 | 460 | **NEW** `SectionHeading` + **third-party jobs widget** |
| – | Footer V5 | 4734 | 1733 | IDENTICAL |

### T1 shared: `SectionHeading` (careers C2–C5) – NEW small primitive
Column, centred, gap **24** (heading → sub). Heading Cirka, sub Ginto Regular, both centred, full container width.
| width | H2 | sub |
|---|---|---|
| 1440 | 75/72 ls −3px #000 | 24/30 ls −0.48 #000 (C2) **or** 20/26 `rgba(0,0,0,.75)` (C3–C5) |
| 1280 | 58/58 ls −2.32 | C2: 19/23 ls −0.38 #000; C3–C5: 18/23.4 |
| 1000 | 48/50 ls −1.92 | C2: 15/18 ls −0.3; C3–C4: 18/23.4; C5: 20/25 #000 |
| 390 | 40/40 ls −1.6 | C2: 14/17 ls −0.28 #000 (4 lines); C3–C5: 16/20.8 `rgba(0,0,0,.75)` |
Section wrappers: `padding: 102px` (1440/1280), `102px 32px` (1000), `102px 24px` (390; last section `102px 20px`), bg #fff, `overflow:hidden`, column gap **80** (C3–C5) / **32** (C2 heading → gallery).

### A1 / A4 `SplitText` – NEW
- Element `header` (A1) / `main` (A4): `display:flex; flex-direction:row; gap:100px; max-width:1440px`, padding **`200px 64px 0`** (A1) / **`100px 64px 0`** (A4). Left: heading column 606 wide (1440) / 526 (1280). Right: text column 606 / 526, paragraphs stacked with **20px paragraph spacing**.
- ≤1199 (1000 and 390): `flex-direction: column; gap: 24px`; padding `200px 32px 0` / `100px 32px 0`; both columns full width (936 @1000, 326 @390).
- Heading (A1 H1 "mission", A4 H2 "team"; 1 line, ~8–11 chars), Cirka, #000, left:
  | width | size / line-height / ls |
  |---|---|
  | 1440 | **77/38 −3.08** (note line-height 38 < font size: the glyph box overflows its 38px line box; replicate with `leading-[38px]` so the right column top aligns at y 200) |
  | 1280 | **96/38 −3.84** for A1 and **96/100 −3.84** for A4 (Framer quirk: larger at 1280 than at 1440) |
  | 1000 | 58/38 −2.32 |
  | 390 | 40/36 −1.6 |
- Paragraphs: Ginto Regular, colour **`rgba(0,0,0,.75)`**, left. 1440: 20/26; 1280 and 1000: 18/23.4; 390: 16/20.8.
  - A1: 4 paragraphs, ~283 / 242 / 405 / 326 chars → 5 / 4 / 7 / 6 lines @1440 (606 wide); 3/3/4/3 @1000; 7/6/10/9 @390. Gist "mission, approach, safety, proactive".
  - A4: 1 paragraph block ~998 chars with `<br>` breaks (4 visual paragraphs), 21 lines @1440, 23 @1280, 14 @1000, 31 @390. Gist "founders' backgrounds".
- Inline links (A4, 4 links): colour **`#4348DC`** (brand indigo), no underline; hover colour **`#5F63D9`** (rgb 95,99,217), instant (no transition). External `target=_blank`.

### A2 `PhotoCollage` – NEW
- Section: column, centred, **padding 138px** (1440/1280), **104px** (1000), **66.63px** (390); height 866 (1440), 598 (1000), 355 (390). Followed by a white 41px spacer (11px at 390).
- Stage = main photo; two smaller photos absolutely positioned relative to the main photo's top-left (brand photos → placeholders, all `object-fit: cover`, radius **16**, no shadow, no border):
  | width | main photo | small photo L (bottom-left, overlaps) | small photo R (top-right, overlaps) |
  |---|---|---|---|
  | 1440 / 1280 | 885x590 (aspect 1.5) | 214x297 at (−107, +371) | 280x262 at (+693, +34) |
  | 1000 | 557x371 | 197x273 at (−74, +208) | 197x184 at (+464, +7) |
  | 390 | 316x211 | 112x155 at (−25, +116) | 112x105 at (+225, −19) |
- Static: no load or scroll animation measured (sampled every 300px of scroll).

### A3 Logo strip block – VARIANT of `Proof` (§7)
Same Framer component (`Proof-Section` › `Proof Container` › `Headline+subtext` + `Variant 1` strip). Differences vs homepage:
- Section bg **`linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 100%)`** (homepage is white). Padding 80 (390: `80px 32px`), height 488 @1440.
- **No subtext, no bento grid.** H2 only (~78 chars, gist "global tech leaders and startups"): 75/72 −3 centred **2 lines** @1440 (1280-wide container); 58/58 −2.32 2 lines @1280; 48/50 −1.92 2 lines @1000 (840 wide); 40/40 −1.6 **5 lines** @390 (326 wide).
- Gap heading → strip 52 (same). Strip = homepage single-row marquee (1280x132 @1440, 1120 @1280, 840 @1000, **326x132 @390 – stays single-row**, unlike the homepage which switches to two opposing tickers at ≤1439). 7 customer logos (placeholders) h 19–33, gap 96, two of them `filter: saturate(0)` (one also opacity .58). Speed **50 px/s** leftwards (measured −49.97 px/s), linear, infinite.
- Prop suggestion: `<Proof variant="logos-only" bg="fade" heading=... />`.

### A5 / C4 `EmployeeCard` – NEW shared primitive (team quote card)
Two Framer variants: `Variant 1` (horizontal) and `Variant 2` (vertical, phone + careers mobile carousel).
- **Horizontal** (height **242**): flex row, radius **8**, bg = per-card tint (no border, no shadow). Tints cycle through: `#FFEAFC` (pink), `#FBF6E5` (cream), `#FEECEA` (peach), `#E5E5E5` (grey), `#E9E9F8` (lavender).
  - Text container: width = card − 242, padding **`16px 12px 12px`**, radius 9.43, `backdrop-filter: blur(23.36px)` (no visible effect – may omit). Inner column `justify-content: space-between`, height 214:
    - Quote: **Cirka 16 / 14.4** (line-height .9), ls normal, colour **`#0C2D10`**, left, ~200–380 chars → 5–8 lines at 326 wide, 3–4 lines at 670 wide. Wrapped in a column with gap 14.15.
    - Bottom row (`justify-content: space-between; align-items: flex-end`): left stack = name row [name Ginto **Bold 11.79/14.74** #000 (~9–19 chars) + flag emoji 15px, gap 8] over role (Ginto Regular 11.79/14.74 #000, ~14–28 chars, 1 line); right = LinkedIn glyph **18x18** (black, link, no hover change measured).
  - Photo frame: 242x242, padding 12 → photo **218x218**, radius **6**, cover (portrait → placeholder).
- **Vertical** (`Variant 2`): flex column; photo frame square = card width (padding 12, photo radius 6), text container below (height 234, same padding/typography). About @390: card 342x576 (photo 318x318).
- Grids:
  | page / width | layout | card size |
  |---|---|---|
  | about 1440 | row, gap 16, container 1360 at x 40 | 672x242 (text col 430) |
  | about 1280 | row, gap 16, x 40 | 592x242 |
  | about 1000 | column, gap 16, x 24 | 952x242 |
  | about 390 | column, gap 16, x 24 | 342x576 (vertical) |
  | careers 1440 | 2 columns (each a column, gap 16), column gap 16, container 1200 | 592x242 x 8 |
  | careers 1280 | same, container 1076 | 530x242 |
  | careers 1000 | single column, gap 16 | 936x242 |
  | careers 390 | **carousel** (below) | active 294x546, inactive 264.6x491.4 |
- Careers phone carousel (`Careers-Carousel` › `Mobile-Slideshow`) – **VARIANT of homepage `Stories` slideshow (§13)**: same Framer Slideshow mechanics, active slide 294 wide centred, inactive slides scale **.9**, track gap **12** (slide pitch 306), auto-advance every **5.0s**, slide transition ≈500ms ease-out, infinite; pager = 8 dots identical to Stories dots (12px `#FF29E5`, inactive opacity .2, buttons padding `12px 6px`, first `12px 6px 12px 12px`, last `12px 12px 12px 6px`), 12px below the slides. Prev/Next buttons exist but are 0x0 (hidden).

### C1 `AvatarHero` – NEW
- Section 1440x**900** (also 900 @1280/1000; **682 @390** with `padding-top:200px`), `overflow:hidden`, flex column centred (`justify-content:center` @≥1200, `flex-end` @≤1199).
- Background: decorative full-bleed PNG (1440x997 source, `object-fit: contain`) – soft green radial glow with faint grid squares (see screenshot) → recreate with CSS radial gradients (centre `rgba(…green…)` fading to white).
- Content column (gap **32**): H1 (2 lines, ~14 + 14 chars, gist "end bad support") Cirka **96/96 −3.84** (1440), **77/77 −3.08** (1280), **58/58 −2.32** (1000), **40/40 −1.6** (390), #000 centred; then a dark pill button **142x50**: padding `16px 24px`, bg `#1A1A1A`, radius 9999, label **14/18** #fff weight 500 (~14 chars) – the source sets the undeclared family `"ABC Ginto"`, so it renders in the fallback face; use Ginto Medium. This is a **VARIANT of `Button` Main** (height 50 instead of 42, line-height 18); no hover change measured. Anchor to the open-roles section (`#open-roles`).
- 10 avatar tiles (team portraits → placeholders) **100x100, radius 24**, cover, no border/shadow.
  - ≥1200: absolutely positioned, mirrored left/right:
    | 1440 (x,y) | 1280 (x,y) |
    |---|---|
    | L: (37,77) (245,169) (37,398) (190,578) (51,724) | L: (27,77) (212,169) (27,398) (163,578) (40,724) |
    | R: (1303,77) (1095,169) (1303,398) (1150,578) (1289,724) | R: (1153,77) (968,169) (1153,398) (1017,578) (1140,724) |
  - ≤1199: two horizontal tickers of 5 tiles below the button (gap **16**, rows 120px apart: y 670/790 @1000, 452/572 @390); **row 1 moves left, row 2 moves right, 30 px/s**, linear, infinite.
- Motion (on load, ≥1200): every tile `opacity 0.001 → 1`, tween **0.8s, ease `[0.44,0,0.56,1]`**; outer tiles (x 37/51 and mirrors) delay **0**, inner tiles (x 190/245 and mirrors) delay **0.5s** (measured: outer visible 296→887ms, inner 761→1357ms after navigation). Heading/button: no animation.

### C2 `PhotoGallery` – NEW
- Section padding 102 (32 sides @1000, 24 @390). `SectionHeading` (H2 ~14 chars "about us", 1 line; sub ~200 chars 24/30 #000 → 2 lines @1440), gap 32 to gallery.
- Decorative backdrop PNG behind the gallery (1200x685 @1440, `max-width:1200`, cover): colourful blurred light streaks (brand gradient) peeking out between and below photos → recreate with blurred brand-gradient blobs.
- Gallery row (`Content`): `flex row; gap 30.39px; justify/align center`, 3 columns of 2 stacked photos (column gap 16):
  | col | 1440 photo sizes (w x h) | 1280 | 1000 |
  |---|---|---|---|
  | left | 288x250 over 288x250 | 258x224 x2 | 225x195 x2 |
  | centre | 576x308 over 576x186 | 517x276 / 517x166 | 449x241 / 449x145 |
  | right | 312x250 over 312x250 | 280x224 x2 | 243x195 x2 |
  All radius **16**, no border/shadow (team photos → placeholders). @390: single column of 6 photos 342 wide (e.g. 342x296, 342x183), gap 30.39.
- Motion: each photo `opacity 0 → 1` when it enters the viewport (whileInView, once), ≈400ms (0.11 @67ms, 0.88 @277ms, 1.0 @390ms) → `transition: { type:'spring', bounce:.2, duration:.8 }` or `duration .4, ease-out`. Top row and bottom row trigger separately as they enter.

### C3 `ValuesBento` – NEW
- Section padding 102, gap 80; `SectionHeading` (H2 ~27 chars 1 line @1440/1280/1000, 2 lines @390; sub ~147 chars 20/26 `rgba(0,0,0,.75)` 2 lines).
- Decorative backdrop PNG 1020x582 centred behind the bento (`max-width 1200`): blurred multicolour light streaks (yellow/green/purple) → recreate with blurred gradients.
- `Bento` (max-width 1200, column gap 16): row 1 = 2 cards (592 wide each @1440; 530 @1280; 460 @1000), row 2 = 3 cards (389.3 @1440; 348 @1280; 301.3 @1000). @390 all 5 stack (342 wide, gap 16).
- Card: padding **24**, bg **`rgba(255,255,255,.85)`**, radius **16**, `backdrop-filter: blur(12.8px)`, `overflow:hidden`, no border/shadow; heights 243.6 (row 1), 336.4 (row 2) @1440.
  - Icon chip 38x38, radius 4, pale tint bg (e.g. `#FDECE9`), containing a 22px line icon in a darker tint (generic UI icon → use own icons); gap 12 to content.
  - Title: Cirka **24/28.8**, ls normal, #000, left, ~36–69 chars, 2–3 lines.
  - Body: Ginto Regular **16/24** #000, ~187–221 chars: 3 lines @1440 row 1 (544 wide), 5 lines row 2 (341 wide); 4/6 lines @1280; 4/7 @1000; 6 @390.
  - Title → body gap 16 (row 1) / 32 (row 2).
- Hover: none measured. Motion: none measured.

### C5 Open roles – NEW section + third-party widget
- `SectionHeading` (H2 ~20 chars "join us", 1 line; sub ~71 chars 20/26 `rgba(0,0,0,.75)`), gap 80 to the widget.
- Widget = **Framer code component that fetches the Ashby public job-board API** (`GET https://api.ashbyhq.com/posting-api/job-board/<slug>`). **On the live site this request currently fails, so the page shows only the error fallback**: a div `padding:24px`, browser default `sans-serif 12px`, colour `#666`, text ~36 chars "could not load roles, view them at" + plain link `#0000EE` underlined to the external board. Rebuild: render the success state below from local placeholder data (no network call), and keep the fallback for empty data.
- Success-state layout (from the component source, not visible live): wrapper `max-width:1200; margin:0 auto; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif`; title "Open positions (N)" 24px/700, margin-bottom 24; jobs grouped by department (sorted A–Z), each group `margin-bottom:40` with an H3 18px/600 margin-bottom 16 then a `display:grid; gap:12` list; job card = link, `display:block; padding:20px; background:#FFFFFF; border-radius:12px; border:1px solid transparent; transition: border-color 120ms`, **hover border `#5B3FFF`**; title 18px/600 colour `#5B3FFF`, margin-bottom 6; meta line 14px `#555` = department • location • employment type • Remote/On-site. **No filters.** Suggest restyling into the site tokens (Ginto/Cirka) since it renders in system fonts.

### T1 motion summary
| element | trigger | animation |
|---|---|---|
| Careers avatars (≥1200) | page load | opacity .001→1, 0.8s `[0.44,0,0.56,1]`, delay 0 (outer) / 0.5s (inner) |
| Careers avatar tickers (≤1199) | always | row 1 −30 px/s, row 2 +30 px/s, linear loop |
| Careers gallery photos | in view, once | opacity 0→1 ≈0.4s |
| About logo strip | always | −50 px/s marquee (as §7) |
| Careers phone carousel | autoplay | 5.0s interval, ≈0.5s slide, inactive scale .9 |
| Everything else | – | static |

---

## T2. LEAD FORM template (`/partner`, `/nominate`)

Screenshots: `recon/pages/form/partner-1440.png`, `partner-390.png`, `nominate-1440.png`, `nominate-390.png`.

| # | /partner (1440 y/h) | /nominate (1440 y/h) | class |
|---|---|---|---|
| F1 | `04-Form`: 2-column hero text + glass form card (0 / 766) | `Hero`: centred 2-line H1 + sub (0 / 419) | **NEW** `FormHero` (two layouts) |
| F2 | (inside F1) | `Pricing` section: wide labelled form with file drop zone (419 / 963) | **NEW** `LeadForm` + shared `Field` |
| F3 | `Logo Wall` (766 / 312) | `Logo Wall` (1382 / 312) | **VARIANT of Proof logo strip** (`LogoWall`) |
| – | Footer V5 | Footer V5 | IDENTICAL |

The pages differ structurally only in F1/F2. Both forms POST via Framer forms; **do not submit** in the rebuild either – wire to a no-op handler with client-side `required` validation.

### F1a Partner hero + form card (`04-Form`) – NEW
- Section: column centred, `max-width:1440`, padding **`180px 32px 120px`** (≥1200) / **`180px 20px 120px`** (≤1199), gap 80.
- Inner row (`max-width 1200`, `justify-content: space-between; align-items:flex-start`): text column 600 + form card 600 (≥1200). ≤1199: column, gap **55** (1000) / **53** (390), both full width (960 / 350).
- Decorative backdrop image behind the form (1267x712 JPG, `object-fit: contain`, at x 401 y 105, 1267x682 @1440/1280; 1427x1091 at x −300 @1000; 1277x1131 at x −563 @390): horizontal pink / yellow / indigo motion-blur streaks fanning out from behind the card → recreate with blurred brand-gradient bars (brand A colours §0).
- Text column (gap 27): H1 (~39 chars, gist "interested in partnering") Cirka, #000, left – **75/72 −3, 3 lines in 600** (1440); **58/58 −2.32, 2 lines** (1280); **48/50 −1.92, 1 line in 960** (1000); **40/40 −1.6, 2 lines** (390). Body block 361 wide (≥1200) / full width (≤1199): Ginto Regular **16/22.4** #000 (≥1200) / **14/19.6** (≤1199), two paragraphs (~160 chars 4 lines + ~31 chars 2 lines @1440) with 20px paragraph spacing; inline mailto link `#4348DC`, hover `#5F63D9`.
- **Glass form card** (`Form`): 600x466 @1440, padding **`40px 32px`**, bg **`rgba(255,255,255,.7)`**, radius **16**, `box-shadow: 0 6px 73.64px 0 rgba(150,150,150,.3)`, `backdrop-filter: blur(10px)`, `overflow:hidden`, column gap 48. Contains `form` (column gap **20**):
  1. Row: First name + Last name (each wrapper **200x52**, gap **14**; ≤809 they stack vertically, gap 20).
  2. Work email (full width 536 @1440, 896 @1000, 286 @390, h 52).
  3. Company website (url, h 52).
  4. Textarea (h **100**, padding 16, `resize: vertical`).
  5. Submit (outline pill, see `Field`/buttons below).
  All placeholders end with "*" (~10–50 chars); all required.

### F1b Nominate hero (`Hero`) – NEW (reuses hero type scale)
- Padding **`160px 32px 0`**, column centred; `Wrapper` max-width **1024**, gap **37**.
- H1 rendered as 2 separate centred lines (~17 + 17 chars, gist "nominate a future customer"): Cirka **96/96 −3.84** (1440), **77/77 −3.08** (1280), **58/58 −2.32** (1000), **40/40 −1.6** (390) – identical scale to the homepage H1 (§1, §15, §16).
- Sub (~91 chars incl. 2 emoji, gist "tell us about bad support"): Ginto Regular **24/30 −0.48** #000, 1 line (1440); **19/23 −0.38** (1280); **15/18 −0.3** (1000); **14/17 −0.28**, 2 lines (390) – same scale as homepage hero sub.

### F2 Nominate form (`Pricing` section) – NEW
- Section padding **`100px 32px 32px`** (390: `100px 24px 32px`), column gap 29. `form`: **max-width 800**, padding **28.98** (0 at 390), column gap **28.98**.
- Row 1: Name + Email side by side (each 363.8 wide @1440, gap 14.49; stacked ≤809). Then Domain (url), "What happened?" textarea (h **145**, optional), Upload drop zone, Submit.
- Each field = `label` column (gap **14.49**): label text Cirka **40/36 −1.6** #000 (1440) / **36/36 −1.44** (≤1439), 1 line (≈4–28 chars; 2 lines @390 for the long ones) + control.
- Text control wrapper: h **58**, padding **17.39**, bg **`rgba(187,187,187,.15)`**, radius **14.49**, 1px inner border `rgba(136,136,136,.1)` (Framer draws it with `::after`). Input text **Inter 20.29/24.35 `#999999`** – note: typed text and placeholder are both `#999` on the live site.
- **File drop zone** (third-party "superfields" upload component): 742x141 @1440 (full form width), padding 12, bg `rgba(187,187,187,.15)`, radius **10**, 1px `rgba(136,136,136,.1)` border, column centred gap 12: 28x28 upload-cloud icon (`#999`, CSS mask) + helper text Inter 14/16.8 `#999` centred (~48 chars, "click or drag, max 25 MB"). The real `<input type=file>` covers the zone at opacity 0. No hover/drag state measured.
- **Submit** (`Default`, an `<a>` acting as submit): full form width x **58**, bg `#000`, radius **449**, 1px border `#404040`; label Ginto Medium white **14/14** (1440, 390), 13/14 (1280), 10/14 (1000 – Framer quirk, use 13). **Hover: bg → `#404040`, border → `#000`** (instant swap).

### `Field` – NEW shared form primitive (both forms)
Implement once with two skins:
| prop | partner skin ("outline") | nominate skin ("soft") |
|---|---|---|
| wrapper height | 52 (textarea 100) | 58 (textarea 145) |
| padding | 16 | 17.39 |
| bg | `#FFFFFF` | `rgba(187,187,187,.15)` |
| radius | 8 | 14.49 |
| border (rest) | **2px solid `#E5E5E5`** (inset, via `::after`) | 1px solid `rgba(136,136,136,.1)` |
| text | Ginto Regular 16/16 `#000` | Inter 20.29/24.35 `#999` |
| placeholder | `#666666` | `#999999` |
| label | none (placeholder only, "*" marks required) | Cirka 40/36 above, gap 14.49 |
- **Hover**: no change (both).
- **Focus** (`:focus-within` on the wrapper): border becomes **1px solid `#0099FF`** (Framer default focus colour) on both skins; background unchanged; `outline: none` on the input; no transition (0s).
- **Error/invalid**: no custom styling. Validation is the browser's native `required` / `type=email` / `type=url` bubble on submit; after blur with an invalid value the field returns to its rest style. Rebuild: same (native validation) or add an optional error state of your own – none exists to copy.
- Caret colour = text colour; textarea `resize: vertical`.

### Partner submit button – VARIANT of `Button` Outline
115x50 (1440/1280/390), 105x45 @1000; padding **`16px 24px`**, transparent bg, radius **50**, **2px solid `#222222`** border; label Ginto Medium **16/18** #000 (13/13 @1000, 14/18 @390) + 10x10 arrow icon, gap 4. **Hover: arrow rotates −45°** (to point up-right; matrix 0.7098/−0.7044); label/border unchanged. Duration not frame-sampled (use the announcement-pill arrow spring, §5).

### F3 `LogoWall` – VARIANT of homepage Proof logo strip (§7)
- Section `Logo Wall`: column centred, padding **`63px 20px`**, gap **24**, height 312 (1440), 310 (1280), 308 (1000), 330 (390).
- Heading (~43 chars, gist "trusted by CX leaders"): Cirka, #000, centred – **30/30 −1.2** (1440, 1 line), 28/28 −1.12 (1280), 26/26 −1.04 (1000), **24/24 −0.96, 2 lines in 262** (390).
- Strip (`General`): **viewport − 40 wide** (1400 / 1240 / 960 / 350) x **132**, bg `rgba(255,255,255,.4)`, radius 16 – same tokens and edge mask as §7. Single row at all widths, 17 customer logos (inline SVG/PNG → placeholders), h 18–31, gap **96**, some `filter: brightness(0)`, one `brightness(2)`. Speed **50 px/s** leftwards (measured −49.9).
- Reveal: strip `opacity 0, translateY 80px → 1, 0` when it enters the viewport (same as §7 reveal).
- Prop suggestion: reuse the homepage `MarqueeTrack` with a `LogoWall` wrapper (`heading`, `fullBleed` = width calc(100% − 40px)).

### T2 responsive summary
| width | partner | nominate |
|---|---|---|
| 1440 | H 2811; text 600 + card 600 side by side | H 3428; form 800 centred |
| 1280 | H 2755; same, x 40 | H 3327; form 800 at x 240 |
| 1000 | H 3265; stacked, card 960 wide | H 3568; form measured 674 wide at x 163, labels 36/36 |
| 390 | H 4497; stacked, card 350, name fields stacked | H 4812; form 308, no padding, all fields stacked |

---

## T3. LEGAL template (`/privacy-policy`, `/terms-of-service`)

Screenshots: `recon/pages/legal/privacy-policy-1440.png`, `-390.png`, `terms-of-service-1440.png`, `-390.png`.

Pages differ in **content only**. Sections: Nav, one rich-text column, Footer V5 (IDENTICAL). Everything in the column is NEW (`LegalPage` + `Prose` styles). No table of contents, no real `<ul>/<ol>` lists, no tables, no sticky elements, no motion.

### Layout
- Column wrapper: `display:flex; flex-direction:column; align-items:center; max-width:1000px; margin:0 auto`, padding **`160px 40px 96px`** (≥1200) / **`160px 32px 96px`** (≤1199). Content width **920** (1440/1280), 936 (1000), 326 (390).
- Vertical rhythm (flex gaps, all margins 0):
  | width | H1 → first block | between sections (block → next H4) | H4 → its body | paragraph → paragraph (same section) |
  |---|---|---|---|---|
  | ≥1200 | **72** | **72** | **24** | **20** (`--framer-paragraph-spacing`) |
  | 1000 / 390 – privacy | 24 | 24 | 24 | 20 |
  | 1000 / 390 – terms | 100 | 100 | 24 | 20 |
  (The privacy/terms difference below 1200 is a Framer inconsistency; pick one – 24 recommended – unless matching exactly.)
- Page heights @1440: privacy 7592 (column 4968 + footer), terms 9778 (column 7152).

### Typography
| role | 1440 | 1280 | 1000 | 390 |
|---|---|---|---|---|
| H1 (page title, ~14–16 chars, 1 line, **centred**) | Cirka 96/96 −3.84 | 77/77 −3.08 | 58/58 −2.32 | 40/40 −1.6 |
| H4 section heading (left, `#000`) | Cirka **40/36 −1.6** | 36/36 −1.44 | 36/36 −1.44 | 36/36 −1.44 (2 lines for ≥~25 chars) |
| body paragraph (left, `#000`, `white-space: pre-wrap`) | Ginto Regular **20/26** | 18/23.4 | 18/23.4 | 16/20.8 |
| emphasis line (`<em>`, first line "effective date") | Ginto Regular *italic* same size | | | |
| bold (`<strong>`) | Ginto Regular at `font-weight:700` (synthetic bold, same family) | | | |
| inline link (mailto) | inherits paragraph: `#000`, **no underline**, wrapped in `<strong>` | | | |
- **Quirk**: on terms @390 the first H4 renders in `"P22 Mackinac Medium"` 32/38.4 weight 500 (a stray style in the source). Normalise to the Cirka H4 style.
- Lists: bullet items are plain text lines starting with "- " inside a paragraph, separated by `<br>`; numbered clauses ("1.1", "2.3") are typed into the text. Rebuild with real `<ul>`/`<ol>` styled to match: no list markers beyond the "- " look → `list-style: none; padding-left: 0` and prefix via `::before{content:"- "}`, or keep plain text. Line-height and size = body paragraph.

### Content shape (for placeholder generation – do NOT copy)
| page | H4 sections | paragraphs (≥1200 DOM) | body chars | intro block | longest section |
|---|---|---|---|---|---|
| privacy | 13 | 17 (+18 `<br>`) | ~8,750 | ~669 chars, 11 lines @1440, starts with an italic "effective date" line | ~1,460 chars, 20 lines @1440 |
| terms | 10 (numbered "N. TITLE", upper-case) | 13 | ~19,640 | ~1,036 chars, 11 lines @1440 | ~3,680 chars, 38 lines @1440 |
Typical section heading ~9–46 chars, 1 line at 920px. Rebuild: generic placeholder legal text with the same section count and similar lengths.

---

## T4. JOBS BOARD microsite (`/cx-jobs`)

Screenshots: `recon/pages/jobs-board/cx-jobs-1440.png`, `cx-jobs-390.png`, `cx-jobs-1440-mcp-embed.png` (embed rendered after 6s).

A self-contained sub-brand page with **its own header and footer, no global Nav/Footer/video teaser**, and a different design language: page bg **`#EEEEEE`**, square corners (radius 0 almost everywhere), **Inter** for all text (OFL, already loaded by the site: `framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2` 400, `syRNPWzAMIrcJ3wIlPIP43KjQs.woff2` 700, plus 500/600 weights used here – load Inter 400/500/600 from Google Fonts). Content column = viewport − 128 (64px gutters) @≥1200, −48 @1000, −36 @390, max 1440. Everything here is **NEW** (no homepage component matches); the only reusable homepage piece is the marquee engine (`MarqueeTrack`, §7) for the featured-roles ticker.

Colour tokens (cx-jobs only): bg `#EEEEEE`; panel `#F4F4F5`; card `#FFFFFF`; text `#000`; muted `#717171`; muted-2 `#9AA0A6`; stat label `#18181B`; stat desc `#71717A`; hairline `rgba(0,0,0,.08)`; divider `rgba(0,0,0,.1)`; logo tile bg `#F5F5F5` + 1px `rgba(0,0,0,.06)`.

### Section map (1440)
| # | Framer layer | y | h | notes |
|---|---|---|---|---|
| J0 | header bar (`Desktop`/`Tablet`/`Mobile`) | fixed top | 81 | **NEW** `JobsHeader` |
| J1 | `Hero` | 0 | 354 | **NEW** |
| J2 | `Featured Roles` ticker | 364 | 523 | **NEW** `SilkJobCard` + VARIANT of `MarqueeTrack` |
| J3 | `Brand Banner` stats | 897 | 151 | **NEW** `StatsRow` |
| J4 | `AI Assistant` header + MCP iframe | 1057 | 968 | **NEW**, third-party embed |
| J5 | `Open Roles` grid | 2035 | 752 | **NEW** `JobCard` grid |
| J6 | `Report CTA` | 2797 | 524 | **NEW** split CTA card |
| J7 | `footer` | 3331 | 340 | **NEW** `JobsFooter` |

### Shared atoms
- **Black button** (`Black`): padding **`7px 16px 8px`**, h 40.6, bg `#000`, radius 0, `box-shadow: 0 5px 6px rgba(0,0,0,.2)`, label Inter 400 **16/25.6 −0.32** `#fff` (~12–18 chars). **Hover: bg → `#FFFFFF`, label → `#000`** (instant). Widths 126 / 145 / 179 depending on label.
- **White button** (`White`, inside dark cards): padding **`6px 12px`**, 90.7x30.2, bg `#fff`, same shadow, label Inter **600 13/18.2** `#000` (~9 chars "apply"). No hover change measured.
- **Text link** ("ask your AI", "view all"): `#000` → hover **`#666666`**.
- **Eyebrow**: Inter 400 16/25.6, ls **+0.32px**, `text-transform: uppercase`, `#717171`.
- **Section H2**: Inter **500 40/44 ls −1.8** `#000` (1440); 34/37.4 (1280); 36/39.6 (1000, 390).

### J0 `JobsHeader` – fixed bar
`position: fixed; top: 0; z-index: 1`, h **81**, bg `#EEEEEE` (opaque, no blur/shadow), padding **`20px 64px`** (1000: `20px 24px`; 390: `20px 18px`), row space-between. Left: logo 21x28 + wordmark 99x22 (gap 8; brand → placeholder). Right (gap 40): text link "ask your AI" (Inter 16/25.6 −0.32; hidden @390) + Black button (~12 chars "browse roles").

### J1 Hero
- Padding **`120px 0 48px`** (390: `96px 0 40px`). `Hero Top`: row, `justify-content: space-between; align-items: flex-end` (≥1200); column gap 32 (1000) / 28 (390).
- Left `Title Wrap` 581 wide (501 @1280), gap 20: eyebrow (~29 chars "jobs + updated weekly") + H1 Inter **500 66/69.96 ls −3.6** #000, 2 lines (~39 chars, gist "every CX job using AI"); 46/48.76 @1280; 54/57.24 @1000; **36/39.6 −1.8 @390** (rendered as h2 on phone).
- Right column: `padding-left: 150px` (≥1200 only), gap 20: body Inter 400 16/25.6 −0.32 `#717171` (~233 chars, 3 lines @1440, 4 @1280, 2 @1000, 6 @390) + Black button.

### J2 Featured roles ticker – `SilkJobCard` NEW
- Container `Cards Row` max-width 1200 starting at the left gutter; track is **not clipped** (cards bleed to both viewport edges); flex row, gap **20**; 8 cards; continuous leftward scroll **38.8 px/s**, linear, infinite (Framer Ticker). Section padding-bottom 32.
- Card **348x491**, padding **24**, column `justify-content: space-between`, radius 0, 1px inner border `rgba(255,255,255,.1)`.
  - Background: **WebGL "silk" shader canvas** (348x491) – glossy flowing fabric folds on a near-black base, one hue per card (magenta, electric blue, orange-red, crimson…). Canvas-rendered: colours/speed are **not readable from the DOM**. Rebuild: CSS stand-in = `radial-gradient` / `conic-gradient` in the card hue over `#0B0B0F`, optionally slowly animated (`background-position` drift), or a small shared WebGL shader.
  - Top: company logo tile **56x56** bg `#F5F5F5`, 1px `rgba(0,0,0,.06)`, square (third-party logos → placeholders).
  - Bottom (gap 18): role title Inter **600 24/32.4 ls −0.46** `#fff`, 300 wide, 2–3 lines (~24–66 chars) + White button.
- No hover change measured on the card.

### J3 `StatsRow` (`Brand Banner`)
- White panel, padding **24** (1000: `36px 48px`; 390: `28px 20px`), full content width.
- Row gap **48** (1000: 28) of 3 equal stats separated by **1x56 dividers** `rgba(0,0,0,.1)`; @390 stacks vertically (gap 24) with horizontal 1px dividers.
- Stat (column gap 6): number Inter **600 56/56 ls −1.68** `#000` (~3–6 chars) – 34/34 −1.02 @1000, 44/44 −1.32 @390; label Inter 600 15/18 `#18181B` (~10–16 chars); description Inter 400 14/16.8 `#71717A` (~26–35 chars).

### J4 AI-assistant section + **third-party iframe**
- Padding **`96px 0 80px`** (1000: `72px 0 64px`; 390: `52px 0 44px`), column centred gap **56**.
- Header (column gap 24, centred, 316 wide): eyebrow (~24 chars) + H2 (~38 chars, 2 lines) + Black button (~18 chars, "connect").
- **Embed**: `<iframe src="https://anim-deploy.vercel.app/">` (title "MCP Flow Animation (prototype)"), transparent bg, no border, sized **1240x533** (max-width 1240) @1440, 1152x495.5 @1280, 952x409.5 @1000, **354x888** @390. Content (see screenshot): 4 AI-app icon tiles on the left with thin lavender connector curves → a vertically auto-scrolling column of query chips (white pills, faded top/bottom) → a centre app tile → a column of filter chips → a small job card with an indigo "apply" button. It animates continuously inside the iframe (not measurable from the parent page). Rebuild: do **not** embed the third-party URL; ship a static or lightly animated placeholder illustration in the same box sizes.

### J5 Open roles – `JobCard` grid (NEW, shared with `/cx-jobs/all-roles`)
- Panel bg **`#F4F4F5`**, padding **44** (1000: `44px 24px`; 390: `44px 0 0`), column gap **36**.
- Grid header: row space-between, align end – H2 (~30 chars "every open role") + "view all" link Inter 13/18.2 −0.1 `#000` (hover `#666`). @390 column gap 12, padding `0 12px`.
- Grid: `display:grid; grid-template-columns: repeat(3, 408px)` @1440 (3 x 354.66 @1280; **2 x 452 @1000**; 1 column 354 @390), **gap 0** – cards butt together and their 1px borders form the grid lines. 8 cards shown (rows 3/3/2).
- `JobCard` (194.6 tall @1440): link wrapper; inner padding **20**, bg `#fff`, **1px border `rgba(0,0,0,.08)`** (drawn with `::after`), radius 0, column gap **12**:
  - Company row (gap 8): logo tile 24x24 bg `#F5F5F5` 1px `rgba(0,0,0,.06)` radius 4 + name Inter 400 14/21 −0.1 `#717171`.
  - Title Inter **600 16/20 −0.3** `#000`, 1–2 lines (~24–66 chars).
  - Description Inter 400 13/18.2 −0.1 **`#9AA0A6`**, 2 lines (~76–100 chars).
  - Location row (gap 5): 12px pin icon + Inter 13/18.2 `#9AA0A6` (~10–34 chars).
  - **Hover: border colour → `#000`** (instant).
- **Filters**: none on `/cx-jobs`. The linked `/cx-jobs/all-roles` page (outside this group; 623 cards, H 42052) adds a `Role Search` text field in the grid header: 320x44, padding `12px 14px`, bg `rgba(255,255,255,.72)`, radius 8, 1px `rgba(0,0,0,.14)` border (`::after`), Inter 14/16.8 `#141414`, placeholder `#707070` (~26 chars); **focus border 1px `#0077FF`**. Typing did not filter the list client-side within 1.2s (filtering behaviour not determined).

### J6 Report CTA
- Section padding `32px 0` (1000: `16px 0 64px`; 390: `12px 0 48px`). Card: white, radius 0, row (≥1200) / column (≤1199).
- Text column 564 wide @1440 (495 @1280; full @≤1199), padding **56** (390: `36px 28px`), column gap **22**, vertically centred: eyebrow (~10 chars "the report") + H2 (~29 chars, 2 lines) + body Inter 16/25.6 −0.32 `#717171` (~219 chars, 4 lines @1440, 6 @390) + Black button (~13 chars "download").
- Image (editorial portrait with red light → placeholder): fills the rest, **748x460** @1440, 657x404 @1280, 952x586 @1000, 354x218 @390, `object-fit: cover` (source 747x1121 JPG, portrait crop).

### J7 `JobsFooter`
- Panel bg `#F4F4F5`, padding **`56px 32px 32px`** (1000: `56px 24px 32px`; 390: `48px 18px 32px`), inner content 1200 wide (x 120 @1440).
- Top row: left = logo (128x28) + blurb Inter 14/21 −0.1 `#717171`, 320 wide, 3 lines (~100 chars); right = `Links Group` row gap **64** (1000: space-between full width; 390: column gap 28) of 3 columns: title Inter **600 13/18.2** `#000` + links Inter 14/21 −0.1 `#717171` (row pitch 35px, 3–4 links; contact column has a mailto, a domain and a "city · city" line).
- 1px rule `rgba(0,0,0,.08)` (1200 wide), then bottom row: © line Inter 13/18.2 −0.1 `#9AA0A6` (~37 chars) left, two legal links Inter 14/21 `#717171` right (gap ~24).
- Hidden `AI Agent Endpoint Notice` (opacity 0, 1x1, long API docs text) – screen-reader/LLM only; optional.

### T4 motion
| element | animation |
|---|---|
| featured ticker | −38.8 px/s linear loop |
| silk card backgrounds | WebGL shader animation (continuous; not measurable) |
| MCP iframe | internal animation (third-party) |
| buttons / links / job cards | instant colour swaps on hover (above) |
| everything else | static (no scroll reveals measured) |

---

## T5. PRESS KIT (`/press-kit`) – brand-guidelines documentation page

Screenshots: `recon/pages/press-kit/press-kit-1440.png`, `press-kit-390.png`.

Own layout: **no global Nav, no Footer, no video teaser**. Root = `display:flex; flex-direction:row` (≥810), white. Everything is **NEW** (`PressKitPage`, `DocSidebar`, `DocSection`, `AssetPreview`, `DownloadTile`, `ColorSwatch`, `TypeSpecimen`). The logo files, palette values and gradient images shown are brand content → use Kestrel placeholders; keep the structure.

### Layout
- **Sidebar** (`Navigation`): width **18% of viewport** (259.2 @1440, 230.4 @1280, 230 @1000), **`position: sticky; top: 0`**, height = content (300), bg #fff, column gap 24, padding-bottom 30.
  - Logo link at (32, 22): mark 21x28 + wordmark 99x22, gap 8 (placeholder).
  - `Contents` list: padding `0 32px 30px`, gap **10**, 4 anchor links (`#intro`, `#logo`, `#color`, `#typography`) Ginto Regular **14/18** `#000` (13/18 @1280/1000; 13/14.3 @390); **1px bottom border `rgba(0,0,0,.1)`** across the full sidebar width. No hover or active-state change measured (links stay `#000` while scrolling).
  - "Home" link below: padding `0 20px 0 32px`, Ginto Regular 14/18 **`#666666`**.
- **Main** column: remaining width (1180.8 @1440, 1049.6 @1280, 770 @1000).
  - **Hero image** full main width, 16:9 (1180.8x664.2 @1440, 1049.6x590.4 @1280, 770x433 @1000, 390x219 @390), `object-fit: cover` – solid brand indigo field with a centred white logo lockup → rebuild as `bg-brand-indigo` div + placeholder white logo.
  - Sections stacked, each with **1px left border and 1px top border `rgba(0,0,0,.1)`** (drawn with `::after`; the Intro section has the left border only), padding **`32px 32px 120px`** (TOC: `32px 32px 200px`; Color: `32px 32px 0` with the palette block carrying `padding-bottom:120`); side padding 20 @390. Section column gap 30.
- @390: the sidebar becomes a normal (non-sticky) top block 390x318 (contents padding `0 20px 30px`), main is full width below.

### Typography (press kit)
| role | 1440 | 1280 | 1000 | 390 |
|---|---|---|---|---|
| H1 "guidelines" / section H2 "0N title" (left col) | Cirka **75/72 −3** | 58/58 −2.32 | 48/50 −1.92 | 40/40 −1.6 |
| "Contents" H2 | Cirka 40/36 −1.6 | 36/36 −1.44 | 36/36 | 36/36 |
| intro / section body (right col), sub-labels ("primary", "icon", "primary palette") | Ginto Regular **20/26 `rgba(0,0,0,.75)`** | 18/23.4 | 18/23.4 | 16/20.8 |
| TOC items ("01 title") | Ginto Regular **24/30 −0.48** #000 | 19/23 −0.38 | 15/18 −0.3 | 14/17 −0.28 |
| captions, swatch name + hex | Ginto Regular 14/18 #000 | | | |
| download tile label | Ginto Regular 16/16 `#474747`, centred | | | |
| "gradient palette" heading | **Rethink Sans 600 22/26.4 −0.22** #000 (Google Font, OFL) | | | |
| specimen family label | "ABC Ginto" 32/32 `#4D4D4D` – this family name is **not declared**, so it renders in the fallback face; use Ginto Regular | | | |
| serif specimen (alphabet, 3 lines) | Cirka 96/96 −3.84 | 77/77 −3.08 | 58/58 −2.32 | Ginto 40/36 −1.6 |
| sans specimen | Ginto Regular 96/100 −3.84 | 77/77 | 58/62 | – |

### Blocks
- **Two-column header row** (`Content` / `Header`): flex row, two equal halves (558.4 each @1440, 492.8 @1280, 353 @1000, **175 @390 – stays two columns on phone**). Left heading, right body (paragraph gap 20; intro has 3 paragraphs ~149/109/92 chars, 3/2/2 lines; section bodies ~1 paragraph 6 lines).
- **TOC**: same two-column row – "Contents" left, list right (column gap 10, 3 anchor rows 30 tall, no numbers styling beyond text).
- **Asset preview** (`Diagram`): padding-top 40, column gap 10: label row (20/26) → preview image full width (1116.8x578 @1440; 985.6x510 @1280; 706x365 @1000; 350x181 @390), radius 0, **1px border `#CCCCCC`** (`::after`) on the light preview; dark preview bg `#1A1A1A` → row of 4 `DownloadTile`s.
- **`DownloadTile`** (link to the asset file): **273.2x76** in full-width rows (gap 8; 240.4 @1280, 170.5 @1000, 171 @390 → 2 per row) and **131.6x76** in half-width grid items (120 @1280); padding **`30px 60px`**, bg **`#E6E6E6`**, radius 0, label = file format (~3 chars). **Hover: bg → `#B0B0B0`, label → `#000`, `transform: scale(1.1)`** (timing not frame-sampled; use ~200ms ease-out). 24 tiles on the page (6 assets x JPG/PNG/SVG/EPS).
- **Icon grid** (`Row 1`): CSS grid 2 x 550.4 (gap 16 both axes) @≥1200, single column ≤1199. Item = column gap 10: square preview 550.4x549 (white tile, or `#1A1A1A` tile with the mark `object-fit: contain` 439 tall), caption 14/18, then 4 tiles 131.6x76 (gap 8).
- **Primary palette**: label then row gap **68** (12 @≤1439) of 5 `ColorSwatch`: circle **169x170**, radius 50% (187.5 @1280, 131.6 @1000; @390 a 2-column grid of 169) filled with the colour, then label column gap 4: name + "Hex: #XXXXXX" (14/18). Source swatches are the brand palette (pink `#FF29E5`, yellow `#FACB12`, green `#30B53D`, indigo `#4348DC`, red `#EA4921`) – note `#30B53D` is not in the homepage tokens. Swap for Kestrel placeholder colours.
- **Secondary palette**: 2 large circles **524x529** (black; white with 1px `#000` border) + labels; 487x491 @1280, 347x350 @1000.
- **Gradient palette**: heading (Rethink Sans) then 2x2 grid (row gap 20, column gap 32) of gradient images **542.4x255** (cover, **1px `#000` border**), caption 14/18 below (gap 10). Images are decorative blurred brand-colour streaks (can be recreated with CSS blurred gradients). Single column @390 (350x165).
- **Typography block**: column gap 58: 2 paragraphs (20/26 `rgba(0,0,0,.75)`, ~5 lines total at 1117 wide) → two specimen rows (family label 32px left, alphabet specimen right, 3 lines each) → 1-line licence footnote.

### Motion
None measured (no load/scroll animations; only the download-tile hover).

---

## T6. 404 (`NotFoundPage`)

Screenshots: `recon/pages/404/this-page-does-not-exist-xyz-1440.png`, `-390.png`. Real HTTP 404 status, title "404 | <brand>".

| section | class |
|---|---|
| Nav | IDENTICAL |
| `Content` block | **NEW** (tiny) – heading + sub + 1 button |
| Footer V5 directly below (its WebGL stripes show under the content) | IDENTICAL |

- `Content`: column centred, padding **160** (390: `160px 49px 49px`), height 532 @1440 (511 @1280, 498 @1000, 401 @390). Inner text group gap **20** (H2 → sub; 4 @1000, 16 @390), then gap **48** to the button.
- H2 (~29 chars, gist "page doesn't exist"), Cirka, #000, centred, 1 line: **75/72 −3** (1440), 58/58 −2.32 (1280), 48/50 −1.92 (1000, max-width 80%), **40/40 −1.6, 2 lines in 244** (390).
- Sub (`h6`, ~55 chars, gist "get back on track"): Ginto Regular **24/30 −0.48** #000 centred, 1 line (1440); 19/23 −0.38 (1280); 15/18 −0.3 (1000); 14/17 −0.28, 2 lines (390) – the homepage hero-sub scale.
- Button: **IDENTICAL to homepage `Button` Main Large** (§5) – 119x42 (label ~9 chars "back home"), padding `14px 24px`, `#1A1A1A`, radius 9999, white Ginto Medium 14/14, same hidden rotating glow layer and hover shadow. Links to `/`.
- Page heights: 2265 (1440), 3471 (390). No motion beyond the button.
- Framer layer names on this page are leftover template names ("Medium length hero headline goes here", "Lorem ipsum…"); ignore them.

---

## R. REUSE TABLE (all templates)

| section / element | page(s) | class | existing component / what differs |
|---|---|---|---|
| Top nav | all except cx-jobs, press-kit | (a) IDENTICAL | `Nav` – no prop change |
| Footer + CTA glass + wordmark | all except cx-jobs, press-kit | (a) IDENTICAL | `Footer` |
| Floating video teaser | same as Nav | (a) IDENTICAL | `VideoTeaser` |
| 404 "back home" button | 404 | (a) IDENTICAL | `Button variant="dark" size="lg"` |
| Careers "see open roles" button | careers | (b) VARIANT | `Button` dark: height 50, padding `16px 24px`, label line-height 18 (`size="xl"`) |
| Partner submit | partner | (b) VARIANT | `Button` outline: transparent bg, **2px `#222` border**, label 16/18, trailing arrow that rotates −45° on hover |
| Nominate submit | nominate | NEW-ish (could be `Button` variant) | full-width black pill 58 tall, 1px `#404040` border, hover bg `#404040` |
| About logo strip block | about | (b) VARIANT | `Proof`: logos-only (no subtext, no bento), section bg `linear-gradient(#FFF, #F9F9F9)`, strip single-row at every width |
| Logo wall | partner, nominate | (b) VARIANT | `Proof` logo strip (`MarqueeTrack`): own heading (Cirka 30/30), strip width = viewport − 40, padding `63px 20px`, fade-up reveal |
| Careers phone testimonial carousel | careers @<810 | (b) VARIANT | `Stories` slideshow: slide = `EmployeeCard` vertical 294x546, gap 12, 8 dots, 5s autoplay |
| Hero H1 / sub scale on nominate, 404, careers | nominate, 404, careers | (b) VARIANT (type tokens only) | same font-size steps as `Hero` H1 (96/77/58/40) and hero sub (24/19/15/14) – reuse the Tailwind tokens, not the `Hero` component |
| Cookie banner | all (incl. home) | NEW (optional) | fixed bottom-right card, see header of this file |
| `SplitText` two-column text | about ×2 | (c) NEW | |
| `PhotoCollage` | about | (c) NEW | |
| `EmployeeCard` (+ grid) | about, careers | (c) NEW shared | |
| `AvatarHero` | careers | (c) NEW | |
| `SectionHeading` | careers ×4 | (c) NEW small | |
| `PhotoGallery` | careers | (c) NEW | |
| `ValuesBento` | careers | (c) NEW | |
| Ashby open-roles widget | careers | (c) NEW + third-party data | |
| `FormHero` (partner 2-col / nominate centred) | partner, nominate | (c) NEW | |
| `Field` (outline / soft skins), `FileDropZone` | partner, nominate | (c) NEW shared | |
| `LegalPage` + prose styles | privacy, terms | (c) NEW | |
| Jobs microsite (header, hero, silk ticker cards, stats row, MCP iframe, job-card grid, report CTA, footer) | cx-jobs | (c) NEW (all) | only the marquee engine is reusable |
| Press-kit doc layout (sticky sidebar, doc sections, download tiles, swatches, specimens) | press-kit | (c) NEW (all) | |
| 404 content block | 404 | (c) NEW (trivial) | |
| llms.txt | /llms-txt → /llms.txt | – | static text file + 308 redirect |

### New shared primitives to build (priority order)
1. `EmployeeCard` (horizontal + vertical variants, tint prop) and its grid/carousel wrappers.
2. `Field` (text / email / url / textarea; `skin="outline" | "soft"`; label optional; focus border `#0099FF`) + `FileDropZone`.
3. `SectionHeading` (H2 + sub, centred; size steps per breakpoint).
4. `SplitText` (heading left, rich text right; collapses ≤1199).
5. `LogoWall` wrapper around the existing `MarqueeTrack`.
6. `JobCard` (cx-jobs grid card) and `SilkJobCard` (ticker card) – plus `AshbyJobList` (careers) which can be restyled to reuse `JobCard`.
7. `Prose`/`LegalPage` styles (H1 centred, H4 sections, 20/26 body, 72/24/20 rhythm).
8. Press-kit set: `DocSidebar` (sticky), `DocSection` (bordered), `DownloadTile`, `ColorSwatch`, `TypeSpecimen`.
9. Small: `PhotoCollage`, `PhotoGallery`, `ValuesBento`, `AvatarHero` (absolute avatars ≥1200, two opposing 30 px/s tickers below), `StatsRow`, `NotFound` block, optional `CookieBanner`.

### New tokens (not in tailwind.config.cjs yet)
- Colours: `#F9F9F9` (about proof gradient end), `rgba(0,0,0,.75)` body-75, `#0C2D10` quote green (already `tag-text.green`), employee tints `#FBF6E5`, `#FEECEA`, `#FFEAFC` (≈ `tint.pink` `#FEEAFC`), link hover `#5F63D9`, focus `#0099FF`, field border `#E5E5E5`, field-soft bg `rgba(187,187,187,.15)`, field-soft border `rgba(136,136,136,.1)`, `#999999`, `#404040`, `#222222`, careers bento card `rgba(255,255,255,.85)`, download tile `#E6E6E6` / hover `#B0B0B0` / label `#474747`, preview border `#CCCCCC`, press-kit rules `rgba(0,0,0,.1)`, palette green `#30B53D`; cx-jobs set (`#EEEEEE`, `#F4F4F5`, `#F5F5F5`, `#717171`, `#71717A`, `#18181B`, `#9AA0A6`, `#5B3FFF` Ashby accent).
- Radii: 6 (employee photo), 9.43, 14.49 (soft field), 50 (outline submit), 449 (nominate submit).
- Shadows: glass form card `0 6px 73.64px rgba(150,150,150,.3)`; cx-jobs button `0 5px 6px rgba(0,0,0,.2)`.
- Fonts: **Inter 500/600** (cx-jobs; Inter 400/700 already loaded), **Rethink Sans 600** (press kit heading, Google Fonts OFL). Ignore the undeclared "ABC Ginto" and stray "P22 Mackinac Medium" usages – map them to Ginto Medium / Cirka.

---

## A. Assets (per template; all brand/content imagery → placeholders)
| page | asset | rendered size @1440 | intrinsic / format | fit / radius | class |
|---|---|---|---|---|---|
| about | collage photos x3 | 885x590, 214x297, 280x262 | 1659x1106 PNG, 214x142 JPG, 280x261 PNG | cover / 16 | content |
| about | employee portraits x2 | 218x218 | 1440x1266 / 216x216 JPG | cover / 6 | content |
| about | logo strip logos x7 (repeated x4) | h 19–33 | SVG 360x150 etc., 2 PNG | cover, saturate(0) | content |
| careers | avatar hero tiles x10 | 100x100 | 100–1440 px squares JPG/PNG | cover / 24 | content |
| careers | hero background | 1440x900 | 1440x997 PNG (green glow grid) | contain | decorative |
| careers | gallery photos x6 | 288x250, 576x308, 576x186, 312x250 | ~283x245–578x325 PNG/JPG | fill/cover / 16 | content |
| careers | gallery backdrop streaks | 1200x685 | 1200x685 PNG | cover | decorative |
| careers | bento backdrop | 1020x582 | 1019x513 PNG | cover | decorative |
| careers | employee portraits x8 | 218x218 | ≤1440 squares | cover / 6 | content |
| careers | bento icons x5 | 38x38 | inline SVG | – | generic UI |
| partner | form backdrop streaks | 1267x682 | 1267x712 JPG | contain | decorative |
| partner, nominate | logo wall logos x17 (x3 repeats) | h 18–31 | inline SVG + 4 PNG | brightness(0)/(2) | content |
| nominate | upload icon | 28x28 | CSS mask SVG | – | generic UI |
| cx-jobs | company logos (ticker 56x56, grid 24x24) | – | 100x100 LinkedIn CDN images | cover | content (third-party) |
| cx-jobs | silk card backgrounds x8 | 348x491 | WebGL canvas | – | decorative (shader) |
| cx-jobs | report photo | 748x460 | 747x1121 JPG | cover | content |
| cx-jobs | MCP flow animation | 1240x533 | iframe `anim-deploy.vercel.app` | – | third-party embed |
| press-kit | hero logo banner | 1180.8x664.2 | 1180x664 JPG | cover | brand |
| press-kit | logo previews x2, icon previews x4 | 1116.8x578; 550x549 | 1116x503 JPG; 436x435 JPG; 184x234 / 185x234 PNG | cover / contain | brand |
| press-kit | gradient images x4 | 542.4x255 | 542x239 JPG | cover | decorative |
| press-kit | 24 downloadable files | – | JPG / PNG / SVG / EPS (`.ps`) on framerusercontent.com/assets | – | brand (do not ship) |
| all | fonts | – | Cirka, Ginto Regular/Medium/Bold (as §1), Inter 400/500/600/700, Rethink Sans 600, KoHo (loaded on cx-jobs by a third-party widget, unused in visible text) | – | – |
No `<video>` elements on any page in this group.

---

## L. Not measured / limitations
- **Ashby jobs list (careers)**: the live API call fails, so only the error fallback is visible; the success layout above comes from the component source code, not from rendering.
- **cx-jobs MCP iframe** and **silk WebGL cards**: content is inside a cross-origin iframe / canvas; colours, timing and shader params are not DOM-measurable. Screenshot `cx-jobs-1440-mcp-embed.png` is the reference.
- **Form error states**: none exist beyond native browser validation bubbles; forms were not submitted, so success/thank-you states are unknown.
- **File drop zone**: drag-over / uploaded states not tested.
- **Hover timings**: colour swaps measured as instant where Framer uses CSS (`0s`); download-tile scale and partner-submit arrow rotation are framer-motion transitions whose duration was not frame-sampled.
- **Press-kit sidebar**: no active-section highlighting observed; scroll-spy not present.
- **Tablet (1000)** was measured for every page; other tablet widths (810–1199) assumed fluid between them.
- `/cx-jobs/all-roles` (linked from cx-jobs, outside this group) only lightly probed (search field styles); its filtering behaviour was not determined.

## H. Hardest to match
1. **cx-jobs silk shader cards + MCP iframe animation** – canvas/iframe content with no measurable params; needs an own shader or a convincing CSS gradient stand-in and an own illustration.
2. **Careers avatar hero** – 10 absolutely placed tiles with a two-group staggered fade (0 / 0.5s, 0.8s `[0.44,0,0.56,1]`) on desktop that becomes two opposing 30 px/s tickers on tablet/phone, over a soft green grid glow.
3. **Framer type quirks** – About headings with line-height 38 on 77px text and a bigger size at 1280 than at 1440; legal tablet/phone gap differences (24 vs 100); nominate submit label 10px at 1000; stray fonts ("ABC Ginto", "P22 Mackinac"). Decide per quirk whether to replicate or normalise.
4. **Two form skins** – outline (2px `#E5E5E5`, 8 radius, Ginto) vs soft (translucent grey, 14.49 radius, Inter 20.29 grey text) sharing one `Field` with a `#0099FF` focus ring drawn as an inset pseudo-border.
5. **Decorative raster backdrops** (careers gallery/bento streaks, partner form streaks, careers hero glow) – need CSS/SVG blurred-gradient recreations that sit behind content at the measured sizes.
