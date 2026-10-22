import { Link } from 'react-router-dom'
import AnnouncementPill from './AnnouncementPill.jsx'
import Button from './Button.jsx'
import { KestrelMark } from './Logo.jsx'

// FOOTER V5 – CLONE_SPEC §14 (1440), §15 (1200–1439: CTA glass 1120x224, heading width 681 @50px, footer card
// 1108 wide, Ask AI row wraps), §16 (phone). 810–1199 = live "Tablet" footer (40px gutters, column CTA, 3-col links).
// No scroll reveals measured in the footer (§14). Motion hooks for the animation pass:
//   [data-motion="footer-stripes"]  WebGL stand-in behind the CTA (same Unicorn scene as the hero) – reuses the hero
//                                   stand-in drift (.hero-glow-drift: 11s wash + 9s stripe comb). No scroll reveals on live.
//   [data-motion="button-hover"] / [data-motion="announcement*"]  come from the shared Button / AnnouncementPill
// Link hover (colour -> #1A1A1A + underline) is a static CSS state.

const COPY = {
  cta: ['Hard cases are our home turf', 'Try Kestrel free for a full 30 days.'],
  tagline: ['The AI resolution specialist', 'for regulated, high-stakes teams'], // 3 lines @390, 2 lines md+ (live)
  announcement: 'Meet Kestrel for agents', // label ~200px like live (pill 280 vs 277)
  askAi: 'Ask AI about Kestrel',
  copyright: '© 2026 Kestrel. All rights reserved.',
  companyId: 'Reg. no. 12 345 678 901',
  legal: ['Privacy policy', 'Terms of service'],
  cookies: 'Cookie settings',
}

const COLUMNS = [
  {
    title: 'Product',
    links: ['Platform overview', 'How it works', 'AI agents', 'Voice', 'Coaching', 'Quality review', 'Simulations', 'Guardrails', 'Outbound', 'Trust & security', 'Pricing', 'Integrations'],
  },
  {
    title: 'Solutions',
    links: ['Banking & lending', 'Healthcare', 'Insurance', { label: 'Agent-to-agent support', tag: 'New' }, 'MCP server', 'Kestrel API'],
  },
  {
    title: 'Compare',
    to: '/competitors', // competitor slugs are decided by the page builders -> every link goes to the index
    links: ['vs help desk bots', 'vs scripted IVR', 'vs outsourced BPO', 'vs in-house builds', 'vs macros', 'vs live chat only', 'vs ticket routing', 'vs knowledge bots', 'vs email triage', 'vs DIY agents', 'All comparisons'],
  },
  {
    title: 'Resources',
    links: ['Articles', 'Blog', 'Customer stories', 'Glossary', 'FAQ', 'Field notes', 'CX careers', 'Toolkit'],
  },
  {
    title: 'Guides',
    to: '/articles', // guide/article slugs are decided by the page builders -> index
    links: ['AI support statistics', 'Service metrics', 'What is a good CSAT', 'Cost per contact', 'First reply time', 'Contact centre benchmarks', 'Picking AI support tools'] // 7 links like live,
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Partners', 'Press kit', 'Awards', 'Trust centre', 'Contact'] // 7 links like live,
  },
]

// Clone routes per link label (columns with a `to` send every link there). Labels missing here stay "#":
// "Agent-to-agent support" and "Awards" have no matching route.
const ROUTES = {
  'Platform overview': '/product',
  'How it works': '/product/how-it-works',
  'AI agents': '/product/ai-agents',
  Voice: '/product/voice',
  Coaching: '/product/coach',
  'Quality review': '/product/quality-assurance',
  Simulations: '/product/simulations',
  Guardrails: '/product/guardrails',
  Outbound: '/product/outbound',
  'Trust & security': '/product/trust',
  Pricing: '/pricing',
  Integrations: '/integrations',
  'Banking & lending': '/industry/financial-services',
  Healthcare: '/industry/healthcare',
  Insurance: '/industry/insurance',
  'MCP server': '/integrations/mcp',
  'Kestrel API': '/integrations/api',
  Articles: '/articles',
  Blog: '/blog',
  'Customer stories': '/customer-stories',
  Glossary: '/glossary',
  FAQ: '/faq',
  'Field notes': '/thoughts-on-cx',
  'CX careers': '/cx-jobs',
  Toolkit: '/articles',
  About: '/about',
  Careers: '/careers',
  Partners: '/partner',
  'Press kit': '/press-kit',
  'Trust centre': '/product/trust',
  Contact: '/get-a-demo',
  'Privacy policy': '/privacy-policy',
  'Terms of service': '/terms-of-service',
}

/* ---------- small glyphs (generic, own drawings; third-party AI logos / LinkedIn are placeholders) ---------- */

const AI_GLYPHS = [
  <path key="a" d="M9 1.5 10.8 7.2 16.5 9l-5.7 1.8L9 16.5 7.2 10.8 1.5 9l5.7-1.8Z" />,
  <path key="b" d="M9 2v14M2 9h14M4 4l10 10M14 4 4 14" fill="none" strokeWidth="1.6" strokeLinecap="round" />,
  <path key="c" d="M9 2 15 5.5v7L9 16l-6-3.5v-7Z" fill="none" strokeWidth="1.6" strokeLinejoin="round" />,
  <circle key="d" cx="9" cy="9" r="6" fill="none" strokeWidth="1.6" />,
  <path key="e" d="M3 13.5 9 3l6 10.5Z" fill="none" strokeWidth="1.6" strokeLinejoin="round" />,
]

function RoundButton({ label, size = 18, children }) {
  // 42 outer rgba(231,231,231,.5) padding 3 radius 9999 -> 36 white circle; icon 18 (social 16)
  return (
    <a href="#" aria-label={label} className="flex h-[42px] w-[42px] shrink-0 rounded-pill bg-tag-glass p-[3px]">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
        <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" className="fill-ink-900 stroke-ink-900">
          {children}
        </svg>
      </span>
    </a>
  )
}

function Badge({ label }) {
  // compliance badge 42x42 (brand/content PNG) -> generic monochrome seal placeholder
  return (
    <span role="img" aria-label={`${label} badge (placeholder)`} className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-ink-900">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true" className="stroke-white" strokeWidth="1.2">
        <circle cx="15" cy="15" r="12.5" />
        <path d="M9 15h12M15 9v12" />
      </svg>
    </span>
  )
}

// Route <Link> when the label maps to a clone route, otherwise the "#" placeholder anchor.
function FooterAnchor({ to, children, ...rest }) {
  return to ? (
    <Link to={to} {...rest}>
      {children}
    </Link>
  ) : (
    <a href="#" {...rest}>
      {children}
    </a>
  )
}

function FooterLink({ link, to }) {
  const label = typeof link === 'string' ? link : link.label
  return (
    <FooterAnchor
      to={to ?? ROUTES[label]}
      className="inline-flex h-[22px] w-fit items-center gap-1.5 whitespace-nowrap rounded-footer-link py-1 font-sans font-medium text-label text-ink-nav hover:text-ink-900 hover:underline"
    >
      {label}
      {link.tag && (
        <span className="flex h-[18px] items-center rounded-pill bg-tag-bg px-[7px] font-sans text-new-tag text-new-magenta">{link.tag}</span>
      )}
    </FooterAnchor>
  )
}

/* ---------- giant wordmark (original Kestrel lockup, 217x46 => 4.72:1) ---------- */

function GiantWordmark() {
  return (
    <Link to="/" aria-label="Kestrel home" className="block w-full">
      <svg viewBox="0 0 217 46" className="block h-auto w-full fill-ink-900" aria-hidden="true">
        <g transform="translate(0 0) scale(1.6429)">
          <KestrelMark />
        </g>
        <text x="48" y="44" textLength="169" lengthAdjust="spacingAndGlyphs" className="font-display" style={{ fontSize: 56 }}>
          Kestrel
        </text>
      </svg>
    </Link>
  )
}

export default function Footer() {
  return (
    <footer data-section="footer" className="relative overflow-clip bg-white px-4 pb-8 md:px-10 lg:px-20">
      {/* Hero stripes WebGL stand-in (same scene as the hero), centred. Live: 1200x874 at y -150 (phone), 1990x1198 at
          y -278 (md), 2023x1216 at y -158 (lg+). Mask not given in spec – reuses the hero stand-in mask. */}
      <div
        aria-hidden="true"
        data-motion="footer-stripes"
        className="hero-glow-placeholder hero-glow-drift pointer-events-none absolute left-[calc(50%-600px)] top-[-150px] h-[874px] w-[1200px] md:left-[calc(50%-995px)] md:top-[-278px] md:h-[1198px] md:w-[1990px] lg:left-[calc(50%-1011.5px)] lg:top-[-158px] lg:h-[1216px] lg:w-[2023px]"
      >
        <div className="hero-glow-placeholder__colour" />
        <div className="hero-glow-placeholder__stripes" />
      </div>

      {/* Stage: padding-top 150 / 200 (md) / 240 (lg), gap 12 / 16 / 20 */}
      <div className="relative mx-auto flex max-w-container flex-col gap-3 pt-[150px] md:gap-4 md:pt-[200px] lg:gap-5 lg:pt-60">
        {/* CTA glass (padding 4 radius 18 phone; 6 / 20 md+) -> CTA card: padding 28px 20px gap 24 (phone), 40 gap 28
            column (md), 56 gap 40 row (lg+) */}
        <div className="glass-panel rounded-footer-mark p-1 md:rounded-glass md:p-1.5">
          <div className="flex flex-col gap-6 rounded-inner bg-white px-5 py-7 shadow-hair md:gap-7 md:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:p-14">
            <h2 className="font-framer font-display text-h3-phone tracking-display-sub text-ink md:text-h3-md md:tracking-display-sub lg:max-w-cta-heading-lg lg:flex-1 lg:text-h3-lg lg:tracking-display-sub xl:max-w-cta-heading-xl xl:text-h3-xl xl:tracking-display-sub">
              {COPY.cta[0]}
              {/* the grey clause always starts a new line (live: 2+2 lines @390, 1+1 md+) */}
              <br /> <span className="text-muted-2">{COPY.cta[1]}</span>
            </h2>
            {/* phone: the two buttons sit centred in equal halves of the 310 row (live 151 + 8 + 151) */}
            <div className="flex shrink-0 gap-2 md:gap-3">
              <div className="flex flex-1 justify-center md:flex-none">
                <Button variant="dark" href="/get-a-demo">Get a demo</Button>
              </div>
              <div className="flex flex-1 justify-center md:flex-none">
                <Button variant="light">Start free trial</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer glass -> card padding 24px 20px (phone) / 40 (md) / 48px 56px (lg+) */}
        <div className="glass-panel rounded-footer-mark p-1 md:rounded-glass md:p-1.5">
          <div className="flex flex-col rounded-inner bg-white px-5 py-6 shadow-hair md:p-10 lg:px-14 lg:py-12">
            {/* Intro (live): column gap 36 pb 24 (phone), column gap 55 pb 32 (md), row gap 32 pb 40 (lg+); bottom
                rule = Framer overlay (no layout space) */}
            <div className="rule-b flex flex-col gap-9 pb-6 md:gap-[55px] md:pb-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pb-10">
              {/* Brand row: mark + tagline, gap 14 (phone) / 20 */}
              <div className="flex items-center gap-[14px] md:gap-5 lg:min-w-0 lg:flex-1">
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-brain-outer bg-white shadow-footer-mark md:h-16 md:w-16 md:rounded-footer-mark">
                  {/* brand mark 28x37 -> Kestrel glyph */}
                  <KestrelMark className="h-[37px] w-[28px]" />
                </div>
                {/* tagline 24/24 244 wide 3 lines (phone), 26/26 (md), 28/28 (lg), 30/30 (xl), 2 lines md+ */}
                <p className="w-full max-w-tagline-phone font-framer font-display text-quote-phone tracking-display-sub text-ink md:min-w-0 md:max-w-none md:flex-1 md:text-quote-md md:tracking-display-sub lg:text-quote-lg lg:tracking-display-sub xl:text-quote xl:tracking-display-sub">
                  {COPY.tagline[0]}
                  <br /> {COPY.tagline[1]}
                </p>
              </div>
              <div className="shrink-0">
                <AnnouncementPill>{COPY.announcement}</AnnouncementPill>
              </div>
            </div>

            {/* Link columns (live): stacked, gap 32, padding 28px 0 32px (phone); 3-col grid, gap 40 x 24, padding 32px 0
                (md); one row space-between, padding 40px 0 (lg+). Titles 14/18 phone, 10/14 md, 13/14 lg, 14/14 xl. */}
            <nav aria-label="Footer" className="grid grid-cols-1 gap-8 pb-8 pt-7 md:grid-cols-3 md:gap-x-6 md:gap-y-10 md:py-8 lg:flex lg:justify-between lg:gap-0 lg:py-10">
              {COLUMNS.map((col) => (
                <div key={col.title} className="flex flex-col gap-4">
                  <p className="font-sans font-medium text-small text-muted md:text-footer-title-md lg:text-footer-title-lg xl:text-label">{col.title}</p>
                  <ul className="flex flex-col gap-2">
                    {col.links.map((l) => (
                      <li key={typeof l === 'string' ? l : l.label} className="flex">
                        <FooterLink link={l} to={col.to} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Ask AI row: padding-top 24 + top rule (overlay); phone column gap 16 (label above icons, gap 12); md+ row,
                66 tall, label -> icons gap 16. Label 14/14, 10/14 at md (live). */}
            <div className="rule-t flex flex-col gap-4 pt-6 md:min-h-[66px] md:flex-row md:flex-wrap md:items-center md:justify-between">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                <p className="font-sans font-medium text-label text-muted md:text-footer-title-md lg:text-label">{COPY.askAi}</p>
                <div className="flex gap-2">
                  {AI_GLYPHS.map((g, i) => (
                    <RoundButton key={i} label={`Ask assistant ${i + 1} (placeholder)`}>
                      {g}
                    </RoundButton>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Badge label="Security standard" />
                <Badge label="Audit report" />
                <Badge label="Privacy standard" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Giant wordmark: padding-top 48 / 64 (md) / 80 (lg), full container width (4.72:1) */}
      <div className="relative mx-auto max-w-container pt-12 md:pt-16 lg:pt-20">
        <GiantWordmark />
      </div>

      {/* Legal spacer 28 / 40 (md+), then Legal row: top rule #E3E3E3 (overlay), padding-top 24 */}
      <div className="h-7 md:h-10" aria-hidden="true" />
      <div className="rule-t-legal relative mx-auto flex max-w-container flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
        {/* phone: one wrapping group 209 wide, gap 12 x 20 (copyright / privacy + terms / cookies on three lines) */}
        <div className="flex max-w-[209px] flex-wrap gap-x-5 gap-y-3 md:max-w-none md:flex-nowrap md:items-center md:gap-6">
          <p className="w-full whitespace-nowrap font-sans text-small-13-tight text-muted-2 md:w-auto md:text-small-13 xl:text-small">{COPY.copyright}</p>
          {COPY.legal.map((l) => (
            <FooterAnchor key={l} to={ROUTES[l]} className="whitespace-nowrap font-sans text-small-13-tight text-ink md:text-small-13 xl:text-small">
              {l}
            </FooterAnchor>
          ))}
          {/* cookie settings: Ginto Medium 14/18 at every width (live) */}
          <a href="#" className="whitespace-nowrap font-sans font-medium text-small text-ink">
            {COPY.cookies}
          </a>
        </div>
        <div className="flex items-center gap-6">
          <p className="font-sans text-small-13-tight text-muted-2 md:text-small-13 xl:text-small">{COPY.companyId}</p>
          <RoundButton label="Kestrel on social (placeholder)" size={16}>
            {/* social network logo (group (b)) -> generic share glyph */}
            <path d="M5 9 13 4.5M5 9l8 4.5" fill="none" strokeWidth="1.5" />
            <circle cx="4.5" cy="9" r="2.5" />
            <circle cx="13.5" cy="4" r="2.5" />
            <circle cx="13.5" cy="14" r="2.5" />
          </RoundButton>
        </div>
      </div>
    </footer>
  )
}
