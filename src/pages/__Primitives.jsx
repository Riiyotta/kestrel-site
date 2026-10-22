import { useState } from 'react'
import Button from '../components/Button.jsx'
import RichText, { tocFromBlocks } from '../components/ui/RichText.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import SplitText from '../components/ui/SplitText.jsx'
import ProseSection from '../components/ui/ProseSection.jsx'
import HeroHeadline from '../components/ui/HeroHeadline.jsx'
import Field, { FileDropZone, Form, SubmitButton } from '../components/ui/Field.jsx'
import DemoForm from '../components/ui/DemoForm.jsx'
import FaqAccordion from '../components/ui/FaqAccordion.jsx'
import FeatureRows from '../components/ui/FeatureRows.jsx'
import IntegrationCard from '../components/ui/IntegrationCard.jsx'
import PricingCard from '../components/ui/PricingCard.jsx'
import RuledFrame, { Footnotes, PlansRow } from '../components/ui/RuledFrame.jsx'
import CardCarousel from '../components/ui/CardCarousel.jsx'
import FilterChips from '../components/ui/FilterChips.jsx'
import SearchInput from '../components/ui/SearchInput.jsx'
import LoadMoreButton from '../components/ui/LoadMoreButton.jsx'
import { HoverToc, InlineToc, TickToc } from '../components/ui/Toc.jsx'
import ShareRail from '../components/ui/ShareRail.jsx'
import CtaChip from '../components/ui/CtaChip.jsx'
import CompareTable from '../components/ui/CompareTable.jsx'
import EmployeeCard from '../components/ui/EmployeeCard.jsx'
import LogoMarquee from '../components/ui/LogoMarquee.jsx'
import LogoWall from '../components/ui/LogoWall.jsx'
import { H4_SCALE } from '../components/ui/type.js'

// DEV-ONLY showcase of every shared primitive (src/components/ui) with Kestrel placeholder data.
// Mount at /__primitives (see COMPONENTS.md). Not linked from the site. Forms here never send anything.

/* ---------------- sample data (original placeholder copy for the fictional "Kestrel") ---------------- */

const PROSE_ITEMS = [
  {
    blocks: [
      {
        type: 'p',
        html: 'Kestrel is an AI support agent that resolves customer questions end to end, from the first message to the final follow-up, inside the tools your team already uses every day.',
      },
      {
        type: 'ul',
        items: [
          'It reads your help centre, past tickets and internal notes, then answers in your voice with the same care your best agents show. <a href="#">See how it learns</a>',
          'It takes real actions such as refunds, address changes and plan updates, with guardrails you set per workflow. <a href="#">Read about guardrails</a>',
          'It hands complex cases to people with a clear summary, so nobody has to ask the customer to repeat themselves. <a href="#">Explore hand-offs</a>',
        ],
      },
      { type: 'p', html: '<strong>Where simpler bots stop short:</strong>' },
      {
        type: 'ul',
        items: ['Scripted flows break as soon as a question leaves the happy path.', 'Deflection metrics hide unresolved problems that come back later as churn.'],
      },
    ],
  },
  {
    title: 'How do the main approaches compare?',
    blocks: [
      {
        type: 'ul',
        items: [
          '<strong>Resolution:</strong> Kestrel: completes the task. Scripted bot: links to an article. Inbox tool: routes to a person.',
          '<strong>Set-up:</strong> Kestrel: learns from existing content. Scripted bot: hand-built trees. Inbox tool: rules and macros.',
          '<strong>Oversight:</strong> Kestrel: per-workflow guardrails and review queues. Scripted bot: none. Inbox tool: manual QA.',
        ],
      },
      { type: 'p', html: 'Sources: <a href="#">field guide</a>, <a href="#">pricing notes</a>, <a href="#">security overview</a>.' },
    ],
  },
]

const BLOG_BLOCKS = [
  { type: 'p', html: '<em>Update: this post was refreshed for the autumn release.</em>' },
  {
    type: 'p',
    html: 'Most support teams already know which questions eat their week. The hard part is handing those questions to software without losing the care customers expect. This post walks through how we approached that at Kestrel.',
  },
  { type: 'h2', text: 'Start with the questions that repeat', id: 'blog-repeat' },
  {
    type: 'p',
    html: 'We looked at a quarter of tickets and grouped them by intent rather than by tag. A small number of intents covered most of the volume, and nearly all of them needed one or two account actions to finish.',
  },
  {
    type: 'ul',
    items: ['Order changes and delivery questions', 'Billing corrections and refunds', 'Login and access problems'],
  },
  { type: 'h3', text: 'What counts as resolved', id: 'blog-resolved' },
  {
    type: 'p',
    html: 'A resolved ticket is one the customer never has to reopen. We measure that over fourteen days, not at the moment the chat closes. <a href="#">Read the full method</a>.',
  },
  { type: 'blockquote', html: 'The moment we stopped counting deflections and started counting fixed problems, the roadmap wrote itself.', cite: 'Kestrel support lead' },
  { type: 'h2', text: 'Give the agent real tools', id: 'blog-tools' },
  {
    type: 'p',
    html: 'Answers alone rarely close a ticket. The agent needs scoped access to the same systems your team uses, with limits that match your policies and a log of every action it takes.',
  },
  { type: 'ol', items: ['Connect the help centre and ticket history.', 'Add actions one workflow at a time.', 'Review a sample of conversations each week.'] },
]

const ARTICLE_BLOCKS = [
  {
    type: 'takeaways',
    title: 'Key takeaways',
    id: 'art-takeaways',
    items: [
      'Pick one resolution metric and measure it the same way every month.',
      'Satisfaction scores lag; reopen rates show problems sooner.',
      'Benchmarks only help when the ticket mix is similar to yours.',
    ],
  },
  { type: 'h2', text: 'What the metric measures', id: 'art-what' },
  {
    type: 'p',
    html: 'A good support metric describes an outcome the customer cares about. Speed matters, but only when the answer is right and the problem stays fixed.',
  },
  { type: 'h3', text: 'Common pitfalls', id: 'art-pitfalls' },
  { type: 'ul', items: ['Counting a closed chat as a solved problem.', 'Mixing channels with very different ticket types.'] },
  { type: 'h2', text: 'How to improve it', id: 'art-improve' },
  {
    type: 'p',
    html: 'Start with the intents that reopen most often, fix the underlying content or workflow, then watch the metric for a full cycle before changing anything else.',
  },
]

const LEGAL_BLOCKS = [
  { type: 'p', html: '<em>Effective date: 1 January 2026</em>' },
  {
    type: 'p',
    html: 'This placeholder policy explains how the fictional Kestrel service handles information. It exists only to demonstrate the legal text style and has no legal meaning.',
  },
  { type: 'h4', text: '1. Information we collect' },
  { type: 'p', html: 'We collect the details you choose to give us, such as your name and work email, and basic usage data from the product.' },
  { type: 'ul', items: ['Account details you provide', 'Messages you send to support', 'Technical logs needed to run the service'] },
  { type: 'h4', text: '2. How to contact us' },
  { type: 'p', html: 'Questions about this placeholder text can go to <a href="#">privacy@kestrel.example</a>.' },
]

const FEATURE_ROWS = [
  {
    eyebrow: 'Resolution agent',
    title: 'Answers that finish the job, not just the reply',
    body: 'Kestrel reads the whole case, checks the account, takes the action and confirms the outcome with the customer, so the conversation ends with the problem actually solved.',
  },
  {
    eyebrow: 'Quality agent',
    title: 'Every conversation reviewed against your own standards',
    body: 'Set the rubric once and Kestrel scores each conversation, flags the ones that need a person, and shows which help articles cause the most confusion for customers.',
  },
]

const ROWS_600 = [
  {
    title: 'Works across chat, email and voice from one set of instructions',
    body: 'Write a workflow once and Kestrel follows it on every channel, adjusting tone and length to fit the medium your customer picked.',
    cta: { label: 'See channels' },
  },
  {
    title: 'Clear hand-offs whenever a person should step in',
    body: 'When a case needs judgement, Kestrel passes it on with a summary, the steps already taken and the open question, so your team starts from context.',
    cta: { label: 'Learn more' },
  },
]

const INTEGRATIONS = [
  { name: 'Helpdock', description: 'Sync tickets, tags and macros both ways so agents and Kestrel share one queue.', logo: { shape: 'square' } },
  { name: 'Callwise', description: 'Answer phone calls and route complex ones to the right team with a summary.', logo: { shape: 'ring' } },
  { name: 'Notewell', description: 'Use your internal wiki as a knowledge source.', logo: { shape: 'triangle' } },
  { name: 'Ledgerly', description: 'Look up invoices and issue refunds within limits you define for each plan.', logo: { shape: 'bars' } },
]

const PLANS = [
  {
    name: 'Starter',
    price: '$400',
    note: 'Billed monthly',
    cta: { label: 'Start free trial' },
    bestFor: 'Small teams trying AI support on one channel for the first time.',
    groups: [
      { label: 'Chat', rows: [{ label: 'Per resolved conversation', value: '$0.90' }, { label: 'Included conversations', value: '400' }] },
      { label: 'Email', rows: [{ label: 'Per resolved ticket', value: '$1.10' }] },
      { label: 'Voice', rows: [{ label: 'Per resolved call', value: '$1.60' }] },
    ],
  },
  {
    name: 'Growth',
    price: '$1,200',
    note: 'Billed monthly',
    cta: { label: 'Talk to sales' },
    bestFor: 'Growing teams running several channels with shared workflows.',
    groups: [
      { label: 'Chat', rows: [{ label: 'Per resolved conversation', value: '$0.80' }, { label: 'Included conversations', value: '1,500' }] },
      { label: 'Email', rows: [{ label: 'Per resolved ticket', value: '$0.95' }] },
      { label: 'Voice', rows: [{ label: 'Per resolved call', value: '$1.40' }] },
    ],
  },
  {
    name: 'Scale',
    price: 'Custom',
    per: '',
    note: 'Annual agreement',
    cta: { label: 'Book a demo' },
    bestFor: 'Large support organisations with strict review and security needs.',
    groups: [
      { label: 'Chat', rows: [{ label: 'Per resolved conversation', value: 'Custom' }] },
      { label: 'Email', rows: [{ label: 'Per resolved ticket', value: 'Custom' }] },
      { label: 'Voice', rows: [{ label: 'Per resolved call', value: 'Custom' }] },
    ],
  },
]

const PRICING_COLUMNS = [
  { key: 'feature', label: 'Compare features' },
  { key: 'starter', label: 'Starter', price: '$400', per: '/mo', cta: { label: 'Start free trial' } },
  { key: 'growth', label: 'Growth', price: '$1,200', per: '/mo', cta: { label: 'Talk to sales' } },
  { key: 'scale', label: 'Scale', price: 'Custom', cta: { label: 'Book a demo' } },
]
const PRICING_GROUPS = [
  {
    label: 'Channels',
    rows: [
      { label: 'Chat', values: [true, true, true] },
      { label: 'Email', values: ['Included', 'Included', 'Included'] },
      { label: 'Voice', values: [false, { text: '$1.40', note: 'per resolved call', align: 'right' }, { text: 'Custom', align: 'right' }] },
    ],
  },
  {
    label: 'Quality and review',
    rows: [
      { label: 'Conversation scoring', href: '#', values: [true, true, true] },
      { label: 'Custom rubrics', values: [false, true, true] },
    ],
  },
  { label: 'Security', rows: [{ label: 'Single sign-on', values: [false, true, true] }] },
]

const GRID_COLUMNS = [
  { key: 'cat', label: 'Category' },
  { key: 'us', label: 'Kestrel' },
  { key: 'them', label: 'Legacy helpdesk bots' },
]
const GRID_GROUPS = [
  {
    rows: [
      { label: 'Resolution', values: ['Completes tasks inside your systems with logged actions.', 'Suggests articles and routes the rest to people.'] },
      { label: 'Set-up time', values: ['Days, using existing help content.', 'Weeks of building decision trees by hand.'] },
      { label: 'Oversight', values: ['Per-workflow guardrails and weekly review queues.', 'Manual spot checks.'] },
    ],
  },
]
const MATRIX_COLUMNS = [
  { key: 'label', label: '' },
  { key: 'us', label: 'Kestrel' },
  { key: 'them', label: 'Single-assistant AI' },
]
const MATRIX_GROUPS = [
  {
    rows: [
      { label: 'Takes account actions', values: [true, false] },
      { label: 'Voice channel', values: [true, 'partial'] },
      { label: 'Pricing model', values: ['Per resolution', 'Per seat'] },
      { label: 'Custom review rubrics', values: [true, false] },
    ],
  },
]

const FAQ = [
  { q: 'How long does it take to set up Kestrel?', a: 'Most teams connect their help centre and ticket history in a day, then add actions one workflow at a time. <a href="#">See the setup guide</a>.' },
  { q: 'Can we control what actions the agent takes?', a: 'Yes. Every action has limits you set per workflow, and anything outside them is handed to a person with a summary.' },
  { q: 'Which languages are supported?', a: 'Kestrel answers in the language the customer writes in and follows the same workflows in each one.' },
]

const CAROUSEL = [
  { title: 'Chat', subtitle: 'On your site and in your app', bullets: [{ lead: 'Answers', text: 'questions in seconds with your tone.' }, { lead: 'Acts', text: 'on accounts within the limits you set.' }, { lead: 'Hands off', text: 'with a full summary when needed.' }] },
  { title: 'Email', subtitle: 'Inside your existing inbox', bullets: [{ lead: 'Drafts', text: 'complete replies with every step done.' }, { lead: 'Merges', text: 'duplicate threads automatically.' }, { lead: 'Tags', text: 'tickets for reporting.' }] },
  { title: 'Voice', subtitle: 'On your support line', bullets: [{ lead: 'Picks up', text: 'every call without a queue.' }, { lead: 'Verifies', text: 'callers before any change.' }, { lead: 'Transfers', text: 'warm to the right team.' }] },
  { title: 'SMS', subtitle: 'For quick follow-ups', bullets: [{ lead: 'Confirms', text: 'changes after a call or chat.' }, { lead: 'Reminds', text: 'customers about open steps.' }, { lead: 'Closes', text: 'the loop politely.' }] },
  { title: 'Social', subtitle: 'In public and private messages', bullets: [{ lead: 'Moves', text: 'public questions to private threads.' }, { lead: 'Keeps', text: 'tone consistent with your brand.' }, { lead: 'Escalates', text: 'sensitive cases.' }] },
]

const STORY_CHIPS = [
  { id: 'all', label: 'All', theme: 'neutral', glyph: 'dot' },
  { id: 'finance', label: 'Finance', theme: 'pink', glyph: 'coin' },
  { id: 'saas', label: 'Complex software', theme: 'yellow', glyph: 'stack' },
  { id: 'health', label: 'Health', theme: 'red', glyph: 'cross' },
  { id: 'energy', label: 'Energy', theme: 'green', glyph: 'bolt' },
]
const TABS = ['All', 'Podcast', 'Customer experience', 'AI learnings', 'Product updates', 'Company news'].map((l) => ({ id: l, label: l }))
const TOPICS = [
  { id: 'all', label: 'All', count: 48 },
  { id: 'metrics', label: 'Metrics', count: 14 },
  { id: 'automation', label: 'Automation', count: 12 },
  { id: 'teams', label: 'Teams', count: 11 },
  { id: 'tools', label: 'Tools', count: 11 },
]
const SIDEBAR = ['Ticketing system', 'Telephony', 'Knowledge base', 'Tools and actions'].map((l) => ({ id: l, label: l }))

const EMPLOYEES = [
  {
    quote: '“What I value most here is how much trust people give each other. Decisions happen quickly, nobody guards their ideas, and that same openness shapes how we work with every customer we support.”',
    name: 'Ren Okafor',
    role: 'Forward Deployed Engineer',
    flag: '🇬🇧',
    tint: 'pink',
  },
  {
    quote: '“I joined because the team treats AI as a way to solve specific problems rather than a slogan. We start with the hardest customer-facing cases first, and that focus is what makes the work feel worthwhile.”',
    name: 'Mila Torres',
    role: 'Founding Engineer',
    flag: '🇦🇺',
    tint: 'cream',
  },
]

/* ---------------- page ---------------- */

function Label({ children }) {
  return <p className="mx-auto w-full max-w-container px-5 pb-4 pt-16 font-sans text-small text-muted">{children}</p>
}

export default function Primitives() {
  const [tocMode, setTocMode] = useState('hover')
  const [visible, setVisible] = useState(3)
  const blogToc = tocFromBlocks(BLOG_BLOCKS, { levels: [2, 3] })
  const articleToc = tocFromBlocks(ARTICLE_BLOCKS).map((t, i) => ({ ...t, minute: [0, 1, 4][i], summary: 'A short summary of what this section covers, shown in the tick popover.' }))

  return (
    <div data-page="primitives" className="pb-40">
      {tocMode === 'hover' ? <HoverToc items={blogToc} /> : <TickToc items={articleToc} />}
      <ShareRail />
      <CtaChip tag="Demo" label="Watch Kestrel resolve a billing dispute" trailing="Start free trial" />

      <Label>HeroHeadline (simple)</Label>
      <HeroHeadline
        className="px-5 pt-10"
        title="Support that resolves, not deflects"
        sub="Kestrel handles complex customer conversations end to end, across chat, email and voice."
        subColor="ink"
        actions={
          <>
            <Button variant="dark">Book a demo</Button>
            <Button variant="light">Start free trial</Button>
          </>
        }
      />

      <Label>SectionHeading – stack h2 + hero sub / stack h3 + soft sub / band</Label>
      <div className="mx-auto flex max-w-container flex-col gap-20 px-6">
        <SectionHeading title="About the team" sub="We are a small group of engineers, designers and support specialists building software that treats customers with care." subTone="hero" />
        <SectionHeading size="h3" gap={16} title="Why teams switch to Kestrel" sub="Six differences that show up in the first month of running it alongside your current tools." />
      </div>
      <SectionHeading variant="band" title="The support agent that finishes the work it starts" />

      <Label>SplitText (pt 100)</Label>
      <SplitText
        pt={100}
        lgTight={false}
        as="div"
        headingAs="h2"
        title="Our team"
        blocks={[
          { type: 'p', html: 'Kestrel was started by people who ran support teams and built the tools those teams relied on. <a href="#">Read our story</a>.' },
          { type: 'p', html: 'Today the company works across three cities with one shared goal: customers should never have to ask twice.' },
        ]}
      />

      <Label>ProseSection (A P1) – tabletPad 32 / phonePad 20</Label>
      <ProseSection title="What Kestrel does for support teams" tabletPad={32} phonePad={20} items={PROSE_ITEMS} />
      <ProseSection items={[{ title: 'Related reading', blocks: [{ type: 'ul', items: ['<a href="#">How resolution rate is measured</a>', '<a href="#">Setting guardrails for refunds</a>', '<a href="#">Running a weekly review</a>'] }] }]} />

      <Label>RichText – blog (900) / article (800) / legal (920)</Label>
      <div className="mx-auto flex max-w-[900px] flex-col gap-24 px-5">
        <RichText blocks={BLOG_BLOCKS} variant="blog" />
        <div className="flex flex-col gap-6">
          <InlineToc items={articleToc} />
          <RichText blocks={ARTICLE_BLOCKS} variant="article" className="max-w-[800px]" />
        </div>
        <RichText blocks={LEGAL_BLOCKS} variant="legal" className="max-w-[920px]" />
        <div className="flex gap-3">
          <button type="button" onClick={() => setTocMode('hover')} className="font-sans text-small underline">
            HoverToc
          </button>
          <button type="button" onClick={() => setTocMode('tick')} className="font-sans text-small underline">
            TickToc
          </button>
        </div>
      </div>

      <Label>FeatureRows – 472 / callout / 600</Label>
      <FeatureRows rows={FEATURE_ROWS} />
      <FeatureRows variant="callout" rows={[{ title: 'Put Kestrel on your hardest queue first', body: 'Start where volume and stakes are highest. Kestrel learns from your existing content and shows its work on every conversation, so you can review before you widen the rollout.', cta: { label: 'Book a demo' } }]} />
      <FeatureRows variant="600" rows={ROWS_600} />

      <Label>IntegrationCard</Label>
      <div className="mx-auto grid max-w-[868px] grid-cols-1 gap-5 px-5 md:grid-cols-2">
        {INTEGRATIONS.map((it) => (
          <IntegrationCard key={it.name} {...it} />
        ))}
      </div>

      <Label>RuledFrame + PricingCard + CompareTable pricing</Label>
      <RuledFrame>
        <PlansRow>
          {PLANS.map((p) => (
            <PricingCard key={p.name} {...p} />
          ))}
        </PlansRow>
        <Footnotes note="Prices exclude tax. Volume discounts apply above the included amounts." link={{ label: 'Machine-readable pricing file', href: '#' }} />
        <div id="compare">
          <CompareTable variant="pricing" columns={PRICING_COLUMNS} groups={PRICING_GROUPS} />
        </div>
      </RuledFrame>

      <Label>CompareTable – grid / matrix</Label>
      <div className="flex flex-col gap-20 px-[10px] md:px-8">
        <CompareTable variant="grid" columns={GRID_COLUMNS} groups={GRID_GROUPS} />
        <CompareTable variant="matrix" columns={MATRIX_COLUMNS} groups={MATRIX_GROUPS} />
      </div>

      <Label>FaqAccordion – panel (sidebar + letter reveal) / rows / hairline / cards</Label>
      <FaqAccordion look="panel" title="FAQs" items={FAQ} />
      <div className="mt-20 flex flex-col gap-20 px-5 md:px-8">
        <FaqAccordion look="rows" title="Questions to ask any AI vendor" items={FAQ} />
        <div className="mx-auto w-full max-w-[800px]">
          <FaqAccordion look="hairline" items={FAQ} />
        </div>
        <FaqAccordion look="cards" title="Frequently asked questions" items={FAQ} />
      </div>

      <Label>CardCarousel – snap / rail</Label>
      <div className="mx-auto max-w-[1200px] px-5">
        <CardCarousel items={CAROUSEL} card="square" label="Channels" />
      </div>
      <div className="mt-16 bg-rail-tint px-6 py-16 md:px-10 lg:px-16">
        <CardCarousel
          variant="rail"
          title="Podcast episodes"
          items={CAROUSEL}
          label="Podcast episodes"
          renderItem={(item) => (
            <div className="flex w-[360px] flex-col gap-6">
              <div className="h-[189px] w-[360px] rounded-sm bg-gradient-to-br from-tint-pink via-white to-tint-lavender" />
              <p className="font-sans text-title-24-tight text-ink">{item.title} support, explained in twenty minutes</p>
            </div>
          )}
        />
      </div>

      <Label>FilterChips – story / tabs / topic / sidebar · SearchInput · LoadMoreButton</Label>
      <div className="mx-auto flex max-w-container flex-col gap-10 px-5">
        <FilterChips variant="story" items={STORY_CHIPS} label="Story category" />
        <FilterChips variant="tabs" items={TABS} label="Blog category" />
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <FilterChips variant="topic" items={TOPICS} label="Topic" />
          <SearchInput />
        </div>
        <div className="w-[300px]">
          <FilterChips variant="sidebar" items={SIDEBAR} label="Category" />
        </div>
        <div className="flex flex-col items-center gap-6">
          <p className="font-sans text-small text-muted">{visible} of 9 shown</p>
          <LoadMoreButton hidden={visible >= 9} onClick={() => setVisible((v) => v + 3)} />
        </div>
      </div>

      <Label>Forms – outline (partner) / soft + FileDropZone (nominate) / DemoForm card / pill row</Label>
      <div className="mx-auto flex max-w-container flex-col gap-16 px-5">
        <div className="max-w-[600px] rounded-card bg-glass-30 px-8 py-10 shadow-glass-form">
          <Form className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row md:gap-3.5">
              <Field skin="outline" name="first" label="First name" placeholder="First name*" required className="flex-1" />
              <Field skin="outline" name="last" label="Last name" placeholder="Last name*" required className="flex-1" />
            </div>
            <Field skin="outline" type="email" name="email" label="Work email" placeholder="Work email*" required />
            <Field skin="outline" type="url" name="site" label="Company website" placeholder="Company website*" required />
            <Field skin="outline" type="textarea" name="msg" label="Message" placeholder="How would you like to partner with us?*" required />
            <SubmitButton variant="outline">Submit</SubmitButton>
          </Form>
        </div>
        <Form className="mx-auto flex w-full max-w-[800px] flex-col gap-[28.98px] md:p-[28.98px]">
          <div className="flex flex-col gap-[28.98px] md:flex-row md:gap-[14.49px]">
            <Field skin="soft" name="n" label="Your name" placeholder="Jane Smith" required className="flex-1" />
            <Field skin="soft" type="email" name="e" label="Email" placeholder="jane@company.com" required className="flex-1" />
          </div>
          <Field skin="soft" type="url" name="d" label="Company domain" placeholder="company.com" required />
          <Field skin="soft" type="textarea" name="w" label="What happened?" placeholder="Tell us about the support experience" />
          <div className="flex flex-col gap-[14.49px]">
            <p className={`text-ink ${H4_SCALE}`}>Upload</p>
            <FileDropZone />
          </div>
          <SubmitButton variant="block">Send nomination</SubmitButton>
        </Form>
        <div className="max-w-[519px]">
          <DemoForm card title="See Kestrel on your own tickets" nameRow />
        </div>
        <Form className="flex max-w-[442px] gap-2">
          <Field skin="pill" type="email" name="callEmail" label="Email" placeholder="Work email" required className="flex-1" />
          <SubmitButton variant="pill">Book call</SubmitButton>
        </Form>
      </div>

      <Label>EmployeeCard – horizontal / vertical / tints</Label>
      <div className="mx-auto flex max-w-[1360px] flex-col gap-4 px-6 lg:flex-row lg:px-0">
        {EMPLOYEES.map((e) => (
          <EmployeeCard key={e.name} {...e} className="hidden md:flex lg:flex-1" />
        ))}
        {EMPLOYEES.map((e) => (
          <EmployeeCard key={`${e.name}-v`} {...e} layout="vertical" className="w-full max-w-[342px] md:hidden" />
        ))}
      </div>
      <div className="mx-auto mt-4 hidden max-w-[1360px] grid-cols-3 gap-4 md:grid">
        {['peach', 'grey', 'lavender'].map((t) => (
          <EmployeeCard key={t} {...EMPLOYEES[0]} tint={t} layout="vertical" />
        ))}
      </div>

      <Label>LogoMarquee – card 1200 / plain tickers ±30 px/s · LogoWall</Label>
      <div className="flex flex-col items-center gap-8 px-5">
        <LogoMarquee width={1200} speed={50} />
        <div className="flex w-full flex-col gap-9">
          <LogoMarquee card={false} height={20} speed={30} />
          <LogoMarquee card={false} height={20} speed={30} direction="right" />
        </div>
      </div>
      <LogoWall heading="Trusted by support leaders at fast-growing companies" />
    </div>
  )
}
