import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgButtonGroup } from 'src/components';
import { TilburgComponentsModule } from 'src/index.module';

export default {
  title: 'Tilburg Angular Components/Button Group',
  id: 'button-group',
  component: TilburgButtonGroup,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgButtonGroup>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template:
      '<tilburg-button-group>' +
      '<tilburg-button appearance="primary-action-button">Save and continue</tilburg-button>' +
      '<tilburg-button appearance="secondary-action-button">Back</tilburg-button>' +
      '</tilburg-button-group>',
  }),
};
