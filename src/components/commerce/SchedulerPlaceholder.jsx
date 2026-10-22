import { GINTO } from '../ui/type.js'

// SchedulerPlaceholder – stands in for the live third-party scheduling hand-off that follows a valid demo-form
// submit (SPEC_PAGES_A T6: "Submission hands off to a Default.com scheduling flow… Not submitted"; the scheduler
// itself was never measured). Static: it occupies the footprint the form had (`height`, measured by the page) so
// the column does not jump, uses the demo field tint (#FAFAFA, radius 10, 1px rgba(136,136,136,.6) border = the
// bordered field tokens) and draws a neutral week grid of tint blocks. Nothing is sent or booked.

export default function SchedulerPlaceholder({ height, title = 'Thanks, you are all set', note = 'This is a demo form, so nothing was sent. On a live site a scheduling calendar would open here.' }) {
  return (
    <div className="flex flex-col gap-5" style={height ? { minHeight: height } : undefined}>
      <div className="flex flex-col gap-2">
        <p className={`${GINTO} font-medium text-body-16 text-ink`}>{title}</p>
        <p className={`${GINTO} text-small text-muted`}>{note}</p>
      </div>
      <div aria-hidden="true" className="flex flex-1 flex-col gap-3 rounded-tile border border-field-border bg-field p-3">
        <div className="h-4 w-1/3 rounded-xs bg-card-gray" />
        <div className="grid flex-1 grid-cols-5 gap-2">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="min-h-[40px] rounded-sm bg-white shadow-hair" />
          ))}
        </div>
      </div>
    </div>
  )
}
