import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExampleStoryComponent } from 'src/components';
import { TilburgComponentsModule } from 'src/index.module';

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
