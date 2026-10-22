// Competitor index – SPEC_PAGES_B T7 (/competitors). Shape follows the spec's `CompetitorIndex` interface, plus the
// section headings the page needs (`sections`) and a `slug` per comparison table for the (not yet built) detail
// pages at /competitors/:slug (B T8).
// Kestrel is compared with generic CATEGORIES of tools, never with named companies. Original placeholder copy.
// Lengths follow the spec: H1 n≈34 (2 lines), sub n≈146, card titles n≈23, card info n≈160–220, questions n≈50–70,
// row labels n≈10–35, value cells n≈50–125, 5–9 rows per table.

export const competitorIndex = {
  docTitle: 'Kestrel compared | Kestrel',
  hero: {
    title: 'Why ambitious support teams choose Kestrel',
    sub: 'Kestrel pairs an AI agent that resolves real cases with an engineering team that keeps tuning it after launch, so results keep improving month after month.',
    stripLabel: 'Proudly supporting',
  },
  sections: {
    differences: {
      title: 'What makes Kestrel different',
      sub: 'Each kind of tool is built for a different goal, and knowing the category makes evaluation quicker. Here is where Kestrel stands apart from the rest of the field.',
    },
    questions: { title: '10 questions to ask before you choose an AI agent for support' },
    tables: {
      title: 'How Kestrel compares',
      sub: 'Side-by-side notes on how Kestrel differs from each common category of support automation, from first deployment through to everyday operation.',
    },
  },
  // icon keys are drawn by src/components/company/FeatureCardGrid.jsx (own black glyphs)
  differences: [
    {
      icon: 'target',
      title: 'Measured on resolutions',
      body: 'Deflection alone hides the real picture. Kestrel tracks whether each case was actually resolved, how customers felt about it, and what it saved, so you can see the impact in plain numbers.',
    },
    {
      icon: 'layers',
      title: 'Built for messy cases',
      body: 'Refunds with exceptions, account changes that touch three systems, regulated disclosures: Kestrel follows multi-step procedures and knows when a person needs to step in.',
    },
    {
      icon: 'channels',
      title: 'One agent, every channel',
      body: 'Chat, email, voice and messaging share the same procedures and the same memory of the customer, so answers stay consistent wherever a conversation starts or moves.',
    },
    {
      icon: 'wrench',
      title: 'Engineers after go-live',
      body: 'Launch is the start, not the finish. A dedicated Kestrel engineer reviews conversations with your team, tunes procedures and ships improvements every week after go-live.',
    },
    {
      icon: 'shield',
      title: 'Controls from day one',
      body: 'Role-based access, approval steps for sensitive actions, full audit trails and regional data hosting come as standard, so every action the agent takes can be reviewed.',
    },
    {
      icon: 'globe',
      title: 'Fits any industry',
      body: 'Kestrel is not tied to one vertical. Teams in travel, lending, insurance, healthcare and retail run it on their own policies, tone of voice and systems of record.',
    },
  ],
  questions: [
    { q: '1. Can it complete multi-step tasks, not just answer FAQs?', a: 'Ask to see a live case where the agent reads data, makes a decision and changes something in another system, end to end.' },
    { q: '2. Can it take actions in the systems we already use?', a: 'Check which helpdesks, billing tools and internal APIs it can write to, and how those permissions are scoped and approved.' },
    { q: '3. Does it keep context when a customer switches channel?', a: 'A customer who starts in chat and follows up by email should not have to explain the problem twice.' },
    { q: '4. How does it hand over to a person, and when?', a: 'Look for clear escalation rules, a full summary passed to the agent, and no dead ends for the customer.' },
    { q: '5. What guardrails exist for policy and compliance?', a: 'Ask how procedures are enforced, how sensitive actions are approved, and what is logged for audit.' },
    { q: '6. How is a resolution actually measured?', a: 'Deflection counts conversations that ended; resolution counts problems that were solved. Make sure you know which one you are buying.' },
    { q: '7. What happens after launch, week to week?', a: 'Find out who reviews conversations, who changes procedures, and how quickly improvements reach production.' },
    { q: '8. How long until it handles real customer volume?', a: 'Ask for typical timelines from kickoff to the first live traffic, and from there to full volume.' },
    { q: '9. How is pricing tied to the outcomes we care about?', a: 'Seat, message and resolution pricing behave very differently as volume grows. Model each against your own numbers.' },
    { q: '10. Who owns our data, and is it used for training?', a: 'Confirm that your conversations stay yours and are not used to train models for other customers.' },
  ],
  tables: [
    {
      slug: 'kestrel-vs-legacy-chatbots',
      against: 'Legacy chatbots',
      rows: [
        { label: 'Resolution approach', us: 'Follows your procedures and takes actions to close the case', them: 'Decision trees that route to an article or a human agent' },
        { label: 'Quality review', us: 'Every conversation is scored, with root causes surfaced and fixes suggested', them: 'Basic containment and drop-off reporting' },
        { label: 'Making changes', us: 'Ops teams edit procedures in plain language and test them before release', them: 'Each new path has to be drawn and maintained by hand in a flow builder' },
        { label: 'Complex cases', us: 'Multi-step tasks across systems with a clean hand-off when needed', them: 'Best for simple, single-intent questions' },
        { label: 'Time to launch', us: 'Simple FAQs within days; integrated workflows within a few weeks, with engineering support', them: 'Fast to start, slow to extend as flows multiply' },
        { label: 'Pricing', us: 'Tied to successful resolutions', them: 'Usually per seat or per conversation' },
        { label: 'Best fit', us: 'Teams with complex or regulated cases that need real work done', them: 'Teams with a small set of predictable questions' },
      ],
    },
    {
      slug: 'kestrel-vs-helpdesk-add-ons',
      against: 'Helpdesk add-ons',
      rows: [
        { label: 'Resolution approach', us: 'An agent that works across your helpdesk and every connected system', them: 'Automation bundled inside one helpdesk suite' },
        { label: 'Quality review', us: 'Scores every conversation and turns findings into procedure changes', them: 'Suite-level reports; depth depends on plan and setup' },
        { label: 'Making changes', us: 'Edit procedures, routing and actions without a services project', them: 'Configured with the suite’s rules and macros, which grow complex over time' },
        { label: 'Complex cases', us: 'Multi-step workflows with confirmations and clean escalation', them: 'Cross-system cases usually need a person or custom work' },
        { label: 'Time to launch', us: 'Quick pilot, then reuse the same procedures to scale', them: 'Quick if already on the suite; slower when flows need redesign' },
        { label: 'Pricing', us: 'Aligned to resolved cases', them: 'Add-on fees on top of seats and plan tiers' },
        { label: 'Best fit', us: 'Teams that want outcomes across tools without replacing them', them: 'Teams fully standardised on one helpdesk' },
      ],
    },
    {
      slug: 'kestrel-vs-build-your-own',
      against: 'Build your own on an LLM API',
      rows: [
        { label: 'Resolution approach', us: 'A ready-made agent with procedures, actions and guardrails built in', them: 'Whatever your team designs, builds and maintains' },
        { label: 'Quality review', us: 'Conversation scoring and root-cause analysis included', them: 'Evaluation tooling has to be built and staffed in-house' },
        { label: 'Making changes', us: 'Ops teams own changes, with engineers on hand from Kestrel', them: 'Changes queue behind your own engineering roadmap' },
        { label: 'Complex cases', us: 'Proven patterns for approvals, retries and hand-offs', them: 'Possible, but every edge case is yours to discover' },
        { label: 'Time to launch', us: 'Weeks, with a dedicated engineer', them: 'Months of build before the first customer conversation' },
        { label: 'Ongoing cost', us: 'One subscription tied to outcomes', them: 'Model usage plus the team needed to run and improve it' },
        { label: 'Best fit', us: 'Teams that want results this quarter without growing an AI platform team', them: 'Companies with spare engineering capacity and a long runway' },
      ],
    },
    {
      slug: 'kestrel-vs-outsourced-bpo',
      against: 'Outsourced BPO',
      rows: [
        { label: 'Resolution approach', us: 'Resolves cases instantly, at any hour, in every channel', them: 'Human agents working to shift patterns and service levels' },
        { label: 'Quality review', us: 'Every conversation reviewed automatically', them: 'Sampled QA, often a small percentage of contacts' },
        { label: 'Making changes', us: 'Procedure updates go live the same day', them: 'New guidance needs retraining across sites and shifts' },
        { label: 'Peak demand', us: 'Scales with volume without hiring', them: 'Peaks need forecasting and extra headcount' },
        { label: 'Consistency', us: 'Same procedure applied the same way every time', them: 'Varies by agent tenure, site and time of day' },
        { label: 'Pricing', us: 'Per resolution, so costs follow outcomes', them: 'Per hour or per agent, whatever the result' },
        { label: 'Best fit', us: 'Teams that want to free people for the hardest cases', them: 'Work that needs a human on every contact' },
      ],
    },
    {
      slug: 'kestrel-vs-phone-trees',
      against: 'Phone trees and IVR',
      rows: [
        { label: 'Resolution approach', us: 'Natural conversation that finishes the task on the call', them: 'Menus that route callers to a queue' },
        { label: 'Customer effort', us: 'Callers explain in their own words, once', them: 'Keypad options and repeated identity checks' },
        { label: 'Making changes', us: 'Edit the procedure; voice, chat and email pick it up together', them: 'Menu changes need telephony specialists' },
        { label: 'Complex cases', us: 'Looks up records and takes actions mid-call', them: 'Transfers anything beyond a simple balance or status check' },
        { label: 'Reporting', us: 'Full transcripts with outcome and quality scores', them: 'Menu paths and abandonment rates' },
        { label: 'Pricing', us: 'Per resolution, across voice and digital channels alike', them: 'Telephony licences plus per-minute carrier costs' },
        { label: 'Best fit', us: 'Teams whose callers need things done, not just routed', them: 'High-volume lines with a few simple, stable call reasons' },
      ],
    },
    {
      slug: 'kestrel-vs-single-channel-assistants',
      against: 'Single-channel assistants',
      rows: [
        { label: 'Channels', us: 'Chat, email, voice and messaging on one set of procedures', them: 'One channel, often web chat only' },
        { label: 'Customer memory', us: 'Context follows the customer across channels and days', them: 'Each conversation starts from scratch' },
        { label: 'Quality review', us: 'One view of quality across every channel', them: 'Separate tools and reports per channel' },
        { label: 'Making changes', us: 'Change a procedure once and it applies everywhere', them: 'The same change repeated in each tool' },
        { label: 'Complex cases', us: 'Multi-step work that can pause in one channel and finish in another', them: 'Hands off when the customer changes channel' },
        { label: 'Pricing', us: 'One price per resolution, whichever channel it happens in', them: 'Priced per channel, so costs add up as channels are added' },
        { label: 'Best fit', us: 'Teams serving customers wherever they reach out', them: 'Teams with a single, high-volume chat queue' },
      ],
    },
  ],
}
