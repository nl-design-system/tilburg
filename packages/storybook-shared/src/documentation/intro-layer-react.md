<!-- @license CC0-1.0 -->

## React

Voor React-projecten — `<Alert>`, `<Textbox>`, `<Modal>`, etc. De React-laag rendert dezelfde DOM als de
HTML/CSS-laag. React 18 of 19 is vereist.

### Installatie (React)

```bash
npm install ../tilburg/.tarballs/gemeente-tilburg-components-react-0.0.0.tgz \
            ../tilburg/.tarballs/gemeente-tilburg-design-tokens-0.0.1.tgz \
            @utrecht/component-library-css
```

> `@gemeente-tilburg/components-react` staat nog niet op npm; het komt bij de eerste release. Tot dan installeer je dit
> package en de tokens als tarball uit de repository: zie _Installeren vanuit een tarball_ op _Aan de slag_.

```bash
# na de eerste release:
npm install @gemeente-tilburg/components-react \
            @gemeente-tilburg/design-tokens \
            @utrecht/component-library-css
```

### Setup (React)

`@utrecht/component-library-react` is niet nodig: de React-componenten renderen zelf de DOM. De CSS-basis wel, die komt
uit `@utrecht/component-library-css` (zie _Aan de slag_ voor het waarom).

Importeer drie stylesheets één keer, bv. in `main.tsx`. **De component-CSS laadt niet vanzelf**: die staat in een apart
bestand, `dist/style.css`.

```tsx
import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
import "@utrecht/component-library-css/dist/index.css";
import "@gemeente-tilburg/components-react/dist/style.css";
```

Zet daarna `tilburg-theme` en `utrecht-document` op een wrapper (zie de basis op _Aan de slag_).

### Gebruik (React)

```tsx
import { Alert, Button } from "@gemeente-tilburg/components-react";

export function App() {
  return (
    <div className="tilburg-theme utrecht-document">
      <Alert variant="info" title="Informatie">
        De openingstijden zijn gewijzigd.
      </Alert>
      <Button appearance="primary-action-button">Aanvragen</Button>
    </div>
  );
}
```

De props per component staan op de pagina's onder `Tilburg React/…` in de React-Storybook. TypeScript-types zitten in
het package (`dist/index.d.ts`).
