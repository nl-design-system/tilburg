/* @license CC0-1.0 */

import { TilburgPageHeader } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-page-header.examples';

const meta: Meta<TilburgPageHeader> = {
  title: 'Tilburg Angular/Page Header',
  id: 'tilburg-page-header-angular',
  component: TilburgPageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgPageHeader>;

const LOGO_SRC = '/logo-on-dark.svg';

export const LogoOnly: Story = {
  name: 'Logo only',
  render: () => ({
    props: { logoSrc: LOGO_SRC },
    template: `<tilburg-page-header [logoSrc]="logoSrc" titleHref="#"></tilburg-page-header>`,
  }),
};

export const LogoAndTitle: Story = {
  name: 'Logo + title',
  render: () => ({
    props: { logoSrc: LOGO_SRC },
    template: `<tilburg-page-header [logoSrc]="logoSrc" title="Mijn omgeving" titleHref="#"></tilburg-page-header>`,
  }),
};

export const LoggedIn: Story = {
  name: 'Logged-in user with actions',
  render: () => ({
    props: { logoSrc: LOGO_SRC },
    template: `
      <tilburg-page-header [logoSrc]="logoSrc" titleHref="#">
        <span class="tilburg-page-header__user">Jan Janssen</span>
        <button type="button" class="utrecht-button utrecht-button--subtle tilburg-medium">Uitloggen</button>
      </tilburg-page-header>
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    template: `
      <tilburg-page-header title="Gemeente Tilburg" titleHref="/">
        <tilburg-button appearance="subtle-button">Inloggen</tilburg-button>
      </tilburg-page-header>
    `,
  }),
};
