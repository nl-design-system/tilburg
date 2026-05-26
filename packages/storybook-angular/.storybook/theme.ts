/* Mirrors `packages/storybook/config/theme.tsx` so both storybooks have the
   same Tilburg brand chrome — logo, title, colors, fonts. Storybook 9 exposes
   the theming API at `storybook/theming/create` (the standalone
   `@storybook/theming` package is deprecated in v9). */

import { create } from 'storybook/theming/create';

const tilburgColorWhite = '#FFFFFF';
const tilburgColorBlack = '#333333';
const tilburgColorGrey = '#5B6E8A';
const tilburgColorLightBlue = '#E6F6FF';
const tilburgColorMediumBlue = '#00A2E0';
const tilburgColorDarkBlue = '#026596';
const tilburgColorFuchsia = '#C8006C';
const tilburgBorderRadius = 8;

export const theme = create({
  base: 'light',
  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',
  brandTitle: 'Gemeente Tilburg',
  brandUrl: 'https://www.tilburg.nl/',
  brandImage: 'logo.svg',
  colorPrimary: tilburgColorMediumBlue,
  colorSecondary: tilburgColorFuchsia,
  appBg: tilburgColorLightBlue,
  appContentBg: tilburgColorWhite,
  appPreviewBg: tilburgColorWhite,
  appBorderColor: tilburgColorGrey,
  appBorderRadius: tilburgBorderRadius,
  textColor: tilburgColorBlack,
  textInverseColor: tilburgColorWhite,
  barTextColor: tilburgColorWhite,
  barSelectedColor: tilburgColorLightBlue,
  barHoverColor: tilburgColorLightBlue,
  barBg: tilburgColorDarkBlue,
  inputBg: tilburgColorWhite,
  inputBorder: tilburgColorGrey,
  inputTextColor: tilburgColorGrey,
  inputBorderRadius: tilburgBorderRadius,
});
