import { Link, useParams } from 'react-router-dom'
import NotFound from '../NotFound.jsx'
import RichText, { tocFromBlocks } from '../../components/ui/RichText.jsx'
import { HoverToc } from '../../components/ui/Toc.jsx'
import ShareRail from '../../components/ui/ShareRail.jsx'
import { BODY_SCALE, H2_SCALE, SMALL_SCALE } from '../../components/ui/type.js'
import BlogCard from '../../components/content/BlogCard.jsx'
import PostCTAs from '../../components/content/PostCTAs.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { getBlogPost } from '../../data/blog.js'

// T4 BlogPost – SPEC_PAGES_B T4. Unknown slug → NotFound.
// Wrapper padding 160 24 0; Post max-w 1200, column gap 30, padding-bottom 50.
// PostHeader (max-w 900, centred; gap 40, inner 28): back link 20/26 (18/23.4; left @1000; 16/20.8), H1 Cirka 75/72
//   centred (58 / 48 / 40 left on phone), 32 → byline row gap 10: avatar 21 radius 4 + name 14/18 · "|" · time · "|"
//   · "N Mins" (13/18 <1440, 13/14.3 phone). Hero image slot (900, radius 8) when `heroImage` is set.
// Body: RichText "blog" (900) incl. the video block, then PostCTAs, then Related posts (H2 75/72 left, gap 30; 2 ×
//   BlogCard 588 / 464 / stacked 342, gap 24). HoverToc (h2 + h3) and ShareRail are fixed and ≥1200 only.

const CTAS = {
  trial: { title: 'Pilot Kestrel free for 14 days', body: 'Kestrel works a slice of your real queue for two weeks while your team approves replies.', cta: 'Start free trial', href: '#' },
  call: { title: 'Book a call', body: 'See how Kestrel fits your support team.', cta: 'Submit' },
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getBlogPost(slug)
  useDocumentTitle(post ? `${post.title} | Kestrel` : '404 | Kestrel')
  if (!post) return <NotFound />
  const toc = tocFromBlocks(post.body, { levels: [2, 3] })
  const related = post.related.map(getBlogPost).filter(Boolean)
  return (
    <div data-page="blog-post" className="px-6 pt-[160px]">
      <article className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] pb-[50px]">
        <header className="mx-auto flex w-full max-w-[900px] flex-col gap-10">
          <div className="flex flex-col gap-7">
            <Link to="/blog" className={`text-left text-ink lg:text-center ${BODY_SCALE}`}>
              ← All posts
            </Link>
            <h1 className={`text-left text-ink md:text-center ${H2_SCALE}`}>{post.title}</h1>
            <p className={`mt-1 flex flex-wrap items-center gap-2.5 justify-start text-ink lg:justify-center ${SMALL_SCALE}`}>
              <img src={post.author.avatar} alt="" width="21" height="21" className="h-[21px] w-[21px] rounded-xs object-cover" />
              <span>{post.author.name}</span>
              <span aria-hidden="true" className="font-inter">|</span>
              <time>{post.date}</time>
              <span aria-hidden="true" className="font-inter">|</span>
              <span>{post.readingMinutes} Mins</span>
            </p>
          </div>
          {post.heroImage ? <img src={post.heroImage} alt="" className="w-full rounded-sm" /> : null}
        </header>
        <div className="mx-auto flex w-full max-w-[900px] flex-col gap-8">
          <RichText blocks={post.body} variant="blog" />
          <PostCTAs trial={CTAS.trial} call={CTAS.call} />
        </div>
        {related.length ? (
          <section data-section="related-posts" className="mx-auto flex w-full flex-col gap-[30px] pt-10">
            <h2 className={`text-ink ${H2_SCALE}`}>Related posts</h2>
            <div className="flex flex-col gap-6 md:flex-row">
              {related.map((p) => (
                <div key={p.slug} className="w-full md:w-[464px] lg:w-[588px]">
                  <BlogCard post={p} />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <HoverToc items={toc} />
      <ShareRail />
    </div>
  )
}
