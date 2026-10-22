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
  sub: 'Kestrel runs inside the helpdesk you already use and acts through your own systems, so there is nothing to move. Ready-made connectors cover the major helpdesks, CRMs, phone platforms and more.',
  cta: { label: 'Browse every Kestrel integration →', href: '#catalog' },
  tickerHeading: 'Relied on by support leaders in finance, health and other demanding fields',
  setup: {
    title: 'What setup really looks like',
    intro:
      'Plenty of AI support tools promise a one-click install and then send a long scoping form. Here is the actual order of work, step by step.',
    steps: [
      {
        title: '1. Connect the ticket queue',
        text: 'Point Kestrel at your helpdesk, or use the chat widget if you do not have one. Most teams connect with an admin approval flow and need no engineering time. Kestrel works in the same queue as your agents.',
      },
      {
        title: '2. Connect the systems it acts on',
        text: 'Kestrel reads and writes through your APIs, webhooks and MCP servers, and you set read-only or write access for each one inside the app.',
      },
      {
        title: '3. Teach it how your team works',
        text: 'Help articles, procedures, policies and tone guides, written in plain language. Kestrel drafts the workflows and changes go live without an engineering ticket.',
      },
      {
        title: '4. Test before customers see it',
        text: 'Replay past tickets and synthetic scenarios in bulk and review projected resolution quality before launch.',
      },
      {
        title: '5. Launch one topic at a time',
        text: 'Switch on the topics where the evidence is strong and keep the rest with your team.',
      },
    ],
    support: [
      'You will not do this alone. Every plan includes embedded support, starting with a guided onboarding session, and larger plans add a deployment team that configures connectors and workflows alongside yours.',
      'The first live ticket can arrive within hours, with an average under a month, and where you land depends on your systems rather than on a sales promise. One lending team went live in four weeks from zero automation and handled 15,000 conversations in its first month, and a childcare provider moved its parent phone line from a 12% to a 100% answer rate in the first full month it was live, without adding a single person to the team.',
    ],
    faqTitle: 'Common questions',
    faq: [
      {
        q: 'How long does it take to integrate Kestrel?',
        blocks: [
          {
            type: 'p',
            html: 'The first live ticket can arrive within hours, with an average under a month. The range depends on which systems Kestrel needs to read from and act in: a helpdesk connector plus a handful of API actions is a far smaller job than an older system with no API. Most teams connect through an admin approval flow without engineering help, every plan includes embedded support, and you test on replayed tickets and synthetic scenarios, reviewing projected quality topic by topic, before anything goes live. One lending team launched in four weeks from a standing start and handled 15,000 conversations in its first month, and a childcare provider lifted its phone answer rate from 12% to 100% within a month.',
          },
        ],
      },
      {
        q: 'Does Kestrel work with my helpdesk?',
        blocks: [
          {
            type: 'p',
            html: 'Very likely, in one of three ways. Built-in connectors cover the major helpdesks, CRMs, shared inboxes and team chat tools. Any other helpdesk that sends webhooks connects through Flexible Ticketing, set up with our team. And if you do not run a helpdesk at all, use the chat widget or the SDK. For voice, anything that can forward a call works, including cloud contact centres, call routers and voice clouds. The only real blocker is a system with neither an API nor webhooks, and even then our team can usually suggest a route.',
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
          { type: 'p', html: 'These commitments are written into our standard customer agreement.' },
        ],
      },
    ],
  },
}

/** @type {Integration[]} */
export const integrations = [
  // Ticketing
  { slug: 'helpdesk', name: 'Helpdesk', logo: { shape: 'square' }, description: 'Resolve conversations inside your helpdesk while keeping history and outcomes in one place.' },
  { slug: 'crm', name: 'CRM', logo: { shape: 'circle' }, description: 'Run support workflows inside your CRM for consistent, traceable outcomes, with customer records kept in step automatically.' },
  { slug: 'ticket-desk', name: 'Ticket Desk', logo: { shape: 'triangle' }, description: 'Turn incoming tickets into finished work: sorted, acted on and closed.' },
  { slug: 'messaging-desk', name: 'Messaging Desk', logo: { shape: 'triangle' }, description: 'Handle live customer conversations in your messaging desk with AI-led resolution.' },
  { slug: 'shared-inbox', name: 'Shared Inbox', logo: { shape: 'square' }, description: 'Answer shared inbox threads with AI resolution and clean hand-offs to your team.' },
  { slug: 'sales-crm', name: 'Sales CRM', logo: { shape: 'plus' }, description: 'Keep customer context and follow-ups in sync across support and sales.' },
  { slug: 'team-chat', name: 'Team Chat', logo: { shape: 'bars' }, description: 'Handle internal requests and support workflows right in team chat, with AI help and alerts sent to the right channel.' },
  { slug: 'support-inbox', name: 'Support Inbox', logo: { shape: 'diamond' }, description: 'Resolve support inbox conversations with AI while keeping your team’s personal tone.' },
  { slug: 'sdk', name: 'Kestrel SDK', logo: { shape: 'arc' }, description: 'Embed Kestrel in your product, pass it context and get back answers that are ready to act on.' },
  { slug: 'chat', name: 'Kestrel Chat', logo: { shape: 'arc' }, description: 'Put AI agents straight on your website without needing a helpdesk.' },
  { slug: 'care-desk', name: 'Care Desk', logo: { shape: 'circle' }, description: 'Resolve care desk conversations with AI while your team keeps working where it already does.' },
  { slug: 'crm-messaging', name: 'CRM Messaging', logo: { shape: 'circle' }, description: 'Pass chat conversations to live agents in CRM Messaging with the whole conversation attached for context.' },
  { slug: 'flexible-ticketing', name: 'Flexible Ticketing', logo: { shape: 'arc' }, description: 'Connect a helpdesk without a built-in connector, as long as it can send webhooks.' },
  // Telephony
  {
    slug: 'api',
    name: 'Kestrel API',
    logo: { shape: 'arc' },
    description: 'Start a Kestrel voice conversation before the live call is routed to Kestrel',
    website: { label: 'kestrel.example', href: '#' },
    detail: {
      lede: 'Start a Kestrel voice conversation before the live call is routed to Kestrel',
      category: 'Telephony',
      sections: [
        {
          heading: 'Overview',
          as: 'h2',
          text: 'The voice calls API lets your phone system open a Kestrel conversation before it forwards the live call. Kestrel can then begin the call already knowing who is on the line, their account details or their latest activity, so workflows can tailor the conversation from the very first second.',
        },
        {
          heading: 'What it is',
          as: 'h3',
          text: 'The API route gives you the most control over voice because you can enrich each call with live data before the AI picks up. That makes it possible to route priority callers differently, load order or account context ahead of time, and spare customers from repeating themselves, while raising first-call resolution on complex requests. The agent already knows who is calling and why, so fewer calls need a second attempt, fewer callers have to explain their problem twice, and your team spends less time on calls that could have been settled the first time round.',
        },
        {
          heading: 'How to integrate',
          as: 'h3',
          text: 'Your team uses Kestrel voice API credentials to send a server-to-server request from your phone system, or from middleware, when a call comes in. That request creates a conversation in Kestrel and can carry the customer identifiers and context you want used for routing and workflows. Once the conversation exists, your voice provider forwards the live call to your assigned Kestrel number. Your team completes the setup in its own voice and application layers, and Kestrel supplies the endpoints, guidance and end-to-end checks.',
        },
      ],
    },
  },
  { slug: 'voice-cloud', name: 'Voice Cloud', logo: { shape: 'ring' }, description: 'Send SMS updates and handle voice conversations at scale' },
  { slug: 'contact-center', name: 'Contact Center', logo: { shape: 'circle' }, description: 'Add conversational ability as an audio connector' },
  { slug: 'call-router', name: 'Call Router', logo: { shape: 'square' }, description: 'Forward routed calls to Kestrel so your AI agent can answer and resolve them.' },
  // Knowledge base
  { slug: 'wiki', name: 'Wiki', logo: { shape: 'plus' }, description: 'Use documented knowledge and procedures from your team wiki.' },
  { slug: 'knowledge-vault', name: 'Knowledge Vault', logo: { shape: 'ring' }, description: 'Connect your knowledge vault so Kestrel can use your verified company answers.' },
  { slug: 'docs-suite', name: 'Docs Suite', logo: { shape: 'square' }, description: 'Connect your docs suite so Kestrel can read documents, sheets and slide decks.' },
  { slug: 'notes-workspace', name: 'Notes Workspace', logo: { shape: 'square' }, description: 'Connect your notes workspace so Kestrel can reach your knowledge base.' },
  // Tools and actions
  {
    slug: 'mcp',
    name: 'MCP',
    logo: { shape: 'bars' },
    description: 'Extend agent abilities with your own tools and data sources',
    website: { label: 'modelcontextprotocol.io', href: '#' },
    detail: {
      lede: 'Extend agent abilities with your own tools and data sources',
      category: 'Tools and actions',
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
  { slug: 'billing', name: 'Billing', logo: { shape: 'square' }, description: 'Take payments and update customer records in real time.' },
  { slug: 'storefront', name: 'Storefront', logo: { shape: 'triangle' }, description: 'Sync orders and customer details to power commerce support.' },
  { slug: 'email-delivery', name: 'Email Delivery', logo: { shape: 'diamond' }, description: 'Send transactional emails and track engagement automatically.' },
]

const bySlug = Object.fromEntries(integrations.map((i) => [i.slug, i]))

export const categories = [
  {
    id: 'ticketing',
    label: 'Ticketing system',
    description: [
      'Browse connectors for your helpdesk, knowledge base, phone platform and internal tools. If your helpdesk is not listed, Flexible Ticketing connects any system that can send webhooks.',
    ],
    items: [
      'helpdesk', 'crm', 'ticket-desk', 'messaging-desk', 'shared-inbox', 'sales-crm', 'team-chat',
      'support-inbox', 'sdk', 'chat', 'care-desk', 'crm-messaging', 'flexible-ticketing',
    ],
  },
  {
    id: 'telephony',
    label: 'Telephony',
    description: [
      'Any phone platform that supports call forwarding works, including cloud contact centres, call routers, voice clouds, the Kestrel SDK and the Kestrel API.',
    ],
    items: ['api', 'voice-cloud', 'sdk', 'contact-center', 'call-router'],
  },
  {
    id: 'knowledge',
    label: 'Knowledge base',
    description: [
      'Give Kestrel access to your internal knowledge. Kestrel also works with your existing helpdesk to read and reply to tickets, and you can switch each source on or off, or between read-only and write access, in the app.',
    ],
    items: ['wiki', 'knowledge-vault', 'docs-suite', 'notes-workspace'],
  },
  {
    id: 'tools',
    label: 'Tools and actions',
    description: [
      'Kestrel uses tools to reach your external systems so that it can personalise each answer it gives while it works through and resolves customer requests.',
      'Tools connect Kestrel to your other systems, and workflows use them to read data or take action. You can set them up as APIs, webhooks or connections to MCP servers, and mock tools let you build and test workflows before the real system is wired in. A shared library of ready-made connectors and operators also covers everyday jobs inside your workflows, such as comparing two dates, checking a time window or doing simple arithmetic on order values and account balances.',
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
