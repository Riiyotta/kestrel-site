import PlaceholderLogo from '../PlaceholderLogo.jsx'

// J5 JobCard (SPEC_PAGES_C T4; shared with a future /cx-jobs/all-roles). Link wrapper, padding 20, white,
// 1px border rgba(0,0,0,.08) drawn as an overlay (::after, takes no layout space), radius 0, column gap 12.
// Hover: border -> #000, instant.
export function PinIcon({ className = '' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M6 11s3.75-3.4 3.75-6.25a3.75 3.75 0 1 0-7.5 0C2.25 7.6 6 11 6 11Z" stroke="currentColor" strokeWidth="1" />
      <circle cx="6" cy="4.75" r="1.25" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export default function JobCard({ company, shape, title, desc, location, href = '#' }) {
  return (
    <a
      href={href}
      className="relative flex flex-col gap-3 bg-white p-5 font-inter after:pointer-events-none after:absolute after:inset-0 after:border after:border-jobs-hairline hover:after:border-ink"
    >
      <span className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-jobs-logo bg-jobs-logo-tile shadow-[inset_0_0_0_1px] shadow-jobs-logo-border">
          <PlaceholderLogo name={company} shape={shape} w={24} h={24} mark markScale={0.55} className="fill-ink" />
        </span>
        <span className="text-jobs-14-tight text-jobs-muted">{company}</span>
      </span>
      <span className="text-jobs-card-title font-semibold text-ink">{title}</span>
      <span className="text-jobs-13-tight text-jobs-muted-2">{desc}</span>
      <span className="flex items-center gap-[5px] text-jobs-13 text-jobs-muted-2">
        <PinIcon />
        {location}
      </span>
    </a>
  )
}
