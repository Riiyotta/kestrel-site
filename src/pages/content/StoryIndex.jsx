import { useState } from 'react'
import HeroHeadline from '../../components/ui/HeroHeadline.jsx'
import FilterChips from '../../components/ui/FilterChips.jsx'
import StoryCard from '../../components/content/StoryCard.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { STORY_CATEGORIES, storyIndex } from '../../data/stories.js'

// T1 StoryIndex – SPEC_PAGES_B T1. Collection-Page: column, centred, gap 64, padding 160 80 80 (1000: 120 40 80;
// 390: 120 16 32); content max-w 1120 (920 @1000, 358 @390).
// Hero: HeroHeadline (gap 12, padding 8 32 / 8 0 phone), sub widths 511 / 410 / 309 / 358.
// Chips: FilterChips "story" (no URL change, instant list swap – as live). Cards: column gap 32 (list groups 24 @390).
// HeroHeadline's phone H1 is 40/40 (spec measured 40/36 for the phone H2 rendering) – shared primitive kept as is.

const COPY = {
  title: 'Our customers',
  sub: 'Kestrel is trusted by ambitious teams in complex and regulated industries.',
}

export default function StoryIndex() {
  useDocumentTitle('Customer stories | Kestrel')
  const [cat, setCat] = useState('all')
  const list = cat === 'all' ? storyIndex : storyIndex.filter((s) => s.category === cat)
  return (
    <section data-page="story-index" className="mx-auto flex w-full flex-col items-center gap-16 px-4 pb-8 pt-[120px] md:px-10 md:pb-20 lg:px-20 lg:pt-[160px]">
      <HeroHeadline
        className="px-0 py-2 md:px-8"
        gap={12}
        title={COPY.title}
        sub={COPY.sub}
        subColor="ink"
        subMaxWidth="max-w-[358px] md:max-w-[309px] lg:max-w-[410px] xl:max-w-[511px]"
      />
      <div className="flex w-full max-w-[1120px] flex-col gap-16">
        <FilterChips variant="story" label="Story categories" items={STORY_CATEGORIES} value={cat} onChange={setCat} />
        <div data-story-list className="flex flex-col gap-6 md:gap-8">
          {list.map((item) => (
            <StoryCard key={item.slug || item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
