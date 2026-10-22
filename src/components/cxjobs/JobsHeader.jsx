import Logo from '../Logo.jsx'
import JobsButton, { JobsTextLink } from './JobsButton.jsx'

// J0 JobsHeader (SPEC_PAGES_C T4): fixed, h 81, opaque #EEE, padding 20px 64px (tablet 20px 24px, phone 20px 18px).
// Left: Kestrel lockup 21x28 + 99x22 gap 8. Right (gap 40): "ask your AI" (hidden on phone) + Black button.
export default function JobsHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[1] flex h-[81px] items-center justify-between bg-jobs-bg px-[18px] py-5 md:px-6 lg:px-16">
      <Logo href="/cx-jobs" />
      <nav className="flex items-center gap-10">
        <JobsTextLink href="#ask-ai" className="hidden text-jobs-body md:inline">
          Ask your AI
        </JobsTextLink>
        <JobsButton href="#open-roles">Browse roles</JobsButton>
      </nav>
    </header>
  )
}
