import { useId, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ARROW_HOVER } from '../../lib/uiMotion.js'
import { CIRKA, H4_SCALE } from './type.js'
import './ui.css'

// Form primitives shared by every lead/demo form. Merges SPEC_PAGES_A P5 DemoForm fields (T6, T1.7b), SPEC_PAGES_B
// T8 VsHero form + T4 PostCTA email row, and SPEC_PAGES_C `Field` (partner "outline" / nominate "soft").
// Forms NEVER send data: <Form> always preventDefault()s and only flips to a local success state. Validation is the
// browser's native required / type=email / type=url bubble (no custom error style exists on live).
//
// Field skins
//   "outline" (C partner): control 52 tall (textarea 100, resize vertical), padding 16, bg #FFF, radius 8, rest
//       border 2px #E5E5E5 (inset, Framer ::after), text Ginto 16/16 #000, placeholder #666, no visible label
//       (placeholder ends in "*"; label kept for screen readers). Focus-within: border 1px #0099FF, no transition.
//   "soft" (C nominate): label Cirka 40/36 −1.6 (36/36 <1440) above, gap 14.49; control 58 tall (textarea 145),
//       padding 17.39, bg rgba(187,187,187,.15), radius 14.49, 1px rgba(136,136,136,.1) inset border, text Inter
//       20.29/24.35 #999 (typed text is #999 on live too), placeholder #999. Focus: 1px #0099FF.
//   "demo" (A P5 / B T8): label Cirka 700 16/19.2 #0D0D0D above, gap 10 (bordered email label: 16/22.4 #000, A T6);
//       control 40 tall, padding 12, bg #FAFAFA, radius 8, no border, text Ginto 14/16.8 #000, placeholder #999,
//       browser-default focus only. `bordered`: 44 tall, radius 10, 1px rgba(136,136,136,.6); focus border #0F0F10,
//       bg #FFF, shadow 0 0 0 2px rgba(0,0,255,.2) + the browser ring; transition .2s ease-in-out (B T8).
//       select: appearance none, #999 until chosen, custom chevron, wrapper padding-right 12.
//       `boxHeight={74}`: single-line input inside a 74-tall padded box ("anything else", A T6).
//   "pill" (B T4 book-a-call row): 40 tall, radius 100, padding 12, bg rgba(187,187,187,.15),
//       `transition: background, box-shadow` (focus values not measured -> browser default ring).

const SKIN = {
  outline: {
    control:
      'h-[52px] rounded-sm bg-white p-4 font-sans text-field-16 text-ink shadow-[inset_0_0_0_2px_theme(colors.card-gray)] focus:shadow-[inset_0_0_0_1px_theme(colors.field.focus)] [--ph:theme(colors.muted.DEFAULT)]',
    textarea: 'h-[100px] resize-y',
  },
  soft: {
    control:
      'h-[58px] rounded-field-soft bg-field-soft p-[17.39px] font-inter text-input-soft text-silver shadow-[inset_0_0_0_1px_theme(colors.field.soft-border)] focus:shadow-[inset_0_0_0_1px_theme(colors.field.focus)] [--ph:theme(colors.silver)]',
    textarea: 'h-[145px] resize-y',
  },
  demo: {
    control: 'h-10 rounded-sm bg-field p-3 font-sans text-field-14 text-ink [--ph:theme(colors.silver)]',
    bordered:
      'h-11 rounded-tile border border-field-border transition-[border-color,background-color,box-shadow] duration-200 ease-in-out focus:border-ink-deep focus:bg-white focus:shadow-field-focus ui-field-control--native-focus motion-reduce:transition-none',
    textarea: 'h-[74px] resize-y',
  },
  pill: {
    control:
      'h-10 rounded-announce bg-field-soft p-3 font-sans text-field-14 text-ink transition-[background-color,box-shadow] [--ph:theme(colors.silver)]',
    textarea: 'h-[100px] resize-y',
  },
}

// Textareas drop the control's single-line height class (h-[52px] / h-[58px] / h-10 / h-11) and use the skin's
// textarea height instead; with both classes present the CSS emit order decided, and textareas rendered 52 / 58 tall.
// (Not `!important`: that would override the inline height the browser sets while the user drags `resize: vertical`.)
const withoutHeight = (cls) => cls.replace(/(^|\s)h-\S+/g, ' ')

// Borderless demo/pill fields keep the browser default focus ring (live); outline/soft draw their own.
const KEEPS_NATIVE_RING = { demo: true, pill: true }

function Chevron({ className = '' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Label({ skin, htmlFor, bordered, children, hidden }) {
  if (hidden || skin === 'outline' || skin === 'pill') {
    return (
      <label htmlFor={htmlFor} className="sr-only">
        {children}
      </label>
    )
  }
  if (skin === 'soft') {
    return (
      <label htmlFor={htmlFor} className={`text-ink ${H4_SCALE}`}>
        {children}
      </label>
    )
  }
  return (
    <label htmlFor={htmlFor} className={`${CIRKA} !font-bold ${bordered ? 'text-body-16 text-ink' : 'text-form-label text-ink-nav'}`}>
      {children}
    </label>
  )
}

export default function Field({
  skin = 'outline',
  type = 'text',
  label,
  hideLabel = false,
  name,
  placeholder,
  required = false,
  options = [],
  bordered = false,
  boxHeight,
  className = '',
  ...rest
}) {
  const id = useId()
  const s = SKIN[skin] || SKIN.outline
  const native = KEEPS_NATIVE_RING[skin] && !bordered
  const ctrlCls = `${native ? 'ui-field-native' : 'ui-field-control'} block w-full min-w-0 appearance-none ${s.control} ${bordered ? s.bordered : ''}`

  let control
  if (type === 'select') {
    control = (
      <span className={`relative block ${skin === 'demo' ? 'rounded-sm bg-field pr-3' : ''}`}>
        <select id={id} name={name} required={required} defaultValue="" className={`${ctrlCls} pr-8`} {...rest}>
          <option value="" disabled>
            {placeholder || 'Select…'}
          </option>
          {options.map((o) => {
            const v = typeof o === 'string' ? o : o.value
            const l = typeof o === 'string' ? o : o.label
            return (
              <option key={v} value={v}>
                {l}
              </option>
            )
          })}
        </select>
        <Chevron className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink" />
      </span>
    )
  } else if (type === 'textarea') {
    control = <textarea id={id} name={name} required={required} placeholder={placeholder} className={`${withoutHeight(ctrlCls)} ${s.textarea}`} {...rest} />
  } else if (boxHeight) {
    // A T6 "anything else": a single-line input sitting at the top of a 74px padded box
    control = (
      <span className="block h-[74px] rounded-sm bg-field p-3">
        <input id={id} type={type} name={name} required={required} placeholder={placeholder} className="ui-field-native block w-full bg-transparent font-sans text-field-14 text-ink [--ph:theme(colors.silver)]" {...rest} />
      </span>
    )
  } else {
    control = <input id={id} type={type} name={name} required={required} placeholder={placeholder} className={ctrlCls} {...rest} />
  }

  return (
    <div data-ui="field" data-skin={skin} className={`flex min-w-0 flex-col ${skin === 'soft' ? 'gap-[14.49px]' : 'gap-2.5'} ${className}`}>
      {label ? (
        <Label skin={skin} htmlFor={id} bordered={bordered} hidden={hideLabel}>
          {label}
        </Label>
      ) : null}
      {control}
    </div>
  )
}

// FileDropZone (C F2 nominate, third-party "superfields" upload on live): full form width x 141, padding 12,
// bg rgba(187,187,187,.15), radius 10, 1px rgba(136,136,136,.1) border, column centred gap 12: 28x28 upload
// icon #999 + helper Inter 14/16.8 #999 centred. The real <input type=file> covers the zone at opacity 0.
// Files stay in the browser (the Form never submits). Drag-over / uploaded states were not measured: the only
// change here is that the helper line shows the chosen file name(s).
export function FileDropZone({ name = 'file', helper = 'Click or drag a file here, up to 25 MB', accept, multiple = false, className = '' }) {
  const id = useId()
  const [files, setFiles] = useState('')
  return (
    <label
      htmlFor={id}
      data-ui="file-drop-zone"
      className={`relative flex h-[141px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-tile border border-field-soft-border bg-field-soft p-3 text-silver ${className}`}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M9 20.5H7.5a5 5 0 0 1-.6-9.96 7 7 0 0 1 13.48 1.46A4.5 4.5 0 0 1 20.5 20.5H19M14 13v10m0-10-3.5 3.5M14 13l3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-center font-inter text-field-14">{files || helper}</span>
      <input
        id={id}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        onChange={(e) => setFiles(Array.from(e.target.files || []).map((f) => f.name).join(', '))}
      />
    </label>
  )
}

function Arrow({ className = '' }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className={className}>
      <path d="M1 5h8M5.5 1.5 9 5 5.5 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// SubmitButton variants
//   "demo"    (A T6 / B T8): 109x34, bg #0D0D0D, radius 450 (= pill at 34 tall), padding 8px 24px, label Ginto Medium
//             14/18 #FBFBFB ("Submit →"). Hover not measured -> none.
//   "outline" (C partner): 115x50, padding 16px 24px, transparent, radius 50, 2px #222 border, label Ginto Medium 16/18
//             #000 (13/13 + 105x45 @810–1199, 14/18 phone) + 10x10 arrow, gap 4. Hover: arrow rotates −45deg
//             (announcement-pill spring; duration not frame-sampled). Label/border unchanged.
//   "block"   (C nominate): full width x 58, bg #000, radius 449 (= pill), 1px #404040 border, label Ginto Medium 14/14
//             #FFF (13 at 810–1439; live's 10px @1000 is a Framer quirk – spec says use 13). Hover: bg #404040,
//             border #000, instant.
//   "pill"    (B T4 book-a-call): 101x40, bg #333, radius 100, padding 14px 24px, label Ginto Medium 16/18 #FBFBFB.
export function SubmitButton({ variant = 'demo', children, className = '' }) {
  const reduce = useReducedMotion()
  if (variant === 'outline') {
    return (
      <motion.button
        type="submit"
        data-motion="submit-arrow-hover"
        initial="rest"
        animate="rest"
        whileHover={reduce ? undefined : 'hover'}
        className={`inline-flex h-[50px] items-center gap-1 self-start rounded-hero-tag border-2 border-solid border-outline-border bg-transparent px-6 font-sans font-medium text-tag text-ink md:h-[45px] md:text-label-13 lg:h-[50px] lg:text-tag max-md:text-small ${className}`}
      >
        <span>{children}</span>
        <motion.span className="flex" variants={{ rest: { rotate: 0, transition: ARROW_HOVER }, hover: { rotate: -45, transition: ARROW_HOVER } }}>
          <Arrow />
        </motion.span>
      </motion.button>
    )
  }
  if (variant === 'block') {
    return (
      <button
        type="submit"
        className={`flex h-[58px] w-full items-center justify-center rounded-pill border border-solid border-submit-hover bg-ink font-sans font-medium text-label text-white hover:border-ink hover:bg-submit-hover md:text-[13px] xl:text-label ${className}`}
      >
        {children}
      </button>
    )
  }
  if (variant === 'pill') {
    return (
      <button type="submit" className={`inline-flex h-10 shrink-0 items-center justify-center rounded-announce bg-body px-6 py-3.5 font-sans font-medium text-tag text-meta-card ${className}`}>
        {children}
      </button>
    )
  }
  return (
    <button
      type="submit"
      className={`inline-flex h-[34px] items-center justify-center self-start rounded-pill bg-ink-nav px-6 py-2 font-sans font-medium text-small text-meta-card ${className}`}
    >
      {children}
    </button>
  )
}

// Form – wraps any fields; native validation runs on submit, then the submit is cancelled and a local success
// message replaces the form. No action, no fetch, no storage: nothing leaves the page.
// The success state was not measured on live (forms were never submitted) – it uses the body-16 token, left-aligned.
export function Form({ children, success = 'Thanks! This is a demo form, so nothing was sent.', className = '', successClassName = '', ...rest }) {
  const [done, setDone] = useState(false)
  if (done) {
    return (
      <div role="status" data-ui="form-success" className={`font-sans text-body-16 text-ink ${successClassName}`}>
        {success}
      </div>
    )
  }
  return (
    <form
      {...rest}
      data-ui="form"
      className={className}
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      {children}
    </form>
  )
}
