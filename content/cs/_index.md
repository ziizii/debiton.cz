---
# Home page (one-pager). All visible copy of the page lives here so that any
# theme can render it. Strings may contain inline HTML (&nbsp;, <strong>).
# Phone numbers and e-mail come from hugo.yaml → params.contact.
# Translations: copy this file to content/<lang>/_index.md and translate.
title: Debiton – vymáhání pohledávek z podnikání za 0 %
description: >-
  Akce pro prvních 50 firem: pohledávky z podnikání vymáháme za 0 % z vymožené
  částky, i malé faktury bez minimální částky. Upomínky posílá advokátní
  kancelář, náklady nese dlužník.
og:
  title: Debiton – vymáhání pohledávek z podnikání za 0 %
  description: >-
    Akce pro prvních 50 firem. Náklady vymáhání nese dlužník, Vám pošleme celou
    dlužnou částku. I malé faktury, bez minimální částky.

nav:
  - { label: Jak to funguje, href: "#jak-to-funguje" }
  - { label: Postup, href: "#postup" }
  - { label: Cena, href: "#cena" }
  - { label: Kalkulačka, href: "#kalkulacka" }
  - { label: Otázky, href: "#otazky" }
  - { label: Kontakt, href: "#kontakt" }
headerCta: { label: Nahrát fakturu, href: "#formular" }
skipLink: Přeskočit na formulář
mobileCta: Nahrát dlužnou fakturu

hero:
  badge: Akce pro prvních 50&nbsp;firem
  title: Vymáhání pohledávek z&nbsp;podnikání za&nbsp;0&nbsp;%
  text: >-
    Dluží Vám odběratel za fakturu? Pohledávky z&nbsp;podnikání teď vymáháme za
    0&nbsp;% z&nbsp;vymožené částky. Veškeré náklady vymáhání nese dlužník, Vám
    pošleme celou dlužnou částku.
  ctas:
    - { label: Nahrát dlužnou fakturu, href: "#formular" }
    - { label: "Spočítat, kolik Vám dluží", href: "#kalkulacka", ghost: true }
  checks:
    - I&nbsp;malé faktury, bez minimální částky
    - Upomínky posílá advokátní kancelář
    - Úvodní posouzení zdarma, ozveme se do 1&nbsp;pracovního dne
  invoice:
    title: Faktura
    number: FV&nbsp;2026/0142
    meta:
      - { label: Odběratel, value: Odběratel s.r.o. }
      - { label: Datum splatnosti, value: 3.&nbsp;10.&nbsp;2026 }
    overdue: Po splatnosti
    rows:
      - { label: Dlužná částka, value: 50&nbsp;000&nbsp;Kč }
      - { label: Náklady spojené s&nbsp;uplatněním pohledávky, note: platí dlužník, value: +&nbsp;1&nbsp;200&nbsp;Kč }
      - { label: "Úroky z&nbsp;prodlení 11,75&nbsp;% ročně", note: platí dlužník, value: +&nbsp;úroky }
    youGet: { label: Vy dostanete, value: 50&nbsp;000&nbsp;Kč }
    youPay: { label: Nám zaplatíte, value: 0&nbsp;Kč }
    stamp: Zaplaceno
    caption: >-
      Příklad. 1&nbsp;200&nbsp;Kč a&nbsp;úroky z&nbsp;prodlení platí dlužník.
      Tyto částky si ponecháváme jako naši odměnu.
  facts:
    - { value: 0&nbsp;%, text: z&nbsp;vymožené částky u&nbsp;pohledávek z&nbsp;podnikání }
    - { value: 1&nbsp;200&nbsp;Kč, text: za každou fakturu platí dlužník podle nařízení vlády č.&nbsp;351/2013&nbsp;Sb. }
    - { value: 7&nbsp;dní, text: má dlužník na zaplacení po upomínce i&nbsp;po předžalobní výzvě }
    - { value: 7&nbsp;900&nbsp;Kč, text: "plus DPH obvykle za platební rozkaz, jen s&nbsp;Vaším souhlasem" }

form:
  id: formular
  subject: Debiton – vymáhání pohledávek  # subject of the notification e-mail
  title: Máte nezaplacené faktury?
  lead: Nahrajte podklady a&nbsp;nechte nám kontakt. Ozveme se Vám nejpozději do 1&nbsp;pracovního dne.
  next:
    - { title: Ozveme se Vám, text: "Nejpozději do 1&nbsp;pracovního dne Vám řekneme, jak pohledávku vidíme." }
    - { title: Podepíšete plnou moc, text: "Pro advokátní kancelář, i&nbsp;elektronicky. Nic nemusíte tisknout." }
    - { title: Advokátní kancelář napíše dlužníkovi, text: "Pošle mu přátelskou upomínku, nebo rovnou předžalobní výzvu." }
  call: Raději zavoláte?
  thanksTitle: Děkujeme!
  thanksText: Ozveme se Vám nejpozději do <strong>1&nbsp;pracovního dne</strong>.
  # {email} and {phone} are replaced with links; the phone part is dropped while
  # params.contact.phone is empty.
  submitError: Odeslání se nepovedlo. Zkuste to prosím znovu, nebo nám podklady pošlete na {email}
  submitErrorPhone: ", případně volejte {phone}"
  filesLabel: Faktury, smlouvy nebo jiné podklady
  dropTitle: Přetáhněte sem soubory nebo klikněte
  dropHint: PDF, Word, Excel nebo fotografie, můžete nahrát více souborů
  contactLegend: Kontakt na Vás
  contactHint: Stačí e-mail, nebo telefon
  emailLabel: Váš e-mail
  emailPlaceholder: jmeno@firma.cz
  phoneLabel: Vaše telefonní číslo
  phonePlaceholder: +420 777 123 456
  companyLabel: Vaše firma
  companyPlaceholder: Název nebo IČO
  messageLabel: Komentář k&nbsp;dlužné pohledávce
  messagePlaceholder: Pokud je potřeba — dlužnou fakturu nám vysvětlovat nemusíte 😉
  optional: (nepovinné)
  submit: Odeslat k&nbsp;posouzení zdarma
  sending: Odesílám…
  sendingNote: Nahráváme soubory, chvíli strpení…
  fine: Bez závazků. Posouzení je zdarma.
  legal: >-
    Odesláním formuláře berete na vědomí <a href="/cs/ochrana-osobnich-udaju/">zásady
    zpracování osobních údajů</a>. Stránka je chráněna pomocí reCAPTCHA a&nbsp;platí
    na ni <a href="https://policies.google.com/privacy?hl=cs" rel="noopener">zásady
    ochrany soukromí</a> a&nbsp;<a href="https://policies.google.com/terms?hl=cs"
    rel="noopener">smluvní podmínky</a> Google.
  removeFile: Odebrat soubor
  companyPrefix: "Firma: "
  errors:
    contact: Zadejte prosím e-mail nebo telefon, ať se Vám můžeme ozvat.
    email: Zadejte prosím platný e-mail, ať se Vám můžeme ozvat.
    phone: Zadejte prosím platné telefonní číslo.
    size: Soubory mají dohromady víc než 25 MB. Pošlete prosím jen dlužné faktury, případně je zmenšete, nebo nám zbytek pošlete e-mailem na info@debiton.cz.

how:
  id: jak-to-funguje
  title: Jak to funguje
  text: U&nbsp;pohledávek mezi podnikateli nese náklady vymáhání ze zákona dlužník. Proto Vás vymáhání nic nestojí.
  items:
    - icon: percent
      title: Pohledávky z&nbsp;podnikání za 0&nbsp;%
      text: U&nbsp;pohledávek mezi podnikateli je naše odměna v&nbsp;rámci akce <strong>0&nbsp;% z&nbsp;vymožené částky</strong>. Veškeré náklady vymáhání nese dlužník.
    - icon: search
      title: Úvodní posouzení zdarma
      text: Pošlete nám fakturu nebo smlouvu a&nbsp;my Vám obratem řekneme, jak na to.
    - icon: invoice
      title: I&nbsp;malé faktury, i&nbsp;bez smlouvy
      text: Vymáháme pohledávky v&nbsp;jakékoli výši, <strong>i&nbsp;malé faktury, bez minimální částky</strong>. Písemnou smlouvu nepotřebujeme.
    - icon: scales
      title: Dopis od advokáta
      text: Upomínky i&nbsp;výzvy posílá dlužníkovi spolupracující advokátní kancelář. Postupujeme vždy korektně a&nbsp;legálně.

steps:
  title: Jak to probíhá?
  text: Žádná rizika, žádné poplatky.
  items:
    - title: Zašlete nám podklady
      text: Nahrajete faktury či smlouvy přes formulář výše. Stačí PDF nebo fotka z&nbsp;telefonu.
    - title: Zdarma posoudíme případ
      text: Obratem Vám navrhneme nejlepší řešení a&nbsp;pošleme plnou moc pro advokátní kancelář. Podepsat ji můžete i&nbsp;elektronicky.
    - title: Pohledávku vymůžeme
      text: U&nbsp;pohledávek z&nbsp;podnikání platíte 0&nbsp;% z&nbsp;vymožené částky, náklady vymáhání nese dlužník. U&nbsp;ostatních pohledávek je naše odměna typicky 10&nbsp;% z&nbsp;vymožené částky.

timeline:
  id: postup
  title: Jak postupujeme vůči dlužníkovi
  text: Přátelská upomínka, předžalobní výzva a&nbsp;soud jen s&nbsp;Vaším souhlasem. Všechny dopisy posílá dlužníkovi Vaším jménem spolupracující advokátní kancelář.
  items:
    - day: Den 0
      title: Přátelská upomínka
      text: Je-li faktura jen krátce po splatnosti, nebo pokud si to přejete, pošle dlužníkovi advokátní kancelář nejprve přátelskou upomínku. Kromě dlužné částky v&nbsp;ní požaduje jen náklady spojené s&nbsp;uplatněním pohledávky 1&nbsp;200&nbsp;Kč a&nbsp;úroky z&nbsp;prodlení.
    - day: Den 7
      title: Předžalobní výzva
      text: Pokud dlužník na upomínku do 7&nbsp;dnů nezaplatí, zašle mu advokátní kancelář předžalobní výzvu. Je-li faktura už déle po splatnosti, jde předžalobní výzva rovnou.
    - day: Den 14 a dál
      title: Platební rozkaz
      text: Když dlužník nezaplatí ani na předžalobní výzvu, může advokátní kancelář podat návrh na vydání elektronického platebního rozkazu. Tento krok s&nbsp;Vámi vždy předem probereme. Návrh se podává za poplatek obvykle ve výši 7&nbsp;900&nbsp;Kč plus DPH.
      tag: Jen s&nbsp;Vaším souhlasem
    - day: Dlužník zaplatí
      title: Peníze posíláme Vám
      text: Celou vymoženou dlužnou částku Vám pošleme obratem. Náklady 1&nbsp;200&nbsp;Kč a&nbsp;úroky z&nbsp;prodlení zaplatil dlužník.
      final: true

letter:
  id: dluznik
  title: Dopis od advokáta, ne další upomínka z&nbsp;účtárny
  lead: "Upomínku od účetní dlužník snadno odloží. Dopis od advokátní kanceláře, která Vás zastupuje, je jasný signál: věc je v&nbsp;rukou právníka, běží lhůta a&nbsp;dalším krokem je soud."
  ticks:
    - Přehledné vyúčtování dlužné částky, úroků a&nbsp;1&nbsp;200&nbsp;Kč za fakturu
    - Věcný a&nbsp;slušný tón
    - Jasná lhůta 7&nbsp;dní na zaplacení
    - Předžalobní výzva splňuje požadavky §&nbsp;142a občanského soudního řádu, takže náklady řízení pak může nést dlužník
  compare:
    head: ["", "Upomínka z&nbsp;účtárny", "Dopis od advokátní kanceláře"]
    rows:
      - [Kdo píše, Vaše účetní, "Advokát, který Vás zastupuje"]
      - [Jak to dlužník vnímá, Jedna z&nbsp;mnoha upomínek, Věřitel to myslí vážně]
      - [Co následuje, Další upomínka, Předžalobní výzva a&nbsp;platební rozkaz]
  sample:
    ariaLabel: Ukázka přátelské upomínky od advokátní kanceláře
    from: Advokátní kancelář
    onBehalf: jménem společnosti Věřitel s.r.o.
    badge: VZOR
    subject: "<b>Věc:</b> Upomínka – nezaplacená faktura č.&nbsp;FV&nbsp;2026/0142"
    greeting: Vážení,
    intro: "zastupujeme společnost Věřitel s.r.o. na základě plné moci. Faktura č.&nbsp;FV&nbsp;2026/0142 splatná 3.&nbsp;10.&nbsp;2026 zatím nebyla uhrazena. K&nbsp;12.&nbsp;11.&nbsp;2026 dlužíte:"
    rows:
      - [Dlužná částka z&nbsp;faktury, 24&nbsp;200&nbsp;Kč]
      - ["Úrok z&nbsp;prodlení 11,75&nbsp;% ročně", 312&nbsp;Kč]
      - [Náklady spojené s&nbsp;uplatněním pohledávky, 1&nbsp;200&nbsp;Kč]
      - [Celkem, 25&nbsp;712&nbsp;Kč]
    outro: Prosíme o&nbsp;úhradu do 7&nbsp;dnů na účet uvedený níže, jako variabilní symbol uveďte číslo faktury. Pokud jste již zaplatili nebo s&nbsp;pohledávkou nesouhlasíte, dejte nám prosím vědět.
    closing: S&nbsp;pozdravem,
    signature: advokát

pricing:
  id: cena
  title: Kolik zaplatíte
  text: U&nbsp;pohledávek z&nbsp;podnikání nic. Naši odměnu tvoří náklady spojené s&nbsp;uplatněním pohledávky 1&nbsp;200&nbsp;Kč za fakturu a&nbsp;úroky z&nbsp;prodlení, a&nbsp;ty platí dlužník.
  card:
    label: Vymáhání pohledávky z&nbsp;podnikání
    price: 0&nbsp;Kč
    note: a 0&nbsp;% z&nbsp;vymožené částky v&nbsp;rámci akce pro prvních 50&nbsp;firem
    ticks:
      - Žádný poplatek předem, žádné předplatné
      - Upomínka i&nbsp;předžalobní výzva od advokátní kanceláře
      - Úvodní posouzení zdarma
      - I&nbsp;malé faktury, bez minimální částky
    cta: { label: Nahrát dlužnou fakturu, href: "#formular" }
  scenarios:
    caption: Co Vás čeká v&nbsp;jednotlivých situacích
    head: [Situace, Zaplatíte]
    rows:
      - { situation: Dlužník zaplatí na upomínku nebo výzvu, price: 0&nbsp;Kč, note: Dostanete celou dlužnou částku. }
      - { situation: Dlužník nezaplatí ani na předžalobní výzvu, price: 0&nbsp;Kč, note: Mimosoudní vymáhání Vás nic nestojí. }
      - { situation: "Platební rozkaz, jen s&nbsp;Vaším souhlasem", price: obvykle 7&nbsp;900&nbsp;Kč plus DPH, note: a soudní poplatek. Ten v&nbsp;případě úspěchu soud uloží zaplatit dlužníkovi. }
      - { situation: Dlužník je v&nbsp;insolvenci, price: předem dohodnutý poplatek, note: za přihlášku pohledávky do insolvenčního řízení }
      - { situation: "Ostatní pohledávky, například za spotřebiteli", price: typicky 10&nbsp;%, note: z&nbsp;vymožené částky }
      - { situation: Dlužník v&nbsp;zahraničí, price: individuální nabídka }
  note: Akce platí pro pohledávky mezi podnikateli, a&nbsp;to pro prvních 50&nbsp;firem.

# Late-payment interest calculator. The interest rates themselves are in
# data/interest_rates.yaml – add a row every half-year (1 Jan and 1 Jul) and
# update `note` below.
calculator:
  id: kalkulacka
  title: Kolik Vám dlužník skutečně dluží?
  text: Kromě dlužné částky máte nárok na zákonný úrok z&nbsp;prodlení a&nbsp;u&nbsp;pohledávek mezi podnikateli na 1&nbsp;200&nbsp;Kč za každou fakturu. Zadejte své faktury po splatnosti.
  amountLabel: Částka faktury (Kč)
  amountPlaceholder: 50 000
  dueLabel: Datum splatnosti
  removeRow: Odebrat fakturu
  addRow: Přidat další fakturu
  note: Úrok z&nbsp;prodlení odpovídá repo sazbě ČNB platné k&nbsp;poslednímu dni pololetí před začátkem prodlení plus 8&nbsp;procentních bodů (nařízení vlády č.&nbsp;351/2013&nbsp;Sb.). Pro prodlení od 1.&nbsp;7.&nbsp;2026 je to 11,75&nbsp;% ročně, v&nbsp;1.&nbsp;pololetí 2026 a&nbsp;ve 2.&nbsp;pololetí 2025 11,5&nbsp;%. Výpočet je orientační.
  principal: Dlužná částka
  interest: Úroky z&nbsp;prodlení k&nbsp;dnešku
  fee: Náklady 1&nbsp;200&nbsp;Kč za fakturu
  total: Dlužník celkem zaplatí
  youGet: Vy dostanete
  youPay: Nám zaplatíte
  cta: Nahrát tyto faktury
  warnNotDue: Faktura ještě není po splatnosti.
  warnOld: Faktura je po splatnosti déle než 3 roky. Pohledávka může být promlčená, pošlete nám ji a posoudíme to.
  # Fee label with the invoice count; {n} = count, {invoices} = word below by CLDR plural form.
  feeCount: "Náklady 1 200 Kč × {n} {invoices}"
  invoiceWords: { one: faktura, few: faktury, many: faktury, other: faktur }
  messagePrefix: "Faktury po splatnosti:"
  dueWord: splatná

abroad:
  id: zahranici
  title: Dlužník v&nbsp;zahraničí?
  lead: Pohledávky vymáháme kdekoliv v&nbsp;zahraničí na základě individuální nabídky. Nahrajte fakturu a&nbsp;napište nám, kde dlužník sídlí.
  items:
    - { title: Dlužník v&nbsp;Evropské unii, text: Evropský platební rozkaz vydá soud bez jednání a&nbsp;vykonatelný je v&nbsp;celé EU. }
    - { title: Menší pohledávky v&nbsp;EU, text: Evropské řízení o&nbsp;drobných nárocích pro pohledávky do 5&nbsp;000&nbsp;EUR. }
    - { title: Dlužník mimo EU, text: Postup podle práva země dlužníka domluvíme individuálně. }

who:
  id: kdo
  title: Kdo za Debitonem stojí
  text: S&nbsp;Vámi komunikuje Debiton, s&nbsp;dlužníkem advokát.
  items:
    - role: Provozovatel služby
      title: Debiton
      text: Službu provozuje NewCo Czech Companies, s.r.o. Převezme Vaše podklady, domluví s&nbsp;Vámi postup a&nbsp;celou dobu Vás informuje, jak vymáhání pokračuje.
      ticks:
        - Ozveme se nejpozději do 1&nbsp;pracovního dne
        - Vymožené peníze Vám posíláme obratem
    - role: Jedná s&nbsp;dlužníkem Vaším jménem
      title: Spolupracující advokátní kancelář
      text: Posoudí pohledávku, posílá dlužníkovi upomínky a&nbsp;předžalobní výzvy, podává návrhy na platební rozkaz a&nbsp;přihlášky do insolvence.
      ticks:
        - Advokát je ze zákona vázán mlčenlivostí
        - Než věc převezme, ověří, že nezastupuje Vašeho dlužníka
        - Advokát je povinně pojištěn pro případ odpovědnosti za škodu

faq:
  id: otazky
  title: Časté otázky
  help: Nenašli jste odpověď? Zavolejte nebo napište.
  helpNoPhone: Nenašli jste odpověď? Napište nám.
  # Answers are Markdown.
  items:
    - q: Jak je možné, že u&nbsp;pohledávek z&nbsp;podnikání nic neplatíte?
      a: Naši odměnu nese dlužník. Účtujeme mu náklady spojené s&nbsp;uplatněním pohledávky ve výši 1&nbsp;200&nbsp;Kč za každou fakturu a&nbsp;úroky z&nbsp;prodlení. Tyto částky si ponecháváme jako svou odměnu, Vám zašleme celou vymoženou dlužnou částku.
    - q: Co přesně dlužníkovi účtujete?
      a: |
        - dlužnou částku z&nbsp;faktury,
        - náklady spojené s&nbsp;uplatněním pohledávky 1&nbsp;200&nbsp;Kč za každou fakturu podle nařízení vlády č.&nbsp;351/2013&nbsp;Sb.,
        - zákonné úroky z&nbsp;prodlení, tedy repo sazbu ČNB zvýšenou o&nbsp;8&nbsp;procentních bodů ročně.
    - q: Vymáháte i&nbsp;malé faktury?
      a: Ano. Pohledávky vymáháme v&nbsp;jakékoli výši, i&nbsp;malé faktury, bez minimální částky. I&nbsp;u&nbsp;nich nese náklady vymáhání dlužník.
    - q: Kdo dlužníkovi píše?
      a: Přátelskou upomínku i&nbsp;předžalobní výzvu posílá dlužníkovi Vaším jménem spolupracující advokátní kancelář. Dlužník tak dostane dopis od advokáta, ne další upomínku z&nbsp;účtárny.
    - q: Posíláte dlužníkovi vždy nejdřív upomínku?
      a: Přátelskou upomínku posílá advokátní kancelář, pokud je faktura jen krátce po splatnosti, nebo pokud si to přejete. Upomínka obsahuje jen dlužnou částku, 1&nbsp;200&nbsp;Kč a&nbsp;úroky z&nbsp;prodlení. Je-li faktura už déle po splatnosti, zasílá se rovnou předžalobní výzva.
    - q: Kdy se obracíte na soud?
      a: Až když dlužník nezaplatí ani na předžalobní výzvu. Soudní řízení nikdy nezahajujeme automaticky. Návrh na vydání elektronického platebního rozkazu s&nbsp;Vámi vždy předem probereme a&nbsp;spolupracující advokátní kancelář ho podá jen s&nbsp;Vaším souhlasem a&nbsp;za poplatek obvykle ve výši 7&nbsp;900&nbsp;Kč plus DPH. Soudní poplatek hradíte Vy, v&nbsp;případě úspěchu ho soud uloží zaplatit dlužníkovi.
    - q: Jak dlouho vymáhání trvá?
      a: Na upomínku i&nbsp;na předžalobní výzvu má dlužník 7&nbsp;dní. Pokud zaplatí v&nbsp;této fázi, bývá pohledávka vyřízená během několika týdnů. Soudní vymáhání trvá déle, zpravidla několik měsíců.
    - q: Jak se ke mně dostanou vymožené peníze?
      a: Dlužník platí na účet uvedený ve výzvě. Jakmile platba dorazí, pošleme Vám obratem celou vymoženou dlužnou částku.
    - q: S&nbsp;odběratelem chci dál spolupracovat. Nepoškodí to vztah?
      a: Upomínky jsou věcné a&nbsp;slušné. U&nbsp;důležitých odběratelů můžeme začít jen přátelskou upomínkou a&nbsp;o&nbsp;každém dalším kroku se s&nbsp;Vámi předem domluvíme.
    - q: Co když dlužník navrhne splátky?
      a: Návrh splátek s&nbsp;Vámi probereme. Bez Vašeho souhlasu dlužníkovi splátky nepovolíme.
    - q: Co když dlužník tvrdí, že už zaplatil, nebo fakturu rozporuje?
      a: "Pošlete nám vše, z&nbsp;čeho pohledávka vyplývá: fakturu, objednávku, dodací list nebo e-maily. Námitky dlužníka s&nbsp;Vámi probereme a&nbsp;navrhneme další postup."
    - q: Jaké podklady potřebujete?
      a: Stačí faktura. Pokud máte objednávku, dodací list, předávací protokol nebo e-maily s&nbsp;odběratelem, přiložte je také. Písemnou smlouvu nepotřebujeme.
    - q: Jak staré pohledávky lze vymáhat?
      a: Obecná promlčecí lhůta je tři roky a&nbsp;u&nbsp;faktury běží zpravidla ode dne její splatnosti. Pošlete nám i&nbsp;starší faktury, posoudíme, zda je lze ještě uplatnit.
    - q: Co když je dlužník v&nbsp;insolvenci?
      a: Pohledávku je pak nutné přihlásit do insolvenčního řízení ve lhůtě, kterou určí insolvenční soud. Přihlášku za Vás podá spolupracující advokátní kancelář za předem dohodnutý poplatek.
    - q: Vymáháte i&nbsp;pohledávky v&nbsp;zahraničí?
      a: Ano. Pohledávky vymáháme kdekoliv v&nbsp;zahraničí na základě individuální nabídky.
    - q: Platí akce za 0&nbsp;% pro všechny pohledávky?
      a: Akce platí pro pohledávky mezi podnikateli, a&nbsp;to pro prvních 50&nbsp;firem. U&nbsp;ostatních pohledávek je naše odměna typicky 10&nbsp;% z&nbsp;vymožené částky.
    - q: Kdo za službou Debiton stojí?
      a: Službu Debiton provozuje společnost NewCo Czech Companies, s.r.o. Upomínky, předžalobní výzvy, návrhy na vydání platebního rozkazu i&nbsp;přihlášky do insolvence posílá a&nbsp;podává jménem Vaší firmy spolupracující advokátní kancelář.

contact:
  id: kontakt
  title: Kontakt
  lead: >-
    Máte dotaz ke službě nebo ke konkrétní pohledávce? Napište nám, zavolejte,
    nebo vyplňte formulář. Ozveme se nejpozději do 1&nbsp;pracovního dne.
  emailLabel: E-mail
  phoneLabel: Telefon
  addressLabel: Kontaktní adresa
  operatorLabel: Provozovatel
  # Prefix of the message in the notification e-mail, so contact questions can be
  # told apart from invoice uploads (both use the Debiton form backend).
  tag: "[Dotaz z kontaktního formuláře Debiton]"
  namePrefix: "Jméno: "
  nameLabel: Jméno a firma
  namePlaceholder: Jan Novák, Firma s.r.o.
  contactLegend: Kontakt na Vás
  contactHint: Stačí e-mail, nebo telefon
  yourEmailLabel: Váš e-mail
  yourPhoneLabel: Vaše telefonní číslo
  messageLabel: Zpráva
  messagePlaceholder: S čím Vám můžeme pomoci?
  submit: Odeslat zprávu
  thanksTitle: Zpráva odeslána
  thanksText: Děkujeme, ozveme se Vám nejpozději do <strong>1&nbsp;pracovního dne</strong>.
  # {email} and {phone} are replaced with links; the phone part is dropped while
  # params.contact.phone is empty.
  submitError: Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám napište na {email}
  submitErrorPhone: ", případně volejte {phone}"
  errors:
    message: Napište nám prosím, s čím Vám můžeme pomoci.

footer:
  tagline: Vymáhání pohledávek z&nbsp;podnikání za 0&nbsp;%. Náklady vymáhání nese dlužník.
  serviceTitle: Služba
  service:
    - { label: Jak to funguje, href: "#jak-to-funguje" }
    - { label: Postup vůči dlužníkovi, href: "#postup" }
    - { label: Cena, href: "#cena" }
    - { label: Kalkulačka úroků, href: "#kalkulacka" }
    - { label: Časté otázky, href: "#otazky" }
  contactTitle: Kontakt
  uploadLink: { label: Nahrát dlužnou fakturu, href: "#formular" }
  contactLink: { label: Kontaktní formulář, href: "#kontakt" }
  privacyLink: { label: Zásady zpracování osobních údajů, href: /cs/ochrana-osobnich-udaju/ }
  legalServices: Právní služby poskytuje spolupracující advokátní kancelář.
---
