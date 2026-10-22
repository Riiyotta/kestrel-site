// /pricing (SPEC_PAGES_A T5) content. Shapes mirror the primitives that render them:
//   plans          -> PricingCard props (T5.2 P6)
//   compareColumns -> CompareColumn[] (columns[0] = label column), compareGroups -> CompareGroup[] (T5.3)
//   faq            -> FaqItem[] (T5.4 P7, 9 items)
// Copy is original placeholder text for the fictional "Kestrel"; plan names and prices are invented.

/** @typedef {import('./types.js').CompareColumn} CompareColumn */
/** @typedef {import('./types.js').CompareGroup} CompareGroup */
/** @typedef {import('./types.js').FaqItem} FaqItem */

export const pricingPage = {
  title: 'Pricing',
  // ≈372 chars, 7 lines in 517 @1440
  statement:
    'You pay for outcomes, not seats. Every plan is an annual platform fee plus a small rate for each ticket Kestrel fully resolves: Essentials starts at $1,800 a month and Growth at $4,600 a month, billed yearly. Hand-offs to a person and tickets Kestrel cannot close are never charged, and each plan opens with a 30-day free trial so you can judge the numbers first.',
  footnote: '*Based on a 3 minute average call, a scoping session confirms final rates.',
  machineLink: { label: 'Read these rates as a plain-text pricing file', href: '/pricing.md' },
}

export const plans = [
  {
    name: 'Essentials',
    price: '$1,800',
    per: '/mo',
    note: 'Billed yearly, in USD',
    cta: { label: 'Start free trial', href: '#' },
    bestFor: 'Best for young teams handling fewer than 5,000 tickets each month.',
    groups: [
      { label: 'Sorting', rows: [{ label: 'Routing and intent tagging', value: '$0.25' }] },
      {
        label: 'Resolution',
        rows: [
          { label: 'Chat, email and SMS (both ways)', value: '$0.85' },
          { label: 'Voice, inbound or outbound*', value: '$1.35' },
        ],
      },
      { label: 'Review', rows: [{ label: 'Automated quality review', value: '$0.25' }] },
    ],
  },
  {
    name: 'Growth',
    price: '$4,600',
    per: '/mo',
    note: 'Billed yearly, in USD',
    cta: { label: 'Get a demo', href: '/get-a-demo' },
    bestFor: 'Best for scaling teams handling 5,000 to 20,000 tickets every month.',
    groups: [
      { label: 'Sorting', rows: [{ label: 'Routing and intent tagging', value: '$0.22' }] },
      {
        label: 'Resolution',
        rows: [
          { label: 'Chat, email and SMS (both ways)', value: '$0.78' },
          { label: 'Voice, inbound or outbound*', value: '$1.10' },
        ],
      },
      { label: 'Review', rows: [{ label: 'Automated quality review', value: '$0.22' }] },
    ],
  },
  {
    name: 'Tailored',
    price: 'Custom',
    per: '',
    note: 'Billed yearly, in USD',
    cta: { label: 'Get a demo', href: '/get-a-demo' },
    bestFor: 'Best for large operations above 20K tickets a month or with bespoke needs.',
    groups: [
      { label: 'Sorting', rows: [{ label: 'Routing and intent tagging', value: 'Custom' }] },
      {
        label: 'Resolution',
        rows: [
          { label: 'Chat, email and SMS (both ways)', value: 'Custom' },
          { label: 'Voice, inbound or outbound*', value: 'Custom' },
        ],
      },
      { label: 'Review', rows: [{ label: 'Automated quality review', value: 'Custom' }] },
    ],
  },
]

/** @type {CompareColumn[]} */
export const compareColumns = [
  { key: 'feature', label: 'Compare features' },
  { key: 'essentials', label: 'Essentials', price: '$1,800', per: '/mo', cta: { label: 'Start free trial', href: '#' } },
  { key: 'growth', label: 'Growth', price: '$4,600', per: '/mo', cta: { label: 'Get a demo', href: '/get-a-demo' } },
  { key: 'tailored', label: 'Tailored', price: 'Custom', cta: { label: 'Get a demo', href: '/get-a-demo' } },
]

/** @type {CompareGroup[]} 7 bands, the first starts open (T5.3). */
export const compareGroups = [
  {
    label: 'Platform and support',
    open: true,
    rows: [
      { label: 'Platform access', values: ['Included', 'Included', { text: '$70K platform fee', align: 'right' }] },
      {
        label: 'Embedded support team',
        href: '#',
        values: [
          { text: 'Core support package', value: 'Included' },
          { text: 'Extended support package', value: 'Included' },
          { text: 'Dedicated support package', value: '$20K+', note: 'Scoped to your systems, workflows and rollout' },
        ],
      },
    ],
  },
  {
    label: 'Channels and connectors',
    rows: [
      { label: 'Chat, email and SMS', values: [true, true, true] },
      { label: 'Voice', values: [true, true, true] },
      { label: 'Helpdesk connectors', values: ['Included', 'Included', 'Included'] },
      { label: 'Custom API actions', values: ['Up to 10', 'Up to 40', 'Unlimited'] },
    ],
  },
  {
    label: 'Agent controls',
    rows: [
      { label: 'Plain-language workflows', values: [true, true, true] },
      { label: 'Tone and policy guardrails', values: [true, true, true] },
      { label: 'Staged topic rollout', values: [false, true, true] },
    ],
  },
  {
    label: 'Testing and review',
    rows: [
      { label: 'Replay past tickets', values: [true, true, true] },
      { label: 'Synthetic scenario runs', values: ['Monthly cap', 'Higher cap', 'Unlimited'] },
      { label: 'Automated quality scoring', values: [true, true, true] },
    ],
  },
  {
    label: 'Security and privacy',
    rows: [
      { label: 'Single sign-on', values: [true, true, true] },
      { label: 'Data redaction', values: [true, true, true] },
      { label: 'Audit log export', values: [false, true, true] },
    ],
  },
  {
    label: 'Data location',
    rows: [
      { label: 'Regional hosting', values: ['US', 'US or EU', 'Your choice'] },
      { label: 'Retention controls', values: [true, true, true] },
    ],
  },
  {
    label: 'Contract terms',
    rows: [
      { label: 'Billing cycle', values: ['Yearly', 'Yearly', 'Yearly'] },
      { label: 'Custom terms', values: [false, false, true] },
    ],
  },
]

/** @type {FaqItem[]} 9 items (both live screenshots show 9; the spec text says 10), questions ≈18–90 chars, answers ≈120–400 chars. */
export const faq = [
  {
    q: 'How do I buy Kestrel?',
    a: 'Start a 30-day free trial or <a href="/get-a-demo">book a demo</a>. After the trial we agree an annual plan together, sign a single order form and keep your trial setup, so nothing has to be rebuilt.',
  },
  {
    q: 'What does Kestrel cost each month?',
    a: 'Essentials is $1,800 a month and Growth is $4,600 a month, both billed yearly, plus a per-ticket rate for resolved work. Tailored plans are priced after a short scoping call.',
  },
  {
    q: 'How does Kestrel keep data secure?',
    a: 'Records are encrypted on the wire and on disk, only named staff can reach production, and every action Kestrel takes leaves an audit entry. Independent audit reports are available under NDA on request.',
  },
  {
    q: 'How is Kestrel set up?',
    a: 'Your team describes how support works in plain language, Kestrel turns that into workflows, and you test them on replayed tickets before anything reaches a customer.',
  },
  {
    q: 'Which tools does Kestrel connect to?',
    a: 'Common helpdesks, CRMs, billing systems and phone platforms are covered by built-in connectors. Anything else with an API or webhooks can be added as a custom action. See the <a href="/integrations">integration library</a>.',
  },
  {
    q: 'Does Kestrel replace our helpdesk or sit inside it?',
    a: 'It sits inside it. Kestrel works in the queue your team already uses, so agents see the same tickets, tags and history they always have.',
  },
  {
    q: 'What return should we expect from Kestrel?',
    a: 'Most teams measure it as cost per resolved ticket against their current blended cost. Because you only pay for resolutions, the comparison is direct, and the trial gives you real numbers before you commit.',
  },
  {
    q: 'Is there a lower-cost option for a small clinic that needs a signed data agreement?',
    a: 'Essentials covers small teams, and a signed data processing agreement is included on every plan at no extra charge.',
  },
  {
    q: 'How long do you keep conversation records, and can we change that?',
    a: 'Retention is a workspace setting you choose, from 30 days to indefinitely. Records can be exported through the API at any time, and a closed account is purged on a timeline shown in your audit log.',
  },
]
