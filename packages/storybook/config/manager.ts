import { addons, types } from 'storybook/manager-api';
import { applyTlbFilter, TLB_FILTER_ID, TlbFilter } from './TlbFilter';
import { USAGE_TOOL_ID, UsageTool } from './UsagePanel';
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

/* Toolbar button "</> Gebruik": a dialog with how to put the component on screen into a project of your own. */
addons.register(USAGE_TOOL_ID, () => {
  addons.add(USAGE_TOOL_ID, {
    type: types.TOOL,
    title: 'Gebruik',
    match: ({ viewMode }) => viewMode === 'story',
    render: UsageTool,
  });
});
