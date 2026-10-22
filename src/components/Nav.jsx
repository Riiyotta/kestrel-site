import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import {
  NAV_CLOSE,
  NAV_EASE,
  NAV_FADE,
  NAV_MORPH,
  PANEL_IN,
  PANEL_OUT,
  PHONE_BARS,
  PHONE_CLOSE,
  PHONE_OPEN,
  PHONE_SCRIM_CLOSE,
  PHONE_SCRIM_OPEN,
  SUB_CLOSE,
  SUB_OPEN,
} from '../lib/motion.js'
import Logo from './Logo.jsx'
import Button from './Button.jsx'

// NAV – CLONE_SPEC §4 (desktop, >=1200) and §16/§17 (phone pill + sheet, used below 1200 – see report:
// the tablet nav was not measured and the desktop pill cannot fit its contents at 810px).
//
// Motion (measured on the live site by frame-sampling the framer-motion output – curves in src/lib/motion.js):
//   nav-indicator       – one shared pill; x/width slide between dropdown items (0.33s [.22,1,.36,1]),
//                         opacity 0<->1 with the dropdown; stays at the last item while closed (live)
//   nav-scrim / nav-dropdown – opacity 0->1 0.35s [.22,1,.36,1]; close waits ~240ms then 0.21s
//   nav-dropdown-shell  – width morph between panels (0.33s, same curve); x follows from the centring
//   nav-panel           – crossfade via AnimatePresence (out 0.3s [.22,1,.36,1] +30ms, in 0.29s ease-in-out +40ms)
//   labels / chevrons   – colour dims to .6, chevron rotates 180 + opacity .75->1, ~0.33s same curve
//   nav-trial-glow      – opacity 0->1 on hover: .12@13ms .82@76 .98@144 -> 0.25s [.22,1,.36,1]
//   Log in              – scale 1.1 + bg: in .22s [.35,.9,.3,1], out .31s [.25,.8,.3,1]
//   tiles / plain links – bg (and icon box flip) ~0.15s; feature card image scale 1.045 over ~0.65s
//   phone-nav-pill      – sheet height 0->auto + scrim/card fade 0.3s [.15,1,.7,1]; close 0.23s
//   phone-menu-bar-*    – bars 1/3 slide to centre + rotate +-45 (0.27s), bar 2 fades out
//   phone sub-menus     – height 0->auto 0.37s [.25,.9,.3,1] (collapse 0.34s), chevron rotate + button bg flip

// Tile / plain-link hover: bg 255 -> 246 in ~150ms (.2@47ms .78@81 .89@113 1@148), same back.
const TILE_T = 'transition-[background-color,box-shadow,filter] duration-150 ease-nav motion-reduce:transition-none'

// Label colour dim/undim tracks the dropdown: Industries .95@83ms .75@135 .66@181 .60@279 (≈0.33s, same curve).
const LABEL_T = 'transition-[color,background-color] duration-[330ms] ease-nav motion-reduce:transition-none'
// Phone sub-menu chevron button bg F4F4F5 <-> 0D0D0D and chevron rotation share the expand curve.
const SUB_T = (open) =>
  open ? 'duration-[370ms] ease-[cubic-bezier(0.25,0.9,0.3,1)]' : 'duration-[340ms] ease-[cubic-bezier(0.25,0.8,0.3,1)]'

const ICON = (name) => `/assets/icons/${name}.svg`

const PANELS = {
  product: {
    shellW: 1080,
    columns: [
      {
        eyebrow: 'Platform',
        tiles: [
          { icon: 'glyph-chat', title: 'Agent', desc: 'Your always-on front line', to: '/product/ai-agents' },
          { icon: 'glyph-braces', title: 'Copilot', desc: 'Guidance for your team', to: '/product/coach' },
        ],
      },
      {
        eyebrow: 'Assurance',
        tiles: [
          { icon: 'glyph-play-frame', title: 'Test runs', desc: 'Rehearse every workflow', to: '/product/simulations' },
          { icon: 'glyph-doc-search', title: 'Reviews', desc: 'Grade each chat as it lands', to: '/product/quality-assurance' },
          { icon: 'glyph-shield', title: 'Safeguards', desc: 'Policy checks at runtime', to: '/product/guardrails' },
        ],
      },
      {
        eyebrow: 'Connect',
        tiles: [
          { icon: 'glyph-bubbles', title: 'Channels', desc: 'Voice, chat, email and text from a single agent', to: '/product' },
          { icon: 'glyph-nodes', title: 'Connectors', desc: 'Hook into your helpdesk, CRM and in-house systems', to: '/integrations' },
        ],
      },
    ],
    tileWidth: 'w-[242.67px]', // 3 equal columns + 228 feature column, 20px gaps (live: 242.7)
    feature: {
      width: 'w-[224px]',
      fade: 'bg-dd-fade-navy',
      image: 'bg-gradient-to-br from-tint-lavender via-brand-indigo/40 to-brand-sun/70',
      // Pexels stock (IMAGE_CREDITS.md); decorative inside a labelled link, so alt stays empty
      photo: '/assets/photos/nav-feature-product.webp',
      chip: 'New',
      headline: 'Introducing Kestrel Relay',
      link: 'Read the launch post',
      to: '/blog', // post slugs are decided by the page builders -> index
    },
  },
  industries: {
    shellW: 865,
    columns: [
      {
        eyebrow: 'Sectors',
        tiles: [
          { icon: 'glyph-bank', title: 'Banking & lending', desc: 'Cards, loans and payments', to: '/industry/financial-services' },
          { icon: 'glyph-heart', title: 'Health', desc: 'Clinics, care and telehealth', to: '/industry/healthcare' },
          { icon: 'glyph-umbrella', title: 'Insurance', desc: 'Claims, cover and renewals', to: '/industry/insurance' },
        ],
      },
      {
        eyebrow: 'Case studies',
        // story slugs are decided by the page builders -> every case-study link goes to the index
        links: [
          { label: 'Northwind', to: '/customer-stories' },
          { label: 'Halcyon Pay', to: '/customer-stories' },
          { label: 'Orbit Health', to: '/customer-stories' },
          { label: 'All case studies', to: '/customer-stories' },
        ],
      },
    ],
    tileWidth: 'w-[272px]',
    linkWidth: 'w-[150px]',
    feature: {
      width: 'w-[320px]',
      fade: 'bg-dd-fade-black',
      image: 'bg-gradient-to-br from-card-gray via-line-gray to-muted-3',
      photo: '/assets/photos/nav-feature-industries.webp',
      chip: 'Case study',
      headline: 'How Orbit Health settles 58% of chats on its own',
      link: 'Read the case study',
      to: '/customer-stories',
    },
  },
  resources: {
    shellW: 475,
    columns: [
      {
        eyebrow: 'Learn',
        tiles: [
          { icon: 'glyph-pencil', title: 'Journal', desc: 'Product news and updates', to: '/blog' },
          { icon: 'glyph-binder', title: 'Toolkit', desc: 'Free calculators and kits', to: '/articles' },
          { icon: 'glyph-briefcase', title: 'Job board', desc: 'Open support roles', to: '/cx-jobs' },
          { icon: 'glyph-page', title: 'Reports', desc: 'Our research on AI service', to: '/content/the-handoff-gap' },
        ],
      },
      {
        eyebrow: 'Company',
        links: [
          { label: 'About', to: '/about' },
          { label: 'Careers', to: '/careers' },
          { label: 'Partners', to: '/partner' },
          { label: 'Security', to: '/product/trust' },
          { label: 'Brand assets', to: '/press-kit' },
          { label: 'Service Index', external: true }, // external on live; no clone route -> stays "#"
        ],
      },
    ],
    tileWidth: 'w-[256px]',
    linkWidth: 'w-[135px]', // live Resources plain rows are 135 wide (Industries 150)
  },
}

const ITEMS = [
  { label: 'Product', panel: 'product' },
  { label: 'Industries', panel: 'industries' },
  { label: 'Customers', to: '/customer-stories' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Resources', panel: 'resources' },
]

// Phone sheet rows. `panel` rows get a 28px chevron button that expands the sub-menu inline (live).
// Row labels link to an index route where one exists (Industries / Resources have none; Log in stays "#").
const PHONE_ROWS = [
  { label: 'Product', panel: 'product', to: '/product' },
  { label: 'Industries', panel: 'industries' },
  { label: 'Customers', to: '/customer-stories' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Log in' },
  { label: 'Resources', panel: 'resources' },
]

// Closes the open dropdown / phone menu after an in-app navigation (set by Nav). ScrollToTop resets the scroll.
const CloseNavContext = createContext(() => {})

// Route link when `to` is set (closes the menus on click), otherwise the "#" placeholder anchor as before.
function NavLink({ to, children, ...rest }) {
  const close = useContext(CloseNavContext)
  if (!to) {
    return (
      <a href="#" {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} {...rest} onClick={close}>
      {children}
    </Link>
  )
}

function Chevron({ open, className = '' }) {
  return (
    <img
      src={ICON('chevron-down')}
      alt=""
      width="10"
      height="10"
      className={`transition-[transform,opacity] duration-[350ms] ease-nav motion-reduce:transition-none ${open ? 'rotate-180' : ''} ${className}`}
    />
  )
}

/* ---------- shared pieces ---------- */

function GlassSheen({ className = 'inset-0 rounded-[inherit]' }) {
  // §4 Sheen overlay: soft-light, opacity .9
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bg-nav-sheen opacity-90 mix-blend-soft-light ${className}`}
    />
  )
}

function TrialButton({ className = '', full = false }) {
  // §4 "Start free trial" ring pill: gradient C ring, 2px inset white inner, hover glow 137x46 blur 10.
  return (
    <a href="#" className={`group relative inline-flex ${full ? 'h-11 flex-1' : 'h-[34px] w-[125px]'} ${className}`}>
      <span
        aria-hidden="true"
        data-motion="nav-trial-glow"
        className="pointer-events-none absolute -inset-1.5 rounded-nav-pill bg-brand-ring-glow opacity-0 blur-tag transition-opacity duration-[250ms] ease-nav group-hover:opacity-100 motion-reduce:transition-none"
      />
      <span className="relative flex w-full items-center rounded-nav-pill bg-brand-ring p-0.5">
        <span className="flex h-full w-full items-center justify-center whitespace-nowrap rounded-nav-pill bg-white font-medium text-label text-ink-nav">
          Start free trial
        </span>
      </span>
    </a>
  )
}

/* ---------- desktop mega-dropdown ---------- */

// Tile hover (live end state): row bg #F6F6F7, icon box flips to #0D0D0D with a white rim + soft drop,
// glyph inverts to white. Text is top-aligned (2-line descriptions grow the tile to 72px, icon stays at top).
function Tile({ tile, width, phone = false }) {
  return (
    <NavLink
      to={tile.to}
      className={`group/tile flex items-start gap-3 rounded-tile ${TILE_T} hover:bg-dd-tile-hover ${phone ? 'w-full px-1 py-1.5' : `p-2 ${width}`}`}
    >
      <span className={`shrink-0 ${phone ? 'py-0.5' : ''}`}>
        <span className={`flex h-10 w-10 items-center justify-center rounded-sm bg-chip shadow-dd-icon ${TILE_T} group-hover/tile:bg-ink-nav group-hover/tile:shadow-dd-icon-hover`}>
          <img src={ICON(tile.icon)} alt="" width="18" height="18" className={`${TILE_T} group-hover/tile:invert`} />
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-sans text-dd-title text-dd-title">{tile.title}</span>
        <span className="font-sans text-dd-desc text-dd-desc">{tile.desc}</span>
      </span>
    </NavLink>
  )
}

function PlainLink({ link, width = 'w-[150px]' }) {
  // Plain link rows 36 tall, radius 10, padding 8 (live: 150 wide in Industries, 135 in Resources).
  // Hover end state: bg #F6F6F7.
  return (
    <NavLink
      to={link.to}
      className={`flex h-9 items-center gap-1.5 rounded-tile px-2 font-sans text-dd-title text-dd-title ${TILE_T} hover:bg-dd-tile-hover ${width}`}
    >
      {link.label}
      {link.external && <img src={ICON('external-arrow')} alt="" width="10" height="10" className="opacity-55" />}
    </NavLink>
  )
}

// Feature card hover (live end state): image scales to 1.045, CTA arrow shifts +4px.
function FeatureCard({ f, phone = false }) {
  return (
    <NavLink
      to={f.to}
      className={`group/feature relative flex shrink-0 flex-col justify-end overflow-hidden rounded-tile bg-dd-feature p-[18px] ${
        phone ? 'h-[240px] w-full' : `h-[258px] ${f.width}`
      }`}
    >
      {/* image slot: Pexels stock photo over the gradient backdrop (same layer, so the hover scale still applies).
          Decorative: the link text carries the meaning, so alt is empty and the layer stays aria-hidden. */}
      <span aria-hidden="true" className={`absolute inset-0 transition-transform duration-[650ms] ease-[cubic-bezier(0.35,1,0.7,0.9)] group-hover/feature:scale-[1.045] motion-reduce:transition-none ${f.image}`}>
        {f.photo && (
          <img src={f.photo} alt="" loading="lazy" decoding="async" draggable="false" className="block h-full w-full object-cover" />
        )}
      </span>
      <span aria-hidden="true" className={`absolute inset-0 ${f.fade}`} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-tile shadow-dd-feature-rim" />
      <span className="relative mb-2 flex h-[21px] w-fit items-center rounded-nav-pill bg-dd-feature-chip px-2 font-medium text-dd-chip text-white shadow-dd-chip backdrop-blur-tag">
        {f.chip}
      </span>
      <span className="relative mb-2 font-sans text-dd-feature text-white">{f.headline}</span>
      <span className="relative flex items-center gap-1.5 pt-0.5 font-medium text-dd-link text-dd-feature-link">
        {f.link}
        <img
          src={ICON('arrow-right-white')}
          alt=""
          width="14"
          height="14"
          className="opacity-[.92] transition-transform duration-300 ease-nav group-hover/feature:translate-x-1 motion-reduce:transition-none"
        />
      </span>
    </NavLink>
  )
}

function Panel({ id }) {
  const p = PANELS[id]
  // Fixed width (= shell - 16) so content never reflows while the shell width morphs; the white Card lives in
  // DesktopNav so the crossfading panels share one opaque surface (live "Card" > "Panel X").
  return (
    <div data-panel={id} className="flex min-h-[306px] justify-between p-6" style={{ width: p.shellW - 16 }}>
      {p.columns.map((col) => (
        <div key={col.eyebrow} className="flex flex-col">
          {/* eyebrow block: padding 2px 8px 12px (26 tall) */}
          <p className="px-2 pb-3 pt-0.5 font-sans font-medium uppercase text-eyebrow text-dd-eyebrow">{col.eyebrow}</p>
          <div className="flex flex-col gap-0.5">
            {col.tiles?.map((t) => <Tile key={t.title} tile={t} width={p.tileWidth} />)}
            {col.links?.map((l) => <PlainLink key={l.label} link={l} width={p.linkWidth} />)}
          </div>
        </div>
      ))}
      {/* live Feature column = 4px left pad + card */}
      {p.feature && (
        <div className="pl-1">
          <FeatureCard f={p.feature} />
        </div>
      )}
    </div>
  )
}

// Logo.jsx renders a plain <a href>; route its clicks through the router (and close the menus) without touching
// the layout: the wrapper is display: contents.
function HomeLink({ children }) {
  const navigate = useNavigate()
  const close = useContext(CloseNavContext)
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    close()
    navigate('/')
  }
  return (
    <span className="contents" onClick={onClick}>
      {children}
    </span>
  )
}

function DesktopNav({ open, setOpen }) {
  // `panel` = last opened panel. Live keeps every panel mounted and just fades the dropdown, so after a close
  // the shell keeps its last width and re-opening on another item morphs from there while fading in.
  const [panel, setPanel] = useState('product')
  useEffect(() => {
    if (open) setPanel(open)
  }, [open])

  // Shared indicator: measure the active item inside the centre group (layout offsets, untransformed).
  const itemRefs = useRef({})
  const [ind, setInd] = useState(null)
  useLayoutEffect(() => {
    const el = itemRefs.current[open || panel]
    if (el) setInd({ x: el.offsetLeft, w: el.offsetWidth })
  }, [open, panel])

  const fade = open ? NAV_FADE : NAV_CLOSE

  return (
    // Hover area = pill + (while open) the dropdown Shell and the 12px bridge above it. The full-width bar and the
    // dropdown wrapper never take the pointer: live closes as soon as the pointer leaves the pill/Shell, also
    // sideways next to the Shell (the clone used to keep the whole 1440x334 wrapper as hover area).
    <div className="pointer-events-none fixed inset-x-0 top-nav-top z-[7] hidden h-[50px] lg:block" onMouseLeave={() => setOpen(null)}>
      {/* Scrim: always mounted (live), never takes the pointer so leaving the pill/dropdown closes the menu */}
      <motion.div
        data-motion="nav-scrim"
        className="pointer-events-none fixed inset-0 bg-scrim backdrop-blur-scrim"
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={fade}
        aria-hidden="true"
      />

      <nav
        aria-label="Main"
        // live: 1200–1439 the pill is inset 24px (x 24, w = vw-48); >=1440 it is the 1280 container at x 80
        className="pointer-events-auto relative mx-6 flex h-[50px] items-center justify-between rounded-nav-pill bg-nav-glass p-2 shadow-nav backdrop-blur-nav xl:mx-auto xl:max-w-container"
      >
        <GlassSheen />
        <HomeLink>
          <Logo className="relative pb-px pl-4" href="/" />
        </HomeLink>

        {/* center group, absolutely centred in the pill */}
        <div className="absolute left-1/2 top-1/2 flex h-[34px] -translate-x-1/2 -translate-y-1/2 items-center gap-1">
          {ind && (
            <motion.span
              data-motion="nav-indicator"
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-[34px] rounded-nav-pill bg-nav-hover-bg shadow-nav-indicator"
              initial={{ x: ind.x, width: ind.w, opacity: 0 }}
              animate={{ x: ind.x, width: ind.w, opacity: open ? 1 : 0 }}
              transition={{ x: NAV_MORPH, width: NAV_MORPH, opacity: fade }}
            />
          )}
          {ITEMS.map((item) => {
            const active = open && open === item.panel
            // Live: labels rest at #0D0D0D; while a dropdown is open the other items dim to .6 (colour, ~0.33s).
            const tone = open && !active ? 'text-nav-rest' : 'text-ink-nav'
            return item.panel ? (
              <button
                key={item.label}
                ref={(el) => (itemRefs.current[item.panel] = el)}
                type="button"
                aria-expanded={active ? 'true' : 'false'}
                onMouseEnter={() => setOpen(item.panel)}
                onFocus={() => setOpen(item.panel)}
                onClick={() => setOpen(active ? null : item.panel)}
                className={`relative flex h-8 items-center gap-1 rounded-nav-pill px-3 font-medium text-label tracking-nav-label ${LABEL_T} ${tone} hover:text-ink-nav`}
              >
                <span className="relative">{item.label}</span>
                <Chevron open={active} className={`relative ${active ? 'opacity-100' : 'opacity-75'}`} />
              </button>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                onMouseEnter={() => setOpen(null)}
                className={`flex h-8 items-center rounded-nav-pill px-3 font-medium text-label tracking-nav-label ${LABEL_T} ${tone} hover:bg-nav-hover-bg hover:text-ink-nav`}
              >
                {item.label}
              </NavLink>
            )
          })}
        </div>

        <div className="relative flex items-center">
          <a
            href="#"
            className="flex h-[34px] w-16 items-center justify-center rounded-nav-pill font-medium text-label text-ink-nav transition-[transform,background-color] duration-[310ms] ease-[cubic-bezier(0.25,0.8,0.3,1)] hover:scale-110 hover:bg-nav-hover-bg hover:duration-[220ms] hover:ease-[cubic-bezier(0.35,0.9,0.3,1)] motion-reduce:transition-none"
          >
            Log in
          </a>
          <Button size="md" variant="dark" className="ml-2" href="/get-a-demo" onClick={() => setOpen(null)}>
            Get a demo
          </Button>
          <TrialButton className="ml-2" />
        </div>
      </nav>

      {/* Dropdown wrapper: top 82, h 334; shell at top 94. Always mounted like live. The wrapper never takes the
          pointer; only the Shell (+ its 12px bridge up to the pill, drawn as ::before) does, and only while open. */}
      <motion.div
        data-motion="nav-dropdown"
        className="pointer-events-none fixed inset-x-0 top-[82px] flex h-[334px] justify-center pt-3"
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={fade}
        aria-hidden={open ? undefined : 'true'}
      >
        <motion.div
          data-motion="nav-dropdown-shell"
          className={`relative h-fit rounded-glass bg-dd-shell p-2 shadow-dd-shell-glass backdrop-blur-tag before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-[''] ${open ? 'pointer-events-auto' : ''}`}
          initial={false}
          animate={{ width: PANELS[panel].shellW }}
          transition={NAV_MORPH}
        >
          <div className="relative overflow-hidden rounded-inner bg-white shadow-hair">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={panel}
                data-motion="nav-panel"
                data-panel={panel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: PANEL_IN }}
                exit={{ opacity: 0, transition: PANEL_OUT }}
              >
                <Panel id={panel} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ---------- phone nav (§16) ---------- */

function MenuIcon({ open }) {
  // 3 bars 16x3 radius 2 #1A1A1A, gap 2 (16x13). Open: bars 1/3 slide to the centre and rotate +-45deg
  // (13x13 boxes), bar 2 fades (1 -> .82@44ms .30@76 .08@120 0@176).
  const bar = 'absolute left-0 h-[3px] w-4 rounded-[2px] bg-ink-900'
  return (
    <span className="relative block h-[13px] w-4" aria-hidden="true">
      <motion.span
        data-motion="phone-menu-bar-1"
        className={`${bar} top-0`}
        initial={false}
        animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={PHONE_BARS}
      />
      <motion.span
        data-motion="phone-menu-bar-2"
        className={`${bar} top-[5px]`}
        initial={false}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.17, ease: NAV_EASE }}
      />
      <motion.span
        data-motion="phone-menu-bar-3"
        className={`${bar} top-[10px]`}
        initial={false}
        animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={PHONE_BARS}
      />
    </span>
  )
}

// Phone sub-menu (live "Panel Tap › Mobile"): white, padding 4px 0 20px, columns stacked with 20px gaps;
// eyebrow block padding 4px 4px 6px; tiles padding 6px 4px (icon 40 in a 44 wrap); feature card full width x 240.
function PhonePanel({ id }) {
  const p = PANELS[id]
  return (
    <div data-motion="phone-nav-panel" className="flex flex-col gap-5 bg-white pb-5 pt-1">
      {p.columns.map((col) => (
        <div key={col.eyebrow} className="flex flex-col">
          <p className="px-1 pb-1.5 pt-1 font-sans font-medium uppercase text-eyebrow text-dd-eyebrow">{col.eyebrow}</p>
          <div className="flex flex-col gap-0.5">
            {col.tiles?.map((t) => <Tile key={t.title} tile={t} phone />)}
            {col.links?.map((l) => <PlainLink key={l.label} link={l} width="w-full" />)}
          </div>
        </div>
      ))}
      {p.feature && (
        <div className="pt-1">
          <FeatureCard f={p.feature} phone />
        </div>
      )}
    </div>
  )
}

function PhoneNav({ open, setOpen }) {
  const [sub, setSub] = useState(null) // expanded sub-menu id
  useEffect(() => {
    if (!open) setSub(null)
  }, [open])

  return (
    <div className="fixed inset-x-[15px] top-nav-top z-[7] lg:hidden">
      <motion.div
        data-motion="nav-scrim"
        className={`fixed inset-0 bg-scrim backdrop-blur-scrim ${open ? '' : 'pointer-events-none'}`}
        onClick={() => setOpen(false)}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={open ? PHONE_SCRIM_OPEN : PHONE_SCRIM_CLOSE}
        aria-hidden="true"
      />
      <nav
        aria-label="Main"
        data-motion="phone-nav-pill"
        // live open state: bg .5, radius 22, the dropdown-shell glass shadow and a 15px backdrop blur
        className={`relative mx-auto max-w-nav-phone transition-[background-color,border-radius,box-shadow] motion-reduce:transition-none ${
          open ? 'delay-[50ms] duration-300 ease-[cubic-bezier(0.15,1,0.7,1)]' : 'delay-[45ms] duration-[230ms] ease-[cubic-bezier(0.3,0.9,0.6,0.9)]'
        } ${
          open
            ? 'rounded-nav-phone-open bg-nav-glass-open shadow-dd-shell-glass backdrop-blur-nav-open'
            : 'rounded-nav-phone bg-nav-glass shadow-nav backdrop-blur-nav'
        }`}
      >
        {/* live Sheen stays on the 52px head (radius 26) when the sheet opens */}
        <GlassSheen className="inset-x-0 top-0 h-[52px] rounded-nav-phone" />
        <div className="relative flex h-[52px] items-center justify-between pl-6 pr-1">
          <HomeLink>
            <Logo className="pb-px" href="/" />
          </HomeLink>
          <div className="flex items-center gap-1">
            {!open && (
              <Button size="md" variant="dark" href="/get-a-demo">
                Get a demo
              </Button>
            )}
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open ? 'true' : 'false'}
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 items-center justify-center rounded-nav-pill"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
        {open && (
          // Sheet: padding 0 8px 8px > card white, radius 16, hairline. Scroll area padding 6px 16px 12px.
          // Height 0 -> auto + card fade (live pill 52 -> 458 and Card opacity track the scrim curve).
          <motion.div
            key="sheet"
            className="relative overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto', transition: PHONE_OPEN }}
            exit={{ height: 0, transition: PHONE_CLOSE }}
          >
          <motion.div
            className="px-2 pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: PHONE_OPEN }}
            exit={{ opacity: 0, transition: PHONE_CLOSE }}
          >
            <div className="overflow-hidden rounded-card bg-white shadow-hair">
              <ul className="max-h-[calc(100dvh-287px)] overflow-y-auto px-4 pb-3 pt-1.5" data-lenis-prevent>
                {PHONE_ROWS.map((row, i) => {
                  const expanded = sub === row.panel && !!row.panel
                  return (
                    // live divider: 1px #ECECED top rule on rows 2–6, drawn as an overlay (no layout space)
                    <li
                      key={row.label}
                      className={`relative ${
                        i > 0 ? 'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:border-t before:border-menu-divider' : ''
                      }`}
                    >
                      <div className="flex h-[52px] items-center justify-between rounded-sm px-1">
                        <NavLink to={row.to} className="font-sans text-menu-row text-ink-nav">
                          {row.label}
                        </NavLink>
                        {row.panel && (
                          <button
                            type="button"
                            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${row.label}`}
                            aria-expanded={expanded ? 'true' : 'false'}
                            onClick={() => setSub(expanded ? null : row.panel)}
                            className={`flex h-7 w-7 items-center justify-center rounded-nav-pill transition-colors motion-reduce:transition-none ${SUB_T(expanded)} ${expanded ? 'bg-ink-nav' : 'bg-chip'}`}
                          >
                            <img
                              src={ICON('chevron-down')}
                              alt=""
                              width="12"
                              height="12"
                              className={`transition-[transform,filter] motion-reduce:transition-none ${SUB_T(expanded)} ${expanded ? 'rotate-180 brightness-105 invert' : ''}`}
                            />
                          </button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            key={row.panel}
                            className="overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: 'auto', transition: SUB_OPEN }}
                            exit={{ height: 0, transition: SUB_CLOSE }}
                          >
                            <PhonePanel id={row.panel} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </ul>
              {/* sticky footer: padding 12, 24px top fade */}
              <div className="sticky bottom-0 bg-white p-3">
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-menu-fade" />
                <div className="flex gap-2.5">
                  <NavLink
                    to="/get-a-demo"
                    className="flex h-11 flex-1 items-center justify-center rounded-pill bg-ink-900 font-medium text-label text-white shadow-menu-btn-dark"
                  >
                    Get a demo
                  </NavLink>
                  <TrialButton full />
                </div>
              </div>
            </div>
          </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </nav>
    </div>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(null) // desktop: panel id | null
  const [phoneOpen, setPhoneOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setPhoneOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const closeAll = () => {
    setOpen(null)
    setPhoneOpen(false)
  }

  return (
    <MotionConfig reducedMotion="user">
      <CloseNavContext.Provider value={closeAll}>
        <header>
          <DesktopNav open={open} setOpen={setOpen} />
          <PhoneNav open={phoneOpen} setOpen={setPhoneOpen} />
        </header>
      </CloseNavContext.Provider>
    </MotionConfig>
  )
}
