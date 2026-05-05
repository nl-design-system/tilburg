# Contributing to the Angular component library

## npm package

The Angular packager builds a `package.json` file in the `dist/` directory. The Angular build process takes the responsibility to configure the exports in various properties (such as the `exports` and `typings` properties).

We haven't found a way to publish the package from `dist/` using our current setup, so as a workaround we have manually copied the export properties from `dist/package.json` to `package.json` and corrected the paths to point to the `dist/` directory.

When you upgrade Angular, you will need to manually ensure the configurations are still in sync.

We included a test script `test-export.mjs` to warn when the configurations are out of sync.

## Accessibility

Components in this library aim to be accessible by default, but some patterns require the consumer to wire pieces together correctly.

### Form labels

`tilburg-form-label[for]` must reference the `id` of its associated input. The library does not generate ids automatically.

```html
<tilburg-form-label for="email">Email</tilburg-form-label>
<tilburg-textbox id="email" [control]="emailControl"></tilburg-textbox>
```

### Linking descriptions and errors

`tilburg-form-field-description` exposes an `id` Input. Pair it with `ariaDescribedBy` on the input so screen readers announce the description after the label.

```html
<tilburg-form-label for="pwd">Password</tilburg-form-label>
<tilburg-textbox id="pwd" ariaDescribedBy="pwd-help" [control]="pwdControl"></tilburg-textbox>
<tilburg-form-field-description id="pwd-help">At least 12 characters.</tilburg-form-field-description>
```

When `invalid` is set on `tilburg-form-field-description`, it adds `role="alert"` so dynamic error messages are announced.

### Fieldsets

`tilburg-fieldset` projects a `<legend>` from `<ng-content>`. Place it as the first child:

```html
<tilburg-fieldset>
  <legend>Notification preferences</legend>
  <!-- radios / checkboxes -->
</tilburg-fieldset>
```

If you cannot use a visible legend, set `ariaLabel` or `ariaLabelledby` on the fieldset instead.

### Tables

Use `tilburg-table[caption]` for a programmatic caption, or project a `[tilburg-table-caption]` element. Header cells must declare `scope`:

```html
<tilburg-table caption="Office hours">
  <tr tilburg-table-row>
    <th tilburg-table-header-cell scope="col">Day</th>
    <th tilburg-table-header-cell scope="col">Hours</th>
  </tr>
</tilburg-table>
```

### Icon-only controls

For `tilburg-button`, `tilburg-link`, and `tilburg-badge-status` without visible text, set `ariaLabel`:

```html
<tilburg-button ariaLabel="Close dialog">×</tilburg-button>
```

### `tilburg-html-content`

This component does not sanitize its content; the consumer is responsible for ensuring projected HTML is safe and accessible. Use `[lang]` when content is in a different language than the surrounding page.

### Decorative separators

`tilburg-separator[decorative]` sets `aria-hidden="true"` for separators used purely for visual rhythm so they are not announced.
