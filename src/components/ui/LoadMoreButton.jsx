// LoadMoreButton – SPEC_PAGES_B T5 "load more guides". Centred, 48 below the grid (template spacing).
//   179x42, padding 12px 20px, radius 999, 1px #DCDCDC border, bg #FFF, label Inter 500 16/16 #1A1A1A.
//   Hover / focus not measured: no change. All cards are in the DOM on live; the button just reveals the next
//   page client-side – pass onClick, and `hidden` once everything is shown.

export default function LoadMoreButton({ children = 'Load more guides', onClick, hidden = false, className = '' }) {
  if (hidden) return null
  return (
    <button
      type="button"
      onClick={onClick}
      data-ui="load-more"
      className={`inline-flex h-[42px] items-center justify-center rounded-nav-pill border border-solid border-loadmore-border bg-white px-5 py-3 font-inter font-medium text-inter-16 text-ink-900 ${className}`}
    >
      {children}
    </button>
  )
}
