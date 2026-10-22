// FAQ document – SPEC_PAGES_B T12 (FaqDoc). Static Q&A, all answers visible. Placeholder copy for the fictional
// Kestrel; figures are illustrative. Answers are RichTextBlock[] rendered by RichText (variant "faq").
/** @typedef {import('./types.js').RichTextBlock} RichTextBlock */

const p = (html) => ({ type: 'p', html })
const ul = (...items) => ({ type: 'ul', items })

export const faqDoc = {
  title: 'Kestrel FAQ',
  lede: 'Answers to the questions we hear most often about Kestrel.',
  updated: 'Last updated: October 2026',
  sections: [
    {
      title: 'Getting started',
      items: [
        { q: 'What is Kestrel?', a: [p('Kestrel is an AI resolution agent for banks, insurers and clinics: it closes customer cases end to end and keeps a reviewable record of every step. It answers questions, takes actions in your systems and hands over to your team with the whole history when a human is needed.')] },
        { q: 'How long does setup take?', a: [p('Most teams connect their helpdesk and knowledge base in an afternoon and launch their first workflows within two weeks. Larger rollouts with custom integrations usually take four to six weeks.')] },
        { q: 'Do I need engineers to get started?', a: [p('No. Workflows are written in plain language by your support team. Engineering help is only needed for custom actions against internal systems.')] },
      ],
    },
    {
      title: 'Channels',
      items: [
        { q: 'Which channels does Kestrel support?', a: [p('Kestrel works across the channels your customers already use:'), ul('Chat and in-app messaging', 'Email', 'Voice', 'SMS and messaging apps')] },
        { q: 'Can Kestrel answer in multiple languages?', a: [p('Yes. Kestrel replies in the customer\'s language and keeps your guidance in one place, so you do not maintain separate workflows per language.')] },
        { q: 'Does it work alongside my existing chatbot?', a: [p('It can, though most teams replace their existing bot once Kestrel covers the same requests.')] },
      ],
    },
    {
      title: 'Workflows',
      items: [
        { q: 'What is a workflow?', a: [p('A workflow is a short, plain-language description of how to handle a type of request, plus the actions Kestrel may take. For example, <strong>checking refund eligibility</strong> and issuing a refund within a set limit.')] },
        { q: 'Can I test a workflow before it goes live?', a: [p('Yes. Simulations replay past conversations through a draft workflow and highlight any answer that would differ from what your team actually did.')] },
        { q: 'Who can edit workflows?', a: [p('Anyone with the editor role. Every change is versioned and can be rolled back.')] },
      ],
    },
    {
      title: 'Handover',
      items: [
        { q: 'When does Kestrel hand a conversation to a human?', a: [p('Whenever a workflow\'s exit criteria are met, the customer asks for a person, or the request is outside policy. You decide the rules.')] },
        { q: 'What does my team see after a handover?', a: [p('A short summary of what the customer wants, what has been checked and why Kestrel stopped, alongside the full transcript.')] },
        { q: 'Can a human hand the conversation back?', a: [p('Yes. Agents can return a case to Kestrel once the part that needed a human is done.')] },
      ],
    },
    {
      title: 'Security',
      items: [
        { q: 'How is customer data protected?', a: [p('Records are encrypted on the wire and on disk, permissions follow job roles, and every action Kestrel takes is logged. See our <a href="/trust">trust centre</a> for details.')] },
        { q: 'Is my data used to train shared models?', a: [p('No. Your data is used only to serve your own workspace.')] },
        { q: 'Where is data stored?', a: [p('Customers can choose a data region during onboarding. Regional options are listed in the trust centre.')] },
      ],
    },
    {
      title: 'Integrations',
      items: [
        { q: 'Which helpdesks does Kestrel connect to?', a: [p('Kestrel connects to the major helpdesk platforms out of the box and to internal systems through a simple API.')] },
        { q: 'Can Kestrel take actions in my own systems?', a: [p('Yes. Custom actions call your APIs with the permissions you define, such as updating an address or issuing a credit.')] },
        { q: 'Is there an API?', a: [p('Yes. The Kestrel API lets you start conversations, read outcomes and manage workflows programmatically.')] },
      ],
    },
    {
      title: 'Pricing',
      items: [
        { q: 'How is Kestrel priced?', a: [p('Each plan is a monthly subscription with a pool of resolved conversations, so you pay for outcomes rather than seats. See the <a href="/pricing">pricing page</a> for current plans.')] },
        { q: 'Is there a free pilot?', a: [p('Yes. Every plan starts with a free 14-day pilot: Kestrel works a slice of your real queue while your team approves each reply.')] },
        { q: 'Do unresolved conversations count?', a: [p('No. Conversations handed to your team without a resolution are not billed.')] },
      ],
    },
    {
      title: 'Support',
      items: [
        { q: 'How do I get help with Kestrel?', a: [p('Every customer has a named contact during onboarding and access to our support team by chat and email.')] },
        { q: 'Do you offer training?', a: [p('Yes. We run onboarding sessions for admins and workflow editors, plus a library of short guides.')] },
        { q: 'Where can I suggest a feature?', a: [p('Share ideas with your account contact or through the feedback link in the Kestrel dashboard.')] },
      ],
    },
  ],
}
