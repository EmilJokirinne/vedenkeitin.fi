/*
 * Vedenkeitin.fi – tuotetiedot
 * ------------------------------------------------------------
 * Tätä tiedostoa muokkaamalla päivität tuotteet, hinnat ja päivämäärät.
 * Sivuston rakennetta ei tarvitse muuttaa.
 *
 * Kentät:
 *  id                  yksilöllinen tunniste (pienet kirjaimet, ei välilyöntejä)
 *  product_name        näytettävä nimi
 *  brand, model        valmistaja ja mallikoodi
 *  price               esimerkkihinta euroina (numero) tai null, jos hintaa ei tiedetä
 *  price_updated       päivä, jolloin hinta tarkistettiin (VVVV-KK-PP) tai null
 *                      -> jos null, sivulla lukee "Hinta tarkistettava jälleenmyyjältä"
 *  retailer            jälleenmyyjän nimi
 *  retailer_url        suora tuotesivu tai null (silloin linkki vie kaupan etusivulle)
 *  affiliate_url       affiliate-linkki; jos täytetty, sitä käytetään retailer_url:n sijaan
 *  capacity_l          tilavuus litroina
 *  power_w             teho watteina
 *  temperature_control true / false
 *  material            "teras" | "lasi" | "muovi" | "muu"
 *  cordless            johdoton kannu 360° alustalla (true/false/null)
 *  keep_warm           lämpimänäpito (true/false/null)
 *  filter              irrotettava kalkkisuodatin (true/false/null)
 *  automatic_shutdown  automaattinen virrankatkaisu (true/false/null)
 *  dry_boil_protection kuivakäyntisuoja (true/false/null)
 *  image_url           kuva (tiedosto sivuston juuressa)
 *  label               neutraali luokka, esim. "Edullinen vaihtoehto"
 *  use_cases           ["peruskaytto","tee","kahvi","matkalle","perhe"]
 *  highlights          2–4 tärkeintä ominaisuutta lyhyesti
 *  added               päivä, jolloin tuote lisättiin vertailuun (lajittelu "Uusimmat")
 *
 * null = tietoa ei ole varmistettu. Sivu näyttää silloin "–".
 * Älä täytä arvauksia: tyhjä kenttä on parempi kuin väärä tieto.
 */

window.VK_CONFIG = {
  siteUpdated: "2026-09-30",   // "Päivitetty viimeksi"
  pricesChecked: "2026-09-30"  // "Hinnat tarkistettu viimeksi"
};

window.VK_PRODUCTS = [
  {
    id: "sencor-swk1010wh",
    product_name: "Sencor SWK1010WH",
    brand: "Sencor",
    model: "SWK1010WH",
    price: 14.95,
    price_updated: "2026-09-30",
    retailer: "Prisma",
    retailer_url: "https://www.prisma.fi/tuotteet/100677993/sencor-vedenkeitin-swk1010wh-valkoinen-100677993",
    affiliate_url: "",
    capacity_l: 1.0,
    power_w: 1100,
    temperature_control: false,
    material: "muovi",
    cordless: true,
    keep_warm: null,
    filter: true,
    automatic_shutdown: true,
    dry_boil_protection: true,
    image_url: "/keitin-muovi.svg",
    label: "Pieni malli",
    use_cases: ["peruskaytto", "matkalle"],
    highlights: ["1 litran tilavuus", "Vesimäärän asteikko molemmin puolin", "Irrotettava kalkkisuodatin", "Kannen turvalukitus"],
    added: "2026-09-30"
  },
  {
    id: "russell-hobbs-textures-plus",
    product_name: "Russell Hobbs Textures Plus",
    brand: "Russell Hobbs",
    model: "22591-70",
    price: 29.95,
    price_updated: "2026-09-30",
    retailer: "Prisma",
    retailer_url: "https://www.prisma.fi/tuotteet/100155251/russell-hobbs-textures-plus-vedenkeitin-100155251",
    affiliate_url: "",
    capacity_l: 1.7,
    power_w: 2400,
    temperature_control: false,
    material: "muovi",
    cordless: true,
    keep_warm: false,
    filter: true,
    automatic_shutdown: true,
    dry_boil_protection: true,
    image_url: "/keitin-muovi.svg",
    label: "Edullinen vaihtoehto",
    use_cases: ["peruskaytto", "perhe"],
    highlights: ["Pikakeitto 1–3 kupilliselle", "Valaistu vesimäärän näyttö", "Irrotettava suodatin"],
    added: "2026-09-30"
  },
  {
    id: "wilfa-pure-boil-wkg-2200s",
    product_name: "Wilfa Pure Boil",
    brand: "Wilfa",
    model: "WKG-2200S",
    price: 39.95,
    price_updated: "2026-09-30",
    retailer: "Prisma",
    retailer_url: "https://www.prisma.fi/tuotteet/100250222/wilfa-pure-boil-vedenkeitin-wkg-2200s-100250222",
    affiliate_url: "",
    capacity_l: 1.8,
    power_w: 2200,
    temperature_control: false,
    material: "lasi",
    cordless: true,
    keep_warm: null,
    filter: null,
    automatic_shutdown: true,
    dry_boil_protection: true,
    image_url: "/keitin-lasi.svg",
    label: "Lasinen vaihtoehto",
    use_cases: ["peruskaytto", "perhe"],
    highlights: ["Borosilikaattilasia", "Piilotettu lämpövastus", "Kansi avautuu kahvan painikkeesta", "Johdon säilytys pohjassa"],
    added: "2026-09-30"
  },
  {
    id: "electrolux-e3k1-3st",
    product_name: "Electrolux Create 3",
    brand: "Electrolux",
    model: "E3K1-3ST",
    price: 39.95,
    price_updated: "2026-09-30",
    retailer: "Prisma",
    retailer_url: "https://www.prisma.fi/tuotteet/110211299/electrolux-e3k1-3st-vedenkeitincreate-3-sarja-tilavuus-17-litraa-360-astetta-kaantyva-3-kertainen-virran-turvakatkaisu-liitantateho-2200w-vari-teras-110211299",
    affiliate_url: "",
    capacity_l: 1.7,
    power_w: 2200,
    temperature_control: false,
    material: "teras",
    cordless: true,
    keep_warm: false,
    filter: true,
    automatic_shutdown: true,
    dry_boil_protection: true,
    image_url: "/keitin-teras.svg",
    label: "Teräksinen perusmalli",
    use_cases: ["peruskaytto", "perhe"],
    highlights: ["Ruostumatonta terästä", "Irrotettava kalkkisuodatin", "Kolminkertainen turvakatkaisu"],
    added: "2026-09-30"
  },
  {
    id: "wilfa-rapids-wk3b-2000",
    product_name: "Wilfa Rapids",
    brand: "Wilfa",
    model: "WK3B-2000",
    price: 39.95,
    price_updated: "2026-09-30",
    retailer: "Prisma",
    retailer_url: "https://www.prisma.fi/tuotteet/110211465/wilfa-rapids-vedenkeitin-wk3b-2000-110211465",
    affiliate_url: "",
    capacity_l: 1.7,
    power_w: 2000,
    temperature_control: false,
    material: "teras",
    cordless: true,
    keep_warm: null,
    filter: true,
    automatic_shutdown: true,
    dry_boil_protection: true,
    image_url: "/keitin-teras-tumma.svg",
    label: "Teräs, musta viimeistely",
    use_cases: ["peruskaytto", "perhe"],
    highlights: ["Ruostumatonta terästä", "Läpinäkyvä vesimäärän asteikko", "Irrotettava kalkkisuodatin"],
    added: "2026-09-30"
  },
  {
    id: "bosch-twk2m164",
    product_name: "Bosch MyMoment",
    brand: "Bosch",
    model: "TWK2M164",
    price: 39.95,
    price_updated: null,
    retailer: "Prisma",
    retailer_url: null,
    affiliate_url: "",
    capacity_l: 1.7,
    power_w: 2400,
    temperature_control: false,
    material: "muovi",
    cordless: true,
    keep_warm: false,
    filter: true,
    automatic_shutdown: true,
    dry_boil_protection: true,
    image_url: "/keitin-muovi-punainen.svg",
    label: "Tehokas 2400 W",
    use_cases: ["peruskaytto", "perhe"],
    highlights: ["Yhden kupin merkintä", "Irrotettava kalkkisuodatin", "Ylikuumenemissuoja"],
    added: "2026-09-30"
  },
  {
    id: "smeg-klf03",
    product_name: "Smeg KLF03",
    brand: "Smeg",
    model: "KLF03WHEU",
    price: 149.99,
    price_updated: "2026-09-30",
    retailer: "Prisma",
    retailer_url: "https://www.prisma.fi/tuotteet/100183162/smeg-vedenkeitin-klf03wheu-valkoinen-100183162",
    affiliate_url: "",
    capacity_l: 1.7,
    power_w: 2400,
    temperature_control: false,
    material: "teras",
    cordless: true,
    keep_warm: null,
    filter: true,
    automatic_shutdown: true,
    dry_boil_protection: true,
    image_url: "/keitin-retro.svg",
    label: "Tyylikäs vaihtoehto",
    use_cases: ["peruskaytto", "perhe"],
    highlights: ["50-luvun retromuotoilu", "Runko ruostumatonta terästä", "Irrotettava kalkkisuodatin", "Liukumattomat jalat"],
    added: "2026-09-30"
  }
];
