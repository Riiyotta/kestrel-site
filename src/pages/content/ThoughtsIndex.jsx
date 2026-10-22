import HeroHeadline from '../../components/ui/HeroHeadline.jsx'
import PostWall from '../../components/content/PostWall.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { thoughts, thoughtsPage } from '../../data/thoughts.js'

// T10 ThoughtsIndex – SPEC_PAGES_B T10. Hero padding 160 32 0, wrapper max-w 1024, gap 37: H1 Cirka 96 (77 / 58 /
// 40) centred + intro 20/26 #808080 (18/23.4, 16/20.8) max-w 760 → PostWall (3 / 2 / 1 columns).

export default function ThoughtsIndex() {
  useDocumentTitle('Thoughts on CX | Kestrel')
  return (
    <div data-page="thoughts-index">
      <section className="px-8 pt-[160px]">
        <HeroHeadline
          className="max-w-[1024px]"
          gap={37}
          title={thoughtsPage.title}
          sub={thoughtsPage.intro}
          subSize="body"
          subColor="muted3"
          subMaxWidth="max-w-[760px]"
        />
      </section>
      <PostWall posts={thoughts} />
    </div>
  )
}
