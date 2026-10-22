import { KestrelMark, KestrelWordmark } from '../Logo.jsx'

// Fluid Kestrel lockup for press-kit previews: same proportions as the Logo slot (mark 21 + gap 8 + wordmark 99 = 128),
// expressed as % of the lockup width so it scales with its box. `!fill-*` overrides the components' default ink fill
// without changing Logo.jsx defaults.
const TONES = {
  ink: { mark: '', word: '' },
  colour: { mark: '!fill-brand-indigo', word: '' },
  white: { mark: '!fill-white', word: '!fill-white' },
}

export default function KestrelLockup({ tone = 'ink', className = '' }) {
  const t = TONES[tone]
  return (
    <div className={`flex items-center gap-[6.25%] ${className}`}>
      <KestrelMark className={`h-auto w-[16.4%] ${t.mark}`} />
      <KestrelWordmark className={`h-auto w-[77.35%] ${t.word}`} />
    </div>
  )
}

// Mark only, sized by its box height.
export function KestrelMarkFluid({ tone = 'ink', className = '' }) {
  return <KestrelMark className={`h-full w-auto ${TONES[tone].mark} ${className}`} />
}
