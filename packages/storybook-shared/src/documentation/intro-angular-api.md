<!-- @license CC0-1.0 -->

## API-conventies (Angular)

### Custom-element selectoren

De meeste componenten worden gebruikt als custom-elementen (`<tilburg-alert>`, `<tilburg-textbox>`, …). Deze hosts hebben `display: block` (of `inline-block` voor compacte controls als `<tilburg-button>`) zodat ze zich transparant gedragen in de pagina-layout.

### Directives (attribuut-selectoren)

Een handvol componenten worden als directive op een bestaand HTML-element toegepast:

| Selector                                                                 | Toepassen op                 |
| ------------------------------------------------------------------------ | ---------------------------- |
| `[tilburg-button-link]`                                                  | `<a>`                        |
| `[tilburg-table-body]`, `[tilburg-table-row]`, `[tilburg-table-cell]`, … | `<tbody>`, `<tr>`, `<td>`, … |

```html
<a [tilburg-button-link]="'primary-action-button'" routerLink="/aanvragen"> Aanvragen </a>
```

### Reactive forms

`<tilburg-textbox>`, `<tilburg-textarea>` en `<tilburg-radio-button>` accepteren een `[control]`-`FormControl` voor reactive-forms-binding. De componenten implementeren geen `ControlValueAccessor`, dus `formControlName` en `[(ngModel)]` op het component werken niet. Zie de stories voor concrete voorbeelden.
