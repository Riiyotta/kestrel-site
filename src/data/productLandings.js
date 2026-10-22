// Product landing pages – SPEC_PAGES_A T2 (/product, /product/coach, /product/voice). Rendered by
// src/pages/product/{ProductHome,Copilot,Voice}.jsx. Shared sections (hero, ticker, Tools prose, Related, FAQ) use
// the same shapes as the T1 data (productPages.js); the middle sections are bespoke per page.
// Original placeholder copy for the fictional "Kestrel" (Copilot = the /coach page's operations assistant).
// Lengths follow the spec roles (T2.1 hero, T2.3 carousel cards, T2.4 rows, T2.7 bento, T2.8/T2.9 voice sections).
import { a, p, ul } from './productPages.js'

const cs = (slug) => `/customer-stories/${slug}`
const DEMO = { label: 'Book a demo', href: '/get-a-demo' }

// ---------------------------------------------------------------------------------------------- /product
export const productHome = {
  docTitle: 'Kestrel platform | AI customer support that does the work',
  hero: {
    title: 'Give your support team its evenings back',
    sub: 'Most support queues are full of cases a trained person could close in two minutes, if only they had time to get to them: a refund that fits the policy, a delivery to rebook, a bill that needs explaining. Kestrel takes that work off the queue. Your operations team writes down how each kind of case should be handled, Kestrel connects to the tools those steps need, and an AI agent works the cases at any hour while your people take the conversations that need judgement, warmth or a decision. Every change is rehearsed before release, every conversation is graded afterwards, and you only pay when a case is resolved.',
  },
  tools: {
    title: 'What should a support platform be judged on?',
    items: [
      {
        blocks: [
          p('<strong>Kestrel</strong> is used by lenders, clinics, insurers, energy suppliers and software companies, where the right answer depends on the customer’s own records. Results customers have shared:'),
          ul(
            `<strong>Coinwell</strong> (cards): three in four statement queries resolved without a person. ${a(cs('coinwell-card-disputes'), 'Read the story')}`,
            `<strong>Voltway Energy</strong>: outage updates sent proactively, with replies handled by the agent. ${a(cs('voltway-outage-updates'), 'Read the story')}`,
            `<strong>Brindle Health</strong>: after-hours admin covered, clinical questions routed to nurses. ${a(cs('brindle-health-after-hours'), 'Read the story')}`,
          ),
          p('<strong>Other categories buyers consider:</strong>'),
          ul(
            '<strong>Helpdesk suites with AI add-ons</strong> keep everything in one vendor but rarely act beyond the helpdesk itself.',
            '<strong>Model APIs plus an internal team</strong> offer full control, with evaluation and safety left to you.',
          ),
          p(`See every ${a('/competitors', 'category comparison')}.`),
        ],
      },
      {
        title: 'Side by side: what each approach ships with',
        blocks: [
          ul(
            '<strong>Customer-facing agent:</strong> Kestrel: Agent across five channels. Helpdesk add-ons: chat and email assistants. In-house builds: whatever you build.',
            '<strong>Operations assistant:</strong> Kestrel: Copilot builds and tunes playbooks. Helpdesk add-ons: rule editors. In-house builds: your engineers.',
            '<strong>Pre-release testing:</strong> Kestrel: test runs on every change. Helpdesk add-ons: preview mode. In-house builds: custom evaluation.',
            '<strong>Quality review:</strong> Kestrel: every conversation scored. Helpdesk add-ons: sampled reports. In-house builds: custom dashboards.',
            '<strong>Runtime controls:</strong> Kestrel: safeguards on every reply and action. Helpdesk add-ons: content filters. In-house builds: your own checks.',
            '<strong>Pricing:</strong> Kestrel: per resolved case. Helpdesk add-ons: per seat plus add-on. In-house builds: usage plus headcount.',
          ),
          p(`Further reading: ${a('/product/how-it-works', 'how Kestrel works')}, ${a('/product/trust', 'security')}, ${a('/pricing', 'pricing')} and ${a('/integrations', 'connectors')}.`),
        ],
      },
    ],
  },
  carousel: {
    title: 'Every channel, one set of playbooks',
    sub: 'Customers pick the channel; Kestrel brings the same knowledge, rules and memory of the customer to each one.',
    items: [
      {
        title: 'Chat',
        subtitle: 'On your site and inside your app',
        bullets: [
          { lead: 'Picks up', text: 'logged-in context so customers skip the identity questions.' },
          { lead: 'Shows', text: 'buttons, forms and order cards when they are quicker than typing.' },
          { lead: 'Hands over', text: 'to a person in the same window, with the summary attached.' },
        ],
        art: { scene: 'chat', tint: 'lavender' },
      },
      {
        title: 'Email',
        subtitle: 'Long threads, attachments and all',
        bullets: [
          { lead: 'Reads', text: 'the whole thread and any attached documents before replying.' },
          { lead: 'Merges', text: 'duplicate emails from the same customer into one case.' },
          { lead: 'Replies', text: 'in your house style, with the right signature per brand.' },
        ],
        art: { scene: 'queue', tint: 'yellow' },
      },
      {
        title: 'Voice',
        subtitle: 'Natural calls on your own numbers',
        bullets: [
          { lead: 'Answers', text: 'calls without menus and lets callers explain in their own words.' },
          { lead: 'Acts', text: 'during the call, from bookings to payments, without long pauses.' },
          { lead: 'Transfers', text: 'warm, with a spoken and written summary for your agent.' },
        ],
        art: { scene: 'phone', tint: 'pink' },
      },
      {
        title: 'Text',
        subtitle: 'Short messages, quick fixes',
        bullets: [
          { lead: 'Sends', text: 'updates and reminders, and handles whatever comes back.' },
          { lead: 'Keeps', text: 'replies short and links to secure forms for sensitive details.' },
          { lead: 'Respects', text: 'consent, opt-outs and quiet hours on every message.' },
        ],
        art: { scene: 'outreach', tint: 'green' },
      },
      {
        title: 'Messaging',
        subtitle: 'The apps customers already use',
        bullets: [
          { lead: 'Supports', text: 'images, voice notes and documents sent from a phone.' },
          { lead: 'Continues', text: 'a conversation days later without losing the thread.' },
          { lead: 'Verifies', text: 'identity before any account detail is shared.' },
        ],
        art: { scene: 'channels', tint: 'peach' },
      },
    ],
  },
  rows: [
    {
      title: 'An agent that finishes cases instead of passing them on',
      body: 'Kestrel Agent reads the account, follows your playbook and makes the change in the system of record, whether that is a refund, a new appointment or an updated address. When a case needs a person, it hands over with the work already done.',
      cta: { label: 'Explore Agent', href: '/product/ai-agents' },
      art: { scene: 'chat', tint: 'pink' },
    },
    {
      title: 'Copilot, the teammate who maintains your playbooks',
      body: 'Describe a process and Copilot drafts the playbook, connects the tools it needs and proposes test scenarios. Ask it why scores dipped last week and it finds the cause and suggests a fix for you to approve.',
      cta: { label: 'Meet Copilot', href: '/product/coach' },
      art: { scene: 'queue', tint: 'yellow' },
    },
    {
      title: 'Test runs that rehearse every change before release',
      body: 'Scripted customers put new playbooks through hundreds of realistic conversations, including the confused, the impatient and the ones who change their mind. You see every result before a real customer does.',
      cta: { label: 'See test runs', href: '/product/simulations' },
      art: { scene: 'test', tint: 'lavender' },
    },
    {
      title: 'A review queue that reads every conversation for you',
      body: [
        'Each conversation, human or AI, is scored against your rubric for accuracy, policy, tone and outcome. Misses are grouped by cause, so leads fix the playbook or the article behind them instead of chasing single tickets.',
        'Scores appear minutes after a conversation closes, and urgent failures alert a lead straight away.',
      ],
      cta: { label: 'Explore reviews', href: '/product/quality-assurance' },
      art: { scene: 'review', tint: 'green' },
    },
    {
      title: 'Safeguards that hold the agent to your written policy',
      body: 'Required wording, banned promises, data rules and action limits run on every turn. Sensitive actions can wait for approval, and every check is logged for audit.',
      cta: { label: 'See safeguards', href: '/product/guardrails' },
      art: { scene: 'shield', tint: 'peach' },
    },
  ],
  orbit: {
    title: 'Connects to the systems your cases live in',
    body: 'Connect helpdesks, billing, order and scheduling systems, CRMs and your own APIs. Each connector has scoped permissions, so the agent only does what a playbook allows.',
    cta: { label: 'Browse the connector library', href: '/integrations' },
  },
  stories: {
    title: 'Teams that switched, in their own words',
    items: [
      {
        quote: '“Our onboarding queue used to need three people every Monday. Now one person reviews what the agent did over the weekend.”',
        name: 'Selin Kaya',
        role: 'VP Customer Operations, Stackhouse',
        img: '/assets/photos/story-1.webp',
        tint: 'peach',
      },
      {
        quote: '“Our members notice the difference. Answers are faster, and they are right the first time, which matters more.”',
        name: 'Ruth Achterberg',
        role: 'Director of Member Care, Coinwell',
        img: '/assets/photos/story-2.webp',
        tint: 'green',
      },
      {
        quote: '“The weekly review with our Kestrel engineer is the most useful half hour in my calendar.”',
        name: 'Jonah Pereira',
        role: 'Head of Support, Ledgerly',
        img: '/assets/photos/story-4.webp',
        tint: 'pink',
      },
    ],
  },
  related: {
    title: 'Further reading for teams comparing platforms',
    links: [
      a('/articles/support-metrics-that-matter', 'Support metrics worth tracking once an agent goes live'),
      a('/articles/ai-support-first-90-days', 'The first ninety days with an AI support agent'),
      a('/articles/ai-agent-guardrails', 'Setting guardrails for an AI agent you can defend'),
      a('/blog/what-good-cx-looks-like-in-regulated-industries', 'What good service looks like in regulated industries'),
      a('/product/how-it-works', 'How Kestrel turns your procedures into resolved cases'),
    ],
  },
  faq: {
    title: 'Questions buyers ask about the Kestrel platform',
    items: [
      {
        q: 'What problem does Kestrel solve?',
        a: 'Support teams spend much of their week on cases that follow a known procedure but still need someone to open three tools. Kestrel handles those cases with an AI agent, so your people can spend their time on the conversations where judgement and empathy matter most.',
      },
      {
        q: 'Which industries does Kestrel work best for?',
        a: `Any industry where support depends on account data and rules: ${a('/industry/financial-services', 'financial services')}, ${a('/industry/healthcare', 'healthcare')}, ${a('/industry/insurance', 'insurance')}, energy and complex software are the most common today.`,
      },
      {
        q: 'Does Kestrel replace our helpdesk?',
        a: 'No. Kestrel connects to the helpdesk you already use, works tickets there and writes notes back, so your team keeps its existing tools, views and reporting.',
      },
      {
        q: 'How do we stay in control of what the agent does?',
        a: 'Playbooks define the steps and limits, safeguards check every reply and action, test runs gate each release and the review queue scores every conversation afterwards. Your team approves each change.',
      },
      {
        q: 'How long does a typical rollout take?',
        a: 'Simple playbooks can be live within days. Integrated workflows that change records usually take two to four weeks, including testing and any security review on your side.',
      },
      {
        q: 'How is Kestrel priced?',
        a: `Each plan is a monthly subscription with a pool of resolved conversations and a flat rate past it, so costs track outcomes rather than seats. Plans are on the ${a('/pricing', 'pricing page')}, each with a free 14-day pilot.`,
      },
    ],
  },
  blog: { title: 'From the Kestrel journal', cta: { label: 'View all posts →', href: '/blog' } },
}

// ---------------------------------------------------------------------------------------------- /product/coach
export const copilotPage = {
  docTitle: 'Kestrel Copilot | The operations assistant for your support team',
  hero: {
    title: 'Kestrel Copilot',
    paragraphs: [
      'Running a support operation means a hundred small chores a week: a policy changes, an article goes stale, a new product launches with no playbook. Copilot is the colleague who picks those chores up, so your leads spend Monday morning deciding rather than digging.',
      'Think of it as a very fast, very patient operations analyst. Give it a messy policy document and it returns a draft playbook with the open questions marked. Point it at last week’s lowest-scoring conversations and it tells you which three causes explain most of them. Ask it to rehearse a change against a hundred awkward customers and it reports back before lunch. It never ships anything on its own: your team reviews, edits and approves every proposal, and every approved change can be rolled back.',
    ],
    art: { scene: 'queue', tint: 'brand' },
    tickerLine: 'Relied on by support leaders everywhere',
  },
  tools: {
    title: 'Who maintains an AI agent once it is live?',
    items: [
      {
        blocks: [
          p(`<strong>Kestrel Copilot</strong> is how operations teams keep up with their agent week after week. Stackhouse uses it to turn review findings into playbook changes the same day (${a(cs('stackhouse-onboarding-workflows'), 'read the Stackhouse story')}), and Patchwork built its first three playbooks with it in a week (${a(cs('patchwork-admin-requests'), 'Patchwork story')}).`),
          ul(
            `<strong>Stackhouse</strong>: review findings turned into tested playbook changes within the same working day. ${a(cs('stackhouse-onboarding-workflows'), 'Read the story')}`,
            `<strong>Patchwork</strong>: three admin playbooks drafted, tested and launched in the first week. ${a(cs('patchwork-admin-requests'), 'Read the story')}`,
            `<strong>Ledgerly</strong>: tax-season trends explained on request, without anyone building a dashboard. ${a(cs('ledgerly-handles-tax-season'), 'Read the story')}`,
          ),
          p('<strong>Other ways teams maintain an AI agent:</strong>'),
          ul(
            '<strong>Visual flow editors</strong> let ops teams draw and maintain conversation trees by hand, branch by branch.',
            '<strong>Engineering tickets</strong> route every change through a developer backlog, which slows small fixes down.',
          ),
          p('Whichever route a team takes, the work does not stop at launch: policies change, products ship and customers find new ways to ask old questions. The difference is who does that upkeep, how quickly it reaches customers and how much of the team’s week it takes.'),
          p(`See the ${a('/competitors/kestrel-vs-legacy-chatbots', 'legacy chatbot comparison')} and the ${a('/competitors/kestrel-vs-build-your-own', 'build-your-own comparison')}.`),
        ],
      },
      {
        title: 'Three ways to keep an agent up to date, compared',
        blocks: [
          ul(
            '<strong>Building playbooks:</strong> Copilot: drafts from a plain-language description. Flow editors: drawn by hand. Engineering tickets: coded.',
            '<strong>Testing:</strong> Copilot: writes scenarios and runs them. Flow editors: manual preview. Engineering tickets: test suites if someone writes them.',
            '<strong>Finding problems:</strong> Copilot: explains score changes and their causes. Flow editors: drop-off charts. Engineering tickets: bug reports.',
            '<strong>Approval:</strong> Copilot: every change waits for a person. Flow editors: publish button. Engineering tickets: code review.',
            '<strong>Where you use it:</strong> Copilot: inside Kestrel and in team chat. Flow editors: the vendor console. Engineering tickets: your tracker.',
          ),
          p(`Further reading: ${a('/product/simulations', 'test runs')}, ${a('/product/quality-assurance', 'review queue')} and ${a('/blog/introducing-kestrel-workflows-studio', 'Workflows Studio launch post')}.`),
        ],
      },
    ],
  },
  bento: [
    {
      kind: 'block',
      layout: 'tabs-bottom',
      title: 'An analyst that never sleeps',
      sub: 'Hand Copilot the operational chores that pile up between meetings, from stale articles to new policies, and get back drafts your team can review in minutes.',
      art: { scene: 'chat', tint: 'lavender' },
      items: [
        { title: 'Turns policy documents into playbooks', body: 'Upload the PDF your compliance team wrote and get a structured draft back.' },
        { title: 'Keeps the help centre honest', body: 'Finds articles that contradict each other or a live playbook, and proposes merges.' },
        { title: 'Prepares the weekly review', body: 'Summarises what changed, what slipped and what to look at first on Monday.' },
      ],
    },
    {
      kind: 'quote',
      before: 'We had years of tickets and no time to read them. ',
      mark: 'Copilot found the three causes behind most of our escalations in an afternoon, and drafted the playbook fixes before our weekly meeting.',
      after: ' Our leads now spend that meeting deciding, not digging, and the changes reach customers the same week.',
      name: 'Imran Qureshi',
      role: 'Support Operations Lead',
      img: '/assets/photos/proof-portrait-2.webp',
      logo: { name: 'Patchwork', shape: 'square' },
    },
    {
      kind: 'block',
      layout: 'split',
      mediaSide: 'left',
      mediaHeight: 671,
      title: 'From a rough note to a tested playbook',
      sub: 'A two-line note from a team lead is enough to start. Copilot asks the questions a new hire would ask, then produces something you can rehearse.',
      art: { scene: 'flow', tint: 'lavender' },
      items: [
        { title: 'It asks before it assumes', body: 'Where a policy is silent, such as refunds on sale items, Copilot lists the open questions instead of guessing, and records your answers in the playbook for next time.' },
        { title: 'It writes the awkward customers', body: 'For every new playbook, Copilot drafts test customers who are rushed, confused or angry, and keeps the ones that fail as permanent regression cases.' },
        { title: 'It shows its working', body: 'Each draft comes with a plain summary of what changed compared with the live version and why, so reviewers can approve in minutes rather than reading line by line.' },
      ],
    },
    {
      kind: 'block',
      layout: 'split',
      mediaSide: 'right',
      title: 'A second reader for every conversation',
      sub: 'Copilot reads alongside your QA team, so reviewers spend their time on the cases where a human opinion actually changes something.',
      art: { scene: 'review', tint: 'green' },
      items: [
        { title: 'Calibration sessions, prepared', body: 'Copilot picks the conversations where it and your reviewers disagreed most, so each calibration meeting starts with the cases that teach the rubric something.' },
        { title: 'Coaching notes for people', body: 'For human agents, Copilot drafts specific, kind coaching notes with examples from their own week, which a team lead edits before sharing.' },
        { title: 'Plain-language rubrics', body: 'Rubric criteria are written as sentences anyone can read, such as “the customer never has to repeat their order number”.' },
      ],
    },
    { kind: 'cta', title: 'Put Copilot to work', cta: { label: 'Book a demo', href: '/get-a-demo' } },
    {
      kind: 'block',
      layout: 'tabs-bottom',
      title: 'Numbers without the spreadsheet',
      sub: 'Leadership asks why contacts went up in March. Copilot gives you the answer, the chart and five example conversations, ready to paste into the update.',
      art: { scene: 'chart', tint: 'yellow' },
      items: [
        { title: 'Board-ready summaries', body: 'Monthly numbers come with a short written story of what drove them.' },
        { title: 'Cost per case, explained', body: 'See which case types cost most to resolve, by channel and by team.' },
        { title: 'Launch watch', body: 'After a product launch, Copilot reports daily on the questions it caused.' },
      ],
    },
    {
      kind: 'block',
      layout: 'split',
      mediaSide: 'left',
      title: 'Small repairs, shipped every week',
      sub: 'Most quality problems are small: one confusing sentence, one missing step. Copilot keeps a running list and clears it with your approval.',
      art: { scene: 'test', tint: 'pink' },
      items: [
        { title: 'A repair backlog you can see', body: 'Every open issue sits in one list with its size, its examples and the customers affected, ordered by how much difference fixing it would make.' },
        { title: 'Batch approvals on Fridays', body: 'Many teams review the week’s small repairs in one sitting. Copilot groups them so a lead can approve ten low-risk fixes in a quarter of an hour.' },
        { title: 'Follow-up you do not have to chase', body: 'A week after each release, Copilot checks whether the repair worked and reopens it with fresh examples if the problem came back.' },
      ],
    },
  ],
  related: {
    title: 'Further reading on running support operations',
    links: [
      a('/blog/introducing-kestrel-workflows-studio', 'Introducing Workflows Studio for support operations'),
      a('/blog/roost-podcast-ep-12-quality-at-scale', 'The Roost podcast: keeping quality high at scale'),
      a('/articles/writing-help-centre-articles', 'Writing help-centre articles an agent can rely on'),
      a('/articles/reducing-ticket-backlog', 'Clearing a ticket backlog before you automate it'),
    ],
  },
  faq: {
    title: 'Questions team leads ask about Copilot',
    items: [
      { q: 'Who is Copilot designed for?', a: 'Support operations leads, QA reviewers and team managers: the people who decide how support should work and need the agent to keep up with those decisions without filing engineering tickets.' },
      { q: 'Can Copilot change things without asking?', a: 'No. Every change Copilot proposes waits for a person with the right role to approve it, and every approved change is versioned and can be rolled back.' },
      { q: 'What data can Copilot see?', a: 'The same data the person asking can see. Copilot respects role-based permissions, so a team lead cannot use it to reach conversations or settings outside their own access.' },
      { q: 'Can Copilot work from our team chat?', a: 'Yes. Teams can ask questions and approve proposals from their chat tool, and longer work such as a test run sends a summary back to the thread when it finishes.' },
      { q: 'Is Copilot included in every plan?', a: `Copilot is included on all plans, with usage limits by tier. See the ${a('/pricing', 'pricing page')} for details.` },
      { q: 'Can Copilot help with a product launch?', a: 'Yes. Give it the launch notes and Copilot drafts the help articles and playbook changes the launch will need, writes test customers who ask about the new feature, and reports daily on the questions customers actually raise once it is live.' },
      { q: 'How does Copilot know our policies and procedures?', a: 'It reads the playbooks, help articles, macros and policy documents you connect, and it asks when something is ambiguous or two sources disagree. Anything it learns becomes part of a playbook your team can see and edit, never a hidden rule.' },
      { q: 'Does Copilot replace the Kestrel engineer?', a: 'No. Copilot handles day-to-day operational changes; your named Kestrel engineer still joins reviews, handles complex integrations and helps plan larger changes.' },
    ],
  },
}

// ---------------------------------------------------------------------------------------------- /product/voice
export const voicePage = {
  docTitle: 'Kestrel Voice | Phone support that gets things done',
  hero: {
    title: 'A phone line that never puts anyone on hold',
    sub: 'Kestrel Voice picks up on the first ring, day or night, and sorts out the everyday calls that used to wait twenty minutes for a free agent.',
    intro: 'Hold queues are where goodwill goes to die. Most callers are ringing about something routine: a missed delivery, a meter reading, an appointment that no longer works. Kestrel Voice handles those calls in a calm, natural voice, in five languages, and sends a text afterwards so the caller has a record. Peaks no longer mean longer waits, because the agent answers every call at once, and your team stops spending its day on calls it could do in its sleep. Callers who want a person can ask for one at any point and are put through with a written summary.',
    art: { scene: 'phone', tint: 'brand' },
    tickerLine: 'Proud to support',
  },
  tools: {
    title: 'What should a voice agent be able to do on a real call?',
    items: [
      {
        blocks: [
          p(`<strong>Kestrel Voice</strong> is built for calls where something has to change: a booking, a payment, a claim. Voltway Energy handled its winter outage peak on it (${a(cs('voltway-outage-updates'), 'read the Voltway story')}), and Brindle Health answers its after-hours line with clinical calls passed straight to a nurse (${a(cs('brindle-health-after-hours'), 'Brindle story')}). Voice pricing follows the same per-resolution model as other channels (${a('/pricing', 'pricing')}).`),
          ul(
            `<strong>Voltway Energy</strong>: restoration estimates read from the live outage feed, with text updates offered on every call. ${a(cs('voltway-outage-updates'), 'Read the story')}`,
            `<strong>Brindle Health</strong>: bookings moved by phone overnight, with symptom calls transferred to the nurse line. ${a(cs('brindle-health-after-hours'), 'Read the story')}`,
            `<strong>Halden Power</strong>: move-out meter readings taken by phone and checked against the account before the call ends. ${a(cs('halden-power-moving-home'), 'Read the story')}`,
          ),
          p('<strong>Other approaches to automating calls:</strong>'),
          ul(
            '<strong>Menu-based IVR</strong> routes callers by keypad choices and rarely completes a task on the call itself.',
            '<strong>Voicebots on fixed scripts</strong> recognise a few intents and transfer anything outside them.',
          ),
          p(`See ${a('/competitors/kestrel-vs-phone-trees', 'Kestrel compared with phone trees and IVR')}.`),
        ],
      },
      {
        title: 'Voice options compared, from menus to agents',
        blocks: [
          ul(
            '<strong>Understanding:</strong> Kestrel Voice: free speech, interruptions and changes of mind. IVR: keypad and short phrases. Scripted voicebots: a fixed set of intents.',
            '<strong>Actions mid-call:</strong> Kestrel Voice: yes, through your systems. IVR: balance or status lookups. Scripted voicebots: limited integrations.',
            '<strong>Same rules as chat:</strong> Kestrel Voice: shared playbooks and safeguards. IVR: separate menus. Scripted voicebots: separate scripts.',
            '<strong>Quality review:</strong> Kestrel Voice: every call scored. IVR: abandonment rates. Scripted voicebots: containment rates.',
            '<strong>Transfers:</strong> Kestrel Voice: warm, with a summary. IVR: cold queue. Scripted voicebots: cold or partial context.',
          ),
          p(`Further reading: ${a('/product/outbound', 'outreach calls')}, ${a('/product/guardrails', 'safeguards')} and ${a('/blog/roost-podcast-ep-10-voice-support', 'our voice support podcast episode')}.`),
        ],
      },
    ],
  },
  carousel: {
    title: 'Five calls Kestrel Voice takes every day',
    sub: 'The routine calls that fill a queue, handled start to finish',
    items: [
      {
        title: 'Rebooking',
        subtitle: 'Appointments that no longer fit',
        bullets: [
          { lead: 'Offers', text: 'the three nearest slots instead of reading out a whole diary.' },
          { lead: 'Moves', text: 'the booking and releases the old slot for someone else.' },
          { lead: 'Texts', text: 'the new time and any preparation steps straight away.' },
        ],
        art: { scene: 'outreach', tint: 'lavender' },
      },
      {
        title: 'Payments',
        subtitle: 'Balances, plans and missed payments',
        bullets: [
          { lead: 'Explains', text: 'the balance and what makes it up, line by line.' },
          { lead: 'Takes', text: 'card details through a secure keypad step, never by voice.' },
          { lead: 'Sets up', text: 'a plan when the caller is eligible under your rules.' },
        ],
        art: { scene: 'queue', tint: 'yellow' },
      },
      {
        title: 'Outages',
        subtitle: 'Status on the busiest nights',
        bullets: [
          { lead: 'Checks', text: 'the caller’s address against the live incident feed.' },
          { lead: 'Gives', text: 'the latest estimate and offers a text when it changes.' },
          { lead: 'Flags', text: 'priority customers for an immediate transfer.' },
        ],
        art: { scene: 'chart', tint: 'pink' },
      },
      {
        title: 'Claims',
        subtitle: 'First reports after something goes wrong',
        bullets: [
          { lead: 'Asks', text: 'the questions your claim form needs, in a natural order.' },
          { lead: 'Opens', text: 'the claim and reads back the reference number.' },
          { lead: 'Sends', text: 'a secure upload link for photos and receipts.' },
        ],
        art: { scene: 'flow', tint: 'green' },
      },
      {
        title: 'Account changes',
        subtitle: 'Addresses, names and contact details',
        bullets: [
          { lead: 'Verifies', text: 'the caller with your existing identity steps first.' },
          { lead: 'Updates', text: 'the record and confirms the change out loud.' },
          { lead: 'Notes', text: 'the call on the ticket for anyone who looks later.' },
        ],
        art: { scene: 'lock', tint: 'peach' },
      },
    ],
  },
  explainer: {
    title: 'What the caller never hears: the checks behind every call',
    sub: 'Rules that travel with the conversation',
    cta: { label: 'Learn more', href: '/product/guardrails' },
    art: { scene: 'phone', tint: 'yellow' },
    paragraphs: [
      'Every call follows the same playbooks and safeguards as your written channels: identity checks before account details, required disclosures read in full, payment details taken by keypad and never spoken, and clinical or vulnerable callers passed to trained staff at once.',
      'Every call is transcribed, scored and kept for audit.',
      'Recordings follow the retention rules for your chosen region.',
    ],
  },
  caseStudy: {
    title: 'A winter on the outage line',
    sub: 'Customer story: Voltway Energy',
    cardTitle: 'Voltway Energy’s outage line stayed calm through a winter of storms',
    body: `Voltway moved its outage line to Kestrel Voice before the winter peak. The agent checks each caller’s address against the live outage feed, gives the latest restoration estimate, offers text updates and recognises priority customers for an immediate transfer. Answer times stayed under ten seconds on the busiest nights. ${a(cs('voltway-outage-updates'), 'Read the Voltway story')}`,
    cta: { label: 'Learn more', href: cs('voltway-outage-updates') },
    art: { scene: 'phone', tint: 'peach' },
  },
  related: {
    title: 'What else should I read about AI phone support?',
    links: [
      a('/blog/roost-podcast-ep-10-voice-support', 'The Roost podcast: what voice support is good for'),
      a('/articles/first-response-time-explained', 'First response time explained, channel by channel'),
      a('/articles/support-team-scheduling', 'Scheduling a support team around voice peaks'),
      a('/articles/escalation-paths', 'Designing escalation paths that customers barely notice'),
      a('/product/outbound', 'Outreach calls and texts with Kestrel'),
    ],
  },
  faq: {
    title: 'Questions teams ask before moving a phone line',
    items: [
      { q: 'Can Kestrel Voice use our existing phone numbers?', a: 'Yes. Calls can be forwarded from your current telephony provider or contact centre platform, or Kestrel can provide local numbers in supported countries.' },
      { q: 'How natural does the voice sound?', a: 'Callers hear a natural voice with sensible pacing, and you choose the voice and accent per brand. The agent handles interruptions and pauses the way a person would on the line.' },
      { q: 'What happens if the caller wants a person?', a: 'The agent transfers the call to your team with a short summary, following your routing rules and opening hours. Outside hours, it offers a callback or a text follow-up.' },
      { q: 'How are payments taken on a call?', a: 'Through a secure keypad step connected to your payment provider. Card numbers are never spoken aloud, transcribed or stored in the conversation record.' },
      { q: 'Are voice calls reviewed like chat conversations?', a: 'Yes. Every call is transcribed and scored by the review queue with the same rubric, so quality is comparable across voice and written channels.' },
      { q: 'How quickly can we put Kestrel Voice on a live line?', a: 'If your playbooks already run in chat or email, a voice line can usually go live within a week: most of the work is call forwarding, choosing a voice and running test calls. Teams new to Kestrel typically launch voice two to four weeks after kickoff.' },
      { q: 'Can Kestrel Voice make outbound calls too?', a: `Yes. With ${a('/product/outbound', 'Outreach')}, the same agent can call customers about an appointment, a missed payment or an outage, handle whatever they say in reply and fall back to a text if nobody answers.` },
      { q: 'Which languages does Kestrel Voice support?', a: 'English, Spanish, French, German and Portuguese are available today, with more in testing. The agent can switch language when the caller does.' },
    ],
  },
}
