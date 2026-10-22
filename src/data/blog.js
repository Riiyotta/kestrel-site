// Blog ("The Roost") – SPEC_PAGES_B T3 (BlogPostSummary) + T4 (BlogPost). Original placeholder copy for the fictional
// Kestrel; people are fictional. Covers are generated gradient placeholders (`cover.tone`, rendered by BlogCover);
// the in-post video uses the existing teaser still as a poster (no video file).
/** @typedef {import('./types.js').RichTextBlock} RichTextBlock */

export const BLOG_INDEX = {
  title: 'The Roost',
  lede: 'Notes, interviews and product news from the team building Kestrel.',
  railTitle: 'Podcasts',
  browseTitle: 'Browse all',
}

export const BLOG_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'cx', label: 'CX' },
  { id: 'ai-learnings', label: 'AI learnings' },
  { id: 'product-updates', label: 'Product updates' },
  { id: 'company-news', label: 'Company news' },
]

const author = (name, avatar) => ({ name, avatar })

export const blogPosts = [
  {
    slug: 'introducing-kestrel-workflows-studio',
    title: 'Introducing Workflows Studio: build, test and ship support logic in one place',
    date: 'October 14',
    readingMinutes: 6,
    category: 'product-updates',
    cover: { tone: 'indigo' },
    featured: true,
    author: author('Mira Castellanos', '/assets/photos/playbook-avatar-c.webp'),
    body: [
      { type: 'p', html: '<em>Update: Workflows Studio is now available on every Kestrel plan.</em>' },
      {
        type: 'p',
        html: 'Support teams know their processes better than anyone. Until now, turning that knowledge into something an AI agent could follow meant tickets to engineering, long feedback loops and a lot of guesswork. Workflows Studio changes that.',
      },
      { type: 'h2', text: 'Why we built it' },
      {
        type: 'p',
        html: 'In conversations with dozens of support leaders, the same theme kept coming up: the people who understand the policy are rarely the people who can change the automation. We wanted the person who writes the refund policy to be the person who teaches Kestrel how to apply it.',
      },
      { type: 'h3', text: 'Plain language first' },
      {
        type: 'p',
        html: 'Every workflow starts as a short brief written in everyday words. Kestrel turns it into steps, asks clarifying questions where the brief is ambiguous, and shows you exactly which systems it will need to touch.',
      },
      { type: 'video', poster: '/assets/photos/video-teaser-thumb.webp' },
      { type: 'h2', text: 'What you can do today' },
      {
        type: 'ul',
        items: [
          'Draft a workflow from a short description and refine it step by step.',
          'Replay real past conversations against a draft before it goes live.',
          'Connect actions such as refunds, address changes or plan upgrades with role-based guardrails.',
          '<strong>Roll back</strong> any version in one click.',
        ],
      },
      { type: 'h3', text: 'Testing before trust' },
      {
        type: 'p',
        html: 'Simulations replay a sample of historical tickets through the new logic and flag any answer that differs from what your team actually did. You can review each difference before deciding to ship.',
      },
      {
        type: 'blockquote',
        html: 'The first time we replayed a month of tickets in ten minutes, the whole team stopped and stared at the screen.',
        cite: 'Support lead at an early-access customer',
      },
      { type: 'h2', text: 'What comes next' },
      {
        type: 'p',
        html: 'We are working on shared workflow libraries and richer analytics for each step. If you would like early access, <a href="/get-a-demo"><strong>book a walkthrough with our team</strong></a>.',
      },
    ],
    related: ['five-lessons-from-a-year-of-ai-escalations', 'kestrel-opens-london-office'],
  },
  {
    slug: 'five-lessons-from-a-year-of-ai-escalations',
    title: 'Five lessons from a year of watching AI agents hand over to humans',
    date: 'October 7',
    readingMinutes: 5,
    category: 'ai-learnings',
    cover: { tone: 'magenta' },
    author: author('Felix Arendt', '/assets/photos/playbook-avatar-p6r.webp'),
    body: [
      {
        type: 'p',
        html: 'A good handover is invisible to the customer. A bad one feels like starting over. After a year of reviewing escalations, a few patterns stand out.',
      },
      { type: 'h2', text: 'Hand over early, not late' },
      { type: 'p', html: 'The worst escalations happen after an agent has tried three times. Clear exit criteria beat persistence every time.' },
      { type: 'h2', text: 'Summaries are the product' },
      {
        type: 'p',
        html: 'A two-line summary of what has been tried is worth more to the human picking up the case than the full transcript.',
      },
      {
        type: 'ol',
        items: ['State what the customer wants.', 'List what was checked.', 'Say why the agent stopped.'],
      },
      { type: 'h2', text: 'Measure the human side too' },
      { type: 'p', html: 'Track how long humans take after a handover. If it is rising, the summaries are not doing their job.' },
    ],
    related: ['introducing-kestrel-workflows-studio', 'roost-podcast-ep-12-quality-at-scale'],
  },
  {
    slug: 'kestrel-opens-london-office',
    title: 'Kestrel opens a London office to support customers across Europe',
    date: 'September 30',
    readingMinutes: 3,
    category: 'company-news',
    cover: { tone: 'sun' },
    author: author('Ana Ruiz', '/assets/photos/playbook-avatar-p2r.webp'),
    body: [
      {
        type: 'p',
        html: 'We are opening our first European office this autumn. The team will work with customers across the region on onboarding, workflow design and data residency.',
      },
      { type: 'h2', text: 'Closer to our customers' },
      {
        type: 'p',
        html: 'A growing share of Kestrel customers support people in several European languages. Having a team in the same time zone makes onboarding faster and reviews easier to schedule.',
      },
      { type: 'h2', text: 'We are hiring' },
      { type: 'p', html: 'Roles in solutions engineering and customer success are open now. <a href="/careers">See open roles</a>.' },
    ],
    related: ['introducing-kestrel-workflows-studio', 'what-good-cx-looks-like-in-regulated-industries'],
  },
  {
    slug: 'what-good-cx-looks-like-in-regulated-industries',
    title: 'What good customer experience looks like in a regulated industry',
    date: 'September 22',
    readingMinutes: 7,
    category: 'cx',
    cover: { tone: 'mint' },
    author: author('Lena Vogt', '/assets/photos/playbook-avatar-p4l.webp'),
    body: [
      {
        type: 'p',
        html: 'Regulation is often treated as the reason support has to be slow. In practice, the best regulated teams are fast precisely because their rules are clear.',
      },
      { type: 'h2', text: 'Clarity beats caution' },
      { type: 'p', html: 'When every agent knows the exact boundary of what they can do, decisions get made quickly and consistently.' },
      { type: 'h2', text: 'Audit trails as a feature' },
      { type: 'p', html: 'Customers increasingly ask why a decision was made. A clean record of each step helps both compliance and trust.' },
    ],
    related: ['five-lessons-from-a-year-of-ai-escalations', 'kestrel-opens-london-office'],
  },
  {
    slug: 'roost-podcast-ep-12-quality-at-scale',
    title: 'The Roost, episode 12: keeping quality high as volume doubles',
    date: 'September 15',
    readingMinutes: 42,
    category: 'podcast',
    cover: { tone: 'lavender' },
    author: author('Imran Qureshi', '/assets/photos/playbook-avatar-p6l.webp'),
    body: [
      {
        type: 'p',
        html: 'In this episode we talk with a support director about reviewing conversations at scale, choosing what to sample and turning reviews into better guidance.',
      },
      { type: 'h2', text: 'In this episode' },
      {
        type: 'ul',
        items: ['How to choose a review sample that reflects real risk.', 'Why scorecards drift and how to reset them.', 'Making reviews a team habit, not a chore.'],
      },
    ],
    related: ['roost-podcast-ep-11-first-90-days', 'five-lessons-from-a-year-of-ai-escalations'],
  },
  {
    slug: 'roost-podcast-ep-11-first-90-days',
    title: 'The Roost, episode 11: the first 90 days of an AI support rollout',
    date: 'September 1',
    readingMinutes: 38,
    category: 'podcast',
    cover: { tone: 'peach' },
    author: author('Imran Qureshi', '/assets/photos/playbook-avatar-p6l.webp'),
    body: [
      {
        type: 'p',
        html: 'A candid conversation about the first three months of rolling out an AI agent: what to launch first, what to leave for later and how to keep the team on board.',
      },
      { type: 'h2', text: 'In this episode' },
      { type: 'ul', items: ['Picking the first three workflows.', 'Setting expectations with leadership.', 'When to expand coverage.'] },
    ],
    related: ['roost-podcast-ep-12-quality-at-scale', 'roost-podcast-ep-10-voice-support'],
  },
  {
    slug: 'roost-podcast-ep-10-voice-support',
    title: 'The Roost, episode 10: what changes when your AI agent picks up the phone',
    date: 'August 18',
    readingMinutes: 35,
    category: 'podcast',
    cover: { tone: 'indigo' },
    author: author('Imran Qureshi', '/assets/photos/playbook-avatar-p6l.webp'),
    body: [
      {
        type: 'p',
        html: 'Voice brings new constraints: latency, interruptions and the need to confirm details out loud. We discuss what we learned building for the phone.',
      },
      { type: 'h2', text: 'In this episode' },
      { type: 'ul', items: ['Why silence feels longer on a call.', 'Confirming details without sounding robotic.', 'Handing a live call to a human.'] },
    ],
    related: ['roost-podcast-ep-11-first-90-days', 'roost-podcast-ep-09-support-metrics'],
  },
  {
    slug: 'roost-podcast-ep-09-support-metrics',
    title: 'The Roost, episode 9: which support numbers deserve a dashboard',
    date: 'August 4',
    readingMinutes: 40,
    category: 'podcast',
    cover: { tone: 'magenta' },
    author: author('Imran Qureshi', '/assets/photos/playbook-avatar-p6l.webp'),
    body: [
      {
        type: 'p',
        html: 'Resolution rate, reopen rate, effort: which numbers tell you whether customers are actually better off? A practical discussion with two operations leads.',
      },
      { type: 'h2', text: 'In this episode' },
      { type: 'ul', items: ['Why deflection is the wrong goal.', 'Pairing every speed metric with a quality metric.', 'Reporting to leadership.'] },
    ],
    related: ['roost-podcast-ep-10-voice-support', 'what-good-cx-looks-like-in-regulated-industries'],
  },
]

export const getBlogPost = (slug) => blogPosts.find((p) => p.slug === slug)
