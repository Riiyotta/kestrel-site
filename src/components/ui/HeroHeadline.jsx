import { BODY_SCALE, H1_SCALE, SUB_SCALE } from './type.js'

// HeroHeadline – the "simple" centred hero: H1 + optional sub + optional actions. No announcement pill, no photo
// stage, no WebGL. Same tokens as the homepage Hero headline (CLONE_SPEC §6/§15/§16), not a refactor of Hero.jsx.
//   H1: Cirka 96/96 −3.84 (>=1440) / 77/77 (1200–1439) / 58/58 (810–1199) / 40/40 (phone), #000, centred.
//   sub "hero" (default): Ginto 24/30 −0.48 / 19/23 / 15/18 / 14/17 – colour per page:
//       subColor "body" #333 (A T3 integrations, homepage), "ink" #000 (A T2.1 /product, B T1/T7, C nominate/404).
//   sub "body": Ginto 20/26 -> 18/23.4 -> 16/20.8 – subColor "muted3" #808080 (B T10 thoughts intro, max-w 760)
//       or "body" #333 (A /coach).
//   gaps: H1 -> sub `gap` (homepage 16; B T1 12; B T10 + C nominate 37 – pass the page's value),
//         sub -> actions `actionsGap` (homepage 24 phone / 40 md+; A /product 32).
// Section padding is the page's job (varies per template: 180px 64px 0, 160px 32px 0, ...): pass className.
// Used by: A T2.1 (/product, /coach, /voice text block), A T3.1, B T1 / T7 / T10, C F1b nominate, C T6 404 (H2 there).
// No motion (SSR-visible on live).

const SUB_COLOR = { body: 'text-body', ink: 'text-ink', muted3: 'text-muted-3', ink900: 'text-ink-900' }
const GAP = { 12: 'gap-3', 16: 'gap-4', 20: 'gap-5', 24: 'gap-6', 32: 'gap-8', 36: 'gap-9', 37: 'gap-[37px]' }
const ACTIONS_GAP = { 24: 'gap-6', 32: 'gap-8', 40: 'gap-10', 48: 'gap-12', default: 'gap-6 md:gap-10' }

export default function HeroHeadline({
  title,
  sub,
  subSize = 'hero',
  subColor = 'body',
  subMaxWidth = '', // e.g. 'max-w-[793px]' (A T3), 'max-w-[760px]' (B T10), 'xl:max-w-hero-sub-xl'
  actions = null, // usually <Button>s; rendered in a gap-12 row (CLONE_SPEC §5 CTA group)
  gap = 16,
  actionsGap = 'default',
  as: Tag = 'h1',
  titleClassName = '',
  className = '',
}) {
  const subCls = subSize === 'body' ? BODY_SCALE : SUB_SCALE
  return (
    <div data-ui="hero-headline" className={`mx-auto flex w-full max-w-container flex-col items-center ${ACTIONS_GAP[actionsGap] ?? ACTIONS_GAP.default} ${className}`}>
      <div className={`flex w-full flex-col items-center ${GAP[gap] ?? 'gap-4'}`}>
        <Tag className={`w-full text-center text-ink ${H1_SCALE} ${titleClassName}`}>{title}</Tag>
        {sub ? <p className={`text-center ${subCls} ${SUB_COLOR[subColor] ?? 'text-body'} ${subMaxWidth}`}>{sub}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div> : null}
    </div>
  )
}
