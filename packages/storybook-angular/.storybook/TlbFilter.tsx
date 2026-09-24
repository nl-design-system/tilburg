/* Toolbar button that filters the sidebar on the TLB badge (see `sidebarLabel.tsx`): all components, only the
   components Tilburg introduces itself, or only the ones that style an Utrecht component. It uses Storybook's sidebar
   filter API (`experimental_setFilter`), which both Storybook versions in this repo have; the built-in tag filter of
   Storybook 9 can only include a tag, not exclude it. The choice is remembered per browser. The same file as
   `packages/storybook/config/TlbFilter.tsx`, with the Storybook 9 imports. */
import React, { useState } from 'react';
import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components';
import { type API, useStorybookApi } from 'storybook/manager-api';
import { TILBURG_TAG } from './sidebarLabel';

export const TLB_FILTER_ID = 'tilburg/tlb-filter';

type Mode = 'all' | 'only' | 'without';

const MODES: { id: Mode; title: string }[] = [
  { id: 'all', title: 'Alle componenten' },
  { id: 'only', title: 'Alleen TLB' },
  { id: 'without', title: 'Zonder TLB' },
];

const STORAGE_KEY = 'tilburg-tlb-filter';

const readMode = (): Mode => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return MODES.some(({ id }) => id === stored) ? (stored as Mode) : 'all';
  } catch {
    return 'all';
  }
};

const isTilburg = (entry: { tags?: string[] }) => Boolean(entry.tags?.includes(TILBURG_TAG));

/* Documentation pages (Intro, Aan de slag, …, MDX files of their own) and the example pages (tag `example`) are not
   components; they stay visible whatever the filter. */
const isDocumentation = (entry: { tags?: string[] }) =>
  Boolean(entry.tags?.some((tag) => tag === 'unattached-mdx' || tag === 'example'));

export const applyTlbFilter = (api: API, mode: Mode = readMode()) => {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* Private window or blocked storage: the filter still works, it is just not remembered. */
  }
  return api.experimental_setFilter(
    TLB_FILTER_ID,
    (entry) => mode === 'all' || isDocumentation(entry) || (mode === 'only' ? isTilburg(entry) : !isTilburg(entry)),
  );
};

export const TlbFilter = () => {
  const api = useStorybookApi();
  const [mode, setMode] = useState<Mode>(readMode);
  const current = MODES.find(({ id }) => id === mode) ?? MODES[0];

  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      closeOnOutsideClick
      tooltip={({ onHide }: { onHide: () => void }) => (
        <TooltipLinkList
          links={MODES.map(({ id, title }) => ({
            id,
            title,
            active: id === mode,
            onClick: () => {
              setMode(id);
              applyTlbFilter(api, id);
              onHide();
            },
          }))}
        />
      )}
    >
      <IconButton key={TLB_FILTER_ID} title="Zijbalk filteren op het TLB-label" active={mode !== 'all'}>
        {current.title}
      </IconButton>
    </WithTooltip>
  );
};
