// Glossary index – SPEC_PAGES_B T11 (GlossaryIndex). Generic CX terms; placeholder copy for the fictional Kestrel.
// Term detail pages (/glossary/<slug>) are outside this brief (spec T11) – slugs are kept for when they exist.

const terms = [
  'Agent assist', 'Automation rate', 'Average handle time', 'Backlog', 'Business hours SLA', 'Canned response',
  'Chatbot', 'Churn', 'Contact rate', 'Containment rate', 'Customer effort score', 'Customer journey', 'CSAT',
  'Deflection', 'Escalation', 'First contact resolution', 'First response time', 'Handover', 'Help centre',
  'Intent detection', 'Knowledge base', 'Macro', 'Multilingual support', 'Net Promoter Score', 'Omnichannel',
  'Proactive support', 'Quality assurance', 'Queue', 'Reopen rate', 'Resolution rate', 'Routing',
  'Self-service', 'Sentiment analysis', 'Service level agreement', 'Shift planning', 'Ticket', 'Tiered support',
  'Time to resolution', 'Voice of the customer', 'Workflow', 'Workforce management',
]

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const glossary = {
  eyebrow: 'Glossary',
  title: 'The customer support glossary',
  intro:
    'Plain-language definitions of the terms support teams use every day, from queue metrics to AI agent concepts. Use it to align your team on vocabulary, onboard new hires faster, or settle that debate about what “resolved” really means.',
  groups: Object.entries(
    terms.reduce((acc, label) => {
      const letter = label[0].toUpperCase()
      ;(acc[letter] ||= []).push({ label, slug: slug(label) })
      return acc
    }, {}),
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, list]) => ({ letter, terms: list.sort((a, b) => a.label.localeCompare(b.label)) })),
}
