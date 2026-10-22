import Logo from '../Logo.jsx'

// J7 JobsFooter (SPEC_PAGES_C T4): panel #F4F4F5, padding 56px 32px 32px (tablet 56px 24px 32px, phone 48px 18px 32px),
// inner 1200 centred. Left: lockup 128x28 + blurb 14/21 -0.1 #717171 (320 wide). Right: 3 link columns, gap 64
// (tablet: space-between full width, phone: column gap 28); title 600 13/18.2 + links 14/21 -0.1 #717171 at a 35px pitch.
// Then a 1px rgba(0,0,0,.08) rule and the bottom row: (c) 13/18.2 -0.1 #9AA0A6 + two legal links 14/21 #717171 (gap 24).
// Sampled (not in spec text): logo -> blurb gap 16, 36px above and below the rule, phone bottom row stacked.
export default function JobsFooter({ columns, className = '' }) {
  return (
    <footer className={`bg-jobs-panel px-[18px] pb-8 pt-12 md:px-6 md:pt-14 lg:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-jobs-footer font-inter">
        <div className="flex flex-col gap-7 md:gap-10 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4">
            <Logo href="/cx-jobs" />
            <p className="max-w-jobs-blurb text-jobs-14-tight text-jobs-muted">
              Kestrel Jobs is a free board from Kestrel, the AI resolution agent for banks, insurers and clinics.
            </p>
          </div>
          <div className="flex flex-col gap-7 md:flex-row md:justify-between lg:justify-start lg:gap-16">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3.5">
                <p className="text-jobs-13 font-semibold text-ink">{col.title}</p>
                {col.links.map((l) => (
                  <a key={l} href="#" className="text-jobs-14-tight text-jobs-muted">
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-9 flex flex-col pt-9 shadow-[inset_0_1px_0] shadow-jobs-hairline md:flex-row md:items-center md:justify-between">
          <p className="text-jobs-13-tight text-jobs-muted-2">© 2026 Kestrel. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-jobs-14 text-jobs-muted">Privacy policy</a>
            <a href="#" className="text-jobs-14 text-jobs-muted">Terms of service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
