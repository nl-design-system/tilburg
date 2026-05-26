/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-form-label.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-form-label.examples.ts`). The React
   storybook's `tilburg-form-label.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Form Label',
  id: 'tilburg-form-label',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: examples.default.name,
  render: () => ({ template: examples.default.html }),
};

export const WithOptional: Story = {
  name: examples.withOptional.name,
  render: () => ({ template: examples.withOptional.html }),
};

export const RadioLabel: Story = {
  name: examples.radioLabel.name,
  render: () => ({ template: examples.radioLabel.html }),
};

export const CheckboxLabel: Story = {
  name: examples.checkboxLabel.name,
  render: () => ({ template: examples.checkboxLabel.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
