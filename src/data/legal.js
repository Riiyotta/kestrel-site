// Legal pages – SPEC_PAGES_C T3 (/privacy-policy, /terms-of-service). Rendered by src/pages/company/LegalPage.jsx
// with <RichText variant="legal">.
//
// SAMPLE TEXT ONLY. This is generic placeholder copy for the fictional product "Kestrel", written for the demo site.
// It is not a real privacy policy or contract and was not derived from any real company's policies.
//
// Shape per page: { slug, title, docTitle, sectionGapSm, body: RichTextBlock[] }
//   sectionGapSm – the H1 -> first block and section -> next H4 gap below 1200px. The live template uses 24 on the
//   privacy page and 100 on the terms page (a Framer inconsistency, SPEC_PAGES_C T3 Layout); both are kept.
// Structure follows the spec's content shape: privacy = italic effective-date intro + 13 H4 sections (~8.7k chars);
// terms = intro + 10 numbered upper-case H4 sections (~19.6k chars). Bullets are typed "- " lines separated by <br>
// inside a paragraph, and numbered clauses ("2.1") are typed into the text, as on the live pages.

/** @typedef {import('./types.js').RichTextBlock} RichTextBlock */

const SAMPLE_NOTE =
  '<strong>Sample text.</strong> This page is placeholder copy for the fictional Kestrel demo site. It is not a real policy, it creates no rights or obligations, and it should not be relied on for anything.'

/** @type {RichTextBlock[]} */
const privacyBody = [
  {
    type: 'p',
    html: `<em>Effective date: 1 January 2026</em><br>${SAMPLE_NOTE}<br><br>This Privacy Policy describes how Kestrel ("Kestrel", "we", "us") collects, uses and shares information when you visit our website, talk to us about our products, or use the Kestrel customer support platform. It also explains the choices you have. If anything here is unclear, write to <a href="mailto:privacy@kestrel.example">privacy@kestrel.example</a> and a member of the team will help.`,
  },
  { type: 'h4', text: 'Information we collect' },
  {
    type: 'p',
    html: 'We collect information in three ways: when you give it to us, when you use our services, and when trusted partners share it with us. The categories below describe what that usually includes.<br>- Contact details, such as your name, work email address, company name and job title.<br>- Account details, such as login credentials, workspace settings and billing contacts.<br>- Usage information, such as pages viewed, features used, device type, browser and approximate location derived from an IP address.<br>- Communications, such as messages you send to our team, survey answers and event registrations.',
  },
  {
    type: 'p',
    html: 'We do not ask for sensitive categories of personal information through the website, and we ask that you do not send them to us unless we have specifically requested them for a support case. Some information is collected automatically by our servers and analytics tools when you load a page, such as the referring page, the time of your visit and basic performance data. We may also receive business contact details from event organisers, resellers or publicly available professional directories, which we combine with the information you give us so that our records stay accurate.',
  },
  { type: 'h4', text: 'Customer data processed on the platform' },
  {
    type: 'p',
    html: 'When a business uses Kestrel to answer its own customers, the conversations, tickets and records involved belong to that business. We process that content only on the business’s instructions and under a separate agreement with them. If you are an end customer of a business that uses Kestrel, please contact that business directly about your information; we will help them respond to your request where we can.',
  },
  { type: 'h4', text: 'How we use information' },
  {
    type: 'p',
    html: 'We use the information we collect to run, maintain and improve our services, and for the purposes below.<br>- To provide the product, including authentication, configuration and support.<br>- To respond to enquiries, demo requests and partnership requests.<br>- To send service notices, security alerts and, where permitted, product news.<br>- To understand how the website is used so we can make it clearer and faster.<br>- To detect, investigate and prevent fraud, abuse and security incidents.<br>- To meet legal, tax and accounting obligations.'
  },
  {
    type: 'p',
    html: 'We do not use information collected through the website to make decisions that have legal or similarly significant effects on you. Where we use automated tools to sort enquiries or suggest replies, a member of our team reviews the result before it is acted on. If we want to use information for a purpose that is not compatible with the purposes above, we will tell you first and, where required, ask for your consent.',
  },
  { type: 'h4', text: 'Legal bases for processing' },
  {
    type: 'p',
    html: 'Where the law requires a legal basis, we rely on one of the following: performing a contract with you or your organisation; our legitimate interests in operating and improving a secure business, balanced against your rights; your consent, which you can withdraw at any time; or compliance with a legal obligation.',
  },
  { type: 'h4', text: 'Cookies and similar technologies' },
  {
    type: 'p',
    html: 'The website uses a small number of cookies and local storage entries. Some are strictly necessary, for example to remember your cookie choice or keep you signed in. Others help us measure visits and understand which pages are useful. You can accept or decline non-essential cookies in the banner, and you can clear or block cookies in your browser settings at any time. Declining them will not stop the website from working. We review the cookies we use at least once a year and remove any that are no longer needed. Where a third party sets a cookie on our behalf, for example an analytics provider, that provider may only use the information to deliver its service to us and may not use it for its own advertising.',
  },
  { type: 'h4', text: 'How we share information' },
  {
    type: 'p',
    html: 'We do not sell personal information. We share it only as described here.<br>- With other companies in the Kestrel group, which follow this policy.<br>- With service providers who host infrastructure, send email, process payments or provide analytics for us, under written agreements that limit their use of the data.<br>- With professional advisers such as auditors and lawyers, where needed.<br>- With authorities, when we are legally required to or need to protect the rights, safety or property of Kestrel, our customers or others.<br>- With a successor organisation, if Kestrel is involved in a merger, acquisition or sale of assets, in which case we will tell you before your information becomes subject to a different policy.',
  },
  { type: 'h4', text: 'International transfers' },
  {
    type: 'p',
    html: 'Our team and service providers may be located in different countries. When information moves across borders we use recognised safeguards, such as standard contractual clauses, and we choose providers that offer a comparable level of protection. You can ask us for more information about the safeguards that apply to a particular transfer by contacting us at the address below.',
  },
  { type: 'h4', text: 'Data retention' },
  {
    type: 'p',
    html: 'We keep personal information for as long as we need it for the purposes above, for as long as an account is active, or as long as the law requires. When we no longer need it we delete it or make it anonymous. Customer data on the platform is retained according to the settings and agreement of the business that controls it. As a guide, enquiry and demo-request records are kept for up to two years after our last contact with you, billing records are kept for as long as tax law requires, and backups are overwritten on a rolling schedule of around thirty-five days.',
  },
  { type: 'h4', text: 'Security' },
  {
    type: 'p',
    html: 'We use administrative, technical and physical measures designed to protect information, including encryption in transit and at rest, role-based access, logging and regular reviews. No system is perfectly secure, so we also maintain an incident response process and will notify affected customers and regulators where the law requires. Access to production systems is limited to staff who need it for their role, protected by multi-factor authentication and reviewed each quarter. Our service providers are assessed before we engage them and are bound by confidentiality and security commitments at least as protective as our own. If you believe you have found a security issue, please report it to <a href="mailto:security@kestrel.example">security@kestrel.example</a> so we can investigate.',
  },
  { type: 'h4', text: 'Your rights and choices' },
  {
    type: 'p',
    html: 'Depending on where you live, you may have the right to:<br>- ask for a copy of the personal information we hold about you;<br>- ask us to correct information that is inaccurate or incomplete;<br>- ask us to delete information, subject to legal exceptions;<br>- object to or restrict certain processing, including direct marketing;<br>- receive your information in a portable format;<br>- withdraw consent where we rely on it.',
  },
  {
    type: 'p',
    html: 'To make a request, email <a href="mailto:privacy@kestrel.example">privacy@kestrel.example</a>. We may need to confirm your identity before acting, and we will respond within the time the law allows. You can unsubscribe from marketing emails using the link at the bottom of each message.',
  },
  {
    type: 'p',
    html: 'You also have the right to complain to your local data protection authority. We would appreciate the chance to resolve your concern first, so please contact us before you do. If you are an Authorised User of a business that uses Kestrel, some requests about your account may need to go through your organisation\u2019s administrator, who controls the workspace.',
  },
  { type: 'h4', text: 'Children' },
  {
    type: 'p',
    html: 'Kestrel is a business product and is not directed at children. We do not knowingly collect information from anyone under 16. If you believe a child has given us information, contact us and we will delete it.',
  },
  { type: 'h4', text: 'Changes to this policy' },
  {
    type: 'p',
    html: 'We may update this policy from time to time. When we do, we will change the effective date at the top of the page and, if the changes are significant, let customers know by email or in the product before they take effect. Earlier versions of this policy are available on request. We encourage you to review this page from time to time so you stay informed about how we handle information.',
  },
  { type: 'h4', text: 'Contact us' },
  {
    type: 'p',
    html: 'Questions about this policy or our privacy practices can be sent to <a href="mailto:privacy@kestrel.example">privacy@kestrel.example</a>, or by post to Kestrel Privacy Team, 100 Example Street, Sample City. Please include enough detail for us to understand and respond to your request. We aim to acknowledge every privacy enquiry within five working days. If you are contacting us on behalf of someone else, please include evidence that you are authorised to act for them.',
  },
]

/** @type {RichTextBlock[]} */
const termsBody = [
  {
    type: 'p',
    html: `<em>Last updated: 1 January 2026</em><br>${SAMPLE_NOTE}<br><br>These Terms of Service ("Terms") govern access to and use of the Kestrel website, platform, application programming interfaces and related services (together, the "Services"). They form an agreement between Kestrel ("Kestrel", "we", "us") and the organisation that signs up for or uses the Services ("Customer", "you"). If you accept these Terms on behalf of an organisation, you confirm that you have authority to bind it.<br><br>Please read these Terms carefully. By creating an account, signing an order form that references these Terms, or using the Services, you agree to them. If you do not agree, do not use the Services. Where an order form or separate written agreement signed by both parties conflicts with these Terms, that document takes priority for the matters it covers.`,
  },
  { type: 'h4', text: '1. DEFINITIONS' },
  {
    type: 'p',
    html: '1.1 "Account" means the workspace created for Customer to access the Services.<br>1.2 "Authorised User" means an employee or contractor of Customer whom Customer permits to use the Services under its Account.<br>1.3 "Customer Data" means all content, records, conversations and other information submitted to the Services by or for Customer, including information about Customer’s own end customers.<br>1.4 "Documentation" means the user guides and technical materials Kestrel makes available for the Services, as updated from time to time.<br>1.5 "Order Form" means an ordering document, online sign-up flow or quote accepted by Customer that specifies the Services, subscription term and fees.<br>1.6 "Output" means responses, summaries, classifications and other material generated by the Services from Customer Data.<br>1.7 "Subscription Term" means the period stated in the Order Form, together with any renewal periods.<br>1.8 "Connected System" means a third-party application, helpdesk, database or other system that Customer links to the Services so that the Services can read information or take actions.<br>1.9 Headings are for convenience only, "including" means "including without limitation", and the singular includes the plural.',
  },
  { type: 'h4', text: '2. ACCESS TO THE SERVICES' },
  {
    type: 'p',
    html: '2.1 Subject to these Terms and payment of the applicable fees, Kestrel grants Customer a non-exclusive, non-transferable right during the Subscription Term to access and use the Services for its internal business purposes, in accordance with the Documentation and any limits in the Order Form.<br>2.2 Customer is responsible for its Authorised Users and for all activity under its Account. Customer will keep login credentials confidential and tell Kestrel promptly if it suspects unauthorised access.<br>2.3 Kestrel may update the Services from time to time. Updates will not materially reduce the core functionality of the Services during a paid Subscription Term.<br>2.4 Kestrel will provide standard support during business hours through the channels described in the Documentation, and will use commercially reasonable efforts to make the Services available at least 99.5% of each calendar month, excluding scheduled maintenance announced in advance and events described in section 10.5.<br>2.5 Free trials and beta features are provided for evaluation, may be changed or withdrawn at any time, and are provided "as is" without any commitment as to availability or support. Trial access ends on the date communicated at sign-up unless converted to a paid subscription.<br>2.6 Kestrel may suspend access, in whole or in part, if reasonably necessary to prevent harm to the Services or other customers, to respond to a security incident, or if fees are overdue by more than thirty days after notice. Kestrel will give notice where practicable and restore access promptly once the issue is resolved.',
  },
  { type: 'h4', text: '3. CUSTOMER OBLIGATIONS AND ACCEPTABLE USE' },
  {
    type: 'p',
    html: '3.1 Customer will use the Services in compliance with applicable laws, including laws on consumer protection, privacy, electronic communications and record keeping, and will be responsible for the instructions, policies and knowledge sources it configures.<br>3.2 Customer will not, and will not permit anyone to:<br>- copy, modify, sell, resell or sublicense the Services except as expressly allowed;<br>- reverse engineer or attempt to extract the source code or underlying models of the Services, except to the extent the law allows despite this restriction;<br>- use the Services to build a competing product or to benchmark it for publication without Kestrel’s written consent;<br>- upload malicious code, interfere with the integrity or performance of the Services, or attempt to gain unauthorised access to any system;<br>- use the Services to send unsolicited communications, to harass any person, or to make decisions with legal or similarly significant effects on individuals without appropriate human review;<br>- misrepresent automated responses as coming from a human where the law requires disclosure;<br>- submit information that Customer does not have the right to share.<br>3.3 Customer is responsible for reviewing how the Services are configured for its use case, including escalation rules, approval steps and the actions the Services are permitted to take in connected systems. Customer will test material configuration changes in a non-production environment or with limited traffic before releasing them to all of its end customers, and will keep the policies and knowledge sources it provides accurate and up to date.',
  },
  {
    type: 'p',
    html: '3.4 If Customer connects third-party applications to the Services, Customer authorises Kestrel to exchange data with those applications as needed to provide the Services. Third-party applications are governed by their own terms, and Kestrel is not responsible for them.<br>3.5 Customer will provide reasonable cooperation, information and access needed for Kestrel to deliver onboarding, configuration or support services described in an Order Form. Delays caused by a lack of such cooperation will extend any related timelines accordingly.',
  },
  { type: 'h4', text: '4. FEES, BILLING AND TAXES' },
  {
    type: 'p',
    html: '4.1 Customer will pay the fees set out in the Order Form. Unless the Order Form says otherwise, subscription fees are invoiced annually in advance and usage-based fees are invoiced monthly in arrears, and invoices are due within thirty days of the invoice date.<br>4.2 Fees are exclusive of taxes. Customer is responsible for all sales, use, value-added and similar taxes associated with its purchase, other than taxes on Kestrel’s net income.<br>4.3 Late amounts may accrue interest at the lower of one percent per month or the maximum rate permitted by law. Kestrel will give written notice before charging interest or suspending the Services for non-payment.<br>4.4 Except as stated in these Terms, fees are non-cancellable and non-refundable. Kestrel may change its prices for a renewal term by giving notice at least sixty days before the renewal date.<br>4.5 If Customer disputes an invoice in good faith, it will tell Kestrel within fifteen days of receiving it and pay the undisputed portion on time. The parties will work together to resolve the dispute promptly.',
  },
  { type: 'h4', text: '5. CUSTOMER DATA, OUTPUT AND PRIVACY' },
  {
    type: 'p',
    html: '5.1 As between the parties, Customer owns Customer Data and Output. Customer grants Kestrel a limited licence to host, process, transmit and display Customer Data and Output solely to provide, secure and support the Services and as otherwise instructed by Customer.<br>5.2 Kestrel will not use Customer Data to train models made available to other customers unless Customer gives its express written permission.<br>5.3 Kestrel may collect and use aggregated, de-identified information about the operation of the Services, such as volumes, latency and feature usage, to maintain and improve them, provided that such information does not identify Customer, its Authorised Users or any individual.<br>5.4 Where Kestrel processes personal information on Customer’s behalf, the data processing terms referenced in the Order Form apply and form part of these Terms. Kestrel’s handling of information about website visitors is described in its Privacy Policy.<br>5.5 Kestrel will maintain reasonable administrative, physical and technical safeguards designed to protect Customer Data, and will notify Customer without undue delay after becoming aware of a security incident affecting Customer Data.<br>5.6 Output is generated automatically and may be inaccurate or incomplete. Customer is responsible for deciding how Output is used, for configuring appropriate review steps, and for any communications it sends to its own customers.<br>5.7 On expiry or termination, Customer may export Customer Data for thirty days using the tools provided. After that period Kestrel will delete Customer Data in accordance with its standard retention schedule, unless the law requires it to be kept.',
  },
  { type: 'h4', text: '6. INTELLECTUAL PROPERTY' },
  {
    type: 'p',
    html: '6.1 Kestrel and its licensors own all rights in the Services, the Documentation and all related software, models, designs and know-how, including improvements. Nothing in these Terms transfers those rights to Customer.<br>6.2 If Customer or its Authorised Users give feedback or suggestions about the Services, Kestrel may use them without restriction or obligation, provided it does not identify Customer publicly as their source.<br>6.3 Customer grants Kestrel permission to list Customer’s name and logo as a customer on Kestrel’s website and in sales materials, unless Customer opts out by written notice. Any other publicity requires Customer’s prior written approval.',
  },
  { type: 'h4', text: '7. CONFIDENTIALITY' },
  {
    type: 'p',
    html: '7.1 "Confidential Information" means non-public information disclosed by one party to the other that is marked as confidential or would reasonably be understood to be confidential, including Customer Data, pricing and product roadmaps.<br>7.2 The receiving party will use the disclosing party’s Confidential Information only to perform under these Terms, will protect it with at least reasonable care, and will share it only with employees, contractors and advisers who need to know it and are bound by similar obligations.<br>7.3 These obligations do not apply to information that is or becomes public through no fault of the receiving party, was already known to it without restriction, is independently developed, or is lawfully received from a third party without restriction.<br>7.4 The receiving party may disclose Confidential Information if required by law, provided it gives the disclosing party prompt notice where legally permitted and reasonable help to seek protective treatment.',
  },
  { type: 'h4', text: '8. WARRANTIES AND DISCLAIMERS' },
  {
    type: 'p',
    html: '8.1 Kestrel warrants that during a paid Subscription Term the Services will perform materially in accordance with the Documentation. If they do not, Customer must tell Kestrel in writing, and Kestrel will use reasonable efforts to correct the non-conformity. If Kestrel cannot do so within a reasonable time, either party may terminate the affected Services and Kestrel will refund any prepaid fees for the remainder of the term. This is Customer’s sole remedy for breach of this warranty.<br>8.2 Each party warrants that it has the authority to enter into these Terms and will comply with laws applicable to its performance.<br>8.3 Kestrel warrants that it will not knowingly introduce malicious code into the Services, and that it will not materially decrease the overall security of the Services during a paid Subscription Term.<br>8.4 Customer warrants that it has all rights, notices and consents needed to submit Customer Data to the Services and to allow Kestrel to process it as described in these Terms.<br>8.5 EXCEPT AS EXPRESSLY STATED IN THESE TERMS, THE SERVICES AND OUTPUT ARE PROVIDED "AS IS". TO THE MAXIMUM EXTENT PERMITTED BY LAW, KESTREL DISCLAIMS ALL OTHER WARRANTIES, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT, AND ANY PROMISE THAT THE SERVICES WILL RUN WITHOUT INTERRUPTION OR DEFECTS, OR THAT ANY OUTPUT WILL BE CORRECT.',
  },
  { type: 'h4', text: '9. LIABILITY AND INDEMNITIES' },
  {
    type: 'p',
    html: '9.1 Kestrel will defend Customer against any third-party claim alleging that the Services, as provided by Kestrel and used in accordance with these Terms, infringe that third party’s intellectual property rights, and will pay damages and costs finally awarded or agreed in settlement. If such a claim is made or appears likely, Kestrel may modify the Services, obtain a licence, or terminate the affected Services and refund prepaid fees for the remaining term. This obligation does not apply to claims arising from Customer Data, from combinations with items not supplied by Kestrel, or from use in breach of these Terms.<br>9.2 Customer will defend Kestrel against any third-party claim arising from Customer Data, from Customer’s configuration or use of the Services in breach of these Terms or applicable law, or from communications Customer sends using the Services, and will pay damages and costs finally awarded or agreed in settlement.<br>9.3 Customer acknowledges that the Services may take actions in Connected Systems according to the permissions Customer grants, and that Customer is responsible for choosing those permissions and for reviewing actions that require approval.<br>9.4 A party seeking defence must give prompt written notice of the claim, allow the other party to control the defence and settlement (provided no settlement imposes obligations on the indemnified party without its consent), and provide reasonable cooperation at the indemnifying party’s expense.',
  },
  {
    type: 'p',
    html: '9.5 TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, GOODWILL OR DATA, EVEN IF ADVISED OF THEIR POSSIBILITY.<br>9.6 EACH PARTY’S TOTAL LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS WILL NOT EXCEED THE FEES PAID AND PAYABLE BY CUSTOMER FOR THE SERVICES IN THE TWELVE MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM.<br>9.7 The limits in sections 9.5 and 9.6 do not apply to Customer’s payment obligations, to either party’s obligations under sections 9.1 and 9.2, to breaches of section 7, or to liability that cannot be limited under applicable law.<br>9.8 The parties agree that these limitations reflect a reasonable allocation of risk and form an essential basis of the bargain between them, and that they apply regardless of the theory of liability, whether in contract, tort, negligence or otherwise.',
  },
  { type: 'h4', text: '10. TERM, TERMINATION AND GENERAL' },
  {
    type: 'p',
    html: '10.1 These Terms start when Customer first accepts them and continue until all Subscription Terms have ended. Unless the Order Form says otherwise, each Subscription Term renews automatically for a period equal to the initial term, unless either party gives notice of non-renewal at least thirty days before the end of the current term.<br>10.2 Either party may terminate these Terms by written notice if the other party materially breaches them and does not cure the breach within thirty days of notice, or if the other party becomes insolvent or ceases to operate in the ordinary course.<br>10.3 On termination, Customer’s right to use the Services ends, Customer will pay any fees due for the period before termination, and sections that by their nature should survive will survive, including sections 4, 5.7, 6, 7, 8.5, 9 and 10.<br>10.4 Customer may terminate a Subscription Term for convenience only where the Order Form expressly allows it, in which case any prepaid fees are non-refundable unless the Order Form states otherwise.<br>10.5 Neither party is liable for delays or failures caused by events beyond its reasonable control, such as natural disasters, wide-scale network outages, acts of government or labour disputes not involving its own staff, provided it uses reasonable efforts to resume performance.<br>10.6 Neither party may assign these Terms without the other’s written consent, except to a successor in a merger, acquisition or sale of substantially all of its assets, provided the successor agrees to be bound.<br>10.7 Notices must be in writing and sent to the addresses in the Order Form or, for Kestrel, to <a href="mailto:legal@kestrel.example">legal@kestrel.example</a>. Notices are effective on receipt.<br>10.8 These Terms are governed by the laws of the jurisdiction stated in the Order Form, without regard to its conflict-of-laws rules, and the courts of that jurisdiction will have exclusive jurisdiction over any dispute.<br>10.9 These Terms, together with any Order Forms and documents they reference, are the entire agreement between the parties on their subject matter and replace any prior discussions. Kestrel may update these Terms by posting a revised version and giving notice; updates take effect at the start of the next Subscription Term unless Customer agrees otherwise. If any provision is found unenforceable, the rest will remain in effect. A failure to enforce a provision is not a waiver. The parties are independent contractors, and nothing in these Terms creates a partnership, agency or employment relationship.',
  },
  {
    type: 'p',
    html: 'Questions about these Terms can be sent to <a href="mailto:legal@kestrel.example">legal@kestrel.example</a>.',
  },
]

export const legalPages = [
  { slug: 'privacy-policy', title: 'Privacy policy', docTitle: 'Privacy policy | Kestrel', sectionGapSm: 24, body: privacyBody },
  { slug: 'terms-of-service', title: 'Terms of service', docTitle: 'Terms of service | Kestrel', sectionGapSm: 100, body: termsBody },
]

export const getLegalPage = (slug) => legalPages.find((p) => p.slug === slug)
