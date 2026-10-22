import './ui.css'

// RichText – renders a RichTextBlock[] (src/data/types.js) in one of four measured styles.
//   variant "prose"   SPEC_PAGES_A P1 ("Tools Section"): 20/26 #808080 (18/23.4 810–1439, 16/20.8 phone), 20px
//                     block gap, disc bullets with 1.24em indent, H3 Ginto 32/32 −1.28.
//   variant "blog"    SPEC_PAGES_B §R (T4, 900 wide): 20/26 rgba(0,0,0,.75), h2 38/42, h3 32/32, h4 24/28
//                     (unmeasured), "•" markers, lists mt 38 after a paragraph, blockquote rule.
//   variant "article" SPEC_PAGES_B §R (T6, 800 wide): as blog with h2 28/34 / h3 22/28 (24/30 / 20/26 phone)
//                     + key-takeaways box (R.5).
//   variant "legal"   SPEC_PAGES_C T3: 20/26 #000 pre-wrap, H4 Cirka 40/36 (36/36 <1440), rhythm 24 (heading ->
//                     body) / 20 (p -> p) / 72 (section -> heading, >=1200; 24 below), "- " list prefix.
// All styles live in ui.css (.rt--<variant>). No motion (no reveals measured on any rich-text block).
// Width is the caller's job (blog 900, article 800, legal 920, prose column 1040).

export function slugify(text = '') {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64)
}

const headingId = (b) => b.id || slugify(b.text || b.title || '')

// TOC items from the heading blocks (h2 by default; pass levels [2, 3] for HoverToc's indented h3 rows).
// The takeaways box counts as an h2 (B T6 TickToc has a "Key takeaways" tick).
export function tocFromBlocks(blocks = [], { levels = [2] } = {}) {
  return blocks
    .filter((b) => (b.type === 'takeaways' && levels.includes(2)) || (/^h[234]$/.test(b.type) && levels.includes(Number(b.type[1]))))
    .map((b) => ({
      id: headingId(b.type === 'takeaways' ? { ...b, text: b.title || 'Key takeaways' } : b),
      label: b.type === 'takeaways' ? b.title || 'Key takeaways' : b.text,
      level: b.type === 'takeaways' ? 2 : Number(b.type[1]),
    }))
}

const Inline = ({ as: Tag = 'p', html, className }) => <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />

function Block({ b }) {
  switch (b.type) {
    case 'p':
      return <Inline html={b.html} />
    case 'h2':
    case 'h3':
    case 'h4': {
      const Tag = b.type
      return <Tag id={headingId(b)}>{b.text}</Tag>
    }
    case 'ul':
    case 'ol': {
      const Tag = b.type
      return (
        <Tag>
          {b.items.map((html, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
          ))}
        </Tag>
      )
    }
    case 'blockquote':
      return (
        <blockquote>
          <Inline html={b.html} />
          {b.cite ? <p>- {b.cite}</p> : null}
        </blockquote>
      )
    case 'takeaways': {
      const title = b.title || 'Key takeaways'
      // header + list are siblings in the live DOM (an h2 styled as the box top, then the ul)
      return (
        <>
          <h2 id={headingId({ ...b, text: title })} className="rt-takeaways-head">
            {title}
          </h2>
          <ul className="rt-takeaways-list">
            {b.items.map((html, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </ul>
        </>
      )
    }
    case 'image':
      return (
        <figure>
          <img src={b.src} alt={b.alt} width={b.width} height={b.height} loading="lazy" decoding="async" />
          {b.caption ? <figcaption>{b.caption}</figcaption> : null}
        </figure>
      )
    case 'video':
      return <video className="rt-media" src={b.src} poster={b.poster} controls playsInline preload="none" />
    case 'table':
      return (
        <table>
          <thead>
            <tr>
              {b.head.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    case 'code':
      return (
        <pre>
          <code>{b.text}</code>
        </pre>
      )
    default:
      return null
  }
}

export default function RichText({ blocks = [], variant = 'prose', as: Tag = 'div', className = '' }) {
  return (
    <Tag className={`rt rt--${variant} ${className}`} data-variant={variant}>
      {blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}
    </Tag>
  )
}
