import { Meta, StoryObj } from '@storybook/angular';
import { TilburgHeading1 } from '@tilburg/component-library-angular';

export default {
  title: 'Angular Component/Heading 1',
  id: 'heading-1',
  component: TilburgHeading1,
  decorators: [],
} as Meta;

type Story = StoryObj<TilburgHeading1>;

export const Default: Story = {
  args: {},
};
