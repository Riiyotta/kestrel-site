import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { COMPARE_FADE, LABEL_SPRING, sinceHydration } from '../lib/motion.js'

// COMPARE – CLONE_SPEC §8 (1440), §15 (1200–1439: halves 640, compare H2 36/36, labels 18/23.4),
// §16/§17 (phone: one stacked card pair + 3-dot progress; also used 810–1199 like Nav/Hero).
// Settled state = start of the loop: scenario 1 visible, progress cover at x 0.
// Motion hooks for the animation pass (24s loop = 3 scenarios x 8s, starts at live hydration – see useCompareCycle):
//   [data-motion="compare-bot-card"][data-index]      crossfade ~0.5–0.6s at each 8s switch (opacity 1 <-> 0)
//   [data-motion="compare-product-card"][data-index]  same, in sync with the bot stack; its placeholder
//                                                     [data-motion="compare-product-media"] stands in for a video
//                                                     that restarts each slot
//   [data-motion="compare-glow"][data-index]          bg-effect blobs behind the product stack, crossfade with the card
//   [data-motion="compare-progress-cover"]            grey cover translateX 0 -> 878px linear over 24s (36.6px/s),
//                                                     reset at loop start; switch points at 1/3 and 2/3
//   [data-motion="compare-labels"]                    label row (static, centred as a whole)
//                                                     [data-motion="compare-label"] opacity 1 / .4 (live: no slide,
//                                                     see the Motion note below).
//   [data-motion="compare-dot"]                       phone/tablet 3-dot progress (active 1 / inactive .3)

const COPY = {
  left: {
    h2: 'Scripts run out',
    body: 'A scripted bot knows the article, not the account. Once a case needs a lookup or a change, it sends people away.',
  },
  right: {
    h2: 'Kestrel finishes',
    body: 'Kestrel checks the record, takes the allowed action and confirms what changed, or says plainly who will.',
  },
  phoneBody: 'A scripted bot points to an article. Kestrel checks the account, makes the change and confirms it in chat.',
}

const SCENARIOS = [
  {
    label: 'Replace a lost card',
    ask: 'I lost my card on the bus. New one?',
    reply: 'For card problems, please visit our help centre or call in business hours.',
    system: 'The customer ended this chat early',
  },
  {
    label: 'Split a large energy bill',
    ask: 'Can I pay this bill in three parts?',
    reply: 'For payment plans, please email our billing team or call the help line on weekdays.',
    system: 'The customer ended this chat early',
  },
  {
    label: 'Fix a delivery address',
    ask: 'My parcel still shows my old address.',
    reply: 'Address changes are handled in your account. Please open Profile to update it.',
    system: 'The customer ended this chat early',
  },
]

// Product-card bg-color per scenario (§8) and the matching glow blob (ASSET_MANIFEST group (a)).
const PRODUCT = [
  { bg: 'bg-tint-lavender', media: 'from-white via-tint-lavender to-tint-lavender', glow: ['/assets/decor/compare-glow-1.png', 471, 422, 'object-contain'] },
  { bg: 'bg-tint-green', media: 'from-white via-tint-green to-tint-green', glow: ['/assets/decor/compare-glow-2.png', 802, 544, 'object-contain'] },
  { bg: 'bg-tint-pink', media: 'from-white via-tint-pink to-tint-pink', glow: ['/assets/decor/compare-glow-3.png', 547, 528, 'object-cover'] },
]

// Motion (live, Framer bundle + 1440/1280/390 timelines):
//   desktop cards: variant cycle Card-01 -8s-> 02 -8s-> 03 -8s-> 04-Reset -0.2s-> 01 (24.2s); every change
//     tweens 0.6s cubic-bezier(.7,0,.3,1). Bot stack crossfades; product stack keeps card 1 at opacity 1 underneath
//     and fades cards 2/3 in/out on top (so its glow stays too). Reset = card 3 -> card 1.
//   progress cover: Lottie, linear 878px / 24s (36.58px/s) from each Card-01 start; snaps to 0 at Card-04-Reset.
//   labels: own 8s timer (24s cycle, no reset step -> drifts .2s/cycle vs the cards); row is static (no slide);
//     active opacity 1 / inactive .4 via spring { duration .4, bounce .2 }.
//   phone/tablet (<1200): Mobile-Card-01/02/03 every 8s; 1->2 and 2->3 crossfade whole sets (+glow, dots) with the
//     same 0.6s cubic-bezier(.7,0,.3,1) (live 2->3 samples .193 .378 .643 .818 .886 .962 .993 .999 every ~52ms; tween
//     fit rmse .011 vs .035 for a spring); 3->1 holds ~1.24s after the variant switch, then cuts instantly.
const CycleContext = createContext({ card: 0, label: 0, phone: { i: 0, instant: true }, playId: 0 })

function useCompareCycle(enabled) {
  const [card, setCard] = useState(0)
  const [label, setLabel] = useState(0)
  const [phone, setPhone] = useState({ i: 0, instant: true })
  const [playId, setPlayId] = useState(0)
  const progress = useMotionValue(0)
  useEffect(() => {
    if (!enabled) return
    const timers = new Set()
    let anim
    const at = (ms, fn) => {
      const id = setTimeout(() => {
        timers.delete(id)
        fn()
      }, ms)
      timers.add(id)
    }
    // desktop cards + progress (24.2s cycle)
    const cycle = () => {
      setCard(0)
      setPlayId((n) => n + 1)
      progress.set(0)
      anim = animate(progress, 1, { duration: 24, ease: 'linear' })
      at(8000, () => setCard(1))
      at(16000, () => setCard(2))
      at(24000, () => {
        anim?.stop()
        progress.set(0)
        setCard(0) // Card-04-Reset
      })
      at(24200, cycle)
    }
    // labels: independent 8s timer
    let l = 0
    let labelTimer
    // phone sets: 8 / 16 / 25.24 within each 24s cycle
    const phoneCycle = () => {
      at(8000, () => setPhone({ i: 1, instant: false }))
      at(16000, () => setPhone({ i: 2, instant: false }))
      at(25240, () => setPhone({ i: 0, instant: true }))
      at(24000, phoneCycle)
    }
    // live: all three timers start when Framer hydrates (motion.js LIVE_HYDRATION_S after navigation start), not on
    // scroll-in; until then scenario 1 shows with the cover at 0.
    at(Math.max(0, -sinceHydration() * 1000), () => {
      cycle()
      labelTimer = setInterval(() => setLabel((l = (l + 1) % 3)), 8000)
      phoneCycle()
    })
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(labelTimer)
      anim?.stop()
    }
  }, [enabled, progress])
  return { card, label, phone, playId, progress }
}

const fadeTo = (on) => ({ opacity: on ? 1 : 0 })

/* ---------- glyphs (own drawings) ---------- */

function BotGlyph() {
  // generic assistant glyph for the bot avatar (brand bot mark -> placeholder)
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="stroke-ink-900" strokeWidth="1.4">
      <rect x="3" y="5.5" width="12" height="9" rx="3" />
      <path d="M9 2.5v3M6.8 10h.01M11.2 10h.01" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- cards ---------- */

// Shared shell (§8): outer 362x420 radius 20; behind it bg-color radius 16 and a 6px rgba(255,255,255,.3) border
// layer radius 16; on top the Content layer bg rgba(255,255,255,.3) with the signature glass shadow.
function CardShell({ base, contentClass, children, className = '', ...rest }) {
  return (
    <motion.div className={`absolute inset-0 rounded-glass ${className}`} initial={false} {...rest}>
      <div className={`absolute inset-0 rounded-card ${base}`} aria-hidden="true" />
      <div className="absolute inset-0 rounded-card border-[6px] border-glass-30" aria-hidden="true" />
      <div className={`relative h-full rounded-glass bg-glass-30 shadow-glass ${contentClass}`}>{children}</div>
    </motion.div>
  )
}

// opacity target + transition for card set `index` in the given stack
function useCardState(index, mode, kind) {
  const { card, phone } = useContext(CycleContext)
  if (mode === 'phone') {
    return { animate: fadeTo(phone.i === index), transition: phone.instant ? { duration: 0 } : COMPARE_FADE, active: phone.i === index }
  }
  // desktop product stack: card 1 never fades (cards 2/3 are layered on top of it)
  const on = kind === 'product' && index === 0 ? true : card === index
  return { animate: fadeTo(on), transition: COMPARE_FADE, active: card === index }
}

function BotCard({ s, index, mode }) {
  const st = useCardState(index, mode, 'bot')
  return (
    <CardShell
      base="bg-card-gray"
      contentClass="flex flex-col gap-8 p-6"
      data-motion="compare-bot-card"
      data-index={index}
      animate={st.animate}
      transition={st.transition}
      aria-hidden={!st.active || undefined}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          {/* customer: grey bubble 224w, radius 8 8 0 8, avatar 30 on the right (gap 8) */}
          <div className="flex items-end justify-end gap-2">
            {/* bubble hugs its text up to 224 (live 201 wide for a 2-line ask) */}
            <p className="w-fit max-w-[224px] rounded-sm rounded-br-none bg-line-gray p-4 font-sans text-chat text-ink-900">{s.ask}</p>
            {/* customer avatar = stock photo (compare-avatar-N, Pexels) over the tint gradient loading backdrop */}
            <span className="h-[30px] w-[30px] shrink-0 overflow-hidden rounded-full border border-chip-border bg-gradient-to-br from-tint-yellow to-tint-pink">
              <img
                src={`/assets/photos/compare-avatar-${index + 1}.webp`}
                alt="Customer avatar"
                loading="lazy"
                decoding="async"
                draggable="false"
                className="block h-full w-full object-cover"
              />
            </span>
          </div>
          {/* bot: white avatar 30 (padding 6, icon) on the left, white bubble 224w radius 8 8 8 0, 1px rgba(0,0,0,.2) */}
          <div className="flex items-end gap-2">
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-chip-border bg-white p-1.5">
              <BotGlyph />
            </span>
            <p className="w-fit max-w-[224px] rounded-sm rounded-bl-none border border-tag-border bg-white p-4 font-sans text-chat text-ink-900">
              {s.reply}
            </p>
          </div>
        </div>
        <p className="text-center font-sans text-chat-sys italic text-muted-3">{s.system}</p>
      </div>
    </CardShell>
  )
}

function ProductCard({ p, index, mode }) {
  const st = useCardState(index, mode, 'product')
  const { playId, phone } = useContext(CycleContext)
  const media = useRef(null)
  // live: the slot's product video restarts every time its card becomes active. The placeholder has no
  // video; if a <video> is dropped into the media box it is rewound and played here.
  useEffect(() => {
    if (!st.active) return
    const v = media.current?.querySelector('video')
    if (v) {
      v.currentTime = 0
      v.play?.().catch(() => {})
    }
  }, [st.active, playId, phone])
  return (
    <CardShell
      base={p.bg}
      contentClass="p-1.5"
      data-motion="compare-product-card"
      data-index={index}
      animate={st.animate}
      transition={st.transition}
      aria-hidden={!st.active || undefined}
    >
      {/* 350x408 autoplay product video (brand content) -> tint gradient placeholder of the same geometry.
          Corner radius not in spec: 14 (= 20 - 6px padding) to follow the card corner in recon/1440-03. */}
      <div
        ref={media}
        data-motion="compare-product-media"
        aria-hidden="true"
        className={`h-[408px] w-[350px] rounded-inner bg-gradient-to-b ${p.media}`}
      />
    </CardShell>
  )
}

function BotStack({ mode = 'desktop' }) {
  return (
    <div className="relative h-[420px] w-[362px]">
      {SCENARIOS.map((s, i) => (
        <BotCard key={i} s={s} index={i} mode={mode} />
      ))}
    </div>
  )
}

function Glow({ p, i, mode, className, style }) {
  // glows live inside the product cards on the original, so they follow the product-card opacity rule
  const st = useCardState(i, mode, 'product')
  return (
    <motion.img
      src={p.glow[0]}
      alt=""
      aria-hidden="true"
      data-motion="compare-glow"
      data-index={i}
      className={className}
      style={style}
      initial={false}
      animate={st.animate}
      transition={st.transition}
    />
  )
}

function ProductStack({ glow = true, mode = 'desktop' }) {
  return (
    <div className="relative h-[420px] w-[362px]">
      {glow &&
        PRODUCT.map((p, i) => (
          <Glow
            key={i}
            p={p}
            i={i}
            mode={mode}
            className={`pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 ${p.glow[3]}`}
            style={{ width: p.glow[1], height: p.glow[2] }}
          />
        ))}
      {PRODUCT.map((p, i) => (
        <ProductCard key={i} p={p} index={i} mode={mode} />
      ))}
    </div>
  )
}

/* ---------- desktop ---------- */

const H2 =
  'font-framer text-center font-display text-h3-phone tracking-display-sub text-ink-900 lg:text-compare-lg lg:tracking-display-sub lg:text-ink xl:text-compare-xl xl:tracking-display-sub'

function Half({ side, children }) {
  const c = COPY[side]
  return (
    // Live Left/Right-Stack is a fixed 672 tall box; its 677px of content (97 + 64 + 420 + 96) is centred, so the
    // heading sits 2.5px above the box top.
    <div className={`flex h-[672px] w-1/2 flex-col items-center justify-center gap-16 pb-24 ${side === 'left' ? 'pl-24' : 'pr-24'}`}>
      <div className="flex max-w-compare-head flex-col gap-4">
        <h2 className={H2}>{c.h2}</h2>
        <p className="text-center font-sans text-body-16 text-ink">{c.body}</p>
      </div>
      {/* card area 624x420 (544 @1200–1439) centring the 362x420 stack */}
      <div className="flex h-[420px] w-full items-center justify-center">{children}</div>
    </div>
  )
}

function ProgressRow({ progress }) {
  const { label } = useContext(CycleContext)
  const coverX = useTransform(progress, (p) => `${p * 100}%`)
  return (
    <div className="hidden w-full flex-col items-center gap-[23px] lg:flex">
      {/* Loading-Bar 878x4 (+10px bottom padding, 878 at 1280 too – live): track #E4E4E4, gradient fill, 2px ends. */}
      <div className="pb-[10px]">
        <div className="relative h-1 w-[878px] overflow-hidden rounded-[2px] bg-progress">
          <motion.div data-motion="compare-progress-cover" className="absolute inset-0 bg-track" style={{ x: coverX }} />
        </div>
      </div>
      {/* live: the label row is centred and static (x 166 / 565 / 1037 @1440 for every scenario) – only opacity moves */}
      <div className="relative h-[26px] w-full overflow-hidden lg:h-[23.4px] xl:h-[26px]">
        <div data-motion="compare-labels" className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-[173px] whitespace-nowrap">
          {SCENARIOS.map((s, i) => (
            <motion.span
              key={i}
              data-motion="compare-label"
              data-index={i}
              className="font-sans text-body lg:text-body-18 xl:text-body-20"
              initial={false}
              animate={{ opacity: i === label ? 1 : 0.4 }}
              transition={LABEL_SPRING}
            >
              {s.label}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- phone ---------- */

function PhoneDot({ i }) {
  const { phone } = useContext(CycleContext)
  return (
    <motion.span
      data-motion="compare-dot"
      data-index={i}
      className="block h-3 w-3 rounded-full bg-brand-magenta"
      initial={false}
      animate={{ opacity: phone.i === i ? 1 : 0.3 }}
      transition={phone.instant ? { duration: 0 } : COMPARE_FADE}
    />
  )
}

function PhoneCompare() {
  return (
    <div className="flex flex-col items-center gap-8 px-8 lg:hidden">
      {/* heading group: 294 @390 (H2 2 lines), max 453 @768 (§16/§17) */}
      <div className="flex w-full max-w-compare-head flex-col gap-4">
        <h2 className={H2}>
          {COPY.left.h2}
          <br />
          {COPY.right.h2}
        </h2>
        <p className="text-center font-sans text-body-16 text-body">{COPY.phoneBody}</p>
      </div>
      {/* combined transition area 294x498 (live @390 and @1000): bot card at .6 (217x252) centred, 2px from the top;
          product card at .8 (290x336) centred and bottom-aligned; glow blob at .85 behind it (401x359 at +12,+122 for
          scenario 1 – the others share its centre). */}
      <div className="relative h-[498px] w-[294px] shrink-0">
        {PRODUCT.map((p, i) => (
          <Glow
            key={i}
            p={p}
            i={i}
            mode="phone"
            className={`pointer-events-none absolute left-[212.5px] top-[301.5px] max-w-none -translate-x-1/2 -translate-y-1/2 ${p.glow[3]}`}
            style={{ width: Math.round(p.glow[1] * 0.851), height: Math.round(p.glow[2] * 0.851) }}
          />
        ))}
        <div className="absolute bottom-0 left-[2px] h-[336px] w-[290px]">
          <div className="origin-top-left scale-[.8]">
            <ProductStack glow={false} mode="phone" />
          </div>
        </div>
        <div className="absolute left-[38.5px] top-[2px] h-[252px] w-[217px]">
          <div className="origin-top-left scale-[.6]">
            <BotStack mode="phone" />
          </div>
        </div>
      </div>
      {/* Dot-Progress 84x36 pill radius 128, bg rgba(229,229,229,.4); dot paddings as the stories pager; inactive .3 (live). */}
      <div className="flex rounded-dot-progress bg-pager-bg">
        {SCENARIOS.map((_, i) => (
          <span
            key={i}
            className={`py-3 ${i === 0 ? 'pl-3 pr-1.5' : i === SCENARIOS.length - 1 ? 'pl-1.5 pr-3' : 'px-1.5'}`}
          >
            <PhoneDot i={i} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Compare() {
  // live keeps the whole cycle (crossfades, label spring, progress Lottie, phone sets) under prefers-reduced-motion:
  // reduce – frame-sampled with reducedMotion 'reduce' @1440 and @390, identical to the default run.
  const { progress, ...cycle } = useCompareCycle(true)
  return (
    <CycleContext.Provider value={cycle}>
    <section data-section="compare" className="flex w-full flex-col gap-8 bg-white px-4 py-14 lg:px-0 lg:py-20">
      <div className="hidden w-full lg:flex">
        <Half side="left">
          <BotStack />
        </Half>
        <Half side="right">
          <ProductStack />
        </Half>
      </div>
      <ProgressRow progress={progress} />
      <PhoneCompare />
    </section>
    </CycleContext.Provider>
  )
}
