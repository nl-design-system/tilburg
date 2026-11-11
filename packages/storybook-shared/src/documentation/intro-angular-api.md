<!-- @license CC0-1.0 -->

## API-conventies (Angular)

### Custom-element selectoren

De meeste componenten gebruik je als element (`<tilburg-alert>`, `<tilburg-textbox>`, …). De inputs en outputs staan per
component op de pagina's onder `Tilburg Angular/…`.

### Directives (attribuut-selectoren)

Twee componenten zet je als attribuut op een bestaand HTML-element, zodat de native `<a>` en de tabelstructuur blijven
bestaan:

| Selector                                         | Toepassen op         |
| ------------------------------------------------ | -------------------- |
| `[tilburg-button-link]`                          | `<a>`                |
| `[tilburg-table-caption]`                        | `<caption>`          |
| `[tilburg-table-header]`, `[tilburg-table-body]` | `<thead>`, `<tbody>` |
| `[tilburg-table-footer]`                         | `<tfoot>`            |
| `[tilburg-table-row]`                            | `<tr>`               |
| `[tilburg-table-header-cell]`                    | `<th>`               |
| `[tilburg-table-cell]`                           | `<td>`               |

```html
<a [tilburg-button-link]="'primary-action-button'" routerLink="/aanvragen"> Aanvragen </a>
```

De tabel zelf is wel een element: `<tilburg-table>`, met de directives op de rijen en cellen erin.

### Reactive forms

`<tilburg-textbox>`, `<tilburg-textarea>`, `<tilburg-password-input>`, `<tilburg-select>`, `<tilburg-combobox>`,
`<tilburg-checkbox>` en `<tilburg-radio-button>` accepteren een `FormControl` via `[control]`. De componenten
implementeren geen `ControlValueAccessor`, dus `formControlName` en `[(ngModel)]` op het component werken niet. Zie de
stories voor concrete voorbeelden.

### Eén NgModule

Alle componenten zitten in `TilburgComponentsModule`; er zijn geen standalone exports. In een standalone component zet je
de module in `imports`.
