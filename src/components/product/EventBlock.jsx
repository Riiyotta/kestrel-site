import DemoForm, { DEMO_FIELDS } from '../ui/DemoForm.jsx'
import '../ui/ui.css'

// EventBlock – SPEC_PAGES_A T1.7b (healthcare only): event copy + inline demo form, appended inside the callout
// section as its second row (82 below the callout row, as the FeatureRows row gap).
//   Row 1040 wide (max-w 1200 section, padding 0 80 60), gap 47, items top:
//   left column 475, column gap 27: H3 Ginto 32/32 −1.28 -> p Ginto 16/22.4 #000 -> 4 benefit lines (column gap
//   24, 16/22.4 #000, bold lead-in).
//   right: DemoForm card 519x548 (bg rgba(255,255,255,.84), r16, p22) with the first/last name pair, email,
//   team-size select and "how did you hear" (shared P5 primitive). Never submits.
//   Below 1200 the layout is not measured: stacked, gap 32, card full width (as the FeatureRows <1200 rows).
// Motion: none.

const FIELDS = DEMO_FIELDS.filter((f) => ['email', 'teamSize', 'source'].includes(f.name))

export default function EventBlock({ event }) {
  return (
    <section data-section="event" className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-8 pb-[60px] pt-[82px] lg:px-20">
      <div className="flex w-full flex-col gap-8 lg:w-[1040px] lg:flex-row lg:items-start lg:gap-[47px]">
        <div className="flex w-full flex-col gap-[27px] lg:w-[475px] lg:shrink-0">
          <h3 className="font-framer font-sans text-title-32 text-ink">{event.title}</h3>
          <p className="font-sans text-body-16 text-ink">{event.intro}</p>
          <ul className="flex flex-col gap-6">
            {event.benefits.map((b, i) => (
              <li key={i} className="ui-inline font-sans text-body-16 text-ink">
                <strong>{b.lead}</strong> {b.text}
              </li>
            ))}
          </ul>
        </div>
        <DemoForm card nameRow title={event.formTitle} fields={FIELDS} className="w-full lg:w-[519px] lg:shrink-0" />
      </div>
    </section>
  )
}
