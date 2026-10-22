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
    title: 'One support platform for the cases that actually matter',
    sub: 'Kestrel is an AI customer support platform for companies whose customers need more than an article link. Its agent works cases end to end across chat, email, voice, text and messaging apps, using playbooks your operations team writes in plain language and connectors into the systems you already run. Copilot helps that team build and improve playbooks, test runs rehearse every change before release, the review queue grades every conversation, and safeguards check each reply before it is sent. Pricing is per resolved case, with a free trial to start.',
  },
  tools: {
    title: 'Which support platforms can handle complex, regulated cases?',
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
        title: 'What does each kind of platform include?',
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
      title: 'Safeguards that check each reply before it is sent',
      body: 'Required wording, banned promises, data rules and action limits run on every turn. Sensitive actions can wait for approval, and every check is logged for audit.',
      cta: { label: 'See safeguards', href: '/product/guardrails' },
      art: { scene: 'shield', tint: 'peach' },
    },
  ],
  orbit: {
    title: 'Works with the tools your team already runs',
    body: 'Connect helpdesks, billing, order and scheduling systems, CRMs and your own APIs. Each connector has scoped permissions, so the agent only does what a playbook allows.',
    cta: { label: 'Browse the connector library', href: '/integrations' },
  },
  stories: {
    title: 'Who runs their support on Kestrel?',
    items: [
      {
        quote: '“We compared four platforms on real tickets from our queue. Kestrel was the only one that finished the job without help.”',
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
    title: 'What should I read before choosing a support platform?',
    links: [
      a('/articles/support-metrics-that-matter', 'Support metrics worth tracking once an agent goes live'),
      a('/articles/ai-support-first-90-days', 'The first ninety days with an AI support agent'),
      a('/articles/ai-agent-guardrails', 'Setting guardrails for an AI agent you can defend'),
      a('/blog/what-good-cx-looks-like-in-regulated-industries', 'What good service looks like in regulated industries'),
      a('/product/how-it-works', 'How Kestrel turns your procedures into resolved cases'),
    ],
  },
  faq: {
    title: 'The Kestrel platform: frequently asked questions',
    items: [
      {
        q: 'What is Kestrel, in one paragraph?',
        a: 'Kestrel is an AI customer support platform. Its agent resolves cases across chat, email, voice, text and messaging apps by following playbooks and acting in your systems. Copilot, test runs, the review queue and safeguards help your team keep it accurate and safe over time.',
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
        a: `A platform fee plus a rate per resolved case, so you pay for outcomes rather than seats. Plans are listed on the ${a('/pricing', 'pricing page')}, and a free trial is available.`,
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
      'Copilot is the assistant for the people who run support. It finds what is going wrong, suggests what to change and makes the change when you say so, from rewriting a playbook to cleaning up an outdated help article.',
      'Ask Copilot in plain language and it does the operational work for you: drafting playbooks from a description, connecting the tools they need, writing test scenarios, explaining why a score moved and proposing the fix. It works inside Kestrel and from your team chat, and every change it makes waits for your approval. During a free trial it also walks new teams through building their very first playbook.',
    ],
    art: { scene: 'queue', tint: 'brand' },
    tickerLine: 'Relied on by support leaders everywhere',
  },
  tools: {
    title: 'Which support platforms include an assistant that improves the AI agent for you?',
    items: [
      {
        blocks: [
          p(`<strong>Kestrel Copilot</strong> works across the whole platform, from first draft to weekly review. Stackhouse uses it to turn review findings into playbook changes the same day (${a(cs('stackhouse-onboarding-workflows'), 'read the Stackhouse story')}), and Patchwork built its first three playbooks with it in a week (${a(cs('patchwork-admin-requests'), 'Patchwork story')}).`),
          p('<strong>Other ways teams maintain an AI agent:</strong>'),
          ul(
            '<strong>Visual flow editors</strong> let ops teams draw and maintain conversation trees by hand, branch by branch.',
            '<strong>Engineering tickets</strong> route every change through a developer backlog, which slows small fixes down.',
          ),
          p(`See the ${a('/competitors/kestrel-vs-legacy-chatbots', 'legacy chatbot comparison')} and the ${a('/competitors/kestrel-vs-build-your-own', 'build-your-own comparison')}.`),
        ],
      },
      {
        title: 'How does Copilot compare with other ways of maintaining an agent?',
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
      title: 'What can Copilot do?',
      sub: 'Copilot sits across your whole operation, so you can ask it to investigate, explain or change things in plain language and stay informed at every step.',
      art: { scene: 'chat', tint: 'lavender' },
      items: [
        { title: 'Can Copilot set up Kestrel by conversation?', body: 'Playbooks, connectors, test runs and reports can all be created by simply asking.' },
        { title: 'Where can I talk to Copilot?', body: 'Inside Kestrel, in your team chat, or from the assistant tools you already use.' },
        { title: 'Does Copilot ever act without approval?', body: 'No. It proposes the change, shows a preview and waits for a person to approve.' },
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
      title: 'How does Copilot build and test playbooks?',
      sub: 'Describe the outcome you want and Copilot drafts the playbook, wires up the tools it needs and sets the rules for how your customers should be served.',
      art: { scene: 'flow', tint: 'lavender' },
      items: [
        { title: 'Build by describing', body: 'Explain the process the way you would to a new hire. Copilot drafts each step, asks about the gaps and connects the tools involved. You only step in for credentials and approvals.' },
        { title: 'Test automatically', body: 'Copilot writes scenarios around the new playbook, runs them and summarises what failed and why, then suggests changes and re-runs the suite until it passes.' },
        { title: 'Fix live conversations', body: 'Point Copilot at a conversation that went wrong and it traces the cause to a playbook step or article, then proposes a change you can test straight away.' },
      ],
    },
    {
      kind: 'block',
      layout: 'split',
      mediaSide: 'right',
      title: 'How does Copilot keep quality high?',
      sub: 'Copilot works with the review queue to score every conversation handled by your team or the agent, against standards you define.',
      art: { scene: 'review', tint: 'green' },
      items: [
        { title: 'Watch scores as they land', body: 'See review scores for the agent and your team in one place, with emerging problems highlighted as soon as a pattern appears.' },
        { title: 'Set the standard once', body: 'Describe what good looks like and Copilot turns it into a weighted rubric with pass marks, then calibrates it against your reviewers.' },
        { title: 'Get reports on request', body: 'Ask for a breakdown by channel, playbook or team and Copilot builds the chart and the summary, with no dashboard configuration required.' },
      ],
    },
    { kind: 'cta', title: 'Try Copilot', cta: { label: 'Book a demo', href: '/get-a-demo' } },
    {
      kind: 'block',
      layout: 'tabs-bottom',
      title: 'Can I ask Copilot about trends in everyday language?',
      sub: 'Ask about volumes, causes and outcomes the way you would ask a colleague, and Copilot answers with the numbers and the conversations behind them.',
      art: { scene: 'chart', tint: 'yellow' },
      items: [
        { title: 'Questions, not queries', body: 'Ask why repeat contacts rose in March and get the answer, with no report builder.' },
        { title: 'Grouped by cause', body: 'Conversations are clustered by underlying reason, so volume maps to fixable problems.' },
        { title: 'Early warnings', body: 'Copilot flags a topic that is growing fast before it turns into a queue problem.' },
      ],
    },
    {
      kind: 'block',
      layout: 'split',
      mediaSide: 'left',
      title: 'How does Copilot find and fix problems?',
      sub: 'When Copilot spots a gap, such as a missing article or a playbook step that confuses customers, it proposes a fix and applies it once you approve.',
      art: { scene: 'test', tint: 'pink' },
      items: [
        { title: 'Trace the cause', body: 'Copilot links each problem to its source, whether that is an article, a policy conflict or a playbook step, so you always know what changed and why.' },
        { title: 'Get a concrete proposal', body: 'Each finding comes with a specific change, such as a rewritten step or a merged article, ready to test against past conversations.' },
        { title: 'Keep the final say', body: 'Approve, edit or reject each proposal. Released changes are tracked, and Copilot reports whether they improved scores the following week.' },
      ],
    },
  ],
  related: {
    title: 'Where can I learn more about Copilot?',
    links: [
      a('/blog/introducing-kestrel-workflows-studio', 'Introducing Workflows Studio for support operations'),
      a('/blog/roost-podcast-ep-12-quality-at-scale', 'The Roost podcast: keeping quality high at scale'),
      a('/articles/writing-help-centre-articles', 'Writing help-centre articles an agent can rely on'),
      a('/articles/reducing-ticket-backlog', 'Clearing a ticket backlog before you automate it'),
    ],
  },
  faq: {
    title: 'Kestrel Copilot: frequently asked questions',
    items: [
      { q: 'Who is Copilot designed for?', a: 'Support operations leads, QA reviewers and team managers: the people who decide how support should work and need the agent to keep up with those decisions without filing engineering tickets.' },
      { q: 'Can Copilot change things without asking?', a: 'No. Every change Copilot proposes waits for a person with the right role to approve it, and every approved change is versioned and can be rolled back.' },
      { q: 'What data can Copilot see?', a: 'The same data the person asking can see. Copilot respects role-based permissions, so a team lead cannot use it to reach conversations or settings outside their own access.' },
      { q: 'Can Copilot work from our team chat?', a: 'Yes. Teams can ask questions and approve proposals from their chat tool, and longer work such as a test run sends a summary back to the thread when it finishes.' },
      { q: 'Is Copilot included in every plan?', a: `Copilot is included on all plans, with usage limits by tier. See the ${a('/pricing', 'pricing page')} for details.` },
      { q: 'Does Copilot replace the Kestrel engineer?', a: 'No. Copilot handles day-to-day operational changes; your named Kestrel engineer still joins reviews, handles complex integrations and helps plan larger changes.' },
    ],
  },
}

// ---------------------------------------------------------------------------------------------- /product/voice
export const voicePage = {
  docTitle: 'Kestrel Voice | Phone support that gets things done',
  hero: {
    title: 'Phone support that sounds calm and finishes the task',
    sub: 'Kestrel Voice answers and places calls in natural speech, looks things up while it talks and takes action before the caller hangs up.',
    intro: 'A voice agent is only useful if it can do more than read out an answer. Kestrel Voice works from the same playbooks as your chat and email support, so it can verify a caller, check an account, rebook an appointment or take a payment mid-call, then confirm the outcome by text. When a call needs a person, it transfers with a summary your agent sees before saying hello. Safeguards and review scores apply to every call, exactly as they do in chat. Voltway Energy moved its outage line onto Kestrel Voice ahead of winter and kept answer times under ten seconds through every storm.',
    art: { scene: 'phone', tint: 'brand' },
    tickerLine: 'Proud to support',
  },
  tools: {
    title: 'Which AI voice agents can handle complex support calls?',
    items: [
      {
        blocks: [
          p(`<strong>Kestrel Voice</strong> is built for calls where something has to change: a booking, a payment, a claim. Voltway Energy handled its winter outage peak on it (${a(cs('voltway-outage-updates'), 'read the Voltway story')}), and Brindle Health answers its after-hours line with clinical calls passed straight to a nurse (${a(cs('brindle-health-after-hours'), 'Brindle story')}). Voice pricing follows the same per-resolution model as other channels (${a('/pricing', 'pricing')}).`),
          p('<strong>Other approaches to automating calls:</strong>'),
          ul(
            '<strong>Menu-based IVR</strong> routes callers by keypad choices and rarely completes a task on the call itself.',
            '<strong>Voicebots on fixed scripts</strong> recognise a few intents and transfer anything outside them.',
          ),
          p(`See ${a('/competitors/kestrel-vs-phone-trees', 'Kestrel compared with phone trees and IVR')}.`),
        ],
      },
      {
        title: 'How do the main voice options compare on real calls?',
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
    title: 'Five habits of a good voice agent, and how Kestrel builds them in',
    sub: 'What callers notice, even when they cannot name it',
    items: [
      {
        title: 'Listening',
        subtitle: 'Hearing the whole problem first',
        bullets: [
          { lead: 'Lets', text: 'callers finish before replying, without awkward overlaps.' },
          { lead: 'Restates', text: 'the request briefly so the caller knows it was understood.' },
          { lead: 'Asks', text: 'one clarifying question at a time, never a list.' },
        ],
        art: { scene: 'phone', tint: 'lavender' },
      },
      {
        title: 'Pace',
        subtitle: 'Fast replies without rushing',
        bullets: [
          { lead: 'Responds', text: 'quickly enough that silence never feels like a dropped call.' },
          { lead: 'Fills', text: 'longer lookups with a short, natural update.' },
          { lead: 'Slows', text: 'down for numbers, dates and anything the caller must note.' },
        ],
        art: { scene: 'chart', tint: 'yellow' },
      },
      {
        title: 'Memory',
        subtitle: 'Context across calls and channels',
        bullets: [
          { lead: 'Recognises', text: 'returning callers and the case they called about before.' },
          { lead: 'Continues', text: 'a chat or email conversation by phone without repetition.' },
          { lead: 'Notes', text: 'every call on the ticket for the next person.' },
        ],
        art: { scene: 'queue', tint: 'pink' },
      },
      {
        title: 'Action',
        subtitle: 'Doing the work while talking',
        bullets: [
          { lead: 'Rebooks', text: 'appointments and deliveries while the caller listens.' },
          { lead: 'Takes', text: 'payments through a secure keypad step, never by voice.' },
          { lead: 'Confirms', text: 'the outcome by text the moment the call ends.' },
        ],
        art: { scene: 'flow', tint: 'green' },
      },
      {
        title: 'Judgement',
        subtitle: 'Knowing when a person should take over',
        bullets: [
          { lead: 'Hears', text: 'distress, urgency or complaints and responds with care.' },
          { lead: 'Transfers', text: 'warm, with a summary read before the agent says hello.' },
          { lead: 'Stays', text: 'within your safeguards on every single turn.' },
        ],
        art: { scene: 'shield', tint: 'peach' },
      },
    ],
  },
  explainer: {
    title: 'Can Kestrel Voice handle calls in regulated industries?',
    sub: 'Built for lenders, insurers and clinics',
    cta: { label: 'Learn more', href: '/product/guardrails' },
    art: { scene: 'phone', tint: 'yellow' },
    paragraphs: [
      'Every call follows the same playbooks and safeguards as your written channels: identity checks before account details, required disclosures read in full, payment details taken by keypad and never spoken, and clinical or vulnerable callers passed to trained staff at once.',
      'Every call is transcribed, scored and kept for audit.',
      'Recordings follow the retention rules for your chosen region.',
    ],
  },
  caseStudy: {
    title: 'Where is Kestrel Voice already answering calls?',
    sub: 'Teams that trust it on the phone',
    cardTitle: 'How did Voltway Energy keep its outage line calm through a winter of storms?',
    body: `Voltway moved its outage line to Kestrel Voice before the winter peak. The agent checks each caller’s address against the live outage feed, gives the latest restoration estimate, offers text updates and recognises priority customers for an immediate transfer. Answer times stayed under ten seconds on the busiest nights. ${a(cs('voltway-outage-updates'), 'Read the Voltway story')}`,
    cta: { label: 'Learn more', href: cs('voltway-outage-updates') },
    art: { scene: 'phone', tint: 'peach' },
  },
  related: {
    title: 'Where can I learn more about voice AI?',
    links: [
      a('/blog/roost-podcast-ep-10-voice-support', 'The Roost podcast: what voice support is good for'),
      a('/articles/first-response-time-explained', 'First response time explained, channel by channel'),
      a('/articles/support-team-scheduling', 'Scheduling a support team around voice peaks'),
      a('/articles/escalation-paths', 'Designing escalation paths that customers barely notice'),
      a('/product/outbound', 'Outreach calls and texts with Kestrel'),
    ],
  },
  faq: {
    title: 'Kestrel Voice: frequently asked questions',
    items: [
      { q: 'Can Kestrel Voice use our existing phone numbers?', a: 'Yes. Calls can be forwarded from your current telephony provider or contact centre platform, or Kestrel can provide local numbers in supported countries.' },
      { q: 'How natural does the voice sound?', a: 'Callers hear a natural voice with sensible pacing, and you choose the voice and accent per brand. The agent handles interruptions and pauses the way a person would on the line.' },
      { q: 'What happens if the caller wants a person?', a: 'The agent transfers the call to your team with a short summary, following your routing rules and opening hours. Outside hours, it offers a callback or a text follow-up.' },
      { q: 'How are payments taken on a call?', a: 'Through a secure keypad step connected to your payment provider. Card numbers are never spoken aloud, transcribed or stored in the conversation record.' },
      { q: 'Are voice calls reviewed like chat conversations?', a: 'Yes. Every call is transcribed and scored by the review queue with the same rubric, so quality is comparable across voice and written channels.' },
      { q: 'Which languages does Kestrel Voice support?', a: 'English, Spanish, French, German and Portuguese are available today, with more in testing. The agent can switch language when the caller does.' },
    ],
  },
}
