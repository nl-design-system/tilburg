<!-- @license CC0-1.0 -->

## Angular

Voor Angular-projecten — `<tilburg-alert>`, `<tilburg-textbox>`, `<tilburg-modal>`, etc. De Angular-laag rendert de
gedeelde HTML/CSS in `<tilburg-…>`-componenten en een paar attribuut-directives (bv. tabellen). Werkt in Angular 20, 21
en 22: gebouwd met Angular 20 (de oudste ondersteunde versie), de Storybook draait op Angular 22.

### Installatie (Angular)

```bash
npm install ../tilburg/.tarballs/gemeente-tilburg-components-angular-0.0.0.tgz \
            ../tilburg/.tarballs/gemeente-tilburg-design-tokens-0.0.1.tgz \
            @utrecht/component-library-angular@1.1.0 \
            @utrecht/component-library-css
```

`@utrecht/component-library-angular` is een peer-dependency (`^1.1.0`). Begin met `1.1.0`: daarmee is het package
gebouwd en getest.

De versie doet ertoe omdat de module `UtrechtComponentsModule` importeert en de templates Utrecht-directives en
-elementen gebruiken (`utrecht-button`, `utrecht-link`, `utrecht-alert`, `utrecht-select`, `utrecht-listbox`,
`<utrecht-form-field>`, `<utrecht-page>`, de headings). Die kunnen per Utrecht-versie veranderen.

De CSS-basis komt uit `@utrecht/component-library-css`, zie _Aan de slag_.

> `@gemeente-tilburg/components-angular` staat nog niet op npm; het komt bij de eerste release. Tot dan installeer je dit
> package en de tokens als tarball uit de repository: zie _Installeren vanuit een tarball_ op _Aan de slag_.

```bash
# na de eerste release:
npm install @gemeente-tilburg/components-angular \
            @gemeente-tilburg/design-tokens \
            @utrecht/component-library-angular@1.1.0 \
            @utrecht/component-library-css
```

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

De inputs en outputs per component staan op de pagina's onder `Tilburg Angular/…` in de Angular-Storybook. Formulieren
(`[control]`) en de attribuut-directives staan in _API-conventies (Angular)_ op _Tips & valkuilen_ van die Storybook.
