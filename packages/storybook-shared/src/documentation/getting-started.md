<!-- @license CC0-1.0 -->

# Aan de slag

Deze pagina brengt je van een leeg project naar een eerste Tilburg-component die er goed uitziet. Doe eerst de
**basis** hieronder; die is voor elke laag hetzelfde. Kies daarna je laag.

## Welke packages kun je installeren?

| Package                                    | Laag                    | Status                                                                                            |
| ------------------------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------- |
| `@gemeente-tilburg/design-tokens`          | basis, nodig voor alles | gepubliceerd op npm                                                                               |
| `@gemeente-tilburg/components-react`       | React                   | **nog niet op npm** — komt bij de eerste release; tot dan via een tarball (zie `CONTRIBUTING.md`) |
| `@gemeente-tilburg/components-angular`     | Angular                 | **nog niet op npm** — komt bij de eerste release; tot dan via een tarball (zie `CONTRIBUTING.md`) |
| `@gemeente-tilburg/components-css`         | Plain HTML / CSS        | **nog niet gepubliceerd** — vraag het Design System-team om een build                             |
| `@gemeente-tilburg/web-components-stencil` | Web Components          | **nog niet gepubliceerd** — experimenteel, vraag het Design System-team                           |

De componenten zijn nog in ontwikkeling (versie 0.x): API's kunnen per release veranderen. Lees de changelog bij een
update.

## Basis — voor elke laag

### 1. Design tokens

```bash
npm install @gemeente-tilburg/design-tokens
```

De tokens zijn CSS custom properties (`--tilburg-…`, `--utrecht-…`). Er zijn twee varianten van hetzelfde bestand:

| Bestand                                                      | Tokens staan op  | Wanneer                                                                        |
| ------------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------ |
| `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css`     | `.tilburg-theme` | Aanbevolen. Je bepaalt zelf waar de huisstijl geldt, bv. naast andere thema's. |
| `@gemeente-tilburg/design-tokens/dist/tilburg/variables.css` | `:root`          | De hele pagina is Tilburg en je wilt geen extra class.                         |

> ⚠️ Gebruik je `theme.css`, zet dan **`class="tilburg-theme"`** op een element rond je content (meestal `<body>`).
> Zonder die class zijn alle tokens leeg en ziet elke component er ongestyled uit. Dit is de meest gemaakte fout.

### 2. Utrecht-basis-CSS

De Tilburg-componenten bouwen voort op de [Utrecht](https://nl-design-system.github.io/utrecht/)-componenten:
Utrecht levert de basisstijl, Tilburg legt de huisstijl erbovenop.

```bash
npm install @utrecht/component-library-css
```

```css
@import "@utrecht/component-library-css/dist/index.css";
```

De Storybooks gebruiken versie `5.2.0`.

### 3. Document-class

Zet `utrecht-document` op dezelfde wrapper. Die class zet het basisfont, de tekstkleur en de regelhoogte uit de tokens;
zonder staat de lopende tekst in het browserfont.

```html
<body class="tilburg-theme utrecht-document">
  …
</body>
```

In React kun je ook `<Document>` uit `@utrecht/component-library-react` gebruiken, in Angular `<tilburg-document>`.

### 4. Fonts

De tokens verwijzen naar twee fonts, die je zelf laadt:

- **TradeGothicCondensed18** — koppen en knoppen. Dit is een **gelicenseerd font**: de webfont-kit krijg je via het
  Design System-team van Gemeente Tilburg. Zie ook _Toestemming voor gebruik_.
- **Roboto** — lopende tekst. Open font; laad het bv. via [Bunny Fonts](https://fonts.bunny.net/family/roboto) (gewicht
  400, 500 en 700) of host het zelf.

Zonder de fonts werkt alles, maar het is niet de Tilburg-huisstijl. Koppen en knoppen vallen terug op Helvetica. De
lopende tekst valt terug op het **standaard-serif-font van de browser (meestal Times)**, omdat het Roboto-token geen
fallback heeft. Laad Roboto dus altijd.

### Minimale pagina

```html
<!doctype html>
<html lang="nl">
  <head>
    <link rel="stylesheet" href="/node_modules/@gemeente-tilburg/design-tokens/dist/tilburg/theme.css" />
    <link rel="stylesheet" href="/node_modules/@utrecht/component-library-css/dist/index.css" />
    <!-- fonts: de kit-URL van het Design System-team + Roboto -->
  </head>
  <body class="tilburg-theme utrecht-document">
    <!-- je componenten -->
  </body>
</html>
```

Werk je met een bundler (Vite, Angular CLI, webpack), importeer de twee CSS-bestanden dan in je entry-stylesheet in plaats
van met `<link>`. De stappen per laag hieronder laten zien hoe.
