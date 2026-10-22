import DocSidebar, { scrollToAnchor } from '../components/presskit/DocSidebar.jsx'
import DocSection, { BODY_TEXT, DISPLAY_HEADING, DocHeaderRow } from '../components/presskit/DocSection.jsx'
import AssetPreview, { IconPreview } from '../components/presskit/AssetPreview.jsx'
import ColorSwatch from '../components/presskit/ColorSwatch.jsx'
import TypeSpecimen from '../components/presskit/TypeSpecimen.jsx'
import KestrelLockup, { KestrelMarkFluid } from '../components/presskit/KestrelLockup.jsx'
import useDocumentTitle from '../lib/useDocumentTitle.js'

// T5 Press kit (SPEC_PAGES_C.md T5): brand-guidelines doc page. Standalone: no global nav/footer/teaser.
// Root = row (>=810): sticky DocSidebar (18%) + main column. Content is Kestrel's own brand: swatches are the clone's
// colour tokens, specimens are the fonts the clone loads (Fraunces, Inter), previews use the Kestrel Logo artwork.

const SIDEBAR_LINKS = [
  { hash: '#intro', label: 'Intro' },
  { hash: '#logo', label: 'Logo' },
  { hash: '#color', label: 'Color' },
  { hash: '#typography', label: 'Typography' },
]
const TOC = [
  { hash: '#logo', label: '01 Logo' },
  { hash: '#color', label: '02 Color' },
  { hash: '#typography', label: '03 Typography' },
]
const SVG = '/assets/presskit/'

// Primary palette = the clone's brand tokens (+ the forest green token standing in for the spec's off-token green).
const PRIMARY = [
  { name: 'Magenta', swatchClass: 'bg-brand-magenta' },
  { name: 'Sun', swatchClass: 'bg-brand-sun' },
  { name: 'Forest', swatchClass: 'bg-tag-meta-green' },
  { name: 'Indigo', swatchClass: 'bg-brand-indigo' },
  { name: 'Ember', swatchClass: 'bg-brand-ember' },
]
const GRADIENTS = [
  { name: 'Dusk sweep', art: 'gradient-art-1' },
  { name: 'Signal bloom', art: 'gradient-art-2' },
  { name: 'Daybreak', art: 'gradient-art-3' },
  { name: 'Field glow', art: 'gradient-art-4' },
]

// Rounded app-icon tile used inside the white icon previews (size ~44% of the preview: sampled, not in spec).
function AppIcon({ dark = false }) {
  return (
    <div className={`flex aspect-square w-[44%] items-center justify-center rounded-[22%] shadow-tile ${dark ? 'bg-ink-900' : 'bg-white'}`}>
      <div className="h-[55%]">
        <KestrelMarkFluid tone={dark ? 'white' : 'colour'} />
      </div>
    </div>
  )
}

export default function PressKit() {
  useDocumentTitle('Brand guidelines | Kestrel')
  return (
    <div className="flex min-h-screen flex-col bg-white text-ink md:flex-row">
      <DocSidebar links={SIDEBAR_LINKS} />

      <main className="min-w-0 flex-1">
        {/* Hero image: full main width, 16:9, brand indigo field + white lockup (lockup width sampled ~47%) */}
        <div className="flex aspect-video w-full items-center justify-center bg-brand-indigo">
          <KestrelLockup tone="white" className="w-[47%]" />
        </div>

        <DocSection id="intro" top={false}>
          <DocHeaderRow title={<>Brand<br />Guidelines</>} as="h1">
            <p>Welcome to the Kestrel brand guidelines. This public page collects the logos, colours and type that make up our identity, ready for press and partners to use.</p>
            <p>Please follow these guidelines, and check with the Kestrel team before you publish anything new.</p>
            <p>Can&apos;t find the asset you need? Email the brand team at press@kestrel.example.</p>
          </DocHeaderRow>
        </DocSection>

        <DocSection pb="pb-[200px]">
          <div className="flex">
            <h2 className="w-1/2 font-framer font-display text-compare-lg tracking-display-sub text-ink xl:text-compare-xl xl:tracking-display-sub">Contents</h2>
            <ul className="flex w-1/2 flex-col gap-2.5 font-sans text-sub-phone text-ink md:text-sub-md lg:text-sub-lg xl:text-sub-xl">
              {TOC.map((t) => (
                <li key={t.hash}>
                  <a href={t.hash} onClick={(e) => scrollToAnchor(e, t.hash)}>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </DocSection>

        <DocSection id="logo">
          <DocHeaderRow title="01 Logo">
            <p>
              The logo is the anchor of the Kestrel identity. A compact mark paired with a serif wordmark, it signals a
              product that is precise and calm under pressure. Use the files below as supplied, give the lockup room to
              breathe, and never stretch, recolour or redraw it.
            </p>
          </DocHeaderRow>
          <div>
            <AssetPreview label="Primary" svg={`${SVG}kestrel-lockup.svg`}>
              <KestrelLockup tone="colour" className="w-[57%]" />
            </AssetPreview>
            <AssetPreview label="Single colour" dark svg={`${SVG}kestrel-lockup-white.svg`}>
              <KestrelLockup tone="white" className="w-[57%]" />
            </AssetPreview>
            <div className="flex flex-col gap-2.5 pt-10">
              <p className={BODY_TEXT}>Icon</p>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <IconPreview caption="App icon, colour" svg={`${SVG}kestrel-mark.svg`}>
                  <AppIcon />
                </IconPreview>
                <IconPreview caption="App icon, mono" svg={`${SVG}kestrel-mark-white.svg`}>
                  <AppIcon dark />
                </IconPreview>
                <IconPreview caption="Mark, colour" svg={`${SVG}kestrel-mark.svg`}>
                  <div className="h-[80%]">
                    <KestrelMarkFluid tone="colour" />
                  </div>
                </IconPreview>
                <IconPreview caption="Mark, reversed" dark svg={`${SVG}kestrel-mark-white.svg`}>
                  {/* dark tile: mark contained, 439 tall of 549 (80%) */}
                  <div className="h-[80%]">
                    <KestrelMarkFluid tone="white" />
                  </div>
                </IconPreview>
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection id="color" pb="pb-0">
          <DocHeaderRow title="02 Color">
            <p>
              Colour carries the Kestrel voice: bright brand hues for moments of energy, set against plenty of white and
              a deep ink for type. Use the primary palette for accents and illustration, the secondary pair for text and
              backgrounds, and keep gradients to hero moments.
            </p>
          </DocHeaderRow>
          {/* palette blocks: label -> content gap 40 and 104 between blocks are sampled from the screenshot */}
          <div className="flex flex-col gap-[104px] pb-[120px] pt-10">
            <div className="flex flex-col gap-10">
              <p className={BODY_TEXT}>Primary palette</p>
              <div className="grid grid-cols-2 gap-3 md:flex xl:gap-[68px]">
                {PRIMARY.map((c) => (
                  <ColorSwatch key={c.name} {...c} className="md:flex-1" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <p className={BODY_TEXT}>Secondary palette</p>
              <div className="flex gap-3 xl:gap-[68px]">
                <ColorSwatch name="Black" swatchClass="bg-ink" aspect="aspect-[524/529]" className="flex-1" />
                <ColorSwatch name="White" swatchClass="bg-white border border-ink" aspect="aspect-[524/529]" className="flex-1" />
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <h3 className="font-rethink text-gradient-head font-semibold text-ink">Gradient palette</h3>
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                {GRADIENTS.map((g) => (
                  <div key={g.name} className="flex flex-col gap-2.5">
                    <div className={`gradient-art ${g.art} relative aspect-[542.4/255] w-full overflow-hidden border border-ink bg-white`} />
                    <p className="font-sans text-small text-ink">{g.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection id="typography">
          <h2 className={DISPLAY_HEADING}>03 Typography</h2>
          <div className="flex flex-col gap-[58px]">
            <div className={`flex flex-col gap-5 ${BODY_TEXT}`}>
              <p>
                Our headline face is Fraunces, an open-source variable serif by Undercase Type. We set it at its largest
                optical size, where the soft, wedge-shaped serifs and high contrast give headlines a confident, editorial
                feel.
              </p>
              <p>
                Our text face is Inter, an open-source sans by Rasmus Andersson, drawn for screens. It stays clear at
                small sizes and keeps interface copy calm and even.
              </p>
            </div>
            <TypeSpecimen family="Fraunces" variant="serif" />
            <TypeSpecimen family="Inter" variant="sans" />
            {/* footnote size not in spec: body size read off the screenshot */}
            <p className={BODY_TEXT}>
              Both families are released under the SIL Open Font License; the Kestrel lockups remain trademarks of Kestrel.
            </p>
          </div>
        </DocSection>
      </main>
    </div>
  )
}
