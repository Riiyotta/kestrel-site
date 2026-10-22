/** @type {import('tailwindcss').Config} */
// CommonJS on purpose: on Node >=20.19 an ESM tailwind.config.js is loaded via require(esm) and is
// never invalidated, so the running Vite dev server would keep serving a stale theme.
// All values come from CLONE_SPEC.md (section refs in comments). Do not hardcode
// colours / radii / shadows in JSX: add them here first.

// Shared font-feature-settings Framer applies to Ginto/Cirka text (§0 Page).
const FRAMER_FEATURES = '"blwf", "cv03", "cv04", "cv09", "cv11"'

// Helper for fontSize tokens: [size, { lineHeight, letterSpacing }]
const t = (size, lineHeight, letterSpacing = 'normal') => [size, { lineHeight, letterSpacing }]

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // §2 Framer breakpoints, mobile-first. base = Phone (<810), md = Tablet (810–1199.98),
    // lg = Desktop (1200–1439.98), xl = Desktop XL (>=1440). `max-md:` etc. are generated automatically.
    screens: { md: '810px', lg: '1200px', xl: '1440px' },
    extend: {
      colors: {
        // §0 Colour palette
        ink: { DEFAULT: '#000000', 900: '#1A1A1A', nav: '#0D0D0D' },
        body: '#333333',
        muted: { DEFAULT: '#666666', 2: '#7A7A7A', 3: '#808080' },
        'line-gray': '#B2B2B2',
        'card-gray': '#E5E5E5',
        tint: { lavender: '#E9E9F8', green: '#E7F4E8', pink: '#FEEAFC', yellow: '#FBF6E4' },
        chip: '#F4F4F5',
        'tag-bg': '#F7F7F7',
        'new-magenta': '#DF26FE',
        // hero floating-pill label colours
        'tag-text': { yellow: '#3F3306', lavender: '#1E2060', pink: '#400B39', green: '#0C2D10' },
        // playbook meta lines (10px)
        'tag-meta': { pink: '#801573', lavender: '#3436A5', green: '#185B1F', yellow: '#7D6508' },
        // brand gradient stops
        brand: { indigo: '#4348DC', magenta: '#FF29E5', ember: '#EA4921', sun: '#FACB12' },
        track: '#E4E4E4', // §8 progress track
        // §4 nav
        'nav-rest': 'rgba(13,13,13,.6)',
        'nav-hover-bg': 'rgba(13,13,13,.06)',
        'nav-glass': 'rgba(255,255,255,.86)',
        scrim: 'rgba(36,28,20,.16)',
        // §4 mega-dropdown
        'dd-shell': 'rgba(255,255,255,.42)',
        'dd-eyebrow': 'rgba(13,13,13,.5)',
        'dd-title': '#1C1C1E',
        'dd-desc': 'rgba(13,13,13,.6)',
        'dd-feature': '#1B1B1F',
        'dd-feature-chip': 'rgba(255,255,255,.16)',
        'dd-feature-link': 'rgba(255,255,255,.92)',
        // §5 buttons / announcement pill
        'btn-rim-dark': 'rgba(255,255,255,.15)',
        'btn-rim-light': 'rgba(0,0,0,.15)',
        'announce-border': '#E6E6E6',
        'announce-hover': '#373737',
        // §0 tag glass / §6 hero tags
        'tag-glass': 'rgba(231,231,231,.5)',
        'tag-glass-inner': 'rgba(255,255,255,.8)',
        'tag-border': 'rgba(0,0,0,.2)',
        'chip-border': 'rgba(0,0,0,.1)',
        // §16 phone nav
        'nav-glass-open': 'rgba(255,255,255,.5)',
        // phone menu row divider: sampled from recon/390-01-menu-open.png (not in spec text)
        'menu-divider': '#ECECED',
        // §16 floating video teaser
        'teaser-bg': 'rgba(255,255,255,.78)',
        'teaser-close': '#4D4D4D',
        // misc spec greys
        'ai-note': '#828282', // §13b
        'footer-rule': 'rgba(43,43,43,.15)', // §14
        'legal-rule': '#E3E3E3', // §14
        'mark-ring': '#ECECEC', // §14
        'glass-30': 'rgba(255,255,255,.3)', // §8/§14 glass bg
        'marquee-bg': 'rgba(255,255,255,.4)', // §7
        'card-border': 'rgba(0,0,0,.1)', // §7
        // pixel-audit additions (measured on live site)
        'dd-tile-hover': '#F6F6F7', // dropdown tile / plain-link hover bg
        'teaser-card-hover': 'rgba(240,240,238,.9)', // .lvc__open:hover
      },

      fontFamily: {
        // §1 – commercial faces replaced by OFL substitutes (see index.html):
        // PP Cirka Regular -> Fraunces (opsz pinned 144), ABC Ginto -> Inter. Placeholder
        // metric fallbacks from the spec are kept so layout doesn't shift before load.
        display: ['Fraunces', '"PP Cirka Regular Placeholder"', 'serif'],
        sans: ['Inter', '"ABC Ginto Regular Placeholder"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },

      fontSize: {
        // §1 type scale @1440 + §15 (lg 1200–1439) + §16 (phone). Spec letter-spacing values.
        'h1-xl': t('96px', '96px', '-3.84px'),
        'h1-lg': t('77px', '77px', '-3.08px'),
        'h1-phone': t('40px', '40px', '-1.6px'),
        'h2-xl': t('75px', '72px', '-3px'),
        'h2-lg': t('58px', '58px', '-2.32px'),
        'h2-phone': t('40px', '40px', '-1.6px'),
        stat: t('72px', '72px', '-2.88px'),
        'h3-xl': t('60px', '60px', '-2.4px'),
        'h3-lg': t('50px', '50px', '-2px'),
        'h3-phone': t('40px', '36px', '-1.6px'),
        'compare-xl': t('40px', '36px', '-1.6px'),
        'compare-lg': t('36px', '36px', '-1.44px'),
        quote: t('30px', '30px', '-1.2px'),
        'sub-xl': t('24px', '30px', '-0.48px'),
        'sub-lg': t('19px', '23px', '-0.38px'),
        'sub-phone': t('14px', '17px', '-0.28px'),
        'body-20': t('20px', '26px'),
        'name-20': t('20px', '25px'),
        'body-18': t('18px', '23.4px'),
        'body-16': t('16px', '22.4px'),
        'body-14-phone': t('14px', '18.2px'),
        'para-14-phone': t('14px', '19.6px'),
        'story-13': t('13px', '18.2px'),
        tag: t('16px', '18px'),
        announce: t('18px', '18px'),
        label: t('14px', '14px'),
        chat: t('14px', '18px', '-0.42px'),
        'chat-sys': t('14px', '20px', '-0.42px'),
        small: t('14px', '18px'),
        'small-13': t('13px', '18px'),
        'small-13-tight': t('13px', '14.3px'),
        'tile-label': t('18px', '16px'),
        'tile-label-phone': t('10px', '10px'),
        eyebrow: t('10px', '12px', '0.9px'),
        'dd-title': t('15px', '20px'),
        'dd-desc': t('13px', '18px'),
        'dd-feature': t('22px', '26px', '-0.11px'),
        'dd-chip': t('11px', '11px'),
        'dd-link': t('13px', '16px'),
        meta: t('10px', '12px', '-0.1px'),
        'ai-note': t('16px', '19.2px'),
        'menu-row': t('17px', '22px'),
        teaser: t('14px', '16.5px', '-0.25px'),
        'teaser-close': t('13px', '22px'),
        'new-tag': t('11px', '11px', '-0.22px'),
        'name-12': t('12px', '12px'),
        'role-12': t('12px', '18px'),
        // pixel-audit additions: Framer Tablet breakpoint (810–1199) hero, measured at 860/1000
        'h1-md': t('58px', '58px', '-2.32px'),
        'sub-md': t('15px', '18px', '-0.3px'),
        // phone video-teaser pill label (.lvc__pt: Ginto Medium 13/16)
        'teaser-pill': t('13px', '16px'),
      },

      letterSpacing: {
        // Substitute-font tracking override (NOT a spec value). Fraunces at wght 340 / opsz 144
        // sets ~5% narrower than PP Cirka at equal tracking; -0.02em reproduces the line widths
        // Cirka gets with the spec's -0.04em (measured at 96px and 40px). Apply after a fontSize
        // token at every breakpoint (tracking-* wins over fontSize's letterSpacing in the cascade).
        'display-sub': '-0.02em',
        // Inter 500 14px sets ~0.2px/char wider than ABC Ginto Medium on the nav labels (measured).
        'nav-label': '-0.2px',
        // Inter 500 18px runs ~0.15px/char narrower than Ginto Medium on the announcement label (measured).
        announce: '0.15px',
        // Tablet hero sub: Inter at 15px with the live -0.3px runs ~0.3px/char narrower than Ginto, which drops
        // the sub from 4 lines to 3 in the 500px column; normal tracking restores the live 4-line wrap.
        'sub-md-inter': '0px',
        // Teaser card title: Fraunces (opsz 144) at 14px sets 6.8% narrower than PP Cirka with the live -0.25px
        // (same 60-char string: 311.3 vs 333.9px) -> +0.38px/char => +0.13px.
        'teaser-sub': '0.13px',
      },

      fontWeight: {
        // Fraunces weight that visually matches PP Cirka Regular's stroke (see report).
        'display-sub': '340',
      },

      maxWidth: {
        container: '1280px', // §0 content container
        page: '1440px', // hero/stories/footer wrapper
        'hero-sub-xl': '1015px', // §6
        'hero-sub-lg': '600px', // §15
        'nav-phone': '530px', // §17
        'hero-sub-md': '500px', // tablet hero sub
      },

      spacing: {
        gutter: '80px', // §0 side padding desktop
        'gutter-phone': '10px', // §16 hero headline padding
        'nav-top': '32px', // §4 nav offset
      },

      borderRadius: {
        // §0 Radii
        pill: '9999px',
        'nav-pill': '999px',
        announce: '100px',
        'hero-tag': '50px',
        'chip-round': '38px',
        'logo-tile': '32px',
        'icon-tile': '28px',
        'icon-tile-inner': '24px',
        'photo-frame': '26px',
        photo: '24px',
        'nav-phone': '26px',
        'nav-phone-open': '22px',
        glass: '20px',
        'footer-mark': '18px',
        card: '16px',
        'brain-outer': '15px',
        inner: '14px',
        playbook: '12px',
        tile: '10px',
        sm: '8px',
        'brain-chip': '5px',
        'footer-link': '31.5px',
        'teaser-card': '22px', // .lvc__open (card variant)
      },

      boxShadow: {
        // §0 Shadows / effects
        glass: '22.09px 22.09px 73.64px 0 rgba(150,150,150,.30)',
        'glass-rim': '22px 22px 74px rgba(150,150,150,.3), inset 0 0 0 1px rgba(255,255,255,.55)',
        nav: '0 10px 32px -6px rgba(120,120,120,.18), 0 1px 3px rgba(13,13,13,.06), inset 0 0 0 1px rgba(255,255,255,.7), 0 0 0 .5px rgba(13,13,13,.06)',
        'dd-shell': '22px 22px 74px rgba(150,150,150,.3), 0 12px 28px -8px rgba(0,0,0,.06), inset 0 0 0 1px rgba(255,255,255,.55)',
        hair: '0 0 0 1px rgba(0,0,0,.04)',
        'nav-indicator': 'inset 0 0 0 1px rgba(13,13,13,.10)',
        'dd-icon': 'inset 0 0 0 1px rgba(13,13,13,.04)',
        'dd-feature-rim': 'inset 0 0 0 1px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.16)',
        tile: '0 1.845px 7.38px rgba(0,0,0,.15), 0 0 1.845px rgba(0,0,0,.15)',
        ticket: '0 2.275px 17.44px rgba(0,0,0,.12)',
        'card-rest': '0 3px 30px rgba(0,0,0,0)',
        'btn-dark-rest': '0 4px 20px rgba(114,114,114,0)',
        'btn-dark-hover': '0 4px 20px rgb(114,114,114)',
        'btn-light-rest': '0 4px 20px rgba(0,0,0,0)',
        'btn-light-hover': '0 4px 20px rgba(0,0,0,.2)',
        'btn-rim-dark': 'inset 0 0 0 2px rgba(255,255,255,.15)',
        'btn-rim-light': 'inset 0 0 0 2px rgba(0,0,0,.15)',
        'menu-btn-dark': 'inset 0 0 0 1px rgba(255,255,255,.16)', // §16
        teaser: 'inset 0 0 0 1px rgba(26,26,26,.08), 0 6px 30px rgba(151,151,151,.35)',
        // pixel-audit additions
        // Same value as dd-shell; separate name because `shadow-dd-shell` also matches colors.dd-shell and
        // Tailwind's shadow-colour utility then recolours every layer to rgba(255,255,255,.42).
        'dd-shell-glass': '22px 22px 74px rgba(150,150,150,.3), 0 12px 28px -8px rgba(0,0,0,.06), inset 0 0 0 1px rgba(255,255,255,.55)',
        'dd-chip': 'inset 0 0 0 .5px rgba(255,255,255,.28), inset 0 1px 0 rgba(255,255,255,.18)',
        'dd-icon-hover': 'inset 0 0 0 1px rgba(255,255,255,.12), 0 4px 10px -4px rgba(13,13,13,.18)',
        'teaser-card': 'inset 0 0 0 1px rgba(255,255,255,.9), 0 0 0 1px rgba(26,26,26,.05), 0 6px 73px rgba(151,151,151,.3)',
        'teaser-x': '0 0 0 1px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.14)',
        'teaser-dot': '0 1px 3px rgba(0,0,0,.2)',
        'teaser-media': 'inset 0 0 0 1px rgba(0,0,0,.06)',
        'footer-mark':
          '0 0 0 1px #ECECEC, -6px 6px 24px rgba(255,41,229,.35), 6px -2px 24px rgba(250,203,18,.35), 0 8px 24px rgba(67,72,220,.25)',
      },

      backdropBlur: {
        // §0/§4/§16
        scrim: '2px',
        glow: '5px',
        tag: '10px',
        nav: '16px',
        'nav-open': '15px', // phone pill, menu open
        ticket: '20px',
        teaser: '40px',
      },

      blur: {
        tag: '10px', // nav trial glow
        glow: '12px', // button / pill glow wrapper
        'glow-lg': '24px', // announcement Glow
        reveal: '5px', // hero satellite reveal start
      },

      backgroundImage: {
        // §0 brand gradients
        'brand-4': 'linear-gradient(90deg, #4348DC 13.0965%, #FF29E5 36.5006%, #EA4921 63.971%, #FACB12 85.1738%)',
        'brand-3': 'linear-gradient(90deg, #FF29E5 13.0965%, #FACB12 50.2575%, #4348DC 85.1738%)',
        'brand-ring': 'linear-gradient(90deg, #FF29E5 0%, #FACB12 50%, #4348DC 100%)',
        'brand-ring-glow': 'linear-gradient(90deg, rgba(255,41,229,.28) 0%, rgba(250,203,18,.28) 50%, rgba(67,72,220,.28) 100%)',
        progress: 'linear-gradient(90deg, #FF29E5 24%, #FACB12 65%, #4348DC 100%)',
        // §4 nav sheen + dropdown feature fades
        'nav-sheen': 'linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,.12) 46%, rgba(255,255,255,0) 60%)',
        'dd-fade-navy': 'linear-gradient(180deg, rgba(20,22,90,0) 35%, rgba(20,22,90,.55) 72%, rgba(14,15,60,.85) 100%)',
        'dd-fade-black': 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.55) 72%, rgba(0,0,0,.78) 100%)',
        // §16 phone menu sticky-footer top fade
        'menu-fade': 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 100%)',
        // §0 photo Border-frame mask
        'frame-mask': 'linear-gradient(119deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 100%)',
      },
    },
  },
  plugins: [
    // font-feature-settings utility (§0 Page)
    ({ addUtilities }) => {
      addUtilities({ '.font-framer': { 'font-feature-settings': FRAMER_FEATURES } })
    },
  ],
}

// =====================================================================================
// SECTIONS 3–10 tokens (Proof → Footer). Appended block: merged into theme.extend below so
// nothing above is modified. Values from CLONE_SPEC.md (section refs in comments); anything
// sampled from recon screenshots instead of the spec text is marked "sampled".
// =====================================================================================
const SECTIONS_3_10 = {
  colors: {
    'tile-glass': 'rgba(231,231,231,.3)', // §9 icon-tile outer
    // pixel-audit: measured on live (proof/compare/stories pagers): rgba(229,229,229,.4) (+ blur 10 on the proof pager)
    'pager-bg': 'rgba(229,229,229,.4)',
  },
  fontSize: {
    // sampled: phone proof-slide quote (recon/390-02-proof.png); phone value not in spec text.
    'quote-phone': t('24px', '24px', '-0.96px'),
    // pixel-audit additions (measured on live, Framer Tablet 810–1199 = md, Desktop 1200–1439 = lg)
    'h2-md': t('48px', '50px', '-1.92px'), // Proof / Stories H2 @md
    'h3-md': t('40px', '40px', '-1.6px'), // tools / confidence / system / playbook H3 + CTA heading @md
    'quote-md': t('26px', '26px', '-1.04px'), // proof quote + footer tagline @md
    'quote-lg': t('28px', '28px', '-1.12px'), // proof quote + footer tagline @lg
    'stat-md-sm': t('48px', '50px', '-1.92px'), // proof "stat2" card @md
    'stat-lg-sm': t('58px', '60px', '-2.32px'), // proof "stat2" card @lg
    'body-16-md': t('16px', '20.8px'), // proof sub @md
    'name-13': t('13px', '13px'), // proof card name @md
    'name-11': t('11px', '14px'), // proof card name @phone
    'tile-label-md': t('14px', '16px'), // tools tile label @md
    'footer-title-md': t('10px', '14px'), // footer column titles + Ask AI label @md
    'footer-title-lg': t('13px', '14px'), // footer column titles @lg
  },
  maxWidth: {
    'proof-sub': '548px', // §7
    'compare-head': '453px', // §8
    'compare-phone': '294px', // §16
    'tools-body': '560px', // §9
    'confidence-body': '510px', // §10
    'body-lg-narrow': '419px', // §15 confidence/playbook body @1200–1439
    system: '500px', // §11
    'playbook-body': '435px', // §12
    'header-body-md': '315px', // pixel-audit: confidence + playbook body @md (live)
    'confidence-phone': '247px', // §16
    'system-phone-h': '316px', // §16
    'system-phone': '313px', // §16
    'playbook-phone': '239px', // §16
    'card-stack': '892px', // §12
    'cta-heading-xl': '841px', // §14
    'cta-heading-lg': '681px', // §15
    tagline: '763px', // §14
    'tagline-phone': '244px', // §16
  },
  borderRadius: {
    'logo-tile-phone': '26.09px', // §16
    'dot-progress': '128px', // §16 Dot-Progress pill
  },
  backgroundImage: {
    'tools-fade': 'linear-gradient(180deg, rgba(242,242,242,.5) 0%, rgba(255,255,255,0) 40%)', // §9 section bg
    // §9/§10/§12 header paragraph "white-fade" bg
    'white-fade': 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 25%, #fff 50%, #fff 75%, rgba(171,171,171,0) 100%)',
    // §10 Lorikee-brain bg
    'brain-fade':
      'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.9) 11.71%, #fff 51.38%, rgba(255,255,255,.9) 85.58%, rgba(171,171,171,0) 100%)',
    ticket: 'linear-gradient(116deg, rgba(239,239,239,.6) 0%, rgba(255,255,255,.08) 100%)', // §0/§12 playbook card
  },
}

for (const [key, values] of Object.entries(SECTIONS_3_10)) {
  module.exports.theme.extend[key] = { ...(module.exports.theme.extend[key] || {}), ...values }
}

// =====================================================================================
// motion: nav/hero (animation pass – appended; measured on the live site)
// =====================================================================================
module.exports.theme.extend.transitionTimingFunction = {
  ...(module.exports.theme.extend.transitionTimingFunction || {}),
  nav: 'cubic-bezier(0.22, 1, 0.36, 1)', // desktop nav dropdown / indicator / labels / chevrons
}
// end motion: nav/hero

// =====================================================================================
// pages: standalone (SPEC_PAGES_C.md T4 /cx-jobs, T5 /press-kit, T6 404). Appended block, merged into
// theme.extend below; nothing above is modified. Values from SPEC_PAGES_C unless marked "sampled" (read off the
// recon screenshots) or "assumed" (spec silent, see build report).
// =====================================================================================
const PAGES_STANDALONE = {
  colors: {
    // T4 cx-jobs colour set. Divider rgba(0,0,0,.1) = existing `card-border`; link hover #666 = existing `muted`.
    jobs: {
      bg: '#EEEEEE',
      panel: '#F4F4F5',
      muted: '#717171',
      'muted-2': '#9AA0A6',
      'stat-label': '#18181B',
      'stat-desc': '#71717A',
      hairline: 'rgba(0,0,0,.08)',
      'logo-tile': '#F5F5F5',
      'logo-border': 'rgba(0,0,0,.06)',
      'silk-base': '#0B0B0F', // T4 J2 CSS stand-in base for the WebGL silk shader
    },
    // T5 press kit. Section rules rgba(0,0,0,.1) = existing `card-border`; dark preview #1A1A1A = `ink-900`.
    'body-75': 'rgba(0,0,0,.75)',
    'dl-tile': { DEFAULT: '#E6E6E6', hover: '#B0B0B0', label: '#474747' },
    'preview-border': '#CCCCCC',
    'specimen-label': '#4D4D4D',
  },
  fontFamily: {
    rethink: ['"Rethink Sans"', 'sans-serif'], // T5 "gradient palette" heading (600)
  },
  fontSize: {
    // T4 cx-jobs (Inter). H1 tracking at lg/md is not in the spec: assumed -0.0545em (= the xl -3.6px / 66px ratio).
    'jobs-h1-xl': t('66px', '69.96px', '-3.6px'),
    'jobs-h1-lg': t('46px', '48.76px', '-0.0545em'),
    'jobs-h1-md': t('54px', '57.24px', '-0.0545em'),
    'jobs-h1-phone': t('36px', '39.6px', '-1.8px'),
    // Section H2: spec gives -1.8 once; applied at every step (assumed for 34 and 36).
    'jobs-h2-xl': t('40px', '44px', '-1.8px'),
    'jobs-h2-lg': t('34px', '37.4px', '-1.8px'),
    'jobs-h2': t('36px', '39.6px', '-1.8px'),
    'jobs-body': t('16px', '25.6px', '-0.32px'),
    'jobs-eyebrow': t('16px', '25.6px', '0.32px'),
    'jobs-13': t('13px', '18.2px'), // white button (600), footer column titles (600), location
    'jobs-13-tight': t('13px', '18.2px', '-0.1px'), // "view all", card description, (c) line
    'jobs-14': t('14px', '21px'), // footer legal links
    'jobs-14-tight': t('14px', '21px', '-0.1px'), // company name, footer blurb + links
    'jobs-card-title': t('16px', '20px', '-0.3px'),
    'jobs-silk-title': t('24px', '32.4px', '-0.46px'),
    'jobs-stat-xl': t('56px', '56px', '-1.68px'),
    'jobs-stat-md': t('34px', '34px', '-1.02px'),
    'jobs-stat-phone': t('44px', '44px', '-1.32px'),
    'jobs-stat-label': t('15px', '18px'),
    'jobs-stat-desc': t('14px', '16.8px'),
    // T5 press kit
    'dl-label': t('16px', '16px'),
    'gradient-head': t('22px', '26.4px', '-0.22px'),
    'specimen-label': t('32px', '32px'),
    'specimen-sans-xl': t('96px', '100px', '-3.84px'),
    'specimen-sans-md': t('58px', '62px', '-2.32px'), // tracking not in spec: assumed same as h1-md
  },
  maxWidth: {
    'notfound-phone': '244px', // T6 H2 wraps to 2 lines in 244 @390
    'jobs-title-xl': '581px',
    'jobs-title-lg': '501px',
    'jobs-ai-head': '316px',
    'jobs-cards': '1200px',
    'jobs-footer': '1200px',
    'jobs-blurb': '320px',
    'silk-title': '300px',
    mcp: '1240px',
  },
  width: {
    'press-sidebar': '18%', // T5 sidebar = 18% of viewport (>=810)
  },
  borderRadius: {
    'jobs-logo': '4px', // T4 J5 24x24 company tile
  },
  boxShadow: {
    'jobs-btn': '0 5px 6px rgba(0,0,0,.2)',
    'silk-rim': 'inset 0 0 0 1px rgba(255,255,255,.1)',
  },
}

for (const [key, values] of Object.entries(PAGES_STANDALONE)) {
  module.exports.theme.extend[key] = { ...(module.exports.theme.extend[key] || {}), ...values }
}
// end pages: standalone

// =====================================================================================
// pages: shared primitives (src/components/ui/*, catalogued in COMPONENTS.md). Appended block; nothing above is
// modified. Values from SPEC_PAGES_A/B/C (section refs in comments). Existing tokens with the same value are reused
// and NOT redefined here: link #4348DC = brand.indigo, prose grey #808080 = muted.3, card-soft #F7F7F7 = tag-bg,
// #E5E5E5 = card-gray, rgba(0,0,0,.75) = body-75, #CCCCCC = preview-border, #E4E4E4 = track, #0D0D0D = ink.nav,
// #0C2D10 = tag-text.green, #F4F4F5 = chip, radii 8/10/12/16/18/24/50/100/999 = sm/tile/playbook/card/footer-mark/
// photo/hero-tag/announce/nav-pill, 20px backdrop blur = ticket. Nested keys (tint, ink, muted, tag-text, tag-meta)
// are deep-merged so the existing entries stay intact.
// =====================================================================================
const PAGES_SHARED = {
  colors: {
    ink: { deep: '#0F0F10' }, // A T6 field focus border, B T8 FaqCards question
    muted: {
      4: '#595959', // B T5 sort label, B T8 FaqCards answer
      5: '#787878', // B T5 eyebrow / guide meta
      6: '#6E6E6E', // B T5 guide description, B T6 TickToc popover summary
      7: '#737373', // B T4 HoverToc active label, B T12 lede
    },
    link: { hover: '#5F63D9' }, // A/C rich-text link hover (rest = brand.indigo)
    'feature-eyebrow': '#9C9C96', // A P3 eyebrow
    'catalog-desc': '#8A8A8A', // A T3.3 category description
    'soft-hover': '#EEEEEE', // A P4 IntegrationCard hover (rest #F7F7F7 = tag-bg)
    panel: '#F2F2F2', // A T2.7 bento panel, B T2 side-menu rail overlay
    'meta-card': '#FBFBFB', // A T4 MetaCard, A T5 accordion bands, B T3 tabs, B T7 table value cells
    'filter-hover': '#E0E0E0', // A T3.3 sidebar filter hover
    'rule-soft': 'rgba(24,24,24,.07)', // A T5 ruled frame / dividers, C glossary divider
    silver: '#999999', // B T1 selected chip ring, A/C field placeholder + soft-field text
    hairline: '#E8E8E8', // B R.6 FAQ rule, B T6 InlineToc ring, B T5 search/sort border
    'chip-soft': { DEFAULT: '#F4F4F4', hover: '#EAEAEA', text: '#3C3C3C' }, // B T5 topic chips, B R.6 plus circle
    'tab-ring': '#DEDEDE', // B T3 FilterTabs ring
    'loadmore-border': '#DCDCDC', // B T5 LoadMoreButton
    'quote-rule': '#DDDDDD', // B R.2 blockquote rule
    'takeaway-dot': '#A0A0A0', // B R.5 key-takeaways marker
    field: {
      DEFAULT: '#FAFAFA', // A P5 demo field bg
      border: 'rgba(136,136,136,.6)', // A P5 bordered (email) field
      soft: 'rgba(187,187,187,.15)', // C soft skin bg, C FileDropZone, B T4 pill input
      'soft-border': 'rgba(136,136,136,.1)', // C soft skin / drop zone border
      focus: '#0099FF', // C Field focus (Framer default)
    },
    'demo-card': 'rgba(255,255,255,.84)', // A T1.7b / B T8 demo form card
    'submit-hover': '#404040', // C nominate submit hover bg / rest border
    'outline-border': '#222222', // C partner submit border
    toc: {
      accent: '#4B4BF7', // B T4/T6 active tick (1st accent)
      'accent-2': '#EC4899', // B T4 active tick when the 2nd heading was active
      past: '#A3A3A3',
      upcoming: '#D4D4D4',
      tick: '#111111', // B T6 inactive tick (@.22), CTA chip tag + trailing link
      meta: '#7D7D7D', // B T6 popover meta line
      item: '#5A5A5A', // B T6 InlineToc items
    },
    share: { bg: 'rgba(255,255,255,.9)', hover: '#F4F6F8' }, // B T4 ShareRail
    'cta-chip': { label: '#1E1E1E', rule: '#E2E2E2' }, // B T6 ArticleCtaChip
    faq: { border: '#EBECED', plus: '#5A616E', icon: '#252E3D' }, // B T8 FaqCards, B T7 QuestionAccordion icon
    matrix: {
      border: '#E5E7EB',
      head: '#FAFAFB',
      us: 'rgba(79,70,229,.04)',
      text: '#111827',
      row: '#F3F4F6',
      yes: '#34D399',
      no: '#FB7185',
      value: '#374151',
      sub: '#6B7280',
    }, // B T8 ComparisonTable "matrix"
    'grid-head': 'rgba(255,255,255,.2)', // B T7 ComparisonTable sticky header
    'arrow-ring': 'rgba(18,18,18,.18)', // B T3 CardRail arrow ring
    'rail-tint': 'rgba(66,71,219,.04)', // B T3 CardRail section bg
    employee: { pink: '#FFEAFC', cream: '#FBF6E5', peach: '#FEECEA' }, // C A5 tints (grey = card-gray, lavender = tint.lavender)
    // B §1.1 story themes: light / dark / mid / dot. pink, yellow, green light+dark+mid already exist as
    // tint.* / tag-text.* / tag-meta.*; red is new, dots are new. A T1.6 peach story tint added as tint.peach.
    tint: { red: '#FDECE9', peach: '#FCEDE8' },
    'tag-text': { red: '#3B1208' },
    'tag-meta': { red: '#752512' },
    'tint-dot': { pink: '#FFC9F9', yellow: '#FBEFC1', red: '#F9C8BC', green: '#C8E9CB', neutral: '#E5E5E5' },
  },
  fontSize: {
    'title-32': t('32px', '32px', '-1.28px'), // A P1/P3 H3, B blog h3
    'title-38': t('38px', '42px', '-1.52px'), // A T2.4 H2, B blog h2
    'title-28': t('28px', '34px', '-0.84px'), // B article h2
    'title-22': t('22px', '28px', '-0.44px'), // B article h3
    'title-24': t('24px', '30px', '-0.72px'), // B article h2 <810
    'title-20': t('20px', '26px', '-0.4px'), // B article h3 <810
    'title-24-h4': t('24px', '28px', '-0.48px'), // B blog h4 (spec: interpolated, unmeasured)
    'title-24-tight': t('24px', '24px', '-0.96px'), // A T2.3 card subtitle
    'band-xl': t('64px', '77px', '-2.56px'), // A P2 band H2
    'band-md': t('42px', '50px', '-1.68px'),
    'band-phone': t('32px', '38px', '-1.28px'),
    'quote-18': t('18px', '32.4px'), // B R.2 blockquote
    'label-15': t('15px', '20px', '-0.15px'), // B R.5 takeaways header
    'body-16-loose': t('16px', '25px'), // B R.5 takeaways items
    'faq-q': t('20px', '26px', '-0.2px'), // B R.6 question
    'faq-q-phone': t('18px', '24px', '-0.18px'),
    'body-17': t('17px', '26px'), // B R.6 answer
    'faq-card-q': t('26px', '26px'), // B T8 FaqCards question
    'faq-glyph': t('28px', '28px'), // B T8 FaqCards +/- glyph
    'body-18-loose': t('18px', '34.2px'), // B T8 FaqCards answer
    'form-title': t('24px', '23px', '-0.48px'), // A T6 / B T8 form heading (Cirka 700)
    'form-label': t('16px', '19.2px'), // A T6 / B T8 field label (Cirka 700)
    'field-14': t('14px', '16.8px'), // A P5 field text, C drop-zone helper
    'field-16': t('16px', '16px'), // C outline field text
    'input-soft': t('20.29px', '24.35px'), // C soft field text (Inter)
    'label-13': t('13px', '13px'), // C partner submit @md
    'sub-14': t('14px', '17px'), // A T2.3 card subtitle <810
    'tab-18': t('18px', '30px', '-0.36px'), // B T3 FilterTabs
    'tab-18-tight': t('18px', '23px', '-0.36px'), // B T3 FilterTabs <1440
    'inter-16': t('16px', '16px'), // B T5 LoadMoreButton (Inter 500)
    'toc-12': t('12px', '16px'), // B T4 HoverToc label, B T6 popover meta
    'toc-13': t('13px', '19px'), // B T6 popover summary
    'toc-14': t('14px', '19px', '-0.14px'), // B T6 popover heading
    'toc-15': t('15px', '15px'), // B T6 InlineToc summary
    'toc-15-loose': t('15px', '21px'), // B T6 InlineToc items
    'tip-12': t('12px', '14px'), // B T4 ShareRail tooltip
    'emp-quote': t('16px', '14.4px'), // C A5 EmployeeCard quote (Cirka)
    'emp-name': t('11.79px', '14.74px'), // C A5 name / role
    'split-xl': t('77px', '38px', '-3.08px'), // C A1/A4 SplitText heading @1440 (line-height quirk is measured)
    'split-lg': t('96px', '100px', '-3.84px'), // C A4 @1280
    'split-lg-tight': t('96px', '38px', '-3.84px'), // C A1 @1280
    'split-md': t('58px', '38px', '-2.32px'), // C A1/A4 @1000
    'matrix-title': t('16px', '20.8px', '-0.16px'), // B T8 matrix column titles (500)
    'matrix-label': t('15px', '21px'), // B T8 matrix row label (500)
  },
  borderRadius: {
    xs: '4px', // B T7 table cells
    'photo-sm': '6px', // C employee photo, A P3 image-right
    'emp-text': '9.43px', // C employee text container
    'field-soft': '14.49px', // C soft field
  },
  boxShadow: {
    'field-focus': '0 0 0 2px rgba(0,0,255,.2)', // A T6 bordered field focus
    'glass-form': '0 6px 73.64px 0 rgba(150,150,150,.3)', // C partner glass form card
    'faq-card':
      '0 .6px .6px -1.25px rgba(0,0,0,.18), 0 2.29px 2.29px -2.5px rgba(0,0,0,.16), 0 10px 10px -3.75px rgba(0,0,0,.06)', // B T8
    matrix: '0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.04)', // B T8 table
    'share-rail': '0 0 0 1px rgba(0,0,0,.06), 0 8px 24px -8px rgba(0,0,0,.12)', // B T4
    'cta-chip': '0 0 0 1px #E2E2E2, 0 10px 24px -12px rgba(0,0,0,.2)', // B T6
    'toc-pop': '0 2px 6px -2px rgba(0,0,0,.08), 0 16px 36px -12px rgba(0,0,0,.22)', // B T6 popover
    'ring-hairline': 'inset 0 0 0 1px #E8E8E8', // B T6 InlineToc
    'card-lift': '1px 3px 30px rgba(0,0,0,.2)', // B §1.4 story card hover (rest = card-rest)
  },
  backdropBlur: {
    share: '12px', // B T4 ShareRail
  },
  backgroundImage: {
    // A T5.2 plans row
    'plans-glow':
      'radial-gradient(90% 130% at 50% 0, rgba(67,72,220,.10) 0%, rgba(223,38,254,.07) 45%, rgba(250,203,18,.05) 72%, rgba(255,255,255,0) 100%)',
    // B T4 HoverToc expanded backdrop
    'toc-backdrop': 'linear-gradient(to right, rgba(255,255,255,.97) 0%, rgba(255,255,255,.95) 42%, rgba(255,255,255,0) 100%)',
    // B T2 StorySideMenu progress rail
    'progress-rail': 'linear-gradient(180deg, #FF29E5 0%, #FACB12 51.92%, #4348DC 100%)',
  },
  transitionTimingFunction: {
    ui: 'cubic-bezier(0.65, 0, 0.35, 1)', // B T4/T5/T6 TOC, chips, share rail, CTA chip
    zoom: 'cubic-bezier(0.22, 1, 0.36, 1)', // B T3 blog-card image zoom
  },
}

for (const [key, values] of Object.entries(PAGES_SHARED)) {
  const cur = module.exports.theme.extend[key] || {}
  const next = { ...cur }
  for (const [k, v] of Object.entries(values)) {
    next[k] = v && typeof v === 'object' && cur[k] && typeof cur[k] === 'object' ? { ...cur[k], ...v } : v
  }
  module.exports.theme.extend[key] = next
}
// end pages: shared primitives

// =====================================================================================
// pages: content (SPEC_PAGES_B T1–T6, T9–T12: stories, blog, articles, report, thoughts, glossary, FAQ).
// Appended block, deep-merged like "pages: shared primitives"; nothing above is modified. Reused (same value, not
// redefined): theme light/dark/mid = tint.* / tag-text.* / tag-meta.*, dots = tint-dot.*, #666 = muted, #808080 =
// muted.3, #737373 = muted.7, #787878 = muted.5, #F2F2F2 = panel, #F4F6F8 = share.hover (B T4 book-a-call card),
// #9AA0A6 = jobs.muted-2, #F4F4F4 = chip-soft, rgba(24,24,24,.07) = rule-soft, radius 28 = icon-tile, 20 = glass,
// 6 = photo-sm, 4 = xs, card-lift shadow = §1.4 hover.
// =====================================================================================
const PAGES_CONTENT = {
  colors: {
    'side-card': 'rgba(255,255,255,.6)', // B T2 StorySideMenu card
    'meta-dot': '#17171C', // B T3 BlogCard meta dot
    'cta-body': 'rgba(255,255,255,.8)', // B T4 trial card body
    'topic-bar': 'rgba(255,255,255,.94)', // B T5 sticky TopicBar
    report: {
      ink: '#141414', // B T9 headings / read card / CTA
      muted: '#5F5F66', // fact labels, ledes
      trust: '#9A9AA2', // trust label
      card: '#F5F5F7', // finding card bg + donut hole
      caption: '#4E4E55', // finding caption
      magenta: '#E04BD6', // chart + mesh stop
      lilac: '#CDCEF3', // chart track
      amber: '#E8A33D', // mesh stop
      violet: '#6F6FE6', // mesh stop
      orange: '#F07A3C', // mesh base
      rule: '#ECECEF', // numbered list divider
      'pink-mid': '#801470', // StoryRail company (pink) – measured, 1 step off tag-meta.pink
    },
    'on-art': { 78: 'rgba(255,255,255,.78)', 92: 'rgba(255,255,255,.92)', 94: 'rgba(255,255,255,.94)', 95: 'rgba(255,255,255,.95)' }, // B T9 text on mesh
    social: { bg: '#F3F4F9', link: '#0077B5', age: 'rgba(0,0,0,.6)' }, // B T10 SocialPostCard
    'glossary-bg': '#FBFAF9', // B T11 hero
  },
  fontSize: {
    'story-name-md': t('16px', '25px'), // B T1 card name @<1440
    'name-11-tight': t('11px', '11px'), // B T1 phone card name / quote role
    'story-34': t('34px', '34px', '-1.36px'), // B T1 wide title / T2 related title @1000
    'story-phone': t('30px', '28px', '-1.2px'), // B T1/T2 card title @390
    'blog-feature-xl': t('44px', '48px', '-1.76px'), // B T3 featured title
    'blog-feature-lg': t('32px', '36px', '-1.28px'),
    'blog-feature-sm': t('24px', '26px', '-0.96px'),
    'blog-meta': t('16px', '16px', '-0.32px'), // B T3 card meta
    'blog-meta-sm': t('14px', '14px', '-0.28px'),
    'cirka-20': t('20px', '26px'), // B T6 related guide title
    'cirka-18': t('18px', '23.4px'), // B T9 list number, B T12 question
    'faq-doc': t('14px', '22.4px'), // B T12 answer
    'attr-13': t('13px', '13px'), // B T9 quote attribution @1000
    'social-name': t('18px', '22px'), // B T10 author name (line-height not measured: normal ≈ 1.2)
  },
  borderRadius: {
    'avatar-sm': '7px', // B T5 author avatar
    'int-tile': '9.4px', // B T2 illustration tile
  },
  boxShadow: {
    'side-menu': '0 4px 80.2px rgba(0,0,0,.1)', // B T2
    'int-tile': '0 2.17px 8.68px rgba(0,0,0,.15), 0 0 2.17px rgba(0,0,0,.15)', // B T2 illustration tiles
    'ui-shot': '18px 18px 60px rgba(151,151,151,.2)', // B T2 imageStat screenshot
    'read-card': '0 30px 60px -30px rgba(20,14,50,.45)', // B T9
    social: '0 2px 12px rgba(0,0,0,.08)', // B T10
  },
  backdropBlur: {
    'side-menu': '6.15px', // B T2
    'quote-card': '39.6px', // B T2 Featured Card-01
  },
  backgroundImage: {
    // B T9 hero / pull-quote art: CSS stand-in for the blurred orange→pink→violet mesh (spec-suggested stops)
    'report-mesh':
      'radial-gradient(55% 95% at 0% 20%, #E8A33D 0%, rgba(232,163,61,0) 70%), radial-gradient(50% 85% at 50% 15%, #E04BD6 0%, rgba(224,75,214,0) 72%), radial-gradient(60% 110% at 100% 90%, #6F6FE6 0%, rgba(111,111,230,0) 75%), linear-gradient(90deg, #F07A3C 0%, #E04BD6 55%, #6F6FE6 100%)',
    'report-number': 'linear-gradient(90deg, #E8A33D 0%, #E04BD6 55%, #6F6FE6 100%)', // B T9 list numbers
    // B T2 illustration connector fade (used as mask-image)
    'int-fade': 'linear-gradient(270deg, transparent 3%, #000 15%, #000 85.04%, transparent 98%)',
  },
  transitionTimingFunction: {
    card: 'cubic-bezier(0.2, 0.8, 0.2, 1)', // B §1.3 alt curve (StoryCard uses the spring)
  },
}

for (const [key, values] of Object.entries(PAGES_CONTENT)) {
  const cur = module.exports.theme.extend[key] || {}
  const next = { ...cur }
  for (const [k, v] of Object.entries(values)) {
    next[k] = v && typeof v === 'object' && !Array.isArray(v) && cur[k] && typeof cur[k] === 'object' ? { ...cur[k], ...v } : v
  }
  module.exports.theme.extend[key] = next
}
// end pages: content

// =====================================================================================
// pages: commerce (SPEC_PAGES_A T3 /integrations, T4 /integrations/<slug>, T5 /pricing, T6 /get-a-demo). Appended
// block; nothing above is modified. Reused (same value, not redefined): ring glass rgba(255,255,255,.4) =
// marquee-bg, ring outline rgba(0,0,0,.1) = card-border, quote card glass rgba(255,255,255,.3) = glass-30,
// MetaCard bg #FBFBFB = meta-card / border #CCCCCC = preview-border, rgba(0,0,0,.75) = body-75, #1A1A1A = ink-900,
// legal 14/14 = label, back link 18/23.4 = body-18, radius 12 = playbook. "sampled" = read off the recon PNGs.
// =====================================================================================
const PAGES_COMMERCE = {
  colors: {
    'orbit-glow': 'rgba(255,195,248,.5)', // A T2.5 Ellipse 1143 pink glow
    'catalog-rule': '#9DC0D5', // sampled: 1px rule on the right edge of the T3.3 sidebar (not in spec text)
  },
  fontSize: {
    'detail-h2': t('28px', '32px', '-1.12px'), // A T4 body H2/H3
    'pill-14': t('14px', '15.4px', '-0.56px'), // A T4 MetaCard "Get a demo" (Inter 600)
    'quote-18-27': t('18px', '27px'), // A T6 quote card (Ginto Medium)
    'legal-10': t('10px', '14px'), // A T6 legal line @1000
  },
  borderRadius: {
    'demo-avatar': '6.51px', // A T6 quote avatar
  },
  boxShadow: {
    // A T2.5 orbit tile (474 version) and the x1.726 818 version
    'orbit-tile-sm': '0 1.02px 9.44px rgba(0,0,0,.15), 0 0 2.36px rgba(0,0,0,.15)',
    'orbit-tile': '0 1.76px 16.29px rgba(0,0,0,.15), 0 0 4.07px rgba(0,0,0,.15)',
  },
  blur: {
    'orbit-sm': '64px', // A T2.5 glow, 474 version
    orbit: '111px', // A T2.5 glow, 818 version
  },
  backdropBlur: {
    orbit: '64px', // A T2.5 glass rings
    'demo-quote': '30px', // A T6 quote card
  },
  backgroundImage: {
    // A T6 decorative art (live: a 2667x3480 PNG of soft magenta / violet / yellow squares), recreated with CSS:
    // brand magenta #FF29E5, indigo #4348DC, sun #FACB12 over white, split into the 2x3 panel grid seen on live.
    'demo-art':
      'linear-gradient(90deg, rgba(255,255,255,0) 47.6%, rgba(255,255,255,.55) 47.7%, rgba(255,255,255,0) 49%), linear-gradient(180deg, rgba(255,255,255,0) 40.6%, rgba(255,255,255,.45) 40.7%, rgba(255,255,255,0) 42%, rgba(255,255,255,0) 81.4%, rgba(255,255,255,.6) 81.5%, rgba(255,255,255,0) 83%), radial-gradient(55% 40% at 30% 30%, rgba(255,41,229,.95) 0%, rgba(255,41,229,0) 75%), radial-gradient(45% 45% at 75% 25%, rgba(255,41,229,.9) 0%, rgba(255,41,229,0) 75%), radial-gradient(45% 40% at 100% 70%, rgba(67,72,220,.95) 0%, rgba(67,72,220,0) 80%), radial-gradient(35% 30% at 0% 85%, rgba(250,203,18,.7) 0%, rgba(250,203,18,0) 80%), linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)',
  },
}

for (const [key, values] of Object.entries(PAGES_COMMERCE)) {
  const cur = module.exports.theme.extend[key] || {}
  const next = { ...cur }
  for (const [k, v] of Object.entries(values)) {
    next[k] = v && typeof v === 'object' && !Array.isArray(v) && cur[k] && typeof cur[k] === 'object' ? { ...cur[k], ...v } : v
  }
  module.exports.theme.extend[key] = next
}
// end pages: commerce

// =====================================================================================
// homepage variants (Proof / Stories / Button variants for the page templates; see COMPONENTS.md "Homepage
// component variants"). Appended block, deep-merged; nothing above is modified. Reused (same value, not redefined):
// T1.6 tints pink #FEEAFC / #400B39 = tint.pink / tag-text.pink, peach #FCEDE8 / #3B1208 = tint.peach /
// tag-text.red, B T8 green #E7F4E8 = tint.green, rgba(0,0,0,.75) = body-75, #222 = outline-border, #F4F4F4 =
// chip-soft, Cirka 40/36 / 36/36 = compare-xl / compare-lg, 20/25 = name-20, 20/26 = body-20, 18/23.4 = body-18,
// 16/20.8 = body-16-md, 16/16 = field-16, 14/18 = small, 16/18 = tag, 13/13 = label-13, brand gradient A = brand-4.
// =====================================================================================
const HOMEPAGE_VARIANTS = {
  colors: {
    'story-tint': { peach: '#FDECE8', pink: '#FFEBFD' }, // A /product split card + B T8 testimonial panels
    'about-fade': '#F9F9F9', // C A3 about Proof gradient end
  },
  fontSize: {
    'name-18': t('18px', '25px'), // A T1.6 wide card name @1200–1439
  },
  backgroundImage: {
    'about-fade': 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 100%)', // C A3
  },
}

for (const [key, values] of Object.entries(HOMEPAGE_VARIANTS)) {
  const cur = module.exports.theme.extend[key] || {}
  const next = { ...cur }
  for (const [k, v] of Object.entries(values)) {
    next[k] = v && typeof v === 'object' && !Array.isArray(v) && cur[k] && typeof cur[k] === 'object' ? { ...cur[k], ...v } : v
  }
  module.exports.theme.extend[key] = next
}
// end homepage variants

// =====================================================================================
// pages: product (SPEC_PAGES_A T1 AEO detail + T2 product landings, SPEC_PAGES_B T8 competitor detail,
// SPEC_PAGES_C T1 /about + /careers). Appended block, deep-merged; nothing above is modified. Reused (same value,
// not redefined): panel #F2F2F2 = panel, cta-blue #4348DC = brand.indigo, #FBFBFB = meta-card, #FAFAFA = field
// (B T8 feature card), #F7F7F7 = tag-bg (video frame border), #666 = muted, #808080 = muted.3, #1A1A1A = ink-900,
// rgba(0,0,0,.75) = body-75, tints = tint.* / story-tint.*, 24/30 = sub-xl, 16/22.4 = body-16, 14/19.6 =
// para-14-phone, 30/30 = quote, Cirka 40/36 = compare-xl, radius 24 = photo, 12 = playbook, 16 = card.
// =====================================================================================
const PAGES_PRODUCT = {
  colors: {
    mark: '#D7D5F1', // A T2.7 coach quote highlight
    'quote-ink': '#1C1C1C', // A T2.7 QuoteCard name / role
    'blog-rule': '#F0F0F0', // A T2.6 BlogGrid 2px top rule
    'video-time': '#5100FF', // A T2 VideoFrame time label
    'vs-card': '#F8F8F8', // B T8 VsIntroCards
    'values-card': 'rgba(255,255,255,.85)', // C C3 ValuesBento card
    ashby: { accent: '#5B3FFF', meta: '#555555' }, // C C5 open-roles list (component source)
  },
  fontSize: {
    'values-title': t('24px', '28.8px'), // C C3 bento card title (Cirka)
    'values-body': t('16px', '24px'), // C C3 bento card body
    'vs-word-md': t('36px', '36px', '-1.44px'), // B T8 VsHero title words <1200
  },
  boxShadow: {
    'video-frame': '0 4px 24px rgba(0,0,0,.12)', // A T2 VideoFrame
    'video-bar': '0 2px 12px rgba(0,0,0,.2)', // A T2 VideoFrame controls bar
  },
  backdropBlur: {
    'video-bar': '8px', // A T2 VideoFrame controls bar
    values: '12.8px', // C C3 bento card
  },
  backgroundImage: {
    // C C1 careers hero: CSS stand-in for the decorative PNG (soft green radial glow with faint grid squares)
    'careers-glow':
      'linear-gradient(90deg, rgba(255,255,255,0) 0 calc(25% - 1px), rgba(231,244,232,.9) calc(25% - 1px) 25%, rgba(255,255,255,0) 25% calc(75% - 1px), rgba(231,244,232,.9) calc(75% - 1px) 75%, rgba(255,255,255,0) 75%), radial-gradient(42% 46% at 50% 45%, rgba(200,233,203,.95) 0%, rgba(231,244,232,.7) 45%, rgba(255,255,255,0) 100%)',
  },
}

for (const [key, values] of Object.entries(PAGES_PRODUCT)) {
  const cur = module.exports.theme.extend[key] || {}
  const next = { ...cur }
  for (const [k, v] of Object.entries(values)) {
    next[k] = v && typeof v === 'object' && !Array.isArray(v) && cur[k] && typeof cur[k] === 'object' ? { ...cur[k], ...v } : v
  }
  module.exports.theme.extend[key] = next
}
// end pages: product
