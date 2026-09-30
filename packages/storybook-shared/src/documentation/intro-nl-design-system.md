<!-- @license CC0-1.0 -->

## Wat is NL Design System?

[NL Design System](https://nldesignsystem.nl) is een open-source design system voor de Nederlandse overheid. Gemeenten,
ministeries, uitvoeringsorganisaties en leveranciers maken het samen, als community. Het doel: websites en digitale
diensten die toegankelijk, gebruiksvriendelijk en herkenbaar zijn, zonder dat elke organisatie hetzelfde werk opnieuw
doet.

### Gedeelde componenten, eigen huisstijl

Organisaties delen **componenten**: knoppen, formuliervelden, koppen, tabellen, meldingen. Hoe een component werkt, hoe
het met toetsenbord en schermlezer te gebruiken is en welke HTML het maakt, is voor iedereen gelijk. Alleen de
**huisstijl** verschilt: kleuren, lettertype, afstanden, afrondingen. Die leg je vast in een **thema**.

### Design tokens

Een thema bestaat uit design tokens: benoemde ontwerpbeslissingen die als CSS-variabelen in de componenten
terechtkomen. De naam zegt van wie het component is, welk onderdeel het betreft en welke eigenschap, bijvoorbeeld
`--utrecht-button-primary-action-background-color`. Een component leest alleen zulke variabelen; een ander thema is
dus niets anders dan andere waarden voor dezelfde variabelen, achter een class op een wrapper of `<body>`
(`tilburg-theme`).

### Toegankelijkheid

Overheidswebsites moeten voldoen aan de WCAG (niveau AA). De componenten zijn daarop gebouwd. Het thema moet dat niet
ongedaan maken: kleurparen houden genoeg contrast en de focus blijft zichtbaar.

### Het estafettemodel

Componenten groeien stap voor stap, van _Help wanted_ via _Community_ en _Candidate_ naar _Hall of Fame_. Een
organisatie bouwt een component voor haar eigen behoefte; andere organisaties gebruiken en verbeteren het, tot het de
gedeelde standaard is. Zo hoeft niet elke organisatie alles zelf te bouwen: de meeste leunen op componenten van
anderen.

Meer op [nldesignsystem.nl](https://nldesignsystem.nl).

## Tilburg en NL Design System

Het Tilburg Design System volgt die werkwijze. Het bouwt voort op de componenten van **Utrecht**, een van de
organisaties in de NL Design System-community, en voegt daar de Tilburg-huisstijl en een aantal eigen componenten aan
toe.

### Verhouding tot Utrecht

|                 | Utrecht levert                                                        | Tilburg levert                                                                                                                                   |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Componenten** | de basiscomponenten als HTML/CSS (`@utrecht/component-library-css`)   | dezelfde componenten in vier lagen (HTML/CSS, React, Angular, Web Components), plus eigen componenten die Utrecht niet heeft                     |
| **Vormgeving**  | de tokenstructuur: welke `--utrecht-*`-variabelen een component leest | de waarden: de Tilburg-kleuren, typografie en afstanden (`@gemeente-tilburg/design-tokens`), plus `--tilburg-*`-tokens voor de eigen componenten |
| **Gedrag**      | de HTML en de toegankelijkheid van de basiscomponenten                | wat daarbovenop komt: de Tilburg-varianten, scripts voor accordion en combobox, en de componentlagen                                             |

Wat dat betekent in de praktijk:

- **De meeste componenten zijn een Utrecht-component met de Tilburg-huisstijl.** Knop, formuliervelden, koppen,
  tabel, accordion, kruimelpad: de HTML gebruikt `utrecht-*`-classes, het uiterlijk komt uit de Tilburg-tokens.
- **Sommige componenten introduceert Tilburg zelf.** Ze hebben eigen `tilburg-*`-markup en geen Utrecht-basis:
  data-list, language-toggle, loading-spinner, modal, page-footer, page-header, pagination, progress-bar en
  validation-message. In de zijbalk staan ze met het label **TLB**.
- **Bestaat er een Utrecht-component, dan gebruikt Tilburg dat.** Een nieuw Tilburg-component komt er alleen als
  Utrecht niets heeft dat past.
- **Een fout in de basis van een component** (de HTML of het gedrag van een Utrecht-component) hoort bij Utrecht of
  NL Design System; een fout in de Tilburg-huisstijl, een TLB-component of een van de lagen hoort hier.
