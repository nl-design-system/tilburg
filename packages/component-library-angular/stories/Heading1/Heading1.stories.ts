import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgHeading1 } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 1',
  id: 'heading-1',
  component: TilburgHeading1,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgHeading1>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-heading-1>Test Heading 1</tilburg-heading-1>',
  }),
};
