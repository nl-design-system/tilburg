/* @license CC0-1.0 */

/**
 * Tilburg combobox enhancement — opt-in JS that wires up open/close, keyboard
 * navigation, and chip add/remove on plain HTML/CSS combobox markup. Mirrors
 * the keyboard + click behavior already implemented in
 * `packages/components-angular/src/combobox/component.ts` and
 * `packages/components-react/src/Combobox.tsx` so consumers using the raw
 * BEM markup get the same UX without writing their own JS.
 *
 * Opt-in via the `data-tilburg-combobox-enhance` attribute on the
 * `.utrecht-combobox` root. The Angular and React wrappers never emit that
 * attribute, so they're untouched.
 *
 * State lives entirely in the DOM — read on demand from:
 *   - the input's `aria-expanded` (open/closed)
 *   - the input's `aria-activedescendant` (active option id)
 *   - each option's `aria-selected` (selected values)
 *
 * Usage:
 *   <script type="module" src="…/combobox/index.js"></script>   <!-- auto-init -->
 * or:
 *   import { enhanceCombobox } from '@gemeente-tilburg/components-css/combobox';
 *   enhanceCombobox();
 */

const ENHANCED_FLAG = 'data-tilburg-combobox-enhanced';
const OPT_IN_FLAG = 'data-tilburg-combobox-enhance';
const NAV_KEYS = new Set(['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', 'Escape', 'Backspace']);

/** Return the listbox `<ul>` for a given combobox host. */
function getListbox(host) {
  const input = host.querySelector('.tilburg-combobox__input');
  const id = input && input.getAttribute('aria-controls');
  return id ? host.ownerDocument.getElementById(id) : null;
}

function getOptions(listbox) {
  if (!listbox) return [];
  return Array.from(listbox.querySelectorAll('.utrecht-listbox__option')).filter(
    (opt) => opt.getAttribute('aria-disabled') !== 'true',
  );
}

function isMultiple(host) {
  return host.classList.contains('tilburg-combobox--multiple');
}

function setOpen(host, open) {
  const input = host.querySelector('.tilburg-combobox__input');
  const listbox = getListbox(host);
  if (!input || !listbox) return;
  input.setAttribute('aria-expanded', String(open));
  if (open) {
    listbox.classList.remove('utrecht-combobox__popover--hidden');
    listbox.classList.add('utrecht-combobox__popover--block-end');
  } else {
    listbox.classList.add('utrecht-combobox__popover--hidden');
    input.removeAttribute('aria-activedescendant');
    getOptions(listbox).forEach((opt) => opt.removeAttribute('data-active'));
  }
  /* The chevron's open-state rotation is handled in CSS via
     `:has(.tilburg-combobox__input[aria-expanded="true"]) .tilburg-combobox__chevron svg`
     so we no longer touch the chevron's content here. Earlier this assigned
     `chevron.textContent = '▴'/'▾'` which destroyed the inline SVG that
     `tilburg-combobox.examples.ts` renders inside the chevron button. */
}

function getActiveIndex(host) {
  const input = host.querySelector('.tilburg-combobox__input');
  const listbox = getListbox(host);
  if (!input || !listbox) return -1;
  const id = input.getAttribute('aria-activedescendant');
  if (!id) return -1;
  return getOptions(listbox).findIndex((opt) => opt.id === id);
}

function setActiveIndex(host, index) {
  const input = host.querySelector('.tilburg-combobox__input');
  const listbox = getListbox(host);
  if (!input || !listbox) return;
  const options = getOptions(listbox);
  options.forEach((opt) => opt.removeAttribute('data-active'));
  if (index >= 0 && index < options.length) {
    const opt = options[index];
    opt.setAttribute('data-active', 'true');
    input.setAttribute('aria-activedescendant', opt.id);
    // Keep the active option visible within the popover.
    opt.scrollIntoView({ block: 'nearest' });
  } else {
    input.removeAttribute('aria-activedescendant');
  }
}

function selectOption(host, optionEl) {
  const input = host.querySelector('.tilburg-combobox__input');
  if (!input || !optionEl) return;
  if (isMultiple(host)) {
    const wasSelected = optionEl.getAttribute('aria-selected') === 'true';
    optionEl.setAttribute('aria-selected', wasSelected ? 'false' : 'true');
    renderChips(host);
  } else {
    const listbox = getListbox(host);
    getOptions(listbox).forEach((opt) => opt.setAttribute('aria-selected', 'false'));
    optionEl.setAttribute('aria-selected', 'true');
    input.value = optionEl.textContent ? optionEl.textContent.trim() : '';
    setOpen(host, false);
    input.focus();
  }
}

const ORIGINAL_PLACEHOLDER_FLAG = 'data-tilburg-combobox-placeholder';

/** Build or rebuild the chip stack inside the value-container for multi-mode.
 *  Reads "selected values" from option `[aria-selected="true"]`. Also hides
 *  the input's placeholder while chips are present (mirroring the Angular /
 *  React wrappers, which only emit the placeholder when `selectedItems.length === 0`). */
function renderChips(host) {
  if (!isMultiple(host)) return;
  const container = host.querySelector('.tilburg-combobox__value-container');
  const listbox = getListbox(host);
  if (!container || !listbox) return;

  // Remove existing chips
  container.querySelectorAll('.tilburg-combobox__chip').forEach((chip) => chip.remove());

  const selected = Array.from(listbox.querySelectorAll('.utrecht-listbox__option[aria-selected="true"]'));
  // Insert chips before the input (or at the start of the container)
  const input = container.querySelector('.tilburg-combobox__input');
  selected.forEach((opt) => {
    const label = (opt.textContent || '').trim();
    const chip = host.ownerDocument.createElement('span');
    chip.className = 'tilburg-combobox__chip';
    chip.dataset.optionId = opt.id;
    chip.append(host.ownerDocument.createTextNode(label));

    const remove = host.ownerDocument.createElement('button');
    remove.type = 'button';
    remove.className = 'tilburg-combobox__chip-remove';
    remove.setAttribute('aria-label', `Verwijder ${label}`);
    remove.textContent = '×';
    chip.append(remove);

    if (input) container.insertBefore(chip, input);
    else container.appendChild(chip);
  });

  /* Suppress the placeholder once chips appear; restore it once they're all
     gone. The original placeholder is stashed on the input the first time we
     touch it so we can put it back later. */
  if (!input) return;
  if (!input.hasAttribute(ORIGINAL_PLACEHOLDER_FLAG)) {
    input.setAttribute(ORIGINAL_PLACEHOLDER_FLAG, input.getAttribute('placeholder') || '');
  }
  if (selected.length > 0) {
    input.removeAttribute('placeholder');
  } else {
    const original = input.getAttribute(ORIGINAL_PLACEHOLDER_FLAG);
    if (original) input.setAttribute('placeholder', original);
  }
}

function removeChip(host, chip) {
  if (!chip) return;
  const optionId = chip.dataset.optionId;
  if (optionId) {
    const opt = host.ownerDocument.getElementById(optionId);
    if (opt) opt.setAttribute('aria-selected', 'false');
  }
  chip.remove();
  /* Rerender so the placeholder restoration in `renderChips` runs once the
     last chip is gone. (We deselected the option above, so the rebuild from
     `[aria-selected="true"]` lands on the right set.) */
  renderChips(host);
}

function handleClick(event, host) {
  const target = event.target instanceof Element ? event.target : null;
  if (!target || !host.contains(target)) return;

  if (target.closest('.tilburg-combobox__chip-remove')) {
    event.stopPropagation();
    const chip = target.closest('.tilburg-combobox__chip');
    removeChip(host, chip);
    return;
  }

  const option = target.closest('.utrecht-listbox__option');
  if (option && option.getAttribute('aria-disabled') !== 'true') {
    selectOption(host, option);
    return;
  }

  /* Toggle on click anywhere inside the field — chip-remove and option clicks
     have already been handled and returned above. This mirrors ng-select's
     "click anywhere on the control opens it" behavior in bq-tlb-frontend, so
     the empty space between chips / next to the value also activates the
     popover. The listbox itself is excluded so clicking the scrollbar doesn't
     close + reopen. */
  if (target.closest('.utrecht-listbox')) return;
  const input = host.querySelector('.tilburg-combobox__input');
  const isOpen = !!input && input.getAttribute('aria-expanded') === 'true';
  setOpen(host, !isOpen);
  /* No auto-active on open: the freshly-opened popover shouldn't paint a
     blue-400 stripe on the currently-selected option — that "marked"
     indicator only appears once the user pointer-hovers or keyboard-
     navigates. Keyboard nav (ArrowDown / Up) still resolves to the first
     option via setActiveIndex's bounds. */
  if (!isOpen && input) input.focus();
}

function handleKeydown(event, host) {
  if (!NAV_KEYS.has(event.key)) return;
  const input = host.querySelector('.tilburg-combobox__input');
  if (!input || event.target !== input) return;
  const listbox = getListbox(host);
  const options = getOptions(listbox);
  const isOpen = input.getAttribute('aria-expanded') === 'true';
  const idx = getActiveIndex(host);

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (!isOpen) {
        setOpen(host, true);
        setActiveIndex(host, Math.max(idx, 0));
      } else {
        setActiveIndex(host, Math.min(idx + 1, options.length - 1));
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (!isOpen) {
        setOpen(host, true);
        setActiveIndex(host, Math.max(idx, 0));
      } else {
        setActiveIndex(host, Math.max(idx - 1, 0));
      }
      break;
    case 'Home':
      if (isOpen) {
        event.preventDefault();
        setActiveIndex(host, 0);
      }
      break;
    case 'End':
      if (isOpen) {
        event.preventDefault();
        setActiveIndex(host, options.length - 1);
      }
      break;
    case 'Enter':
      if (isOpen && idx >= 0) {
        event.preventDefault();
        selectOption(host, options[idx]);
      }
      break;
    case 'Escape':
      if (isOpen) {
        event.preventDefault();
        setOpen(host, false);
      }
      break;
    case 'Backspace':
      if (isMultiple(host) && (input.value || '') === '') {
        const chips = host.querySelectorAll('.tilburg-combobox__chip');
        if (chips.length > 0) removeChip(host, chips[chips.length - 1]);
      }
      break;
  }
}

function handleDocumentClick(event, host) {
  if (!host.contains(event.target instanceof Node ? event.target : null)) {
    const input = host.querySelector('.tilburg-combobox__input');
    if (input && input.getAttribute('aria-expanded') === 'true') setOpen(host, false);
  }
}

/**
 * Enhance every `.utrecht-combobox[data-tilburg-combobox-enhance]` within
 * `root`. Idempotent — already-enhanced comboboxes are skipped.
 *
 * @param {ParentNode} [root=document] Scope to search within.
 */
export function enhanceCombobox(root = typeof document !== 'undefined' ? document : null) {
  if (!root) return;
  const hosts = root.querySelectorAll(`.utrecht-combobox[${OPT_IN_FLAG}]:not([${ENHANCED_FLAG}])`);
  hosts.forEach((host) => {
    host.setAttribute(ENHANCED_FLAG, '');
    /* Initial pass: if the markup already ships with chips + a placeholder,
       hide the placeholder right away so the field doesn't double up
       "Voeg een document toe" alongside "Paspoort Geboorteakte" on first
       paint. `renderChips` is a no-op in single-mode. */
    renderChips(host);
    host.addEventListener('mousedown', (event) => {
      // Prevent option mousedown from blurring the input + closing.
      if (event.target instanceof Element && event.target.closest('.utrecht-listbox__option')) {
        event.preventDefault();
      }
    });
    host.addEventListener('click', (event) => handleClick(event, host));
    host.addEventListener('keydown', (event) => handleKeydown(event, host));
    /* Pointer hover sets `data-active` on the option under the cursor so the
       pink-stripe "active" cue tracks the mouse, matching ng-select's
       `.ng-option-marked` behavior in bq-tlb-frontend. Using `mouseover`
       (bubbling) on the host avoids attaching a listener to every option. */
    host.addEventListener('mouseover', (event) => {
      const opt = event.target instanceof Element ? event.target.closest('.utrecht-listbox__option') : null;
      if (!opt || opt.getAttribute('aria-disabled') === 'true') return;
      const listbox = getListbox(host);
      const options = getOptions(listbox);
      const idx = options.indexOf(opt);
      if (idx >= 0) setActiveIndex(host, idx);
    });
    const doc = host.ownerDocument;
    doc.addEventListener('mousedown', (event) => handleDocumentClick(event, host));
  });
}

/* Auto-init when loaded as a module in the browser. Safe in SSR — guarded
   on `document`. Consumers that want explicit control can ignore this and
   call `enhanceCombobox()` on their own root. */
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => enhanceCombobox());
  } else {
    enhanceCombobox();
  }
}
