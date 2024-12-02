import { addons } from '@storybook/manager-api';
import { create, ThemeVars } from '@storybook/theming';
import { theme } from './storybook-theme';

addons.setConfig({
  theme: create(theme as ThemeVars),
});
