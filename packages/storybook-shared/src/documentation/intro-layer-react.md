<!-- @license CC0-1.0 -->

## React

Voor React-projecten — `<Alert>`, `<Textbox>`, `<Modal>`, etc. De React-laag rendert dezelfde DOM als de
HTML/CSS-laag. React 18 is vereist.

### Installatie (React)

```bash
npm install @gemeente-tilburg/components-react \
            @gemeente-tilburg/design-tokens \
            @utrecht/component-library-css
```

> `@gemeente-tilburg/components-react` staat nog niet op npm; het komt bij de eerste release. Tot dan gebruik je een
> tarball uit deze repository (`pnpm run pack:local`, zie _Lokaal gebruiken in een andere repository_ in
> `CONTRIBUTING.md`).

### Setup (React)

Importeer drie stylesheets één keer, bv. in `main.tsx`. **De component-CSS laadt niet vanzelf**: die staat in een apart
bestand, `dist/style.css`.

```tsx
import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
import "@utrecht/component-library-css/dist/index.css";
import "@gemeente-tilburg/components-react/dist/style.css";
```

Zet daarna `tilburg-theme` en `utrecht-document` op een wrapper (zie de basis hierboven).

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

De props per component staan op de pagina's onder `Tilburg React/…`.
