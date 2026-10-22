import './ui.css'
import { useId } from 'react'

// SearchInput – SPEC_PAGES_B T5 article-index search (right of the intro row).
//   380x48, radius 999, 1px #E8E8E8 border, bg #FFF, padding 14px 14px 14px 36px, 16x16 search icon 10px from the
//   left, vertically centred. Text size / colour / placeholder colour and the focus style were NOT measured: text
//   uses the 16/18 token (the only size that fits the 48px box with 14px padding), placeholder #999 (site field
//   placeholder), focus border = the site's measured field focus colour #0099FF (C Field), no transition.
// Local only: `onChange(value)` is called as the user types; no request is made.

export default function SearchInput({ placeholder = 'Search guides', value, onChange, label = 'Search', className = '' }) {
  const id = useId()
  return (
    <div data-ui="search-input" className={`relative h-12 w-full md:w-[380px] ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted">
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="m11 11 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="ui-field-control h-full w-full appearance-none rounded-nav-pill border border-hairline bg-white py-3.5 pl-9 pr-3.5 font-sans text-tag text-ink [--ph:theme(colors.silver)] focus:border-field-focus"
      />
    </div>
  )
}
