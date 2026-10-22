// Competitor index – SPEC_PAGES_B T7 (/competitors). Shape follows the spec's `CompetitorIndex` interface, plus the
// section headings the page needs (`sections`) and a `slug` per comparison table for the (not yet built) detail
// pages at /competitors/:slug (B T8).
// Kestrel is compared with generic CATEGORIES of tools, never with named companies. Original placeholder copy.
// Lengths follow the spec: H1 n≈34 (2 lines), sub n≈146, card titles n≈23, card info n≈160–220, questions n≈50–70,
// row labels n≈10–35, value cells n≈50–125, 5–9 rows per table.

export const competitorIndex = {
  docTitle: 'Kestrel compared | Kestrel',
  hero: {
    title: 'Weighing Kestrel against the alternatives',
    sub: 'Different tools solve different problems. Here Kestrel sits next to each common option, with the questions worth putting to any vendor during a pilot.',
    stripLabel: 'Proudly supporting',
  },
  sections: {
    differences: {
      title: 'Six things we do on purpose',
      sub: 'None of these is unusual on its own. Together they describe how Kestrel is built and sold, and they are the points customers say mattered most once they were live.',
    },
    questions: { title: '10 things to test in a two-week pilot of any AI agent' },
    tables: {
      title: 'How Kestrel compares',
      sub: 'Side-by-side notes on how Kestrel differs from each common category of support automation, from first deployment through to everyday operation.',
    },
  },
  // icon keys are drawn by src/components/company/FeatureCardGrid.jsx (own black glyphs)
  differences: [
    {
      icon: 'target',
      title: 'Live only on evidence',
      body: 'No intent answers customers until it has run in shadow mode and your own agents have approved its drafts at the bar you set. If accuracy slips after launch, it drops back to shadow on its own.',
    },
    {
      icon: 'layers',
      title: 'Actions with hard limits',
      body: 'Every action has an allow-list of fields and an optional cap, such as credits under a set amount. Anything over the cap pauses for a person to approve, right in team chat.',
    },
    {
      icon: 'channels',
      title: 'Answers that cite sources',
      body: 'Each reply links the policy page or record it relied on, and Kestrel flags two sources that disagree, so stale guidance gets fixed once instead of being repeated to customers.',
    },
    {
      icon: 'wrench',
      title: 'Your team holds the pen',
      body: 'Ops leads edit playbooks themselves, every edit is versioned and can be rolled back in a click, and a named launch engineer coaches them for the first ninety days, then steps back.',
    },
    {
      icon: 'shield',
      title: 'Private by default',
      body: 'Personal data is redacted before any model call, EU hosting is the starting point rather than an upgrade, and the full audit log can be exported to your own storage every night.',
    },
    {
      icon: 'globe',
      title: 'Bills you can forecast',
      body: 'A monthly subscription includes a pool of resolved conversations, overage is one flat rate, and voice is billed per connected minute. Hand-offs and unresolved cases never count.',
    },
  ],
  questions: [
    { q: '1. Give it last month’s ten hardest tickets. How many does it finish?', a: 'Pick cases your senior agents still remember. Count only the ones it closed correctly, not the ones it answered politely.' },
    { q: '2. Change one policy mid-pilot. How fast does behaviour follow?', a: 'Lower a refund limit on day five and time how long it takes before every channel applies the new rule.' },
    { q: '3. Ask it for something it should refuse. Does it refuse cleanly?', a: 'Try out-of-scope advice, a request for another customer’s data and a promise it has no authority to make.' },
    { q: '4. Switch off a system it relies on. What does the customer hear?', a: 'Disable one API for an hour, then read the transcripts. Silence and invented answers are both failures.' },
    { q: '5. Can your own ops lead fix a wrong answer without the vendor?', a: 'Ask someone on your team to trace one bad reply to its cause and correct it unaided, then time it.' },
    { q: '6. Does the hand-off note actually save your agents time?', a: 'Time a person picking up five escalated cases with the note attached, then five without it.' },
    { q: '7. What did the pilot cost per correctly finished case?', a: 'Divide the pilot invoice by the cases closed correctly and set it against your current cost per contact.' },
    { q: '8. Can you export every transcript and log on the last day?', a: 'Request the full export before the pilot ends and check that it opens cleanly in your own tools.' },
    { q: '9. Do the vendor’s dashboard numbers match your own sample?', a: 'Score fifty conversations by hand and compare. A gap of more than a few points needs an explanation.' },
    { q: '10. What exactly happens in week three if the pilot works?', a: 'Get the rollout plan, the named people and the price for full volume in writing before the pilot closes.' },
  ],
  tables: [
    {
      slug: 'kestrel-vs-legacy-chatbots',
      against: 'Legacy chatbots',
      rows: [
        { label: 'How it works', us: 'Reads the request, checks the record and carries out the allowed actions', them: 'A menu of buttons that ends at an article, a form or a queue' },
        { label: 'Checking its work', us: 'Agents approve drafts in shadow mode, then every live reply is scored', them: 'Counts how many chats ended without a transfer' },
        { label: 'Who edits it', us: 'Your ops lead rewrites a numbered step and replays it before release', them: 'A specialist redraws branches in a flow builder for each new question' },
        { label: 'Hard cases', us: 'Pauses for approval above a limit and passes a summary on hand-off', them: 'Anything off-script drops into the human queue' },
        { label: 'First live traffic', us: 'Usually week two or three, once the first intent clears shadow mode', them: 'Quick for the first flow, slower with every one after' },
        { label: 'How you pay', us: 'Monthly pool of resolved conversations', them: 'Usually per seat or per session' },
        { label: 'Good choice for', us: 'Queues where most requests need a record changed, not just explained', them: 'A short, stable list of questions with fixed answers' },
      ],
    },
    {
      slug: 'kestrel-vs-helpdesk-add-ons',
      against: 'Helpdesk add-ons',
      rows: [
        { label: 'How it works', us: 'Works tickets in your helpdesk and acts in billing, orders and core systems', them: 'An assistant that lives inside one vendor’s suite' },
        { label: 'Checking its work', us: 'Every reply cites its source and is scored against your own rubric', them: 'Suite dashboards; detail varies with the plan you are on' },
        { label: 'Who edits it', us: 'Ops leads edit versioned playbooks and roll back in one click', them: 'Triggers, macros and rules that pile up as the suite grows' },
        { label: 'Hard cases', us: 'Capped actions, approvals in team chat and a summary on hand-off', them: 'Steps outside the suite usually fall to a person' },
        { label: 'First live traffic', us: 'After a shadow-mode run on your own queue, typically within three weeks', them: 'Fast if you already own the suite tier that includes it' },
        { label: 'How you pay', us: 'Pool of resolutions, no seat charges', them: 'Add-on fees on top of seats and plan tiers' },
        { label: 'Good choice for', us: 'Teams whose hard cases live outside the helpdesk', them: 'Teams whose whole operation sits in one suite' },
      ],
    },
    {
      slug: 'kestrel-vs-build-your-own',
      against: 'Build your own on an LLM API',
      rows: [
        { label: 'How it works', us: 'A ready-made agent with procedures, actions and guardrails built in', them: 'Whatever your team designs, builds and maintains' },
        { label: 'Checking its work', us: 'Conversation scoring and root-cause analysis included', them: 'Evaluation tooling has to be built and staffed in-house' },
        { label: 'Who edits it', us: 'Ops teams own changes, with engineers on hand from Kestrel', them: 'Changes queue behind your own engineering roadmap' },
        { label: 'Hard cases', us: 'Proven patterns for approvals, retries and hand-offs', them: 'Possible, but every edge case is yours to discover' },
        { label: 'First live traffic', us: 'Weeks, with a dedicated engineer', them: 'Months of build before the first customer conversation' },
        { label: 'How you pay', us: 'One subscription with a pool of resolutions', them: 'Model usage plus the team needed to run and improve it' },
        { label: 'Good choice for', us: 'Teams that want results this quarter without growing an AI platform team', them: 'Companies with spare engineering capacity and a long runway' },
      ],
    },
    {
      slug: 'kestrel-vs-outsourced-bpo',
      against: 'Outsourced BPO',
      rows: [
        { label: 'How it works', us: 'Resolves cases instantly, at any hour, in every channel', them: 'Human agents working to shift patterns and service levels' },
        { label: 'Checking its work', us: 'Every conversation reviewed automatically', them: 'Sampled QA, often a small percentage of contacts' },
        { label: 'Who edits it', us: 'Procedure updates go live the same day', them: 'New guidance needs retraining across sites and shifts' },
        { label: 'Peak demand', us: 'Scales with volume without hiring', them: 'Peaks need forecasting and extra headcount' },
        { label: 'Consistency', us: 'Same procedure applied the same way every time', them: 'Varies by agent tenure, site and time of day' },
        { label: 'How you pay', us: 'Monthly pool of resolutions, so costs follow outcomes', them: 'Per hour or per agent, whatever the result' },
        { label: 'Good choice for', us: 'Teams that want to free people for the hardest cases', them: 'Work that needs a human on every contact' },
      ],
    },
    {
      slug: 'kestrel-vs-phone-trees',
      against: 'Phone trees and IVR',
      rows: [
        { label: 'How it works', us: 'Natural conversation that finishes the task on the call', them: 'Menus that route callers to a queue' },
        { label: 'Customer effort', us: 'Callers explain in their own words, once', them: 'Keypad options and repeated identity checks' },
        { label: 'Who edits it', us: 'Edit the procedure; voice, chat and email pick it up together', them: 'Menu changes need telephony specialists' },
        { label: 'Hard cases', us: 'Looks up records and takes actions mid-call', them: 'Transfers anything beyond a simple balance or status check' },
        { label: 'Reporting', us: 'Full transcripts with outcome and quality scores', them: 'Menu paths and abandonment rates' },
        { label: 'How you pay', us: 'Voice by the connected minute, text from the same pool', them: 'Telephony licences plus per-minute carrier costs' },
        { label: 'Good choice for', us: 'Teams whose callers need things done, not just routed', them: 'High-volume lines with a few simple, stable call reasons' },
      ],
    },
    {
      slug: 'kestrel-vs-single-channel-assistants',
      against: 'Single-channel assistants',
      rows: [
        { label: 'Channels', us: 'Chat, email, voice and messaging on one set of procedures', them: 'One channel, often web chat only' },
        { label: 'Customer memory', us: 'Context follows the customer across channels and days', them: 'Each conversation starts from scratch' },
        { label: 'Checking its work', us: 'One view of quality across every channel', them: 'Separate tools and reports per channel' },
        { label: 'Who edits it', us: 'Change a procedure once and it applies everywhere', them: 'The same change repeated in each tool' },
        { label: 'Hard cases', us: 'Multi-step work that can pause in one channel and finish in another', them: 'Hands off when the customer changes channel' },
        { label: 'How you pay', us: 'One subscription for every channel, voice by the minute', them: 'Priced per channel, so costs add up as channels are added' },
        { label: 'Good choice for', us: 'Teams serving customers wherever they reach out', them: 'Teams with a single, high-volume chat queue' },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------------------------------------------
// Competitor detail – SPEC_PAGES_B T8 (/competitors/:slug), one entry per comparison-table slug above. Shape follows
// the spec's `CompetitorDetail` interface (`them` = a generic CATEGORY with a glyph key drawn by
// src/components/company/Vs.jsx, never a named company). Shared parts (Kestrel's own description, the testimonial
// slideshow, the "trusted by" strip label) are defined once. Lengths: subtitle n≈51 (2 lines), intro n≈450,
// bullets n≈90–140, intro cards n≈390–460, ~13 matrix rows, 3 feature cards (title n≈30, body n≈300), FAQ 6 items
// (question n≈30–55). Original placeholder copy; customers are the fictional companies of stories.js.

const KESTREL_INTRO =
  'Kestrel gives support teams an AI agent that does the work behind a reply, not just the reply. Its agent follows playbooks your operations team writes in plain language, acts in your helpdesk, billing and internal systems, and hands over with full context when judgement is needed. Copilot, test runs, a review queue that scores every conversation and runtime safeguards keep it accurate, and pricing is a monthly pool of resolved conversations.'

const TESTIMONIALS = [
  {
    quote: '“Our onboarding queue used to need three people every Monday. Now one person reviews what the agent did over the weekend.”',
    name: 'Selin Kaya',
    role: 'VP Customer Operations, Stackhouse',
    img: '/assets/photos/story-1.webp',
    tint: 'peach',
  },
  {
    quote: '“Our compliance team signed off in weeks, not quarters, because every action is logged and every rule is written down.”',
    name: 'Ruth Achterberg',
    role: 'Director of Member Care, Coinwell',
    img: '/assets/photos/story-2.webp',
    tint: 'pink',
  },
  {
    quote: '“The agent got better every single week, and we could see exactly why in the review queue.”',
    name: 'Jonah Pereira',
    role: 'Head of Support, Ledgerly',
    img: '/assets/photos/story-4.webp',
    tint: 'green',
  },
]

const SHARED = {
  stripLabel: 'Running in production at lenders, clinics, utilities and software firms',
  trustedBy: 'Coinwell, Ledgerly, Brindle Health and Voltway Energy.',
  intro: { us: KESTREL_INTRO },
  tableSub: 'How the two approaches differ',
  testimonials: { title: 'What customers say', sub: 'Notes from support leaders who made the switch', items: TESTIMONIALS },
}

const detail = (d) => ({
  ...d,
  stripLabel: SHARED.stripLabel,
  hero: { differenceLabel: 'Why teams switch:', trustedBy: SHARED.trustedBy, ...d.hero },
  intro: { ...SHARED.intro, ...d.intro },
  tableSub: SHARED.tableSub,
  testimonials: SHARED.testimonials,
})

export const competitorDetails = [
  detail({
    slug: 'kestrel-vs-legacy-chatbots',
    docTitle: 'Kestrel vs legacy chatbots | Kestrel',
    them: { name: 'Legacy bots', singular: 'legacy chatbot', icon: 'tree' },
    hero: {
      subtitle: 'Swap the decision tree for an agent that finishes cases',
      intro:
        'Rule-based chatbots were built to route and deflect: a customer picks from a menu, reads an article, and anything unexpected falls into the queue. They are quick to start and predictable, which is why many teams still run one. The trouble appears as products grow. Every new question needs a new branch, and every branch needs maintaining. Kestrel replaces the tree with playbooks written in plain language, so the agent can handle requests nobody drew a path for, while staying inside the limits you set.',
      bullets: [
        'Understands free-form requests and asks follow-up questions, instead of forcing customers through fixed menus',
        'Takes actions in your systems, such as refunds and account changes, rather than linking to a help article',
        'Ops teams edit a sentence in a playbook instead of redrawing branches in a flow builder',
        'Every conversation is scored, so you see resolution and quality, not just containment',
      ],
    },
    intro: {
      them: 'A legacy chatbot follows a decision tree designed in a flow builder. Customers choose buttons or type keywords, and the bot matches them to a branch that shows an answer, collects a few details or transfers to a person. It is predictable and cheap to run for a small set of common questions, but it cannot reason about requests outside its branches, and each new scenario must be drawn and maintained by hand as the product changes.',
    },
    matrix: [
      { label: 'Understands free-form questions', us: true, them: false },
      { label: 'Completes multi-step tasks', us: true, them: 'Only pre-built flows' },
      { label: 'Acts in billing and core systems', us: true, them: 'Limited, per integration' },
      { label: 'Chat, email, voice and text', us: true, them: 'Mostly web chat' },
      { label: 'Change behaviour without redrawing flows', us: true, them: false },
      { label: 'Pre-release testing', us: 'Automated test runs', them: 'Manual preview' },
      { label: 'Every conversation quality-scored', us: true, them: false },
      { label: 'Hand-off with summary', us: true, them: 'Transcript only' },
      { label: 'Runtime policy checks', us: true, them: 'Fixed responses only' },
      { label: 'Pricing basis', us: 'Per resolved case', them: 'Per session or seat' },
      { label: 'Named engineer after launch', us: true, them: false },
      { label: 'Typical time to first live flow', us: 'Days', them: 'Days' },
      { label: 'Effort to add a new scenario', us: 'Edit a playbook', them: 'Design a new branch' },
    ],
    features: [
      { icon: 'layers', title: 'No more branch maintenance', body: 'Playbooks describe the outcome and the rules, not every path a customer might take. When a policy changes, you edit one sentence and run a test, instead of hunting through dozens of branches that each quote the old rule in slightly different words.' },
      { icon: 'check', title: 'Resolution, not containment', body: 'A bot can keep a customer inside the chat window without solving anything. Kestrel reports whether the problem was actually fixed, how the customer felt and what the agent changed, so the numbers you share with leadership describe real outcomes for real customers.' },
      { icon: 'bolt', title: 'Keep what already works', body: 'Your existing flows are useful input. Copilot reads them, turns the good parts into playbooks and flags branches that no longer match your policies, so migrating does not mean starting again or losing years of tuning your team already did.' },
    ],
    faq: [
      { q: 'Can we migrate our existing chatbot flows?', a: 'Yes. Copilot reads exported flows and help articles, drafts equivalent playbooks and highlights gaps or contradictions. Your team reviews the drafts and runs test runs before anything replaces the old bot.' },
      { q: 'Is an AI agent less predictable than a decision tree?', a: 'It is more flexible, but not unbounded. Playbooks set the steps and limits, safeguards check every reply, and test runs show you behaviour on hundreds of scenarios before release.' },
      { q: 'Will customers notice the switch?', a: 'Mostly in good ways: fewer menus, fewer dead ends and answers that use their own account details. You can keep quick-reply buttons where they genuinely help.' },
      { q: 'What happens to our containment reporting?', a: 'You get resolution, quality and customer effort reporting instead, which tells you more. Containment can still be shown for comparison during the transition.' },
      { q: 'Can we run both side by side?', a: 'Yes. Many teams route one queue or a share of traffic to Kestrel first and compare results before moving everything across.' },
      { q: 'How long does a typical switch take?', a: 'Simple flows move in days. Flows that change records take two to four weeks, including testing and any security review.' },
    ],
  }),
  detail({
    slug: 'kestrel-vs-helpdesk-add-ons',
    docTitle: 'Kestrel vs helpdesk AI add-ons | Kestrel',
    them: { name: 'Helpdesk AI', singular: 'helpdesk AI add-on', icon: 'inbox' },
    hero: {
      subtitle: 'Your tickets stay put; the agent reaches every other system',
      intro:
        'Most helpdesk suites now sell an AI add-on. It sits close to your tickets, which makes it easy to switch on, and it is often good at drafting replies from your help centre. The limits show up when a case needs something outside the helpdesk: a refund in the billing tool, a change in the core platform, a check in an internal system. Kestrel works inside your existing helpdesk, so agents keep their views and reports, and reaches across every connected system to finish the case.',
      bullets: [
        'Connects to your current ticketing tool, so agents keep their views, queues and reports',
        'Acts in billing, orders, scheduling and internal APIs with scoped, approved permissions',
        'One set of playbooks across chat, email, voice and text, not per-channel configuration',
        'Priced per resolved case, without add-on fees stacked on top of every seat',
      ],
    },
    intro: {
      them: 'A helpdesk AI add-on is an assistant sold as part of a ticketing suite. It typically answers customers from the suite’s knowledge base, suggests or drafts replies for human agents, and applies the suite’s own rules and macros. Because it lives inside one product, set-up can be quick for teams fully standardised on that suite, though actions in other systems usually require custom work or a person.',
    },
    matrix: [
      { label: 'Works inside your current helpdesk', us: true, them: true },
      { label: 'Acts in billing and core systems', us: true, them: 'Custom work needed' },
      { label: 'Works with more than one helpdesk', us: true, them: false },
      { label: 'Chat, email, voice and text', us: true, them: 'Suite channels' },
      { label: 'Plain-language playbooks', us: true, them: 'Rules and macros' },
      { label: 'Automated test runs before release', us: true, them: 'Preview mode' },
      { label: 'Every conversation quality-scored', us: true, them: 'Sampled reports' },
      { label: 'Runtime policy checks', us: true, them: 'Content filters' },
      { label: 'Hand-off with actions already taken', us: true, them: 'Varies by setup' },
      { label: 'Pricing basis', us: 'Per resolved case', them: 'Seats plus add-on fee' },
      { label: 'Named engineer after launch', us: true, them: false },
      { label: 'Regional data hosting', us: true, them: 'Depends on suite plan' },
      { label: 'Price rises with headcount', us: false, them: true },
    ],
    features: [
      { icon: 'layers', title: 'Reach past the inbox', body: 'The cases that cost the most time rarely live in the helpdesk alone. Kestrel connects to billing, order, scheduling and internal tools, so the agent can issue the refund, move the delivery or update the record, then note it on the ticket where your team expects to find it.' },
      { icon: 'coin', title: 'Costs that follow the work', body: 'Add-ons are usually priced on top of seats, so costs rise with headcount whether or not the AI resolves anything. Kestrel’s subscription includes a pool of resolved conversations with one flat overage rate, so finance can see exactly what each resolution cost.' },
      { icon: 'shield', title: 'Controls built for risk teams', body: 'Safeguards enforce required wording, banned promises and action limits on every reply, with a log that shows which checks each message passed. Risk and compliance teams get evidence they can review, rather than a general assurance from a suite vendor.' },
    ],
    faq: [
      { q: 'Do we have to leave our helpdesk?', a: 'No. Kestrel connects to your current helpdesk, works tickets there and writes replies and notes back, so reporting and agent workflows stay as they are.' },
      { q: 'Can we use Kestrel alongside the suite’s own AI?', a: 'Yes, though most teams route automated conversations to one place to keep reporting clean. Some keep the suite assistant for agent drafting and use Kestrel for customer-facing resolution.' },
      { q: 'What if we use more than one helpdesk?', a: 'Kestrel works across several, which is common after acquisitions or for teams with separate brands. Playbooks can be shared or kept separate per brand.' },
      { q: 'How is quality measured differently?', a: 'Kestrel scores every conversation against your rubric and groups misses by cause, rather than sampling or relying on survey replies.' },
      { q: 'Is set-up harder than switching on an add-on?', a: 'Slightly more involved at first, because you connect the systems the agent will act in. A Kestrel engineer does most of that work with you.' },
      { q: 'How do costs compare at scale?', a: 'Per-resolution pricing tracks outcomes, while seat-based add-ons track headcount. We can model both against your own volumes during evaluation.' },
    ],
  }),
  detail({
    slug: 'kestrel-vs-build-your-own',
    docTitle: 'Kestrel vs building your own AI agent | Kestrel',
    them: { name: 'DIY builds', singular: 'build-your-own agent', icon: 'code' },
    hero: {
      subtitle: 'Ship results this quarter instead of an internal platform',
      intro:
        'Building a support agent on a model API is a reasonable choice for companies with spare engineering capacity: you control every detail and own the roadmap. What tends to surprise teams is everything around the model. Evaluation suites, safety checks, connector permissions, quality review, voice handling and tooling for non-engineers all take months to build and staff to maintain. Kestrel ships those pieces ready to use, with a dedicated engineer, so your team spends its time on playbooks rather than plumbing.',
      bullets: [
        'Test runs, review scoring and safeguards included, rather than built and maintained in-house',
        'Ops teams own changes through Copilot, without waiting on an engineering sprint',
        'Connectors with scoped permissions and approvals for sensitive actions from day one',
        'A named Kestrel engineer for launch and every week afterwards',
      ],
    },
    intro: {
      them: 'A build-your-own agent is assembled by an internal team on top of a model provider’s API, often with an orchestration framework and a retrieval system for help content. It offers full control over behaviour, data flows and roadmap. The trade-off is that evaluation, safety, monitoring, channel support and admin tooling must all be designed, built and staffed internally, and every change competes with other engineering priorities.',
    },
    matrix: [
      { label: 'Full control over behaviour', us: 'Through playbooks', them: true },
      { label: 'Time to first live customer', us: 'Weeks', them: 'Months' },
      { label: 'Automated test runs', us: true, them: 'Build it yourself' },
      { label: 'Every conversation quality-scored', us: true, them: 'Build it yourself' },
      { label: 'Runtime policy checks', us: true, them: 'Build it yourself' },
      { label: 'Voice channel', us: true, them: 'Separate project' },
      { label: 'Ops team can change behaviour', us: true, them: 'Through engineers' },
      { label: 'Approval steps for sensitive actions', us: true, them: 'Build it yourself' },
      { label: 'Ongoing model upgrades handled', us: true, them: false },
      { label: 'On-call for the agent', us: 'Shared with Kestrel', them: 'Your team' },
      { label: 'Cost model', us: 'Per resolved case', them: 'Usage plus headcount' },
      { label: 'Data used to train shared models', us: false, them: 'Depends on provider' },
      { label: 'Named engineer after launch', us: true, them: false },
    ],
    features: [
      { icon: 'bolt', title: 'Skip the platform project', body: 'The model is the easy part. Kestrel provides the evaluation, review, safety and admin tooling that an internal build would need before it could safely face customers, so the first live conversation happens within weeks instead of after a long platform roadmap.' },
      { icon: 'people', title: 'Changes without a sprint', body: 'In an internal build, every wording fix or policy change waits for an engineer. With Kestrel, operations teams edit playbooks with Copilot, test them and release them the same day, while your engineers stay focused on the product your customers pay for.' },
      { icon: 'check', title: 'Model changes handled', body: 'Model providers update and retire models often. Kestrel tests each upgrade against your playbooks and review history before switching, so you get improvements without regressions and without your team rebuilding prompts every few months.' },
    ],
    faq: [
      { q: 'Can we still customise behaviour deeply?', a: 'Yes. Playbooks, safeguards, tone, connectors and rubrics are all configurable, and custom internal APIs can be connected. What you skip is building the platform around them.' },
      { q: 'Can our engineers extend Kestrel?', a: 'Yes. Engineers can add custom connectors, call Kestrel through its API and receive events by webhook, so it fits into your own systems.' },
      { q: 'Who owns the data and the playbooks?', a: 'You do. Playbooks, rubrics and conversation data can be exported at any time, and conversations are never used to train shared models.' },
      { q: 'Is it more expensive than building?', a: 'Usually less, once evaluation, safety, on-call and tooling headcount are counted. We can compare against your own estimates during evaluation.' },
      { q: 'What if we already started an internal build?', a: 'Your prompts, test cases and knowledge sources are useful input. Many teams move them into Kestrel and keep their engineers for integrations.' },
      { q: 'Which models does Kestrel use?', a: 'Kestrel uses several leading models and picks per task for speed and accuracy, testing every change against your playbooks before it reaches customers.' },
    ],
  }),
  detail({
    slug: 'kestrel-vs-outsourced-bpo',
    docTitle: 'Kestrel vs outsourced BPO | Kestrel',
    them: { name: 'Outsourcing', singular: 'BPO provider', icon: 'headset' },
    hero: {
      subtitle: 'Cover peaks and nights without adding another shift',
      intro:
        'Outsourced contact centres give teams people on demand: extra hours, extra languages and extra capacity for seasonal peaks. They remain the right choice for work that truly needs a person on every contact. For the large share of cases that follow a known procedure, though, outsourcing means paying by the hour for consistency that is hard to guarantee across sites and shifts. Kestrel resolves those cases instantly at any hour, applies every procedure the same way and hands the rest to your own team.',
      bullets: [
        'Instant answers at any hour, in every channel, with no forecasting or ramp-up for peaks',
        'Procedure changes go live the same day, without retraining across sites and shifts',
        'Every conversation reviewed automatically instead of a small sampled percentage',
        'Costs follow resolved cases rather than hours staffed',
      ],
    },
    intro: {
      them: 'A BPO provider supplies trained human agents who handle customer contacts on your behalf, usually from one or more offshore or nearshore sites. Contracts are typically priced per hour or per agent, with service levels for answer times and quality. BPOs add flexible capacity and language coverage, but changing guidance means retraining many people, and quality assurance is usually based on sampling a small share of contacts.',
    },
    matrix: [
      { label: 'Available around the clock', us: true, them: 'At extra cost' },
      { label: 'Handles sudden peaks', us: true, them: 'Needs forecasting' },
      { label: 'Same procedure every time', us: true, them: 'Varies by agent' },
      { label: 'Guidance changes go live', us: 'Same day', them: 'After retraining' },
      { label: 'Every conversation reviewed', us: true, them: 'Sampled' },
      { label: 'Handles empathy-heavy cases', us: 'Hands to your team', them: true },
      { label: 'Acts in your systems', us: true, them: true },
      { label: 'Language coverage', us: 'Five and growing', them: 'Depends on site' },
      { label: 'Full action audit trail', us: true, them: 'Partial' },
      { label: 'Pricing basis', us: 'Per resolved case', them: 'Per hour or agent' },
      { label: 'Ramp-up for new work', us: 'Write and test a playbook', them: 'Hire and train' },
      { label: 'Data stays in chosen region', us: true, them: 'Depends on site' },
      { label: 'Named engineer after launch', us: true, them: 'Account manager' },
    ],
    features: [
      { icon: 'bolt', title: 'Peaks without hiring', body: 'Storms, launches and tax deadlines no longer need weeks of forecasting and recruitment. Kestrel scales with volume on the day, answering instantly in every channel, while your own people focus on the cases that genuinely benefit from a human conversation and a judgement call.' },
      { icon: 'check', title: 'One standard, every time', body: 'When guidance changes, every Kestrel conversation follows the new playbook from the moment it is released. There is no lag while sites retrain and no variation between shifts, and the review queue confirms the change is being applied as intended across every channel.' },
      { icon: 'people', title: 'People where they matter', body: 'Kestrel does not remove the human side of support. It hands complaints, vulnerable customers and complex judgement calls to your team with the context already gathered, so those conversations get more time and attention than a stretched queue allows.' },
    ],
    faq: [
      { q: 'Can Kestrel replace our BPO contract entirely?', a: 'Sometimes, but most teams start by moving procedure-driven cases to Kestrel and keeping people for complex and sensitive work, then adjust the contract as results come in.' },
      { q: 'How does quality compare?', a: 'Kestrel applies the same procedure every time and every conversation is scored, so quality is measured across all contacts rather than a sample.' },
      { q: 'What about languages our BPO covers?', a: 'Kestrel supports five languages today with more in testing. Cases in other languages can still route to your existing provider.' },
      { q: 'Who handles complaints and vulnerable customers?', a: 'Your team or your provider, by design. Kestrel recognises these cases and hands them over with a summary and the steps already taken.' },
      { q: 'How quickly can we absorb a seasonal peak?', a: 'Playbooks already live scale instantly. New seasonal playbooks are usually written and tested within a week or two.' },
      { q: 'How do costs compare?', a: 'Per-resolution pricing means you pay for outcomes rather than staffed hours. We model both against your volumes during evaluation.' },
    ],
  }),
  detail({
    slug: 'kestrel-vs-phone-trees',
    docTitle: 'Kestrel vs phone trees and IVR | Kestrel',
    them: { name: 'IVR', singular: 'phone tree', icon: 'keypad' },
    hero: {
      subtitle: 'Let callers explain once, then get the task done',
      intro:
        'Phone trees route callers with keypad menus and short spoken phrases. They work for a few stable reasons to call, such as checking a balance, and they keep queues organised. Callers, though, rarely fit the menu: they press zero, repeat their details to a person and wait. Kestrel Voice lets callers explain in their own words, checks the account during the call and completes the task, using the same playbooks and safeguards as your chat and email support.',
      bullets: [
        'Natural conversation instead of menus, with interruptions and changes of mind handled gracefully',
        'Looks up records and takes actions mid-call, such as rebooking or taking a secure payment',
        'Warm transfers with a summary, so callers never repeat their story to your team',
        'Every call transcribed and scored with the same rubric as written channels',
      ],
    },
    intro: {
      them: 'A phone tree, or interactive voice response system, answers calls with recorded menus. Callers choose options by keypad or short phrases, may complete a simple self-service step such as a balance check, and are then routed to a queue. Phone trees are reliable and familiar, but changes need telephony specialists, and anything beyond a narrow set of tasks ends in a transfer to a person.',
    },
    matrix: [
      { label: 'Callers speak naturally', us: true, them: 'Short phrases' },
      { label: 'Completes tasks on the call', us: true, them: 'Simple lookups' },
      { label: 'Same playbooks as chat and email', us: true, them: false },
      { label: 'Warm transfer with summary', us: true, them: false },
      { label: 'Recognises returning callers', us: true, them: 'By number only' },
      { label: 'Secure payments', us: 'Keypad step', them: 'Keypad step' },
      { label: 'Every call quality-scored', us: true, them: false },
      { label: 'Runtime policy checks', us: true, them: 'Fixed recordings' },
      { label: 'Change behaviour', us: 'Edit a playbook', them: 'Telephony specialist' },
      { label: 'Works with existing numbers', us: true, them: true },
      { label: 'Outbound calls with replies handled', us: true, them: false },
      { label: 'Reporting', us: 'Outcomes and scores', them: 'Menu paths' },
      { label: 'Pricing basis', us: 'Pool plus voice minutes', them: 'Licences plus minutes' },
    ],
    features: [
      { icon: 'check', title: 'Finished on the first call', body: 'Callers describe the problem once. Kestrel Voice confirms who they are, checks the account and completes the task while they are still on the line, then sends a text confirming the outcome so they have a record without needing to call back.' },
      { icon: 'layers', title: 'One brain across channels', body: 'Voice uses the same playbooks, safeguards and review rubric as chat and email. A change made for one channel applies to all of them, and a customer who calls about an open chat conversation picks up exactly where they left off.' },
      { icon: 'people', title: 'Better transfers', body: 'When a call needs a person, Kestrel transfers it with a short summary of who is calling, why and what has been done. Your agent can greet the caller by name and get straight to the point, which shortens calls and lifts satisfaction.' },
    ],
    faq: [
      { q: 'Do we need to change phone providers?', a: 'No. Calls can be forwarded from your current telephony or contact centre platform, and Kestrel transfers back to your queues when needed.' },
      { q: 'Can we keep a short menu for some callers?', a: 'Yes. Some teams keep a single option for specific lines, though most find a natural greeting routes callers faster.' },
      { q: 'How are payments handled on calls?', a: 'Through a secure keypad step connected to your payment provider. Card numbers are never spoken, transcribed or stored in the conversation.' },
      { q: 'What happens outside opening hours?', a: 'Kestrel keeps resolving what it can and offers callbacks or text follow-ups for anything that needs a person the next morning.' },
      { q: 'How natural does it sound?', a: 'Callers hear a natural voice with sensible pacing, and the agent handles interruptions. You can choose the voice per brand.' },
      { q: 'How quickly can a line move over?', a: 'If playbooks already run in chat, a line can move within a week. Otherwise two to four weeks, including test calls.' },
    ],
  }),
  detail({
    slug: 'kestrel-vs-single-channel-assistants',
    docTitle: 'Kestrel vs single-channel assistants | Kestrel',
    them: { name: 'Chat-only AI', singular: 'single-channel assistant', icon: 'bubble' },
    hero: {
      subtitle: 'Serve customers wherever they reach out, with one agent',
      intro:
        'Single-channel assistants usually start life as a web chat widget, and many do that one job well. Customers, however, move between channels: they start in chat, follow up by email and call when it is urgent. With separate tools per channel, context is lost at each switch and every policy change has to be repeated in several places. Kestrel runs one agent across chat, email, voice, text and messaging apps, with one set of playbooks and one memory of the customer.',
      bullets: [
        'Chat, email, voice, text and messaging apps share the same playbooks and safeguards',
        'Context follows the customer across channels and days, so nobody repeats themselves',
        'One review queue and one set of reports for every channel',
        'One subscription across channels: text from the pool, voice by the minute',
      ],
    },
    intro: {
      them: 'A single-channel assistant is an AI tool built for one channel, most often web chat, sometimes email or messaging. It can answer questions well within that channel and is usually quick to deploy. Covering other channels means adding separate tools, each with its own configuration, reporting and pricing, and customers who switch channel typically start the conversation again from scratch.',
    },
    matrix: [
      { label: 'Web chat', us: true, them: true },
      { label: 'Email', us: true, them: 'Separate tool' },
      { label: 'Voice', us: true, them: 'Separate tool' },
      { label: 'Text and messaging apps', us: true, them: 'Varies' },
      { label: 'Context shared across channels', us: true, them: false },
      { label: 'One set of playbooks', us: true, them: false },
      { label: 'Acts in your systems', us: true, them: 'Limited' },
      { label: 'Every conversation quality-scored', us: true, them: 'Per tool' },
      { label: 'Runtime policy checks', us: true, them: 'Per tool' },
      { label: 'Automated test runs', us: true, them: false },
      { label: 'Proactive outreach', us: true, them: false },
      { label: 'Pricing basis', us: 'One subscription', them: 'Per channel' },
      { label: 'Named engineer after launch', us: true, them: false },
    ],
    features: [
      { icon: 'layers', title: 'Change once, apply everywhere', body: 'When a refund rule or a disclosure changes, you edit one playbook and test it once. Chat, email, voice and text all pick up the change together, so customers get the same answer wherever they ask and your team stops maintaining the same rule in several tools.' },
      { icon: 'people', title: 'Customers never start over', body: 'Kestrel remembers the customer across channels. Someone who chatted yesterday and calls today is recognised, and the agent continues from where things were left, with the same case, the same details and no need to explain the problem a second time.' },
      { icon: 'coin', title: 'One view, one price', body: 'Quality scores, resolution rates and costs sit in one place for every channel. One subscription covers every channel, with voice billed by the minute, so adding voice or email does not mean another contract, another dashboard and another set of numbers to reconcile.' },
    ],
    faq: [
      { q: 'Can we start with one channel and add more later?', a: 'Yes. Most teams launch in chat or email first, then add voice and text using the same playbooks once review scores hold steady.' },
      { q: 'Do playbooks need rewriting for voice?', a: 'Rarely. Kestrel adapts phrasing for speech automatically; you only add voice-specific steps such as keypad payments.' },
      { q: 'How does cross-channel memory work?', a: 'Conversations are linked to the customer record, so the agent sees recent cases in any channel, within your retention and privacy rules.' },
      { q: 'Can different channels follow different rules?', a: 'Yes. Safeguards and playbook steps can be scoped per channel, for example stricter verification on the phone.' },
      { q: 'What happens to our current chat tool?', a: 'Kestrel can replace it or run behind your existing chat widget, depending on what works best for your site.' },
      { q: 'Is pricing different per channel?', a: 'No. Text channels draw on one shared pool of resolutions, and voice is billed per connected minute.' },
    ],
  }),
]

export const getCompetitorDetail = (slug) => competitorDetails.find((c) => c.slug === slug)
