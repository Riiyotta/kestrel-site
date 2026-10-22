import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import NotFound from '../NotFound.jsx'
import RichText, { tocFromBlocks } from '../../components/ui/RichText.jsx'
import { InlineToc, TickToc } from '../../components/ui/Toc.jsx'
import ShareRail from '../../components/ui/ShareRail.jsx'
import CtaChip from '../../components/ui/CtaChip.jsx'
import FaqAccordion from '../../components/ui/FaqAccordion.jsx'
import { BODY_SCALE, H2_SCALE, SMALL_SCALE } from '../../components/ui/type.js'
import { Avatar, RelatedGuideCard } from '../../components/content/GuideCard.jsx'
import '../../components/content/content.css'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { ARTICLE_CTA, getArticle } from '../../data/articles.js'

// T6 ArticleDetail – SPEC_PAGES_B T6. Unknown slug → NotFound.
// main padding 160 64 0 (1280/1000: 160 32 0; 390: 160 20 0), overflow clip; Post column gap 52, max-w 1440.
// Header (max-w 800, left): breadcrumb (articles link 14/18 · "›" Inter 13/18.2 #9AA0A6 · topic chip #F4F4F4 radius 8
//   padding 6 10, Ginto Medium 14/14), then gap 28: H1 Cirka 75/72 left, description 20/26 #666, byline gap 12
//   (avatar 21 radius 4 + name · "·" · "Updated" #666 + time #000; 13/18 <1440, 13/14.3 phone).
// Content column 800, gap 40: InlineToc (<1200) → RichText "article" (key-takeaways box first) → FAQ (H2 75/72 +
//   FaqAccordion "hairline", id "faq" so the TickToc has its FAQ tick). Keep reading ≈116 below: H2 75/72 left +
//   3 RelatedGuideCards (424 / 392, gap 20; 2 cols @1000; 1 @390).
// Fixed: TickToc (left, ≥1200; popover reads per-h2 minute + summary from the data), ShareRail (right, ≥1200),
// CtaChip (bottom). The global VideoTeaser is hidden while this page is mounted (spec: `.lvc` absent on articles).

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = getArticle(slug)
  useDocumentTitle(article ? `${article.title} | Kestrel` : '404 | Kestrel')
  useEffect(() => {
    if (!article) return undefined
    document.documentElement.setAttribute('data-hide-teaser', '')
    return () => document.documentElement.removeAttribute('data-hide-teaser')
  }, [article])

  const toc = useMemo(() => {
    if (!article) return []
    const extra = Object.fromEntries(article.body.filter((b) => b.type === 'h2').map((b) => [b.text, b]))
    const items = tocFromBlocks(article.body).map((t) => ({ ...t, minute: extra[t.label]?.minute, summary: extra[t.label]?.summary }))
    return article.faq?.length ? [...items, { id: 'faq', label: 'FAQ', summary: 'Short answers to common questions on this topic.' }] : items
  }, [article])

  if (!article) return <NotFound />
  const related = article.related.map(getArticle).filter(Boolean)

  return (
    <div data-page="article-detail" className="overflow-clip px-5 pt-[160px] md:px-8 xl:px-16">
      <article className="mx-auto flex w-full max-w-page flex-col gap-[52px]">
        <header className="mx-auto flex w-full max-w-[800px] flex-col gap-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link to="/articles" className={`text-ink ${SMALL_SCALE}`}>
              Articles
            </Link>
            <span aria-hidden="true" className="font-inter text-[13px] leading-[18.2px] tracking-[-0.1px] text-jobs-muted-2">
              ›
            </span>
            <span className="rounded-sm bg-chip-soft px-2.5 py-1.5 font-sans font-medium text-label text-ink">{article.topic}</span>
          </nav>
          <div className="flex flex-col gap-7">
            <h1 className={`text-ink ${H2_SCALE}`}>{article.title}</h1>
            <p className={`text-muted ${BODY_SCALE}`}>{article.description}</p>
            <p className={`flex flex-wrap items-center gap-3 ${SMALL_SCALE}`}>
              <span className="flex items-center gap-3 text-ink">
                <Avatar author={article.author} size={21} radius="rounded-xs" />
                {article.author.name}
              </span>
              <span aria-hidden="true" className="text-jobs-muted-2">
                ·
              </span>
              <span className="text-muted">
                Updated <time className="text-ink">{article.updated}</time>
              </span>
            </p>
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-10">
          <InlineToc items={toc} />
          <RichText blocks={article.body} variant="article" />
          {article.faq?.length ? (
            <section aria-labelledby="faq" className="flex flex-col gap-10">
              <h2 id="faq" className={`text-ink ${H2_SCALE}`}>
                FAQ
              </h2>
              <FaqAccordion look="hairline" items={article.faq} />
            </section>
          ) : null}
        </div>
        {related.length ? (
          <section data-section="keep-reading" className="flex flex-col gap-10 pt-16">
            <h2 className={`text-ink ${H2_SCALE}`}>Keep reading</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <RelatedGuideCard key={a.slug} guide={a} />
              ))}
            </div>
          </section>
        ) : null}
        <div className="h-20" aria-hidden="true" />
      </article>
      <TickToc items={toc} />
      <ShareRail />
      <CtaChip tag={ARTICLE_CTA.tag} label={ARTICLE_CTA.label} href={ARTICLE_CTA.href} trailing={ARTICLE_CTA.trailing} trailingHref={ARTICLE_CTA.trailingHref} />
    </div>
  )
}
