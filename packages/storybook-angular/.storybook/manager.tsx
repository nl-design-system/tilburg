import { addons, types } from 'storybook/manager-api';
import { applyTlbFilter, TLB_FILTER_ID, TlbFilter } from './TlbFilter';
import { renderLabel } from './sidebarLabel';
import { theme } from './theme';

addons.setConfig({ theme, sidebar: { renderLabel } });

/* Toolbar button "Alle componenten / Alleen TLB / Zonder TLB": filters the sidebar on the TLB badge. The remembered
   choice is applied straight away, so the sidebar is filtered before the button is first shown. */
addons.register(TLB_FILTER_ID, (api) => {
  applyTlbFilter(api);
  addons.add(TLB_FILTER_ID, {
    type: types.TOOL,
    title: 'TLB-filter',
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: TlbFilter,
  });
});
