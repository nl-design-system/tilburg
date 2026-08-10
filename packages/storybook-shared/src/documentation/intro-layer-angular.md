<!-- @license CC0-1.0 -->

## Angular

Voor Angular-projecten — `<tilburg-alert>`, `<tilburg-textbox>`, etc. De Angular-laag wrapt de gedeelde HTML/CSS in `<tilburg-…>` custom-elementen + attribuut-directives.

### Installatie (Angular)

```bash
npm install @gemeente-tilburg/components-angular \
            @gemeente-tilburg/design-tokens \
            @utrecht/component-library-angular
```

Peer-dependencies: `@angular/core`, `@angular/common`, `@angular/forms` ≥ 20.

### Setup (Angular)

Registreer de module één keer in je root- of feature-module:

```ts
import { NgModule } from "@angular/core";
import { TilburgComponentsModule } from "@gemeente-tilburg/components-angular";

@NgModule({
  imports: [TilburgComponentsModule],
})
export class AppModule {}
```

Laad de design tokens en utrecht-basis-CSS globaal — bv. via `angular.json`'s `styles`-array of bovenin je `styles.scss`:

```scss
@import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
@import "@utrecht/component-library-css/dist/index.css";
```

De Angular-laag bundelt zijn eigen Tilburg-component-CSS automatisch mee, dus aparte `@import`s per component zijn niet nodig.

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
