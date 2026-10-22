import { useLayoutEffect, useRef, useState } from 'react'

// T5 ColorSwatch: circle (radius 50%) filled with the colour, then label column gap 4: name + "Hex: #XXXXXX" (14/18).
// The hex is read back from the rendered token (computed background), so the label always matches tailwind.config.cjs.
// Circle -> label gap 10 is sampled from the screenshot (not in spec text).
const toHex = (rgb) => {
  const m = rgb.match(/\d+(\.\d+)?/g)
  if (!m) return ''
  return `#${m.slice(0, 3).map((v) => Number(v).toString(16).padStart(2, '0')).join('').toUpperCase()}`
}

export default function ColorSwatch({ name, swatchClass, aspect = 'aspect-[169/170]', className = '' }) {
  const ref = useRef(null)
  const [hex, setHex] = useState('')
  useLayoutEffect(() => {
    if (ref.current) setHex(toHex(getComputedStyle(ref.current).backgroundColor))
  }, [swatchClass])
  return (
    <div className={`flex min-w-0 flex-col gap-2.5 ${className}`}>
      <span ref={ref} className={`block w-full rounded-full ${aspect} ${swatchClass}`} />
      <div className="flex flex-col gap-1 font-sans text-small text-ink">
        <p>{name}</p>
        <p>Hex: {hex}</p>
      </div>
    </div>
  )
}
