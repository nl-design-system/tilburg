<!-- @license CC0-1.0 -->

# @gemeente-tilburg/components-react

React-componenten voor Gemeente Tilburg, gebaseerd op het NL Design System. Ze renderen dezelfde DOM en classes als de
HTML/CSS-referentie. Vereist React 18.

```bash
npm install @gemeente-tilburg/components-react @gemeente-tilburg/design-tokens @utrecht/component-library-css
```

```tsx
import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
import "@utrecht/component-library-css/dist/index.css";
import "@gemeente-tilburg/components-react/dist/style.css"; // de component-CSS laadt niet vanzelf

import { Alert } from "@gemeente-tilburg/components-react";

export const App = () => (
  <div className="tilburg-theme utrecht-document">
    <Alert variant="info" title="Informatie">
      De openingstijden zijn gewijzigd.
    </Alert>
  </div>
);
```

Lees in de Storybook **Tilburg → Aan de slag** voor de volledige setup (fonts, varianten van de tokens) en de pagina's
onder `Tilburg React/…` voor de props per component. Nog in ontwikkeling (0.x).
