# Detaljan prompt za izradu web i mobilne aplikacije Split Laundry Express

## 1. Uvod i pozadina projekta

Aplikacija treba podržati punoservisan praonički posao s uslugama preuzimanja i dostave u Splitu, Hrvatska. Split Laundry Express usmjeren je primarno na turističko tržište i posjetitelje u objektima za kratkoročni najam, uz pružanje usluga lokalnim tvrtkama i stanovnicima. Poslovni model uključuje vlastiti pogon za pranje rublja uz mogućnost partnerstva s postojećim praonicama.

Ključni diferencijatori poslovanja koje aplikacija mora podržati:
- Praktično naručivanje putem digitalne platforme
- Pouzdano planiranje preuzimanja i dostave
- Ekološki prihvatljive prakse
- Višejezična podrška (hrvatski, engleski, njemački, talijanski)
- Poboljšano korisničko iskustvo s naglaskom na praktičnost i transparentnost

## 2. Vizija aplikacije

Stvoriti integrirani digitalni ekosustav (web + mobilna aplikacija) koji će:
- Pojednostaviti proces naručivanja usluga pranja rublja za sve korisničke segmente
- Omogućiti efikasno upravljanje logistikom preuzimanja i dostave
- Osigurati transparentnost u praćenju statusa narudžbi
- Olakšati upravljanje pretplatničkim modelima i programima lojalnosti
- Podržati B2B integracije za partnere (upravitelje nekretnina, hotele, restorane)
- Pružati upravljačke podatke za optimizaciju poslovanja
- Podržati održive prakse i pratiti njihov učinak

## 3. Korisničke persone

Aplikacija mora podržavati sljedeće korisničke persone:

### 3.1. Turisti (B2C)
- **Profil**: Privremeni posjetitelji, borave 3-10 dana, ograničeno poznavanje lokalnog područja
- **Potrebe**: Jednostavno naručivanje, praćenje statusa, višejezična podrška, fleksibilno planiranje, različite opcije plaćanja uključujući međunarodne platne kartice

### 3.2. Lokalno stanovništvo (B2C)
- **Profil**: Stalni korisnici, zaposleni profesionalci koji cijene vrijeme
- **Potrebe**: Pretplatničke usluge, programi lojalnosti, redovita preuzimanja, preferiranje stalnih postavki

### 3.3. Upravitelji nekretnina (B2B)
- **Profil**: Upravljaju s više objekata za kratkoročni najam, imaju specifične potrebe za izmjenama gostiju
- **Potrebe**: Upravljanje višestrukim lokacijama, automatizirana planiranja, posebno izvještavanje, ugovorene cijene, integracija s postojećim sustavima upravljanja nekretninama

### 3.4. Poslovni klijenti (B2B)
- **Profil**: Hoteli, restorani i druge lokalne tvrtke s redovitim potrebama za pranjem
- **Potrebe**: Ugovorne cijene, prilagođeni paketi, mjesečna naplata, posebno izvještavanje

### 3.5. Administratori sustava
- **Profil**: Zaposlenici Split Laundry Express koji upravljaju platformom
- **Potrebe**: Upravljanje narudžbama, planiranje ruta, kontrola kvalitete, upravljanje korisnicima, analitika

### 3.6. Dostavno osoblje
- **Profil**: Zaposlenici odgovorni za preuzimanje i dostavu
- **Potrebe**: Jasni rasporedi, optimizirane rute, ažuriranje statusa u stvarnom vremenu, kontakt informacije klijenata

## 4. Funkcionalni zahtjevi

### 4.1. Zajednički zahtjevi (web i mobilna aplikacija)

#### 4.1.1. Registracija i upravljanje računom
- Registracija korisnika (email/lozinka, socijalni login, SMS verifikacija)
- Različiti tipovi računa (individualni, poslovni)
- Višejezični profili (HR, EN, DE, IT)
- Upravljanje osobnim podacima i adresama
- Povijest narudžbi i dokumenata
- Spremanje omiljenih postavki pranja
- Upravljanje metodama plaćanja

#### 4.1.2. Katalog usluga
- Pregled svih dostupnih usluga s detaljnim opisima
- Filtriranje po vrsti usluge (pranje i presavijanje, posteljina, osjetljivi predmeti)
- Paketi usluga (turistički, poslovni, pretplatnički)
- Prikaz cijena s jasnim izračunom
- Istaknute promocije i posebne ponude
- Prikaz ekoloških opcija i njihovog utjecaja

#### 4.1.3. Proces naručivanja
- Odabir usluga i količina
- Izbor vremenskih termina za preuzimanje i dostavu
- Dodavanje posebnih uputa (mrlje, osjetljivi materijali)
- Izračun cijene s popustima
- Izbor metode plaćanja
- Potvrda narudžbe s jedinstvenim brojem praćenja

#### 4.1.4. Praćenje narudžbe
- Praćenje statusa u stvarnom vremenu
- Primanje obavijesti o ključnim koracima (preuzimanje, primljeno u praonicu, u obradi, gotovo, u dostavi)
- Mogućnost izmjene termina dostave
- Direktna komunikacija s korisničkom podrškom
- Prikaz očekivanog vremena završetka

#### 4.1.5. Pretplatničke usluge
- Pregled dostupnih planova pretplate
- Upravljanje aktivnim pretplatama
- Automatsko planiranje redovitih preuzimanja
- Povijest pretplatničkih usluga

#### 4.1.6. Plaćanje i računi
- Višestruke metode plaćanja (kartice, PayPal, Apple/Google Pay)
- Spremanje podataka o plaćanju za buduće narudžbe
- Automatsko plaćanje za pretplatničke usluge
- Pregled i preuzimanje računa

#### 4.1.7. Programi lojalnosti i preporuke
- Praćenje bodova lojalnosti
- Izmjena bodova za popuste
- Program preporuka ("Preporuči prijatelju")
- Posebne nagrade za redovite klijente

#### 4.1.8. Podrška i pomoć
- Česta pitanja i odgovori
- Chat podrška u stvarnom vremenu
- Upute za korištenje
- Mogućnost prijave problema
- Kontakt informacije

### 4.2. Specifični zahtjevi za web aplikaciju

#### 4.2.1. Responsivan dizajn
- Optimizacija za sve veličine zaslona (mobitel, tablet, desktop)
- Konzistentno iskustvo na svim uređajima

#### 4.2.2. Napredne B2B funkcionalnosti
- Dashboard za upravitelje nekretnina
- Masovno dodavanje lokacija
- Izvještaji o korištenju usluga po lokacijama
- Upravljanje pristupom za više korisnika unutar organizacije
- API dokumentacija za integraciju s postojećim sustavima

#### 4.2.3. Admin sučelje
- Upravljanje korisnicima i dozvolama
- Upravljanje katalogom usluga i cijenama
- Pregled i upravljanje narudžbama
- Optimizacija ruta za dostavu
- Upravljanje pretplatama
- Marketing alati (promocije, popusti)
- Izvještaji i analitika
- Upravljanje partnerskim objektima

### 4.3. Specifični zahtjevi za mobilnu aplikaciju

#### 4.3.1. Nativne značajke
- Push obavijesti o statusu narudžbe
- Skeniranje odjevnih etiketa za preporuke pranja
- Podržano na iOS i Android platformama
- Integracija s lokalnim kalendarima za podsjetnike
- Korištenje lokacijskih usluga za optimizaciju dostave

#### 4.3.2. Offline mogućnosti
- Osnovne funkcionalnosti dostupne bez internetske veze
- Sinkronizacija podataka pri ponovnom spajanju

#### 4.3.3. Jednostavno ponovno naručivanje
- Brzo ponavljanje prethodnih narudžbi
- Favoriti i često korištene usluge

#### 4.3.4. QR kod za praćenje
- Jedinstveni QR kod za svaku narudžbu
- Brza provjera statusa skeniranjem

#### 4.3.5. Sučelje za dostavno osoblje
- Posebna aplikacija ili modul za dostavno osoblje
- Optimizirane rute dostave
- Ažuriranje statusa narudžbe u stvarnom vremenu
- Digitalni potpis pri preuzimanju/dostavi
- Komunikacija s klijentima

## 5. Nefunkcionalni zahtjevi

### 5.1. Performanse
- Vrijeme učitavanja stranica: manje od 2 sekunde
- Responzivnost korisničkog sučelja: manje od 100ms
- Mogućnost istovremenog posluživanja najmanje 1000 korisnika
- Obrada narudžbe: manje od 5 sekundi
- Brza sinkronizacija između web i mobilnih aplikacija

### 5.2. Sigurnost
- Enkripcija svih osjetljivih podataka (HTTPS, TLS 1.3)
- Sigurno pohranjivanje lozinki (hashing + salt)
- Usklađenost s GDPR-om
- Sigurna obrada plaćanja (PCI DSS)
- Zaštita od SQL injekcija i XSS napada
- Autentikacija u dvije faze za B2B korisnike
- Sigurnosni audit i penetracijsko testiranje

### 5.3. Skalabilnost
- Horizontalna skalabilnost za podršku sezonskim vrhuncima (5x normalno opterećenje)
- Modularni dizajn za jednostavno dodavanje novih funkcionalnosti
- Microservices arhitektura za neovisno skaliranje komponenti

### 5.4. Dostupnost
- Dostupnost sustava 99.9% (SLA)
- Planirani prekidi rada samo u razdobljima niskog prometa
- Automatsko prebacivanje na rezervne sustave u slučaju pada

### 5.5. Održavanje
- Dokumentirani API-ji za sve komponente
- Automatsko testiranje za kritične funkcionalnosti
- Praćenje grešaka i performansi u stvarnom vremenu
- Automatizirani proces implementacije (CI/CD)

### 5.6. Lokalizacija
- Potpuna podrška za hrvatski, engleski, njemački i talijanski jezik
- Kulturološka prilagodba (formati datuma, valute)
- Jednostavno dodavanje novih jezika

### 5.7. Kompatibilnost
- Web: Chrome, Firefox, Safari, Edge (zadnje 2 verzije)
- Mobilno: iOS 14+, Android 10+
- Responsivan dizajn za sve veličine zaslona

### 5.8. Pristupačnost
- Usklađenost s WCAG 2.1 AA standardima
- Podrška za čitače zaslona
- Tastaturna navigacija

## 6. Tehnička arhitektura i integracije

### 6.1. Arhitektura sustava
- Microservices arhitektura za fleksibilnost i skalabilnost
- API-first pristup za integraciju različitih frontend komponenti
- Cloud infrastruktura (preferira se AWS)
- Kontejnerizacija (Docker) za konzistentno okruženje

### 6.2. Backend tehnologije
- RESTful API za komunikaciju client-server
- Node.js/Express za backend servise
- PostgreSQL ili MongoDB za primarnu bazu podataka
- Redis za caching i sesije
- Message queue (RabbitMQ, Kafka) za asinkronu komunikaciju
- Firebase ili AWS Amplify za mobilne backend funkcionalnosti

### 6.3. Frontend tehnologije
- Web: React.js s TypeScript
- Mobilno: Flutter za cross-platform razvoj
- Responzivni CSS framework (Bootstrap, Tailwind)
- PWA funkcionalnosti za web aplikaciju

### 6.4. Integracije s trećim stranama

#### 6.4.1. Platni sustavi
- Stripe/Braintree za procesiranje plaćanja
- PayPal integracija
- Apple Pay/Google Pay podrška
- Integracija s lokalnim platnim sustavima (CorvusPay)

#### 6.4.2. Komunikacijske integracije
- Email usluga (SendGrid, Mailchimp)
- SMS obavijesti (Twilio)
- Push obavijesti (Firebase Cloud Messaging)
- Integrirani chat (Intercom, Zendesk)

#### 6.4.3. Geografske integracije
- Google Maps/Mapbox za lokacije i optimizaciju ruta
- Geocoding za adrese
- ETA izračuni za dostavu

#### 6.4.4. B2B integracije
- API za sustave upravljanja nekretninama (Airbnb, Booking.com, lokalni sustavi)
- Webhooks za dvosmjernu komunikaciju
- Integracija kalendara (Google, Outlook)

#### 6.4.5. Analitika i praćenje
- Google Analytics za web ponašanje
- Hotjar za toplinske mape i snimanje sesija
- Firebase Analytics za mobilno ponašanje
- Custom event tracking za poslovnu analitiku

## 7. UX/UI smjernice

### 7.1. Brend i vizualni identitet
- Moderna, čista estetika s naglaskom na pouzdanost i efikasnost
- Konzistentnost s fizičkim brendiranjem (logo, boje, tipografija)
- Plave i bijele boje kao primarne (asocijacija na čistoću)
- Akcentne boje za isticanje akcija (zelena za ekološke opcije)
- Intuitivne ikone za lakšu navigaciju

### 7.2. Korisničko iskustvo
- Minimalni broj koraka za dovršetak narudžbe (max 5)
- Intuitivni obrasci i jasni pozivi na akciju
- Konzistentnost u terminologiji i označavanju
- Jasne povratne informacije nakon svake akcije
- Pametna preporuka usluga na temelju povijesti korištenja
- Responzivan dizajn prilagođen mobilnim uređajima

### 7.3. Navigacija
- Jednostavna i jasna struktura navigacije
- Breadcrumbs za web aplikaciju
- Tabbed navigacija za mobilnu aplikaciju
- Brzi pristup najčešćim akcijama (naruči, prati)
- Dosljedni obrasci navigacije kroz aplikaciju

### 7.4. Specifične smjernice
- Velike, jasne tipke na mobilnoj verziji
- Izbjegavanje pretjeranog teksta - fokus na vizualne elemente
- Jasno istaknute cijene i vremenski okviri
- Privlačne fotografije za usluge
- Status narudžbe vidljiv na prvi pogled
- Jasno označavanje ekoloških opcija

## 8. Faze implementacije

### 8.1. Faza 1: MVP (3 mjeseca)
- Osnovna B2C funkcionalnost za turiste i lokalno stanovništvo
- Naručivanje osnovnih usluga (pranje, presavijanje, dostava)
- Jednostavno praćenje narudžbe
- Osnovna admin funkcionalnost
- Web aplikacija i jednostavna mobilna aplikacija
- Integracija s osnovnim platnim sustavima

### 8.2. Faza 2: B2B ekspanzija (3 mjeseca nakon MVP-a)
- B2B portal za upravitelje nekretnina i poslovne klijente
- Pretplatnički model i ponavljajuće narudžbe
- Naprednije praćenje narudžbi u stvarnom vremenu
- Poboljšano upravljanje rutama dostave
- Integracija s popularnim sustavima za upravljanje nekretninama
- Prošireni izvještaji i analitika

### 8.3. Faza 3: Napredne značajke (6 mjeseci nakon Faze 2)
- Sustav lojalnosti i preporuka
- Nativne mobilne aplikacije s potpunom funkcionalnošću
- Napredna personalizacija i preporuke
- Implementacija AI za predviđanje potražnje
- Integracija s dodatnim platnim metodama
- Proširene B2B integracije

### 8.4. Faza 4: Optimizacija i održivost (kontinuirano)
- Napredna analitika za optimizaciju poslovanja
- Praćenje i izvještavanje o održivosti
- Optimizacija ruta za smanjenje ugljičnog otiska
- Implementacija korisničkih povratnih informacija
- Priprema platforme za potencijalno širenje na druge lokacije

## 9. Metrike uspjeha

### 9.1. Korisničke metrike
- Stopa konverzije: % posjetitelja koji dovrše narudžbu
- Stopa zadržavanja: % korisnika koji se vraćaju nakon prve narudžbe
- Korisničko zadovoljstvo (CSAT, NPS)
- Prosječno vrijeme potrebno za dovršetak narudžbe
- Stopa odustajanja od narudžbe

### 9.2. Operativne metrike
- Prosječno vrijeme obrade narudžbe
- Stopa točnosti dostave (na vrijeme, točna lokacija)
- Broj reklamacija i njihovo vrijeme rješavanja
- Efikasnost ruta (broj dostava po satu)
- Stopa iskorištenosti kapaciteta

### 9.3. Poslovne metrike
- Prosječna vrijednost narudžbe
- Customer Lifetime Value (CLV)
- Trošak akvizicije korisnika (CAC)
- Rast prihoda po segmentu korisnika
- Stopa usvajanja pretplatničkih modela

### 9.4. Tehničke metrike
- Vrijeme odziva aplikacije
- Stopa pada/grešaka
- Vrijeme prekida rada (downtime)
- Performanse pri vršnim opterećenjima
- Stopa korisnika koji ažuriraju na najnoviju verziju aplikacije

## 10. Smjernice za testiranje

### 10.1. Korisničko testiranje
- Testiranje upotrebljivosti s predstavnicima svih korisničkih persona
- A/B testiranje za ključne korake u procesu narudžbe
- Testiranje na različitim uređajima i veličinama zaslona
- Testiranje višejezičnosti

### 10.2. Tehničko testiranje
- Unit testiranje za sve komponente
- Integracijski testovi za API-je
- End-to-end testovi za ključne korisničke scenarije
- Testiranje performansi pod opterećenjem
- Sigurnosno testiranje i penetracijsko testiranje
- Testiranje kompatibilnosti s različitim preglednicima i verzijama OS-a

## 11. Održavanje i podrška

### 11.1. Strategija ažuriranja
- Redovita ažuriranja (mjesečno za značajke, tjedno za sigurnost)
- Automatsko ažuriranje mobilnih aplikacija
- Jasna komunikacija promjena korisnicima

### 11.2. Podrška korisnicima
- Višekanalna podrška (chat, email, telefon)
- Baza znanja i dokumentacija za korisnike
- Trening program za osoblje podrške
- Praćenje i analiza upita za identifikaciju područja za poboljšanje

### 11.3. Praćenje i optimizacija
- Real-time monitoring performansi
- Praćenje korisničkog ponašanja za identifikaciju prilika za poboljšanje
- Redoviti review korisničkih povratnih informacija
- Kontinuirano poboljšanje na temelju podataka

---

Ovaj prompt služi kao sveobuhvatan vodič za razvoj web i mobilne aplikacije Split Laundry Express, usklađen s vašim poslovnim planom. Sadrži detaljne zahtjeve i smjernice koje možete koristiti pri komunikaciji s razvojnim timom ili drugim LLM alatima. Prilagodite pojedine dijelove prema vašim specifičnim prioritetima i dostupnim resursima.