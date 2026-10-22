import Button from '../Button.jsx'
import Field, { Form, SubmitButton } from '../ui/Field.jsx'

// PostCTAs – SPEC_PAGES_B T4 `Blog CTAs`. Grid 442 442, gap 16; <1200 stacked (gap 10), full width.
//   Both cards: padding 24 48 24 24 (phone trial card 24 12), radius 8, column gap 20, overflow clip.
//   Trial: bg #1A1A1A, title Ginto 24/24 −0.96 #FFF, body 16/22.4 rgba(255,255,255,.8) (14/19.6 <1200, w370),
//   then the homepage Button outline/light at Medium size.
//   Book a call: bg #F4F6F8, title 24/24 #000, body 16/22.4 #666; inline form row gap 8: pill input 261×40 (Field
//   skin "pill") + #333 submit pill 101×40 (SubmitButton "pill"). The form never sends anything.

export default function PostCTAs({ trial, call }) {
  return (
    <div data-ui="post-ctas" className="grid w-full grid-cols-1 gap-2.5 lg:grid-cols-[442px_442px] lg:gap-4">
      <div className="flex flex-col gap-5 overflow-clip rounded-sm bg-ink-900 px-3 py-6 md:pl-6 md:pr-12">
        <h3 className="font-sans text-title-24-tight text-white">{trial.title}</h3>
        <p className="max-w-[370px] font-sans text-para-14-phone text-cta-body lg:text-body-16">{trial.body}</p>
        <Button variant="light" size="md" href={trial.href} className="self-start">
          {trial.cta}
        </Button>
      </div>
      <div className="flex flex-col gap-5 overflow-clip rounded-sm bg-share-hover py-6 pl-6 pr-6 md:pr-12">
        <h3 className="font-sans text-title-24-tight text-ink">{call.title}</h3>
        <p className="font-sans text-para-14-phone text-muted lg:text-body-16">{call.body}</p>
        <Form className="flex gap-2" success="Thanks! This is a demo form, so nothing was sent.">
          <Field skin="pill" type="email" name="email" label="Work email" hideLabel placeholder="Work email" required className="w-[261px] max-w-full flex-1 md:flex-none" />
          <SubmitButton variant="pill">{call.cta}</SubmitButton>
        </Form>
      </div>
    </div>
  )
}
