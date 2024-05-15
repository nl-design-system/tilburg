import type { ThemeVars } from '@storybook/theming';
import { create } from '@storybook/theming/create';

const tilburgColorWhite: string = '#FFFFFF';
const tilburgColorBlack: string = '#333333';
const tilburgColorGrey: string = '#5B6E8A';
const tilburgColorLightBlue: string = '#E6F6FF';
const tilburgColorMediumBlue: string = '#00A2E0';
const tilburgColorDarkBlue: string = '#026596';
const tilburgColorFuchsia: string = '#C8006C';
const tilburgBorderRadius: number = 8;

export const theme: ThemeVars = create({
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
