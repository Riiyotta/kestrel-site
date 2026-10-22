import { useRef, useState } from 'react'
import ProductArt from './ProductArt.jsx'

// VideoFrame – SPEC_PAGES_A T2 custom player (/coach, /voice). Live plays a mux brand video; that is content, so
// the rebuild shows a static poster (ProductArt) in the same box and keeps the player chrome.
//   variant "coach": 1200x628 @1440 (16:9 at 342x192 phone), white bg, 4px solid #F7F7F7 border, radius 12, shadow
//     0 4px 24px rgba(0,0,0,.12). Controls bar visible at rest: inset 16 from the bottom/sides (1160x60), padding
//     12px 16px, radius 12, backdrop blur 8, shadow 0 2px 12px rgba(0,0,0,.2); 36x36 icon buttons (padding 6,
//     radius 8): play + mute left, time label system-ui 500 14px ls .14px #5100FF (rendered in Inter: only the loaded faces are used) ("0:00 / 1:11"), fullscreen right.
//   variant "voice": 1338x753 (350x197 phone), radius 12, same shadow, no border. Live autoplays muted; its
//     controls bar is opacity 0 while playing and stays hidden on hover (transition opacity .3s) -> rendered at
//     opacity 0 (still focusable: focus-within shows it).
// Interactions (no media to drive): play/pause and mute/unmute toggle their own state + icon; fullscreen calls
// requestFullscreen on the frame. The time label is static.

function Icon({ name }) {
  const paths = {
    play: <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />,
    pause: (
      <>
        <rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" />
        <rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" />
      </>
    ),
    sound: <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Zm11 .2a3.5 3.5 0 0 1 0 4.6M17.5 7.5a7 7 0 0 1 0 9" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    muted: <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Zm11.5 0 5 5m0-5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    full: <path d="M5 9V5h4M15 5h4v4M19 15v4h-4M9 19H5v-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const BTN = 'flex h-9 w-9 items-center justify-center rounded-sm p-1.5 text-ink'

export default function VideoFrame({ variant = 'coach', art = { scene: 'chat', tint: 'brand' }, label = 'Product video', className = '' }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(variant === 'voice')
  const [muted, setMuted] = useState(true)
  const voice = variant === 'voice'
  const full = () => {
    const el = ref.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen?.()
    else el.requestFullscreen?.()
  }
  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      data-ui="video-frame"
      data-variant={variant}
      className={`group relative w-full ${voice ? 'aspect-video' : 'aspect-video md:aspect-[1200/628]'} overflow-hidden rounded-playbook bg-white shadow-video-frame ${voice ? '' : 'border-4 border-tag-bg'} ${className}`}
    >
      <ProductArt scene={art.scene} tint={art.tint} />
      <div
        className={`absolute inset-x-2 bottom-2 flex items-center justify-between rounded-playbook bg-white/70 px-4 py-3 shadow-video-bar backdrop-blur-video-bar md:inset-x-4 md:bottom-4 ${
          voice ? 'opacity-0 transition-opacity duration-300 focus-within:opacity-100' : ''
        }`}
      >
        <div className="flex items-center gap-1">
          <button type="button" className={BTN} aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((v) => !v)}>
            <Icon name={playing ? 'pause' : 'play'} />
          </button>
          <button type="button" className={BTN} aria-label={muted ? 'Unmute' : 'Mute'} onClick={() => setMuted((v) => !v)}>
            <Icon name={muted ? 'muted' : 'sound'} />
          </button>
          {voice ? null : <span className="ml-2 font-inter text-label font-medium tracking-[.14px] text-video-time">0:00 / 1:11</span>}
        </div>
        <button type="button" className={BTN} aria-label="Full screen" onClick={full}>
          <Icon name="full" />
        </button>
      </div>
    </div>
  )
}
