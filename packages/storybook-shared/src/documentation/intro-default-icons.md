<!-- @license CC0-1.0 -->

## Standaard-iconen

Componenten met iconen (Alert, Validation Message, Accordion-section, Progress Bar) renderen een passende standaard-glyph zodra je de juiste `variant`/`type` meegeeft — je hoeft zelf geen SVG-markup te leveren. Overschrijven kan in elke laag:

- **HTML/CSS** — vul `.utrecht-alert__icon` (of `.tilburg-validation-message__icon`) met je eigen `<svg>`; de standaard-glyph komt uit CSS en verdwijnt zodra het element niet meer leeg is.
- **React** — geef de `icon` (of `closeIcon` / `backIcon` / `iconCollapsed` / `iconExpanded`) prop een eigen ReactNode.
- **Angular** — project een element met `slot="icon"` (of `slot="close-icon"` / `slot="back-icon"` / `slot="icon-collapsed"` / `slot="icon-expanded"`) in het component.
- **Web Components** — geef een element de slot-naam mee, net als in Angular: `slot="icon"`, `slot="close-icon"`, `slot="back-icon"`, `slot="icon-collapsed"` of `slot="icon-expanded"`.
