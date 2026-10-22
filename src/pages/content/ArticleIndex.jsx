import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchInput from '../../components/ui/SearchInput.jsx'
import LoadMoreButton from '../../components/ui/LoadMoreButton.jsx'
import { BODY_SCALE, H3_SCALE } from '../../components/ui/type.js'
import { GuideCard, GuideFeatured } from '../../components/content/GuideCard.jsx'
import TopicBar from '../../components/content/TopicBar.jsx'
import useDocumentTitle from '../../lib/useDocumentTitle.js'
import { ARTICLE_INDEX, articles } from '../../data/articles.js'

// T5 ArticleIndex – SPEC_PAGES_B T5.
// section padding 148 80 0 (1280/1000: 148 32 0; 390: 124 20 0); inner max-w 1280, gap 56.
// Intro row (≥1200 row, space-between, align end; <1200 column gap 28): eyebrow Ginto Medium 14/14 #787878 uppercase,
//   H1 Cirka 60/60 (50 / 40 / 40-36), lede 20/26 #666 max-w 580 | SearchInput 380×48.
// GuideFeatured → sticky TopicBar (?topic=<Topic Name>, client-side) → grid repeat(3, 406) gap 48 28 (2 cols @1000,
//   1 @390) showing 9 cards, then LoadMoreButton centred 48 below revealing the next 9. Search filters title +
//   description locally (spec: no request). The featured guide sits above the grid and is excluded from it.
// Date sorting uses the data's ISO-parsable dates; "Most relevant" keeps the authored order.

const PAGE = 9
const parse = (d) => Date.parse(d) || 0
const featured = articles.find((a) => a.featured) || articles[0]
const pool = articles.filter((a) => a !== featured)

export default function ArticleIndex() {
  useDocumentTitle('CX guides | Kestrel')
  const [params, setParams] = useSearchParams()
  const topic = params.get('topic') || 'all'
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('relevant')
  const [shown, setShown] = useState(PAGE)
  const topics = useMemo(() => {
    const counts = pool.reduce((m, a) => m.set(a.topic, (m.get(a.topic) || 0) + 1), new Map())
    return [{ id: 'all', label: 'All', count: pool.length }, ...[...counts].map(([t, n]) => ({ id: t, label: t, count: n }))]
  }, [])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let out = pool.filter((a) => (topic === 'all' || a.topic === topic) && (!q || `${a.title} ${a.description}`.toLowerCase().includes(q)))
    if (sort !== 'relevant') out = [...out].sort((a, b) => (sort === 'newest' ? parse(b.date) - parse(a.date) : parse(a.date) - parse(b.date)))
    return out
  }, [topic, query, sort])

  const setTopic = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('topic')
    else next.set('topic', id)
    setParams(next, { replace: true, preventScrollReset: true })
    setShown(PAGE)
  }

  return (
    <section data-page="article-index" className="px-5 pt-[124px] md:px-8 md:pt-[148px] xl:px-20">
      <div className="mx-auto flex w-full max-w-container flex-col gap-14">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[820px] flex-col gap-[18px]">
            <p className="font-sans font-medium uppercase text-label text-muted-5">{ARTICLE_INDEX.eyebrow}</p>
            <h1 className={`text-ink ${H3_SCALE}`}>{ARTICLE_INDEX.title}</h1>
            <p className={`max-w-[580px] text-muted ${BODY_SCALE}`}>{ARTICLE_INDEX.lede}</p>
          </div>
          <SearchInput
            placeholder="Search guides"
            label="Search guides"
            value={query}
            onChange={(v) => {
              setQuery(v)
              setShown(PAGE)
            }}
          />
        </div>
        <GuideFeatured guide={featured} latestLabel={ARTICLE_INDEX.latestLabel} readLabel={ARTICLE_INDEX.readLabel} />
        <div className="flex flex-col">
          <TopicBar topics={topics} value={topic} onChange={setTopic} sort={sort} sortOptions={ARTICLE_INDEX.sortOptions} onSort={setSort} />
          <div data-guide-grid className="mt-4 grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {list.slice(0, shown).map((a) => (
              <GuideCard key={a.slug} guide={a} />
            ))}
          </div>
          {list.length === 0 ? <p className={`py-12 text-center text-muted ${BODY_SCALE}`}>No guides match that search.</p> : null}
          <div className="flex justify-center pt-12">
            <LoadMoreButton hidden={shown >= list.length} onClick={() => setShown((n) => n + PAGE)}>
              {ARTICLE_INDEX.loadMore}
            </LoadMoreButton>
          </div>
        </div>
      </div>
    </section>
  )
}
