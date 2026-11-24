/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import {
  bugs,
  descriptionHtml,
  examples,
  storyDescriptions,
} from '../../storybook-shared/src/tilburg-file-input.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup (`storybook-shared/src/tilburg-file-input.examples.ts`);
   the Angular Storybook's `tilburg-file-input-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/File Input',
  id: 'tilburg-file-input',
  tags: ['autodocs', 'tilburg'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Default: Story = {
  name: examples.default.name,
  parameters: { docs: { description: { story: storyDescriptions.default } } },
  render: () => <HtmlExample html={examples.default.html} />,
};

export const WithFiles: Story = {
  name: examples.withFiles.name,
  parameters: { docs: { description: { story: storyDescriptions.withFiles } } },
  render: () => <HtmlExample html={examples.withFiles.html} />,
};

export const DragOver: Story = {
  name: examples.dragOver.name,
  parameters: { docs: { description: { story: storyDescriptions.dragOver } } },
  render: () => <HtmlExample html={examples.dragOver.html} />,
};

export const Invalid: Story = {
  name: examples.invalid.name,
  parameters: { docs: { description: { story: storyDescriptions.invalid } } },
  render: () => <HtmlExample html={examples.invalid.html} />,
};

export const Busy: Story = {
  name: examples.busy.name,
  parameters: { docs: { description: { story: storyDescriptions.busy } } },
  render: () => <HtmlExample html={examples.busy.html} />,
};

export const Disabled: Story = {
  name: examples.disabled.name,
  parameters: { docs: { description: { story: storyDescriptions.disabled } } },
  render: () => <HtmlExample html={examples.disabled.html} />,
};
