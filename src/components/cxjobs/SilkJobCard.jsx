import PlaceholderLogo from '../PlaceholderLogo.jsx'
import { JobsWhiteButton } from './JobsButton.jsx'

// J2 SilkJobCard (SPEC_PAGES_C T4): 348x491, padding 24, column space-between, radius 0, 1px inner rim white .1.
// The live WebGL "silk" shader is replaced by a CSS stand-in (.silk-card in index.css): layered gradients in the
// card hue over #0B0B0F with a slow background-position drift (off under prefers-reduced-motion).
// Logo tile 56x56 #F5F5F5 + 1px rgba(0,0,0,.06); bottom group gap 18: title 600 24/32.4 -0.46 white (300 wide) + White button.
// Literal class names so Tailwind keeps the @layer utilities rules.
const HUES = { magenta: 'silk-magenta', indigo: 'silk-indigo', ember: 'silk-ember', sun: 'silk-sun' }

export default function SilkJobCard({ company, shape, hue, title, delay = 0 }) {
  return (
    <article
      className={`silk-card ${HUES[hue]} relative flex h-[491px] w-[348px] shrink-0 flex-col justify-between p-6 shadow-silk-rim`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="flex h-14 w-14 items-center justify-center bg-jobs-logo-tile shadow-[inset_0_0_0_1px] shadow-jobs-logo-border">
        <PlaceholderLogo name={company} shape={shape} w={56} h={56} mark className="fill-ink" />
      </span>
      <div className="flex flex-col gap-[18px]">
        <h3 className="max-w-silk-title font-inter text-jobs-silk-title font-semibold text-white">{title}</h3>
        <JobsWhiteButton>Apply now</JobsWhiteButton>
      </div>
    </article>
  )
}
