import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DemoForm from '../components/ui/DemoForm.jsx'
import Button from '../components/Button.jsx'
import DemoArt from '../components/commerce/DemoArt.jsx'
import SchedulerPlaceholder from '../components/commerce/SchedulerPlaceholder.jsx'
import { AssistantNote } from '../components/Stories.jsx'
import { GINTO } from '../components/ui/type.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'

// /get-a-demo – SPEC_PAGES_A T6. Standalone: no Nav, no Footer, no video teaser.
// Layout @1440: one row, viewport-height panel (min-h-screen), bg #FFF, overflow hidden.
//   Left ("Sign up", 708 wide @1440; 500 @810–1199; full width phone): column max-w 450 centred, padding 20px 0
//   (phone: padding 12, inner gap 45, padding 20px 0 80px). Back link -> form gap: 45 phone (spec); 59 at >=810,
//   sampled from get-a-demo-1440.png (heading ink at y 138; the spec paddings alone put it 59px higher).
//     Back link (padding 13px 30px 0): "← Back" Ginto 18/23.4 #000 underlined, history.back().
//     DemoForm (no card): heading Cirka 700 24/23 + email (bordered) / 2 selects / "anything else" 74 box / "how
//       did you hear" / Submit. Never sends: on a valid submit the form is swapped for SchedulerPlaceholder at the
//       form's measured height (stand-in for the live third-party scheduler hand-off).
//     Trial prompt (padding 8px 20px 20px, gap 16): Ginto 16/22.4 #1A1A1A + Button light md. Phone: stacked
//       (pricing-390 PNG shows the button under the text; gap 12 read off it).
//     Legal line at the bottom of the column (y 866 @1440): Ginto Medium 14/14 #666 centred (10/14 @810–1199,
//       wraps to 2 lines phone; 14/18 line box used on phone so the two lines don't touch), 2 underlined links.
//   Right: DemoArt (gradient art card + glass quote card).
//   Then the homepage AI-assistant note (§13b, opacity 0), imported from Stories.
// Motion: none (spec).

const QUOTE = {
  quote: 'We ran three AI agents side by side and Kestrel came out ahead on every number we cared about.',
  person: { name: 'Maya Lindqvist', role: 'Head of Support, Brightpaw', photo: '/assets/photos/proof-portrait-1.webp' },
}

export default function GetADemo() {
  useDocumentTitle('Kestrel | Get a demo')
  const formWrap = useRef(null)
  const [formH, setFormH] = useState()

  // remember the form's height while it is on screen, so the placeholder can take over the same footprint
  useLayoutEffect(() => {
    const form = formWrap.current?.querySelector('form')
    if (!form) return undefined
    const ro = new ResizeObserver(() => form.offsetHeight && setFormH(form.offsetHeight)) // 0 once unmounted
    ro.observe(form)
    return () => ro.disconnect()
  }, [])

  return (
    <div data-page="get-a-demo" className="bg-white">
      <div className="flex flex-col overflow-hidden md:min-h-screen md:flex-row">
        <div className="flex w-full flex-col md:w-1/2 md:shrink-0 lg:w-[708px]">
          <div className="mx-auto flex w-full max-w-[450px] flex-col gap-[45px] px-3 pb-20 pt-5 md:gap-[59px] md:px-0 md:py-5">
            <div className="px-[30px] pt-[13px]">
              <button type="button" onClick={() => window.history.back()} className={`${GINTO} text-body-18 text-ink underline`}>
                ← Back
              </button>
            </div>
            <div ref={formWrap} className="flex flex-col overflow-clip">
              <DemoForm
                title="Let’s book a time to chat"
                success={<SchedulerPlaceholder height={formH ? formH - 40 : undefined} />}
              />
              <div className="flex flex-col items-start gap-3 px-5 pb-5 pt-2 md:flex-row md:items-center md:gap-4">
                <p className={`${GINTO} text-body-16 text-ink-900`}>Rather try it on your own?</p>
                <Button variant="light" size="md" href="#">
                  Start free trial
                </Button>
              </div>
            </div>
          </div>
          <p className={`mt-auto px-5 pb-5 text-center ${GINTO} font-medium text-small text-muted md:text-legal-10 lg:text-label`}>
            By signing up you agree to the{' '}
            <Link to="/terms-of-service" className="underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
        <DemoArt {...QUOTE} />
      </div>
      <AssistantNote />
    </div>
  )
}
