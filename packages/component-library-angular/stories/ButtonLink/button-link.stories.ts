import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgButtonLink } from 'src/components';
import { TilburgComponentsModule } from 'src/index.module';

export default {
  title: 'Tilburg Angular Components/Button Link',
  id: 'button-link-1',
  component: TilburgButtonLink,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgButtonLink>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<a tilburg-button-link [external]="external" [appearance]="appearance" [href]="href">Read More</a>',
  }),
};
