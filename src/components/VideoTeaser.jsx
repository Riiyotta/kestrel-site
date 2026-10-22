// Floating video teaser `.lvc` – re-measured on the live site (the widget's own stylesheet):
//
// >= 810px  CARD variant: fixed right 32 / bottom 32, z 30. Button 204 wide, padding 6, radius 22,
//           bg rgba(255,255,255,.78), blur(40px) saturate(1.5), shadow inset 1px white .9 + 1px rgba(26,26,26,.05)
//           + 0 6px 73px rgba(151,151,151,.3); hover bg rgba(240,240,238,.9).
//           Media 192x108 (16:9) radius 16, #E5E5E5 + inset 1px rgba(0,0,0,.06) (YouTube still -> placeholder).
//           Body padding 10px 6px 3px, gap 10: title PP Cirka 14/16.5 -0.25 #1A1A1A, text-wrap balance (2 lines);
//           row: 36x22 #1A1A1A play pill (8px glyph) + customer logo 56x25 (-> placeholder) at .85 opacity.
//           Close "x": absolute top -8 / left -8, 22x22 white circle, Ginto 13/22 #4D4D4D,
//           shadow 0 0 0 1px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.14); opacity 0 -> 1 on hover/focus
//           (always visible on hover:none devices).
// <  810px  PILL variant: fixed bottom 20, centred. Button max-content (272 @390), padding 4px 14px 4px 4px,
//           radius 9999, shadow inset 1px rgba(26,26,26,.08) + 0 6px 30px rgba(151,151,151,.35). 50x30 thumb with a
//           16px white dot (0 1px 3px rgba(0,0,0,.2)) holding a 6px play glyph; gap 10; label Ginto Medium 13/16
//           #1A1A1A, single line, ellipsis, padding-right 2. No close button on phone.
// Click opens a video modal in the original (third-party embed – not built).
// Motion (the widget's own stylesheet on live, CSS not framer):
//   entrance  .lvc { animation: lvcIn .7s cubic-bezier(.2,.8,.2,1) .5s both } from opacity 0 / translateY(16px);
//             phone lvcInM from opacity 0 / translate(-50%, 12px)  -> .teaser-in in index.css (motion: nav/hero)
//   card bg   transition background-color .5s cubic-bezier(.45,0,.55,1)
//   close x   transition opacity .4s cubic-bezier(.45,0,.55,1)
//   prefers-reduced-motion: animation + transitions off.

// Video poster thumbnail (Pexels stock, IMAGE_CREDITS.md). The widget is fixed in the viewport from first paint,
// so it loads eagerly; alt is empty because the button's own label describes the video.
const THUMB = '/assets/photos/video-teaser-thumb.webp'

function PlayGlyph({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 6 6" aria-hidden="true" className="ml-px fill-current">
      <path d="M0 0v6l6-3Z" />
    </svg>
  )
}

export default function VideoTeaser() {
  return (
    <div
      data-motion="video-teaser"
      className="teaser-in group fixed bottom-5 left-1/2 z-30 -translate-x-1/2 md:bottom-8 md:left-auto md:right-8 md:translate-x-0"
    >
      {/* card (>= 810) */}
      <button
        type="button"
        className="hidden w-[204px] rounded-teaser-card bg-teaser-bg p-1.5 text-left text-ink-900 shadow-teaser-card backdrop-blur-teaser backdrop-saturate-150 transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.55,1)] hover:bg-teaser-card-hover motion-reduce:transition-none md:block"
      >
        <span className="relative block aspect-video overflow-hidden rounded-card bg-card-gray after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-teaser-media">
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-line-gray to-muted-3">
            <img src={THUMB} alt="" decoding="async" draggable="false" className="block h-full w-full object-cover" />
          </span>
        </span>
        <span className="flex flex-col gap-2.5 px-1.5 pb-[3px] pt-2.5">
          <span className="font-display text-teaser tracking-teaser-sub text-ink-900 [text-wrap:balance]">
            How Northwind lets Kestrel resolve card disputes end to end
          </span>
          <span className="flex items-center justify-between gap-2">
            <span className="flex h-[22px] w-9 items-center justify-center rounded-pill bg-ink-900 text-white">
              <PlayGlyph size={8} />
            </span>
            {/* customer logo slot (brand -> neutral placeholder bar, same 56x25 box) */}
            <span aria-hidden="true" className="-my-1 flex h-[25px] w-14 items-center justify-end opacity-85">
              <span className="h-2.5 w-12 rounded-sm bg-ink-900" />
            </span>
          </span>
        </span>
      </button>

      {/* pill (< 810) */}
      <button
        type="button"
        className="flex max-w-[calc(100vw-32px)] items-center gap-2.5 rounded-pill bg-teaser-bg py-1 pl-1 pr-3.5 text-left shadow-teaser backdrop-blur-teaser backdrop-saturate-150 md:hidden"
      >
        <span className="relative h-[30px] w-[50px] shrink-0 overflow-hidden rounded-pill bg-card-gray">
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-line-gray to-muted-3">
            <img src={THUMB} alt="" decoding="async" draggable="false" className="block h-full w-full object-cover" />
          </span>
          <span className="absolute left-1/2 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-white text-ink-900 shadow-teaser-dot">
            <PlayGlyph size={6} />
          </span>
        </span>
        <span className="truncate pr-0.5 font-sans font-medium text-teaser-pill text-ink-900">How Halcyon automates email</span>
      </button>

      <button
        type="button"
        aria-label="Dismiss video"
        data-motion="teaser-close"
        className="absolute -left-2 -top-2 z-[1] hidden h-[22px] w-[22px] rounded-full bg-white p-0 text-center font-sans text-teaser-close text-teaser-close opacity-0 shadow-teaser-x transition-opacity duration-[400ms] ease-[cubic-bezier(0.45,0,0.55,1)] motion-reduce:transition-none focus-visible:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100 md:block [@media(hover:none)]:opacity-100"
      >
        ×
      </button>
    </div>
  )
}
