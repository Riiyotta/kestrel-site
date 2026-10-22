import { useId } from 'react'
import FilterChips from '../ui/FilterChips.jsx'

// TopicBar – SPEC_PAGES_B T5. position sticky, top 84 (just below the nav), 64 tall, padding 14 0,
// bg rgba(255,255,255,.94), row space-between: FilterChips "topic" (All + topics with counts) | sort select 180×36,
// radius 8, 1px #E8E8E8, padding 10, label Inter 14/14 w500 #595959 with an 8×8 chevron.
// Below 810 the chips scroll horizontally (FilterChips) and the select keeps its size (not measured).

export default function TopicBar({ topics, value, onChange, sort, sortOptions, onSort }) {
  const id = useId()
  return (
    <div data-ui="topic-bar" className="sticky top-[84px] z-20 flex h-16 items-center justify-between gap-4 bg-topic-bar py-3.5">
      <FilterChips variant="topic" label="Topics" items={topics} value={value} onChange={onChange} className="min-w-0" />
      <label htmlFor={id} className="sr-only">
        Sort guides
      </label>
      <span className="relative hidden shrink-0 md:block">
        <select
          id={id}
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className="h-9 w-[180px] appearance-none rounded-sm border border-solid border-hairline bg-white p-2.5 font-inter font-medium text-label text-muted-4"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-4">
          <path d="M1 2.5 4 5.5l3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}
