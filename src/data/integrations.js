// /integrations (SPEC_PAGES_A T3) and /integrations/<slug> (T4) content.
//   integrationsPage -> hero, ticker heading, setup steps + FAQ (T3.1, T3.2, T3.4)
//   categories       -> catalogue blocks (T3.3), in display order; `items` lists integration slugs
//   integrations     -> IntegrationCard props + optional `detail` (T4 pages exist only where `detail` is set)
// Integration names and logos are generic placeholders (PlaceholderLogo shapes), not real third-party brands.
// Some integrations sit in more than one category, so the catalogue shows 28 cards for 25 unique integrations.

/** @typedef {import('./types.js').RichTextBlock} RichTextBlock */

/**
 * @typedef {{
 *   slug: string, name: string, description: string,
 *   logo: { shape: 'circle'|'square'|'triangle'|'diamond'|'ring'|'bars'|'arc'|'plus' },
 *   website?: { label: string, href: string },
 *   detail?: { lede: string, category: string, sections: { heading: string, as: 'h2'|'h3', text: string }[] }
 * }} Integration
 */

export const integrationsPage = {
  title: 'Integration Library',
  // ≈200 chars, 3 lines in 793 @1440
  sub: 'Kestrel joins your stack through scoped connections you approve: it reads from the tools that hold customer context and writes back only where you allow it. Pick a category below to see what plugs in.',
  cta: { label: 'Browse every Kestrel integration →', href: '#catalog' },
  tickerHeading: 'Connected today at lenders, clinics, utilities and software companies',
  setup: {
    title: 'What setup really looks like',
    intro:
      'Connecting Kestrel is mostly approvals and a few working sessions, not code. This is the order we follow with every new team, with rough timings.',
    steps: [
      {
        title: '1. Map one queue (day one)',
        text: 'Pick a single queue or brand to start with. Kestrel reads the last ninety days of its tickets, groups them by intent and shows which intents are frequent and rule-bound enough to be worth handing over first.',
      },
      {
        title: '2. Grant scoped access',
        text: 'Each system gets its own service account and an allow-list of actions. An admin approves every action, and all of them start in dry-run until you say otherwise.',
      },
      {
        title: '3. Write the playbooks together',
        text: 'Your launch engineer pairs with a senior agent for a two-hour session per intent, turning how your best people already work into numbered steps with clear exit points.',
      },
      {
        title: '4. Run in shadow mode',
        text: 'Kestrel drafts replies on live tickets as internal notes. Agents mark each draft right or wrong, building a per-intent accuracy score.',
      },
      {
        title: '5. Promote intent by intent',
        text: 'When an intent holds your approval bar for a full week, promote it to live replies.',
      },
    ],
    support: [
      'A named launch engineer joins your team chat on day one and stays through the first ninety days, joining weekly reviews of shadow drafts. On Aerie, a launch squad also builds custom actions and sits in on change reviews.',
      'Most teams promote their first intent in week two or three of shadow mode; a core system with no API is what usually stretches that. Two illustrative examples from our own customers: Mendwell Clinics kept billing questions in shadow for ten days, promoted them once agents approved nineteen drafts in twenty, and now answers them around the clock, and Voltway Energy had outage-status calls live three weeks after kickoff, in time for the first winter storm.',
    ],
    faqTitle: 'Common questions',
    faq: [
      {
        q: 'When does Kestrel take its first live conversation?',
        blocks: [
          {
            type: 'p',
            html: 'Usually in the second or third week, once the first intent has cleared your approval bar in shadow mode. What moves that date is less the helpdesk than the systems behind it: a billing tool with a clean API can be connected in a morning, while a core platform reachable only through batch files takes longer. Every plan includes a named launch engineer, and nothing goes live until your agents have approved enough shadow drafts to trust it. For example, Mendwell Clinics went live on billing questions after ten days in shadow, and Voltway Energy took outage-status calls three weeks after kickoff.',
          },
        ],
      },
      {
        q: 'Which helpdesks and phone systems can it join?',
        blocks: [
          {
            type: 'p',
            html: 'If your helpdesk has a ready-made connector, an admin approves it in a few clicks. If not, Kestrel can work any queue that exposes a REST API or sends events, which our team wires up as part of the pilot through Open Queue. Teams with no helpdesk at all can run Kestrel Chat on its own. On the phone side, Kestrel takes calls by SIP transfer or plain call forwarding from most contact-centre platforms. What it cannot join is a system that offers neither an API nor events, and for those we usually suggest a nightly file sync as a stopgap.',
          },
        ],
      },
      {
        q: 'Can we take our records with us?',
        blocks: [
          {
            type: 'p',
            html: '<strong>Yes, at any time.</strong> Every conversation, decision log and review score is available through the API or as a nightly CSV drop to your own storage bucket. Retention is a setting you control per workspace, from 30 days to indefinitely, and closing an account triggers a purge you can watch complete in the audit log.',
          },
          { type: 'p', html: 'Our data processing agreement sets out the same terms in writing.' },
        ],
      },
    ],
  },
}

/** @type {Integration[]} */
export const integrations = [
  // Ticketing
  { slug: 'helpdesk', name: 'Helpdesk', logo: { shape: 'square' }, description: 'Kestrel picks up tickets in your helpdesk queue and writes its replies and notes straight back.' },
  { slug: 'crm', name: 'CRM', logo: { shape: 'circle' }, description: 'Read account history and update fields in your CRM, with every change stamped against the case that caused it.' },
  { slug: 'ticket-desk', name: 'Ticket Desk', logo: { shape: 'triangle' }, description: 'Tag, prioritise and close tickets using the views your team set up.' },
  { slug: 'messaging-desk', name: 'Messaging Desk', logo: { shape: 'triangle' }, description: 'Answer in-app and web messages in real time, then pass threads on intact.' },
  { slug: 'shared-inbox', name: 'Shared Inbox', logo: { shape: 'square' }, description: 'Work email threads in a shared inbox and assign the tricky ones to a named owner.' },
  { slug: 'sales-crm', name: 'Sales CRM', logo: { shape: 'plus' }, description: 'Log support outcomes on the deal so account managers see them first.' },
  { slug: 'team-chat', name: 'Team Chat', logo: { shape: 'bars' }, description: 'Ask Kestrel questions from team chat, approve flagged actions there, and get an alert when an intent dips in accuracy.' },
  { slug: 'support-inbox', name: 'Support Inbox', logo: { shape: 'diamond' }, description: 'Reply from your support inbox in each agent’s own signature and saved snippets.' },
  { slug: 'sdk', name: 'Kestrel SDK', logo: { shape: 'arc' }, description: 'Call Kestrel from your own app with the user’s context and render its reply in your UI.' },
  { slug: 'chat', name: 'Kestrel Chat', logo: { shape: 'arc' }, description: 'A drop-in chat widget for teams that do not run a helpdesk at all.' },
  { slug: 'care-desk', name: 'Care Desk', logo: { shape: 'circle' }, description: 'Work patient and member cases in your care desk, keeping consent notes on every record.' },
  { slug: 'crm-messaging', name: 'CRM Messaging', logo: { shape: 'circle' }, description: 'Transfer a live chat to a CRM Messaging agent with Kestrel’s summary pinned to the top of the thread.' },
  { slug: 'open-queue', name: 'Open Queue', logo: { shape: 'arc' }, description: 'Point Kestrel at any queue that exposes a REST API or emits events, set up during your pilot.' },
  // Telephony
  {
    slug: 'api',
    name: 'Kestrel API',
    logo: { shape: 'arc' },
    description: 'Hand Kestrel the caller’s details by API a moment before the call itself arrives',
    website: { label: 'kestrel.example', href: '#' },
    detail: {
      lede: 'Hand Kestrel the caller’s details by API a moment before the call itself arrives',
      category: 'Phone lines',
      sections: [
        {
          heading: 'Overview',
          as: 'h2',
          text: 'Most phone systems know more about a caller than the audio carries: the number they dialled from, the menu option they chose, the account they verified. The Kestrel API takes that context as a short JSON message and pairs it with the call that follows, so the first thing Kestrel says can already fit the caller.',
        },
        {
          heading: 'What it is',
          as: 'h3',
          text: 'It is a small REST endpoint, separate from call routing itself. You post a call reference plus whatever fields you trust, such as a verified customer ID, an open case number or a risk flag, and Kestrel holds them for up to two minutes waiting for the matching call. Fields you mark as verified skip Kestrel’s own identity questions, and fields you mark as hints only steer which playbook it opens. If no call arrives, the message expires quietly, and if a call arrives with no message, Kestrel simply starts from scratch the way it would on any forwarded line.',
        },
        {
          heading: 'How to integrate',
          as: 'h3',
          text: 'Create an API key in the Kestrel app and scope it to voice. In your contact-centre flow, add a step that posts the call reference and fields at the moment the call is answered by your menu, then transfer the call to your Kestrel number with the same reference in a SIP header. A test console in the app shows each message, whether it matched a call and which fields were used, so you can check the whole path on a test line before switching real traffic over.',
        },
      ],
    },
  },
  { slug: 'voice-cloud', name: 'Voice Cloud', logo: { shape: 'ring' }, description: 'Use your own numbers for calls and text follow-ups' },
  { slug: 'contact-center', name: 'Contact Center', logo: { shape: 'circle' }, description: 'Stream calls to Kestrel from your existing flows' },
  { slug: 'call-router', name: 'Call Router', logo: { shape: 'square' }, description: 'Send any menu branch to Kestrel and take it back if the caller asks for a person.' },
  // Knowledge base
  { slug: 'wiki', name: 'Wiki', logo: { shape: 'plus' }, description: 'Pull policy pages from your wiki and cite the page in each answer.' },
  { slug: 'knowledge-vault', name: 'Knowledge Vault', logo: { shape: 'ring' }, description: 'Answer from approved cards only, and flag any card that is past its review date.' },
  { slug: 'docs-suite', name: 'Docs Suite', logo: { shape: 'square' }, description: 'Read rate tables and policy documents from shared folders you choose.' },
  { slug: 'notes-workspace', name: 'Notes Workspace', logo: { shape: 'square' }, description: 'Sync team pages so Kestrel sees edits the moment they are saved.' },
  // Tools and actions
  {
    slug: 'mcp',
    name: 'MCP',
    logo: { shape: 'bars' },
    description: 'Give Kestrel the tools an MCP server exposes, one approval at a time',
    website: { label: 'modelcontextprotocol.io', href: '#' },
    detail: {
      lede: 'Give Kestrel the tools an MCP server exposes, one approval at a time',
      category: 'Actions and data',
      sections: [
        {
          heading: 'Overview',
          as: 'h2',
          text: 'Kestrel can connect to any server that speaks the Model Context Protocol. Each tool the server exposes becomes an action Kestrel can call inside a workflow, so your agent can look up records, update systems or run checks without you writing a separate connector for every task.',
        },
        {
          heading: 'What it is',
          as: 'h3',
          text: 'MCP is an open standard for describing tools to AI systems. Instead of building and maintaining one-off API actions, you point Kestrel at a server and choose which of its tools to allow. Read-only or write access is set per tool, every call is logged, and the same tools can be reused across workflows and teams, which keeps behaviour consistent as you add more topics and lets one team own a tool while others simply reuse it in their own workflows.',
        },
        {
          heading: 'How to integrate',
          as: 'h3',
          text: 'Add the server address and credentials in the Kestrel app, then review the tools it lists and switch on the ones you want. You can test each tool against sample tickets before using it in a live workflow. Your team hosts and maintains the server, and Kestrel provides the client, permission controls and the logs you need to check every call end to end, so you can see exactly which tool ran, with what input, and what it returned.',
        },
      ],
    },
  },
  { slug: 'billing', name: 'Billing', logo: { shape: 'square' }, description: 'Check invoices, issue credits and set up payment plans.' },
  { slug: 'storefront', name: 'Storefront', logo: { shape: 'triangle' }, description: 'Look up orders, change delivery slots and start returns.' },
  { slug: 'email-delivery', name: 'Email Delivery', logo: { shape: 'diamond' }, description: 'Send receipts and confirmations once a case is closed.' },
]

const bySlug = Object.fromEntries(integrations.map((i) => [i.slug, i]))

export const categories = [
  {
    id: 'ticketing',
    label: 'Helpdesk queues',
    description: [
      'Kestrel works tickets where your team already works them. No connector for your queue yet? Open Queue covers anything with a REST API or an event stream, and we set it up with you.',
    ],
    items: [
      'helpdesk', 'crm', 'ticket-desk', 'messaging-desk', 'shared-inbox', 'sales-crm', 'team-chat',
      'support-inbox', 'sdk', 'chat', 'care-desk', 'crm-messaging', 'open-queue',
    ],
  },
  {
    id: 'telephony',
    label: 'Phone lines',
    description: [
      'Calls reach Kestrel by SIP transfer or plain forwarding, so your numbers, menus and recordings stay where they are today and you can pull a line back at any time.',
    ],
    items: ['api', 'voice-cloud', 'sdk', 'contact-center', 'call-router'],
  },
  {
    id: 'knowledge',
    label: 'Knowledge sources',
    description: [
      'Kestrel answers from sources you list, cites the page it used in every reply, and tells you when two sources disagree, so stale or conflicting guidance gets fixed at the source rather than repeated to customers.',
    ],
    items: ['wiki', 'knowledge-vault', 'docs-suite', 'notes-workspace'],
  },
  {
    id: 'tools',
    label: 'Actions and data',
    description: [
      'Actions are what turn an answer into a finished case: a refund issued, a slot moved, an address changed, each one logged against the conversation that asked for it.',
      'Every action has an owner, an allow-list of fields it may change and an optional limit, such as refunds under a set amount or no more than one address change a month. Actions above a limit pause for a person to approve in team chat. While a system is still being connected, a stand-in action returns sample data so playbooks can be written and checked in parallel, and a short list of built-in helpers handles chores like working out business days, converting currencies or rounding amounts to your billing rules.',
    ],
    items: ['mcp', 'billing', 'storefront', 'email-delivery', 'sales-crm', 'team-chat'],
  },
]

export const categoryItems = (cat) => cat.items.map((s) => bySlug[s])
export const getIntegration = (slug) => bySlug[slug]
export const integrationHref = (i) => (i.detail ? `/integrations/${i.slug}` : '#')
// "Other apps" (T4): the rest of the integration's category, 4 cards
export const otherApps = (slug, count = 4) => {
  const cat = categories.find((c) => c.label === bySlug[slug]?.detail?.category)
  return cat ? categoryItems(cat).filter((i) => i.slug !== slug).slice(0, count) : []
}

// Orbit tiles (T2.5): 12 placeholder tiles, 3 on the outer ring, 6 on the middle ring, 3 on the inner ring
// (counts read from recon/pages/integrations-library/integrations-1440.png). Angles in degrees, 0 = 12 o'clock.
export const orbitTiles = [
  { ring: 0, angle: -41, slug: 'voice-cloud' },
  { ring: 0, angle: 109, slug: 'notes-workspace' },
  { ring: 0, angle: 190, slug: 'sales-crm' },
  { ring: 1, angle: -3, slug: 'crm' },
  { ring: 1, angle: -60, slug: 'billing' },
  { ring: 1, angle: -75, slug: 'helpdesk' },
  { ring: 1, angle: 75, slug: 'ticket-desk' },
  { ring: 1, angle: 150, slug: 'docs-suite' },
  { ring: 1, angle: 217, slug: 'support-inbox' },
  { ring: 2, angle: 33, slug: 'mcp' },
  { ring: 2, angle: 218, slug: 'team-chat' },
  { ring: 2, angle: 120, slug: 'wiki' },
].map((t) => ({ ...t, ...bySlug[t.slug] }))
