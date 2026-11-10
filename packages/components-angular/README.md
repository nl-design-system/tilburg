<!-- @license CC0-1.0 -->

# @gemeente-tilburg/components-angular

Angular-componenten voor Gemeente Tilburg, gebaseerd op het NL Design System. Ze renderen dezelfde DOM en classes als de
HTML/CSS-referentie. Werkt in Angular 20, 21 en 22 (gebouwd met Angular 20, de oudste ondersteunde versie); de componenten zitten in één NgModule, `TilburgComponentsModule`.

```bash
npm install @gemeente-tilburg/components-angular @gemeente-tilburg/design-tokens \
            @utrecht/component-library-angular@1.1.0 @utrecht/component-library-css
```

```ts
import { TilburgComponentsModule } from "@gemeente-tilburg/components-angular";

@NgModule({ imports: [TilburgComponentsModule] })
export class AppModule {}
```

Laad `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css` en `@utrecht/component-library-css/dist/index.css` globaal,
en zet `class="tilburg-theme utrecht-document"` op `<body>`. De volledige setup staat in de Storybook onder
[Aan de slag](https://nl-design-system.github.io/tilburg/angular/?path=/docs/tilburg-aan-de-slag--docs); de inputs en outputs per component onder `Tilburg Angular/…`. Nog in ontwikkeling (0.x).

Het package staat nog niet op npm; het komt bij de eerste release. Tot dan installeer je het als tarball
(`pnpm run pack:local` in de repository, zie _Installeren vanuit een tarball_ op die pagina).

Bijdragen: zie [`CONTRIBUTING.md`](CONTRIBUTING.md).
