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
    cardTitle: 'How Ledgerly chases missing tax documents so its accountants do not have to',
    person: { name: 'Nadia Okonkwo', role: 'Head of Support Operations' },
    logo: { name: 'Ledgerly', shape: 'bars' },
    cardImage: '/assets/photos/story-2.webp',
    hero: {
      variant: 'quote',
      quote:
        'Our accountants used to spend March on the phone asking for receipts. Now Kestrel does the asking, checks what comes back against each client’s list, and only books a call when something is genuinely unclear. The accountants spend the month doing accounting, and our clients say the reminders feel helpful rather than nagging.',
    },
    facts: { company: 'Ledgerly', industry: 'Finance', size: 'Scale-up' },
    sections: [
      {
        id: 'the-challenge',
        navLabel: 'The challenge',
        heading: 'The challenge',
        body: [
          'Ledgerly prepares annual returns for around eleven thousand sole traders and small partnerships. The work itself was predictable; the bottleneck was paperwork. Each return needed a dozen or more documents, from mileage logs to pension statements, and in a typical year a third of clients were still missing at least one item a fortnight before the filing deadline.',
          'Chasing fell to the accountants themselves. They sent reminder emails by hand, rang clients who did not reply, and opened every upload to check it was the right year and the right form. Senior staff estimated that close to a quarter of their March hours went on collecting documents rather than reviewing them.',
        ],
        media: { type: 'image', src: '/assets/photos/hero-center.webp', alt: 'Support specialist on a call at her desk' },
      },
      {
        id: 'the-solution',
        navLabel: 'The solution',
        heading: 'The solution',
        body: [
          'Ledgerly gave Kestrel read access to each client’s document checklist and write access to its reminder schedule. The team wrote three playbooks: ask for a missing item by text or email in the client’s preferred channel, check each upload for the right tax year and form type, and offer a call slot with the assigned accountant when a client is stuck.',
          'The playbooks ran in shadow mode for two weeks in January, with accountants approving each outgoing message. By February they were live, and anything Kestrel could not classify, such as a handwritten letter, went to a person with a note on what was expected.',
        ],
        media: {
          type: 'imageStat',
          text: 'Complete files a week earlier. Quieter Marches.',
          rows: [
            ['', 'Before', 'After'],
            ['Files complete by D-14', '67%', '91%'],
            ['Reminders sent by', 'Accountants', 'Kestrel'],
            ['Chasing calls / week', '~340', '~40'],
          ],
        },
      },
      {
        id: 'the-result',
        navLabel: 'The result',
        heading: 'The result',
        body: [
          'Nine in ten client files were complete two weeks before the deadline, up from two in three the year before. Accountants made a fraction of the chasing calls they used to and spent the recovered hours on review, and Ledgerly filed its whole book of returns without paying for weekend overtime.',
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
    cardTitle: 'How Stackhouse turns support conversations into a weekly product fix list',
    person: { name: 'Ines Moreau', role: 'Head of Product' },
    logo: { name: 'Stackhouse', shape: 'square' },
    cardImage: '/assets/photos/story-3.webp',
    hero: {
      variant: 'split',
      quote:
        'Every Monday our product managers get the five things customers found most confusing last week, with real quotes attached. Half our small fixes start there.',
      image: '/assets/photos/proof-portrait-2.webp',
    },
    facts: { company: 'Stackhouse', industry: 'Complex SaaS', size: 'Scale-up' },
    sections: [
      {
        id: 'the-challenge',
        navLabel: 'The challenge',
        heading: 'The challenge',
        body: [
          'Stackhouse ships every week, and support always saw confusion first. But that knowledge reached the product team as anecdotes, weeks late and rarely with numbers attached, so the same screens kept generating the same tickets.',
        ],
      },
      {
        id: 'the-solution',
        navLabel: 'The solution',
        heading: 'The solution',
        body: [
          'Kestrel now tags every conversation with the feature involved and the step where the customer got stuck. A Monday digest groups those tags, ranks them by volume and links the underlying transcripts, so a product manager can read ten real examples in five minutes.',
          'When a fix ships, the matching playbook is retired, which keeps the agent’s instructions short and current.',
        ],
        media: { type: 'image', src: '/assets/photos/hero-center.webp', alt: 'Team member working on a laptop' },
      },
      {
        id: 'the-result',
        navLabel: 'The result',
        heading: 'The result',
        body: [
          'Over two quarters, questions about the ten most confusing screens fell by about half. Support leads now sit in product reviews with data rather than stories, and several fixes shipped within a week of first appearing.',
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
      '“We thought of Kestrel as a support tool. It turned out the most valuable thing it did was follow up, politely and relentlessly, on every missing receipt we used to chase by hand.”',
    person: { name: 'Nadia Okonkwo', role: 'Head of Support Operations, Ledgerly' },
  },
  {
    id: 'quote-stackhouse',
    theme: 'yellow',
    category: 'saas',
    layout: 'quote',
    quote:
      '“The weekly digest is the first thing our product review opens now. It is the closest thing we have to sitting next to customers while they use the product.”',
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
