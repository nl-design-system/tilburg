/* Sidebar labels: components whose stories carry the tag `tilburg` (components Tilburg introduces itself, with their
   own `tilburg-*` markup instead of an Utrecht base) get a "TLB" badge, so they stand out between the components that
   style an Utrecht component. The same file as `packages/storybook-angular/.storybook/sidebarLabel.tsx`. */

import type { API } from '@storybook/manager-api';
import { TooltipNote, WithTooltip } from 'storybook/internal/components';

interface SidebarEntry {
  name: string;
  type: string;
  tags?: string[];
  children?: string[];
}

export const TILBURG_TAG = 'tilburg';

const BADGE_NOTE =
  'TLB: een component dat Tilburg zelf introduceert, met eigen tilburg-*-markup, niet gebaseerd op een Utrecht-component';

const badgeStyle = {
  border: '1px solid currentColor',
  borderRadius: 3,
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: '0.04em',
  lineHeight: '14px',
  marginInlineStart: 6,
  paddingInline: 4,
};

const isTilburg = (item: SidebarEntry, api: Pick<API, 'getData'>) =>
  item.tags?.includes(TILBURG_TAG) || (item.children ?? []).some((id) => api.getData(id)?.tags?.includes(TILBURG_TAG));

export const renderLabel = (item: SidebarEntry, api: Pick<API, 'getData'>) =>
  item.type === 'component' && isTilburg(item, api) ? (
    <span>
      {item.name}
      <WithTooltip trigger="hover" placement="right" hasChrome={false} tooltip={<TooltipNote note={BADGE_NOTE} />}>
        <span style={badgeStyle}>TLB</span>
      </WithTooltip>
    </span>
  ) : (
    item.name
  );
