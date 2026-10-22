// Customer stories – SPEC_PAGES_B T1 (StorySummary) + T2 (StoryDetail). Fictional Kestrel customers; all copy,
// people, numbers and logos are placeholders (figures are round, illustrative values). Photos: stock portraits in
// public/assets/photos (IMAGE_CREDITS.md). Logos: PlaceholderLogo entries `{ name, shape }`, tinted per theme.
//
// Index order drives the card layouts (T1 "All" list: featured / wide / quote, alternating image side).
// Quote cards are not links (T1 Quote) and live in `storyQuotes`; `storyIndex` interleaves both.

/** @typedef {'pink'|'yellow'|'red'|'green'} StoryTheme */

export const STORY_CATEGORIES = [
  { id: 'all', label: 'All', theme: 'neutral', glyph: 'stack' },
  { id: 'finance', label: 'Finance', theme: 'pink', glyph: 'coin' },
  { id: 'health', label: 'Health', theme: 'red', glyph: 'cross' },
  { id: 'energy', label: 'Energy', theme: 'green', glyph: 'bolt' },
  { id: 'saas', label: 'Complex SaaS', theme: 'yellow', glyph: 'dot' },
]

export const stories = [
  {
    slug: 'ledgerly-handles-tax-season',
    theme: 'pink',
    category: 'finance',
    layout: 'featured',
    imageSide: 'right',
    cardTitle: 'How Ledgerly handles four times the tax-season volume with the same team',
    person: { name: 'Nadia Okonkwo', role: 'Head of Support Operations' },
    logo: { name: 'Ledgerly', shape: 'bars' },
    cardImage: '/assets/photos/story-2.webp',
    hero: {
      variant: 'quote',
      quote:
        'Kestrel turned our busiest weeks into ordinary ones. It answers the tricky account questions with the same care our best people would, it knows when to hand over, and our customers get a clear answer in minutes instead of waiting a day. Our team finally has time to work on the cases that really need a human.',
    },
    facts: { company: 'Ledgerly', industry: 'Finance', size: 'Scale-up' },
    sections: [
      {
        id: 'the-challenge',
        navLabel: 'The challenge',
        heading: 'The challenge',
        body: [
          'Ledgerly helps freelancers and small businesses keep their books tidy across several countries. Every spring, tax deadlines pushed ticket volume to roughly four times its normal level, and most of those conversations were not simple. Customers wanted to know why a transaction had been categorised a certain way, how a currency conversion was calculated, or what a specific form field meant for their situation.',
          'The support team had a thorough help centre, but customers rarely found the right article under pressure. Response times stretched from minutes to most of a day, and the team spent each season hiring temporary staff who needed weeks of training before they could answer anything beyond the basics.',
        ],
        media: { type: 'image', src: '/assets/photos/hero-center.webp', alt: 'Support specialist on a call at her desk' },
      },
      {
        id: 'the-solution',
        navLabel: 'The solution',
        heading: 'The solution',
        body: [
          'Ledgerly connected Kestrel to its helpdesk and knowledge base in a single afternoon. Rather than scripting every answer, the team wrote short workflows for the processes that mattered most: explaining categorisation rules, walking customers through exports, and checking refund eligibility against account history.',
          'Within the first week Kestrel was resolving the bulk of routine tax questions end to end. When a conversation needed judgement, it passed the case to a specialist with a summary of what had already been tried, so nobody had to start again.',
        ],
        media: {
          type: 'imageStat',
          text: '80% faster first replies. A calmer tax season.',
          rows: [
            ['', 'Before', 'After'],
            ['First reply', '~6 hrs', '< 5 min'],
            ['Coverage', 'Office hours', '24/7'],
            ['Seasonal hires', '10', '0'],
          ],
        },
      },
      {
        id: 'the-result',
        navLabel: 'The result',
        heading: 'The result',
        body: [
          'First-reply times dropped from hours to minutes during the busiest month of the year, and the team handled the spike without a single temporary hire. Specialists now spend their time on complex cases and on improving the workflows Kestrel follows, which in turn lifts the quality of every automated answer.',
        ],
      },
    ],
    related: ['brindle-health-after-hours', 'voltway-outage-updates', 'stackhouse-onboarding-workflows'],
  },
  {
    slug: 'brindle-health-after-hours',
    theme: 'red',
    category: 'health',
    layout: 'featured',
    imageSide: 'left',
    cardTitle: 'How Brindle Health keeps patients answered after the clinic closes',
    person: { name: 'Tomasz Varga', role: 'Director of Patient Services' },
    logo: { name: 'Brindle', shape: 'plus' },
    cardImage: '/assets/photos/story-1.webp',
    hero: {
      variant: 'split',
      quote:
        'Patients write to us at midnight because that is when they worry. Kestrel gives them a careful, accurate answer straight away and knows exactly when a nurse needs to step in.',
      image: '/assets/photos/proof-portrait-1.webp',
    },
    facts: { company: 'Brindle Health', industry: 'Health', size: 'Mid-market' },
    sections: [
      {
        id: 'the-challenge',
        navLabel: 'The challenge',
        heading: 'The challenge',
        body: [
          'Brindle Health runs a network of community clinics. Most patient messages arrive in the evening, long after reception desks have closed: questions about appointment preparation, prescriptions waiting for collection, and invoices that did not look quite right.',
          'Those messages waited until morning, which meant anxious patients and a daily backlog that took the first two hours of every shift to clear.',
        ],
        media: { type: 'illustration', left: { name: 'Helpdock', shape: 'square' }, right: { name: 'Caremap', shape: 'ring' } },
      },
      {
        id: 'the-approach',
        navLabel: 'The approach',
        heading: 'The approach',
        body: [
          'The team started with three workflows: appointment preparation, prescription status and billing questions. Each one checks the patient record before answering and follows clear clinical guardrails. Anything that looks like a symptom question goes straight to a nurse with the context attached.',
          'Kestrel was set up to match Brindle\'s tone of voice: warm, plain and never rushed. The team reviewed a sample of conversations every day for the first month and adjusted the guidance as they went.',
        ],
        media: {
          type: 'quote',
          text: '"Our nurses used to start every morning digging through a pile of overnight messages. Now they start with the handful that genuinely need them, already summarised and ready to act on."',
          name: 'Elif Brandt',
          role: 'Lead Nurse, Brindle Health',
        },
      },
      {
        id: 'the-outcome',
        navLabel: 'The outcome',
        heading: 'The outcome',
        body: [
          'Around seven in ten overnight conversations are now resolved before the clinics open. The morning backlog has all but disappeared, and patient satisfaction with after-hours support rose by roughly 20 points in the first quarter.',
        ],
        media: { type: 'image', src: '/assets/photos/hero-br.webp', alt: 'Two people talking across a cafe table' },
      },
    ],
    related: ['ledgerly-handles-tax-season', 'mendwell-billing-clarity', 'halden-power-moving-home'],
  },
  {
    slug: 'voltway-outage-updates',
    theme: 'green',
    category: 'energy',
    layout: 'wide',
    imageSide: 'right',
    cardTitle: 'How Voltway Energy turned outage nights into a calm, two-minute conversation',
    person: { name: 'Rhys Calder', role: 'Customer Care Manager' },
    logo: { name: 'Voltway', shape: 'triangle' },
    cardImage: '/assets/photos/story-4.webp',
    hero: {
      variant: 'quote',
      quote:
        'When the power goes out, every customer gets in touch at once. Kestrel checks their address against the live outage map, tells them what we know and when to expect an update, and books a callback if anything looks unusual. Our team stays focused on the people who really need help.',
    },
    facts: { company: 'Voltway Energy', industry: 'Energy', size: 'Enterprise' },
    sections: [
      {
        id: 'the-challenge',
        navLabel: 'The challenge',
        heading: 'The challenge',
        body: [
          'Voltway supplies electricity to households across a wide rural region. A single storm could produce thousands of contacts within an hour, most of them asking the same thing: is my street affected, and when will it be back?',
          'Answering each one by hand meant long queues exactly when customers were most stressed, and vulnerable customers who needed priority help were stuck in the same line as everyone else.',
        ],
      },
      {
        id: 'the-solution',
        navLabel: 'The solution',
        heading: 'The solution',
        body: [
          'Kestrel now checks each customer\'s address against the outage feed, explains the current status in plain language and offers a text update when the estimate changes. Customers flagged as priority are recognised immediately and routed to a dedicated team.',
        ],
        media: { type: 'illustration', left: { name: 'Gridline', shape: 'bars' }, right: { name: 'Helpdock', shape: 'square' } },
      },
      {
        id: 'the-result',
        navLabel: 'The result',
        heading: 'The result',
        body: [
          'During the last major storm, nine in ten outage conversations were resolved without waiting for an agent. Average handling time for the rest fell by about half, because every case arrived with the address, outage reference and history already attached.',
        ],
        media: {
          type: 'imageStat',
          text: '90% of storm-night chats resolved instantly.',
          rows: [
            ['', 'Before', 'After'],
            ['Queue at peak', '45 min', '0 min'],
            ['Priority routing', 'Manual', 'Instant'],
            ['Agents on call', '30', '12'],
          ],
        },
      },
    ],
    related: ['halden-power-moving-home', 'ledgerly-handles-tax-season', 'patchwork-admin-requests'],
  },
  {
    slug: 'stackhouse-onboarding-workflows',
    theme: 'yellow',
    category: 'saas',
    layout: 'wide',
    imageSide: 'left',
    cardTitle: 'How Stackhouse lets its product team build support workflows themselves',
    person: { name: 'Ines Moreau', role: 'Head of Product' },
    logo: { name: 'Stackhouse', shape: 'square' },
    cardImage: '/assets/photos/story-3.webp',
    hero: {
      variant: 'split',
      quote:
        'Our product managers write the workflows for the features they ship. Support stops being a separate translation step and becomes part of how we launch.',
      image: '/assets/photos/proof-portrait-2.webp',
    },
    facts: { company: 'Stackhouse', industry: 'Complex SaaS', size: 'Scale-up' },
    sections: [
      {
        id: 'the-challenge',
        navLabel: 'The challenge',
        heading: 'The challenge',
        body: [
          'Stackhouse ships new features every week. Each release created a wave of how-to questions, and the support team was always a few days behind the product, learning each change after customers had already found it.',
        ],
      },
      {
        id: 'the-solution',
        navLabel: 'The solution',
        heading: 'The solution',
        body: [
          'With Kestrel, the product managers who design a feature also write the workflow that supports it. Workflows are plain-language instructions with a few connected actions, so no engineering time is needed. Each one is tested against past conversations before it goes live.',
          'Support leads review every new workflow, but they no longer have to author them from scratch, which removed the bottleneck entirely.',
        ],
        media: { type: 'image', src: '/assets/photos/hero-center.webp', alt: 'Team member working on a laptop' },
      },
      {
        id: 'the-result',
        navLabel: 'The result',
        heading: 'The result',
        body: [
          'New features now launch with support coverage on day one. Ticket volume after releases dropped by roughly a third, and the support team has moved into a quality role, reviewing conversations and improving guidance.',
        ],
      },
    ],
    related: ['patchwork-admin-requests', 'ledgerly-handles-tax-season', 'voltway-outage-updates'],
  },
  {
    slug: 'coinwell-card-disputes',
    theme: 'pink',
    category: 'finance',
    layout: 'featured',
    imageSide: 'right',
    cardTitle: 'How Coinwell resolves card disputes in minutes without cutting corners',
    person: { name: 'Jonah Pell', role: 'VP of Customer Experience' },
    logo: { name: 'Coinwell', shape: 'circle' },
    cardImage: '/assets/photos/story-5.webp',
    hero: {
      variant: 'quote',
      quote:
        'Disputes used to be our slowest, most stressful queue. Kestrel gathers the transaction details, checks eligibility against our policy and opens the case properly the first time. Customers know where they stand within minutes, and our compliance team trusts every step it takes.',
    },
    facts: { company: 'Coinwell', industry: 'Finance', size: 'Enterprise' },
    sections: [
      {
        id: 'the-challenge',
        navLabel: 'The challenge',
        heading: 'The challenge',
        body: [
          'Coinwell offers a debit card and spending account to a large retail customer base. Card disputes required several checks before a case could be opened, and missing information meant many cases bounced back and forth for days.',
        ],
      },
      {
        id: 'the-solution',
        navLabel: 'The solution',
        heading: 'The solution',
        body: [
          'Kestrel asks only the questions each dispute type requires, pulls the transaction directly from the ledger and confirms eligibility before opening the case. Every step is logged for audit, and anything outside policy is escalated with the evidence attached.',
        ],
        media: {
          type: 'quote',
          text: '"The audit trail was the deciding factor for us. We can see exactly what was checked, in what order, and why each decision was made."',
          name: 'Priscilla Andersen',
          role: 'Head of Compliance, Coinwell',
        },
      },
      {
        id: 'the-result',
        navLabel: 'The result',
        heading: 'The result',
        body: [
          'Most disputes are now opened correctly within a single conversation. Back-and-forth for missing information fell by about 70 percent, and customers receive a case reference before they leave the chat.',
        ],
      },
    ],
    related: ['ledgerly-handles-tax-season', 'mendwell-billing-clarity', 'stackhouse-onboarding-workflows'],
  },
  {
    slug: 'mendwell-billing-clarity',
    theme: 'red',
    category: 'health',
    layout: 'wide',
    imageSide: 'left',
    cardTitle: 'How Mendwell Clinics made medical billing questions simple to answer',
    person: { name: 'Grace Whitfield', role: 'Patient Billing Lead' },
    logo: { name: 'Mendwell', shape: 'diamond' },
    cardImage: '/assets/photos/story-6.webp',
    hero: {
      variant: 'split',
      quote:
        'Billing questions are personal and often confusing. Kestrel explains each line clearly, sets up payment plans and never guesses when it is unsure.',
      image: '/assets/photos/story-6.webp',
    },
    facts: { company: 'Mendwell Clinics', industry: 'Health', size: 'Mid-market' },
    sections: [
      {
        id: 'the-challenge',
        navLabel: 'The challenge',
        heading: 'The challenge',
        body: [
          'Mendwell patients often received invoices with several insurance adjustments, and many wrote in simply to understand what they owed and why. Each conversation took a billing specialist ten minutes or more.',
        ],
      },
      {
        id: 'the-solution',
        navLabel: 'The solution',
        heading: 'The solution',
        body: [
          'Kestrel reads the invoice and claim status, explains each adjustment in plain words and offers a payment plan when the patient is eligible. Specialists step in for appeals and anything involving clinical detail.',
        ],
        media: { type: 'illustration', left: { name: 'Claimbase', shape: 'arc' }, right: { name: 'Helpdock', shape: 'square' } },
      },
      {
        id: 'the-result',
        navLabel: 'The result',
        heading: 'The result',
        body: [
          'About six in ten billing conversations now close without a specialist, and payment plan sign-ups doubled because patients can set one up the moment they ask.',
        ],
      },
    ],
    related: ['brindle-health-after-hours', 'coinwell-card-disputes', 'voltway-outage-updates'],
  },
  {
    slug: 'halden-power-moving-home',
    theme: 'green',
    category: 'energy',
    layout: 'featured',
    imageSide: 'left',
    cardTitle: 'How Halden Power made moving home the easiest call of the week',
    person: { name: 'Oskar Lindqvist', role: 'Head of Customer Operations' },
    logo: { name: 'Halden', shape: 'arc' },
    cardImage: '/assets/photos/proof-portrait-2.webp',
    hero: {
      variant: 'split',
      quote:
        'Moving home used to mean three calls and a week of emails. Now customers finish it in one short conversation, final readings included.',
      image: '/assets/photos/hero-tr.webp',
    },
    facts: { company: 'Halden Power', industry: 'Energy', size: 'Enterprise' },
    sections: [
      {
        id: 'the-challenge',
        navLabel: 'The challenge',
        heading: 'The challenge',
        body: [
          'Home moves were Halden\'s most common request and one of the most error-prone. Final meter readings, new addresses and tariff changes were collected across several touchpoints, and small mistakes led to incorrect bills months later.',
        ],
      },
      {
        id: 'the-solution',
        navLabel: 'The solution',
        heading: 'The solution',
        body: [
          'Kestrel now runs the whole move in one conversation: it confirms the move date, takes and validates the final reading, sets up the new address and explains the tariff options. The account is updated directly, with no re-keying.',
        ],
        media: { type: 'image', src: '/assets/photos/hero-br.webp', alt: 'Two people chatting over coffee' },
      },
      {
        id: 'the-result',
        navLabel: 'The result',
        heading: 'The result',
        body: [
          'Move-related billing errors fell sharply, and the average move now takes under five minutes from start to finish.',
        ],
      },
    ],
    related: ['voltway-outage-updates', 'brindle-health-after-hours', 'coinwell-card-disputes'],
  },
  {
    slug: 'patchwork-admin-requests',
    theme: 'yellow',
    category: 'saas',
    layout: 'wide',
    imageSide: 'right',
    cardTitle: 'How Patchwork automated admin requests across thousands of workspaces',
    person: { name: 'Amara Osei', role: 'Support Engineering Lead' },
    logo: { name: 'Patchwork', shape: 'plus' },
    cardImage: '/assets/photos/hero-tr.webp',
    hero: {
      variant: 'quote',
      quote:
        'Seat changes, permission resets and plan questions used to fill our queue. Kestrel handles them safely inside each customer\'s workspace, with the right checks for the right role, so our engineers can focus on genuine product issues.',
    },
    facts: { company: 'Patchwork', industry: 'Complex SaaS', size: 'Scale-up' },
    sections: [
      {
        id: 'the-challenge',
        navLabel: 'The challenge',
        heading: 'The challenge',
        body: [
          'Patchwork serves thousands of team workspaces. Admin requests such as adding seats, resetting permissions or changing plans were simple in principle but required careful identity checks, so each one landed with an engineer.',
        ],
      },
      {
        id: 'the-solution',
        navLabel: 'The solution',
        heading: 'The solution',
        body: [
          'Kestrel verifies the requester\'s role, performs the change through Patchwork\'s admin API and confirms the result. Requests from non-admins are politely redirected to the workspace owner.',
        ],
        media: {
          type: 'imageStat',
          text: '3x more admin requests closed same-day.',
          rows: [
            ['', 'Before', 'After'],
            ['Seat changes', '1 day', '2 min'],
            ['Role checks', 'Manual', 'Automatic'],
            ['Escalations', '40%', '8%'],
          ],
        },
      },
      {
        id: 'the-result',
        navLabel: 'The result',
        heading: 'The result',
        body: [
          'Same-day resolution for admin requests tripled, and engineers reclaimed roughly a day a week for product work.',
        ],
      },
    ],
    related: ['stackhouse-onboarding-workflows', 'coinwell-card-disputes', 'halden-power-moving-home'],
  },
]

// T1 Quote cards (not links)
export const storyQuotes = [
  {
    id: 'quote-ledgerly',
    theme: 'pink',
    category: 'finance',
    layout: 'quote',
    quote:
      '“We expected Kestrel to deflect simple questions. We did not expect it to handle our most detailed account queries with more patience than any script we ever wrote.”',
    person: { name: 'Nadia Okonkwo', role: 'Head of Support Operations, Ledgerly' },
  },
  {
    id: 'quote-stackhouse',
    theme: 'yellow',
    category: 'saas',
    layout: 'quote',
    quote:
      '“Launch day used to mean a flooded inbox. Now our support coverage ships with the feature, and customers barely notice there was ever a learning curve.”',
    person: { name: 'Ines Moreau', role: 'Head of Product, Stackhouse' },
  },
]

// T1 "All" order: F-R, F-L, W-R, W-L, Q, F-R, W-L, Q, F-L, W-R
export const storyIndex = [
  'ledgerly-handles-tax-season',
  'brindle-health-after-hours',
  'voltway-outage-updates',
  'stackhouse-onboarding-workflows',
  'quote-ledgerly',
  'coinwell-card-disputes',
  'mendwell-billing-clarity',
  'quote-stackhouse',
  'halden-power-moving-home',
  'patchwork-admin-requests',
].map((key) => stories.find((s) => s.slug === key) || storyQuotes.find((q) => q.id === key))

export const getStory = (slug) => stories.find((s) => s.slug === slug)
