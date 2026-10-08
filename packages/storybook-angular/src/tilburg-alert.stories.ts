/* @license CC0-1.0 */

import { TilburgAlert } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-alert.examples';

const meta: Meta<TilburgAlert> = {
  title: 'Tilburg Angular/Alert',
  id: 'tilburg-alert-angular',
  component: TilburgAlert,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    closable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<TilburgAlert>;

export const Info: Story = {
  name: 'Info',
  args: { variant: 'info', title: 'Informatie' },
  render: (args) => ({
    props: args,
    template: `<tilburg-alert [variant]="variant" [title]="title">De openingstijden zijn gewijzigd. Bekijk de actuele tijden op deze pagina.</tilburg-alert>`,
  }),
};

export const Success: Story = {
  name: 'Success (ok)',
  args: { variant: 'success', title: 'Aanvraag verstuurd' },
  render: (args) => ({
    props: args,
    template: `<tilburg-alert [variant]="variant" [title]="title">Je ontvangt binnen 8 weken een beslissing per e-mail.</tilburg-alert>`,
  }),
};

export const Warning: Story = {
  name: 'Warning',
  args: { variant: 'warning', title: 'Let op' },
  render: (args) => ({
    props: args,
    template: `<tilburg-alert [variant]="variant" [title]="title">De aanvraagperiode sluit over twee weken.</tilburg-alert>`,
  }),
};

export const Danger: Story = {
  name: 'Danger (error)',
  args: { variant: 'danger', title: 'Er ging iets mis' },
  render: (args) => ({
    props: args,
    template: `<tilburg-alert [variant]="variant" [title]="title">Probeer het opnieuw of neem contact op met de gemeente.</tilburg-alert>`,
  }),
};

export const Closable: Story = {
  name: 'Closable',
  args: { variant: 'info', title: 'Informatie', closable: true },
  render: (args) => ({
    props: args,
    template: `<tilburg-alert [variant]="variant" [title]="title" [closable]="closable">Klik op het kruisje om dit bericht te sluiten.</tilburg-alert>`,
  }),
};

export const MessageOnly: Story = {
  name: 'Message only (no title)',
  args: { variant: 'info' },
  render: (args) => ({
    props: args,
    template: `<tilburg-alert [variant]="variant">Deze melding heeft geen titel — alleen een korte tekst.</tilburg-alert>`,
  }),
};
