import Field, { Form, SubmitButton } from './Field.jsx'
import { CIRKA } from './type.js'

// DemoForm – SPEC_PAGES_A P5 (T6 /get-a-demo, T1.7b healthcare inline form) = SPEC_PAGES_B T8 VsHero form.
// A preset built from Field skin "demo" + SubmitButton "demo" inside the non-submitting Form.
//   Heading (padding 20): Cirka 700 24/23 −0.48 #0D0D0D (≈17–45 chars, 1 line).
//   form (padding 20, column gap 20): optional first/last name pair (gap 10) -> email (bordered, 44 tall) ->
//   team-size select -> industry select -> "anything else" (74 box) -> "how did you hear" -> Submit.
//   `card`: bg rgba(255,255,255,.84), radius 16, padding 22, overflow clip (A T1.7b 519 wide / B T8 485 wide).
// Pass `fields` to change the set; each entry is Field props (skin "demo" is applied).
// `success` / `successClassName` (optional, added for A T6) replace Form's default local success message, e.g. with a
// static stand-in for a scheduler hand-off. Defaults keep the previous behaviour.

export const DEMO_FIELDS = [
  { name: 'email', type: 'email', label: 'Work email', placeholder: 'you@company.com', required: true, bordered: true },
  { name: 'teamSize', type: 'select', label: 'Support team size', placeholder: 'Select a range', required: true, options: ['1–10', '11–50', '51–200', '201–1,000', '1,000+'] },
  {
    name: 'industry',
    type: 'select',
    label: 'Industry',
    placeholder: 'Select an industry',
    required: true,
    options: ['Financial services', 'Healthcare', 'Insurance', 'Retail', 'Software', 'Travel', 'Other'],
  },
  { name: 'notes', label: 'Anything else we should know before the call?', placeholder: 'Optional', boxHeight: 74 },
  { name: 'source', label: 'How did you hear about Kestrel?', placeholder: 'Search, a colleague, a podcast…', required: true },
]

export default function DemoForm({ title, fields = DEMO_FIELDS, nameRow = false, submitLabel = 'Submit →', card = false, success, successClassName = 'p-5', className = '' }) {
  return (
    <div
      data-ui="demo-form"
      className={`flex flex-col overflow-clip ${card ? 'rounded-card bg-demo-card p-[22px]' : ''} ${className}`}
    >
      {title ? <p className={`p-5 text-form-title text-ink-nav ${CIRKA} !font-bold`}>{title}</p> : null}
      <Form className="flex flex-col gap-5 p-5" successClassName={successClassName} {...(success !== undefined ? { success } : null)}>
        {nameRow ? (
          <div className="flex gap-2.5">
            <Field skin="demo" name="firstName" label="First name" placeholder="First name" required className="flex-1" />
            <Field skin="demo" name="lastName" label="Last name" placeholder="Last name" required className="flex-1" />
          </div>
        ) : null}
        {fields.map((f) => (
          <Field key={f.name} skin="demo" {...f} />
        ))}
        <SubmitButton variant="demo">{submitLabel}</SubmitButton>
      </Form>
    </div>
  )
}
