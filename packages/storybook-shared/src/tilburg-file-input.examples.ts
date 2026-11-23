/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg file-input. Imported by both Storybooks, so the HTML lives in one
   place; the usage sections below feed the docs pages and the "Gebruik" dialog. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ffile-input';

const intro = `**Tilburg component**: not based on an Utrecht component; its markup and CSS use the \`tilburg-*\` class set.

A drop zone to add files to a form: drag files onto it, or click it (or press Enter or Space on it) for the file dialog. The native \`<input type="file">\` lies invisibly over the whole drop zone, so the click, the drop, the keyboard and the screen reader all get the real control and the HTML layer needs no script. The button is a picture of one.

Give it a name: a \`<label for>\` with the \`id\` of the input, or an \`aria-label\`. Without either, the React, Angular and Web Component versions use the text of the button. Put what may be uploaded (file types, the largest size) inside the drop zone or in a form field description that \`aria-describedby\` points to. \`accept\` only filters the file dialog: a browser lets any file be dropped, so check the files yourself.

The wrappers list the names of the chosen files under the drop zone, in a status region that screen readers announce. Do you upload a file right away and show it somewhere else? Turn the list off (\`showFiles\`); the input is then emptied after each choice, so the same file can be chosen again.

While the upload runs, set \`busy\`: a spinner with a line of text (\`busyLabel\`, "Bezig met uploaden…") covers the drop zone, screen readers hear that text, and no file can be added until it is done.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-form-label for="bijlage">Foto van de situatie</tilburg-form-label>
<tilburg-file-input id="bijlage" [multiple]="true" accept="image/*" (filesChange)="fotos = $event">
  JPG of PNG, maximaal 10 MB per bestand
</tilburg-file-input>
\`\`\`

Inputs: \`id\`, \`name\`, \`multiple\`, \`accept\`, \`disabled\`, \`invalid\`, \`required\`, \`showFiles\` (default \`true\`), \`busy\`, \`ariaLabel\`, \`ariaLabelledBy\`, \`ariaDescribedBy\`, and the texts \`dropLabel\` ("Sleep uw bestand hierheen of") and \`buttonLabel\` ("Bestand kiezen"; both in the plural with \`multiple\`) and \`busyLabel\`. Output: \`filesChange\` with the chosen \`File[]\`. Projected content is shown in the drop zone.`;

const usageReact = `### React

\`\`\`tsx
import { FileInput, FormLabel } from '@gemeente-tilburg/components-react';
import { useState } from 'react';

export function Voorbeeld() {
  const [fotos, setFotos] = useState<File[]>([]);
  return (
    <>
      <FormLabel htmlFor="bijlage">Foto van de situatie ({fotos.length})</FormLabel>
      <FileInput id="bijlage" multiple accept="image/*" onFilesChange={setFotos}>
        JPG of PNG, maximaal 10 MB per bestand
      </FileInput>
    </>
  );
}
\`\`\`

Props: \`invalid\`, \`showFiles\` (default \`true\`), \`busy\`, \`onFilesChange\` (the chosen \`File[]\`), the texts \`dropLabel\`, \`buttonLabel\` and \`busyLabel\`, plus any standard \`<input>\` attribute (\`id\`, \`name\`, \`multiple\`, \`accept\`, \`disabled\`, \`required\`, \`aria-*\`). \`className\` goes to the wrapper; the \`ref\` is forwarded to the \`<input>\`. The children are shown in the drop zone.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="tilburg-file-input-example">Foto van de situatie</label>
<div class="tilburg-file-input">
  <div class="tilburg-file-input__dropzone">
    <span class="tilburg-file-input__text">Sleep uw bestanden hierheen of</span>
    <span class="tilburg-file-input__button utrecht-button utrecht-button--secondary-action" aria-hidden="true">Bestanden kiezen</span>
    JPG of PNG, maximaal 10 MB per bestand
    <input class="tilburg-file-input__input" type="file" id="tilburg-file-input-example" multiple accept="image/*" />
    <div class="tilburg-file-input__busy" role="status"></div>
  </div>
  <div class="tilburg-file-input__files" role="status"></div>
</div>
\`\`\`

The wrappers add \`tilburg-file-input--drag-over\` on the root while a file is dragged over the drop zone, \`tilburg-file-input--busy\` (with a spinner and text in \`tilburg-file-input__busy\`) while uploading, and fill \`tilburg-file-input__files\` with \`<ul><li class="tilburg-file-input__file">…</li></ul>\`. In plain HTML that is yours to do, on the \`change\` event of the input.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<label class="utrecht-form-label" for="bijlage">Foto van de situatie</label>
<tilburg-wbc-file-input id="bijlage" multiple accept="image/*">
  JPG of PNG, maximaal 10 MB per bestand
</tilburg-wbc-file-input>
\`\`\`

Attributes: \`id\`, \`name\`, \`multiple\`, \`accept\`, \`disabled\`, \`invalid\`, \`required\`, \`show-files\` (default \`true\`), \`busy\`, \`aria-label\`, \`aria-labelledby\`, \`aria-describedby\`, and the texts \`drop-label\`, \`button-label\` and \`busy-label\`. Event: \`tilburgFilesChange\`, with the chosen \`File[]\` in \`event.detail\`. Slotted content is shown in the drop zone.`;

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

export const examples = {
  default: {
    name: 'Default',
    html: `<label class="utrecht-form-label" for="tilburg-file-input-example">Foto van de situatie</label>
<div class="tilburg-file-input">
  <div class="tilburg-file-input__dropzone">
    <span class="tilburg-file-input__text">Sleep uw bestanden hierheen of</span>
    <span class="tilburg-file-input__button utrecht-button utrecht-button--secondary-action" aria-hidden="true">Bestanden kiezen</span>
    JPG of PNG, maximaal 10 MB per bestand
    <input class="tilburg-file-input__input" type="file" id="tilburg-file-input-example" multiple accept="image/*" />
    <div class="tilburg-file-input__busy" role="status"></div>
  </div>
  <div class="tilburg-file-input__files" role="status"></div>
</div>`,
  },
  withFiles: {
    name: 'With chosen files',
    html: `<div class="tilburg-file-input">
  <div class="tilburg-file-input__dropzone">
    <span class="tilburg-file-input__text">Sleep uw bestand hierheen of</span>
    <span class="tilburg-file-input__button utrecht-button utrecht-button--secondary-action" aria-hidden="true">Bestand kiezen</span>
    <input class="tilburg-file-input__input" type="file" aria-label="Bestand kiezen" />
    <div class="tilburg-file-input__busy" role="status"></div>
  </div>
  <div class="tilburg-file-input__files" role="status"><ul><li class="tilburg-file-input__file">lantaarnpaal.jpg</li><li class="tilburg-file-input__file">stoep.jpg</li></ul></div>
</div>`,
  },
  dragOver: {
    name: 'A file dragged over it',
    html: `<div class="tilburg-file-input tilburg-file-input--drag-over">
  <div class="tilburg-file-input__dropzone">
    <span class="tilburg-file-input__text">Sleep uw bestand hierheen of</span>
    <span class="tilburg-file-input__button utrecht-button utrecht-button--secondary-action" aria-hidden="true">Bestand kiezen</span>
    <input class="tilburg-file-input__input" type="file" aria-label="Bestand kiezen" />
    <div class="tilburg-file-input__busy" role="status"></div>
  </div>
  <div class="tilburg-file-input__files" role="status"></div>
</div>`,
  },
  invalid: {
    name: 'Invalid',
    html: `<div class="tilburg-file-input">
  <div class="tilburg-file-input__dropzone">
    <span class="tilburg-file-input__text">Sleep uw bestand hierheen of</span>
    <span class="tilburg-file-input__button utrecht-button utrecht-button--secondary-action" aria-hidden="true">Bestand kiezen</span>
    <input class="tilburg-file-input__input" type="file" aria-label="Bestand kiezen" aria-invalid="true" />
    <div class="tilburg-file-input__busy" role="status"></div>
  </div>
  <div class="tilburg-file-input__files" role="status"></div>
</div>`,
  },
  busy: {
    name: 'Busy (uploading)',
    html: `<div class="tilburg-file-input tilburg-file-input--busy">
  <div class="tilburg-file-input__dropzone" aria-busy="true">
    <span class="tilburg-file-input__text">Sleep uw bestand hierheen of</span>
    <span class="tilburg-file-input__button utrecht-button utrecht-button--secondary-action" aria-hidden="true">Bestand kiezen</span>
    <input class="tilburg-file-input__input" type="file" aria-label="Bestand kiezen" disabled />
    <div class="tilburg-file-input__busy" role="status">
      <span class="tilburg-file-input__spinner" aria-hidden="true"></span>
      <span>Bezig met uploaden…</span>
    </div>
  </div>
  <div class="tilburg-file-input__files" role="status"></div>
</div>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<div class="tilburg-file-input">
  <div class="tilburg-file-input__dropzone">
    <span class="tilburg-file-input__text">Sleep uw bestand hierheen of</span>
    <span class="tilburg-file-input__button utrecht-button utrecht-button--secondary-action" aria-hidden="true">Bestand kiezen</span>
    <input class="tilburg-file-input__input" type="file" aria-label="Bestand kiezen" disabled />
    <div class="tilburg-file-input__busy" role="status"></div>
  </div>
  <div class="tilburg-file-input__files" role="status"></div>
</div>`,
  },
} satisfies Record<string, Example>;

/** The text under each story on the docs pages, shared by the HTML, React, Angular and Web Components stories. */
export const storyDescriptions = {
  default:
    'With a label and, inside the drop zone, what may be uploaded. Click anywhere in the drop zone or drag files onto it.',
  withFiles: 'After choosing: the names of the files under the drop zone. Choosing again replaces them.',
  dragOver: 'While a file is dragged over the drop zone: a solid border and a light background show where to let go.',
  invalid:
    'The error state (`aria-invalid="true"`): show the error text next to it and link it with `aria-describedby`.',
  busy: 'While the upload runs: the spinner and its text cover the drop zone and no file can be added.',
  disabled: 'No file can be chosen or dropped.',
  upload:
    'Uploading right away, as an app with its own file list does: `showFiles` is off, the chosen files go to the app, `busy` is on while the (here: pretend) upload runs, and the app shows the result itself.',
};

/** Control descriptions, shared by the React, Web Components and Angular stories so the props tables agree. */
export const argDescriptions = {
  name: 'Name of the field in the submitted form data.',
  multiple: 'More than one file may be chosen or dropped. Also puts the default texts in the plural.',
  accept:
    'File types the file dialog offers, as in `<input accept>` (`image/*`, `.pdf`). A browser does not hold a dropped file to it: check the files yourself.',
  disabled: 'No file can be chosen or dropped.',
  invalid:
    'Shows the error state and sets `aria-invalid="true"`. Show the error text next to it and link it with `aria-describedby`.',
  required: 'A file is required.',
  showFiles:
    'Lists the names of the chosen files under the drop zone. Turn it off when you upload right away and show the files elsewhere; the input is then emptied after each choice, so the same file can be chosen again.',
  busy: 'Uploading: a spinner with the busy text covers the drop zone and no file can be added.',
  ariaLabel:
    'Accessible name of the input. Not needed with an `id` that a `<label for>` points to. Without either, the text of the button is used.',
  dropLabel: 'The text in the drop zone, above the button. Default: "Sleep uw bestand hierheen of".',
  buttonLabel: 'The text on the button. Default: "Bestand kiezen".',
  busyLabel: 'The text under the spinner, also read out by screen readers.',
  filesChange: 'The chosen or dropped files, as a `File[]`.',
};
