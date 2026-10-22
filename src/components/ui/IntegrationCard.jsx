import PlaceholderLogo from '../PlaceholderLogo.jsx'

// IntegrationCard – SPEC_PAGES_A P4 (T3.3 catalogue, T4 "Other apps").
//   <a> row, gap 16, padding 16px 24px 16px 16px, bg #F7F7F7, radius 16, shadow 0 3px 30px rgba(0,0,0,0);
//   84 tall (1-line description) / 102 (2 lines).
//   Logo 36x36 contain (third-party logo -> PlaceholderLogo glyph tile).
//   Text column gap 8, overflow clip: name Ginto 20/26 rgba(0,0,0,.75) (16/20.8 phone) + description Ginto 14/18
//   #000 (13/14.3 phone), clamped to 2 lines with ellipsis.
//   Hover: bg #F7F7F7 -> #EEEEEE (~200ms tween), no transform.

export default function IntegrationCard({ name, description, href = '#', logo = { shape: 'circle' }, className = '' }) {
  return (
    <a
      href={href}
      data-ui="integration-card"
      className={`flex items-start gap-4 rounded-card bg-tag-bg py-4 pl-4 pr-6 shadow-card-rest transition-colors duration-200 ease-out hover:bg-soft-hover motion-reduce:transition-none ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden">
        {/* glyph only: a 29-wide box clips PlaceholderLogo's wordmark (it starts past the glyph) */}
        <PlaceholderLogo name={name} shape={logo.shape} w={29} h={36} className="fill-ink" />
      </span>
      <span className="flex min-w-0 flex-col gap-2 overflow-clip">
        <span className="font-framer font-sans text-body-16-md text-body-75 md:text-body-20">{name}</span>
        <span className="line-clamp-2 font-framer font-sans text-small-13-tight text-ink md:text-small">{description}</span>
      </span>
    </a>
  )
}
