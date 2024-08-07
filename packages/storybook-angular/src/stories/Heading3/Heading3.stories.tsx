import { componentWrapperDecorator, Meta, Story } from '@storybook/angular';
import { TilburgHeading3 } from '@utrecht/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 3',
  id: 'angular-tilburg-heading-3',
  decorators: [componentWrapperDecorator((story) => `<div class="utrecht-document utrecht-theme">${story}</div>`)],
  component: TilburgHeading3,
} as Meta<typeof TilburgHeading3>;

const Template: Story = (args) => ({
  props: args,
  template: `<tilburg-heading-3>The Quick Brown Fox Jumps Over The Lazy Dog</tilburg-heading-3>`,
  component: TilburgHeading3,
});

export const Default = Template.bind({});

Default.args = {};
