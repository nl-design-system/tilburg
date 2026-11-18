<!-- @license CC0-1.0 -->

## Werkt het niet?

| Wat je ziet                                                              | Oorzaak                                                                          | Oplossing                                                                                        |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `dist/tilburg/theme.css` wordt niet gevonden                             | Je hebt de oude `design-tokens@0.0.1` van npm                                    | Installeer de tarball uit de repository (zie _Installeren vanuit een tarball_)                   |
| Componenten hebben geen kleuren, randen of spacing                       | De tokens gelden niet: `class="tilburg-theme"` ontbreekt                         | Zet `tilburg-theme` op `<body>` of een wrapper, of gebruik `variables.css` (tokens op `:root`)   |
| Structuur klopt, maar er is helemaal geen Tilburg-stijl (alleen React)   | `dist/style.css` van `components-react` is niet geïmporteerd                     | `import "@gemeente-tilburg/components-react/dist/style.css"`                                     |
| Knoppen en koppen in Helvetica in plaats van het smalle Tilburg-font     | TradeGothicCondensed18 is niet geladen                                           | Laad de webfont-kit van het Design System-team (zie _4. Fonts_ in de basis)                      |
| Lopende tekst in Times of het browserfont                                | `utrecht-document` ontbreekt, of Roboto is niet geladen                          | Zet `utrecht-document` op de wrapper en laad Roboto                                              |
| Basis-layout van een component ontbreekt (bv. alert zonder rand of flex) | De Utrecht-basis-CSS is niet geladen                                             | Importeer `@utrecht/component-library-css/dist/index.css`                                        |
| Accordion, combobox, wachtwoordveld of tooltip doet niets (plain HTML)   | Het script draait niet, of het `data-tilburg-…-enhance`-attribuut ontbreekt      | Laad `<component>/index.js` uit `components-css` en zet het opt-in attribuut op het root-element |
| Een component staat dubbel op de pagina, of gedraagt zich vreemd         | `<tilburg-…>` (Angular) en `<tilburg-wbc-…>` door elkaar gebruikt                | Kies per pagina één laag; de prefixen zijn juist verschillend zodat ze elkaar niet raken         |
| Angular: `'tilburg-alert' is not a known element`                        | `TilburgComponentsModule` is niet geïmporteerd in de module waar je hem gebruikt | Voeg de module toe aan de `imports` van die NgModule of standalone component                     |

Kom je er niet uit, meld het dan als [issue op GitHub](https://github.com/nl-design-system/tilburg/issues) of neem
contact op met het Design System-team van Gemeente Tilburg.
