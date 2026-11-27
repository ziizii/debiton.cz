---
# Home page (one-pager), English version of content/cs/_index.md.
# Keep the keys in sync with the Czech file; translate only the values.
title: Debiton – B2B debt collection for 0 %
description: >-
  Offer for the first 50 companies, bulk collection: we collect debts between
  businesses for 0 % of the amount recovered, including small invoices with no
  minimum amount. Reminders are sent by a law firm and the debtor bears the costs.
og:
  title: Debiton – B2B debt collection for 0 %
  description: >-
    Offer for the first 50 companies, bulk collection. The debtor bears the collection
    costs and you receive the full amount owed. Small invoices too, no minimum amount.

nav:
  - { label: How it works, href: "#how-it-works" }
  - { label: Process, href: "#process" }
  - { label: Price, href: "#price" }
  - { label: Calculator, href: "#calculator" }
  - { label: FAQ, href: "#faq" }
  - { label: Contact, href: "#contact" }
headerCta: { label: Upload invoice, href: "#upload" }
skipLink: Skip to the form
mobileCta: Upload an unpaid invoice

hero:
  badge: Offer for the first 50&nbsp;companies – bulk collection
  title: B2B debt collection for&nbsp;0&nbsp;%
  text: >-
    Is a customer late paying your invoice? We are now collecting bulk B2B claims for
    0&nbsp;% of the amount recovered. The debtor bears all collection costs and we
    send you the full amount owed.
  ctas:
    - { label: Upload an unpaid invoice, href: "#upload" }
    - { label: "Calculate what you are owed", href: "#calculator", ghost: true }
  checks:
    - Small invoices too, no minimum amount
    - Other claims too, including against consumers, for a percentage of the amount recovered
    - Reminders are sent by a law firm
    - Free initial assessment, we reply within 1&nbsp;business day
  invoice:
    title: Invoice
    number: INV&nbsp;2026/0142
    meta:
      - { label: Customer, value: Customer s.r.o. }
      - { label: Due date, value: 3&nbsp;Oct&nbsp;2026 }
    overdue: Overdue
    rows:
      - { label: Amount owed, value: "CZK&nbsp;50,000" }
      - { label: Debt recovery costs, note: paid by the debtor, value: "+&nbsp;CZK&nbsp;1,200" }
      - { label: "Late-payment interest 11.75&nbsp;% p.a.", note: paid by the debtor, value: +&nbsp;interest }
    youGet: { label: You receive, value: "CZK&nbsp;50,000" }
    youPay: { label: You pay us, value: CZK&nbsp;0 }
    stamp: Paid
    caption: >-
      Example. The CZK&nbsp;1,200 and the late-payment interest are paid by the debtor.
      We keep these amounts as our fee.
  facts:
    - { value: 0&nbsp;%, text: of the amount recovered on B2B claims }
    - { value: "CZK&nbsp;1,200", text: per invoice paid by the debtor under Government Regulation No.&nbsp;351/2013&nbsp;Coll. }
    - { value: 7&nbsp;days, text: for the debtor to pay after a reminder and after a letter before action }
    - { value: "CZK&nbsp;7,900", text: "plus VAT, the usual fee for a payment order, only with your consent" }

form:
  id: upload
  subject: Debiton – vymáhání pohledávek  # subject of the notification e-mail (kept in Czech for the office)
  title: Do you have unpaid invoices?
  lead: Upload your documents and leave us your contact details. We will get back to you within 1&nbsp;business day.
  next:
    - { title: We get back to you, text: "Within 1&nbsp;business day we tell you how we see the claim." }
    - { title: You sign a power of attorney, text: "For the law firm, electronic signature is fine. Nothing to print." }
    - { title: The law firm writes to the debtor, text: "It sends a friendly reminder or goes straight to a letter before action." }
  call: Prefer to call?
  thanksTitle: Thank you!
  thanksText: We will get back to you within <strong>1&nbsp;business day</strong>.
  # {email} and {phone} are replaced with links; the phone part is dropped while
  # params.contact.phone is empty.
  submitError: Sending failed. Please try again or send us the documents at {email}
  submitErrorPhone: ", or call {phone}"
  filesLabel: Invoices, contracts or other documents
  dropTitle: Drag files here or click
  dropHint: PDF, Word, Excel or photos, you can upload several files
  contactLegend: Your contact details
  contactHint: An e-mail or a phone number is enough
  emailLabel: Your e-mail
  emailPlaceholder: name@company.com
  phoneLabel: Your phone number
  phonePlaceholder: +420 777 123 456
  companyLabel: Your company
  companyPlaceholder: Name or company ID
  messageLabel: Comment on the unpaid claim
  messagePlaceholder: If needed – you don't have to explain the unpaid invoice to us 😉
  optional: (optional)
  submit: Send for a free assessment
  sending: Sending…
  sendingNote: Uploading files, please wait…
  fine: No obligation. The assessment is free.
  legal: >-
    By submitting the form you acknowledge our <a href="/en/privacy-policy/">privacy
    policy</a>. This site is protected by reCAPTCHA and the Google
    <a href="https://policies.google.com/privacy?hl=en" rel="noopener">Privacy
    Policy</a> and <a href="https://policies.google.com/terms?hl=en"
    rel="noopener">Terms of Service</a> apply.
  removeFile: Remove file
  companyPrefix: "Firma: "
  errors:
    contact: Please enter an e-mail or a phone number so that we can get back to you.
    email: Please enter a valid e-mail so that we can get back to you.
    phone: Please enter a valid phone number.
    size: The files are larger than 25 MB in total. Please send only the unpaid invoices, make them smaller, or send us the rest by e-mail at info@debiton.cz.

how:
  id: how-it-works
  title: How it works
  text: For claims between businesses, Czech law makes the debtor bear the collection costs. That is why collection costs you nothing.
  items:
    - icon: percent
      title: B2B claims for 0&nbsp;%
      text: For claims between businesses, our fee under the offer is <strong>0&nbsp;% of the amount recovered</strong>. The debtor bears all collection costs.
    - icon: search
      title: Free initial assessment
      text: Send us the invoice or contract and we will promptly tell you how to proceed.
    - icon: invoice
      title: Small invoices too, no contract needed
      text: We collect claims of any size, <strong>small invoices too, with no minimum amount</strong>. We do not need a written contract.
    - icon: scales
      title: A letter from a lawyer
      text: Reminders and demands are sent to the debtor by a cooperating law firm. We always act fairly and lawfully.

steps:
  title: How does it work?
  text: No risks, no fees.
  items:
    - title: Send us the documents
      text: Upload invoices or contracts using the form above. A PDF or a photo from your phone is enough.
    - title: We assess the case for free
      text: We promptly propose the best solution and send you a power of attorney for the law firm. You can sign it electronically.
    - title: We recover the claim
      text: For B2B claims you pay 0&nbsp;% of the amount recovered and the debtor bears the collection costs. For other claims our fee is typically 10&nbsp;% of the amount recovered.

timeline:
  id: process
  title: How we proceed against the debtor
  text: A friendly reminder, a letter before action and court only with your consent. All letters are sent to the debtor on your behalf by a cooperating law firm.
  items:
    - day: Day 0
      title: Friendly reminder
      text: If the invoice is only slightly overdue, or if you wish, the law firm first sends the debtor a friendly reminder. Besides the amount owed, it only claims the CZK&nbsp;1,200 debt recovery costs and late-payment interest.
    - day: Day 7
      title: Letter before action
      text: If the debtor does not pay within 7&nbsp;days of the reminder, the law firm sends a letter before action. If the invoice has been overdue for longer, the letter before action goes out straight away.
    - day: Day 14 and later
      title: Payment order
      text: If the debtor does not pay even after the letter before action, the law firm can apply for an electronic payment order. We always discuss this step with you first. The application is filed for a fee, usually CZK&nbsp;7,900 plus VAT.
      tag: Only with your consent
    - day: The debtor pays
      title: We send you the money
      text: We promptly send you the full amount owed that we have recovered. The CZK&nbsp;1,200 costs and the late-payment interest were paid by the debtor.
      final: true

letter:
  id: debtor
  title: A letter from a lawyer, not another reminder from accounts
  lead: "A debtor can easily ignore a reminder from your accountant. A letter from the law firm that represents you is a clear signal: the matter is in a lawyer’s hands, a deadline is running and the next step is court."
  ticks:
    - A clear statement of the amount owed, the interest and CZK&nbsp;1,200 per invoice
    - A factual and polite tone
    - A clear 7-day deadline for payment
    - The letter before action meets the requirements of Section&nbsp;142a of the Czech Civil Procedure Code, so the debtor can then be ordered to pay the costs of proceedings
  compare:
    head: ["", "Reminder from accounts", "Letter from a law firm"]
    rows:
      - [Who writes, Your accountant, "The lawyer representing you"]
      - [How the debtor sees it, One of many reminders, The creditor means business]
      - [What comes next, Another reminder, Letter before action and payment order]
  sample:
    ariaLabel: Sample friendly reminder from a law firm
    from: Law firm
    onBehalf: on behalf of Věřitel s.r.o.
    badge: SAMPLE
    subject: "<b>Re:</b> Reminder – unpaid invoice No.&nbsp;INV&nbsp;2026/0142"
    greeting: Dear Sir or Madam,
    intro: "we represent Věřitel s.r.o. under a power of attorney. Invoice No.&nbsp;INV&nbsp;2026/0142, due on 3&nbsp;October&nbsp;2026, has not been paid yet. As of 12&nbsp;November&nbsp;2026 you owe:"
    rows:
      - [Amount owed under the invoice, "CZK&nbsp;24,200"]
      - ["Late-payment interest 11.75&nbsp;% p.a.", "CZK&nbsp;312"]
      - [Debt recovery costs, "CZK&nbsp;1,200"]
      - [Total, "CZK&nbsp;25,712"]
    outro: Please pay within 7&nbsp;days to the account below, quoting the invoice number as the payment reference. If you have already paid or disagree with the claim, please let us know.
    closing: Yours faithfully,
    signature: attorney-at-law

pricing:
  id: price
  title: What you pay
  text: Nothing for claims between businesses. Our fee consists of the debt recovery costs of CZK&nbsp;1,200 per invoice and the late-payment interest, both paid by the debtor.
  card:
    label: B2B debt collection
    price: CZK&nbsp;0
    note: and 0&nbsp;% of the amount recovered under the offer for the first 50&nbsp;companies
    ticks:
      - No upfront fee, no subscription
      - Reminder and letter before action from a law firm
      - Free initial assessment
      - Small invoices too, no minimum amount
    cta: { label: Upload an unpaid invoice, href: "#upload" }
  scenarios:
    caption: What to expect in each situation
    head: [Situation, You pay]
    rows:
      - { situation: The debtor pays after the reminder or demand, price: CZK&nbsp;0, note: You receive the full amount owed. }
      - { situation: The debtor does not pay even after the letter before action, price: CZK&nbsp;0, note: Out-of-court collection costs you nothing. }
      - { situation: "Payment order, only with your consent", price: "usually CZK&nbsp;7,900 plus VAT", note: "plus the court fee. If you win, the court orders the debtor to pay it." }
      - { situation: The debtor is insolvent, price: fee agreed in advance, note: for lodging the claim in the insolvency proceedings }
      - { situation: "Other claims, e.g. against consumers", price: typically 10&nbsp;%, note: of the amount recovered }
      - { situation: Debtor abroad, price: individual quote }
  note: The offer applies to claims between businesses, for the first 50&nbsp;companies.

# Late-payment interest calculator. The interest rates themselves are in
# data/interest_rates.yaml – add a row every half-year (1 Jan and 1 Jul) and
# update `note` below (in every language).
calculator:
  id: calculator
  title: How much does the debtor really owe you?
  text: Besides the amount owed, you are entitled to statutory late-payment interest and, for claims between businesses, to CZK&nbsp;1,200 per invoice. Enter your overdue invoices.
  amountLabel: Invoice amount (CZK)
  amountPlaceholder: 50,000
  dueLabel: Due date
  removeRow: Remove invoice
  addRow: Add another invoice
  note: Late-payment interest equals the Czech National Bank repo rate valid on the last day of the half-year before the delay began, plus 8&nbsp;percentage points (Government Regulation No.&nbsp;351/2013&nbsp;Coll.). For delays from 1&nbsp;July&nbsp;2026 it is 11.75&nbsp;% a year; in the first half of 2026 and the second half of 2025, 11.5&nbsp;%. The calculation is indicative.
  principal: Amount owed
  interest: Late-payment interest to date
  fee: Costs of CZK&nbsp;1,200 per invoice
  total: The debtor pays in total
  youGet: You receive
  youPay: You pay us
  cta: Upload these invoices
  warnNotDue: The invoice is not overdue yet.
  warnOld: The invoice has been overdue for more than 3 years. The claim may be time-barred – send it to us and we will assess it.
  # Fee label with the invoice count; {n} = count, {invoices} = word below by CLDR plural form.
  feeCount: "Costs CZK 1,200 × {n} {invoices}"
  invoiceWords: { one: invoice, other: invoices }
  messagePrefix: "Overdue invoices:"
  dueWord: due

abroad:
  id: abroad
  title: Debtor abroad?
  lead: We collect claims anywhere abroad based on an individual quote. Upload the invoice and tell us where the debtor is based.
  items:
    - { title: Debtor in the European Union, text: A European order for payment is issued by the court without a hearing and is enforceable throughout the EU. }
    - { title: Smaller claims in the EU, text: "The European Small Claims Procedure for claims up to EUR&nbsp;5,000." }
    - { title: Debtor outside the EU, text: We agree the procedure under the law of the debtor’s country individually. }

who:
  id: who
  title: Who is behind Debiton
  text: Debiton communicates with you, a lawyer with the debtor.
  items:
    - role: Service operator
      title: Debiton
      text: The service is operated by NewCo Czech Companies, s.r.o. It takes over your documents, agrees the procedure with you and keeps you informed throughout the collection.
      ticks:
        - We get back to you within 1&nbsp;business day
        - We send you the recovered money promptly
    - role: Deals with the debtor on your behalf
      title: Cooperating law firm
      text: It assesses the claim, sends reminders and letters before action to the debtor, applies for payment orders and lodges claims in insolvency proceedings.
      ticks:
        - A lawyer is bound by professional secrecy by law
        - Before taking the case, it checks that it does not represent your debtor
        - A lawyer must carry professional liability insurance

faq:
  id: faq
  title: Frequently asked questions
  help: Didn’t find an answer? Call or write to us.
  helpNoPhone: Didn’t find an answer? Write to us.
  # Answers are Markdown.
  items:
    - q: What claims is the service for?
      a: For unpaid invoices between businesses (companies and sole traders) in the Czech Republic. We collect claims against consumers and debtors abroad for an individual price that you know in advance.
    - q: How can collecting B2B claims cost you nothing?
      a: Our fee is borne by the debtor. We charge the debtor the debt recovery costs of CZK&nbsp;1,200 per invoice and late-payment interest. We keep these amounts as our fee and send you the full amount owed that we recover.
    - q: What exactly do you charge the debtor?
      a: |
        - the amount owed under the invoice,
        - debt recovery costs of CZK&nbsp;1,200 per invoice under Government Regulation No.&nbsp;351/2013&nbsp;Coll.,
        - statutory late-payment interest, i.e. the Czech National Bank repo rate plus 8&nbsp;percentage points a year.
    - q: Do you collect small invoices too?
      a: Yes. We collect claims of any size, small invoices too, with no minimum amount. Here too the debtor bears the collection costs.
    - q: Who writes to the debtor?
      a: The friendly reminder and the letter before action are sent to the debtor on your behalf by a cooperating law firm. The debtor gets a letter from a lawyer, not another reminder from accounts.
    - q: Do you always send the debtor a reminder first?
      a: The law firm sends a friendly reminder if the invoice is only slightly overdue, or if you wish. The reminder only contains the amount owed, CZK&nbsp;1,200 and late-payment interest. If the invoice has been overdue for longer, a letter before action is sent straight away.
    - q: When do you go to court?
      a: Only if the debtor does not pay even after the letter before action. We never start court proceedings automatically. We always discuss an application for an electronic payment order with you first, and the cooperating law firm files it only with your consent and for a fee, usually CZK&nbsp;7,900 plus VAT. You pay the court fee; if you win, the court orders the debtor to pay it.
    - q: How long does collection take?
      a: The debtor has 7&nbsp;days to pay after the reminder and after the letter before action. If the debtor pays at this stage, the claim is usually settled within a few weeks. Court collection takes longer, usually several months.
    - q: How will the recovered money reach me?
      a: The debtor pays to the account stated in the demand. As soon as the payment arrives, we promptly send you the full amount owed that we have recovered.
    - q: I want to keep working with the customer. Will this harm the relationship?
      a: Our reminders are factual and polite. For important customers we can start with a friendly reminder only and agree every further step with you in advance.
    - q: What if the debtor proposes instalments?
      a: We will discuss the proposed instalments with you. We will not agree to instalments without your consent.
    - q: What if the debtor claims to have paid already or disputes the invoice?
      a: "Send us everything the claim is based on: the invoice, order, delivery note or e-mails. We will discuss the debtor’s objections with you and propose the next steps."
    - q: What documents do you need?
      a: The invoice is enough. If you have an order, delivery note, handover protocol or e-mails with the customer, attach them too. We do not need a written contract.
    - q: How old can the claims be?
      a: The general limitation period in the Czech Republic is three years and for an invoice it usually runs from the due date. Send us older invoices too and we will assess whether they can still be claimed.
    - q: What if the debtor is insolvent?
      a: The claim must then be lodged in the insolvency proceedings within the period set by the insolvency court. The cooperating law firm lodges it for you for a fee agreed in advance.
    - q: Do you also collect claims abroad?
      a: Yes. We collect claims anywhere abroad based on an individual quote.
    - q: Does the 0&nbsp;% offer apply to all claims?
      a: The offer applies to claims between businesses, for the first 50&nbsp;companies. For other claims our fee is typically 10&nbsp;% of the amount recovered.
    - q: Who is behind the Debiton service?
      a: The Debiton service is operated by NewCo Czech Companies, s.r.o. Reminders, letters before action, applications for payment orders and claims in insolvency proceedings are sent and filed on behalf of your company by a cooperating law firm.

contact:
  id: contact
  title: Contact
  lead: >-
    Do you have a question about the service or a specific claim? Write to us, call us
    or fill in the form. We will get back to you within 1&nbsp;business day.
  emailLabel: E-mail
  phoneLabel: Phone
  addressLabel: Contact address
  operatorLabel: Operator
  # Prefix of the message in the notification e-mail (kept in Czech for the office),
  # so contact questions can be told apart from invoice uploads.
  tag: "[Dotaz z kontaktního formuláře Debiton]"
  namePrefix: "Jméno: "
  nameLabel: Name and company
  namePlaceholder: John Smith, Company Ltd
  contactLegend: Your contact details
  contactHint: An e-mail or a phone number is enough
  yourEmailLabel: Your e-mail
  yourPhoneLabel: Your phone number
  messageLabel: Message
  messagePlaceholder: How can we help you?
  submit: Send message
  thanksTitle: Message sent
  thanksText: Thank you, we will get back to you within <strong>1&nbsp;business day</strong>.
  # {email} and {phone} are replaced with links; the phone part is dropped while
  # params.contact.phone is empty.
  submitError: The message could not be sent. Please try again or write to us at {email}
  submitErrorPhone: ", or call {phone}"
  errors:
    message: Please tell us how we can help you.

footer:
  tagline: B2B debt collection for 0&nbsp;%. The debtor bears the collection costs.
  serviceTitle: Service
  service:
    - { label: How it works, href: "#how-it-works" }
    - { label: Process against the debtor, href: "#process" }
    - { label: Price, href: "#price" }
    - { label: Interest calculator, href: "#calculator" }
    - { label: FAQ, href: "#faq" }
  contactTitle: Contact
  uploadLink: { label: Upload an unpaid invoice, href: "#upload" }
  contactLink: { label: Contact form, href: "#contact" }
  privacyLink: { label: Privacy policy, href: /en/privacy-policy/ }
  legalServices: Legal services are provided by a cooperating law firm.
---
