import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgParagraph } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Paragraph',
  id: 'tilburg-paragraph',
  component: TilburgParagraph,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgParagraph>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-paragraph >Default paragraph</tilburg-paragraph>',
  }),
};

export const Small: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-paragraph [small]="true" >a Small paragraph</tilburg-paragraph>',
  }),
};

export const Lead: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-paragraph [lead]="true" >a Lead paragraph</tilburg-paragraph>',
  }),
};
