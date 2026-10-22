// Shared JSDoc types for template data files (see src/data/README.md). Types only – nothing is exported at runtime
// except the empty object below (so `import './types.js'` is a valid side-effect-free import for editors).
//
// RichTextBlock merges the three specs' rich-text content:
//   SPEC_PAGES_B T4 `RichTextBlock` (p / h2-h4 / ul / ol / blockquote / image / video / table / code)
//   + SPEC_PAGES_B R.5 key-takeaways box (`takeaways`)
//   + SPEC_PAGES_A P1 (paragraphs, bullet lists, H3 sub-blocks, inline links/bold) and
//   + SPEC_PAGES_C T3 legal text (H4 sections, paragraphs, "- " lists, italic effective-date line).
// Rendered by <RichText blocks variant="prose|blog|article|legal" /> (src/components/ui/RichText.jsx).

/**
 * Inline HTML string. Allowed tags: <a href>, <strong>, <em>, <br>. Authored in src/data only (trusted, rendered
 * with innerHTML) – never put user input here.
 * @typedef {string} InlineHtml
 */

/**
 * @typedef {(
 *   | { type: 'p', html: InlineHtml }
 *   | { type: 'h2' | 'h3' | 'h4', text: string, id?: string }   // id feeds the TOCs; auto-slugged from text if absent
 *   | { type: 'ul' | 'ol', items: InlineHtml[] }
 *   | { type: 'blockquote', html: InlineHtml, cite?: string }   // cite renders as a second "- source" paragraph
 *   | { type: 'takeaways', title?: string, items: InlineHtml[], id?: string }   // article key-takeaways box
 *   | { type: 'image', src: string, alt: string, caption?: string, width?: number, height?: number }
 *   | { type: 'video', src: string, poster: string }
 *   | { type: 'table', head: string[], rows: string[][] }       // not on any sampled page (B R.4) – matrix tokens
 *   | { type: 'code', text: string }                            // not on any sampled page (B R.4) – unstyled
 * )} RichTextBlock
 */

/**
 * TOC entry (HoverToc / TickToc / InlineToc). Build it from the h2/h3 blocks of a RichTextBlock[] with
 * `tocFromBlocks()` (exported by RichText.jsx) or write it by hand.
 * @typedef {{ id: string, label: string, level?: 2 | 3, summary?: string, minute?: number }} TocItem
 */

/**
 * Comparison-table data shared by every CompareTable variant (B T7 "grid", B T8 "matrix", A T5 "pricing").
 * A cell value is `true` (included / check), `false` (not included / minus), a string, or { text, note }.
 * @typedef {true | false | string | { text: string, value?: string, note?: string, align?: 'left' | 'right' }} CompareValue   // value: right-aligned second value in the same cell (pricing)
 * @typedef {{ key: string, label: string, price?: string, per?: string, cta?: { label: string, href?: string } }} CompareColumn
 * @typedef {{ label: string, href?: string, values: CompareValue[] }} CompareRow
 * @typedef {{ label?: string, rows: CompareRow[], open?: boolean }} CompareGroup
 */

/**
 * Logo placeholder entry for LogoMarquee / LogoWall (rendered with PlaceholderLogo).
 * @typedef {{ name: string, shape?: 'circle'|'square'|'triangle'|'diamond'|'ring'|'bars'|'arc'|'plus', w: number, h: number }} LogoEntry
 */

/**
 * FAQ item for FaqAccordion (answer = inline HTML; links render #4348DC). For FAQ documents with long structured
 * answers (B T12) render RichText per item instead.
 * @typedef {{ q: string, a: InlineHtml }} FaqItem
 */

export {}
