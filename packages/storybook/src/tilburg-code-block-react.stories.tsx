/* @license CC0-1.0 */

import { CodeBlock } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-code-block.examples';

const meta = {
  title: 'Tilburg React/Code Block',
  id: 'tilburg-code-block-react',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CodeBlock>npm install @gemeente-tilburg/components-css</CodeBlock>,
};

export const Multiline: Story = {
  name: 'Multiple lines',
  render: () => (
    <CodeBlock>
      {`<html lang="nl" class="tilburg-theme">
  <body class="utrecht-document">
    <h1 class="utrecht-heading-1">Afvalkalender</h1>
  </body>
</html>`}
    </CodeBlock>
  ),
};
