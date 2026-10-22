import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFound.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import StoryHero from '../../components/content/StoryHero.jsx'
import StorySideMenu from '../../components/content/StorySideMenu.jsx'
import StorySection from '../../components/content/StorySection.jsx'
import { RelatedStoryCard } from '../../components/content/StoryCard.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { getStory, stories } from '../../data/stories.js'

// T2 StoryDetail – SPEC_PAGES_B T2. Unknown slug → NotFound.
// Body `Storie-Section`: row gap 32, padding 64 80 (1000: 64 20; 390: 32 0), max-w 1440 centred; side menu column
// 296 (≥1200 only, sticky) + content column max-w 843 (792 @1280). Empty sections are skipped (spec note).
// RelatedStories: padding 64 80, gap 32, H2 75/72 centred; 3 cards (413, gap 14) – 2 @1000 (gap 40), 1 @390.
// The live site picks the 3 related stories at random; here they come from `story.related` (deterministic).

export default function StoryDetail() {
  const { slug } = useParams()
  const story = getStory(slug)
  const bodyRef = useRef(null)
  useDocumentTitle(story ? `${story.facts.company} customer story | Kestrel` : '404 | Kestrel')
  if (!story) return <NotFound />
  const sections = story.sections.filter((s) => s.heading || s.body?.length || s.media)
  const related = (story.related || []).map((s) => stories.find((x) => x.slug === s)).filter(Boolean)
  return (
    <article data-page="story-detail">
      <StoryHero story={story} />
      <section className="mx-auto flex w-full max-w-page justify-center gap-8 py-8 md:px-5 md:py-16 lg:px-20 xl:px-0">
        <div className="hidden w-[296px] shrink-0 lg:block">
          <StorySideMenu facts={story.facts} sections={sections} bodyRef={bodyRef} />
        </div>
        <div ref={bodyRef} data-story-content className="flex w-full min-w-0 max-w-[843px] flex-col lg:max-w-[792px] xl:max-w-[843px]">
          {sections.map((s) => (
            <StorySection key={s.id} section={s} theme={story.theme} />
          ))}
        </div>
      </section>
      {related.length ? (
        <section data-section="related-stories" className="flex flex-col items-center gap-8 px-4 py-16 md:px-10 lg:px-20">
          <SectionHeading title="Read other stories" />
          <div className="flex w-full justify-center gap-10 lg:max-w-[1280px] lg:justify-between lg:gap-3.5">
            {related.map((s, i) => (
              <RelatedStoryCard key={s.slug} story={s} className={i === 1 ? 'hidden md:flex' : i === 2 ? 'hidden lg:flex' : ''} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
