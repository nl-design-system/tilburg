<!-- @license CC0-1.0 -->

# Tips & valkuilen

Praktische dingen die je niet uit één componentpagina haalt. Voorbeelden staan in Angular-syntax tenzij anders
vermeld; de React-props en Web Component-attributen heten hetzelfde (in React camelCase, in Web Components
kebab-case).

## Toegankelijkheid

De componenten zijn standaard toegankelijk, maar een paar dingen moet je zelf goed koppelen.

### Labels en velden

Een label verwijst met `for` naar het `id` van zijn veld. De componenten maken geen id's voor je aan.

```html
<tilburg-form-label for="email">E-mailadres</tilburg-form-label>
<tilburg-textbox id="email" type="email" [control]="emailCtrl"></tilburg-textbox>
```

In Web Components zet je `id` gewoon op het element (`<tilburg-wbc-textbox id="email">`). De component verplaatst het
naar de binnenliggende `<input>`, zodat de koppeling werkt.

### Beschrijvingen en foutmeldingen

Koppel hulptekst aan het veld met `aria-describedby`, zodat een screenreader die na het label voorleest:

```html
<tilburg-form-label for="pwd">Wachtwoord</tilburg-form-label>
<tilburg-textbox id="pwd" ariaDescribedBy="pwd-help" [control]="pwdCtrl"></tilburg-textbox>
<tilburg-form-field-description id="pwd-help">Minimaal 12 tekens.</tilburg-form-field-description>
```

Met `invalid` krijgt de beschrijving `role="alert"`, zodat een foutmelding die verschijnt ook wordt voorgelezen.

### Groepen: fieldset en legend

Zet een `<legend>` als eerste kind van een fieldset. Kan dat niet zichtbaar, geef de fieldset dan een `aria-label`.

```html
<tilburg-fieldset>
  <legend>Hoe wil je bericht ontvangen?</legend>
  <!-- radio's of checkboxes -->
</tilburg-fieldset>
```

### Knoppen en links zonder zichtbare tekst

Geef een knop met alleen een icoon een toegankelijke naam: `ariaLabel` in Angular, `aria-label` in React en Web
Components. De Button valt terug op `title` als je geen label geeft.

```html
<tilburg-button ariaLabel="Venster sluiten">×</tilburg-button>
```

### Koppen

Kies het kopniveau op basis van de plek in de pagina, niet op basis van de grootte. Alert en Accordion hebben een
`headingLevel`-input: pas die aan zodat er geen niveaus worden overgeslagen.

### Tabellen

Geef een tabel een bijschrift (`caption`) en zet `scope="col"` of `scope="row"` op kopcellen.

```html
<tilburg-table caption="Openingstijden">
  <tr tilburg-table-row>
    <th tilburg-table-header-cell scope="col">Dag</th>
    <th tilburg-table-header-cell scope="col">Tijden</th>
  </tr>
</tilburg-table>
```

### Modal

De titel van de modal is ook zijn toegankelijke naam, dus maak die beschrijvend ("Aanvraag bevestigen", niet
"Let op"). Sluit de modal altijd via het close-event (`closed` / `onClose` / `tilburgClose`), dan blijft je eigen
open-state gelijk, ook als de gebruiker op Escape drukt of naast de modal klikt.

### HTML Content

HTML Content zet opmaak voor tekst uit een CMS. Als je een HTML-string doorgeeft, wordt die opgeschoond: in Angular via
de `html`-input (Angular's DomSanitizer), in Web Components via het `html`-attribuut (een allowlist). Scripts en
event-handlers verdwijnen. In React en plain HTML geef je de inhoud zelf als kinderen mee; zorg daar zelf dat die
veilig is. Zet `lang` als de tekst in een andere taal is dan de pagina.

### Decoratieve scheidingslijnen

Zet `decorative` op een separator die alleen voor de opmaak is, dan slaan screenreaders hem over.

## Formulieren

- **Angular** — de formuliercomponenten werken met reactive forms via `[control]`. Zie _API-conventies (Angular)_ hieronder
  (alleen in de Angular-Storybook).
- **React** — gecontroleerde componenten: `value` + `onChange`, zoals native inputs.
- **Web Components** — de echte `<input>` staat in de light DOM, dus hij doet gewoon mee in een `<form>`. Luister naar de
  native `input`- en `change`-events.

## Eén laag per pagina

Gebruik op één pagina óf de Angular-componenten (`<tilburg-…>`) óf de Web Components (`<tilburg-wbc-…>`). Ze hebben
bewust een ander prefix zodat ze niet botsen, maar samen gebruikt laad je alle CSS dubbel.

## Bekende gaten

- `.utrecht-article` heeft geen maximale regelbreedte: het token `--utrecht-article-max-inline-size` bestaat nog niet.
  Geef zelf een `max-inline-size` op.
- `.utrecht-page-content` heeft geen padding en maximale breedte: de `--utrecht-page-*`-tokens ontbreken. Page Header en
  Page Footer begrenzen hun inhoud wel (1150px).

Zie _Implementatiestatus_ voor welke component in welke laag bestaat.
