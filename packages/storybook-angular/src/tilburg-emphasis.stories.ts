/* @license CC0-1.0 */

import { TilburgEmphasis } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-emphasis.examples';

const meta: Meta<TilburgEmphasis> = {
  title: 'Tilburg Angular/Emphasis',
  id: 'tilburg-emphasis-angular',
  component: TilburgEmphasis,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgEmphasis>;

export const Stressed: Story = {
  name: 'Stressed (em)',
  render: () => ({
    template: `
      <tilburg-paragraph>
        Je kunt je aanvraag <tilburg-emphasis>niet</tilburg-emphasis> meer wijzigen nadat je hem hebt verstuurd.
      </tilburg-paragraph>
    `,
  }),
};

export const Strong: Story = {
  name: 'Strong',
  render: () => ({
    template: `
      <tilburg-paragraph>
        Je afspraak staat vast. <tilburg-emphasis [strong]="true">Neem je identiteitsbewijs mee</tilburg-emphasis>,
        anders kunnen we je niet helpen.
      </tilburg-paragraph>
    `,
  }),
};
