// CX guides – SPEC_PAGES_B T5 (GuideSummary) + T6 (Article). Original placeholder text for the fictional Kestrel on
// generic CX topics; every number is a round, illustrative figure, not research. Authors are fictional.
// h2 blocks carry optional `minute` + `summary` for the TickToc popover (RichText ignores the extra fields).
/** @typedef {import('./types.js').RichTextBlock} RichTextBlock */

export const ARTICLE_INDEX = {
  eyebrow: 'CX guides',
  title: 'Field guides for the people who run support queues',
  lede: 'Clear, opinionated explainers on the metrics, processes and tools that shape great customer experience.',
  latestLabel: 'Latest guide',
  readLabel: 'Read the guide →',
  loadMore: 'Load more guides',
  sortOptions: [
    { value: 'relevant', label: 'Most relevant' },
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
  ],
}

export const ARTICLE_CTA = { tag: 'Demo', label: 'Watch Kestrel resolve a billing dispute', href: '/get-a-demo', trailing: 'Start free trial', trailingHref: '#' }

const A = {
  mira: { name: 'Mira Castellanos', avatar: '/assets/photos/playbook-avatar-c.webp' },
  felix: { name: 'Felix Arendt', avatar: '/assets/photos/playbook-avatar-p6r.webp' },
  lena: { name: 'Lena Vogt', avatar: '/assets/photos/playbook-avatar-p4l.webp' },
  tomas: { name: 'Tomas Reyes', avatar: '/assets/photos/playbook-avatar-p2l.webp' },
  mei: { name: 'Mei Tanaka', avatar: '/assets/photos/playbook-avatar-p4r.webp' },
}

const h2 = (text, minute, summary) => ({ type: 'h2', text, minute, summary })
const p = (html) => ({ type: 'p', html })

export const articles = [
  {
    slug: 'support-metrics-that-matter',
    topic: 'Metrics',
    title: 'Support metrics worth tracking, and the ones to retire',
    description:
      'A practical tour of the support metrics worth tracking, how to read them together and which popular numbers quietly reward the wrong behaviour.',
    date: 'Oct 12, 2026',
    updated: 'Oct 12, 2026',
    author: A.mira,
    cover: { src: '/assets/photos/hero-center.webp' },
    featured: true,
    body: [
      p('<em>Last updated: October 2026.</em>'),
      {
        type: 'takeaways',
        items: [
          'Pair every speed metric with a quality metric so one cannot improve at the expense of the other.',
          'Resolution and reopen rates say more about customer outcomes than ticket counts.',
          'Review a small, well-chosen sample of conversations every week alongside the dashboard.',
        ],
      },
      h2('Why most dashboards mislead', 0, 'Single numbers hide trade-offs. A faster first reply can mean a worse answer.'),
      p('Most support dashboards were designed to show activity, not outcomes. They count tickets, replies and minutes, which makes it easy to look busy and hard to tell whether customers are better off.'),
      p('The fix is not more metrics. It is choosing a small set that balance each other, then reading them together.'),
      h2('Speed metrics', 2, 'First reply time and time to resolution, and how to keep them honest.'),
      p('<strong>First reply time</strong> measures how long a customer waits for the first meaningful response. Automated acknowledgements should not count.'),
      p('<strong>Time to resolution</strong> measures the full journey. It is the speed number customers actually feel.'),
      { type: 'ul', items: ['Report medians, not averages, to avoid a few outliers distorting the picture.', 'Split by channel; chat and email have different norms.', 'Exclude time spent waiting on the customer.'] },
      h2('Quality metrics', 4, 'Resolution rate, reopen rate and customer effort as the counterweight to speed.'),
      p('Resolution rate tells you how often the issue was actually solved. Reopen rate tells you how often you only thought it was. Together they catch the most common failure of a speed-focused team: closing tickets too early.'),
      { type: 'blockquote', html: 'If a metric can improve while customers get worse service, it needs a partner metric that would catch it.', cite: 'Kestrel support playbook' },
      h2('Putting it together', 6, 'A simple weekly review that combines the numbers with real conversations.'),
      p('Each week, look at one speed metric, one quality metric and twenty sampled conversations. The conversations explain the numbers; the numbers tell you which conversations to read.'),
      { type: 'ol', items: ['Pick the metric pair for the quarter.', 'Agree on a sampling rule.', 'Write down one change to make each week.'] },
    ],
    faq: [
      { q: 'How many metrics should a support team track?', a: 'Fewer than you think. Three to five well-paired metrics are easier to act on than a dashboard of twenty.' },
      { q: 'Should automated replies count towards first reply time?', a: 'No. Only count the first response that moves the conversation forward.' },
      { q: 'What is a good resolution rate?', a: 'It depends on the mix of requests. Track your own trend over time rather than comparing against other companies.' },
      { q: 'How often should metrics be reviewed?', a: 'Weekly for operational metrics, quarterly for targets and definitions.' },
    ],
    related: ['what-is-a-good-nps', 'first-response-time-explained', 'measuring-customer-effort'],
  },
  {
    slug: 'what-is-a-good-nps',
    topic: 'Metrics',
    title: 'What counts as a good NPS, and when the score stops being useful',
    description:
      'How Net Promoter Score is calculated, why "good" depends on context, and how to pair it with signals that are easier to act on day to day.',
    date: 'Oct 5, 2026',
    updated: 'Oct 5, 2026',
    author: A.felix,
    cover: { tone: 'lavender' },
    body: [
      { type: 'takeaways', items: ['NPS is a relationship signal, not a support quality score.', 'Compare against your own trend before any external benchmark.', 'Read the comments; the number alone rarely tells you what to fix.'] },
      h2('How the score works', 0, 'Promoters minus detractors, on a scale from −100 to 100.'),
      p('Customers rate how likely they are to recommend you from 0 to 10. Scores of 9 and 10 are promoters, 0 to 6 are detractors. Subtract the share of detractors from the share of promoters and you have the score.'),
      h2('What "good" means', 2, 'Context matters more than any universal threshold.'),
      p('Anything above zero tells you fans outnumber critics. Past that point, the useful question is whether your score is moving in the right direction after the changes you make.'),
      { type: 'ul', items: ['Above zero: more fans than critics.', 'Around 30: a healthy base for many businesses (illustrative).', 'Above 50: strong advocacy, though rarely sustained without effort.'] },
      h2('Where NPS falls short', 4, 'It reacts slowly and mixes product, price and service.'),
      p('Because it measures the whole relationship, NPS moves slowly and can hide service improvements behind a pricing change. Pair it with a transactional measure after each conversation.'),
    ],
    faq: [
      { q: 'Is NPS the same as CSAT?', a: 'No. CSAT asks about a specific interaction; NPS asks about the overall relationship.' },
      { q: 'How often should we survey?', a: 'Quarterly is common for relationship surveys. Avoid surveying the same customer too often.' },
      { q: 'Can support teams move NPS?', a: 'Yes, but slowly. Consistent, effortless service shows up in the score over several quarters.' },
    ],
    related: ['support-metrics-that-matter', 'measuring-customer-effort', 'csat-survey-design'],
  },
  {
    slug: 'first-response-time-explained',
    topic: 'Metrics',
    title: 'First response time: how to measure it properly and when to stop chasing it',
    description:
      'A clear definition of first response time, common ways teams accidentally game it, and how fast is fast enough for each channel you support.',
    date: 'Sep 28, 2026',
    updated: 'Sep 28, 2026',
    author: A.tomas,
    cover: { src: '/assets/photos/hero-br.webp' },
    body: [
      { type: 'takeaways', items: ['Measure to the first meaningful reply, not the auto-acknowledgement.', 'Set targets per channel.', 'Past a point, faster replies add little; resolution matters more.'] },
      h2('A working definition', 0, 'The time from the customer\'s first message to the first useful human or AI reply.'),
      p('First response time starts when the customer sends their first message and ends at the first reply that moves their issue forward.'),
      h2('Targets by channel', 2, 'Chat in seconds, email in hours, and why the gap is fine.'),
      p('Customers expect chat replies within a minute or two and email replies within a working day. Illustrative targets are a starting point; your customers\' behaviour should set the final number.'),
      h2('Diminishing returns', 4, 'Why shaving seconds rarely beats resolving more on the first reply.'),
      p('Once replies are fast enough, the next gain comes from getting the first answer right.'),
    ],
    faq: [
      { q: 'Should weekends count?', a: 'Report both business-hours and calendar-hours versions so the numbers match what customers experience.' },
      { q: 'Does an AI reply count as a first response?', a: 'Yes, if it is a genuine answer rather than a holding message.' },
    ],
    related: ['support-metrics-that-matter', 'what-is-a-good-nps', 'reducing-ticket-backlog'],
  },
  {
    slug: 'measuring-customer-effort',
    topic: 'Customer experience',
    title: 'Customer effort: the quiet metric behind loyal customers',
    description:
      'Why reducing the work customers do to get help often matters more than delight, and simple ways to measure effort without another long survey.',
    date: 'Sep 20, 2026',
    updated: 'Sep 20, 2026',
    author: A.lena,
    cover: { tone: 'mint' },
    body: [
      { type: 'takeaways', items: ['Repeat contacts are the clearest effort signal.', 'Ask one short question after the conversation.', 'Fix the top three causes of repeat contacts first.'] },
      h2('What effort looks like', 0, 'Repeating details, switching channels and waiting for callbacks.'),
      p('Effort shows up as customers repeating information, being transferred, or having to come back about the same issue.'),
      h2('How to measure it', 2, 'A single post-conversation question plus repeat-contact rate.'),
      p('Ask "How easy was it to get your issue resolved?" on a short scale, and track how often customers contact you again within a week.'),
    ],
    faq: [
      { q: 'Is effort more important than satisfaction?', a: 'They measure different things. Effort tends to predict whether customers stay; satisfaction describes how they felt.' },
      { q: 'What is a repeat contact?', a: 'A second contact about the same issue within a short window, often seven days.' },
    ],
    related: ['what-is-a-good-nps', 'csat-survey-design', 'support-metrics-that-matter'],
  },
  {
    slug: 'csat-survey-design',
    topic: 'Customer experience',
    title: 'Designing a CSAT survey customers will actually answer',
    description:
      'Short, well-timed questions get honest answers. How to choose the scale, the wording and the moment to ask, plus what to do with the replies.',
    date: 'Sep 12, 2026',
    updated: 'Sep 12, 2026',
    author: A.mei,
    cover: { tone: 'peach' },
    body: [
      { type: 'takeaways', items: ['One question, one optional comment.', 'Ask right after resolution.', 'Close the loop on low scores within a day.'] },
      h2('Keep it short', 0, 'Every extra question costs responses.'),
      p('A single rating plus an optional comment gives you most of the value with the least friction.'),
      h2('Timing', 2, 'Ask once the issue is resolved, not when the ticket closes.'),
      p('Surveys sent at the moment of resolution capture the experience while it is fresh.'),
    ],
    faq: [{ q: 'Which scale is best?', a: 'A five-point scale is easy to answer and easy to report. Consistency matters more than the exact scale.' }],
    related: ['measuring-customer-effort', 'what-is-a-good-nps', 'support-metrics-that-matter'],
  },
  {
    slug: 'ai-agent-guardrails',
    topic: 'AI support',
    title: 'Guardrails for AI support agents: a practical starting checklist',
    description:
      'The policies, permissions and review habits that let an AI agent take real actions for customers without putting them, or your business, at risk.',
    date: 'Sep 4, 2026',
    updated: 'Sep 4, 2026',
    author: A.felix,
    cover: { src: '/assets/photos/nav-feature-product.webp' },
    body: [
      { type: 'takeaways', items: ['Give the agent the narrowest permissions that do the job.', 'Write explicit exit criteria for handover.', 'Review a sample of actions every week.'] },
      h2('Start with permissions', 0, 'Least privilege, per action, per role.'),
      p('Each action an agent can take should have its own permission and its own limits, such as a maximum refund value.'),
      h2('Define the exits', 2, 'When the agent must stop and hand over.'),
      p('Write down the situations where a human must take over: safety concerns, legal threats, anything outside policy.'),
      h2('Review continuously', 4, 'Weekly samples and clear ownership.'),
      p('Guardrails are only as good as the review process that maintains them.'),
    ],
    faq: [
      { q: 'Should the agent ever override policy?', a: 'No. Exceptions should go to a human with authority to make them.' },
      { q: 'Who owns the guardrails?', a: 'Usually support operations, with sign-off from compliance where relevant.' },
    ],
    related: ['ai-support-first-90-days', 'support-metrics-that-matter', 'reducing-ticket-backlog'],
  },
  {
    slug: 'ai-support-first-90-days',
    topic: 'AI support',
    title: 'Your first 90 days with an AI support agent, week by week',
    description:
      'A realistic rollout plan: which conversations to start with, how to involve your team, and the signals that tell you it is time to expand coverage.',
    date: 'Aug 27, 2026',
    updated: 'Aug 27, 2026',
    author: A.mira,
    cover: { tone: 'indigo' },
    body: [
      { type: 'takeaways', items: ['Start with a few high-volume, well-documented requests.', 'Involve your best agents as reviewers.', 'Expand only when quality holds steady.'] },
      h2('Weeks 1 to 4', 0, 'Pick the first workflows and set up review.'),
      p('Choose three request types with clear policies and plenty of volume. Set up a daily review of a small sample.'),
      h2('Weeks 5 to 8', 2, 'Tune guidance and widen the sample.'),
      p('Use what reviewers find to improve guidance. Add one or two more request types if quality is stable.'),
      h2('Weeks 9 to 12', 4, 'Expand coverage and hand ownership to the team.'),
      p('By now the team should own the workflows. Expand to new channels or hours of coverage.'),
    ],
    faq: [{ q: 'How many workflows should we launch with?', a: 'Three is a good number: enough to learn from, few enough to review closely.' }],
    related: ['ai-agent-guardrails', 'reducing-ticket-backlog', 'support-metrics-that-matter'],
  },
  {
    slug: 'reducing-ticket-backlog',
    topic: 'Operations',
    title: 'How to clear a support backlog without burning out the team',
    description:
      'A step-by-step approach to triaging an overgrown queue, protecting new requests from getting stuck and stopping the backlog from coming back.',
    date: 'Aug 19, 2026',
    updated: 'Aug 19, 2026',
    author: A.tomas,
    cover: { tone: 'sun' },
    body: [
      { type: 'takeaways', items: ['Protect new requests first.', 'Batch similar old tickets.', 'Fix the root causes that created the backlog.'] },
      h2('Triage', 0, 'Sort by urgency and by type.'),
      p('Separate tickets that are still relevant from those that resolved themselves, and group the rest by type.'),
      h2('Batch and close', 2, 'Answer similar tickets together.'),
      p('A single well-written reply can often be adapted for dozens of similar requests.'),
    ],
    faq: [{ q: 'Should we close old tickets without replying?', a: 'Reply first. A short apology and an offer to help goes a long way.' }],
    related: ['first-response-time-explained', 'support-team-scheduling', 'ai-support-first-90-days'],
  },
  {
    slug: 'support-team-scheduling',
    topic: 'Operations',
    title: 'Scheduling a support team around real demand, not guesswork',
    description:
      'Using simple volume forecasts to plan shifts, cover peaks and keep response times steady without overstaffing quiet hours.',
    date: 'Aug 11, 2026',
    updated: 'Aug 11, 2026',
    author: A.lena,
    cover: { src: '/assets/photos/hero-tl.webp' },
    body: [
      { type: 'takeaways', items: ['Forecast by hour of week.', 'Plan for peaks, not averages.', 'Revisit the forecast monthly.'] },
      h2('Forecasting', 0, 'Hour-of-week averages are a strong start.'),
      p('Average the last eight weeks by hour and day to get a simple, reliable forecast.'),
      h2('Building shifts', 2, 'Cover the peaks first, then fill in.'),
      p('Place shifts so that coverage rises with demand rather than staying flat all day.'),
    ],
    faq: [{ q: 'How far ahead should we schedule?', a: 'Two to four weeks gives people predictability while leaving room to adjust.' }],
    related: ['reducing-ticket-backlog', 'first-response-time-explained', 'support-metrics-that-matter'],
  },
  {
    slug: 'writing-help-centre-articles',
    topic: 'Customer experience',
    title: 'Writing help centre articles that humans and AI agents can both use',
    description:
      'Structure, tone and maintenance habits that make knowledge base articles easy to scan for customers and easy to follow for automated agents.',
    date: 'Aug 2, 2026',
    updated: 'Aug 2, 2026',
    author: A.mei,
    cover: { tone: 'magenta' },
    body: [
      { type: 'takeaways', items: ['One task per article.', 'Lead with the answer.', 'Date and own every article.'] },
      h2('One task per article', 0, 'Narrow articles are easier to find and to follow.'),
      p('An article that answers one question well beats a long page that answers ten partially.'),
      h2('Lead with the answer', 2, 'Put the outcome in the first sentence.'),
      p('Customers scan. Put the answer first and the detail after.'),
    ],
    faq: [{ q: 'How often should articles be reviewed?', a: 'Whenever the product changes, and at least twice a year otherwise.' }],
    related: ['measuring-customer-effort', 'ai-agent-guardrails', 'csat-survey-design'],
  },
  {
    slug: 'escalation-paths',
    topic: 'Operations',
    title: 'Designing escalation paths that do not feel like starting over',
    description:
      'How to route complex cases to the right person with the right context, so customers never have to repeat themselves after a handover.',
    date: 'Jul 24, 2026',
    updated: 'Jul 24, 2026',
    author: A.felix,
    cover: { tone: 'mint' },
    body: [
      { type: 'takeaways', items: ['Route by skill, not by queue order.', 'Always pass a summary.', 'Tell the customer what happens next.'] },
      h2('Route by skill', 0, 'Send cases to whoever can solve them.'),
      p('Tag cases by the skill they need and route them directly to people with that skill.'),
      h2('Pass the context', 2, 'A short summary avoids repeated questions.'),
      p('Every escalation should include what the customer wants, what has been tried and why it was escalated.'),
    ],
    faq: [{ q: 'How many tiers should support have?', a: 'As few as possible. Each tier adds a handover.' }],
    related: ['ai-agent-guardrails', 'reducing-ticket-backlog', 'support-team-scheduling'],
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
