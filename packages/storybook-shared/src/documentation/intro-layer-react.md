<!-- @license CC0-1.0 -->

## React

Voor React-projecten — `<Alert>`, `<Textbox>`, etc. Onder de motorkap rendert de React-laag dezelfde DOM als de HTML/CSS-laag.

### Installatie (React)

```bash
npm install @gemeente-tilburg/components-react \
            @gemeente-tilburg/design-tokens
```

### Gebruik (React)

`@gemeente-tilburg/components-react` importeert zijn eigen SCSS automatisch — je hoeft alleen de tokens en utrecht-basis globaal te laden.

```scss
/* in je entry stylesheet, bv. src/index.scss */
@import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
@import "@utrecht/component-library-css/dist/index.css";
```

```tsx
import { Alert, Textbox } from "@gemeente-tilburg/components-react";

export function ContactForm() {
  return (
    <>
      <Alert variant="info" title="Informatie">
        De openingstijden zijn gewijzigd.
      </Alert>
      <Textbox id="email" type="email" placeholder="naam@voorbeeld.nl" />
    </>
  );
}
```
