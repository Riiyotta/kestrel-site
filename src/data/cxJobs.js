// Placeholder data for /cx-jobs (SPEC_PAGES_C T4). Every company, role and place name here is fictional;
// lengths follow the spec's char counts (titles ~24–66, descriptions ~76–100, locations ~10–34).
// `shape` picks a PlaceholderLogo glyph; `hue` picks the SilkJobCard stand-in colour.

export const featuredRoles = [
  { company: 'Northwind Labs', shape: 'ring', hue: 'magenta', title: 'Lead, Conversation Quality and AI Coaching' },
  { company: 'Pellucid', shape: 'square', hue: 'indigo', title: 'Support Operations Strategy Manager' },
  { company: 'Harbor & Vale', shape: 'diamond', hue: 'ember', title: 'Customer Success Analyst' },
  { company: 'Tidemark', shape: 'triangle', hue: 'sun', title: 'Regional Service Delivery Lead, AI Agents' },
  { company: 'Quillon', shape: 'bars', hue: 'magenta', title: 'Automation Program Manager, Support' },
  { company: 'Brightfold', shape: 'arc', hue: 'indigo', title: 'Senior CX Designer, Voice and Chat' },
  { company: 'Ostrava Mobility', shape: 'plus', hue: 'ember', title: 'Knowledge Systems Specialist' },
  { company: 'Juniper Row', shape: 'circle', hue: 'sun', title: 'Head of Support Tooling' },
]

export const stats = [
  { value: '120+', label: 'Roles listed', desc: 'Open positions on the board' },
  { value: '60+', label: 'Hiring teams', desc: 'Separate companies with openings' },
  { value: 'Weekly', label: 'Refreshed', desc: 'The list is rechecked every week' },
]

export const openRoles = [
  {
    company: 'Northwind Labs',
    shape: 'ring',
    title: 'Speech Analytics Specialist, Contact Centre Platforms',
    desc: 'Tune intent models, call summaries and routing rules across the voice and messaging stack.',
    location: 'Wellford, Northern Province',
  },
  {
    company: 'Pellucid',
    shape: 'square',
    title: 'Lead, Support Knowledge Foundations',
    desc: 'Own the help-centre knowledge layer and set the review process for AI agent answers.',
    location: 'Port Arden, Coastal Region',
  },
  {
    company: 'Harbor & Vale',
    shape: 'diamond',
    title: 'Support Operations Manager',
    desc: 'Plan staffing and automation coverage for a subscription service that is growing fast.',
    location: 'Lindqvist, Eastmarch',
  },
  {
    company: 'Tidemark',
    shape: 'triangle',
    title: 'Customer Success Analyst',
    desc: 'Turn ticket and survey data into weekly reports, and automate the busywork in between.',
    location: 'Greater Calloway',
  },
  {
    company: 'Quillon',
    shape: 'bars',
    title: 'Regional Service Delivery Lead, Marketplace Support',
    desc: 'Run seller and buyer support for the region and shape a first-line model built around AI.',
    location: 'Saltmere',
  },
  {
    company: 'Brightfold',
    shape: 'arc',
    title: 'Associate, Digital Customer Programs',
    desc: 'Build lifecycle messaging and self-serve flows for onboarding and renewals at scale.',
    location: 'Ravensholm, Highland District',
  },
  {
    company: 'Ostrava Mobility',
    shape: 'plus',
    title: 'Project Manager, Voice of Customer',
    desc: 'Lead the feedback programme and feed findings back to product and support leadership.',
    location: 'Austerby',
  },
  {
    company: 'Juniper Row',
    shape: 'circle',
    title: 'Program Manager, AI Agent and Deflection Tooling',
    desc: 'Run the support agent rollout, from deflection targets to escalation design and QA.',
    location: 'Remote',
  },
]

export const footerColumns = [
  { title: 'Quick links', links: ['Browse roles', 'Ask your AI', 'Post a role'] },
  { title: 'Kestrel', links: ['What we build', 'Book a demo', 'Pricing', 'Blog'] },
  { title: 'Contact', links: ['jobs@kestrel.example', 'kestrel.example', 'Harbourtown · Westvale'] },
]
