import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgHeading3 } from 'src/components';
import { TilburgComponentsModule } from 'src/index.module';

export default {
  title: 'Tilburg Angular Components/Heading 3',
  id: 'heading-3',
  component: TilburgHeading3,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgHeading3>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-heading-3>Test Heading 3</tilburg-heading-3>',
  }),
};
