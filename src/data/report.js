// Research report landing – SPEC_PAGES_B T9 (ReportPage). Fictional report "The Handoff Gap" by Kestrel.
// All survey figures are invented, round illustrative numbers. Story rail items link to the fictional stories.

export const report = {
  hero: {
    title: 'Most AI handoffs lose the thread. The good ones are invisible.',
    lede: 'We followed 1,200 support conversations that started with an AI agent and ended with a person. Where context travelled with the ticket, customers barely noticed the switch. Where it did not, they repeated themselves and left unhappy. This report shows what separates the two and how to close the gap.',
    cardTitle: 'Read the report',
    facts: [
      { value: '1,200', label: 'conversations traced' },
      { value: '4', label: 'industries compared' },
      { value: '35%', label: 'ended with a person' },
    ],
    method:
      'Method: invented sample of escalated conversations from four fictional companies, reviewed by two raters per ticket. Illustrative figures for this placeholder page.',
    cta: 'Read the report',
    learnLabel: 'What you will learn',
    learn: [
      'Which pieces of context matter most when a conversation changes hands',
      'How much time a clean handoff saves the person who picks it up',
      'Why customers forgive a handoff but not having to start over',
      'Which escalation rules cut repeat contacts without adding queue time',
    ],
  },
  trustLabel: 'In use at lenders, clinics, energy suppliers and software firms',
  findings: {
    title: 'The handoff, not the AI, decides how it ends.',
    items: [
      { stat: '3x', caption: 'more likely to rate the experience poorly when they had to repeat details the AI agent already collected.', chart: { type: 'bars', values: [45, 15] } },
      { stat: '40%', caption: 'shorter handling time for the person picking up a ticket when it arrived with a summary and the steps already tried.', chart: { type: 'donut', value: 40 } },
      { stat: '1 in 4', caption: 'escalations happened because a rule fired too early, not because the AI agent was stuck. Tuning those rules was the quickest win.', chart: { type: 'donut', value: 25 } },
    ],
  },
  quote: {
    text: 'Once the summary landed with the ticket, our team stopped opening every escalation with an apology.',
    attribution: 'Priya Okafor, Head of Support Operations, Brindle Health',
  },
  contents: {
    title: 'What is inside',
    lede: 'Nine short sections, the three main findings up front. Two worked examples. Practical, no filler.',
    cta: 'Read the report',
    items: [
      'Summary: the three findings at a glance',
      'Method: how we traced each conversation',
      'Lost context: what customers had to repeat, and why',
      'Pick-up time: the cost of a cold handoff',
      'Early exits: escalation rules that fire too soon',
      'Tone: how the AI agent announces a handoff',
      'Queues: keeping wait time flat while escalating less',
      'In practice: two worked examples',
      'What to do next: a checklist for handoff design',
    ],
  },
  stories: {
    title: 'Customers love us',
    sub: 'Teams choose Kestrel for quality, control and the confidence to automate.',
    items: [
      { slug: 'coinwell-card-disputes', theme: 'pink', logo: { name: 'Coinwell', shape: 'circle' }, title: 'How Coinwell resolves card disputes in minutes', company: 'Coinwell', photo: '/assets/photos/story-5.webp' },
      { slug: 'brindle-health-after-hours', theme: 'red', logo: { name: 'Brindle', shape: 'plus' }, title: 'How Brindle Health answers patients after hours', company: 'Brindle Health', photo: '/assets/photos/story-1.webp' },
      { slug: 'ledgerly-handles-tax-season', theme: 'pink', logo: { name: 'Ledgerly', shape: 'bars' }, title: 'How Ledgerly chases missing tax documents automatically', company: 'Ledgerly', photo: '/assets/photos/story-2.webp' },
    ],
  },
}
