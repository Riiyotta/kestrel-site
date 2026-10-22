// cx-jobs button atoms (SPEC_PAGES_C T4 "Shared atoms"). Square corners, Inter.
// Black: padding 7px 16px 8px (h 40.6), shadow 0 5px 6px rgba(0,0,0,.2), label 400 16/25.6 -0.32 white.
//   Hover: bg -> white, label -> black, instant (live uses CSS with 0s).
// White (inside dark silk cards): padding 6px 12px, label 600 13/18.2 black, same shadow, no hover change measured.

export default function JobsButton({ href = '#', children, className = '' }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center whitespace-nowrap bg-ink px-4 pb-2 pt-[7px] font-inter text-jobs-body font-normal text-white shadow-jobs-btn hover:bg-white hover:text-ink ${className}`}
    >
      {children}
    </a>
  )
}

export function JobsWhiteButton({ href = '#', children, className = '' }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center self-start whitespace-nowrap bg-white px-3 py-1.5 font-inter text-jobs-13 font-semibold text-ink shadow-jobs-btn ${className}`}
    >
      {children}
    </a>
  )
}

// Text link ("ask your AI", "view all"): #000 -> hover #666 (instant).
export function JobsTextLink({ href = '#', children, className = '' }) {
  return (
    <a href={href} className={`font-inter text-ink hover:text-muted ${className}`}>
      {children}
    </a>
  )
}

// Eyebrow: Inter 400 16/25.6 +0.32, uppercase, #717171.
export function JobsEyebrow({ children, className = '' }) {
  return <p className={`font-inter text-jobs-eyebrow uppercase text-jobs-muted ${className}`}>{children}</p>
}

// Section H2: Inter 500 40/44 -1.8 (xl), 34/37.4 (lg), 36/39.6 (md, phone).
export function JobsH2({ children, className = '' }) {
  return <h2 className={`font-inter text-jobs-h2 font-medium text-ink lg:text-jobs-h2-lg xl:text-jobs-h2-xl ${className}`}>{children}</h2>
}

// Content column: viewport - 36 (phone) / - 48 (tablet) / - 128 (>=1200), max 1440.
export const JOBS_COLUMN = 'mx-auto w-[calc(100%-36px)] max-w-page md:w-[calc(100%-48px)] lg:w-[calc(100%-128px)]'
