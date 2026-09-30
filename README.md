# Vedenkeitin.fi – ylläpito-ohje

Staattinen sivusto: kaikki tiedostot ovat juuressa, ei alikansioita. Lataa sellaisenaan webhotellin juureen (public_html).

## Tuotteiden ja hintojen päivitys
Muokkaa **products.js**:
- `VK_CONFIG.pricesChecked` / `siteUpdated` – "Hinnat tarkistettu" ja "Päivitetty viimeksi" -päivämäärät kaikilla sivuilla.
- `VK_PRODUCTS` – yksi objekti per tuote. Uusi tuote = kopioi olemassa oleva ja muuta arvot.
- `price_updated: null` → sivulla näkyy "Hinta tarkistettava jälleenmyyjältä".
- Tuntematon ominaisuus = `null` (näkyy "–"). Älä arvaa.
- `affiliate_url` – kun täytetty, linkki käyttää sitä ja saa merkinnän rel="sponsored".
- `material`: teras | lasi | muovi | muu. `use_cases`: peruskaytto, tee, kahvi, matkalle, perhe.

Jälleenmyyjät: **retailers.js**.

## Osoitteet
Sivut ovat tiedostoja kuten `osto-opas.html`, mutta niihin linkitetään muodossa `/osto-opas/`.
- Apache-webhotelli: `.htaccess` hoitaa ohjaukset (myös /affiliate/ → /tietoa-sivustosta/).
- Netlify / Cloudflare Pages: `_redirects`.
- Paikallinen esikatselu vaatii palvelimen, joka tukee näitä ohjauksia (file:// ei toimi).

## Tarkista ennen julkaisua
- Sähköpostiosoite info@vedenkeitin.fi (yhteystiedot ja tietosuojaseloste) sekä rekisterinpitäjän tiedot.
- Bosch TWK2M164: hintaa ja tuotelinkkiä ei ole vahvistettu, siksi "Hinta tarkistettava".
- Wilfa Pure Boil: valmistajan mukaan tilavuus on 1,8 l (ei 1,7 l).
- Vertailussa ei vielä ole lämpötilansäädöllisiä malleja – lisää niitä products.js-tiedostoon.
- Kun lisäät sivuja tai muutat päivämääriä, päivitä myös sitemap.xml.
