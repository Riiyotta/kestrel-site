// AEO detail pages – SPEC_PAGES_A T1 (/product/<slug>; the three /industry pages live in industryPages.js and are
// merged by `getAeoPage`). Rendered by src/pages/product/AeoDetail.jsx.
// Original placeholder copy for the fictional product "Kestrel"; customers are the fictional companies of
// stories.js, compared tools are generic CATEGORIES (never named vendors). Lengths follow the spec roles:
//   hero H1 ≈47–56 chars, lede ≈94–213, intro ≈420–460 (optional), tools block (intro, 3 result bullets, lead-in,
//   2 bullets, closing p, H3 + 5–7 comparison rows, further-reading line), band ≈44, 3 rows (eyebrow ≈11–15,
//   H3 ≈37–57, body ≈195–215), callout (H3 ≈44, body ≈204), related (H3 ≈44 + 4–5 links), FAQ (H2 ≈58,
//   6–7 Q ≈41–67 + A ≈180–380).
// `art` = { scene, tint } for the static ProductArt panels (src/components/product/ProductArt.jsx).
import { industryPages } from './industryPages.js'

/** @type {(html: string) => import('./types.js').RichTextBlock} */
export const p = (html) => ({ type: 'p', html })
/** @type {(...items: string[]) => import('./types.js').RichTextBlock} */
export const ul = (...items) => ({ type: 'ul', items })
export const a = (href, label) => `<a href="${href}">${label}</a>`
const cs = (slug) => `/customer-stories/${slug}`

const CALLOUT_CTA = { label: 'Book a demo', href: '/get-a-demo' }

// Story items for the T1.6 "wide" slideshow (stock photos from public/assets/photos, see IMAGE_CREDITS.md).
export const WIDE_STORIES = [
  {
    quote: '“Our members used to wait two days for a statement fix. Now most of them have it sorted before they finish their coffee.”',
    name: 'Ruth Achterberg',
    role: 'Director of Member Care, Coinwell',
    img: '/assets/photos/story-2.webp',
    logo: { name: 'Coinwell', shape: 'ring', w: 120, h: 28 },
    href: cs('coinwell-card-disputes'),
  },
  {
    quote: '“Kestrel took the repetitive half of tax season off our desks, so the specialists finally had time for the hard returns.”',
    name: 'Jonah Pereira',
    role: 'Head of Support, Ledgerly',
    img: '/assets/photos/story-4.webp',
    logo: { name: 'Ledgerly', shape: 'bars', w: 120, h: 28 },
    href: cs('ledgerly-handles-tax-season'),
  },
  {
    quote: '“We gave it our hardest onboarding questions in week one and it held up. That is when the team started trusting it.”',
    name: 'Selin Kaya',
    role: 'VP Customer Operations, Stackhouse',
    img: '/assets/photos/story-1.webp',
    logo: { name: 'Stackhouse', shape: 'square', w: 120, h: 28 },
    href: cs('stackhouse-onboarding-workflows'),
  },
  {
    quote: '“Night shifts are calmer now. Patients get billing answers at 2am, and anything clinical lands with a nurse by morning.”',
    name: 'Amara Okonjo',
    role: 'Patient Services Lead, Mendwell Clinics',
    img: '/assets/photos/story-5.webp',
    logo: { name: 'Mendwell', shape: 'plus', w: 120, h: 28 },
    href: cs('mendwell-billing-clarity'),
  },
]

const productPages = [
  // ---------------------------------------------------------------- /product/ai-agents
  {
    slug: 'ai-agents',
    docTitle: 'Kestrel Agent | AI agents that finish the job',
    hero: {
      title: 'An AI support agent that finishes what customers came to do',
      lede: 'Kestrel Agent reads the account, follows your playbooks and makes the change your customer asked for, in chat, email, voice or text, then logs every step it took.',
      intro: `Most support bots stop at an answer. Kestrel Agent keeps going: it checks identity, looks up the order, booking or policy in question, applies the rule your team wrote, and updates the system of record before it replies. When a case needs judgement it hands over with a short summary, so nobody starts again. At Coinwell, the agent now settles three in four statement queries on its own, and response times on the remaining cases fell by half (${a(cs('coinwell-card-disputes'), 'read the Coinwell story')}).`,
      art: { scene: 'chat', tint: 'pink' },
    },
    tools: {
      title: 'Which AI agents can change an account, not just explain it?',
      items: [
        {
          blocks: [
            p('<strong>Kestrel</strong> is designed for support where a reply is only useful if something actually changes: a refund issued, a card frozen, an address updated. Results our customers have shared:'),
            ul(
              `<strong>Coinwell</strong> (consumer cards): three in four statement and dispute queries resolved without a person. ${a(cs('coinwell-card-disputes'), 'Read the story')}`,
              `<strong>Ledgerly</strong> (tax software): the agent handled the bulk of filing-week volume while specialists took complex returns. ${a(cs('ledgerly-handles-tax-season'), 'Read the story')}`,
              `<strong>Stackhouse</strong> (B2B software): onboarding questions answered inside the product, with set-up tasks completed for the admin. ${a(cs('stackhouse-onboarding-workflows'), 'Read the story')}`,
            ),
            p('<strong>Other options teams weigh up:</strong>'),
            ul(
              '<strong>Rule-based chatbots</strong> route customers through menus and link to articles; anything outside the tree goes to a queue.',
              '<strong>Helpdesk add-on assistants</strong> draft replies from your help centre but rarely have permission to act in billing or core systems.',
            ),
            p(`For a category-by-category view, see ${a('/competitors', 'how Kestrel compares')} or the ${a('/competitors/kestrel-vs-legacy-chatbots', 'legacy chatbot comparison')}.`),
          ],
        },
        {
          title: 'How do the main kinds of support automation differ?',
          blocks: [
            ul(
              '<strong>Takes actions:</strong> Kestrel: yes, through connected tools with approval rules. Rule-based bots: only fixed integrations. Helpdesk assistants: mostly drafting.',
              '<strong>Channels:</strong> Kestrel: chat, email, voice, text and messaging apps on one set of playbooks. Rule-based bots: usually web chat. Helpdesk assistants: the suite’s own channels.',
              '<strong>Changing behaviour:</strong> Kestrel: edit a playbook in plain language and run a test before release. Rule-based bots: redraw the flow. Helpdesk assistants: macros and rules.',
              '<strong>Quality checks:</strong> Kestrel: every conversation scored in the review queue. Rule-based bots: containment reports. Helpdesk assistants: suite analytics.',
              '<strong>Hand-off:</strong> Kestrel: summary plus the steps already taken. Rule-based bots: transcript only. Helpdesk assistants: varies by setup.',
              '<strong>Pricing basis:</strong> Kestrel: per resolved case. Rule-based bots: seats or sessions. Helpdesk assistants: add-on fees on top of seats.',
            ),
            p(`Further reading: ${a('/product/how-it-works', 'how Kestrel works')}, ${a('/product/guardrails', 'safeguards')}, ${a('/product/quality-assurance', 'review queue')}, ${a('/pricing', 'pricing')}, ${a('/integrations', 'connectors')} and ${a('/product/trust', 'security')}.`),
          ],
        },
      ],
    },
    band: 'Built to resolve every case, from the first message right through to the last',
    rows: [
      {
        eyebrow: 'Agent',
        title: 'How does the agent know what it is allowed to do?',
        body: 'Each playbook lists the steps, the systems involved and the limits. The agent follows it line by line, asks for confirmation before anything irreversible, and stops to hand over when a limit is reached.',
        art: { scene: 'flow', tint: 'lavender' },
      },
      {
        eyebrow: 'Copilot',
        title: 'Who writes and maintains those playbooks over time?',
        body: 'Your operations team, with Copilot doing the heavy lifting. Describe the process in a sentence or two, and Copilot drafts the playbook, connects the right tools and suggests test cases to try first.',
        art: { scene: 'queue', tint: 'yellow' },
      },
      {
        eyebrow: 'Review queue',
        title: 'How do you know the agent is getting it right?',
        body: 'Every conversation is graded against your own rubric, from accuracy to tone. Low scores land in a review queue with the reason attached, so a lead can fix the playbook rather than chase single tickets.',
        art: { scene: 'review', tint: 'green' },
      },
    ],
    stories: { title: 'Which teams already run Kestrel Agent?', tint: 'pink', items: WIDE_STORIES },
    callout: {
      title: 'Can one agent cover every channel you support?',
      body: 'Yes. The same playbooks run in web chat, email, voice, text and messaging apps, and the agent remembers the customer when they switch from one to another, so context never has to be repeated twice.',
      cta: CALLOUT_CTA,
      art: { scene: 'channels', tint: 'lavender' },
    },
    related: {
      title: 'What should you read before choosing an agent?',
      links: [
        a('/articles/ai-agent-guardrails', 'Setting guardrails for an AI agent you can defend'),
        a('/articles/ai-support-first-90-days', 'The first ninety days with an AI support agent'),
        a('/articles/escalation-paths', 'Designing escalation paths that customers barely notice'),
        a('/blog/five-lessons-from-a-year-of-ai-escalations', 'Five lessons from a year of AI-to-human hand-offs'),
        a('/articles/support-metrics-that-matter', 'Support metrics worth tracking once an agent goes live'),
      ],
    },
    faq: {
      title: 'Kestrel Agent: the questions buyers ask most often',
      items: [
        {
          q: 'What does Kestrel Agent actually do for a customer?',
          a: 'It works the case the way a trained teammate would: it confirms who the customer is, reads the relevant records, applies your playbook and makes the change, such as a refund, a booking or an account update. It then confirms the outcome and writes a note on the ticket.',
        },
        {
          q: 'How is this different from a chatbot built on decision trees?',
          a: 'A decision tree can only follow the paths someone drew in advance. Kestrel Agent understands free-form requests, works across several systems in one conversation and adapts the order of steps to the situation, while staying inside the limits set in each playbook.',
        },
        {
          q: 'Which systems can the agent read from and write to?',
          a: `Helpdesks, billing tools, order systems, CRMs and your own internal APIs. Each connection has scoped permissions, and sensitive actions can require approval. The current list is in the ${a('/integrations', 'connector library')}.`,
        },
        {
          q: 'What happens when the agent is not sure what to do?',
          a: 'It stops and hands over. The person who picks up the case sees a summary of the request, the data already checked and the steps already taken, so the customer is never asked to repeat themselves and the agent never improvises outside a playbook.',
        },
        {
          q: 'How long does it take to go live with real customers?',
          a: 'Most teams launch a first set of simple playbooks within two weeks and add integrated workflows over the following month. A Kestrel engineer works alongside your team through launch and stays involved afterwards.',
        },
        {
          q: 'Can we control the tone and personality of the agent?',
          a: 'Yes. Tone, vocabulary and formality are set per brand and channel, with examples your team approves. The review queue scores tone alongside accuracy, so drift shows up in the weekly report rather than in a complaint from a customer.',
        },
        {
          q: 'How is Kestrel Agent priced?',
          a: `Pricing is based on resolved cases rather than seats, so cost follows outcomes. Plans and rates are on the ${a('/pricing', 'pricing page')}.`,
        },
      ],
    },
  },

  // ---------------------------------------------------------------- /product/guardrails
  {
    slug: 'guardrails',
    docTitle: 'Kestrel Safeguards | Runtime checks for AI support',
    hero: {
      title: 'Safeguards that check every reply before it is sent',
      lede: 'Policy checks, approval steps and data rules run on every turn of every conversation, so the agent stays inside the lines your compliance team drew.',
      intro: `Safeguards sit between the agent and the customer. Before a reply goes out, Kestrel checks it against your rules: required disclosures, banned promises, tone, personal data and the limits on each action. A refund above a threshold waits for a person; a message that mentions a medical symptom goes to a clinician. Every check is logged with its result, so audits rely on records rather than memory (${a('/product/trust', 'see how data is handled')}).`,
      art: { scene: 'shield', tint: 'lavender' },
    },
    tools: {
      title: 'Which AI support tools let you enforce policy at runtime?',
      items: [
        {
          blocks: [
            p('<strong>Kestrel Safeguards</strong> turn written policy into checks that run while the conversation happens, not in a report a week later. How customers use them:'),
            ul(
              `<strong>Coinwell</strong>: refund limits and dispute disclosures enforced on every card conversation. ${a(cs('coinwell-card-disputes'), 'Read the story')}`,
              `<strong>Brindle Health</strong>: anything that sounds clinical is routed to a nurse with the context attached. ${a(cs('brindle-health-after-hours'), 'Read the story')}`,
              `<strong>Halden Power</strong>: customers in vulnerable circumstances recognised and handed to a specialist team. ${a(cs('halden-power-moving-home'), 'Read the story')}`,
            ),
            p('<strong>How other approaches handle risk:</strong>'),
            ul(
              '<strong>Prompt-only controls</strong> put rules into the model instructions and hope they hold under pressure.',
              '<strong>After-the-fact sampling</strong> finds problems in a small slice of conversations, days after customers saw them.',
            ),
            p(`Related: ${a('/product/trust', 'security and data handling')} and ${a('/product/simulations', 'test runs before launch')}.`),
          ],
        },
        {
          title: 'How do runtime safeguards compare with other controls?',
          blocks: [
            ul(
              '<strong>When checks run:</strong> Kestrel: before each reply and each action. Prompt-only: never checked separately. Sampling: after the fact.',
              '<strong>Sensitive actions:</strong> Kestrel: thresholds and human approval per action. Prompt-only: model discretion. Sampling: not covered.',
              '<strong>Personal data:</strong> Kestrel: masked in logs and blocked from replies where not needed. Prompt-only: depends on wording. Sampling: reviewed later.',
              '<strong>Coverage:</strong> Kestrel: every conversation. Prompt-only: every conversation, unverified. Sampling: a small percentage.',
              '<strong>Audit trail:</strong> Kestrel: each check stored with its outcome. Prompt-only: none. Sampling: reviewer notes.',
            ),
            p(`Further reading: ${a('/articles/ai-agent-guardrails', 'a practical guide to agent guardrails')}, ${a('/product/quality-assurance', 'review queue')} and ${a('/pricing', 'plans')}.`),
          ],
        },
      ],
    },
    band: 'Rules your compliance team can actually read',
    rows: [
      {
        eyebrow: 'Policy checks',
        title: 'What kinds of rules can a safeguard enforce?',
        body: 'Required wording, forbidden promises, topics that must go to a person, limits on refunds or credits, and data that must never appear in a reply. Each rule is written in plain language and tested before release.',
        art: { scene: 'shield', tint: 'pink' },
      },
      {
        eyebrow: 'Approvals',
        title: 'Can a person sign off before money moves?',
        body: 'Yes. Any action can require approval above a threshold you set. The request appears in the queue with the reason and the evidence, and the agent tells the customer exactly what happens next while they wait.',
        art: { scene: 'queue', tint: 'yellow' },
      },
      {
        eyebrow: 'Audit log',
        title: 'Can you prove what happened in a given conversation?',
        body: 'Every reply and action carries a record of the checks it passed, the playbook version in use and who approved what. Exports are ready for an auditor or a regulator without anyone rebuilding the story.',
        art: { scene: 'lock', tint: 'green' },
      },
    ],
    callout: {
      title: 'Do safeguards slow conversations down?',
      body: 'Checks run in parallel with the reply and usually add well under a second. Customers notice nothing, except that the answer they get is one your compliance team would have been happy to sign their name under.',
      cta: CALLOUT_CTA,
      art: { scene: 'chat', tint: 'lavender' },
    },
    related: {
      title: 'Where can I learn more about safe AI support?',
      links: [
        a('/articles/ai-agent-guardrails', 'Setting guardrails for an AI agent you can defend'),
        a('/blog/what-good-cx-looks-like-in-regulated-industries', 'What good service looks like in regulated industries'),
        a('/articles/escalation-paths', 'Designing escalation paths that customers barely notice'),
        a('/product/trust', 'How Kestrel stores, masks and deletes customer data'),
      ],
    },
    faq: {
      title: 'Kestrel Safeguards: questions from risk and compliance teams',
      items: [
        {
          q: 'Who writes the rules that safeguards enforce?',
          a: 'Usually operations and compliance together. Rules are plain-language statements, such as “never promise a refund date”, and Copilot can turn an existing policy document into a first draft for your team to edit and approve.',
        },
        {
          q: 'What happens when a reply fails a check?',
          a: 'The reply is not sent. Depending on the rule, the agent rewrites the answer within the limits, asks the customer a clarifying question, or hands the case to a person with the failed check highlighted.',
        },
        {
          q: 'Can different rules apply to different products or regions?',
          a: 'Yes. Safeguards can be scoped by brand, product line, region or customer segment, so a lending conversation in one market follows different disclosures from a savings conversation in another.',
        },
        {
          q: 'How are safeguards tested before they go live?',
          a: `Every change runs through ${a('/product/simulations', 'test runs')}: scripted customers try to push the agent past each rule, and the release only goes ahead when the results meet the bar you set.`,
        },
        {
          q: 'Is personal data kept out of logs and model training?',
          a: `Sensitive fields can be masked before storage, and customer conversations are never used to train models for anyone else. Details are on the ${a('/product/trust', 'security page')}.`,
        },
        {
          q: 'Do safeguards apply to human agents as well?',
          a: 'They can. The same checks can review draft replies written by your team in the helpdesk, which keeps human and AI answers consistent with one another.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------- /product/how-it-works
  {
    slug: 'how-it-works',
    docTitle: 'How Kestrel works | From playbook to resolved case',
    hero: {
      title: 'How Kestrel turns your procedures into resolved cases',
      lede: 'Connect your tools, describe each process as a playbook, rehearse it with test runs, then launch and review. Kestrel engineers stay with you at every stage, not just the kickoff.',
      selfServe: { link: 'Start a free trial', rest: 'to build your first playbook today, no sales call needed.', href: '/pricing' },
      art: { scene: 'flow', tint: 'yellow' },
    },
    tools: {
      title: 'What does it take to put an AI agent into production?',
      items: [
        {
          blocks: [
            p('<strong>Kestrel</strong> follows the same five steps with every customer: connect, write, test, launch, review. The order matters, because the testing and review steps are what keep the agent trustworthy after the novelty wears off. Recent launches:'),
            ul(
              `<strong>Patchwork</strong>: admin requests live in nine working days, starting with three playbooks. ${a(cs('patchwork-admin-requests'), 'Read the story')}`,
              `<strong>Voltway Energy</strong>: outage updates running across chat and text before the winter peak. ${a(cs('voltway-outage-updates'), 'Read the story')}`,
              `<strong>Mendwell Clinics</strong>: billing explanations launched after two rounds of test runs with the finance team. ${a(cs('mendwell-billing-clarity'), 'Read the story')}`,
            ),
            p('<strong>Other ways teams get started:</strong>'),
            ul(
              '<strong>Building in-house</strong> on a model API gives full control but leaves evaluation, safety and tooling to your own engineers.',
              '<strong>Services-led projects</strong> hand the build to a consultancy, which can make every later change a new statement of work.',
            ),
            p(`See the ${a('/competitors/kestrel-vs-build-your-own', 'build-your-own comparison')} for the trade-offs in detail.`),
          ],
        },
        {
          title: 'How do the main ways of launching compare?',
          blocks: [
            ul(
              '<strong>Time to first live case:</strong> Kestrel: days to a couple of weeks. In-house: months. Services-led: depends on the contract.',
              '<strong>Who owns changes:</strong> Kestrel: your ops team, with Copilot. In-house: your engineers. Services-led: the consultancy.',
              '<strong>Testing:</strong> Kestrel: built-in test runs on every change. In-house: whatever you build. Services-led: usually manual sign-off.',
              '<strong>Ongoing support:</strong> Kestrel: a named engineer after launch. In-house: your own on-call. Services-led: billed by the hour.',
              '<strong>Cost model:</strong> Kestrel: per resolved case. In-house: model usage plus headcount. Services-led: fees plus licences.',
            ),
            p(`Further reading: ${a('/product/ai-agents', 'the agent')}, ${a('/product/simulations', 'test runs')}, ${a('/product/quality-assurance', 'review queue')} and ${a('/integrations', 'connectors')}.`),
          ],
        },
      ],
    },
    band: 'Five steps, the same for every team we work with',
    rows: [
      {
        eyebrow: 'Connect',
        title: 'Which systems need to be connected on day one?',
        body: 'Only the ones your first playbooks touch. Most teams start with the helpdesk and one system of record, such as billing or orders, and add more as new playbooks need them. Each connection has scoped access.',
        art: { scene: 'channels', tint: 'lavender' },
      },
      {
        eyebrow: 'Write and test',
        title: 'How do playbooks get written and checked?',
        body: 'Describe the process to Copilot or paste in your existing macro. Kestrel drafts the playbook, then test runs throw dozens of scripted customers at it. You see every pass and failure before a real customer does.',
        art: { scene: 'test', tint: 'yellow' },
      },
      {
        eyebrow: 'Launch and review',
        title: 'What changes once real customers start talking to it?',
        body: 'You start with a slice of traffic and widen it as scores hold. The review queue grades every conversation, and the patterns it finds become the next round of playbook changes, tested the same way again.',
        art: { scene: 'review', tint: 'green' },
      },
    ],
    callout: {
      title: 'Who helps when something needs to change?',
      body: 'Every customer gets a named Kestrel engineer. They join your weekly review, ship playbook improvements with your team and watch the numbers between meetings, so change does not depend on a ticket in someone else’s backlog.',
      cta: CALLOUT_CTA,
      art: { scene: 'people', tint: 'peach' },
    },
    related: {
      title: 'What should I read before planning a launch?',
      links: [
        a('/articles/ai-support-first-90-days', 'The first ninety days with an AI support agent'),
        a('/blog/introducing-kestrel-workflows-studio', 'Introducing Workflows Studio for support operations'),
        a('/articles/writing-help-centre-articles', 'Writing help-centre articles an agent can rely on'),
        a('/articles/reducing-ticket-backlog', 'Clearing a ticket backlog before you automate it'),
      ],
    },
    faq: {
      title: 'How Kestrel works: answers for teams planning a rollout',
      items: [
        {
          q: 'Do we need engineers on our side to get started?',
          a: 'Not for most playbooks. Operations teams write and edit them in plain language. You may want an engineer for a custom internal API, and the Kestrel engineer assigned to you can usually handle that work directly.',
        },
        {
          q: 'How much of our traffic should go to the agent at launch?',
          a: 'We recommend starting with a single queue or a small share of one channel, then widening as review scores stay above your bar. Traffic can be moved back to people instantly at any time.',
        },
        {
          q: 'What happens to our existing macros and help articles?',
          a: 'They become raw material. Copilot reads them to draft playbooks and flags articles that contradict each other, which usually cleans up the help centre for human agents as well.',
        },
        {
          q: 'How often do playbooks change after launch?',
          a: 'Most teams ship small changes weekly. Each change is tested before it goes live and versioned, so any conversation can be traced back to the exact playbook it used.',
        },
        {
          q: 'Can we try Kestrel before talking to anyone?',
          a: `Yes. A ${a('/pricing', 'free trial')} lets you connect a sandbox, write a playbook and run tests on your own, then bring your team in when you are ready.`,
        },
        {
          q: 'What does the Kestrel engineer do week to week?',
          a: 'They review conversations with your leads, propose and ship playbook changes, investigate failed test runs and keep an eye on quality trends, so improvements keep arriving after the launch excitement fades.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------- /product/outbound
  {
    slug: 'outbound',
    docTitle: 'Kestrel Outreach | Proactive messages and calls',
    hero: {
      title: 'Outreach that contacts customers before they contact you',
      lede: 'Kestrel Outreach sends reminders, follow-ups and status updates by text, email or phone, and handles the replies with the same playbooks as your inbound support.',
      intro: `Many support tickets are questions a company could have answered first: “Has my payment gone through?”, “When is the engineer arriving?”, “Is my claim still open?” Outreach watches for the events behind those questions and gets in touch before the customer has to ask. When a customer replies, the conversation continues with full context, and the agent can reschedule, take a payment or hand over. Voltway Energy cut outage calls sharply this way (${a(cs('voltway-outage-updates'), 'read the Voltway story')}).`,
      art: { scene: 'outreach', tint: 'yellow' },
    },
    tools: {
      title: 'Which tools can start a conversation and then resolve it?',
      items: [
        {
          blocks: [
            p('<strong>Kestrel Outreach</strong> connects a trigger in your systems to a two-way conversation. It is not a broadcast tool: every message can be answered, and the answer is handled properly. Examples from customers:'),
            ul(
              `<strong>Voltway Energy</strong>: outage estimates sent by text, with replies about refunds and priority status handled automatically. ${a(cs('voltway-outage-updates'), 'Read the story')}`,
              `<strong>Halden Power</strong>: move-out readings requested ahead of the date, so final bills are right first time. ${a(cs('halden-power-moving-home'), 'Read the story')}`,
              `<strong>Mendwell Clinics</strong>: payment-plan offers sent after an adjusted invoice, with eligibility checked in the reply. ${a(cs('mendwell-billing-clarity'), 'Read the story')}`,
            ),
            p('<strong>What else teams use for proactive contact:</strong>'),
            ul(
              '<strong>Marketing platforms</strong> send at scale but route replies to an unmonitored inbox or a generic queue.',
              '<strong>Dialler software</strong> places calls for people to take, which keeps outreach tied to headcount.',
            ),
            p(`Read more on ${a('/product/voice', 'Kestrel Voice')} and ${a('/product/ai-agents', 'the agent')}.`),
          ],
        },
        {
          title: 'How does two-way outreach compare with the alternatives?',
          blocks: [
            ul(
              '<strong>Replies:</strong> Kestrel: handled by the agent with full context. Marketing platforms: collected, rarely answered. Diallers: a person on every call.',
              '<strong>Channels:</strong> Kestrel: text, email and voice from one playbook. Marketing platforms: email and text. Diallers: phone only.',
              '<strong>Triggers:</strong> Kestrel: events in billing, orders or field systems. Marketing platforms: segments and campaigns. Diallers: call lists.',
              '<strong>Consent and quiet hours:</strong> Kestrel: enforced as safeguards on every send. Marketing platforms: per campaign. Diallers: per list.',
              '<strong>Measured by:</strong> Kestrel: cases prevented and resolved. Marketing platforms: opens and clicks. Diallers: connect rates.',
            ),
            p(`Further reading: ${a('/product/guardrails', 'safeguards')}, ${a('/integrations', 'connectors')} and ${a('/pricing', 'pricing')}.`),
          ],
        },
      ],
    },
    band: 'Answer the question before anybody has to ask it',
    rows: [
      {
        eyebrow: 'Triggers',
        title: 'What kinds of events can start an outreach?',
        body: 'A failed payment, a delayed delivery, an expiring card, a claim that needs a document, an appointment tomorrow. Any event your systems already record can start a conversation, with rules for who gets contacted and when.',
        art: { scene: 'outreach', tint: 'pink' },
      },
      {
        eyebrow: 'Replies',
        title: 'What happens when a customer writes back?',
        body: 'The agent picks up the thread with everything that triggered the message. It can take the payment, move the slot, collect the missing document or answer a follow-up, and it hands over if the reply needs a person.',
        art: { scene: 'chat', tint: 'lavender' },
      },
      {
        eyebrow: 'Controls',
        title: 'How do you keep outreach welcome and not intrusive?',
        body: 'Consent, frequency caps, quiet hours and opt-outs run as safeguards on every send. You can preview a week of planned messages per segment and pause any outreach instantly if something upstream changes.',
        art: { scene: 'shield', tint: 'green' },
      },
    ],
    callout: {
      title: 'Can outreach place phone calls as well as texts?',
      body: 'Yes. With Kestrel Voice, the same playbook can call the customer, explain the situation in natural speech and finish the task on the call, falling back to a text with a link if nobody picks up the phone.',
      cta: CALLOUT_CTA,
      art: { scene: 'phone', tint: 'yellow' },
    },
    related: {
      title: 'What should I read about proactive support?',
      links: [
        a('/articles/reducing-ticket-backlog', 'Clearing a ticket backlog before you automate it'),
        a('/articles/measuring-customer-effort', 'Measuring customer effort, and lowering it on purpose'),
        a('/blog/roost-podcast-ep-10-voice-support', 'The Roost podcast: what voice support is good for'),
        a('/articles/support-metrics-that-matter', 'Support metrics worth tracking once an agent goes live'),
      ],
    },
    faq: {
      title: 'Kestrel Outreach: common questions about proactive contact',
      items: [
        {
          q: 'Is Outreach a replacement for our marketing platform?',
          a: 'No. Outreach is for service messages tied to a specific customer situation, where a reply needs handling. Promotional campaigns stay where they are, and the two can share consent records.',
        },
        {
          q: 'Which channels can Outreach use?',
          a: 'Text, email and phone calls, plus messaging apps where the customer has opted in. A single playbook can try one channel and fall back to another if there is no response.',
        },
        {
          q: 'How do we stop customers getting too many messages?',
          a: 'Frequency caps and quiet hours apply across every outreach playbook, so a customer with three open issues gets one combined message rather than three separate ones.',
        },
        {
          q: 'Can the agent take a payment in reply to an outreach?',
          a: 'Yes, through your payment provider, with the same identity checks and approval rules as an inbound conversation. Card details never pass through the conversation itself.',
        },
        {
          q: 'How do we measure whether outreach is working?',
          a: 'Kestrel compares inbound volume for the same reason before and after each playbook goes live, and reports how many outreach conversations ended in a completed task.',
        },
        {
          q: 'Can we test outreach without contacting real customers?',
          a: `Yes. ${a('/product/simulations', 'Test runs')} simulate the recipients and their replies, so you can check tone, timing and edge cases before anything is sent.`,
        },
      ],
    },
  },

  // ---------------------------------------------------------------- /product/quality-assurance
  {
    slug: 'quality-assurance',
    docTitle: 'Kestrel Review queue | Grade every conversation',
    hero: {
      title: 'A review queue that grades every single conversation',
      lede: 'Kestrel scores each conversation, human or AI, against your own rubric, then groups the misses by cause so leads fix the playbook instead of chasing tickets.',
      intro: `Sampling a few percent of tickets tells you how a lucky handful went. The review queue reads all of them. Each conversation is scored for accuracy, policy, tone and outcome; anything below your bar is queued with the reason and a suggested fix. Over a week, the queue shows which playbook steps cause the most trouble, which help articles mislead, and where people step in most often. Stackhouse uses it to run a thirty-minute weekly review (${a(cs('stackhouse-onboarding-workflows'), 'read the Stackhouse story')}).`,
      art: { scene: 'review', tint: 'green' },
    },
    tools: {
      title: 'Which QA tools review AI and human support together?',
      items: [
        {
          blocks: [
            p('<strong>Kestrel Review queue</strong> applies one rubric to every conversation, whoever handled it, and links each finding to the playbook or article that caused it. Customer examples:'),
            ul(
              `<strong>Stackhouse</strong>: weekly review cut to half an hour, with fixes shipped the same afternoon. ${a(cs('stackhouse-onboarding-workflows'), 'Read the story')}`,
              `<strong>Ledgerly</strong>: tax-season accuracy tracked daily across AI and human replies. ${a(cs('ledgerly-handles-tax-season'), 'Read the story')}`,
              `<strong>Patchwork</strong>: contradictory help articles found and merged in the first month. ${a(cs('patchwork-admin-requests'), 'Read the story')}`,
            ),
            p('<strong>Common alternatives:</strong>'),
            ul(
              '<strong>Manual QA sampling</strong> uses scorecards on a small share of tickets, chosen at random or by complaint.',
              '<strong>Survey-only measurement</strong> relies on satisfaction scores, which few customers answer and fewer explain.',
            ),
            p(`See also ${a('/product/coach', 'Copilot')} and ${a('/articles/csat-survey-design', 'designing better CSAT surveys')}.`),
          ],
        },
        {
          title: 'How does full-coverage review compare with sampling?',
          blocks: [
            ul(
              '<strong>Coverage:</strong> Kestrel: every conversation. Manual sampling: a few percent. Surveys: the customers who reply.',
              '<strong>Speed:</strong> Kestrel: scored minutes after the conversation ends. Manual sampling: days to weeks. Surveys: whenever replies arrive.',
              '<strong>Root cause:</strong> Kestrel: linked to the playbook step or article. Manual sampling: reviewer judgement. Surveys: rarely available.',
              '<strong>Consistency:</strong> Kestrel: one rubric applied the same way each time. Manual sampling: varies by reviewer. Surveys: varies by mood.',
              '<strong>Action:</strong> Kestrel: suggested fix, tested before release. Manual sampling: coaching notes. Surveys: a trend line.',
            ),
            p(`Further reading: ${a('/articles/support-metrics-that-matter', 'support metrics that matter')}, ${a('/product/simulations', 'test runs')} and ${a('/product/guardrails', 'safeguards')}.`),
          ],
        },
      ],
    },
    band: 'Fix the cause once, not the ticket a hundred times',
    rows: [
      {
        eyebrow: 'Rubrics',
        title: 'What does a review actually score?',
        body: 'Whatever your team cares about. Typical rubrics cover correct information, policy compliance, tone, effort for the customer and whether the problem was actually solved. Each criterion has its own weight and pass mark.',
        art: { scene: 'review', tint: 'lavender' },
      },
      {
        eyebrow: 'Themes',
        title: 'How are individual misses turned into patterns?',
        body: 'Low-scoring conversations are clustered by cause, such as an outdated article, a missing playbook step or an unclear policy. Leads see the five biggest causes each week instead of five hundred separate tickets.',
        art: { scene: 'chart', tint: 'yellow' },
      },
      {
        eyebrow: 'Fixes',
        title: 'What happens after a problem is found?',
        body: 'Copilot proposes a change to the playbook or article, test runs check it against past conversations, and a lead approves it. The next week’s scores show whether the fix held up in real traffic.',
        art: { scene: 'test', tint: 'green' },
      },
    ],
    callout: {
      title: 'Can the review queue score our human agents too?',
      body: 'Yes, with the same rubric. Leads get a fair, consistent view of coaching needs across the whole team, and agents can see their own scores and the reasoning behind them rather than a single number each month.',
      cta: CALLOUT_CTA,
      art: { scene: 'people', tint: 'pink' },
    },
    related: {
      title: 'Where can I read more about support quality?',
      links: [
        a('/articles/csat-survey-design', 'Designing CSAT surveys that people actually answer'),
        a('/articles/what-is-a-good-nps', 'What counts as a good NPS score for a support team'),
        a('/blog/roost-podcast-ep-12-quality-at-scale', 'The Roost podcast: keeping quality high at scale'),
        a('/articles/support-metrics-that-matter', 'Support metrics worth tracking once an agent goes live'),
      ],
    },
    faq: {
      title: 'Kestrel Review queue: what QA leads usually want to know',
      items: [
        {
          q: 'Does the review queue replace our QA team?',
          a: 'It changes their work. Instead of reading random tickets, reviewers calibrate the rubric, check the conversations the queue flags and decide which fixes to ship. Most teams find they cover far more ground with the same people.',
        },
        {
          q: 'How accurate are the automated scores?',
          a: 'Scores are calibrated against your reviewers during set-up, and you can see the reasoning for every score. Where a reviewer disagrees, the correction is used to tune the rubric for the future.',
        },
        {
          q: 'Can we bring our existing QA scorecard?',
          a: 'Yes. Copilot converts an existing scorecard into a rubric, keeping your criteria and weights, and suggests wording where a criterion is too vague to score consistently.',
        },
        {
          q: 'Which conversations does it review?',
          a: 'All of them, across chat, email, voice transcripts and messaging, whether the agent, a person or both handled the case. You can filter by channel, queue, playbook or team.',
        },
        {
          q: 'How quickly do scores appear?',
          a: 'Within a few minutes of the conversation closing. Urgent failures, such as a policy breach, can alert a lead straight away instead of waiting for the weekly review meeting.',
        },
        {
          q: 'Is review included in every plan?',
          a: `Review is included on every plan, with rubric limits and history by tier. Details are on the ${a('/pricing', 'pricing page')}.`,
        },
      ],
    },
  },

  // ---------------------------------------------------------------- /product/simulations
  {
    slug: 'simulations',
    docTitle: 'Kestrel Test runs | Rehearse before you release',
    hero: {
      title: 'Test runs that rehearse every playbook before release',
      lede: 'Scripted customers put each change through hundreds of realistic conversations, so you see passes, failures and edge cases before a real customer ever does.',
      intro: `A playbook that works for the happy path can still fail the customer who changes their mind halfway, gives a wrong date or gets angry. Test runs generate those customers on purpose. Each run plays a batch of conversations against the new version, scores them with your review rubric and compares the results with the version in production. If quality drops, the release waits. Patchwork ran over four hundred tests before its launch (${a(cs('patchwork-admin-requests'), 'read the Patchwork story')}).`,
      art: { scene: 'test', tint: 'lavender' },
    },
    tools: {
      title: 'How can you test an AI agent before customers meet it?',
      items: [
        {
          blocks: [
            p('<strong>Kestrel Test runs</strong> treat playbooks like software: every change is tested against a suite of conversations, and the suite grows each time a real conversation goes wrong. How customers use it:'),
            ul(
              `<strong>Patchwork</strong>: launch gated on a suite of several hundred scripted admin requests. ${a(cs('patchwork-admin-requests'), 'Read the story')}`,
              `<strong>Coinwell</strong>: every dispute-policy change replayed against last quarter’s hardest cases. ${a(cs('coinwell-card-disputes'), 'Read the story')}`,
              `<strong>Brindle Health</strong>: symptom-escalation rules tested with clinicians writing the scenarios. ${a(cs('brindle-health-after-hours'), 'Read the story')}`,
            ),
            p('<strong>How teams test without a dedicated tool:</strong>'),
            ul(
              '<strong>Manual spot checks</strong> have a few people chat with the agent before launch and note what feels off.',
              '<strong>Live A/B releases</strong> learn from real customers, which means some of them get the worse version.',
            ),
            p(`Related: ${a('/product/quality-assurance', 'review queue')} and ${a('/product/guardrails', 'safeguards')}.`),
          ],
        },
        {
          title: 'How do test runs compare with other testing approaches?',
          blocks: [
            ul(
              '<strong>Scale:</strong> Kestrel: hundreds of conversations per run. Spot checks: a handful. Live A/B: real traffic.',
              '<strong>Edge cases:</strong> Kestrel: generated on purpose, from angry to confused. Spot checks: whatever testers think of. Live A/B: whatever happens.',
              '<strong>Risk to customers:</strong> Kestrel: none before release. Spot checks: low coverage. Live A/B: real customers see failures.',
              '<strong>Regression:</strong> Kestrel: every new version compared with production. Spot checks: rarely repeated. Live A/B: slow to detect.',
              '<strong>Evidence:</strong> Kestrel: a scored report per release. Spot checks: notes. Live A/B: aggregate metrics.',
            ),
            p(`Further reading: ${a('/product/how-it-works', 'how Kestrel works')}, ${a('/articles/ai-support-first-90-days', 'the first ninety days')} and ${a('/pricing', 'plans')}.`),
          ],
        },
      ],
    },
    band: 'Find the awkward customer before the real one does',
    rows: [
      {
        eyebrow: 'Scenarios',
        title: 'Where do the test conversations come from?',
        body: 'Three places: scenarios your team writes, variations Kestrel generates around them, and real conversations that scored badly in review. Each failed real case can become a permanent test with one click.',
        art: { scene: 'chat', tint: 'yellow' },
      },
      {
        eyebrow: 'Comparisons',
        title: 'How do you know a change is actually better?',
        body: 'Each run scores the new version and the live version on the same conversations. The report shows what improved, what got worse and which scenarios changed outcome, so the decision rests on evidence.',
        art: { scene: 'chart', tint: 'lavender' },
      },
      {
        eyebrow: 'Release gates',
        title: 'Can a failing test run block a release?',
        body: 'Yes. You set the bar per playbook, for example no policy failures and accuracy above a threshold. A release that misses it stays in draft, with the failing conversations listed for whoever made the change.',
        art: { scene: 'shield', tint: 'green' },
      },
    ],
    callout: {
      title: 'Can test runs cover voice calls as well?',
      body: 'Yes. Simulated callers speak to the voice agent with background noise, interruptions and accents, and the run checks both what was said and what actions were taken during the call, then scores the results.',
      cta: CALLOUT_CTA,
      art: { scene: 'phone', tint: 'lavender' },
    },
    related: {
      title: 'What should I read about testing AI agents?',
      links: [
        a('/articles/ai-agent-guardrails', 'Setting guardrails for an AI agent you can defend'),
        a('/blog/introducing-kestrel-workflows-studio', 'Introducing Workflows Studio for support operations'),
        a('/articles/escalation-paths', 'Designing escalation paths that customers barely notice'),
        a('/blog/roost-podcast-ep-11-first-90-days', 'The Roost podcast: what the first ninety days teach'),
      ],
    },
    faq: {
      title: 'Kestrel Test runs: questions teams ask before they release',
      items: [
        {
          q: 'How long does a test run take?',
          a: 'A typical run of a few hundred conversations finishes in minutes. Larger suites run in the background, and you get a notification with the report when they are done.',
        },
        {
          q: 'Do test runs touch our real systems?',
          a: 'No. Runs use sandboxed copies of your connectors with test data, so a simulated refund never moves real money and a simulated booking never takes a real slot.',
        },
        {
          q: 'Who writes the test scenarios?',
          a: 'Anyone on the team, in plain language: who the customer is, what they want and how they behave. Kestrel then generates variations so one written scenario covers many realistic versions.',
        },
        {
          q: 'Can we re-run old conversations against a new version?',
          a: 'Yes. Past conversations can be replayed with the new playbook to see whether the outcome would change, which is the quickest way to check a fix for a known problem.',
        },
        {
          q: 'What does a test run report show?',
          a: 'Pass rates per scenario, score changes against the live version, every failed conversation with the reason, and the actions the agent attempted. Reports are kept with each released version.',
        },
        {
          q: 'Are test runs included in the free trial?',
          a: `Yes, with a smaller monthly allowance. Limits for each plan are listed on the ${a('/pricing', 'pricing page')}.`,
        },
      ],
    },
  },

  // ---------------------------------------------------------------- /product/trust
  {
    slug: 'trust',
    docTitle: 'Kestrel Security | How customer data is protected',
    hero: {
      title: 'Security built for teams that answer to regulators',
      lede: 'Kestrel is designed for companies that handle money, health and personal records: data stays in your chosen region, access is scoped, and every action is on the record.',
      intro: `Security reviews for AI tools tend to stall on the same questions: where does the data go, who can see it, what can the model do on its own, and how would we know if something went wrong? Kestrel answers each one in writing. Conversations are encrypted in transit and at rest, hosted in the region you pick and never used to train models for other customers. Agent actions run through scoped connectors with approvals, and every step is logged (${a('/product/guardrails', 'see how safeguards work')}).`,
      art: { scene: 'lock', tint: 'lavender' },
    },
    tools: {
      title: 'What should a security review of an AI agent cover?',
      items: [
        {
          blocks: [
            p('<strong>Kestrel</strong> publishes its security documentation up front so reviews take weeks rather than quarters. Teams that have been through the process:'),
            ul(
              `<strong>Coinwell</strong>: vendor review completed by its risk team ahead of the card-dispute launch. ${a(cs('coinwell-card-disputes'), 'Read the story')}`,
              `<strong>Brindle Health</strong>: patient data kept in-region, with clinical topics excluded from automation. ${a(cs('brindle-health-after-hours'), 'Read the story')}`,
              `<strong>Halden Power</strong>: vulnerable-customer data masked in logs and limited to a named team. ${a(cs('halden-power-moving-home'), 'Read the story')}`,
            ),
            p('<strong>Questions worth asking any vendor:</strong>'),
            ul(
              '<strong>Training and retention:</strong> is your data used to improve models for other customers, and how long is it kept?',
              '<strong>Action control:</strong> can the AI change records on its own, and what stops it from going further than intended?',
            ),
            p(`The ${a('/competitors', 'comparison pages')} cover how different categories of tool answer these.`),
          ],
        },
        {
          title: 'How does Kestrel handle the common review topics?',
          blocks: [
            ul(
              '<strong>Hosting:</strong> dedicated regions in Europe, the UK, North America and Asia-Pacific; data stays where you choose.',
              '<strong>Encryption:</strong> TLS in transit and AES-256 at rest, with customer-managed keys on enterprise plans.',
              '<strong>Model training:</strong> customer conversations are never used to train shared models.',
              '<strong>Access:</strong> single sign-on, role-based permissions and time-limited support access that you approve.',
              '<strong>Audit:</strong> annual independent audits, regular penetration tests and a full action log per conversation.',
              '<strong>Retention:</strong> configurable per data type, with deletion on request and on contract end.',
            ),
            p(`Further reading: ${a('/product/guardrails', 'safeguards')}, ${a('/articles/ai-agent-guardrails', 'agent guardrails guide')} and ${a('/integrations', 'connector permissions')}.`),
          ],
        },
      ],
    },
    band: 'Security answers ready before your review starts',
    rows: [
      {
        eyebrow: 'Data residency',
        title: 'Where is customer data stored and processed?',
        body: 'In the hosting region you select at set-up, including model processing. Data does not leave that region for support access, analytics or backups, and you can confirm this in the published sub-processor list.',
        art: { scene: 'lock', tint: 'green' },
      },
      {
        eyebrow: 'Access control',
        title: 'Who can see conversations and change playbooks?',
        body: 'Only the people you grant access to, through your identity provider. Roles separate who can read, edit, approve and release. Kestrel staff access is time-limited, logged and requires your explicit approval.',
        art: { scene: 'people', tint: 'lavender' },
      },
      {
        eyebrow: 'Action limits',
        title: 'What stops the agent from doing too much?',
        body: 'Connectors expose only the operations a playbook needs, with limits on amounts and frequency. Sensitive actions can require a person to approve them, and safeguards check each action before it runs.',
        art: { scene: 'shield', tint: 'yellow' },
      },
    ],
    callout: {
      title: 'Can we see the documentation before a call?',
      body: 'Yes. Audit reports, the security questionnaire, the data processing agreement and the sub-processor list are available under NDA from the trust portal, and our security team joins calls whenever needed.',
      cta: CALLOUT_CTA,
      art: { scene: 'queue', tint: 'peach' },
    },
    related: {
      title: 'Where can I read more about security and data?',
      links: [
        a('/articles/ai-agent-guardrails', 'Setting guardrails for an AI agent you can defend'),
        a('/blog/what-good-cx-looks-like-in-regulated-industries', 'What good service looks like in regulated industries'),
        a('/privacy-policy', 'The Kestrel privacy policy, in full and in plain English'),
        a('/terms-of-service', 'Terms of service for Kestrel customers and trial users'),
      ],
    },
    faq: {
      title: 'Kestrel security: questions from IT and procurement teams',
      items: [
        {
          q: 'Is our data used to train AI models?',
          a: 'Not for anyone else. Your conversations may be used to improve your own playbooks and rubrics if you allow it, but they never train shared models or models used by other Kestrel customers.',
        },
        {
          q: 'Which hosting regions are available?',
          a: 'Europe, the United Kingdom, North America and Asia-Pacific. You choose one at set-up, and processing, storage and backups stay within it.',
        },
        {
          q: 'Can we bring our own encryption keys?',
          a: 'Yes, on enterprise plans. Keys are held in your own key management service, and revoking them makes the stored data unreadable to Kestrel.',
        },
        {
          q: 'How are agent actions authorised?',
          a: 'Each connector uses a dedicated service account with only the permissions its playbooks need. Actions above set limits require approval, and every action is recorded with the playbook version that triggered it.',
        },
        {
          q: 'Do you sign data processing and business associate agreements?',
          a: 'Yes. Our standard data processing agreement is available up front, and we sign business associate agreements for healthcare customers that need them.',
        },
        {
          q: 'How do we report a security concern?',
          a: 'Through the trust portal or the security contact in your agreement. Reports are acknowledged within one business day, and researchers can use our responsible disclosure programme.',
        },
      ],
    },
  },
]

const ALL = [...productPages, ...industryPages]
const BY_SLUG = Object.fromEntries(ALL.map((pg) => [pg.slug, pg]))

// Defaults shared by every T1 page: the 11-logo ticker set (LogoMarquee DEFAULT_LOGOS) unless the page has its own.
export const getAeoPage = (slug) => BY_SLUG[slug]
export const aeoProductSlugs = productPages.map((pg) => pg.slug)
export const aeoIndustrySlugs = industryPages.map((pg) => pg.slug)
