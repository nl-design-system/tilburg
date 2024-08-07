import { Meta, StoryObj } from '@storybook/angular';
import { ExampleStoryComponent } from '@tilburg/component-library-angular';
export default {
  title: 'Angular Component/Example',
  id: 'example',
  component: ExampleStoryComponent,
  decorators: [],
} as Meta;

type Story = StoryObj<ExampleStoryComponent>;

export const Default: Story = {
  args: {},
};
