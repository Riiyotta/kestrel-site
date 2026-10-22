Source: https://www.lorikeetcx.ai/

# Lorikeet homepage – clone spec (React 18 + Vite + Tailwind v3)

Platform of original: **Framer** (framer-motion runtime, `framer-*` hashed classes, `data-framer-name` layer names; site id `6Kn7XyanjwlaEuJGuPa9HW`). WebGL backgrounds are **Unicorn Studio** embeds (`unicornStudio.umd.js`). No GSAP, no Webflow IX2. One small **Lottie** (lottie-web SVG renderer, `__lottie_element_*` ids, no global exposed) drives the Compare progress bar.

CONTENT RULE: all copy below is described by role + gist + char count only. Use placeholder copy of similar length. Use placeholder brand marks/photos. Measurements are from the live site, desktop 1440x900 unless stated.

Reference screenshots: `/Users/riyaghosh/V3/LORIKEET/recon/1440-00..11-*.png` (+ 1280/768/390 shots added in this pass).

---

## 0. Global design tokens

### Page
- `body` bg `#FFFFFF`; root Framer wrapper height at 1440 = **10669px**.
- Content container: **max-width 1280px**, side padding **80px** at 1440 (=> 1280 content). Hero/Stories/Footer wrapper max-width 1440px.
- Text rendering: Framer applies `font-feature-settings: "blwf","cv03","cv04","cv09","cv11"` on most Ginto/Cirka text. Reproduce with `font-feature-settings` utility.

### Colour palette (computed)
| token | value | used for |
|---|---|---|
| ink | `#000000` | H1/H2, quote text |
| ink-900 | `#1A1A1A` rgb(26,26,26) | primary button bg, stat numbers, body on cards |
| ink-nav | `#0D0D0D` rgb(13,13,13) | nav link text |
| body | `#333333` rgb(51,51,51) | hero sub, section subtexts, story quote |
| muted | `#666666` rgb(102,102,102) | footer column titles, button hover-title copy |
| muted-2 | `#7A7A7A` rgb(122,122,122) | CTA heading 2nd-half span, copyright |
| muted-3 | `#808080` | italic system message in chat cards |
| line-gray | `#B2B2B2` | grey chat bubble (bot card) |
| card-gray | `#E5E5E5` | bot-card base bg |
| tint-lavender | `#E9E9F8` rgb(233,233,248) | icon chips, Lorikeet card 1 bg |
| tint-green | `#E7F4E8` rgb(231,244,232) | Lorikeet card 2 bg |
| tint-pink | `#FEEAFC` rgb(254,234,252) | Lorikeet card 3 bg |
| tint-yellow | `#FBF6E4` rgb(251,246,228) | yellow icon chip |
| chip-gray | `#F4F4F5` | nav dropdown tile icon box |
| tag-bg | `#F7F7F7` | footer "New" tag bg |
| new-magenta | `#DF26FE` | footer "New" tag text |
| text on tags (hero) | yellow `#3F3306`, lavender `#1E2060`, pink `#400B39`, green `#0C2D10` | hero floating pill labels |
| tag meta (10px) | pink `#801573`, lavender `#3436A5`, green `#185B1F`, yellow `#7D6508` | playbook-card meta lines |
| brand gradient A (glow, 4-stop) | `linear-gradient(90deg, #4348DC 13.0965%, #FF29E5 36.5006%, #EA4921 63.971%, #FACB12 85.1738%)` | button hover glow, logo-icon glow |
| brand gradient B (3-stop) | `linear-gradient(90deg, #FF29E5 13.0965%, #FACB12 50.2575%, #4348DC 85.1738%)` | announcement pill glow |
| brand gradient C (ring) | `linear-gradient(90deg, #FF29E5 0%, #FACB12 50%, #4348DC 100%)` | nav "Start free trial" 2px ring |

### Radii
pill `9999px` (buttons), `999px` (nav pill, nav items), `100px` (announcement), `50px` (hero tags), `32px` (logo tile), `28px`/`24px` (icon tiles), `26px`/`24px` (hero photos), `20px` (story card, CTA/footer glass, chat cards), `18px` (footer mark), `16px` (proof cards, story inner, bot cards), `15px`/`14px` (brain tags outer/inner), `14px` (CTA/footer inner card), `12px` (playbook cards), `10px` (dropdown tiles), `8px` (photos inside cards, chat bubbles, integration icons), `5px` (brain-tag icon chip), `31.5px` (footer link hit-areas).

### Shadows / effects
- **Glass shadow (signature)**: `22.09px 22.09px 73.64px 0 rgba(150,150,150,.30)` (nav pill, chat cards, CTA glass, footer glass, dropdown shell uses `22px 22px 74px`).
- Glass inset rim: `inset 0 0 0 1px rgba(255,255,255,.55)` (CTA/footer/dropdown) / `.6` (nav).
- Hairline: `0 0 0 1px rgba(0,0,0,.04)` on inner white cards; `0 0 0 .5px rgba(13,13,13,.05)` on nav pill.
- Integration icon tile: `0 1.845px 7.38px rgba(0,0,0,.15), 0 0 1.845px rgba(0,0,0,.15)`.
- Playbook card: `0 2.275px 17.44px rgba(0,0,0,.12)` + `backdrop-filter: blur(20px)` + bg `linear-gradient(116deg, rgba(239,239,239,.6) 0%, rgba(255,255,255,.08) 100%)`.
- Photo "Border" frame: element 2px larger than photo on every side, radius +2, with gradient border masked by `mask: linear-gradient(119deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 100%)` (white/grey rim that fades from top-left to bottom-right).
- Tag glass: outer `rgba(231,231,231,.5)` + `backdrop-filter: blur(10px)`, 2–3px inset inner `rgba(255,255,255,.8)` (hero) or `#fff` (brain).
- Proof/story cards shadow at rest `0 3px 30px rgba(0,0,0,0)` (transparent; animates on hover – see §Hover).

---

## 1. Fonts

All three display/text faces are **commercial, self-hosted on framerusercontent.com** (not Google/open). Inter is open (OFL). Do not ship the commercial files in the rebuild unless the user holds licences — use the fallbacks below.

| CSS family (as used) | weight/style | file URL (loaded on homepage) | licence | suggested open substitute |
|---|---|---|---|---|
| `"PP Cirka Regular"` | 400 | `https://framerusercontent.com/assets/bv5uK8FQ7VRkrJNN0JKFBKyiAlY.woff2` (also `.../EKtsCH11rXsGbOO0mPeh2pD1s.woff` declared) | Pangram Pangram – commercial | "Fraunces" 400 (opsz high) or "Instrument Serif"; tighten letter-spacing as below |
| `"ABC Ginto Regular"` | 400 | `https://framerusercontent.com/assets/JCv0yQQf8NOqARs4XNVRZtaT8.woff2` | Dinamo – commercial | "Inter" 400 / "Geist" 400 |
| `"ABC Ginto Medium"` | 500 | `https://framerusercontent.com/assets/nJVrIJJVGo9t0xwhehBzQDESQIA.woff2` | Dinamo – commercial | "Inter" 500 |
| `"ABC Ginto Bold"` | 700 | `https://framerusercontent.com/assets/ehbw3IycQCZcXeenGHPbvcHQ.woff2` | Dinamo – commercial | "Inter" 700 |
| `"ABC Ginto Regular Italic"` | 400 italic (declared as normal style) | `https://framerusercontent.com/assets/9O4as1Rd5O8Iu27I6RuoWniCU.woff2` | Dinamo – commercial | "Inter" italic |
| `"Inter"` | 400 / 700 | `https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2` (400), `.../syRNPWzAMIrcJ3wIlPIP43KjQs.woff2` (700) | OFL – open | Google Fonts Inter |
| declared but not loaded on home | `ABC Ginto Bold Italic` (`AYfzTk0qHYHaUbf6T803oU4THs.woff2`), `P22 Mackinac Medium` (`xzdc8djK4HzjEKup45LHgzjbjsM.woff2`), Roboto Mono 500 (gstatic) | – | – | skip |

Framer metric-matched fallbacks (copy these so layout doesn't shift):
```css
@font-face{font-family:"PP Cirka Regular Placeholder";src:local("Arial");ascent-override:70.41%;descent-override:22.00%;line-gap-override:8.80%;size-adjust:90.90%}
@font-face{font-family:"ABC Ginto Regular Placeholder";src:local("Arial");ascent-override:95.18%;descent-override:27.19%;line-gap-override:0%;size-adjust:102.97%}
@font-face{font-family:"ABC Ginto Medium Placeholder";src:local("Arial");ascent-override:91.99%;descent-override:26.28%;line-gap-override:0%;size-adjust:106.54%}
@font-face{font-family:"ABC Ginto Bold Placeholder";src:local("Arial");ascent-override:88.44%;descent-override:25.27%;line-gap-override:0%;size-adjust:110.81%}
```
Stacks: serif display `"PP Cirka Regular","PP Cirka Regular Placeholder",sans-serif`; text `"ABC Ginto Regular","ABC Ginto Regular Placeholder",sans-serif`; medium `"ABC Ginto Medium","ABC Ginto Medium Placeholder",sans-serif`. Note: weight is encoded in the family name (each weight is its own family), so `font-weight` is mostly 400 even on "Medium" text.

### Type scale (computed @1440)
| role | family | size / line-height | letter-spacing | colour | align |
|---|---|---|---|---|---|
| H1 hero | Cirka | 96 / 96 | -3.84px (-0.04em) | #000 | center |
| H2 section (Proof, Stories) | Cirka | 75 / 72 | -3px | #000 | center |
| H2 stat number | Cirka | 72 / 72 | -2.88px | #1A1A1A | left |
| H3 / CTA heading | Cirka | 60 / 60 | -2.4px | #000 (2nd clause span #7A7A7A) | center (H3) / left (CTA) |
| H2 compare-columns | Cirka | 40 / 36 | -1.6px | #000 | center |
| quote (proof card), footer tagline | Cirka | 30 / 30 | -1.2px | #000 | left |
| hero sub | Ginto Regular | 24 / 30 | -0.48px | #333 | center |
| section sub / story quote | Ginto Regular | 20 / 26 | normal | #333 | center/left |
| story name | Ginto Medium | 20 / 25 | normal | #1A1A1A | left |
| body-16 | Ginto Regular | 16 / 22.4 | normal | #000 / #1A1A1A | – |
| tag label | Ginto Medium (500) | 16 / 18 | normal | tinted dark | left |
| announcement label | Ginto Medium 500 | 18 / 18 | normal | #000 | – |
| nav link / button label | Ginto Medium | 14 / 14 | normal | #0D0D0D / #fff on dark btn / #1A1A1A on white btn | – |
| chat bubble text | Ginto Regular | 14 / 18 | -0.42px | #1A1A1A | left |
| chat system line | Ginto Regular Italic | 14 / 20 | -0.42px | #808080 | center |
| small print / footer meta | Ginto Regular | 14 / 18 | normal | #333 / #7A7A7A | – |
| icon-tile label | Ginto Bold | 18 / 16 | normal | #1A1A1A | center |
| dropdown eyebrow | Ginto Medium | 10 / 12 | 0.9px uppercase-ish | rgba(13,13,13,.5) | – |
| dropdown tile title / desc | Ginto Regular | 15/20 #1C1C1E ; 13/18 rgba(13,13,13,.6) | – | – |
| meta 10px (playbook) | Ginto Medium | 10 / 12 | -0.1px | tinted | center |
| AI-assistant note | Inter | 16 / 19.2 | normal | #828282 | center |

---

## 2. Section map (1440, top → bottom, document y)

| # | section (Framer layer) | y | height | bg |
|---|---|---|---|---|
| – | Nav v2 (fixed) | top 32 | 50 | glass pill |
| 1 | Hero-Section (headline + scroll-scaled photo collage + Unicorn WebGL) | 0 | 1651 | #fff |
| 2 | Proof-Section (bento of quote/stat cards + logo marquee) | 1651 | 1082 | #fff |
| 3 | Gradient Flow Section – 3a Compare (Card-01/02) | 2733 | 927 | #fff |
| 3b | "Your tools" icon arc + gradient tree | 3660 | 1036 | gradient |
| 3c | Logo-icon glow + "Confidence" header + brain tags (Unicorn) | 4696 | 1286 | – |
| 3d | System-find (integration icons + lines) | 5982 | 554 | #fff |
| 3e | Playbook header | 6536 | 337 | #fff |
| 3f | Bottom-tree + playbook card stack (Unicorn) | 6873 | 965 | – |
| 4 | Stories-Section (carousel) | 7838 | 1071 | #fff |
| 4b | AI-assistant note line | 8909 | 27 | – (opacity 0 in DOM; screen-reader/LLM text) |
| 5 | Footer V5: CTA glass + footer glass + bottom bar (Unicorn stripes) | 8936 | 1733 | #fff |

### Framer breakpoints (from `__framer__breakpoints`)
| name | media query | used at |
|---|---|---|
| Desktop XL | `(min-width:1440px)` | 1440 |
| Desktop | `(min-width:1200px) and (max-width:1439.98px)` | 1280 |
| Tablet | `(min-width:810px) and (max-width:1199.98px)` | – |
| Phone | `(max-width:809.98px)` | 768 and 390 (both use the phone layout, fluid) |

Tailwind config suggestion: `screens: { md: '810px', lg: '1200px', xl: '1440px' }` (mobile-first; base = phone).

---

## 3. Global behaviour

### Smooth scroll – Lenis 1.3.25 (window.lenis)
`{ duration: 1.5, lerp: 0.1, easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)), smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1, syncTouch: false, orientation: 'vertical', autoRaf: true }`. Install `lenis` and mirror these options; every scroll-linked effect below reads Lenis-smoothed scroll.

### Animation library
- **framer-motion** (Framer runtime: `MotionHandoffAnimation`, `MotionIsMounted` globals). All hovers/variants are JS springs/tweens – computed `transition` is `all` with no duration (i.e. no CSS transitions). In the rebuild use `framer-motion` (`motion.div`, `whileHover`, `whileInView`, `useScroll`/`useTransform`).
- **Unicorn Studio** WebGL (`window.UnicornStudio`, `unicornStudio.umd.js`) – 4 scenes, see §Assets. No GSAP, no Webflow IX2, no Three.js global; one lottie-web SVG animation (Compare progress bar – rebuild with divs, see §8).
- No `data-w-id`. Only on-load "appear" animation (`__framer__appearAnimationsContent`): the announcement-pill glow wrapper (`10oe872`) `initial {opacity:0.001, scale:0}` → `animate {opacity:1, scale:1}`, `transition {type:'spring', stiffness:203, damping:47, mass:4.1, delay:0.7}`. Everything else in the hero is SSR-visible immediately.

### Cursor follower
`Dot-Cursor` – `position:fixed; top:0; left:0; z-index:13; pointer-events:none`, 8x8, transform follows pointer (`translate3d(mouseX, mouseY, 0)`). Contains an (empty by default) pill label `Cursor-Text` (Ginto Medium 14px white, radius 9999px). It shows no visible content on the homepage in normal states – optional to implement.

---

## 4. NAV (fixed, all desktop widths)

- Wrapper `Nav v2 Desktop (scroll)`: `position:fixed; top:32px; left:0; width:100%; height:50px; z-index:7`. **Does not change on scroll** (sampled at scrollY 0/20/60/120/300/900/2733 – identical).
- **Pill**: x=80, w=1280 (container), h=50, `padding:8px`, radius 999px, bg `rgba(255,255,255,.86)`, `backdrop-filter: blur(16px)`, shadow `0 10px 32px -6px rgba(120,120,120,.18), 0 1px 3px rgba(13,13,13,.06), inset 0 0 0 1px rgba(255,255,255,.7), 0 0 0 .5px rgba(13,13,13,.06)`. (SSR pre-hydration values were `.72` + glass shadow – use the hydrated values above.)
- **Sheen** overlay (same box): `linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,.12) 46%, rgba(255,255,255,0) 60%)`, `mix-blend-mode: soft-light`, opacity .9, radius 999px.
- Left: brand mark 21x28 (x=104,y=43) + wordmark 99x22 (x=133, y=46) → placeholder logo; gap 8px.
- Center group `Nav` (x≈481, w≈479, h 34): items Product(90w, has chevron), Industries(104, chevron), Customers(94), Pricing(70), Resources(105, chevron); item height 32 (34 for Log in), radius 999px, label Ginto Medium 14/14, **rest colour `rgba(13,13,13,.6)`**, hover colour `#0D0D0D` + bg `rgba(13,13,13,.06)`.
- **Indicator** (shared hover pill for dropdown items): bg `rgba(13,13,13,.06)`, `inset 0 0 0 1px rgba(13,13,13,.10)`, radius 999px, h 34; **slides** between items (x & width animate; Product→Industries measured 481/90 → 575/104 in ~300ms, ease-out no overshoot ≈ `cubic-bezier(.22,1,.36,1)` 0.3s or spring stiffness≈400 damping≈40).
- Right: `Log in` text button (64x34; hover: `scale(1.1)` + bg `rgba(13,13,13,.06)`), `Get a demo` dark pill (108x34, see Buttons), `Start free trial` ring pill (125x34): outer `Ring` = brand gradient C, 2px inset `Inner` white pill (121x30); text Ginto Medium 14 #1A1A1A. Hover: `Glow` sibling (137x46, gradient C at .28 alpha stops, `filter: blur(10px)`, radius 999px) fades 0→1.
- Gaps: Log in→demo 9px, demo→trial 8px; trial right edge at x=1352 (8px pill padding).

### Mega-dropdown (hover Product / Industries / Resources)
- Opens on hover; **Scrim** full-viewport `rgba(36,28,20,.16)` + `backdrop-filter: blur(2px)` fades 0→1; `Dropdown` wrapper (top 82, h 334) fades 0→1; **~350ms**, strong ease-out (opacity .27 at 36ms, .9 at 130ms, 1 at ~350ms) → `ease: [0.16,1,0.3,1], duration: .35`.
- **Shell** (glass): centered under nav, top 94; widths morph per panel: Product 1080x322, Industries 865x322, Resources ≈ 475 wide (panel 459 + 2x8). bg `rgba(255,255,255,.42)`, radius 20, shadow `22px 22px 74px rgba(150,150,150,.3), 0 12px 28px -8px rgba(0,0,0,.06), inset 0 0 0 1px rgba(255,255,255,.55)`, `backdrop-filter: blur(10px)`, padding 8.
- **Card** inside: white, radius 14, `0 0 0 1px rgba(0,0,0,.04)`, padding 24 (tiles start at x+24, y+50 after a 10px-uppercase eyebrow).
- Panel switch: shell width/x animate ~300ms (same curve as indicator); outgoing panel opacity 1→0 in ~120ms, incoming 0→1 starting ~60ms later over ~250ms.
- Tile: 243x56 (Product) / 272x56 (Industries) / 256x56 (Resources), radius 10, gap 2px vertical; icon box 40x40 `#F4F4F5` radius 8 `inset 0 0 0 1px rgba(13,13,13,.04)`; title Ginto Regular 15/20 `#1C1C1E`; desc Ginto Regular 13/18 `rgba(13,13,13,.6)`. Plain link rows 150x36 radius 10.
- Feature card (dark): 224x258 (Product) / 320x258 (Industries), bg `#1B1B1F`, radius 10, image + `Fade` overlay `linear-gradient(180deg, rgba(20,22,90,0) 35%, rgba(20,22,90,.55) 72%, rgba(14,15,60,.85) 100%)` (Product, navy) or `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.55) 72%, rgba(0,0,0,.78) 100%)` (Industries); rim `inset 0 0 0 1px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.16)`; tag chip `rgba(255,255,255,.16)` + blur(10px) radius 999 (Ginto Medium 11/11 white); headline Ginto Regular 22/26 -0.11px white (2 lines, ~22 chars); link Ginto Medium 13/16 `rgba(255,255,255,.92)`.
- Screenshot: `recon/1440-12-nav-dropdown.png`.

---

## 5. Buttons (shared component, all instances)

| variant | size | bg | label | inner border (Framer `::after`) | hover |
|---|---|---|---|---|---|
| Main (dark) Large | 124x42, padding 14px 24px | `#1A1A1A` | Ginto Medium 14/14 `#FFFFFF` | 2px `rgba(255,255,255,.15)` radius 9999 | wrapper shadow `0 4px 20px rgba(114,114,114,0)` → `rgb(114,114,114)` (alpha 0→1, ~300ms ease-out) |
| Outline (white) Large | 140x42, padding 14px 24px | `#FFFFFF` | Ginto Medium 14/14 `#1A1A1A` | 2px `rgba(0,0,0,.15)` | shadow `0 4px 20px rgba(0,0,0,0)` → `rgba(0,0,0,.2)` |
| Main Medium (nav) | 108x34, padding 10px 16px | `#1A1A1A` | as above | 2px `rgba(255,255,255,.15)` | as Main |

Internal layers (keep for fidelity): `title-relative` (opacity 0, sizes the button), `title-absolute-top` (visible label), `title-absolute-bot` (hidden duplicate, colour #666). A hidden decorative glow layer (`filter: blur(12px)`, opacity 0) contains a 4-stop brand-gradient square (≈1.4x button width) that **rotates continuously at 72°/s (5s per turn, linear, infinite)**; it stays at opacity 0 in every measured state, so it can be omitted visually. CTA groups: gap 12px.

### Announcement pill ("Variant 1", hero + footer)
- Outer 277x54, padding 6px 12px, `backdrop-filter: blur(10px)`; inner pill 253x42 white, radius 100, 1px border `#E6E6E6`; label Ginto Medium 18/18 #000 (~22 chars, 1 line) + arrow icon 15x14 (gap 8).
- Glow behind: wrapper 297x74 radius 32 `filter: blur(12px)` containing `Glow` 311x36 brand gradient B + `filter: blur(24px)`.
- Idle loop: Glow `scale` 1 → .9 (≈1s) → hold 1s → 1 (≈1.2s, slight overshoot to 1.005) → hold ≈1s; period ≈4.5s, infinite.
- Hover: inner bg `#FFFFFF` → `#373737`, label → `#FFFFFF`, arrow rotates ≈ -43° and grows (15x14 → 21x20 box), Glow scale → .9.

---

## 6. HERO (Hero-Section, y 0–1651 @1440) — screenshots `recon/1440-00-hero-viewport.png`, `1440-01-hero-photo.png`

### Layout
- Section: flex column, centered, max-width 1440, height 1651, bg #fff.
- **Headline block** (`Hero-Section-Headline`): height 718, padding `150px 80px 40px`, overflow hidden; inner `Hero-Headline` 1280 wide, column, gap **62px**, centered.
  1. Announcement pill (see §5) at y=150, centered (x 581, 277x54).
  2. `Headline-Container` (y 266): column gap **16px**:
     - **H1** — role: main headline, gist "AI concierge for X" (≈47–57 chars), Cirka 96/96, ls -3.84px, #000, centered, container 1280 → **2 lines @1440**. `font-feature-settings: "blwf","cv03","cv04","cv09","cv11"`.
     - `text+button` column gap **40px**: sub-paragraph (role: lede, ≈130–226 chars) Ginto Regular 24/30, ls -0.48px, #333, centered, **max-width 1015px → 3 lines @1440**; then `CTA-Group` column gap **14px**: buttons row (gap 12, Main Large "demo" + Outline Large "free trial"), then small line (role: reassurance, ≈79 chars) Ginto Regular 14/18 #333 centered (rendered at opacity 0 at load in measured state – keep but hidden, or show at 1).
- **Photo stage** (`Desktop-Hero-Image-Section`): y 726, 1440x925, flex center, bg #fff (Desktop/Tablet only; phone uses a different stack – see §14).
  - **Hero-Unicorn-Bg**: absolute, x -291, 2023x1299 (rest top 640 doc), WebGL canvas (scene `J5C0FAXaLaMB50hSmhfH`, data-us-scale .75, dpi 1, fps 60, not lazy), `mask-image: linear-gradient(180deg, #000 66%, transparent 84%)`. Placeholder: animated soft gradient (pastel stripes in brand colours) – see screenshot.
  - **Photo-Center** (brand/content photo → placeholder): rest box x 406, y 1008, **628x362**, radius 24, overflow hidden; img `object-fit: contain` (source 2129x1227 PNG, i.e. aspect 1.735). `Border` frame 632x366 radius 26 (2px outside) with **6px white border** masked `linear-gradient(119deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 100%)`.
  - 4 satellite photos (content → placeholders), each radius 24 + white Border frame (4px, same 119° mask), `filter: blur(5px→0)` on reveal; rest positions (doc coords @1440, excluding parallax):
    | id | x | y | w×h | parallax k (translateY = k·scrollY) |
    |---|---|---|---|---|
    | TL photo | 11 | 807 | 258×172 | +0.10 |
    | TR photo | 1191 | 733 | 234×317 | −0.10 |
    | BL photo | 122 | 1293 | 197×256 | −0.10 |
    | BR photo | 1101 | 1193 | 402×228 | +0.15 |
  - 5 floating **status tags** (pill, h 54; generic UI → rebuild with own copy): outer `rgba(231,231,231,.5)` + `backdrop-filter: blur(10px)` radius 50 + `0.5px rgba(0,0,0,.2)` border; inner (2–3px inset) `rgba(255,255,255,.8)` radius 50; padding 15; icon chip 24x24 radius 38, 1px `rgba(0,0,0,.1)` border, tinted bg (yellow `#FBF6E4`, lavender `#E9E9F8`, pink, green); gap 8; label Ginto Medium 16/18 in matching dark tint (`#3F3306` / `#1E2060` / `#400B39` / `#0C2D10`), ≈18–26 chars, 1 line.
    | id | visual x @scroll 900 | layout y | w | k |
    |---|---|---|---|---|
    | Center tag | 883 | 1253 | 223 | −0.10 (base offset y −33, x −110) |
    | TL tag | 60 | 957 | 245 | +0.05 |
    | TR tag | 1105 | 884 | 265 | −0.20 |
    | BL tag | 88 | 1552 | 196 | −0.15 |
    | BR tag | 1048 | 1410 | 240 | +0.05 (x −119) |

### Motion (scroll-linked; Lenis-smoothed)
- **Photo-Center zoom-out**: scrollY 0→669: `scale 2 → 1` linear (2 − scrollY/669), `translateY −64 → 0`. At scrollY 0 it visually fills 1256x724 at x 92 (overlapping headline area bottom). After 669 it scrolls normally.
- **Hero-Unicorn-Bg**: `translateY −353 → 0` over the same 0→669 range (rate 0.528 px/px), then normal.
- **Satellite reveal**: hidden at load (opacity 0, `scale .8` (tags/photos) or `.9` (TL tag), small offset e.g. `x −21 y −26`, `filter: blur(5px)`). Revealed sequentially by 9 invisible 60px trigger bands at doc y 1030,1090,…,1510 (one item per band; reveal when band enters viewport → items appear between scrollY ≈130 and ≈610, ~60px of scroll apart). Reveal transition: spring, ≈500ms to settle (scale .98 at +100px scroll, ~1.0 at +200px), opacity 0→1, blur→0.
- After reveal, each satellite keeps a linear parallax (k above).
- Headline block scrolls normally (not sticky).

---

## 7. PROOF (Proof-Section, y 1651–2733) — screenshot `recon/1440-02-proof.png`

### Layout
- Section padding **80px**, column gap 32; container max-width **1280**, column gap **52px**.
- Heading group (column gap **16**): H2 (role: section title, gist "Proof not promises", ≈19 chars) Cirka **75/72**, ls −3px, #000, centered, 1 line; Subtext (≈92 chars) Ginto Regular 20/26 #333, centered, **max-width 548 → 2 lines**.
- `Grid+logo` column gap 32, padding-top 10:
  - **Bento grid**: 2 rows × 3 slots, row gap 32 (1933→2227 = 262+32), column gap **32**; card height **262**; wide card 624 (= 2 cols + gap), narrow 296. Row 1: [wide Photo+Quote][Stats][Quote]; Row 2: [Stats][wide Photo+Quote][Stats].
  - Card: radius 16, `1px rgba(0,0,0,.1)` border, shadow `0 3px 30px rgba(0,0,0,0)` (transparent), padding `16px 24px 16px 16px`, background = full-bleed image (`object-fit: cover`, radius 16) – these are soft gradient/texture backgrounds (decorative; see manifest). Content row (gap 24, align end): Photo+Quote has a **230x230 photo** (radius 8, content → placeholder) + text column 330 wide (`padding 8px 0`, space-between).
  - Quote text (role: testimonial, ≈80 chars) Cirka 30/30 ls −1.2px #000, 3 lines in 330px; name Ginto Medium 16/18 #000; role Ginto Regular 16/22.4 #000; customer logo 165x30 (content → placeholder) right of name block.
  - Stats card: big number (≈3 chars, e.g. "NN%") Cirka 72/72 ls −2.88px #1A1A1A, label Ginto Regular 16/22.4 #1A1A1A (≈17 chars), bottom-aligned with space-between.
  - **Logo marquee** (`General`): 1280x132, radius 16, bg `rgba(255,255,255,.4)`, 1px `rgba(0,0,0,.1)` border; inner section padding 10, `mask-image: linear-gradient(90deg, transparent 0%, #000 17%, #000 83%, transparent 100%)`; track = 3 repeated `Logo-Stack` groups (each 4140 wide, flex gap **96px**, items h ≈18–30, logos filtered `brightness(0)` to black (one uses `brightness(2)`)). Customer logos are brand content → replace with placeholder marks.

### Motion
- **Marquee**: continuous leftward translateX, **≈50 px/s** (measured −409→−510px over 2.0s = 50.4 px/s), linear, infinite; loop length = one Logo-Stack (4140 + 96 gap). No hover pause observed (not tested).
- **Reveal**: logo strip container `opacity 0, translateY 80px` → `1, 0`, ~500ms ease-out (y 57→0 in ~460ms), once, triggered when its top reaches ≈ 80–90% of viewport height. The six bento cards have the same initial state in SSR (`opacity 0, y 80`) but were already revealed before entering the viewport in a fresh load – treat as same fade-up with an early trigger (e.g. `viewport={{ once:true, margin:'0px 0px 200px 0px' }}`).
- **Card hover**: whole card `scale 1 → ~1.02` and lifts ≈4px (624x262 → 636x267), spring ~300ms. (Shadow token stays transparent.)

---

## 8. COMPARE (Gradient Flow Section › Card-01/02, y 2733–3660) — screenshot `recon/1440-03-compare-cards.png`

### Layout
- Wrapper `Gradient Flow Section`: column, overflow hidden, holds sections 8–13 (total 5105 tall @1440).
- Compare block: padding `80px 0`, column gap 32, bg #fff, width 100%.
- `Cards` row: two halves 720 wide each (no gap).
  - Left half: column gap **64**, padding `0 0 96px 96px`, centered. Right half mirrored: padding `0 96px 96px 0`.
  - Heading group (max-width **453**, column gap **16**): H2 (role: column title, gist "bots talk" / "we deliver", ≈13–17 chars) Cirka **40/36**, ls −1.6px, #000, centered, 1 line; body (≈97–112 chars) Ginto Regular 16/22.4 #000, centered, 2 lines.
  - Card area 624x420 centering a **card stack** 362x420 (3 stacked absolute cards, only one visible).
- **Bot card** (left, generic chat UI → rebuild): outer 362x420 radius 20; `Content` padding 24, column gap 32, bg `rgba(255,255,255,.3)`, shadow `22.09px 22.09px 73.64px rgba(150,150,150,.3)`; behind it `bg-color` `#E5E5E5` radius 16 and `Border-color` (6px `rgba(255,255,255,.3)` inner border, radius 16).
  - Chat area (column gap 24): grey bubble 224 wide, padding 16, bg `#B2B2B2`, radius `8px 8px 0 8px`, with 30x30 round avatar (1px `rgba(0,0,0,.1)`) to its right (gap 8); white reply bubble 224 wide, padding 16, radius `8px 8px 8px 0`, 1px `rgba(0,0,0,.2)` border, white 30x30 avatar (padding 6, icon) on its left. Bubble text Ginto Regular 14/18 ls −0.42px #1A1A1A (≈67 chars, 3 lines).
  - System line below (gap 16): Ginto Regular Italic 14/20 ls −0.42px `#808080`, centered, 1 line (≈34 chars, gist "customer left chat").
- **Product card** (right): same shell but `Content` padding **6**; contains a **350x408 autoplay muted playsinline video** (`object-fit: cover`, no loop – each of 3 videos plays once per 8s slot) → brand/content (product UI demo) → replace with placeholder video/still. bg-color per card: `#E9E9F8` (1), `#E7F4E8` (2), `#FEEAFC` (3).
  - Glow "bg-effect" PNG behind right stack (decorative colour blobs): card1 471x422, card2 802x544, card3 547x528 – crossfade with the active card.
- **Progress row** (`Loading-Bar`, column gap 23, 1440 wide, y 3517):
  - Bar 878x4 (+10px bottom padding) centered: track `#E4E4E4`, fill `linear-gradient(90deg, #FF29E5 24%, #FACB12 65%, #4348DC 100%)`, rounded 2px ends. Lottie (lottie-web SVG) – rebuild as two divs.
  - Labels row (y 3554, gap 173): 3 scenario labels Ginto Regular 20/26 #333; active one opacity 1 centered under bar, inactive ones opacity .4 left/right (x 166 and 1037 when middle active).

### Motion (time-based loop, starts on load)
- 3 scenarios × **8.0s** = 24s loop (switch measured at 5.5s/13.5s/21.6s offsets).
- Card switch: outgoing/incoming card **opacity crossfade ≈0.5–0.6s** (0.49/0.51 mid-point), both stacks (bot + product) switch together; product video for that slot restarts; matching bg-effect fades.
- Progress: grey cover slides from x 0 → 878 linearly over 24s (**36.6 px/s**), revealing the gradient; resets to 0 at loop start. Switch points at 1/3 and 2/3 (x≈293, ≈586).
- Labels: the row shifts so the active label is centred (variant swap Word-01/02/03; slide ≈ 400px), inactive labels opacity .4; transition ≈0.5s ease.

---

## 9. "YOUR TOOLS" icon arc (y 3660–4696) — screenshot `recon/1440-04-your-tools.png`

### Layout
- Section 1440x1036, padding-top **128**, overflow hidden, bg `linear-gradient(180deg, rgba(242,242,242,.5) 0%, rgba(255,255,255,0) 40%)`.
- **Icon-Stack** row (y 3788, gap **50**, align start): 5 tiles 144x144; vertical stagger via top padding: outer pair `padding-top:124`, inner pair `68`, middle `0` (forms an arc). Tile x: 260, 454, 648, 842, 1036.
- Tile: outer 144x144 padding 8, bg `rgba(231,231,231,.3)`, radius **28**, `backdrop-filter: blur(5px)`; inner 128x128 white radius **24**, padding 24, column: channel glyph (generic UI icon) + label Ginto Bold 18/16 #1A1A1A centered (≈4–5 chars, e.g. channel names).
- Copy block (y 4056, 1440x269, padding `76px 128px`, column gap 12, bg `linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 25%, #fff 50%, #fff 75%, rgba(171,171,171,0) 100%)`): H3 (gist "tools / rules", ≈23 chars) Cirka **60/60** ls −2.4px #000 centered 1 line; body (≈140 chars) Ginto Regular 16/22.4 #1A1A1A? (#000) centered, **max-width 560**, 2 lines.
- **Gradient tree** (`01-first-gradient`): absolute, 752x789 at x 344, y 3908 (centered, `translateX(-50%)`), decorative SVG/raster of flowing coloured lines (brand gradient) from the icons converging down to the logo tile. A white `gradientTree (MASK)` layer (752x839, `mask-image: linear-gradient(180deg, transparent 0%, #000 2.35%)`) sits over it and slides down to reveal it.

### Motion
- **Tiles reveal** (whileInView, replays when scrolled back above): initial `opacity .5, scale .7, translateY 150` (outer pair `translateY 200`) → `1, 1, 0`; ≈450ms ease-out (measured 0→1 in ~380ms after ~120ms latency). Triggered when the Icon-Stack enters the viewport bottom.
- **Tree reveal** (scroll-scrubbed): mask layer `translateY 0 → 842px` while scrollY goes ≈3057 → 3870 @1440 (≈1.04 px per px), so the reveal edge stays ~805–850px from viewport top (≈ bottom of viewport) – the lines "draw" downward as you scroll.

---

## 10. LOGO-ICON GLOW + "Confidence" + BRAIN TAGS (y 4696–5982) — screenshots `1440-05-icon-glow.png`, `1440-06-brain-tags.png`

### Layout
- `Lorikeet-icon-glow` 1440x1286, column centered gap 10.
- Logo tile (brand mark → placeholder): 139x138, white, radius **32**, padding `32px 40px`; mark 59x74. Glow behind: wrapper 159x158 radius 32 `filter: blur(12px)` containing 217x216 brand gradient A (4-stop) square.
- `gradientLine`: 2px wide vertical line centered (x 719) running full section height 1286 (gradient stroke), revealed by a white mask layer (1440x1336, mask `linear-gradient(180deg, transparent 0%, #000 2.35%)`).
- Header paragraph (y 4844, padding `76px 128px`, column gap 12, white-fade bg same as §9): H3 (≈38 chars, 2 lines) Cirka 60/60 ls −2.4px #000 centered; body (≈135 chars) Ginto Regular 16/22.4 centered **max-width 510**, 2 lines.
- `Lorikee-brain` (y 5183, 1440x799, padding-bottom 64, bg `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.9) 11.71%, #fff 51.38%, rgba(255,255,255,.9) 85.58%, rgba(171,171,171,0) 100%)`):
  - `Unicorn-BG-tag` 1227x735 centered, WebGL scene `z0rAh02cpnLCJ6UNJJfn` (lazy), `mask-image: radial-gradient(50% 50%, #000 77.54%, transparent 100%)`.
  - 5 "square" capability tags floating over it: outer `rgba(231,231,231,.5)` + blur(10px) radius **15**, 0.5px `rgba(0,0,0,.2)` border; inner white radius **14** (3–4px inset); icon chip `#E9E9F8` radius **5**; label Ginto Regular 16/22.4 #1A1A1A or Ginto Medium 16/18 (≈6–17 chars). Sizes (unscaled) ≈ 265x70, 249x59, 180x65, 203x54, 243x43, at base scales 1.3 / 1.1 / 1.2 / 1.0 / 0.8.

### Motion
- **gradientLine reveal** (scrubbed): mask `translateY 0 → 1961px` over scrollY ≈3845 → 5200 (≈1.45 px/px).
- **Brain tags** (scrubbed, linear between scrollY 4300 and 5600 @1440 = section entering bottom → passing top):
  | tag | scale | translate x | translate y | opacity |
  |---|---|---|---|---|
  | 1 | 1.3 → 1.5 | 0 → 21 | 0 → 95 | 1 |
  | 2 | 1.1 → 0.9 | 0 → 17 | 0 → 18 | 1 → .9 |
  | 3 | 1.2 → 1.0 | 0 → −20 | −27 → −16 | 1 |
  | 4 | 1.0 → 1.3 | 0 → 5 | −27 → −106 | 1 |
  | 5 | 0.8 | −149 → −126 | 0 → −22 | 1 → .9 |

---

## 11. SYSTEM-FIND (y 5982–6536) — screenshot `1440-07-system-find.png`

### Layout
- 1440x554, row centered, padding `0 128px`, bg #fff, overflow hidden.
- Left stack (x 108, 328x423) and right stack (x 1004, 328x423): each 4 integration icon tiles in a row (gap 20), each tile **67x67**, padding 14, white, radius 8, shadow `0 1.845px 7.38px rgba(0,0,0,.15), 0 0 1.845px rgba(0,0,0,.15)`; logo 39x39 inside (third-party logos → placeholders). Tiles have different vertical offsets.
- Center headline column 568 wide (column gap 12): H2 (≈45 chars) Cirka 60/60 ls −2.4px #000 centered, **max-width 500 → 3 lines**; sub-text Ginto Regular 16/22.4 centered max-width 500, ≈134px tall (≈6 lines).
- `Line-Stack` (absolute, centered, 974x567): two decorative SVG connector curves (317x567 each, "Vector 71/74") linking icons to the center.

### Motion
- Each icon tile has a continuous **scroll parallax** (`translateY = base + k·scrollY`): measured k = +0.0224 (tile 1), +0.005 (tile 2), −0.0325 (tile 5); others similar small magnitudes (±0.005–0.035) with alternating directions so tiles drift apart/together. Base offsets at scrollY≈0 range −185…+161px.

---

## 12. PLAYBOOK header + tree + card fan (y 6536–7838) — screenshot `1440-08-playbook-tree.png`

### Layout
- Header (y 6536, 1440x337, padding `80px 128px`, column gap 12, white-fade bg as §9; a 2x256 gradient line above at x 719): H3 (≈38 chars, 2 lines) Cirka 60/60 centered; body Ginto Regular 16/22.4 centered **max-width 435**, 2 lines.
- `Bottom-tree` (1440x965, padding `0 80px 320px`, max-width 1440): decorative branching gradient-line tree 732x749 (`Desktop-tree`, centered, top overlaps header) + `Bottom-tree-Unicorn-Bg` WebGL (scene `J5C0FAXaLaMB50hSmhfH`, lazy) masked `linear-gradient(180deg, #000 70%, transparent 98%)`.
- **Card fan** (`Card-Stack`, max-width 892, y 7253, h 265): 7 glass ticket cards: center 278x265; pair 2–3 222x212 (gap 40); pair 4–5 195x186 (gap 261); pair 6–7 167x159 (gap 449). Card: padding 6, bg `linear-gradient(116deg, rgba(239,239,239,.6) 0%, rgba(255,255,255,.08) 100%)`, radius 12, shadow `0 2.275px 17.44px rgba(0,0,0,.12)`, `backdrop-filter: blur(20px)`, white 6px Border frame (119° mask). Inside: white header strip radius `6px 6px 0 0` with 24–34px icon chip (`#E9E9F8`, radius 38); large round avatar 102–143px (white, 3px `rgba(0,0,0,.1)` ring) (content → placeholder); quote line Ginto Regular 16/22.4 in tint colour, meta line Ginto Medium 10/12 ls −0.1px in tint (pink `#801573`, lavender `#3436A5`, green `#185B1F`, yellow `#7D6508`).

### Motion
- **Fan-in on enter** (whileInView, replays): initial state = center card `scale 1.4, y −80`; pair 2–3 `scale .7, x ±160, y −60`; pair 4–5 `scale .7, x ±260, y −40`; pair 6–7 `scale .7, x ±360, y −20` → all to `scale 1, x 0, y 0`. Center card ≈610ms ease-out; outermost pair starts ≈300ms later and takes ≈550ms (inner pairs interpolate ≈100/200ms delays). Trigger: card stack top ≈ 650px from viewport top (scrollY ≈6500 @1440).
- Tree: revealed with scrubbed mask like §9 (`Desktop-tree-hidden` mask `linear-gradient(0deg, transparent 100%, #000 100%)` animated).

---

## 13. STORIES carousel (Stories-Section, y 7838–8909) — screenshot `1440-09-stories.png`

### Layout
- Section max-width 1440, 1440x1071. Inner `Desktop` column gap 32, padding-bottom 80.
- `carousel-mask` (1440x991, padding **80**, column gap 64) with `mask-image: linear-gradient(90deg, transparent 0%, #000 9.67%, #000 90%, transparent 100%)`.
- Heading: H2 (gist "real stories", ≈27 chars) Cirka 75/72 ls −3px #000 centered, 1 line.
- `Slideshow-Container` column gap **70**: Framer Slideshow, visible slot 501 wide centered (x 470), track gap **32**, 6 stories × 4 clones = 24 slides.
- **Story card** (active): 501x695 → `Desktop-Card` radius 16 inside `border` radius 20 (shadow `0 3px 30px rgba(0,0,0,0)`), `wihte-card` white radius 20 with **1px `#E5E5E5`** border; padding **24**; column: photo **453x343** (radius 8, `object-fit: cover`, content → placeholder), gap 24, content block 453x280 (space-between): quote (≈150 chars) Ginto Regular 20/26 #333 left, **4 lines**; bottom row: name Ginto Medium 20/25 #1A1A1A + role Ginto Regular 20/26 #1A1A1A (stacked, 51 tall) and customer logo 109x28 right-aligned (content → placeholder).
- Non-active slides: `scale(.9)` (451x626 visual), opacity 1.
- **Pagination dots** (centered below, row): 6 buttons, each padding `12px 6px` (first `12px 6px 12px 12px`, last `12px 12px 12px 6px`), dot 12x12 radius 50% bg **`#FF29E5`**, inactive opacity **.2**, active 1. Prev/Next arrow buttons exist but are hidden (0x0).
- `Colored-Blob-BG`: absolute behind carousel, 1437x898 at y 7971, PNG (`CNWoYhGyoifEIrUpCpG7V563Oo.png`, 2880x1800 source, cover) – decorative soft colour blobs.

### Motion
- Auto-advance every **5.0s** (start-to-start), slide by 533px (501 + 32) leftwards; transition ≈600ms expo-out (70% at 150ms, 95% at 300ms, settled ≈600ms) → `ease: [0.16,1,0.3,1], duration: .6` or spring `stiffness≈200, damping≈30`. Infinite loop with instant reset across clones.
- Active slide scale .9 → 1 animates with the slide (same timing); previous active 1 → .9.
- Hover on story card: not measurable (carousel advanced during the hover sample); keep same hover as proof cards or none.

### 13b. AI-assistant note (y 8909, 27px)
Single line, Inter 16/19.2 `#828282` centered, opacity 0 (present for LLM/screen readers). Optional.

---

## 14. FOOTER V5 (y 8936–10669) — screenshots `1440-10-footer-cta.png`, `1440-11-footer-bottom.png`

### Layout
- Wrapper `Desktop`: bg #fff, column, padding `0 80px 32px`, `overflow: clip`.
- `Stage` (1280 wide, max 1440, column gap **20**, padding-top **240**):
  - **Hero stripes** WebGL (scene `J5C0FAXaLaMB50hSmhfH`, lazy) absolute behind CTA: x −291, 2023x1216 (y 8778) – soft pastel gradient stripes (decorative).
  - **CTA glass** 1280x244: padding 6, bg `rgba(255,255,255,.3)`, radius **20**, shadow `22px 22px 74px rgba(150,150,150,.3), inset 0 0 0 1px rgba(255,255,255,.55)`, `backdrop-filter: blur(10px)`.
    - **CTA card** 1268x232: white, radius **14**, `0 0 0 1px rgba(0,0,0,.04)`, padding **56**, row gap **40**, align-items end: heading (role: closing CTA, ≈63+36 chars, 2 lines) Cirka 60/60 ls −2.4px, first clause #000 and second clause span **#7A7A7A**, width 841; buttons row (gap 12) bottom-right (Main Large + Outline Large).
  - **Footer glass** 1280x740 (same glass tokens) → **Footer card** 1268x728 white radius 14, padding `48px 56px`, column:
    - `Intro` row (gap 32, padding-bottom 40, **bottom border 1px `rgba(43,43,43,.15)`**): brand Mark tile 64x64 white radius **18**, shadow `0 0 0 1px #ECECEC, -6px 6px 24px rgba(255,41,229,.35), 6px -2px 24px rgba(250,203,18,.35), 0 8px 24px rgba(67,72,220,.25)` (mark 28x37 → placeholder); gap 20; tagline (≈46 chars) Cirka 30/30 ls −1.2px #000, width 763, 2 lines; right: announcement pill (§5).
    - `Link columns` (row, justify space-between, padding `40px 0`): 6 columns at x 142/332/596/778/962/1217 (widths 118/192/109/112/183/81). Column = title (Ginto Medium 14/14 `#666666`) + links column (gap 16 after title, links gap **8**); link row h 22 (padding `4px 0`, radius 31.5) Ginto Medium 14/14 `#0D0D0D`. Max 12 links per column. One link has a "New" tag: 36x18, bg `#F7F7F7`, radius 9999, padding `0 7px`, Ginto Regular 11/11 ls −0.22px `#DF26FE`, gap 6.
      - Link hover: colour → `#1A1A1A` + `text-decoration: underline`.
    - `Ask AI row` (padding-top 24, **top border 1px `rgba(43,43,43,.15)`**, row space-between, h 66): label Ginto Medium 14/14 `#666` + 5 round buttons gap 8 (42x42 outer `rgba(231,231,231,.5)` padding 3 radius 9999 → 36x36 white circle, 18x18 icon; third-party AI logos → placeholders); right: 3 compliance badges 42x42 gap 12 (PNG, brand/content).
  - **Giant wordmark** block (`Wordmark`, padding-top 80): brand logo+wordmark image 1280x271 (SVG `El64Zdd26rgZca59HSNzhUs8M.svg`, 217x46 viewBox, `object-fit: cover`, links home) → **replace with placeholder brand mark** of same 4.72:1 aspect.
  - Legal spacer 40px, then `Legal` row (1280x66, **top border 1px `#E3E3E3`**, padding-top 24 (content at +36), space-between): left © line Ginto Regular 14/18 `#7A7A7A` + links (gap 24) Ginto Regular 14/18 #000, "cookie settings" Ginto Medium 14/18 #000; right: company id text 14/18 `#7A7A7A` + LinkedIn round button (42 outer `rgba(231,231,231,.5)` padding 3 → 36 white, 16x16 icon), gap 24.

### Motion
- No scroll reveals measured in footer (CTA/footer glass static). WebGL stripes animate continuously. Buttons/links per §5/above.

---

## 15. RESPONSIVE — 1280 (Framer "Desktop" breakpoint 1200–1439.98px)

Same structure as 1440; container = viewport − 2×80 = **1120** (gutters stay 80). Type sizes are **fixed per breakpoint** (no clamp/vw rules found), so switch values at `lg` (1200):

| role | 1440 (xl) | 1200–1439 (lg) |
|---|---|---|
| H1 hero | Cirka 96/96 −3.84 | **77/77 −3.08** (2 lines in 1120) |
| hero sub | 24/30 −0.48, max-w 1015 | **19/23 −0.38, max-w 600** (3 lines, ≈194 chars) |
| reassurance line | 14/18 | 13/18 |
| H2 (Proof/Stories) | 75/72 −3 | **58/58 −2.32** |
| section sub (Proof) | 20/26 | 18/23.4 |
| compare H2 | 40/36 −1.6 | 36/36 −1.44 |
| scenario labels | 20/26 | 18/23.4 |
| H3 (tools/confidence/system/playbook) + CTA heading | 60/60 −2.4 | **50/50 −2** |
| body max-widths | 560 / 510 / 500 / 435 | 560 / **419** / 500 / **419** |
| footer legal | 14/18 | 13/18 |

Layout deltas @1280 (doc height 10773):
- Nav pill 1120 wide (x 80); center nav group x 401.
- Hero 1592 tall (headline block 659: padding `150px 80px 40px`, gap 62 unchanged). Photo-Center final 628x362 (x 326, y≈949) – same size as 1440; Unicorn bg 1863x1197. Satellites scale down ~0.87–0.9 (tags h 47–50; photos 225x150, 351x199, 209x277, 191x249). Trigger rails start at doc y 960 (spacer 560).
- **Proof** (1317 tall): grid becomes 3 rows with gap **24**: row1 [Photo+Quote 834][Stats 262]; row2 [Quote 262][Photo+Quote 834]; row3 [Stats 548][Stats 548]. Quote text column 540 wide in wide cards. Logo strip becomes **two stacked tickers** (`Variant 1`, 1232x108 at x 24, padding `16px 0`, gap 36, each 20px tall, gap between logos 96, same edge mask 0/17/83/100%): **top row scrolls left, bottom row scrolls right**.
- Compare halves 640 each (cards 544 wide area, stack 362x420 unchanged).
- Icon arc identical geometry (tiles 144, gap 50, x 180…956).
- Logo-icon glow section 1372 tall (gap 52), glow square 276x276.
- System-find identical structure (stacks at x 28 / 924).
- Playbook header padding `75px 128px` (height 307); Bottom-tree 907 tall; card fan identical.
- Stories 1057 tall; same 501x695 active card.
- Footer: Stage padding-top 240; CTA glass 1120x224, CTA card padding 56, heading width 681 (2 lines @50px); footer card 1108x728, padding `48px 56px`; 6 link columns at x 142/300/532/682/834/1057; Ask AI row wraps if needed (`flex-wrap: wrap`).

---

## 16. RESPONSIVE — PHONE (<810px), measured at 390x844 (doc height 9633)

Screenshots: `recon/390-00-hero.png`, `390-01-menu-open.png`, `390-02-proof.png`.

### Phone type scale
| role | phone |
|---|---|
| H1 hero | Cirka **40/40** ls −1.6px, 3 lines in 370 |
| hero sub | Ginto Regular **14/17** ls −0.28px #333, 4 lines (≈226 chars) in 370 |
| reassurance | 13/14.3, 2 lines |
| H2 Proof / Stories | Cirka 40/40 ls −1.6px, 1 line |
| H2/H3 all other sections + CTA heading | Cirka **40/36** ls −1.6px (compare H2 uses #1A1A1A) |
| section sub (Proof) | Ginto Regular 14/18.2 **#1A1A1A** |
| compare body | Ginto Regular 16/22.4 #333, 3 lines in 294 |
| "tools" body | **Inter 16/19.2 #333** (Framer falls back to Inter here – reproduce with the Ginto-substitute at 16/19.2 if you want consistency) |
| header paragraphs (confidence / system / playbook) | Ginto Regular 14/19.6 #000; max-widths 247 / 313 / 239 |
| icon tile label | Ginto Bold 10/10 |
| story quote | Ginto Regular 13/18.2 #000 (4 lines in 262); name Ginto Medium 12/12; role Ginto Regular 12/18 |
| nav menu rows | Ginto Regular 17/22 #0D0D0D |
| legal | 13/14.3 |

### Phone nav
- Fixed at top 32; `Pill` x 15, **360x52**, radius **26**, same glass tokens as desktop (bg .86, blur 16, same shadow); `Head` padding `8px 4px 8px 24px`.
- Left: mark 21x28 + wordmark 99x22 (gap 8). Right group: `Get a demo` dark Medium button 108x34 + **Menu Button** 44x44 radius 999 with 3 bars 16x3 radius 2 `#1A1A1A` (gap 2, total 16x13).
- **Open state** (tap): pill grows to 360x458 and its bg becomes `rgba(255,255,255,.5)`, radius 22; Scrim (full viewport `rgba(36,28,20,.16)` + blur 2px) fades in; bars morph to an X (bar 1 and 3 rotate ±45° and become 13x13 boxes, bar 2 opacity 0). Sheet card (x 23, 344x398, white, radius 16, `0 0 0 1px rgba(0,0,0,.04)`), scroll area padding `6px 16px 12px`: 6 rows 328x52 (padding `12px 4px` or `15px 4px`, radius 8) – rows with sub-menus have a 28x28 chevron button `#F4F4F5` radius 999 (12x12 chevron). Sticky footer (padding 12, white, 24px top fade `linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 100%)`): two 163x44 buttons – dark (`#1A1A1A`, radius 9999, `inset 0 0 0 1px rgba(255,255,255,.16)`) and gradient-ring (2px ring, inner white 159x40, padding `0 14.5px`). Timing assumed same as desktop dropdown (~350ms ease-out) – not frame-sampled on phone.

### Phone layout (top → bottom)
| section | y | h | notes |
|---|---|---|---|
| Hero | 0 | 1382 | column gap **96** |
| Proof | 1382 | 897 | padding `56px 16px` |
| Compare (Mobile-Card-02) | 2279 | 865 | padding `56px 16px` |
| Tools | 3144 | 463 | padding `54px 10px 0` |
| Logo glow + brain | 3607 | 799 | |
| System-find | 4406 | 609 | |
| Playbook header | 5015 | 259 | |
| Bottom-tree + fan | 5274 | 453 | |
| Stories | 5727 | 790 | |
| Footer | 6582 | 3050 | |

- **Hero**: headline block padding `125px 10px 0`, gap 62 → container 370. text+button gap **24**. Photo section (`Mobile-Hero-image-Section`) column gap 32, padding `0 16px 32px`: Photo-Center **358x362** radius 24 (image overflows/crops, `object-fit` cover-like 365x596) — **no zoom-on-scroll on phone** (transform none at all scroll positions). Unicorn bg 827x531. Below: `Photo-Stack-Front` row (gap 8) of two 175x306 columns, each holding a photo (155x211 / 145x188, radius 24) + overlapping tag. Tags use the mobile pill variant (h ≈49–53, radius pill, icon chip 24–25, label Ginto Medium 16/18 **#1A1A1A**). Tag reveal on phone: scroll-linked fade/scale — Center tag `opacity 0 → 1, scale 1.2 → 1, x 37 → 0, y −6 → −14` over scrollY 0 → ≈700 (o .68 @200, .94 @400).
- **Proof**: heading group gap 16; grid area: a **swipeable slideshow** (Framer Slideshow, no autoplay observed over 12s): slides 262 wide, gap 8 (Stat column = Quote-Mobile 262x215 over Stats-Mobile 262x215, gap 16; Photo+Quote-Mobile 262x446 with 230x153 photo on top, padding 16, gap 16). Active slide centred (x 64), neighbours peek. Pager: 4 dots (12px, `#FF29E5`, inactive .2) inside a pill (padding `12px 5px`, first/last outer padding 12). Logo strip = two opposing tickers, 394x108 (bleeds 2px past viewport), gap 36.
- **Compare**: single column; heading max 294 (H2 2 lines); one combined card transition area 294x498: bot card scaled (217x252) stacked above product card (290x336, gap 8 ≈ overlapping); 3 card sets crossfade on the same 8s loop; **progress = 3 dots** (`Dot-Progress` 84x36 pill radius 128, dots 12px with paddings like the stories pager) instead of the gradient bar + labels.
- **Tools**: icon arc shrinks: tiles 47x47 (padding 4.5) with 41x41 white inner radius 10, padding 10, glyph ≈19x15, label 10px; row gap 6, arc offsets 50/25/0; tree 304x367. Copy padding `76px 10px`, gap 16.
- **Logo glow**: logo tile 113x112 radius 26.09, padding `26.09px 32.61px`; glow 190x191; header paragraph padding `56px 10px`, gap 16; gradient line 1px wide. Brain: Unicorn 501x300; tags switch to **round pills** (`1 Font- Round`, radius 50, h 54, icon chip 24 radius 38) e.g. 204x54, 226x54.
- **System-find**: column; headline padding `56px 0` gap 16 (H2 max 316, sub max 313, 8 lines); below it a 316x603 mobile connector tree SVG with two stacks of icon tiles **52x52** (padding 12, radius 8, logo 28x28) left/right.
- **Playbook**: header padding `56px 10px`; Bottom-tree padding `0 10px 180px`; card fan centered: center card 306x292 (header strip 293x62, avatar 112), side cards 156x148, Unicorn 707x511.
- **Stories**: mask padding `56px 0 112px`, heading→slideshow gap 32, slideshow gap 100 to dots; card **294x470** (inactive 265x423 = .9), white card padding **16** gap 16, photo 262x230 radius 8, quote 4 lines, logo 78x20 below name. Dots 6 at y≈6366.
- **Footer** (`Phone`, padding `0 16px 32px`): Stage padding-top **150**, gap 12. CTA glass 358x274 padding 4 radius 18 → card 350x266 padding `28px 20px` radius 14, column gap 24: heading Cirka 40/36 (4 lines in 310) then buttons row (gap 8; outline button 151 wide). Footer glass 358x2278 (padding 4, radius 18) → card padding `24px 20px`: Intro column gap 36 (Mark **52x52 radius 15**, tagline 244 wide; announcement pill below); link columns stacked vertically (gap 32, padding `28px 0 32px`, titles 18px tall line box); Ask AI row column (gap 16) with label above icons (gap 12), compliance badges below. Wordmark 358x76 (padding-top 48). Legal spacer 28; Legal column (gap 16, wrap), links wrap with gap `12px 20px`.

### Floating video teaser (all viewports)
`.lvc` widget: `position: fixed; bottom: 20px; left: 50%` (centred; at 390 `left:195px` + translate), `z-index: 30`. Button 272x38: bg `rgba(255,255,255,.78)`, radius 9999, `box-shadow: inset 0 0 0 1px rgba(26,26,26,.08), 0 6px 30px rgba(151,151,151,.35)`, `backdrop-filter: blur(40px) saturate(1.5)`, padding `4px 14px 4px 4px`; left a 50x30 video thumbnail (YouTube still → placeholder) with 6px play glyph; label (≈40–60 chars, gist "how X automates Y") Cirka 14/16.5 ls −0.25px #1A1A1A, 1–2 lines; a close "×" button (Ginto 13/22 #4D4D4D) fades in on hover. Opens a video modal on click (not inspected – third-party embed).

---

## 17. RESPONSIVE — 768 (still Framer Phone breakpoint, fluid stretch of §16; doc height 9853)

Screenshot: `recon/768-00-hero.png`. Same phone type scale as 390; only widths change:
- Nav pill **530x52 centred** (x 119) → pill has `max-width: 530px` on phone; menu sheet follows the pill width.
- Hero: headline container 748 (padding `125px 10px 0`); **H1 fits 1 line** (≈47 chars @40px), sub 2 lines (748 wide, no max-width cap), reassurance 1 line. Photo section padding `0 16px 32px`: Photo-Center **736x744** (fluid width, ~1:1.01), Photo-Stack-Front 736x306 (two columns, gap 8). Hero total 1636.
- Proof: container 736; sub max-width 548 (2 lines); slideshow still 262-wide slides (more neighbours visible); total 897.
- Compare: heading group max-width **453** (H2 2 lines, body 2 lines); card transition area stays **294x498** centred; bot bubble text wraps to 115 wide.
- Tools: icon row 748 wide but tiles keep phone sizes (47px; row gap 6); body text (Inter fallback) max-width 560 → 2 lines.
- Logo glow / brain: Unicorn tag scene stays 501x300 centred; header body max 247 (4 lines).
- System-find / Playbook: same max-widths as 390 (316/313, 239).
- Stories: card fixed **294x470** centred (x 237); quote 236 wide (13/18.2, 4–5 lines).
- Footer: Stage padding-top 150, CTA glass 736x202 (heading fewer lines), footer card 728 wide but link columns still stacked vertically (1906 tall); wordmark 736x156; legal column.

### Breakpoint change summary
| from → to | what changes |
|---|---|
| ≥1440 → 1200–1439 | type steps down (H1 96→77, H2 75→58, H3 60→50, sub 24→19 with max-w 1015→600), proof grid becomes 3 rows (834/262, 262/834, 548/548) + logo strip becomes two opposing tickers; containers = vw−160. |
| 1200 → 810–1199 (tablet, not measured at a requested width) | Framer has a separate Tablet variant (hash `147ia93`/`1c1zlms`); the desktop photo-stage hash `147ia93` is hidden on tablet (`hidden-147ia93`). Not captured – if needed, sample at ~1000px. |
| ≥810 → <810 | phone composition: nav becomes pill + hamburger sheet; hero photo stops zooming and becomes a stacked collage; proof bento → swipe slideshow with 4-dot pager; compare halves merge into one stacked card with 3-dot progress; icon tiles 144→47; brain tags become round pills; system-find stacks vertically with mobile connector SVG; footer link columns stack; all H2/H3 → Cirka 40/36. |

---

## 18. Assets
See `ASSET_MANIFEST.md` (same folder) – 99 unique image/video files measured at 1440 with section, rendered vs intrinsic size, aspect, object-fit, radius, source URL and local `_files` path, split into (a) generic decorative and (b) brand/content (must be placeholders). Fonts and WebGL/Lottie effects are listed there too.

## 19. Tailwind v3 token suggestions (derived from measurements above)
```js
theme: {
  screens: { md: '810px', lg: '1200px', xl: '1440px' },
  extend: {
    colors: { ink: '#000', 'ink-900': '#1A1A1A', 'ink-nav': '#0D0D0D', body: '#333333', muted: '#666666', 'muted-2': '#7A7A7A', 'muted-3': '#808080',
      lavender: '#E9E9F8', mint: '#E7F4E8', blush: '#FEEAFC', cream: '#FBF6E4', chip: '#F4F4F5', card: '#E5E5E5', bubble: '#B2B2B2', track: '#E4E4E4',
      magenta: '#FF29E5', sun: '#FACB12', indigo: '#4348DC', ember: '#EA4921', 'new-tag': '#DF26FE' },
    fontFamily: { display: ['"PP Cirka Regular"','"PP Cirka Regular Placeholder"','serif'], sans: ['"ABC Ginto Regular"','"ABC Ginto Regular Placeholder"','sans-serif'], medium: ['"ABC Ginto Medium"','"ABC Ginto Medium Placeholder"','sans-serif'], bold: ['"ABC Ginto Bold"','"ABC Ginto Bold Placeholder"','sans-serif'] },
    maxWidth: { container: '1280px', page: '1440px' },
    borderRadius: { pill: '9999px', glass: '20px', card: '16px', inner: '14px' },
    boxShadow: { glass: '22.09px 22.09px 73.64px 0 rgba(150,150,150,.3)', nav: '0 10px 32px -6px rgba(120,120,120,.18), 0 1px 3px rgba(13,13,13,.06), inset 0 0 0 1px rgba(255,255,255,.7), 0 0 0 .5px rgba(13,13,13,.06)', tile: '0 1.845px 7.38px rgba(0,0,0,.15), 0 0 1.845px rgba(0,0,0,.15)', ticket: '0 2.275px 17.44px rgba(0,0,0,.12)', hair: '0 0 0 1px rgba(0,0,0,.04)' },
    backgroundImage: { 'brand-4': 'linear-gradient(90deg,#4348DC 13.0965%,#FF29E5 36.5006%,#EA4921 63.971%,#FACB12 85.1738%)', 'brand-3': 'linear-gradient(90deg,#FF29E5 13.0965%,#FACB12 50.2575%,#4348DC 85.1738%)', 'brand-ring': 'linear-gradient(90deg,#FF29E5 0%,#FACB12 50%,#4348DC 100%)', 'progress': 'linear-gradient(90deg,#FF29E5 24%,#FACB12 65%,#4348DC 100%)' },
  }
}
```

## 20. Not measured / limitations (do not guess – re-measure if needed)
- **Tablet (810–1199px)** layout was not sampled (not in the requested widths); Framer has a separate tablet variant.
- **Story-card hover**: carousel auto-advanced during the sample; no reliable value.
- **Mobile menu open/close timing**: end state measured, frame timing not sampled (assume desktop dropdown curve).
- **Mobile proof slideshow**: no autoplay within 12s; swipe/drag physics not measured.
- **Floating video teaser modal** and any third-party embed behaviour not inspected.
- **WebGL (Unicorn Studio) scene internals** (shader params, colours over time) are canvas-rendered and cannot be read via DOM – reproduce visually from screenshots `1440-00`, `1440-06`, `1440-08`, `1440-10`.
- System-find parallax k measured for 3 of 8 tiles (others assumed similar magnitude, alternating sign).
- Exact per-pair stagger for the playbook fan's middle pairs (≈100/200ms) is interpolated between measured centre (0ms) and outer pair (~300ms).
- Hero satellite → trigger-band mapping (which of the 9 bands reveals which item) not determined; order of reveal ≈ top-to-bottom.

## 21. Hardest-to-match (priority list for Build)
1. **Unicorn Studio WebGL backgrounds** (hero, brain, bottom-tree, footer CTA) – canvas shaders; need an approximate animated gradient/noise replacement with the same masks.
2. **Hero scroll choreography** – Photo-Center 2→1 zoom + Unicorn translate over 0–669px, 9 satellites revealed by trigger bands with blur/scale springs, then per-item parallax k – all on Lenis-smoothed scroll.
3. **Scroll-scrubbed gradient tree/line reveals** (§9–§12) – need own SVG art with brand-gradient strokes plus white masks whose translateY is tied to scroll (≈1.04 and ≈1.45 px/px).
4. **Compare section time loop** – 3×8s card crossfades synced with product videos, sliding scenario labels and a 24s linear progress cover (Lottie in the original).
5. **Glass/glow system + commercial type** – stacked glass layers (backdrop blur + inset rims + 22px soft shadows), brand-gradient blurred glows (rotating 72°/s, breathing 4.5s), and Cirka/Ginto metrics with tight negative tracking; substitute fonts will shift line counts, so tune letter-spacing to hit the recorded line counts (H1 2 lines @1440/1280, 3 lines @390, 1 line @768).
