// AEO detail pages for industries – SPEC_PAGES_A T1 variants (/industry/<slug>), merged into `getAeoPage` by
// productPages.js and rendered by src/pages/product/AeoDetail.jsx.
// Industry variants (spec T1 template map): `byline` + `selfServe` line under the hero buttons, no Related Reading,
// H1 60/60 on healthcare + insurance (`h1Size: 60`), story slideshow on financial-services (pink) and healthcare
// (peach), healthcare adds the event block + inline demo form (`event`, T1.7b) and its own ticker logo set.
// Tools blocks on industry pages end with a third list of "Question? … Kestrel: …" rows (spec: `Tools Table`).
// Original placeholder copy for the fictional "Kestrel"; customers are the fictional companies of stories.js.

const p = (html) => ({ type: 'p', html })
const ul = (...items) => ({ type: 'ul', items })
const a = (href, label) => `<a href="${href}">${label}</a>`
const cs = (slug) => `/customer-stories/${slug}`
const CALLOUT_CTA = { label: 'Book a demo', href: '/get-a-demo' }
const SELF_SERVE = { link: 'Start a free trial', rest: 'and build your first playbook today, no sales call required.', href: '/pricing' }

// A T1.2 healthcare ticker: different logo set, same geometry (11 placeholder marks, h 21–30).
const HEALTH_LOGOS = [
  { name: 'Brindle Health', shape: 'plus', w: 168, h: 28 },
  { name: 'Mendwell', shape: 'circle', w: 132, h: 28 },
  { name: 'Carewise', shape: 'ring', w: 120, h: 26 },
  { name: 'Pulsepoint', shape: 'arc', w: 150, h: 24 },
  { name: 'Northfield Dental', shape: 'square', w: 190, h: 22 },
  { name: 'Lumen Pharmacy', shape: 'diamond', w: 176, h: 26 },
  { name: 'Kindred Vision', shape: 'triangle', w: 160, h: 24 },
  { name: 'Orbit Health', shape: 'circle', w: 138, h: 30 },
  { name: 'Willowby', shape: 'bars', w: 112, h: 26 },
  { name: 'Clearpath', shape: 'plus', w: 124, h: 24 },
  { name: 'Halo Physio', shape: 'ring', w: 128, h: 21 },
]

export const industryPages = [
  // ---------------------------------------------------------------- /industry/financial-services
  {
    slug: 'financial-services',
    docTitle: 'Kestrel for financial services | Banking and lending support',
    hero: {
      title: 'AI support for lenders, card issuers and payment firms',
      lede: 'Kestrel resolves disputes, repayment changes and account questions end to end, with the disclosures, checks and audit trail your regulator expects to see.',
      intro: `Financial services support is full of cases where the right answer depends on the customer’s own account: a payment holiday, a chargeback window, a hardship flag. Kestrel reads those records, applies your credit and complaints policies as playbooks, and makes the change or hands over with a full summary. Disclosures are enforced by safeguards on every reply. Coinwell now handles most statement queries without a person (${a(cs('coinwell-card-disputes'), 'read the Coinwell story')}).`,
      byline: 'Reviewed by the Kestrel financial services solutions team',
      selfServe: SELF_SERVE,
      art: { scene: 'shield', tint: 'pink' },
    },
    tools: {
      title: 'Which AI support platforms suit regulated financial firms?',
      items: [
        {
          blocks: [
            p('<strong>Kestrel</strong> works with consumer lenders, card issuers, payment firms and tax software companies, where a careless answer can become a complaint or a breach. Results customers have shared:'),
            ul(
              `<strong>Coinwell</strong> (cards): most statement and dispute queries settled without a person, with disclosures logged. ${a(cs('coinwell-card-disputes'), 'Read the story')}`,
              `<strong>Ledgerly</strong> (tax software): filing-week peaks absorbed without temporary hires. ${a(cs('ledgerly-handles-tax-season'), 'Read the story')}`,
            ),
            p('<strong>What else firms evaluate:</strong>'),
            ul(
              '<strong>Scripted banking bots</strong> answer balance and branch questions but pass anything account-specific to a queue.',
              '<strong>Outsourced contact centres</strong> handle volume with people, at a cost that rises with every peak.',
            ),
          ],
        },
        {
          title: 'What do financial services teams ask before choosing?',
          blocks: [
            ul(
              '<strong>Can it handle hardship and vulnerability?</strong> Kestrel: flags signals in the conversation and routes them to a trained team with context.',
              '<strong>Are disclosures guaranteed?</strong> Kestrel: required wording is enforced by safeguards and logged on every reply.',
              '<strong>Can it change a repayment date?</strong> Kestrel: yes, through your loan system, with limits and approvals per playbook.',
              '<strong>How are complaints treated?</strong> Kestrel: recognised, recorded and handed to your complaints team within your deadlines.',
              '<strong>Where is data kept?</strong> Kestrel: in the hosting region you choose, never used to train shared models.',
            ),
            p(`Further reading: ${a('/product/guardrails', 'safeguards')}, ${a('/product/trust', 'security')} and ${a('/competitors/kestrel-vs-outsourced-bpo', 'Kestrel compared with outsourced BPO')}.`),
          ],
        },
      ],
    },
    band: 'Built for money conversations that need care',
    rows: [
      {
        eyebrow: 'Disputes',
        title: 'Can the agent open and track a card dispute?',
        body: 'Yes. It checks the transaction, confirms the dispute reason, explains timelines and files the case in your disputes system. Customers get status updates as the case moves, and specialists see a clean file.',
        art: { scene: 'queue', tint: 'pink' },
      },
      {
        eyebrow: 'Repayments',
        title: 'How are repayment changes and payment plans handled?',
        body: 'Playbooks set what the agent can offer and to whom. Eligible customers can move a date or set up a plan in one conversation; anyone showing signs of difficulty goes to your collections specialists instead.',
        art: { scene: 'flow', tint: 'yellow' },
      },
      {
        eyebrow: 'Compliance',
        title: 'How do you evidence fair treatment to a regulator?',
        body: 'Every conversation is scored against your conduct rubric, with disclosures, vulnerability handling and outcomes recorded. Reports group results by product and customer segment, ready for your board pack.',
        art: { scene: 'review', tint: 'green' },
      },
    ],
    stories: {
      title: 'Which finance teams already run Kestrel?',
      tint: 'pink',
      items: [
        {
          quote: '“Disputes used to sit in a queue for days. Now customers get a case number and a clear timeline in the first reply.”',
          name: 'Ruth Achterberg',
          role: 'Director of Member Care, Coinwell',
          img: '/assets/photos/story-2.webp',
          logo: { name: 'Coinwell', shape: 'ring', w: 120, h: 28 },
          href: cs('coinwell-card-disputes'),
        },
        {
          quote: '“Filing week used to mean temporary hires and long nights. This year the agent carried the peak and nobody burned out.”',
          name: 'Jonah Pereira',
          role: 'Head of Support, Ledgerly',
          img: '/assets/photos/story-4.webp',
          logo: { name: 'Ledgerly', shape: 'bars', w: 120, h: 28 },
          href: cs('ledgerly-handles-tax-season'),
        },
        {
          quote: '“Our compliance lead reads the weekly review report before I do. That tells you how much the team trusts it.”',
          name: 'Tobias Lindqvist',
          role: 'COO, Quillfin',
          img: '/assets/photos/story-6.webp',
          logo: { name: 'Quillfin', shape: 'diamond', w: 120, h: 28 },
          href: '/customer-stories',
        },
        {
          quote: '“Payment holidays went from a three-email process to one short chat, with every disclosure in place.”',
          name: 'Nadia Farouk',
          role: 'Head of Servicing, Harbourline',
          img: '/assets/photos/story-3.webp',
          logo: { name: 'Harbourline', shape: 'bars', w: 120, h: 28 },
          href: '/customer-stories',
        },
      ],
    },
    callout: {
      title: 'Can Kestrel verify identity before account changes?',
      body: 'Yes. Playbooks call your existing verification steps, such as one-time codes or knowledge checks, before any account detail is shared or changed, and step up verification when the requested action carries more risk.',
      cta: CALLOUT_CTA,
      art: { scene: 'lock', tint: 'lavender' },
    },
    faq: {
      title: 'Kestrel for financial services: questions from banks and lenders',
      items: [
        {
          q: 'Which financial products does Kestrel support today?',
          a: 'Cards, personal and point-of-sale lending, savings accounts, payments and tax software. Playbooks are specific to each product, so a card dispute and a loan repayment follow different rules and checks.',
        },
        {
          q: 'How does the agent recognise a complaint?',
          a: 'Complaint signals are defined in your rubric. When one appears, the agent acknowledges it, records it in your complaints system with the conversation attached and follows your handling timeline.',
        },
        {
          q: 'Can the agent discuss arrears and collections?',
          a: 'Within limits you set. It can confirm balances, explain options and set up eligible plans, while anyone who mentions hardship, illness or bereavement is passed to a trained specialist straight away.',
        },
        {
          q: 'Does Kestrel give financial advice?',
          a: 'No. Safeguards block replies that recommend products or predict outcomes, and the agent explains your published terms instead, pointing to an adviser where your policy requires it.',
        },
        {
          q: 'How long does a typical financial services launch take?',
          a: 'A first playbook, often statement or card questions, usually goes live within three to four weeks, including your risk review. Integrated account changes follow once the first set of review scores holds.',
        },
        {
          q: 'Can we keep data within one country?',
          a: `Yes, within the available hosting regions. Details on residency, encryption and audits are on the ${a('/product/trust', 'security page')}.`,
        },
      ],
    },
  },

  // ---------------------------------------------------------------- /industry/healthcare
  {
    slug: 'healthcare',
    h1Size: 60,
    docTitle: 'Kestrel for healthcare | Patient support that knows its limits',
    logos: HEALTH_LOGOS,
    hero: {
      title: 'Patient support that answers admin questions and leaves care to clinicians',
      lede: 'Kestrel handles bookings, billing and prescription status for clinics and telehealth providers, and passes anything clinical to your care team with full context.',
      intro: `Most patient messages are about logistics: moving an appointment, understanding a bill, checking a refill. Kestrel resolves those directly from your scheduling, billing and pharmacy systems, any hour of the day. Safeguards watch for symptoms, urgency and distress, and route those conversations to a nurse or the right emergency guidance immediately. Patient data stays in your chosen region. Brindle Health now covers nights and weekends this way (${a(cs('brindle-health-after-hours'), 'read the Brindle story')}).`,
      byline: 'Reviewed by the Kestrel healthcare solutions team',
      selfServe: SELF_SERVE,
      art: { scene: 'chat', tint: 'peach' },
    },
    tools: {
      title: 'Which AI support tools are safe for patient-facing teams?',
      items: [
        {
          blocks: [
            p('<strong>Kestrel</strong> works with clinic groups, telehealth services, dental chains and pharmacies, separating administrative help from anything that needs a clinician. What customers report:'),
            ul(
              `<strong>Brindle Health</strong>: after-hours admin questions answered, symptom questions passed to nurses with notes. ${a(cs('brindle-health-after-hours'), 'Read the story')}`,
              `<strong>Mendwell Clinics</strong>: invoices and claim adjustments explained line by line, with payment plans offered. ${a(cs('mendwell-billing-clarity'), 'Read the story')}`,
            ),
            p('<strong>Other approaches clinics try:</strong>'),
            ul(
              '<strong>Booking widgets</strong> handle scheduling but cannot explain a bill or check a prescription status.',
              '<strong>General-purpose chat assistants</strong> answer broadly, without the hard limits patient support needs.',
            ),
          ],
        },
        {
          title: 'What do healthcare teams ask before they decide?',
          blocks: [
            ul(
              '<strong>Will it ever give medical advice?</strong> Kestrel: no; clinical topics are routed to your care team by safeguards.',
              '<strong>How are emergencies handled?</strong> Kestrel: urgent signals trigger your emergency guidance and an immediate hand-off.',
              '<strong>Can it reschedule appointments?</strong> Kestrel: yes, directly in your scheduling system, within your booking rules.',
              '<strong>Is patient data protected?</strong> Kestrel: hosted in-region, masked in logs, and covered by a signed business associate agreement where needed.',
              '<strong>Can it explain a bill?</strong> Kestrel: yes, line by line from your billing system, offering plans to eligible patients.',
            ),
            p(`Further reading: ${a('/product/trust', 'security')}, ${a('/product/guardrails', 'safeguards')} and ${a('/customer-stories', 'healthcare customer stories')}.`),
          ],
        },
      ],
    },
    band: 'Admin handled, care left to the people trained for it',
    rows: [
      {
        eyebrow: 'Scheduling',
        title: 'Can patients book and move appointments in chat?',
        body: 'Yes. The agent checks availability, the clinician’s rules and any preparation steps, then books or moves the slot and sends a confirmation. Waitlists can be offered automatically when a slot opens up.',
        art: { scene: 'outreach', tint: 'peach' },
      },
      {
        eyebrow: 'Billing',
        title: 'How does the agent explain a confusing bill?',
        body: 'It reads the invoice and any insurance adjustments, explains each line in plain words and offers a payment plan where the patient qualifies. Disputes and appeals go to your billing team with the details attached.',
        art: { scene: 'queue', tint: 'yellow' },
      },
      {
        eyebrow: 'Clinical routing',
        title: 'What happens when a patient mentions a symptom?',
        body: 'The agent stops handling the request itself. Depending on your rules, it shares emergency guidance, books a call with a nurse or passes the conversation to the clinical inbox, always with a summary.',
        art: { scene: 'shield', tint: 'green' },
      },
    ],
    stories: {
      title: 'Which care teams already run Kestrel?',
      tint: 'peach',
      items: [
        {
          quote: '“Nights used to mean a voicemail box. Now patients get answers at 2am, and anything clinical is with a nurse by morning.”',
          name: 'Amara Okonjo',
          role: 'Patient Services Lead, Mendwell Clinics',
          img: '/assets/photos/story-5.webp',
          logo: { name: 'Mendwell', shape: 'circle', w: 120, h: 28 },
          href: cs('mendwell-billing-clarity'),
        },
        {
          quote: '“Our nurses only see the conversations that need them, and those arrive with the notes already written.”',
          name: 'Dr. Felix Brandt',
          role: 'Clinical Director, Brindle Health',
          img: '/assets/photos/story-1.webp',
          logo: { name: 'Brindle Health', shape: 'plus', w: 120, h: 28 },
          href: cs('brindle-health-after-hours'),
        },
        {
          quote: '“Billing questions dropped from our top call reason to fourth within a quarter of switching it on.”',
          name: 'Hana Kobayashi',
          role: 'Revenue Cycle Manager, Orbit Health',
          img: '/assets/photos/story-3.webp',
          logo: { name: 'Orbit Health', shape: 'circle', w: 120, h: 28 },
          href: '/customer-stories',
        },
        {
          quote: '“Refill status was a daily headache for the front desk. Now it answers itself, with the pharmacist looped in when needed.”',
          name: 'Leon Mbeki',
          role: 'Operations Manager, Lumen Pharmacy',
          img: '/assets/photos/story-6.webp',
          logo: { name: 'Lumen', shape: 'diamond', w: 120, h: 28 },
          href: '/customer-stories',
        },
      ],
    },
    callout: {
      title: 'Can patients reach Kestrel by phone as well as chat?',
      body: 'Yes. Kestrel Voice answers the clinic line with the same playbooks, so patients can move a booking or ask about a bill by phone, and calls with any clinical concern are transferred to your team at once.',
      cta: CALLOUT_CTA,
      art: { scene: 'phone', tint: 'peach' },
    },
    event: {
      title: 'Meet the Kestrel team at the Care Operations Forum',
      intro: 'We are hosting short working sessions for clinic and telehealth operations leads. Bring a real patient-support workflow and leave with a tested draft playbook.',
      benefits: [
        { lead: 'Map one workflow end to end.', text: 'Pick bookings, billing or refills and we will chart every step, system and hand-off with you on the day.' },
        { lead: 'See clinical routing in action.', text: 'Watch safeguards catch symptom language in scripted conversations and pass them to a nurse inbox with a summary.' },
        { lead: 'Run a test on your own scenarios.', text: 'Write three patient scenarios and see how a draft playbook scores before you leave.' },
        { lead: 'Talk data with our security team.', text: 'Residency, retention and business associate agreements, answered by the people who maintain them.' },
      ],
      formTitle: 'Book a session with the healthcare team',
    },
    faq: {
      title: 'Kestrel for healthcare: questions from clinic operations leads',
      items: [
        {
          q: 'Which kinds of healthcare providers use Kestrel?',
          a: 'Clinic groups, telehealth services, dental and optical chains, physiotherapy networks and pharmacies. What they share is high volumes of admin questions and a clear line where clinical judgement begins.',
        },
        {
          q: 'How does Kestrel avoid giving medical advice?',
          a: 'Safeguards check every reply for clinical content and block it. Questions about symptoms, medication effects or test results are routed to your clinical team, and the agent tells the patient who will respond and when.',
        },
        {
          q: 'Can it connect to our scheduling and billing systems?',
          a: `Yes. Kestrel connects to common practice management, scheduling and billing tools, plus your own APIs. The ${a('/integrations', 'connector library')} lists current options.`,
        },
        {
          q: 'Will you sign a business associate agreement?',
          a: 'Yes, for customers that need one. Patient data is hosted in your chosen region, masked in logs where possible and never used to train shared models.',
        },
        {
          q: 'How are urgent or distressed patients handled?',
          a: 'You define the urgent signals and the response: emergency guidance, an immediate transfer to a staffed line, or both. These rules are tested with clinician-written scenarios before launch.',
        },
        {
          q: 'How quickly can a clinic group get started?',
          a: 'Most groups launch appointment and billing playbooks within four weeks, including the clinical routing review. Refill and referral workflows usually follow in the next phase.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------- /industry/insurance
  {
    slug: 'insurance',
    h1Size: 60,
    docTitle: 'Kestrel for insurance | Claims, cover and renewals',
    hero: {
      title: 'AI support for insurers that settles policy questions and keeps claims moving',
      lede: 'Kestrel explains cover, updates policies and chases missing claim documents, following your underwriting and claims rules with every decision recorded.',
      intro: `Insurance customers usually get in touch at a stressful moment: a burst pipe, a cancelled trip, a renewal price they did not expect. Kestrel reads the policy and claim records, explains what applies in plain language and takes the next step, whether that is a mid-term change, a document request or a hand-off to a claims handler. Safeguards keep the agent from promising outcomes, and every reply is scored. Policyholders get answers while handlers keep the judgement calls (${a('/product/guardrails', 'see how safeguards work')}).`,
      byline: 'Reviewed by the Kestrel insurance solutions team',
      selfServe: SELF_SERVE,
      art: { scene: 'queue', tint: 'lavender' },
    },
    tools: {
      title: 'Which AI support tools can work inside insurance rules?',
      items: [
        {
          blocks: [
            p('<strong>Kestrel</strong> works with personal lines insurers, travel cover providers and brokers, handling service requests while leaving decisions on liability to qualified people. Typical first playbooks:'),
            ul(
              '<strong>Policy changes</strong>: address, vehicle or cover updates made mid-term, with the premium change explained before it is confirmed.',
              '<strong>Claim progress</strong>: status explained from the claims system, missing documents requested and uploaded in the same thread.',
            ),
            p('<strong>Approaches insurers often compare:</strong>'),
            ul(
              '<strong>Claims portals</strong> let customers upload documents but cannot answer the questions that come with them.',
              '<strong>IVR menus</strong> route calls by policy type, then leave customers in a queue for a handler.',
            ),
          ],
        },
        {
          title: 'What do insurers ask before they choose a platform?',
          blocks: [
            ul(
              '<strong>Can it make policy changes?</strong> Kestrel: yes, within the limits your underwriting rules allow, with approval above them.',
              '<strong>Will it promise claim outcomes?</strong> Kestrel: never; safeguards block it, and liability questions go to a handler.',
              '<strong>Can it collect claim evidence?</strong> Kestrel: yes, requesting and receiving photos and documents in the conversation.',
              '<strong>How are renewals handled?</strong> Kestrel: explains the price change and options, and records any request to cancel or switch.',
              '<strong>Are vulnerable customers protected?</strong> Kestrel: signals are flagged and routed to trained staff with context.',
            ),
            p(`Further reading: ${a('/product/outbound', 'proactive outreach')}, ${a('/product/voice', 'voice')} and ${a('/competitors/kestrel-vs-phone-trees', 'Kestrel compared with IVR')}.`),
          ],
        },
      ],
    },
    band: 'Clear answers at the moments customers worry most',
    rows: [
      {
        eyebrow: 'Policy servicing',
        title: 'Can customers change their cover in a conversation?',
        body: 'Yes. The agent checks eligibility, quotes the premium effect from your rating system and confirms the change once the customer agrees. Changes outside your rules are passed to an underwriter with the request.',
        art: { scene: 'flow', tint: 'lavender' },
      },
      {
        eyebrow: 'Claims support',
        title: 'How does Kestrel keep a claim moving?',
        body: 'It explains where the claim stands, what is still needed and what happens next. Missing documents are requested and collected in the thread, and reminders go out automatically if something is still outstanding.',
        art: { scene: 'test', tint: 'yellow' },
      },
      {
        eyebrow: 'Renewals',
        title: 'What happens when a renewal price goes up?',
        body: 'The agent explains the main reasons from the renewal record, outlines the options your policy allows and records the customer’s decision. Retention offers follow your rules, never improvised by the agent itself.',
        art: { scene: 'chart', tint: 'green' },
      },
    ],
    callout: {
      title: 'Can Kestrel take first notice of loss by phone?',
      body: 'Yes. With Kestrel Voice, the agent can take an initial claim report by phone, ask the right questions for the claim type, open the claim and send a text with a secure upload link for photos.',
      cta: CALLOUT_CTA,
      art: { scene: 'phone', tint: 'lavender' },
    },
    faq: {
      title: 'Kestrel for insurance: questions from claims and service leaders',
      items: [
        {
          q: 'Which lines of insurance does Kestrel support?',
          a: 'Home, motor, travel, pet and gadget cover are the most common, along with broker servicing. Each product line gets its own playbooks, because the rules and documents differ.',
        },
        {
          q: 'Can the agent decide whether a claim is covered?',
          a: 'No. It explains what the policy wording says and what information is needed, but decisions on cover and liability stay with your claims handlers. Safeguards block any reply that suggests an outcome.',
        },
        {
          q: 'How does Kestrel connect to our policy administration system?',
          a: `Through standard connectors or your own APIs, with scoped permissions per operation. See the ${a('/integrations', 'connector library')} for current options.`,
        },
        {
          q: 'Can it help during a major weather event?',
          a: 'Yes. Outreach can contact customers in affected areas with guidance and claim links, while the agent absorbs the spike in inbound questions so handlers can focus on the claims themselves.',
        },
        {
          q: 'How are complaints and vulnerable customers handled?',
          a: 'Both are defined in your rubric. The agent recognises them, records them in the right system and hands the conversation to trained staff within your required timeframes.',
        },
        {
          q: 'How quickly can an insurer go live?',
          a: 'A first playbook such as claim status typically goes live within four weeks. Policy changes and voice claim intake usually follow once review scores have held steady for a few weeks.',
        },
      ],
    },
  },
]
