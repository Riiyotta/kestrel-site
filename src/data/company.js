// Company pages – SPEC_PAGES_C T1 (/about, /careers). Rendered by src/pages/company/{About,Careers}.jsx.
// Original placeholder copy for the fictional "Kestrel"; every person is fictional. Photos are the stock files in
// public/assets/photos (IMAGE_CREDITS.md / slots.json); names reuse the names those portraits already carry on the
// site where possible. Lengths follow the spec roles (A1 4 paragraphs ≈283/242/405/326 chars, A3 heading ≈78, A4
// one ≈998-char block with <br> breaks and 4 links, C1 H1 2 x ≈14 chars, C2 sub ≈200, C3 sub ≈147 + 5 values (title
// ≈36–69, body ≈187–221), C4 8 cards (quote ≈200–380), C5 sub ≈71).

const PH = (name) => `/assets/photos/${name}.webp`

// ---------------------------------------------------------------------------------------------- /about
export const aboutPage = {
  docTitle: 'About Kestrel | Why we build AI support',
  mission: {
    title: 'Why we exist',
    blocks: [
      { type: 'p', html: 'Kestrel started with a spreadsheet. One of our founders, then running a support team, logged every case her team closed for a month and marked the ones that had needed real thought. Fewer than one in five had. The rest were careful, repetitive work that kept good people away from the customers who needed them most.' },
      { type: 'p', html: 'We think support work deserves better than that. People who join support teams are usually there because they like helping, and the job should let them spend their days on the conversations where that matters.' },
      { type: 'p', html: 'So we build software that takes on the repetitive part properly, not by hiding customers behind menus, but by doing the work a trained agent would do and doing it the same way every time. Our engineers sit with each customer’s team through launch and afterwards, read conversations with them every week and ship improvements together. We measure ourselves on whether those teams have more time for people, not on how many chats we deflect.' },
      { type: 'p', html: 'We are a small company with offices in London, Lisbon and Toronto, and we publish what we learn along the way: research notes, podcasts and the occasional honest post about something that did not work. If that sounds like your kind of place, we are hiring.' },
    ],
  },
  collage: {
    main: { src: PH('hero-center'), alt: 'A Kestrel teammate on a call at her desk' },
    left: { src: PH('hero-bl'), alt: 'A teammate checking messages on her phone' },
    right: { src: PH('hero-br'), alt: 'Two colleagues talking across a cafe table' },
  },
  logosHeading: 'Support teams in lending, health, energy and software rely on Kestrel every day',
  logos: [
    { name: 'Coinwell', shape: 'ring', w: 132, h: 28 },
    { name: 'Ledgerly', shape: 'bars', w: 128, h: 26 },
    { name: 'Brindle Health', shape: 'plus', w: 168, h: 30, filter: 'saturate(0)' },
    { name: 'Voltway', shape: 'arc', w: 124, h: 33 },
    { name: 'Stackhouse', shape: 'square', w: 150, h: 24, filter: 'saturate(0)', opacity: 0.58 },
    { name: 'Mendwell', shape: 'circle', w: 132, h: 22 },
    { name: 'Patchwork', shape: 'diamond', w: 140, h: 19 },
  ],
  team: {
    title: 'Who we are',
    blocks: [
      {
        type: 'p',
        html:
          'Kestrel was started by three people who had spent years on opposite sides of the support desk. Ana Ruiz ran customer operations at a fast-growing lender and learned how much of a support team’s week goes on cases that follow a known procedure. Tomas Reyes built machine learning systems for fraud detection, where every automated decision had to be explained to a regulator. Grace Okafor led platform engineering at a payments company and cared mostly about what happens when systems fail at 3am.<br><br>' +
          'They met while working on the same incident review, and kept talking about why support automation still felt like a menu with better manners. The company began with one design partner and a rule: nothing goes live until it has been tested on real cases.<br><br>' +
          'Today the team includes engineers, designers and support specialists who have worked in banking, health, energy and software. Read more about how we work on our <a href="/careers">careers page</a>, browse <a href="/customer-stories">customer stories</a>, see the <a href="/product/trust">security programme</a>, or <a href="/blog">read the journal</a>.<br><br>' +
          'We are still a small team, and we like it that way: everyone talks to customers, everyone reads conversations and everyone ships.',
      },
    ],
  },
  employees: [
    {
      quote: '“The first thing I did here was sit in on customer reviews for a week. Every feature I have built since started with something I heard in those calls, and that is still how we decide what matters most.”',
      name: 'Lena Vogt',
      role: 'Product Engineer',
      flag: '🇩🇪',
      photo: { src: PH('playbook-avatar-p4l') },
      tint: 'pink',
    },
    {
      quote: '“I came from a contact centre, so I know what a bad hand-off feels like from the agent’s chair. Being able to fix that properly, for thousands of support people at once, is why I joined.”',
      name: 'Imran Qureshi',
      role: 'Support Operations Lead',
      flag: '🇬🇧',
      photo: { src: PH('playbook-avatar-p6l') },
      tint: 'peach',
    },
  ],
}

// ---------------------------------------------------------------------------------------------- /careers
const AVATARS = ['playbook-avatar-p2l', 'playbook-avatar-c', 'proof-portrait-1', 'playbook-avatar-p6l', 'story-3', 'playbook-avatar-p2r', 'proof-portrait-2', 'playbook-avatar-p4r', 'story-5', 'playbook-avatar-p6r']

export const careersPage = {
  docTitle: 'Careers at Kestrel | Join the team',
  hero: { lines: ['Build the support', 'you wish you got.'], cta: { label: 'See open roles', href: '#open-roles' }, avatars: AVATARS.map(PH) },
  gallery: {
    title: 'Life at Kestrel',
    sub: 'Our weeks mix customer calls, design reviews, long whiteboard sessions and the occasional office cook-off. Most of what we ship starts with something a support agent told us over coffee.',
    photos: [
      { src: PH('hero-center'), alt: 'A teammate on a call at her desk' },
      { src: PH('nav-feature-industries'), alt: 'A teammate standing in the office' },
      { src: '', alt: '' },
      { src: PH('hero-br'), alt: 'Two colleagues talking over coffee' },
      { src: PH('hero-tl'), alt: 'A teammate working from the sofa with a coffee' },
      { src: '', alt: '' },
    ],
  },
  values: {
    title: 'Principles we work by',
    sub: 'Five habits we look for in each other and try to protect as the company grows. New joiners are encouraged to challenge any of them.',
    items: [
      { icon: 'pen', tint: 'red', title: 'Leave every system a little easier to change than you found it', body: 'Our customers rely on us to keep improving their agents for years, so we invest in tools, tests and documentation that make tomorrow’s change cheaper than today’s.' },
      { icon: 'target', tint: 'lavender', title: 'Rehearse it before you trust it', body: 'We ask customers to test every playbook before release, and we hold our own work to the same standard. A demo that works once is a start, not a result.' },
      { icon: 'key', tint: 'yellow', title: 'Small teams own whole problems', body: 'Teams of three or four take a problem from first customer interview to the support article that explains the fix, without handing it across a chain of departments.' },
      { icon: 'ear', tint: 'pink', title: 'Disagree early, then commit together', body: 'The best time to argue is before a decision, with evidence on the table. Once a call is made, we back it fully and review it honestly when the results arrive.' },
      { icon: 'heart', tint: 'green', title: 'Celebrate the unglamorous fix', body: 'Shaving a step off a hand-off or untangling a confusing article rarely makes headlines, but it is what customers feel. We make a point of noticing that kind of work.' },
    ],
  },
  team: {
    title: 'Engineers, designers and operators on building Kestrel',
    sub: 'Notes from a few teammates on what their weeks look like.',
    employees: [
      { quote: '“The best part is how close engineering sits to customers. I can watch a conversation go wrong in the morning and ship the fix that afternoon, with the support team cheering in the channel.”', name: 'Tomas Reyes', role: 'Co-founder, Research', flag: '🇪🇸', photo: { src: PH('playbook-avatar-p2l') }, tint: 'pink' },
      { quote: '“I joined expecting to build features. I ended up learning how support teams actually work, which turned out to be far more interesting and far more useful for everything I build.”', name: 'Ana Ruiz', role: 'Co-founder, Operations', flag: '🇲🇽', photo: { src: PH('playbook-avatar-c') }, tint: 'cream' },
      { quote: '“People here are honest about what is not working yet. That honesty is what makes it safe to try ambitious things, because nobody pretends a half-finished idea is done.”', name: 'Grace Okafor', role: 'Co-founder, Engineering', flag: '🇳🇬', photo: { src: PH('playbook-avatar-p2r') }, tint: 'peach' },
      { quote: '“My favourite part of the week is the Thursday call with a customer’s support leads. They tell me what broke, I show them what we changed, and we leave with a list.”', name: 'Mei Tanaka', role: 'Solutions Engineer', flag: '🇯🇵', photo: { src: PH('playbook-avatar-p4r') }, tint: 'grey' },
      { quote: '“Design here means sitting with support agents and watching where they get stuck. The work is practical, the feedback is fast and the problems are genuinely hard ones.”', name: 'Felix Brandt', role: 'Product Designer', flag: '🇦🇹', photo: { src: PH('playbook-avatar-p6r') }, tint: 'lavender' },
      { quote: '“I came from a contact centre, so I know what a bad hand-off feels like from the agent’s chair. Fixing that for thousands of agents at once is why I am here.”', name: 'Imran Qureshi', role: 'Support Operations Lead', flag: '🇬🇧', photo: { src: PH('playbook-avatar-p6l') }, tint: 'pink' },
      { quote: '“Every week I talk to a customer, read their conversations and come back with something to change. Few jobs let you see your impact this directly.”', name: 'Lena Vogt', role: 'Product Engineer', flag: '🇩🇪', photo: { src: PH('playbook-avatar-p4l') }, tint: 'cream' },
      { quote: '“The onboarding was the best I have had: a week reading conversations, a week shipping small fixes, then real ownership. I felt useful from the very first Friday.”', name: 'Priya Natarajan', role: 'Customer Engineer', flag: '🇮🇳', photo: { src: PH('proof-portrait-1') }, tint: 'peach' },
    ],
  },
  roles: {
    title: 'Come build with us',
    sub: 'We hire carefully and often. If nothing fits yet, write to us anyway.',
    boardHref: '#',
    // Ashby-style job board data (local placeholder; the live widget fetches the Ashby public API and fails).
    jobs: [
      { title: 'Senior Product Engineer', department: 'Engineering', location: 'London', type: 'Full time', remote: false },
      { title: 'Machine Learning Engineer, Evaluation', department: 'Engineering', location: 'Toronto', type: 'Full time', remote: false },
      { title: 'Platform Engineer, Voice', department: 'Engineering', location: 'Lisbon', type: 'Full time', remote: true },
      { title: 'Solutions Engineer', department: 'Customer', location: 'London', type: 'Full time', remote: false },
      { title: 'Customer Success Lead, Healthcare', department: 'Customer', location: 'Toronto', type: 'Full time', remote: true },
      { title: 'Product Designer', department: 'Design', location: 'Lisbon', type: 'Full time', remote: false },
    ],
  },
}
