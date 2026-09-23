<!-- @license CC0-1.0 -->

## Angular

Voor Angular-projecten — `<tilburg-alert>`, `<tilburg-textbox>`, `<tilburg-modal>`, etc. De Angular-laag rendert de
gedeelde HTML/CSS in `<tilburg-…>`-componenten en een paar attribuut-directives (bv. tabellen). Gebouwd met en getest op
Angular 20.

### Installatie (Angular)

```bash
npm install @gemeente-tilburg/components-angular \
            @gemeente-tilburg/design-tokens \
            @utrecht/component-library-angular@1.1.0 \
            @utrecht/design-tokens@1.0.0 \
            @utrecht/component-library-css
```

`@utrecht/component-library-angular` en `@utrecht/design-tokens` zijn peer-dependencies: installeer precies deze
versies.

### Setup (Angular)

De componenten zitten in één NgModule (er zijn geen standalone exports). Importeer die in je root- of feature-module, of
in de `imports` van een standalone component:

```ts
import { NgModule } from "@angular/core";
import { TilburgComponentsModule } from "@gemeente-tilburg/components-angular";

@NgModule({
  imports: [TilburgComponentsModule],
})
export class AppModule {}
```

Laad de tokens en de Utrecht-basis globaal, via de `styles`-array in `angular.json` of bovenin `styles.scss`:

```scss
@import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
@import "@utrecht/component-library-css/dist/index.css";
```

De CSS per component zit al in de Angular-componenten zelf; aparte imports per component zijn niet nodig. Zet
`tilburg-theme` en `utrecht-document` op `<body>` in `index.html`, of wrap je app in `<tilburg-document>` binnen een
element met `class="tilburg-theme"`.

### Gebruik (Angular)

```html
<tilburg-alert variant="info" title="Informatie" [closable]="true" (closed)="dismiss()">
  De openingstijden zijn gewijzigd.
</tilburg-alert>

<tilburg-form-field [invalid]="emailCtrl.invalid && emailCtrl.touched">
  <tilburg-form-label for="email">E-mailadres</tilburg-form-label>
  <tilburg-textbox id="email" type="email" [control]="emailCtrl" placeholder="naam@voorbeeld.nl" />
  <tilburg-validation-message *ngIf="emailCtrl.invalid && emailCtrl.touched" type="error">
    Vul een geldig e-mailadres in.
  </tilburg-validation-message>
</tilburg-form-field>
```

De inputs en outputs per component staan op de pagina's onder `Tilburg Angular/…` in de Angular-Storybook.
