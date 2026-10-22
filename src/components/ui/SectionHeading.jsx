import { BAND_SCALE, BODY_SCALE, H2_SCALE, H3_SCALE, SUB_SCALE } from './type.js'

// SectionHeading – one heading block for every "H2 (+ sub)" header in the page templates.
//
// variant "stack" (default; SPEC_PAGES_C T1 SectionHeading, also A T2.3 / B T7–T9 section headers)
//   Column, gap 24 (C) or 16 (A carousel / B T7 headers: pass gap={16}).
//   size "h2": Cirka 75/72 −3 -> 58/58 -> 48/50 -> 40/40 (C careers, B related/keep-reading)
//   size "h3": Cirka 60/60 −2.4 -> 50/50 -> 40/40 -> 40/36 (A T1.6/voice, B T7/T8 section heads)
//   subTone "hero": Ginto 24/30 −0.48 #000 -> 19/23 -> 15/18 -> 14/17 (C C2)
//   subTone "soft": Ginto 20/26 rgba(0,0,0,.75) -> 18/23.4 -> 16/20.8 (C C3–C5, A T2.3, B T7/T8)
// variant "band" (SPEC_PAGES_A P2 / T1.4)
//   Full-width white block, padding 80px 168.5px 35px @1440 / 80px 32px 35px @810–1439 / 80px 20px 35px phone;
//   H2 Ginto (not Cirka) 64/77 −2.56 (>=1200) / 42/50 −1.68 (tablet) / 32/38 −1.28 (phone), #000, centred.
// No motion on any of these (none measured).

const GAPS = { 0: 'gap-0', 12: 'gap-3', 16: 'gap-4', 24: 'gap-6' }

export default function SectionHeading({
  title,
  sub,
  variant = 'stack',
  size = 'h2',
  subTone = 'soft',
  align = 'center',
  gap = 24,
  as: Tag = 'h2',
  className = '',
  titleClassName = '',
  subClassName = '',
}) {
  if (variant === 'band') {
    return (
      <div data-ui="section-heading-band" className={`w-full bg-white px-5 pb-[35px] pt-20 md:px-8 xl:px-[168.5px] ${className}`}>
        <Tag className={`text-center text-ink ${BAND_SCALE} ${titleClassName}`}>{title}</Tag>
      </div>
    )
  }
  const alignCls = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  const titleCls = size === 'h3' ? H3_SCALE : H2_SCALE
  const subCls = subTone === 'hero' ? `${SUB_SCALE} text-ink` : `${BODY_SCALE} text-body-75`
  return (
    <div data-ui="section-heading" className={`flex w-full flex-col ${GAPS[gap] ?? 'gap-6'} ${alignCls} ${className}`}>
      <Tag className={`w-full text-ink ${titleCls} ${titleClassName}`}>{title}</Tag>
      {sub ? <p className={`w-full ${subCls} ${subClassName}`}>{sub}</p> : null}
    </div>
  )
}
