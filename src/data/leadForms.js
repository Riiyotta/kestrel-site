// Lead-form pages – SPEC_PAGES_C T2 (/partner, /nominate). Rendered by src/pages/company/PartnerPage.jsx and
// NominatePage.jsx with the shared Field / FileDropZone / SubmitButton / Form primitives and LogoWall.
// Original placeholder copy for the fictional product "Kestrel". The forms never send data anywhere.
// Lengths follow the spec (role, line count, ~char count).

/** @typedef {import('./types.js').LogoEntry} LogoEntry */

// F3 LogoWall: 17 placeholder logos, h 18–31 (spec: 17 customer logos, h 18–31, gap 96).
/** @type {LogoEntry[]} */
export const logoWallLogos = [
  { name: 'Quillfin', shape: 'diamond', w: 144, h: 30 },
  { name: 'Harbourline', shape: 'bars', w: 142, h: 28 },
  { name: 'Corvane', shape: 'plus', w: 150, h: 24 },
  { name: 'Saltmere', shape: 'triangle', w: 170, h: 18 },
  { name: 'Brightpaw', shape: 'arc', w: 180, h: 31 },
  { name: 'Fernlo', shape: 'circle', w: 95, h: 28 },
  { name: 'Ostrin', shape: 'square', w: 85, h: 26 },
  { name: 'Mossgate', shape: 'square', w: 132, h: 30 },
  { name: 'Veloma', shape: 'ring', w: 93, h: 25 },
  { name: 'Arcwise', shape: 'arc', w: 111, h: 21 },
  { name: 'Nimbly', shape: 'circle', w: 119, h: 22 },
  { name: 'Tidewell', shape: 'bars', w: 128, h: 24 },
  { name: 'Larchly', shape: 'triangle', w: 104, h: 27 },
  { name: 'Pebblo', shape: 'ring', w: 98, h: 20 },
  { name: 'Ambergate', shape: 'diamond', w: 156, h: 23 },
  { name: 'Crestor', shape: 'plus', w: 116, h: 29 },
  { name: 'Wrenfield', shape: 'circle', w: 138, h: 19 },
]

// ~43 chars, 1 line at 1440, 2 lines in 262 at 390
export const logoWallHeading = 'Picked by support teams who care about the small stuff…'

export const partnerPage = {
  docTitle: 'Partner with Kestrel | Kestrel',
  // H1 ~39 chars: 3 lines in 600 @1440, 2 @1280, 1 in 960 @1000, 2 @390 (as measured)
  title: 'Want to build something with Kestrel?',
  // two paragraphs: ~160 chars (4 lines in 361) + ~31 chars (2 lines); inline mailto link
  body: [
    'We team up with agencies, consultancies and software vendors who help support teams take on harder work. If you see a way we could create something useful together, tell us.',
    'Write to <a href="mailto:partners@kestrel.example">partners@kestrel.example</a> or use the form →',
  ],
  success: 'Thanks for reaching out. This is a demo form, so nothing was sent, but on a live site the partnerships team would reply within a few days.',
  submitLabel: 'Submit',
  fields: {
    firstName: { name: 'first_name', label: 'First name', placeholder: 'First name*' },
    lastName: { name: 'last_name', label: 'Last name', placeholder: 'Last name*' },
    email: { name: 'email', type: 'email', label: 'Work email', placeholder: 'Work email*' },
    website: { name: 'website', type: 'url', label: 'Company website', placeholder: 'Company website*' },
    message: { name: 'message', type: 'textarea', label: 'Partnership idea', placeholder: 'Tell us briefly what you have in mind*' },
  },
}

export const nominatePage = {
  docTitle: 'Nominate a company | Kestrel',
  // H1 rendered as two centred lines (~17 + ~17 chars)
  titleLines: ['Nominate a brand', 'for Kestrel to fix'],
  // ~91 chars incl. 2 emoji; 1 line @1440, 2 lines @390
  sub: 'Had a support experience that left you 😩😤? Tell us who it was and we’ll try to fix it.',
  success: 'Thanks for the nomination. This is a demo form, so nothing was sent anywhere.',
  submitLabel: 'Send nomination',
  fields: {
    name: { name: 'name', label: 'Your name', placeholder: 'Sam Rivera' },
    email: { name: 'email', type: 'email', label: 'Email', placeholder: 'sam@example.com' },
    domain: { name: 'domain', type: 'url', label: 'Company you’re nominating', placeholder: 'https://example.com' },
    story: { name: 'story', type: 'textarea', label: 'What went wrong?', placeholder: 'Give us the whole story…' },
  },
  upload: { label: 'Add a screenshot or recording', name: 'attachment', helper: 'Click to choose a file or drop it here. Max 25 MB' },
}
