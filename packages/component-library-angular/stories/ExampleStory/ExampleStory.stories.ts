import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExampleStoryComponent, TilburgComponentsModule } from '@tilburg/component-library-angular';
export default {
  title: 'Tilburg Angular Components/Example',
  id: 'example',
  component: ExampleStoryComponent,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<ExampleStoryComponent>;

export const Default: Story = {
  args: {},
};
