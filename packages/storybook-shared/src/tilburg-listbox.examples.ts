/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg standalone listbox. Imported by both the React storybook
   (`packages/storybook`) and the Angular storybook (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Flistbox';

const intro = `Always-visible list of options to pick one or more from, following the WAI-ARIA listbox pattern. The options look exactly like the ones in the Tilburg combobox popover (pink stripe on the active option, blue stripe and tint on the selected ones); the list itself gets the form-control border. Prefer a radio group or checkboxes for a handful of options, a select or combobox when space is tight: a listbox fits a medium-long list that should stay in view.

Keyboard: Tab moves focus to the list, Arrow Up/Down move the active option, Home/End jump to the first/last, Space or Enter selects (toggles when \`multiple\`). Focus stays on the list; \`aria-activedescendant\` points at the active option.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-form-label id="stadsdeel-label">Stadsdeel</tilburg-form-label>
<tilburg-listbox
  ariaLabelledBy="stadsdeel-label"
  [items]="stadsdelen"
  bindLabel="naam"
  bindValue="code"
  [control]="form.controls.stadsdeel"
  (valueChange)="onChange($event)"
></tilburg-listbox>
\`\`\`

Same data API as \`<tilburg-combobox>\`: \`items\` with \`bindLabel\` / \`bindValue\` (a key or a function; defaults \`'displayValue'\` / \`'value'\`), and the selection in a \`FormControl\` (one value, or an array when \`multiple\`). Without a \`control\`, set \`value\` and listen to \`(valueChange)\`. The control is marked touched on blur; an invalid touched control shows the invalid state.

Inputs: \`id\`, \`control\`, \`value\`, \`items\`, \`bindLabel\`, \`bindValue\`, \`multiple\`, \`disabled\`, \`invalid\`, \`required\`, \`ariaLabel\`, \`ariaLabelledBy\`, \`ariaDescribedBy\`. Output: \`(valueChange)\` with the new value.`;

const usageReact = `### React

\`\`\`tsx
import { FormLabel, Listbox } from '@gemeente-tilburg/components-react';
import { useState } from 'react';

const stadsdelen = [
  { value: 'centrum', label: 'Centrum' },
  { value: 'noord', label: 'Noord' },
  { value: 'reeshof', label: 'Reeshof' },
];

export function Stadsdeel() {
  const [stadsdeel, setStadsdeel] = useState<string | null>(null);
  return (
    <>
      <FormLabel id="stadsdeel-label">Stadsdeel</FormLabel>
      <Listbox aria-labelledby="stadsdeel-label" items={stadsdelen} value={stadsdeel} onChange={setStadsdeel} />
    </>
  );
}
\`\`\`

Controlled with \`value\` + \`onChange\` (\`onChange\` gets the new value, an array when \`multiple\`), or uncontrolled with \`defaultValue\`.

Props: \`items\` (\`{ value, label }[]\`), \`value\` / \`defaultValue\`, \`onChange\`, \`multiple\`, \`disabled\`, \`invalid\`, \`required\`, \`id\` (generated when left out; the option ids derive from it), plus the other \`<div>\` attributes (\`aria-label\`, \`aria-labelledby\`, \`aria-describedby\`, \`className\`, …). The \`ref\` goes to the \`role="listbox"\` element. \`ListboxProps\` and \`ListboxItem\` are exported as types.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<span class="utrecht-form-label" id="stadsdeel-label">Stadsdeel</span>
<tilburg-wbc-listbox aria-labelledby="stadsdeel-label" name="stadsdeel"></tilburg-wbc-listbox>

<script type="module">
  const listbox = document.querySelector('tilburg-wbc-listbox');
  listbox.items = [
    { value: 'centrum', label: 'Centrum' },
    { value: 'noord', label: 'Noord' },
  ];
  listbox.addEventListener('tilburgChange', (event) => console.log(event.detail));
</script>
\`\`\`

\`items\` is set as a JS property. The component keeps \`value\` in sync (one value, or an array with \`multiple\`) and fires \`tilburgChange\` with the new value, like \`<tilburg-wbc-combobox>\`. With \`name\`, one hidden \`<input name>\` per selected value is rendered so the selection submits with the surrounding \`<form>\`.

Attributes: \`multiple\`, \`disabled\`, \`invalid\`, \`required\`, \`name\`. \`id\`, \`aria-label\`, \`aria-labelledby\` and \`aria-describedby\` are moved from the host onto the \`role="listbox"\` element.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<span class="utrecht-form-label" id="stadsdeel-label">Stadsdeel</span>
<div class="utrecht-listbox utrecht-listbox--html-div" role="listbox" tabindex="0" aria-labelledby="stadsdeel-label"
     data-tilburg-listbox-enhance>
  <ul class="utrecht-listbox__list" role="presentation">
    <li class="utrecht-listbox__option utrecht-listbox__option--html-li" role="option" id="stadsdeel-opt-0" aria-selected="false">Centrum</li>
    <li class="utrecht-listbox__option utrecht-listbox__option--html-li utrecht-listbox__option--selected" role="option" id="stadsdeel-opt-1" aria-selected="true" data-active="true">Noord</li>
  </ul>
</div>
\`\`\`

Load \`components-css/combobox\` next to \`components-css/listbox\`: the option look lives there. The keyboard and click behaviour needs script: load \`components-css/listbox/index.js\` (\`<script type="module">\`, or import \`enhanceListbox\`) and put \`data-tilburg-listbox-enhance\` on the listbox. It keeps \`aria-activedescendant\`, \`data-active\` and \`aria-selected\` (plus \`utrecht-listbox__option--selected\`) up to date and fires a bubbling \`change\` event; read the selection from the \`[aria-selected="true"]\` options. Without the script the list only shows its state. Put \`aria-multiselectable="true"\` on it for multiple select. \`role="presentation"\` on the \`<ul>\` keeps the options owned by the listbox (utrecht leaves the list role in between).`;

export const description = `${intro}

## Usage

${usageAngular}

${usagePlainHtml}
`;

export const descriptionReact = `${intro}

## Usage

${usageReact}

${usagePlainHtml}
`;

export const descriptionWebComponents = `${intro}

## Usage

${usageWebComponents}

${usagePlainHtml}
`;

export const descriptionHtml = `${intro}

## Usage

${usagePlainHtml}
`;

export interface Example {
  name: string;
  html: string;
}

const stadsdelen = ['Centrum', 'Noord', 'Oud-Zuid', 'Reeshof', 'West', 'Berkel-Enschot', 'Udenhout'];

const listbox = (
  id: string,
  label: string,
  { selected = [] as number[], active = -1, attrs = '', modifiers = '' } = {},
) => `<div style="max-inline-size:24rem">
  <span class="utrecht-form-label" id="${id}-label">${label}</span>
  <div id="${id}" class="utrecht-listbox utrecht-listbox--html-div${modifiers}" role="listbox" tabindex="0" aria-labelledby="${id}-label" data-tilburg-listbox-enhance${
    active >= 0 ? ` aria-activedescendant="${id}-opt-${active}"` : ''
  }${attrs}>
    <ul class="utrecht-listbox__list" role="presentation">
${stadsdelen
  .map((naam, index) => {
    const isSelected = selected.includes(index);
    return `      <li class="utrecht-listbox__option utrecht-listbox__option--html-li${
      isSelected ? ' utrecht-listbox__option--selected' : ''
    }" role="option" id="${id}-opt-${index}" aria-selected="${isSelected}"${
      index === active ? ' data-active="true"' : ''
    }>${naam}</li>`;
  })
  .join('\n')}
    </ul>
  </div>
</div>`;

export const examples = {
  default: {
    name: 'Single select',
    html: listbox('listbox-single', 'Stadsdeel', { selected: [1] }),
  },
  active: {
    name: 'Active option (keyboard)',
    html: listbox('listbox-active', 'Stadsdeel', { selected: [1], active: 3 }),
  },
  multiple: {
    name: 'Multiple select',
    html: listbox('listbox-multiple', 'Stadsdelen waarover je nieuws wilt ontvangen', {
      selected: [0, 3, 4],
      attrs: ' aria-multiselectable="true"',
    }),
  },
  invalid: {
    name: 'Invalid',
    html: listbox('listbox-invalid', 'Stadsdeel', {
      attrs: ' aria-required="true" aria-invalid="true"',
      modifiers: ' utrecht-listbox--invalid',
    }),
  },
  disabled: {
    name: 'Disabled',
    html: listbox('listbox-disabled', 'Stadsdeel', {
      selected: [2],
      attrs: ' aria-disabled="true"',
      modifiers: ' utrecht-listbox--disabled',
    }),
  },
} satisfies Record<string, Example>;
