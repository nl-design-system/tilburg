/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import {
  bugs,
  descriptionHtml,
  examples,
  storyDescriptions,
} from '../../storybook-shared/src/tilburg-file-input.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup (`storybook-shared/src/tilburg-file-input.examples.ts`);
   the React Storybook's `tilburg-file-input.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/File Input',
  id: 'tilburg-file-input',
  tags: ['autodocs', 'tilburg'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: examples.default.name,
  parameters: { docs: { description: { story: storyDescriptions.default } } },
  render: () => ({ template: examples.default.html }),
};

export const WithFiles: Story = {
  name: examples.withFiles.name,
  parameters: { docs: { description: { story: storyDescriptions.withFiles } } },
  render: () => ({ template: examples.withFiles.html }),
};

export const DragOver: Story = {
  name: examples.dragOver.name,
  parameters: { docs: { description: { story: storyDescriptions.dragOver } } },
  render: () => ({ template: examples.dragOver.html }),
};

export const Invalid: Story = {
  name: examples.invalid.name,
  parameters: { docs: { description: { story: storyDescriptions.invalid } } },
  render: () => ({ template: examples.invalid.html }),
};

export const Busy: Story = {
  name: examples.busy.name,
  parameters: { docs: { description: { story: storyDescriptions.busy } } },
  render: () => ({ template: examples.busy.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  parameters: { docs: { description: { story: storyDescriptions.disabled } } },
  render: () => ({ template: examples.disabled.html }),
};
