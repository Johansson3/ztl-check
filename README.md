# ZTL Check — static site

Osam stranica, bez servera, bez build koraka, bez zavisnosti.
Otvori `index.html` duplim klikom i radi.

## Fajlovi

```
index.html            početna + alat (4 pitanja)
what-is-ztl.html      šta je ZTL, kako kazna stigne
rental-charge.html    "ovo nije kazna" — naplata rentala
appeal-grounds.html   kada se žalba isplati, kada ne
how-to-pay.html       popust od 30%, prevare, šta ako ignorišeš
cities/rome.html      Rim
cities/florence.html  Firenca
cities/milan.html     Milano
assets/style.css      ceo dizajn sistem
assets/rules.js       SVA LOGIKA — jedino ovo menjaš
assets/app.js         ljuska alata, ne diraj
robots.txt, sitemap.xml
```

## Deploy — tri opcije, sve besplatne

**Cloudflare Pages (preporuka)** — prevuci ceo folder na `pages.cloudflare.com` → Upload assets. Dobijaš HTTPS i CDN. Domen se dodaje u Custom domains.

**Netlify** — prevuci folder na `app.netlify.com/drop`. Isto, za 30 sekundi.

**GitHub Pages** — push u repo, Settings → Pages → Deploy from branch.

Nema ničega za instalirati ni pokrenuti.

## Pre nego što objaviš

1. Zameni `https://example.com` svojim domenom — u `<link rel="canonical">` na svakoj stranici, u `robots.txt` i u `sitemap.xml`.
2. **Popuni gradske podatke.** Svaka stranica u `cities/` ima HTML komentar na vrhu sa listom polja koja moraš proveriti na sajtu same opštine. Ne objavljuj pogađanja — pogrešan rok je gori od nepostojeće stranice.
3. Dugme "Write my appeal — €9" trenutno ne vodi nigde. Pusti alat besplatno dok ne vidiš koliko ljudi uopšte dođe do rezultata.

## Kako se menja logika

Sve je u `assets/rules.js`:

- `timing` — rokovi (5 dana popust, 60 dana žalba, 360 dana obaveštenje)
- `matrix` — onih 12 kombinacija
- `grounds` — objašnjenja osnova
- `outcomes` — naslovi, tekstovi, boje, dugmad

Nova zemlja ili nova niša = nova kopija `rules.js`. `app.js` ostaje isti.

## Kako se dodaje grad

Kopiraj `cities/rome.html`, promeni tekst, dodaj link u `index.html` i red u `sitemap.xml`.
Svaka gradska stranica mora da nosi nešto što nema nijedna druga — inače je to tanak sadržaj i Google ga neće rangirati.
