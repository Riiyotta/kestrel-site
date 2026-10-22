// /pricing (SPEC_PAGES_A T5) content. Shapes mirror the primitives that render them:
//   plans          -> PricingCard props (T5.2 P6)
//   compareColumns -> CompareColumn[] (columns[0] = label column), compareGroups -> CompareGroup[] (T5.3)
//   faq            -> FaqItem[] (T5.4 P7, 9 items)
// Copy is original placeholder text for the fictional "Kestrel". Kestrel's own model: a monthly subscription that
// includes a pool of resolved conversations, a flat overage rate past the pool, and voice billed per connected
// minute. Plan names, prices and tier boundaries are invented.

/** @typedef {import('./types.js').CompareColumn} CompareColumn */
/** @typedef {import('./types.js').CompareGroup} CompareGroup */
/** @typedef {import('./types.js').FaqItem} FaqItem */

export const pricingPage = {
  title: 'Pricing',
  // ≈372 chars, 7 lines in 517 @1440
  statement:
    'Kestrel is a monthly subscription with a pool of resolved conversations built in. Hover is $690 a month for 1,000 resolutions, Soar is $3,250 a month for 6,000. Past the pool, each extra resolution is one flat rate and voice is billed per connected minute. Hand-offs and unresolved cases never count, and every plan begins with a free 14-day pilot on your tickets.',
  footnote: '*Voice minutes run from pickup to hang-up and are rounded up once per call.',
  machineLink: { label: 'Download this price list as a plain-text file', href: '/pricing.md' },
}

export const plans = [
  {
    name: 'Hover',
    price: '$690',
    per: '/mo',
    note: 'Billed monthly, in USD',
    cta: { label: 'Start free pilot', href: '#' },
    bestFor: 'Best for small teams resolving up to 2,500 conversations a month.',
    groups: [
      { label: 'In your monthly pool', rows: [{ label: 'Resolved conversations', value: '1,000' }] },
      {
        label: 'Past the pool',
        rows: [
          { label: 'Each extra text resolution', value: '$0.62' },
          { label: 'Voice, per connected minute*', value: '$0.11' },
        ],
      },
      { label: 'Never billed', rows: [{ label: 'Hand-offs and unresolved cases', value: 'Free' }] },
    ],
  },
  {
    name: 'Soar',
    price: '$3,250',
    per: '/mo',
    note: 'Billed monthly, in USD',
    cta: { label: 'Get a demo', href: '/get-a-demo' },
    bestFor: 'Best for busy teams resolving 2,500 to 12,000 conversations a month.',
    groups: [
      { label: 'In your monthly pool', rows: [{ label: 'Resolved conversations', value: '6,000' }] },
      {
        label: 'Past the pool',
        rows: [
          { label: 'Each extra text resolution', value: '$0.48' },
          { label: 'Voice, per connected minute*', value: '$0.08' },
        ],
      },
      { label: 'Never billed', rows: [{ label: 'Hand-offs and unresolved cases', value: 'Free' }] },
    ],
  },
  {
    name: 'Aerie',
    price: 'Custom',
    per: '',
    note: 'Annual agreement, in USD',
    cta: { label: 'Get a demo', href: '/get-a-demo' },
    bestFor: 'Best for multi-brand groups above 12,000 a month or with strict hosting.',
    groups: [
      { label: 'In your monthly pool', rows: [{ label: 'Resolved conversations', value: 'Custom' }] },
      {
        label: 'Past the pool',
        rows: [
          { label: 'Each extra text resolution', value: 'Custom' },
          { label: 'Voice, per connected minute*', value: 'Custom' },
        ],
      },
      { label: 'Never billed', rows: [{ label: 'Hand-offs and unresolved cases', value: 'Free' }] },
    ],
  },
]

/** @type {CompareColumn[]} */
export const compareColumns = [
  { key: 'feature', label: 'Compare features' },
  { key: 'hover', label: 'Hover', price: '$690', per: '/mo', cta: { label: 'Start free pilot', href: '#' } },
  { key: 'soar', label: 'Soar', price: '$3,250', per: '/mo', cta: { label: 'Get a demo', href: '/get-a-demo' } },
  { key: 'aerie', label: 'Aerie', price: 'Custom', cta: { label: 'Get a demo', href: '/get-a-demo' } },
]

/** @type {CompareGroup[]} 7 bands, the first starts open (T5.3). */
export const compareGroups = [
  {
    label: 'Subscription and launch help',
    open: true,
    rows: [
      { label: 'Monthly pool', values: ['1,000', '6,000', { text: 'Sized to volume', align: 'right' }] },
      {
        label: 'Launch help',
        href: '#',
        values: [
          { text: 'Two guided setup calls', value: 'Included' },
          { text: 'Named launch engineer', value: 'Included' },
          { text: 'Dedicated launch squad', value: 'From $9K', note: 'One-off fee, set by systems and channel count' },
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
      { label: 'Custom API actions', values: ['Up to 15', 'Up to 60', 'Unlimited'] },
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
      { label: 'Sandbox replays', values: ['500 a month', '4,000 a month', 'Unlimited'] },
      { label: 'Reviewer approval mode', values: [true, true, true] },
      { label: 'Automated quality scoring', values: [true, true, true] },
    ],
  },
  {
    label: 'Security and privacy',
    rows: [
      { label: 'Single sign-on', values: [false, true, true] },
      { label: 'Data redaction', values: [true, true, true] },
      { label: 'Audit log export', values: [false, true, true] },
    ],
  },
  {
    label: 'Data location',
    rows: [
      { label: 'Regional hosting', values: ['EU', 'EU or US', 'Your choice'] },
      { label: 'Retention controls', values: [true, true, true] },
    ],
  },
  {
    label: 'Contract terms',
    rows: [
      { label: 'Billing cycle', values: ['Monthly', 'Monthly', 'Annual'] },
      { label: 'Unused pool rolls over', values: [false, true, true] },
    ],
  },
]

/** @type {FaqItem[]} 9 items (both live screenshots show 9; the spec text says 10), questions ≈18–90 chars, answers ≈120–400 chars. */
export const faq = [
  {
    q: 'What is a resolution?',
    a: 'A conversation counts once the customer’s request is complete and they have not come back about it within 72 hours. If they return, or the case is handed to a person, it comes off your pool automatically.',
  },
  {
    q: 'What happens when we use up the pool?',
    a: 'Nothing stops. Each extra text resolution is billed at your plan’s flat rate, and we email you when you pass 80% of the pool so you can move up a plan if that works out cheaper.',
  },
  {
    q: 'How is a voice minute measured?',
    a: 'From the moment Kestrel picks up to the moment either side hangs up, rounded up to the next whole minute once per call. Time on hold in your own queue after a transfer is never counted.',
  },
  {
    q: 'Do sandbox replays count toward the pool?',
    a: 'No. Replays, test runs and anything Kestrel does during the free 14-day pilot sit outside the pool, so you can test as much as you like before and after launch.',
  },
  {
    q: 'Can we change plans partway through?',
    a: 'Yes. Moving up takes effect the same day and the new pool is prorated. Moving down applies from your next billing month, so you never lose conversations you already paid for.',
  },
  {
    q: 'Do unused conversations roll over?',
    a: 'On Soar and Aerie, up to half of an unused pool carries into the following month. On Hover the pool resets each month, which keeps the entry price low.',
  },
  {
    q: 'Are there setup or onboarding fees?',
    a: 'Not on Hover or Soar: guided setup calls and a named launch engineer are part of the subscription. Aerie customers can add a dedicated launch squad for complex rollouts, quoted once up front.',
  },
  {
    q: 'Is there a cheaper way in for a nonprofit or a team with only a few hundred requests?',
    a: 'Yes. Registered nonprofits get 25% off Hover, and teams under 300 conversations a month can ask about a starter pool. Both include the same security terms as every other plan.',
  },
  {
    q: 'How do we pay, which currencies can we use, and can we pay quarterly?',
    a: 'By card or bank transfer, invoiced in USD by default. EUR and GBP invoicing is available on Soar and Aerie, and annual Aerie agreements can be paid quarterly.',
  },
]
