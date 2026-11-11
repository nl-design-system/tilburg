<!-- @license CC0-1.0 -->

## Waar begin ik?

Vier ingangen, naar wat je hier komt doen. Het plaatje is de korte versie: de roze vakken en de blauwe regels zijn links. Alles staat eronder uitgeschreven.

<!-- markdownlint-disable MD033 -->
<figure style="margin: 1.5rem 0;">
  <object
    type="image/svg+xml"
    data="diagrams/routes.svg"
    aria-label="Waar begin ik? Vier ingangen. Ik kijk rond: begin bij Voorbeelden, daarna Implementatiestatus, Tokens en Toestemming voor gebruik. Ik bouw ermee: begin bij Aan de slag, daarna de knop Gebruik, Tips en valkuilen en Implementatiestatus. Ik werk eraan mee: begin bij Je eerste wijziging, daarna pnpm new, pnpm verify, pnpm ship en CONTRIBUTING.md. Ik ontwerp: begin bij Voor ontwerpers op Tokens, daarna de tokenpagina's, Thema's en Hoog contrast, en de componenten onder Tilburg HTML."
    style="width: 100%; max-width: 760px; height: auto; aspect-ratio: 760 / 412;"
  >
    <img src="diagrams/routes.svg" alt="Waar begin ik? Vier ingangen. Ik kijk rond: begin bij Voorbeelden, daarna Implementatiestatus, Tokens en Toestemming voor gebruik. Ik bouw ermee: begin bij Aan de slag, daarna de knop Gebruik, Tips en valkuilen en Implementatiestatus. Ik werk eraan mee: begin bij Je eerste wijziging, daarna pnpm new, pnpm verify, pnpm ship en CONTRIBUTING.md. Ik ontwerp: begin bij Voor ontwerpers op Tokens, daarna de tokenpagina's, Thema's en Hoog contrast, en de componenten onder Tilburg HTML." style="width: 100%; max-width: 760px; height: auto;" />
  </object>
  <figcaption style="margin-top: 0.5rem; font-size: 0.875rem; color: #5B6E8A; text-align: center;">
    Van boven naar beneden: wie je bent, waar je begint, en wat daarna komt. Klik op een roze vak om daar te beginnen.
  </figcaption>
</figure>
<!-- markdownlint-enable MD033 -->

### Ik kijk rond

Je wilt weten wat dit is en hoe het eruitziet. Je hoeft niets te installeren.

- **Wat is het?** _Vier lagen_ en _Wat is NL Design System?_ hieronder leggen het uit zonder code.
- **Hoe ziet het eruit?** De React-Storybook heeft onder _Tilburg → Voorbeelden_ drie pagina's die helemaal uit
  Tilburg-componenten zijn opgebouwd: _Afspraak maken_, _Melding openbare ruimte_ en _Mijn aanvragen_. Losse
  componenten staan in de zijbalk; onder `Tilburg HTML/…` zie je elk component met zijn varianten.
- **Wat is er al?** [Implementatiestatus](?path=/docs/tilburg-implementatiestatus--docs) is de lijst van alle
  componenten, met een link naar elk.
- **De huisstijl?** Kleuren, afstanden en lettergroottes staan onder [Tokens](?path=/docs/tokens-intro--docs).
- **Mag ik dit gebruiken?** Zie [Toestemming voor gebruik](?path=/docs/tilburg-toestemming-voor-gebruik--docs) en de
  [licentie](?path=/docs/tilburg-open-source-license--docs).

### Ik bouw ermee

Je maakt een website of applicatie met de componenten.

- **Begin bij** [Aan de slag](?path=/docs/tilburg-aan-de-slag--docs): installeren, de basis-setup die elke laag nodig
  heeft, en een eerste component per laag. Onderaan staat _Werkt het niet?_ voor de meest gemaakte fouten.
- **Een component gebruiken?** Elk component heeft per laag een pagina in de zijbalk, met voorbeelden en een
  **Usage**-sectie met de API. De knop **`</> Gebruik`** in de werkbalk van een story geeft de code voor je eigen
  project: installeren, laden en plaatsen, met een kopieerknop.
- **Aan het bouwen?** [Tips & valkuilen](?path=/docs/tilburg-tips-valkuilen--docs) gaat over toegankelijkheid,
  formulieren en iconen.
- **Bestaat het in mijn laag?** Zie [Implementatiestatus](?path=/docs/tilburg-implementatiestatus--docs).
- **Een kleur of afstand aanpassen?** Zie _Tokens overschrijven_ op [Tokens](?path=/docs/tokens-intro--docs).

### Ik werk eraan mee

Je verbetert het Design System zelf: een bug, een nieuw component, de documentatie.

- **Begin bij** [Je eerste wijziging](?path=/docs/tilburg-je-eerste-wijziging--docs): in een kwartier van
  `node scripts/setup.mjs` tot en met de pull request, met een echte kleine wijziging.
- **Een nieuw component?** `pnpm new <naam> --html '<…>'` maakt de vier lagen, de stories en de tests uit de HTML.
- **Hoe alles in elkaar zit**, de afspraken en het testen staan in
  [`CONTRIBUTING.md`](https://github.com/nl-design-system/tilburg/blob/main/CONTRIBUTING.md).
- **Iets gevonden maar geen tijd?** Meld het als
  [issue](https://github.com/nl-design-system/tilburg/issues); zie ook _Bijdragen_ onderaan deze pagina.

### Ik ontwerp

Je werkt in Figma aan de huisstijl en de tokens.

- **Begin bij** _Voor ontwerpers_ op [Tokens](?path=/docs/tokens-intro--docs): hoe een waarde uit Figma in de
  componenten komt, en wat je na een wijziging controleert.
- **Welke tokens zijn er?** De pagina's _Colors_, _Space_, _Typography_ en _Interaction_ onder `Tokens` in de zijbalk
  tonen elke naam met zijn echte waarde.
- **Thema's en hoog contrast** staan op dezelfde pagina, onder _Thema's_ en _Hoog contrast_.
- **Hoe ziet een component eruit met mijn waarden?** Onder `Tilburg HTML/…` staat elk component met zijn varianten.
