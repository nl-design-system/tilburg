<!-- @license CC0-1.0 -->

De Tilburg-componenten zijn een gemeentelijke uitbreiding op het [NL Design System](https://nldesignsystem.nl). Ze leunen op `@utrecht/component-library-css` als basis en op `@gemeente-tilburg/design-tokens` voor kleuren, ruimtes en typografie. De huisstijl van Tilburg wordt daarbovenop gelegd.

> ⚠️ **LET OP**
>
> Deze componentenbibliotheek is nog in ontwikkeling. Componenten en hun API's kunnen nog wijzigen. Loop je ergens tegenaan, mis je een component, of twijfel je of je iets al kunt gebruiken? Neem contact op met het Design System-team van Gemeente Tilburg — dan kijken we mee. Meld bugs en verzoeken bij voorkeur als issue op [github.com/nl-design-system/tilburg](https://github.com/nl-design-system/tilburg/issues).

## Drie consumptie-lagen

De componenten zijn in drie lagen beschikbaar — kies de laag die past bij je stack:

| Laag                 | Package                                | Voor wie                                                                            |
| -------------------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| **Plain HTML / CSS** | `@gemeente-tilburg/components-css`     | elk framework — schrijf BEM-classes (`utrecht-…` / `tilburg-…`) direct in je markup |
| **React**            | `@gemeente-tilburg/components-react`   | React-projecten — `<Alert>`, `<Textbox>`, etc.                                      |
| **Angular**          | `@gemeente-tilburg/components-angular` | Angular-projecten — `<tilburg-alert>`, `<tilburg-textbox>`, etc.                    |

De **HTML/CSS-laag is leidend**: elke React- en Angular-component is een dunne wrapper die exact dezelfde DOM en klassen emit als de gedeelde HTML/CSS-referentie. Wat je onder `Tilburg HTML/…` ziet is de gedeelde render — `Tilburg React/…` en `Tilburg Angular/…` zijn parity-checks bovenop.

<!-- markdownlint-disable MD033 -->
<figure style="margin: 1.5rem 0;">
  <img
    src="/diagrams/layers.svg"
    alt="Tilburg-lagen-architectuur: React- en Angular-wrappers bouwen op de Tilburg HTML/CSS-laag, die op de design-tokens leunt."
    style="width: 100%; max-width: 760px; height: auto;"
  />
  <figcaption style="margin-top: 0.5rem; font-size: 0.875rem; color: #5B6E8A; text-align: center;">
    Pijlen wijzen naar onderliggende lagen. React/Angular-wrappers zijn optioneel — de HTML/CSS-laag is rechtstreeks te gebruiken in elke stack.
  </figcaption>
</figure>
<!-- markdownlint-enable MD033 -->
