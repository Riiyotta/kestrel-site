import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

// Lenis smooth scroll – CLONE_SPEC §3 (original: Lenis 1.3.25 on window.lenis).
// Every scroll-linked effect should read Lenis-smoothed scroll: use `useLenis()` (instance or null)
// or `window.lenis` (mirrors the original global).
export const LENIS_OPTIONS = {
  duration: 1.5,
  lerp: 0.1,
  easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  syncTouch: false,
  orientation: 'vertical',
  autoRaf: true,
}

const LenisContext = createContext(null)

export function useLenis() {
  return useContext(LenisContext)
}

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const instance = new Lenis(LENIS_OPTIONS)
    window.lenis = instance
    setLenis(instance)
    return () => {
      instance.destroy()
      if (window.lenis === instance) delete window.lenis
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
