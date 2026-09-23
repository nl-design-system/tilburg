<!-- @license CC0-1.0 -->

# @gemeente-tilburg/components-angular

Angular-componenten voor Gemeente Tilburg, gebaseerd op het NL Design System. Ze renderen dezelfde DOM en classes als de
HTML/CSS-referentie. Gebouwd met Angular 20; de componenten zitten in één NgModule, `TilburgComponentsModule`.

```bash
npm install @gemeente-tilburg/components-angular @gemeente-tilburg/design-tokens \
            @utrecht/component-library-angular@1.1.0 @utrecht/design-tokens@1.0.0 \
            @utrecht/component-library-css
```

```ts
import { TilburgComponentsModule } from "@gemeente-tilburg/components-angular";

@NgModule({ imports: [TilburgComponentsModule] })
export class AppModule {}
```

Laad `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css` en `@utrecht/component-library-css/dist/index.css` globaal,
en zet `class="tilburg-theme utrecht-document"` op `<body>`. De volledige setup staat in de Storybook onder
**Aan de slag**; de inputs en outputs per component onder `Tilburg Angular/…`. Nog in ontwikkeling (0.x).

Bijdragen: zie [`CONTRIBUTING.md`](CONTRIBUTING.md).
