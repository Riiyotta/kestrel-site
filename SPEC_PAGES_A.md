Source: https://www.lorikeetcx.ai/

# Lorikeet page templates, group A (product / industry / integrations / pricing / demo): clone spec

Companion to `CLONE_SPEC.md` (homepage). Tokens, fonts, buttons, Nav, Footer and breakpoints are **not repeated** here. Read CLONE_SPEC.md §0–§5 first. Everything below was measured on the live site with headless Chromium (Playwright 1.63) at 1440x900, 1280x800, 1000x800 (Framer "Tablet" breakpoint) and 390x844 (Phone, `isMobile`). If a value says "not measured", I could not read it. Don't guess it.

CONTENT RULE (same as homepage): copy is recorded as role + typography + width + lines + approx. chars + a 2–4 word gist only. The rebuild uses "Kestrel" placeholder copy of similar length. Customer logos, people photos, product-UI screenshots, Rive animations and videos are brand/content assets, so use placeholders with the same box, aspect and radius.

Reference screenshots (full page, stitched from viewport captures; sticky elements may repeat at segment seams):
`recon/pages/aeo-detail/`, `recon/pages/product-landing/`, `recon/pages/integrations-library/`, `recon/pages/integration-detail/`, `recon/pages/pricing/`, `recon/pages/get-a-demo/` (`*-1440.png`, `*-390.png`).

---

## 0. Template map

| Template | URLs | Framer evidence | How pages differ |
|---|---|---|---|
| **T1 AEO Detail** ("answer-engine" product/industry page) | /product/ai-agents, /product/guardrails, /product/how-it-works, /product/outbound, /product/quality-assurance, /product/simulations, /product/trust, /industry/financial-services, /industry/healthcare, /industry/insurance | identical layer stack: split hero `Section > Container(Heading 1, Paragraph, Intro, CTA-Buttons)` + media; `Variant 1` logo ticker; `Tools Section > Tools Content > FAQ Item`; `Container > Heading 2`; `Section > Container ×3` (alternating rows); optional `Variant 3` story slideshow; `Section` callout; `Related Reading`; `FAQ Section`; `Footer V5` | Mostly content-only. Prop-level variants: (1) hero media is a **mux video** (ai-agents, how-it-works, outbound) or a **Rive animation over a still "ground" image** (all others); (2) industry pages add a `Byline` line and a `Self-serve line` under the buttons. how-it-works has the Self-serve line but no `Intro` paragraph. (3) H1 size: 75/72 on product pages, **60/60** on healthcare and insurance; (4) story slideshow present on ai-agents, financial-services, healthcare (tint pink `#FEEAFC`/`#400B39` or peach `#FCEDE8`/`#3B1208`) and absent elsewhere; (5) `Related Reading` absent on the 3 industry pages; (6) healthcare callout adds an event block + inline demo form (§T1.8b). Page heights @1440: 7656–9092. |
| **T2 Product Landing** (bespoke marketing pages) | /product, /product/coach, /product/voice | each page has its own middle sections, but they share the centred H1 hero, logo ticker, `Tools Section`, `Related Reading`, `FAQ Section` and Footer with T1 | Structural: /product = hero → Tools → channel carousel → 5 alternating 600px feature rows → integration orbit → story slideshow (`Desktop`) → Related → FAQ → Blog grid; /coach = hero + video → logo ticker → Tools → "What does X do" bento sections (4) + quote card + blue CTA banner → Related → FAQ; /voice = hero with Unicorn bg + full-bleed video → logo ticker → Tools → 5-principles carousel → split explainer → case-study card → Related → FAQ. |
| **T3 Integrations Library** | /integrations | `Main > Hero(Headline-Container, H1, text+button)`, orbit graphic, `Logo Wall`, category list with sticky sidebar (`Ticketing system`, `Telephony`, `Knowledge base`, `Tools and actions`), `Setup Section`, FAQ | single page |
| **T4 Integration Detail** | /integrations/lorikeet-api, /integrations/mcp | `Back` link, `Lorikeet-icon` + H1, `Overview/Role/Content Container` 2-col with sticky `Top/Website/...` side card, `Knowledge base` "Other apps" grid | content-only (mcp is shorter: 2971 vs 3085 @1440) |
| **T5 Pricing** | /pricing | `Hero(Hero wrapper, Title, Statement)`, `Ruled > Inner > Plans` (3 plan cards), sticky compare-features table with accordions, FAQ accordion | single page |
| **T6 Get a Demo** | /get-a-demo | `Sign up` (form column) + `Frame 299` (gradient art + quote card); **no Nav, no Footer** | single page |

Global notes for all templates:
- Nav (`Nav v2 Desktop (scroll)`) and Footer (`Footer V5`) are **IDENTICAL** to the homepage components on every page except T6, which has neither. An empty absolutely positioned `#footer-scroll-trigger` div (h 703) sits over the footer exactly as on the homepage, so there's nothing to build.
- The floating video teaser (`.lvc`) is homepage-only. It's not present on these pages, so don't mount `VideoTeaser`.
- Cookie banner ("We use cookies…", bottom-right card, "Okay" pill) is a third-party consent widget on all pages. Not part of the build.
- The only Framer **appear** animation on T1/T2/T5 pages is the footer announcement-pill glow (`10oe872`, same as homepage). T1 sections have **no scroll reveals**: SSR renders them visible and no `opacity:0`/transform initial states exist. T3/T4 add reveal fades (see their sections).
- Smooth scroll: Lenis is present site-wide (same options as homepage §3).
- Rich-text link colour site-wide on these templates: `#4348DC` (rgb 67,72,220); hover → `rgb(95,99,217)` (#5F63D9), no underline in either state; change is instant (no CSS transition measured; Framer `transition: all` with no duration).

---

## T1. AEO Detail template (10 URLs)

Representative page: /product/ai-agents (doc height 9092 @1440, 8467 @1280, 11748 @1000, 13769 @390). Variant data from /industry/financial-services and /industry/healthcare.
Screenshots: `recon/pages/aeo-detail/ai-agents-1440.png`, `ai-agents-390.png`.

Section order (1440, ai-agents): Nav → T1.1 Split hero (0–940) → T1.2 Logo ticker (940–1136) → T1.3 Prose block "Tools Section" (1136–2386) → T1.4 H2 band (2386–2655) → T1.5 Alternating feature rows ×3 (2655–4355) → T1.6 Story slideshow (4355–5092, optional) → T1.7 Callout row (5092–5684) → T1.8 Related reading (5684–5952, optional) → T1.9 FAQ list (5952–7358) → Footer (7359–9092).

### Reuse table (T1)

| # | Section | Class | Reuse note |
|---|---|---|---|
| – | Nav | (a) IDENTICAL `Nav` | none |
| T1.1 | Split hero (text + 542² media) | (c) NEW `SplitHero` | Buttons = existing `Button` dark/light lg (identical: 124x42 / 140x42, same hover). |
| T1.2 | Logo ticker card | (b) VARIANT of the logo marquee inside `Proof` | Extract the Proof marquee into a `LogoMarquee` component. Same card tokens (radius 16, bg rgba(255,255,255,.4), 1px rgba(0,0,0,.1) border, 10px padding, 0/17/83/100% edge mask, 96px gap, ≈50px/s leftward). Props: `width` (1200 here vs 1280 on home), `logos` (11 logos here, 2333px stack vs 4140), wrapper padding. |
| T1.3 | Prose block (H2 + rich text with bullets/links + H3 sub-blocks) | (c) NEW `ProseSection` (shared primitive P1) | Also used by T1.8, T1.9 and by T2 pages. |
| T1.4 | Centred H2 band (Ginto 64/77) | (c) NEW `SectionHeading` variant (primitive P2) | none |
| T1.5 | Alternating image/text rows | (c) NEW `FeatureRows` (primitive P3) | none |
| T1.6 | Story slideshow ("Variant 3") | (b) VARIANT of `Stories` | Same pager (12px `#FF29E5` dots, inactive .2), same 5s autoplay + ~600ms expo-out slide and inactive `scale(.9)`. Different card: horizontal 956x393 card (photo 303x320 + tinted quote panel 637x321), step 1004px (956 + 48 gap), Cirka 60 heading, pager inside a grey pill. Add a `layout="wide"` prop (or a new `StoryCardWide`) plus a `tint` prop. Tablet/phone show one static card, no slider. |
| T1.7 | Callout row (image + H3 + body + dark button) | (b) VARIANT of T1.5 `FeatureRows` | single row, no eyebrow, adds `Button` dark lg. Healthcare adds T1.7b (NEW). |
| T1.8 | Related reading (H3 + bulleted link list) | (b) VARIANT of P1 `ProseSection` | no H2, links only |
| T1.9 | FAQ list (static, not an accordion) | (b) VARIANT of P1 `ProseSection` | H2 + N × (H3 + paragraph) |
| – | Footer | (a) IDENTICAL `Footer` | none |

### T1.1 Split hero (NEW, `SplitHero`)

Geometry
| | 1440 | 1280 | 1000 (tablet) | 390 (phone) |
|---|---|---|---|---|
| wrapper (flex row, centred, `overflow:clip`, max-w 1440) padding | `160px 64px 40px` | `160px 64px 40px` | `160px 32px 40px` | `160px 20px 40px` |
| inner `Section` | row, gap **26**, max-w **1110**, x 165, w 1110 | x 85, w 1110 | x 32, w 936 | **column**, gap 26, w 350, **media first** |
| text column (`Container`) | 542 wide, column gap **24**, `justify-content:center`, align start | 542 | 455 | 350 |
| media box | **542x542**, radius 8, `overflow:clip`, vertically centred against text | 542x542 | 455x455 | 350x350 |
| section height (ai-agents) | 940 | 745 | 768 | 1101 |

Text stack (column gap 24): H1 → lede paragraph (`Paragraph`) → long intro paragraph (`Intro`, optional) → `Byline` (industry only, optional) → CTA group.
| role | 1440 | 1280 | 1000 | 390 | colour | notes |
|---|---|---|---|---|---|---|
| H1 (product pages) | Cirka **75/72** ls −3px | 58/58 −2.32 | 48/50 −1.92 | 40/40 −1.6 | #000 | ≈47–56 chars, 3–4 lines @1440 in 542; 3 lines @1280/1000/390 |
| H1 (healthcare, insurance) | Cirka **60/60** ls −2.4 | 50/50 −2 | 40/40 −1.6 | 40/40 −1.6 | #000 | ≈65 chars, 3 lines |
| lede `Paragraph` | Ginto Regular 20/26 | 18/23.4 | 18/23.4 | 16/20.8 | **#666666** | ≈94–213 chars, 2–4 lines |
| `Intro` paragraph | same as lede | | | | #666 | ≈420–460 chars, 8–9 lines @1440; may contain one inline link (#4348DC) |
| `Byline` | Ginto Regular 14/18 | 13/18 | 13/18 | 13/14.3 | #666 | ≈51 chars, 1 line, gist "reviewed by team" |
| CTA buttons row | gap **12**: `Button` dark lg ("demo") + `Button` light lg ("free trial") | | | | | identical to homepage buttons |
| `Self-serve line` (industry + how-it-works) | Ginto Regular 14/18 #333, 14px below the buttons (CTA-Group column gap **14**); first ≈17 chars are an underlined link in the same colour | | | | #333 | ≈79 chars, 1 line, gist "free trial, no call" |

Media (content → placeholder of the same box)
- **Video variant** (ai-agents, how-it-works, outbound): `<video autoplay muted loop playsinline>` from `stream.mux.com/.../highest.mp4` (1440x1440 source), poster `framerusercontent.com/images/O5gttx14KS5HTTyEJFM3jKimec.jpg`, `object-fit: cover`, radius 8 (content: chat-UI demo on a magenta/violet gradient).
- **Rive variant** (guardrails, QA, simulations, trust, 3 industry pages): a static "ground" image (`framerusercontent.com/images/<id>.webp?width=1260&height=1260`, 1:1, `object-fit:cover`, radius 8) with a Framer code component `RiveTile` on top: `<canvas>` 100% x 100% inside a div (radius 8, `overflow:hidden`, the ground image as `background-image: cover`). It loads `@rive-app/webgl2@2.43.1` from jsDelivr and plays a `.riv` file (e.g. `framerusercontent.com/assets/JDyldg5WyAXzsJBfaxHfQFieBuQ.riv`, artboard per page such as "01 Control", state machine e.g. "Coach Tile", `Fit.Contain`, centred). Behaviour: it lazy-inits when within 300px of the viewport, **plays when ≥60% visible, pauses when <25%, and resets/replays on re-entry**, with a reduced-motion boolean. This is a content animation, so **rebuild as a static placeholder image** (optionally a looping placeholder video). Note: the Rive canvas crashed headless Chromium, so the animation frames could not be inspected.

Motion: none (no appear or scroll effects on the hero; only the buttons' homepage hover).

### T1.2 Logo ticker (VARIANT of homepage Proof marquee → extract `LogoMarquee`)
- Wrapper: flex column, padding `32px 89px` (1440, 1280), `32px` (1000), `32px 20px` (390). Total height 196 at all widths.
- Card (`Variant 1`): width **1200** (1440), 1102 (1280), 936 (1000), 350 (390); height **132**; radius 16; bg `rgba(255,255,255,.4)`; 1px solid `rgba(0,0,0,.1)` border (Framer `data-border`); inner `section` padding 10 with `mask-image: linear-gradient(to right, transparent 0%, #000 17%, #000 83%, transparent 100%)`.
- Track: 3 cloned `Logo-Stack` rows, each **2333px** wide (11 logos, gap **96**, logo heights 23–45px, `object-fit: cover/contain`) → placeholder marks. Speed measured **50.8 px/s** leftward (−90.8 → −192.5px over 2.0s), linear, infinite. **No reveal animation** here, unlike the homepage xl strip. healthcare uses a different logo set (health brands), same geometry.
- /product uses the same ticker with the homepage's 4140px stack (identical to the homepage).

### P1 / T1.3 `ProseSection`, the "Tools Section" prose block (NEW shared primitive)
Used by T1.3 (H2 + rich text), T1.8 Related Reading (H3 + link list), T1.9 FAQ (H2 + Q/A list), and identically on T2 pages.

Geometry
| | 1440 | 1280 | 1000 | 390 |
|---|---|---|---|---|
| `section` | max-w **1200**, centred (x 120), padding **`60px 80px`**, column gap **48**, `overflow:clip` | same (x 40, still 1200 wide; container is `min(1200, 100vw−80)`) | w 1000, padding `60px 80px` (Tools/Related) / `60px 32px` (FAQ) | Tools + Related keep **`60px 80px` → 230px text column** (live quirk; it really renders this narrow); FAQ uses `60px 20px` (350 column) |
| content column (`Tools Content` / `FAQ Items` / `Related Content`) | 1040 wide, column gap **40** between items | 1040 | 840 / 936 | 230 / 350 |
| item (`FAQ Item`) | column gap **12** (H3 → body) | | | |

Typography
| role | 1440 | 1280 | 1000 | 390 | colour |
|---|---|---|---|---|---|
| H2 | Cirka **75/72** ls −3px, left | 58/58 −2.32 | 48/50 −1.92 | 40/40 −1.6 | #000 |
| H3 (sub-block / question) | Ginto Regular **32/32** ls −1.28px | 32/32 | 32/32 | 32/32 | #000 |
| body p / li | Ginto Regular **20/26** | 18/23.4 | 18/23.4 | 16/20.8 | **#808080** (rgb 128,128,128) |
| `strong` inline | same family at `font-weight:700` (faux-bold on "ABC Ginto Regular"; use your sans 700) | | | | #808080 |
| link `a` | same size, `#4348DC`, no underline; hover `#5F63D9` | | | | |

Rich-text rules (measured on the 1440 Tools block):
- Paragraph spacing between blocks (p→ul, ul→p, p→h3 inside a rich-text container) = **20px** at every width (`ul` has `margin-top:20px`).
- `ul`: `list-style: disc outside`, `padding-left:0`. Each `li` has `padding-left: 24.76px` at 20px text (≈1.24em → 22px @18, 20px @16), so the text starts 25px in; marker `#808080`, 20px.
- No `li` vertical spacing; the line-height alone separates items.
- Typical content: intro p (≈110–310 chars) → bullet list of 3–4 items (≈110–210 chars each, ending in a link) → bold lead-in p ("other vendors…", ≈40 chars) → bullet list of 2 → closing p with 2–4 inline links → **H3** "how do X compare" → bullet list of 6–7 "**Label:** A: … B: … C: …" comparison rows (≈90–205 chars each) → "Sources" paragraph with 8–12 inline links (≈225 chars, 2 lines).
- Industry pages call the sub-blocks `Tools Body` / `Tools Table`. They're the same visuals, just a third bullet list of "**Question?** … **Kestrel:** …" rows.

T1.8 Related Reading: same shell; one item = H3 (≈44 chars, 1 line @1440; 4 lines @390) + bulleted list of 4–5 links (≈45–63 chars each, 1 line @1440). Section height 268 @1440.
T1.9 FAQ list: H2 (≈58 chars, 2 lines @1440) + 6–7 items (H3 ≈41–67 chars 1 line @1440 / 3 lines @390; answer p ≈180–380 chars, 2–4 lines @1440, 9 lines @390). **Static**: no accordion, no hover. A JSON-LD FAQPage `<script>` mirrors it (SEO, optional).

Motion: none.

### P2 / T1.4 Centred H2 band (NEW, `SectionHeading` variant "band")
- Full-width (1440) block, bg #fff, column, padding **`80px 168.5px 35px`** @1440 (content 1103), `80px 32px 35px` @1280 and 1000, `80px 20px 35px` @390.
- H2 **Ginto Regular** (not Cirka) **64/77** ls −2.56px @1440/1280, **42/50** −1.68 @1000, **32/38** −1.28 @390; #000; centred. ≈44 chars → 2 lines @1440 (1103 wide), 1 line @1280/1000, 2 lines @390. Heights 269 / 192 / 165 / 191.
- Motion: none.

### P3 / T1.5 Alternating feature rows (NEW, `FeatureRows`)
Geometry
| | 1440 / 1280 | 1000 | 390 |
|---|---|---|---|
| `Section` | max-w 1200, padding **`60px 80px`**, column gap **82** between rows, items centred | rows become separate blocks 936 wide at x 32 (vertical gap 82) | padding `60px 20px`, gap 82 |
| row | 1040 wide, flex **row**, align center; image-left rows gap **48**, image-right rows gap **95** | **column**, gap **32**, **image first** | column, gap 32, image first |
| image box | **472x472**, radius **8** (image-left) / **6** (image-right), `object-fit: cover` | 936x936 | 350x350 |
| text column | 520 wide (image-left) / 473 (image-right), column gap **16**, vertically centred | 936 | 350 |
| row height | 472 | 1097 | 617–628 |

Text column
| role | 1440 | 1280 | 1000 | 390 | colour |
|---|---|---|---|---|---|
| eyebrow (optional) | Ginto Regular 14/18 | 13/18 | 13/18 | 13/14.3 | **#9C9C96** (rgb 156,156,150) |
| H3 | Ginto Regular 32/32 ls −1.28 | same | same (1 line in 936) | same | #000 |
| body | Ginto Regular 20/26 | 18/23.4 | 18/23.4 | 16/20.8 | #808080 |
Content: eyebrow ≈11–15 chars (gist "agent name"); H3 ≈37–57 chars (2 lines @1440); body ≈195–215 chars (4–5 lines @1440).
Images: 1:1 product-UI screenshots on a pale lavender gradient card with a thin grey frame baked into the image (`framerusercontent.com/images/S1W5VcYdGlLxZjzrtXGCTOZgzU.jpg`, `HwxpstCZXqD2KyKH8zt8AWW0P7U.jpg`, `7oV1DwJdZp9AVmIQUsTXWJMZTE.jpg`, 2400² sources) → brand/content placeholders.
Hover/motion: none.

### T1.6 Story slideshow "Variant 3" (VARIANT of `Stories`)
Section: bg #fff, column, gap **80**, padding **`102px 32px`**; height 737 @1440, 727 @1280, 1071 @1000, 1054 @390.
- H2: Cirka **60/60** ls −2.4px @1440, 50/50 −2 @1280, 40/40 −1.6 @1000, **40/36** −1.6 @390, #000, centred; ≈41–48 chars, 1 line (2 @390).
- Desktop (≥1200): `Slideshow-Container` max-w 1200, column gap **70** (slides → pager). Visible slot **956x393** centred (x 242 @1440). Track gap **48** → step **1004px**. 4 stories × 4 clones = 16 slides.
  - Active card (`Flex`): 956x393, row gap **16**, radius 16, shadow `1px 3px 30px rgba(0,0,0,0)` (transparent). Photo `customer-image` **303x320** radius 16 `object-fit:cover` (content → placeholder). Quote panel (`Hero Container`) **637x321**, padding **16**, radius 16, bg **tint** (pink `#FEEAFC` on ai-agents and financial services; peach `#FCEDE8` on healthcare); inner `Content` padding 8, `justify-content: space-between`.
    - Quote: Cirka **40/36** ls −1.6px, colour = tint-dark (`#400B39` pink / `#3B1208` peach), ≈77–135 chars, 2–4 lines in 589. 1280: 36/36 −1.44.
    - "See customer story" pill button (gap 16 below quote): outer 195x50, padding 2, radius 50, bg tint-dark; inner 191x46, padding `16px 24px`, radius 50, bg tint; label Ginto Medium 14/14 tint-dark, gap 4, arrow icon 13x13 (CSS mask of an SVG arrow, filled tint-dark). **Hover**: arrow grows 13→18px and rotates −45° (same behaviour as the announcement pill arrow); nothing else changes.
    - Footer row (align end, gap 8): name Ginto Medium 20/25 #000 (≈11–16 chars) over role Ginto Regular 20/26 `rgba(0,0,0,.75)` (≈18–44 chars, 1–2 lines), column 342 wide; customer logo right-aligned in a 239x28 box (content → placeholder). 1280: 18/25 and 18/23.4.
  - Inactive slides: same card at `scale(.9)` (visual 860x354), photo 273x288.
  - Pager: pill **108x36**, bg `rgba(229,229,229,.4)`, radius 50, centred under the slot (70px gap); 4 dot buttons exactly like the homepage stories pager (padding `12px 6px`, first `12px 6px 12px 12px`, last `12px 12px 12px 6px`, dot 12x12 radius 50% `#FF29E5`, inactive opacity .2). Prev/next arrow buttons exist but are 0x0 (hidden).
  - Motion (measured): autoplay every **5.0s** (advances at t≈4.75s and 9.76s after entering view), slide −1004px, transform ≈ 950px of the move done in 380ms, settled by ≈600ms (expo-out, same as homepage: `ease:[0.16,1,0.3,1], duration:.6`); dot opacity crossfades over the same ≈400ms; infinite loop through clones.
- Tablet + phone (<1200): **no slider**. One static card `Flex / Mobile`: column gap 16, max-w **370** (370 wide @1000, 326 @390), radius 16. Photo 370x391 (326x345) radius 16, then quote panel (padding 16, inner padding 8, column gap **42**): quote Cirka **36/36** ls −1.44 **#000**, 4 lines; button as desktop; name Ginto Medium **16/16** #000 and role Ginto Regular 18/23.4 (1000) or 16/20.8 (390) `rgba(0,0,0,.75)`; logo 111–129 wide right.

### T1.7 Callout row (VARIANT of `FeatureRows`)
- Same `Section` shell as T1.5 with **one** row (image-left 472², radius 8; text 520 column gap 16): H3 (≈44 chars, 2 lines) + body (≈204 chars, 4 lines) + `Button` dark lg ("demo"). Height 592 @1440/1280, 1241 @1000 (stacked, padding `60px 32px`), 720 @390 (padding `60px 32px`, image 326²).
- Image here is an illustration of channel tiles (content → placeholder) or a Rive tile (healthcare).

### T1.7b Healthcare event block + inline demo form (NEW, healthcare only)
Appended inside the callout `Section` (row 2, y+614 @1440): row 1040x548, gap **47**, max-w 1200, centred.
- Left column 475 wide, column gap **27**: H3 Ginto Regular 32/32 (≈40 chars, 2 lines) → p Ginto Regular **16/22.4 #000** (≈144 chars, 3 lines) → list of 4 benefit lines (column gap **24**, each 16/22.4 #000 with a **bold lead-in**, ≈87–161 chars, 2–3 lines).
- Right card 519x548: bg `rgba(255,255,255,.84)`, radius 16, padding 22, `overflow:clip`. Header (padding 20): Cirka **700 24/23** ls −0.48 #0D0D0D (≈45 chars, 1 line). `form` (padding 20, column gap 20): this is the shared form primitive P5 (see T6): first/last name pair (2 × 212 wide, gap 10), email, CX-team-size select, "how did you hear" input, submit button 109x34 (bg #0D0D0D, radius 450, padding `8px 24px`, Ginto Medium 14/18 #FBFBFB "Submit →"). Field labels here are **Cirka 700 16/22.4 #000** (or 16/19.2 #0D0D0D). Inputs: 40px tall, bg #FAFAFA, radius 8, padding 12; the email input is 44px tall, radius 10, 1px `rgba(136,136,136,.6)` border. Don't submit.

### T1 hover/motion summary
- No scroll reveals, no parallax, no sticky elements (other than the fixed Nav).
- Loops: logo ticker (50px/s), story slideshow (5s), hero video loop / Rive.
- Hovers: buttons (homepage), rich-text links (#4348DC → #5F63D9), story pill arrow (grow + rotate −45°).

**Phone-padding note for P1:** the 230px phone column (padding stays `60px 80px`) shows up on T1 pages and /product/voice. /product and /product/coach use `60px 20px` at 390 and `60px 32px` at 1000. Make the phone padding a prop (`phonePad: 80 | 20`) so each page matches.

---

## T2. Product Landing pages (/product, /product/coach, /product/voice)

Screenshots: `recon/pages/product-landing/{product,coach,voice}-{1440,390}.png`. Doc heights @1440: /product 11824, /coach 11965, /voice 9382 (@390: 15606 / 15780 / 12445).

### Section order
- **/product**: T2.1 Centred hero + logo ticker (0–933) → P1 Tools prose (933–2047) → T2.3 Channel carousel (2159–3094) → T2.4 600² feature rows ×5 (3186–6546, rows 92px apart) → T2.5 Integration orbit (6658–7292) → T1.6 story slideshow, **split-card** variant (7292–8029) → P1 Related (8029–8323) → P1 FAQ (8323–9515) → T2.6 Blog grid (9515–10091) → Footer.
- **/product/coach**: T2.1 Centred hero + **custom video player** + buttons + "trusted by" line + logo ticker (0–1760) → P1 Tools (1760–2932) → T2.7 Coach bento stack (2932–8702) → P1 Related → P1 FAQ → Footer.
- **/product/voice**: T2.1 Centred hero over the **homepage Unicorn bg** + full-width video player + "supporting" line + logo ticker (0–1882) → P1 Tools (1882–3054) → T2.3 principles carousel, `Rectangle` cards (3054–3941) → T2.8 Split explainer (3941–5168) → T2.9 Case-study card (5168–5974) → P1 Related → P1 FAQ → Footer.

### Reuse table (T2)
| Section | Class | Note |
|---|---|---|
| Nav, Footer | (a) IDENTICAL | |
| T2.1 Centred hero | (b) VARIANT of `Hero` headline block (homepage §6 `Hero-Headline`) | Same H1 scale (96/96 → 77/77 → 58/58 → 40/40) and CTA row; no announcement pill, no photo stage. Sub text varies per page (see below). Add a `variant="simple"` to `Hero` or extract `HeroHeadline`. |
| Logo ticker | (b) `LogoMarquee` (see T1.2) | /product: 1184 wide inside `Logo Wall` (padding `46px 64px 25px`); /coach and /voice: 1338 wide, preceded by a Cirka 30/30 ls −1.2 centred line (≈18–39 chars, gist "trusted by leaders"; 24/24 on phone). Stack = homepage 4140px set. |
| Tools / Related / FAQ | (a) P1 `ProseSection` | /product + /coach call items `Tools Item` / `Related Item`, same visuals |
| T2.3 Channel / principles carousel | (c) NEW `CardCarousel` | |
| T2.4 600² feature rows | (b) VARIANT of P3 `FeatureRows` | image 600x600 radius 12, no row gap, H2 Ginto 38/42, button per row |
| T2.5 Integration orbit | (c) NEW `IntegrationOrbit` (also used by T3 hero at 818px) | |
| Story slideshow | (b) VARIANT of T1.6 (`card="split"`) | |
| T2.6 Blog grid | (c) NEW `BlogGrid` | |
| T2.7 Coach bento sections | (c) NEW `BentoPanel` + `QuoteCard` + `CtaBanner` | |
| T2.8 / T2.9 voice sections | (c) NEW (`SplitExplainer`, `CaseStudyCard`) | |
| Video players (coach, voice) | (c) NEW `VideoFrame` | third-party-like custom player |
| Voice hero Unicorn bg | (a) IDENTICAL to homepage Hero-Unicorn-Bg | same scene `J5C0FAXaLaMB50hSmhfH`, 2023x1299 at x −291 / y 122, mask `linear-gradient(180deg,#000 66%,transparent 84%)`, **static** (no scroll transform on /voice; checked scrollY 0–900) |

### T2.1 Centred hero (VARIANT of homepage Hero headline)
| | /product | /coach | /voice |
|---|---|---|---|
| wrapper padding @1440 | `180px 64px 0` (Header block padding-bottom 80, gap 100) | `0 50px 90px 52px`, inner `Hero` padding `160px 32px 0`, column gap 62 between hero/video/buttons/ticker | same as /coach with `0 50px 60px 52px` |
| H1 | Cirka 96/96 −3.84, ≈48 chars, 2 lines in 1312 | ≈10 chars, 1 line | ≈43 chars, 2 lines in 850 (max-w **850**) |
| sub | Ginto Regular 24/30 −0.48 **#000**, max-w **80%** (1050), ≈513 chars, 6 lines | Ginto Regular **20/26 #333**, max-w **700**, 2 paragraphs (≈293 + ≈420 chars, 4 + 7 lines), gap 40 to the video | `Subheading` 24/30 −0.48 #000 (≈153, 2 lines) + `Intro` **20/26 #1A1A1A** (≈513, 6 lines), column gap **37** |
| buttons | Main lg + Outline lg, gap 12, 32 below text | below the video | below the text |
| @1280 | H1 77/77; sub 19/23 −0.38, 909 wide, 5 lines | | |
| @1000 | H1 58/58 in 800 (max-w 800) | | |
| @390 | H1 40/40, 3 lines in 350; padding 180 20 | H1 40/40; sub 16/20.8 #333 7 lines | H1 40/40 in 302; sub 14/17 −0.28; intro 16/20.8 #1A1A1A 13 lines |

### `VideoFrame` (coach + voice)
- /coach: 1200x628 (@1440), white bg, **4px solid #F7F7F7** border, radius **12**, shadow `0 4px 24px rgba(0,0,0,.12)`; `<video>` mux `.../highest.mp4`, controls bar visible at rest: 1160x60 at bottom inset 16, padding `12px 16px`, radius 12, `backdrop-filter: blur(8px)`, shadow `0 2px 12px rgba(0,0,0,.2)`; 36x36 icon buttons (padding 6, radius 8) play/mute left, time label `system-ui 500 14px` ls .14px **#5100FF** ("0:00 / 1:11"), fullscreen right.
- /voice: 1338x753, radius 12, same shadow, **autoplay muted loop** (mux `.../1080p.mp4`, poster 5120w jpg); controls bar (Pause / Unmute / Fullscreen buttons) at **opacity 0** while playing and stays hidden on hover (`transition: opacity .3s`).
- Phone: 342x192 (coach), 350x197 (voice), 16:9.
- Content: product/brand videos → use a placeholder video/poster.

### T2.3 `CardCarousel` (channels on /product, principles on /voice): NEW
- Section (`Testimonial / 34 /`): bg #fff, column gap **80**, padding `0 0 102px` (/product, max-w 1200) or `102px 0 102px 32px` (/voice, full-bleed right, max-w 1440).
- Heading block (column gap 16): /product H2 **Ginto Regular 64/77 −2.56 centred** (≈37 chars, 1 line) + sub Ginto Regular 20/26 `rgba(0,0,0,.75)` centred (≈125 chars, 1 line). /voice H2 **Cirka 60/60 −2.4 left** (≈52 chars) + sub left. Phone: 32/38 Ginto or Cirka 40/36.
- Track: Framer Carousel = native horizontal scroller `ul` (`overflow-x:auto`, **`scroll-snap-type: x mandatory`, items `scroll-snap-align: center`**), gap **32**, `mask-image: linear-gradient(to right, #000 0%, #000 15%, #000 85%, transparent 100%)` (right-edge fade only). 5 cards, scrollWidth 1788 in a 1408 viewport (/voice).
- Card (`Square` / `Rectangle`): 332 wide, column gap 24, `overflow:hidden`. Image 332x**332** (/product) or 332x**217** (/voice), radius **18**, cover (content, abstract UI art → placeholder). Content column gap 27.79: title Cirka **40/36 −1.6 #0D0D0D** (≈3–13 chars; 36/36 @1280 and below) → subtitle Ginto Regular **24/24 −0.96 #000** (≈28–39 chars, 1–2 lines; 14/17 on phone) → 3 bullet lines, column gap 8, each Ginto Regular 16/22.4 #000 with a **bold lead verb** (≈40–95 chars, 1–3 lines; 14/19.6 phone).
- Arrows: absolutely positioned `fieldset` (padding 18, space-between, vertically centred on the track): 40x40 buttons, bg #000, radius 110, white chevron SVG (`framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg` prev / `11KSGbIZoRSg4pjdnUoif6MKHI.svg` next). Prev is opacity 0 at the start and next is opacity 0 at the end. No hover change measured (cursor pointer only).
- Motion: clicking next smooth-scrolls the track to the next snap point (0 → 380px: 85px @97ms, 344 @220ms, settled ≈390ms, ease-out). Drag/swipe is native scroll. No autoplay. Cards have no hover.

### T2.4 600² feature rows (/product, VARIANT of P3)
- 5 rows (`Container`), each 1200x600 (@1440) row, no gap between image and text, max-w 1200, consecutive rows 92px apart; image side alternates (text-left first).
- Image 600x600, radius **12**, cover (product UI screenshot → placeholder).
- Text column (`Tabs Menu > Tab Horizontal`) 600 wide, padding `32px 48px 32px 0` (text left) / `32px 0 32px 48px` (text right), radius 12, column gap 25: H2 **Ginto Regular 38/42 ls −1.52 #000** (≈41–54 chars, 2 lines) → body Ginto Regular 20/26 #808080 (≈118–395 chars, 3–7 lines; one row uses 2 paragraphs) → `Button` dark lg (label ≈10–13 chars), 25px below.
- 1280: 576/1152 wide, body 18/23.4. 1000: stacked, image 936², text below. 390: stacked, image 350², H2 stays 38/42 (3–4 lines in 326), text column padding top 24.

### T2.5 `IntegrationOrbit` (NEW; /product at 474px, /integrations hero at 818px, phone 338px)
- /product section: padding `80px 64px`, row gap **225**, max-w 1200: orbit 474x474 left, text right (501 wide, column gap 25): H2 Ginto Regular 38/42 −1.52 **#333** (≈33 chars, 2 lines) → p 20/26 #808080 (≈181 chars, 4 lines, max-w 793) → `Button` dark lg with arrow (264 wide, ≈33 chars), gap 18. Phone: orbit on top (338²), text centred below.
- Orbit composition (474 version; the 818 version scales every value ×1.726):
  - `Ellipse 1143` 474² `rgba(255,195,248,.5)`, radius 57.94%, **`filter: blur(64px)`** (pink glow; 818 version blur 111px, radius 100%).
  - Glass rings: `Ellipse 1142` 388², `Ellipse 1139` 424², `Ellipse 1140` ≈300², `Ellipse 1141` 121² (centre): each bg `rgba(255,255,255,.4)`, radius 57.94%, **`backdrop-filter: blur(64px)`**. Thin grey ring outlines are visible in the screenshot.
  - 12 integration tiles 32–34px (56–58px in the 818 version): white, radius 4.11 (7.08), shadow `0 1.02px 9.44px rgba(0,0,0,.15), 0 0 2.36px rgba(0,0,0,.15)`, logo 17–26px inside (third-party logos → placeholders); each links to `/integrations/<slug>`.
  - Centre: brand mark 36x46 (placeholder).
- **Motion (loop)**: the ring groups rotate continuously at **±8.04°/s (≈44.8s per turn), linear, infinite**, with adjacent rings in opposite directions. Tiles ride with their ring (their own transform rotates by the same rate). Tile hover: no visual change measured (rotation just continues).

### T2.6 `BlogGrid` (/product only): NEW
- Section padding `48px 64px` (`48px 20px` phone), max-w 1200, column gap 16: 2px top rule `#F0F0F0` → H2 Ginto Regular **64/77 −2.56** #000 left (32/38 phone) → 3-col grid (`378.66px ×3`, gap **32**; 362.66 @1280; 1 col on phone) → centred `Button` light lg ("view all →", 153 wide).
- Card (`a`, column gap 24): image 379x199 (≈1.9:1), radius 8, cover (blog cover art → placeholder); title Ginto Regular **24/24 −0.96** #000 (≈60–75 chars, 2–3 lines); meta row padding-top 24, gap 8: date Ginto Regular 16/16 −0.32 (14/14 @1280) + 4px dot `#17171C` radius 9999 + read time 16/16. Hover: not measured.

### T2.7 Coach bento stack (/coach): NEW
Wrapper padding `0 64px 20px`, inner max-w 1200, column gap 64, made of these blocks:
1. **Header + `BentoPanel` (tabs-bottom)**: block padding-top 50, column gap 42. Header (column gap 12): H2 **Cirka 75/72 −3 left** (≈19–40 chars, 1 line; 40/40 phone) + p Ginto Regular 20/26 **#666**, max-w ≈672–828 (2–3 lines). Panel: bg **#F2F2F2**, radius **24**, 1200x812: top image 1200x549 (product UI on lavender gradient → placeholder), then 3 equal columns (400 wide, padding 32, column gap 25): H3 Ginto 32/32 −1.28 (≈26–50 chars, 2–3 lines) + p 20/26 #808080 (≈90–103 chars, 3 lines). Phone: panel 350 wide, columns stack (H3 in 302).
2. **`QuoteCard`**: row gap 16, padding-top 50: photo 335x335 radius 16 (person → placeholder) + text card 849x335, bg #F2F2F2, radius 16, padding 24, `backdrop-filter: blur(39.6px)`: quote `h5` **Cirka 30/30 −1.2 #000** (≈389 chars, 6 lines) with an inline **`<mark>` highlight bg `#D7D5F1`** over ≈183 chars; footer row: name Ginto Medium 20/25 #1C1C1C + role Ginto Regular 20/26 #1C1C1C, customer logo 128x36 right. Phone: stacked, photo 350², quote 24/24 (12 lines).
3. **`BentoPanel` (split)**: header as in 1, then panel #F2F2F2 radius 24, row: media 600x671 or 600x600 (muted looping mux video, `autoplay` attr false, so it plays via Framer's in-view player; poster jpg/png) + `Tabs Menu` 600 wide (padding `24px 0`) with 3 stacked items (padding 32, column gap 25): H3 32/32 + p 20/26 #808080 (≈80–220 chars). Two of these, media left then right.
4. **`CtaBanner`**: 1200x205, bg **#4348DC**, radius 16, padding 24: H3 **Cirka 60/60 −2.4 #FFF** (≈16 chars) top-left; `Button` dark lg ("see demo") bottom-right. Phone 350x159, H3 40/36.
5. Two more header + `BentoPanel` blocks (analytics chart image; tabs-left/media-right with an animated list image).

### T2.8 Split explainer (/voice): NEW
- Section (`Layout / 105 /`): padding `112px 32px`, max-w 1440, column gap 80. Header centred (gap 46 to button): H2 Cirka 60/60 −2.4 (≈65 chars, 2 lines) + sub 20/26 `rgba(0,0,0,.75)` (≈33 chars) + `Button` dark lg.
- Body row gap **80**: image 648x673 radius 12 (yellow phone UI mock on grey → placeholder) + text column 648 (column gap 27): 3 paragraphs Ginto Regular **24/30 −0.48 #000** (≈195 / 56 / 60 chars). Phone: stacked, paragraphs 14/17 −0.28.

### T2.9 Case-study card (/voice): NEW
- Section as T2.8 (header: H2 Cirka 60/60 ≈46 chars + sub ≈26 chars). Card 1376x400, bg **#FBFBFB**, radius 12, **1px solid #000** border (Framer `--border-color:#000`), `overflow:hidden`: image 640x400 (co-branded photo → placeholder) + content 736 wide, padding 48, column gap 32: H3 **Cirka 40/36** (≈67 chars, 2 lines) → p Ginto Regular 16/22.4 #000 (≈297 chars, 4 lines, contains an inline #4348DC link) → `Button` dark lg. Phone: stacked 350x662, H3 36/36 (4 lines), body 14/19.6.

### T2 motion summary
- No scroll reveals. Loops: logo ticker 50px/s, orbit ±8.04°/s, story slideshow 5s, voice video autoplay, voice Unicorn bg (WebGL).
- Interactions: carousel arrows (smooth snap scroll ≈390ms), buttons and links as homepage/T1.

---

## T3. Integrations Library (/integrations)

Screenshots: `recon/pages/integrations-library/integrations-{1440,390}.png`. Doc height 8204 @1440, 7811 @1280, 8291 @1000, 11604 @390.

Section order: T3.1 hero + orbit (0–1458) → T3.2 "trusted by" + logo ticker (1458–1707) → T3.3 filterable integration catalogue (1707–4372) → T3.4 "setup" prose + FAQ (4372–6350) → Footer.

| Section | Class | Note |
|---|---|---|
| T3.1 hero text | (b) VARIANT of homepage `Hero` headline | H1 Cirka 96/96 (77 @1280, 58 @1000, 40 @390) + sub Ginto Regular **24/30 −0.48 #333**, max-w **793** (19/23 −0.38 @1280; 14/17 −0.28 @390): the exact homepage hero-sub tokens. One `Button` dark lg with arrow (264x42, ≈33 chars). Hero padding `180px 64px 80px` (`180px 32px 80px` 1280/1000, `180px 20px 80px` 390), column gap 96. |
| T3.1 orbit | (a) `IntegrationOrbit` (T2.5) at **818x818** (338 phone) | same ±8.04°/s loop |
| T3.2 ticker | (b) `LogoMarquee` | heading Cirka 30/30 −1.2 centred (≈68 chars, 1 line); wrapper padding `0 20px 63px`, gap 24; card **1400**x132 @1440 (1240 @1280, 960 @1000); phone = two opposing tickers 350x108 (exactly the homepage phone variant) |
| T3.3 catalogue | (c) NEW `IntegrationCatalog` + shared `IntegrationCard` (P4) | |
| T3.4 setup + FAQ | (b) VARIANT of P1 `ProseSection` | full 1200 width (wrapper padding `120px 64px 0`), H2 Cirka 75/72 (58 @1280, 48/50 @1000, 40/40 @390) + intro p 20/26 #808080; 5 steps (H3 32/32 + p) gap 40; 2 support paragraphs; then FAQ H2 + 3 Q/A, padding-top 32 |

### T3.3 `IntegrationCatalog` (NEW)
Layout @1440: wrapper padding `70px 64px 0`; inner row (`All`) 1200 wide, gap **32**.
- **Sidebar** (25% = 300 wide, padding-right 16, column gap 42), **`position: sticky; top: 140px`**:
  - count line: "NN" + "Integrations" Ginto Regular 16/22.4 #000 (≈2 + 12 chars).
  - "Category" label 16/22.4 #000, then 4 filter items (column gap 8): 284x42, padding `10px 8px`, radius **8**, label Ginto Regular 16/22.4 **#666**.
  - States: hover bg **#E0E0E0** and label #000; active (selected) label #000 and bg **#CCCCCC** (measured while hovered); default bg transparent.
  - Behaviour: clicking an item **filters** the list to that one category (other category blocks unmount). The count text changed to "0 Integrations" on live, which looks like a live bug, so show the real count. Clicking the active item again isn't measured. There's no scroll-spy.
- **List** (868 wide, column gap **56** between categories): each category block (column gap 32):
  - header (gap 8): H2 **Cirka 30/30 −1.2** #000 left (≈9–17 chars; 28/28 @1280, 26/26 @1000, 24/24 @390) + description Ginto Regular **16/22.4 #8A8A8A** (≈120–500 chars, 2–5 lines; 14/19.6 @1000/390).
  - grid: 2 columns **421px** each, gap **20**, with a 3px transparent border (fluid; 455 @1000, 1 column @390).
  - 4 blocks: Ticketing (12 cards), Telephony (5), Knowledge base (4), Tools & actions (6).
- **On-load appear** (Framer appear, runs once at hydration, not on scroll): category blocks `opacity .001 → 1`, spring `{duration .8 (Ticketing) / .6 (Telephony, Knowledge base), bounce 0}`, delay 0. Tools & actions has no appear.
- Tablet (1000): sidebar becomes a top bar (count line, then "Category" + 4 chips 235x40, gap 10, in a row that overflows and is clipped at 1084 > 936 wide: a live quirk); list full width 936.
- Phone (390): no filter UI, only the count line; 1-column cards (344 wide).

### P4 `IntegrationCard` (NEW shared, used by T3.3 and T4 "Other apps")
- `a` row, gap **16**, padding **`16px 24px 16px 16px`**, bg **#F7F7F7**, radius **16**, shadow `0 3px 30px rgba(0,0,0,0)`, height 102 (2-line desc) / 84 (1-line).
- Logo 36x36 `object-fit: contain` (third-party logo → placeholder tile).
- Text column (gap 8, `overflow:clip`): name Ginto Regular **20/26 `rgba(0,0,0,.75)`** (≈5–20 chars) + description Ginto Regular **14/18 #000**, clamped to **2 lines** (36px box with overflow clip and ellipsis, ≈55–105 chars). Phone: name 16/20.8, desc 13/14.3.
- **Hover**: bg #F7F7F7 → **#EEEEEE** (instant/Framer tween, ≈200ms). No transform.
- Links to `/integrations/<slug>`.

---

## T4. Integration Detail (/integrations/lorikeet-api, /integrations/mcp)

Screenshots: `recon/pages/integration-detail/lorikeet-api-{1440,390}.png`. Heights @1440: 3085 (api) / 2971 (mcp); @390 4857.

| Section | Class | Note |
|---|---|---|
| Nav / Footer | (a) | |
| Back link + title block | (c) NEW `DetailHeader` | |
| Body + sticky side card | (c) NEW `DetailBody` + `MetaCard` | body headings reuse P1 typography (Ginto 28/32 variant) |
| "Other apps" grid | (b) VARIANT of T3.3 category block | 2 columns 587 wide, gap 20, cards = P4; H2+H3 inline in one row |

Layout @1440: wrapper padding `120px 64px 0`; `Frame` max-w 1200, bg #fff, column gap **40**.
- **Back link** (`a`, row gap 10): 32x11 left-arrow SVG + "Back" Ginto Regular 16/22.4 **#666** (14/19.6 phone). Links to /integrations.
- **Title block** (column gap 10): row gap 10: icon tile **52x52** white, radius **12**, padding `12.05px 15.07px` (28x28 logo; content → placeholder) + H1 **Cirka 60/60 −2.4** (≈3–12 chars; 50/50 @1280, 40/40 @1000, **40/36** @390). Lede Ginto Regular 20/26 **#666** (≈80 chars, 1 line; 18/23.4 @1280/1000; 16/20.8 @390, 2 lines). On phone a "Category: <name>" line (13/14.3, label #000 + value #666, gap 4) is added below, because the side card is hidden.
- **Body row** gap **66**: `main` 834 wide (754 @1280, full width ≤1199), column gap 30.45, 3 blocks (column gap 12): H2/H3 **Ginto Regular 28/32 ls −1.12** #000 ("overview", "what it is", "how to integrate") + p Ginto Regular 20/26 **`rgba(0,0,0,.75)`** (≈316–595 chars, 4–7 lines; 18/23.4 @1280/1000; 16/20.8 @390).
- **`MetaCard`** (`Role`): 300 wide, padding 28, column gap 28, bg **#FBFBFB**, radius **16**, 1px solid border (Framer token, fallback `#CCCCCC`), **`position: sticky; top: 120px`**. Content: two label/value pairs (gap 14): label Ginto Regular 14/18 #000 ("Website", "Category"), value 14/18 #666 (website value is a link with a 4px gap external-link icon); then a full-width black pill button 244x39: bg #000, radius 349, padding 12, label **Inter 600 14/15.4 ls −0.56 #FFF** ("Get a demo"). Hidden at ≤1199 (tablet keeps the body full width with no card).
- **Other apps** (`Knowledge base`): padding-top 40, column gap 32; header row gap 6: H2 "Other apps" + H3 category name, both **Cirka 30/30 −1.2** (28/28 @1280, 26/26 @1000, 24/24 @390); grid 2×587 (1 col phone), 4 `IntegrationCard`s. **Appear**: opacity .001 → 1, spring `{duration .6, bounce 0}` on load.
- mcp differs only in copy length (body 583 vs 661 tall).

---

## T5. Pricing (/pricing)

Screenshots: `recon/pages/pricing/pricing-{1440,390}.png` (sticky compare header repeats at segment seams). Height 4798 @1440, 4660 @1280, 6330 @1000, 7582 @390.

| Section | Class | Note |
|---|---|---|
| Nav / Footer | (a) | |
| T5.1 Title + statement | (c) NEW (simple) | |
| T5.2 Plan cards | (c) NEW `PricingCard` (P6) inside `RuledFrame` | buttons = `Button` dark lg stretched to full width (349 wide) |
| T5.3 Compare table | (c) NEW `CompareTable` + `AccordionBand` | |
| T5.4 FAQ accordion | (c) NEW `FaqAccordion` (P7) | |

### T5.1 Hero
- Padding `140px 48px 60px` (1440/1280), `88px 24px 56px` (1000), `72px 20px 48px` (390). `Hero wrapper` max-w 1280, padding `0 40px`, row `space-between` (column on ≤1199, gap 20; phone padding-top 60).
- H1 "Pricing" Cirka **75/72 −3** (58/58 @1280, 48/50 @1000, 40/40 @390).
- Statement: max-w **517**, Ginto Regular **20/26 #000** (≈372 chars, 7 lines; 16/20.8 9 lines on phone).

### T5.2 `RuledFrame` + plans
- `Ruled` wrapper padding `0 48px` (0 on phone); `Inner` max-w 1280 with a 1px border **`rgba(24,24,24,.07)`** on all sides (Framer `::after` border); everything below sits inside this ruled frame.
- `Plans` row: padding **`32px 32px 40px`** (`32px 20px 40px` phone), bg **`radial-gradient(90% 130% at 50% 0, rgba(67,72,220,.10) 0%, rgba(223,38,254,.07) 45%, rgba(250,203,18,.05) 72%, rgba(255,255,255,0) 100%)`**. Cards sit flush with no gap (each has its own 1px rgba(24,24,24,.07) border, so the shared edges read as a ruled grid). Stacked with no gap ≤1199.
- **P6 `PricingCard`** (405x697 @1440, 373x685 @1280, 888 wide @1000, 350 @390): bg #fff, padding **`32px 28px 36px`** (`32px 24px 36px` @1000, `32px 20px 36px` phone), column:
  - plan name H2 Cirka **30/30 −1.2** (28 @1280, 26 @1000, 24 @390)
  - price row (padding-top 28, gap 10): price Cirka **60/60 −2.4** (≈6 chars; 50/50 @1280, 40/40 @1000, 40/36 @390) + "/mo" Ginto Regular 16/22.4 #666 baseline-aligned (bottom padding 12)
  - billing note (padding-top 10) Ginto Regular 14/18 #666 (≈18 chars)
  - CTA (padding-top 24): full-width `Button` dark lg (label ≈10–16 chars)
  - "best for" (padding-top 28) Ginto Regular 16/22.4 #000 (≈60–68 chars, 2 lines)
  - divider: padding `32px 0 24px`, 1px line `rgba(24,24,24,.07)`
  - 3 rate groups: group label (padding `16px 0 6px`) Ginto Regular 16/22.4 #000; rows (padding `4px 0`, gap 16, space-between): label 14/18 #666 (≈27–35 chars) + value 14/18 #000 right-aligned (≈5–6 chars). A hidden black tooltip (padding `8px 12px`, radius 8, 14px `rgba(255,255,255,.8)` text) exists per row but is empty and never shows, so skip it.
  - "view all features ↓" link (padding-top 32) Ginto Regular 14/18 #000 + 6px-gap arrow; jumps to the compare table.
- **Footnotes** row: padding `20px 40px` (`16px 20px` phone), top border 1px rgba(24,24,24,.07): left footnote Ginto Regular 14/18 #666 (≈64 chars); right an underlined link 14/18 #4348DC (≈45 chars, "machine-readable pricing").

### T5.3 `CompareTable` (NEW)
- Container top border 1px rgba(24,24,24,.07).
- **Sticky header** (`position: sticky; top: 0; z-index: 2`, bg #fff, padding-top **100**, top+bottom 1px borders): 4 columns: title column 420 (padding `32px 20px 32px 40px`, H2 **Cirka 40/36 −1.6**, ≈16 chars) + 3 plan columns 280/280/300 (padding `32px 20px`, last `32px 40px 32px 20px`, column gap 6, 1px left/right rules): plan name **Ginto Medium 16/18** #000, price **Cirka 30/30** (28 @1280, 24 @390) + "/mo" 14/18 #666, full-width `Button` dark lg (240x42).
- **Accordion bands** (7): 1280x66, padding `20px 40px`, bg **#FBFBFB**, bottom border 1px rgba(24,24,24,.07), `cursor: pointer`; label Ginto Regular **20/26 #000** (≈14–25 chars; 16/20.8 phone); right 20x20 plus/minus icon (12x12 glyph whose vertical bar collapses to 0 height when open). The first band starts open.
  - Toggle motion: panel height animates ≈**450ms**, ease-out (881→888→962 @117ms→1047 @224→1079 @333→1087 @495ms settled, i.e. ≈200px over ~450ms) → `transition: { type:'spring', duration:.45, bounce:0 }` or `ease:[0.22,1,0.36,1], duration:.45`. No hover change (bg stays #FBFBFB).
- **Rows**: bottom border 1px; `Feature` cell 420 (padding `16px 20px 16px 40px`, label Ginto Regular 14/18 #000, some underlined as glossary links); plan cells 280/280/300 (padding `16px 20px`, last `16px 40px 16px 20px`, 1px right rule): value text 14/18 #666 ("Included"), right-aligned price/value 14/18 #000, optional sub-note **Ginto Regular 11/11 ls −0.22 #666**, or a 20x20 check icon.
- ≤1199: the table becomes **horizontally scrollable** (820–940px wide inner) with a **sticky-left first column** (`position: sticky; left: 0; z-index: 3`, bg #fff, width 240 @1000 / 150 @390, padding `24px 16px 24px 24px` / `20px 12px 20px 20px`).

### T5.4 P7 `FaqAccordion` (NEW shared)
- Section (`FAQ`) 1280 wide, padding-top 100, row: title column 512 (40%, padding 40, **sticky top 120px**) with H2 "FAQs" **Cirka 40/36 −1.6** + list column 768 (padding `8px 40px 8px 0`, column gap **20**).
- H2 has a **per-letter reveal**: each glyph is its own span, initial `opacity .001, translateY(20px)`. When the title enters the viewport (bottom edge), every letter animates together to `opacity 1, y 0` over ≈**400–500ms**, ease-out (0.75 @~100ms, 0.94 @~250ms, 1.0 @~450ms). No measurable stagger. Once only.
- Item closed (`Desktop - Closed`): padding **`20px 10px`**, radius **10**, bg #fff, height 71; question **Cirka 30/30 −1.2 #000** (≈18–90 chars, 1–2 lines) + 21x21 chevron-down at right. **Hover**: bg → **#F7F7F7**.
- Item open (`Desktop - Open`): bg **#F7F7F7**, chevron rotated 180° (`matrix(-1,0,0,-1)`), answer (gap 20 below question) Ginto Regular **16/22.4 #000** (≈120–400 chars) with inline #4348DC links.
- Toggle motion: height + answer opacity animate together, ≈**600ms** (opacity .11 @0 → .51 @111ms → .85 @221 → .94 @330 → .99 @512 → 1 @681ms; height 82→135px) → `spring {duration .6, bounce 0}`.
- 10 items. JSON-LD FAQPage schema mirrors the content.

---

## T6. Get a Demo (/get-a-demo)

Screenshots: `recon/pages/get-a-demo/get-a-demo-{1440,390}.png`. Height 957 @1440, 895 @1000, 1544 @390. **No Nav, no Footer, no cookie-banner layout dependence.**

| Section | Class | Note |
|---|---|---|
| Form column | (c) NEW `DemoForm` (P5, shared with T1.7b) | "free trial" button = existing `Button` light **md** (124x34, identical) |
| Art column + quote card | (c) NEW `DemoArt` | |
| AI-assistant note | (a) IDENTICAL `AssistantNote` (homepage §13b): Inter 16/19.2 #828282 centred, opacity 0 | |

Layout @1440: row, 1440x900 viewport-height panel, bg #fff, `overflow:hidden`.
- **Left** (`Sign up`, 708 wide): column `Frame 295` max-w **450** centred (x 129), padding `20px 0`.
  - Back link (padding `13px 30px 0`): "← Back" Ginto Regular **18/23.4 #000** underlined, `history.back()`.
  - Card body (column, `overflow:clip`):
    - Heading (padding 20): **Cirka 700 24/23 ls −0.48 #0D0D0D** (≈25 chars, 1 line). The bold comes from `<strong>` on Cirka, so use your serif at 700.
    - `form` padding 20, column gap **20**, fields (label column gap 10):
      | field | label style | control |
      |---|---|---|
      | Email (required, `type=email`, placeholder ≈23 chars) | Cirka 700 **16/22.4 #000** | input 410x**44**, padding 12, bg **#FAFAFA**, **1px solid rgba(136,136,136,.6)**, radius **10**, text Ginto Regular 14/16.8 #000, placeholder **#999999** |
      | CX team size (required select, 5 options) | Cirka 700 **16/19.2 #0D0D0D** | select 410x40 in a wrapper bg #FAFAFA radius 8 padding-right 12; `appearance:none`, text **#999** until chosen; custom chevron |
      | Industry (required select, 7 options) | same | same |
      | Anything else (optional, single-line `input` in a 74px-tall box) | same (≈59 chars) | wrapper 410x74, padding 12, bg #FAFAFA, radius 8 |
      | How did you hear (required text, placeholder ≈40 chars) | same | 410x40, padding 12, bg #FAFAFA, radius 8, no border |
      | Submit | | `button` 109x34, bg **#0D0D0D**, radius 450, padding `8px 24px`, label **Ginto Medium 14/18 #FBFBFB** ("Submit →") |
    - Focus (measured on the email input): border → **#0F0F10**, bg → **#FFF**, `box-shadow: 0 0 0 2px rgba(0,0,255,.2)` plus the browser focus ring (`outline: auto 1px rgb(0,95,204)`). Borderless fields show no custom focus style (browser default only).
    - Validation: native HTML5 `required` / `type=email` only. Invalid email after blur shows **no custom error style** (border unchanged, `validity.valid=false`). Submission hands off to a **Default.com** scheduling flow (third-party; `default.com` referenced in page code). Not submitted.
    - Submit hover: not measured (the element re-rendered during the probe).
  - `Trial prompt` row (padding `8px 20px 20px`, gap 16): "prefer to try it yourself?" Ginto Regular 16/22.4 #1A1A1A (≈26 chars) + `Button` light **md** ("free trial").
  - Legal line at the bottom (y 866): Ginto Medium **14/14 #666** centred (≈67 chars) with 2 underlined links (10/14 @1000; 2 lines @390).
- **Right** (`Frame 299`, 733 wide, padding 12.5): art card 708x875, radius **8**, `overflow:hidden`, background image `framerusercontent.com/images/bh6b8X67PYGV56MzX31S7UXUgLA.png` (2667x3480, **decorative**: soft magenta/violet/yellow gradient squares; can be recreated with CSS gradients), `object-fit: fill`.
  - Centred glass quote card: outer 385x384, padding 12, bg `rgba(255,255,255,.3)`, radius 16, `backdrop-filter: blur(30px)`; inner 361x360 white, radius 8, padding 24, space-between: 29x29 quote-mark glyph, quote **Ginto Medium 18/27 #000** (≈92 chars, 3 lines); then a 313x6 divider line (`Line 5`) and an avatar row (gap 7.1): photo 78x78 radius 6.51 (person → placeholder) + name Ginto Regular **20/26 rgba(0,0,0,.75)** + role Ginto Regular 16/22.4 #000 (≈24 chars).
- 1000: two 500-wide halves; form column 450 (padding 12); art card 476x813.
- 390: column: form (padding 12, inner column gap 45, padding `20px 0 80px`) then the art card 366x424 (padding `20px 10px`) with the quote card scaled (quote 18/27 in 274, name 16/20.8, role 14/19.6). Assistant note visible as 3 lines at the bottom (opacity 0).
- Motion: none (no appear animations on this page).

---

## Shared primitives to extract (summary)

| ID | Component | Used by | Spec |
|---|---|---|---|
| P1 | `ProseSection` (H2 + rich text, H3 sub-blocks, bulleted links, Q/A list) | T1.3/T1.8/T1.9, T2 (all 3), T3.4 | §T1.3 |
| P2 | `SectionHeading` band (Ginto 64/77 centred) | T1.4 (+ /product carousel heading) | §T1.4 |
| P3 | `FeatureRows` (472² alternating; 600² variant; single callout variant) | T1.5, T1.7, T2.4 | §T1.5, §T2.4 |
| P4 | `IntegrationCard` | T3.3, T4 | §T3 |
| P5 | `DemoForm` (field, select, submit) | T6, T1.7b healthcare | §T6, §T1.7b |
| P6 | `PricingCard` + `RuledFrame` | T5 | §T5.2 |
| P7 | `FaqAccordion` (+ `AccordionBand` for the table) | T5 | §T5.3–T5.4 |
| – | `LogoMarquee` (extract from `Proof`) | T1, T2, T3 | §T1.2 |
| – | `SplitHero` | T1 (10 URLs) | §T1.1 |
| – | `StorySlideshow` (extend `Stories`: `card="wide" \| "split"`, `tint`) | T1 (3 URLs), /product | §T1.6 |
| – | `CardCarousel` | /product, /voice | §T2.3 |
| – | `IntegrationOrbit` | /product, /integrations | §T2.5 |
| – | `VideoFrame` | /coach, /voice | §T2 |

## New tokens seen on these templates (add to tailwind.config)
| token | value | where |
|---|---|---|
| link | `#4348DC` (hover `#5F63D9`) | all rich-text links |
| prose-muted | `#808080` | P1/P3 body text |
| eyebrow | `#9C9C96` | P3 eyebrow |
| lede | `#666666` (existing `muted`) | T1 hero paragraphs |
| catalog-desc | `#8A8A8A` | T3 category descriptions |
| card-soft | `#F7F7F7` (hover `#EEEEEE`) | P4, FAQ accordion open/hover |
| panel | `#F2F2F2` | coach bento panels |
| meta-card | `#FBFBFB` | T4 side card, T5 bands, voice case-study card |
| field | `#FAFAFA`; border `rgba(136,136,136,.6)`; placeholder `#999` | P5 |
| rule | `rgba(24,24,24,.07)` | T5 ruled frame |
| tint-peach | `#FCEDE8` / text `#3B1208`; split-card peach `#FDECE8` | story cards |
| tint-pink-dark | `#400B39` (exists as hero tag text) | story card text/button |
| mark | `#D7D5F1` | coach quote highlight |
| cta-blue | `#4348DC` (brand indigo) | coach CTA banner |

## Not measured / limitations
- **Rive hero/callout animations** (`RiveTile`, @rive-app/webgl2): the canvas crashed headless Chromium (every industry page plus guardrails), so frames/timing couldn't be inspected. Only the trigger logic was read from the component source (play at ≥60% visible, pause <25%, reset on re-entry). Treat as a content placeholder.
- Healthcare and financial-services full-page **screenshots** are missing for the same reason (only `recon/pages/aeo-detail/healthcare-1440-viewport.png`, the first viewport); their geometry was extracted without scrolling (JSON measurements are complete).
- Tablet/phone story slideshow on /product (`Mobile-Slideshow`, 315x603) was measured for geometry only (autoplay interval on phone not timed).
- `/coach` bento videos: play-in-view behaviour assumed from `autoplay=false, loop, muted` + Framer video defaults; not timed.
- Demo form submit-button hover and post-submit Default.com scheduler: not measured / not triggered.
- Integration filter: re-clicking the active category (to return to "All") not tested. The "0 Integrations" count after filtering is live behaviour, probably a bug.
- Orbit ring outline strokes (thin grey circles in screenshots) weren't found as DOM borders. They're probably part of an SVG/background, so match visually from `recon/pages/integrations-library/integrations-1440.png`.
- Blog card hover, integration tile hover inside the orbit: no change observed / not measured.

## Hardest to match
1. **Rive product animations** in T1 heroes/callouts (8 of 10 T1 pages): use static placeholder art, or ship your own Rive file with the same play/pause-on-visibility logic.
2. **`IntegrationOrbit`**: stacked backdrop-blur glass rings (blur 64/111px) over a blurred pink glow, with counter-rotating rings at 8°/s. Backdrop-filter on large rotating elements is expensive, so consider rotating only the tile layer.
3. **Pricing compare table**: sticky header inside a ruled frame, 7 animated accordion bands, and a horizontal scroll with a sticky first column on tablet/phone. Layout-animation heights need framer-motion `layout` or measured height springs.
4. **Story slideshow variants**: wide 956px card with a scale(.9) neighbour and a 1004px step, a split card on /product, a single static card below 1200, plus the per-page tint.
5. **Commercial type in long-form prose**: P1 is 20px text at 1040px measure with exact 1-line/2-line counts, so substitute-font metrics will reflow lists. The phone 230px column quirk (T1, /voice) is intentional live behaviour.
