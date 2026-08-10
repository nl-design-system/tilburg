<!-- @license CC0-1.0 -->

## Standaard-iconen

Componenten met iconen (Alert, Validation Message, Accordion-section, Progress Bar) renderen een passende standaard-glyph zodra je de juiste `variant`/`type` meegeeft — je hoeft zelf geen SVG-markup te leveren. Overschrijven kan in alle drie de lagen:

- **HTML/CSS** — vul `.utrecht-alert__icon` (of `.tilburg-validation-message__icon`) met je eigen `<svg>`; de CSS `::before` met de standaard-glyph wordt automatisch verborgen via `:has()`.
- **React** — geef de `icon` (of `closeIcon` / `backIcon` / `iconCollapsed` / `iconExpanded`) prop een eigen ReactNode.
- **Angular** — project een element met `slot="icon"` (of `slot="close-icon"` / `slot="back-icon"` / `slot="icon-collapsed"` / `slot="icon-expanded"`) in het component.
