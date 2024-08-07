import { componentWrapperDecorator, Meta, Story } from '@storybook/angular';
import { TilburgHeading5 } from '@utrecht/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 5',
  id: 'angular-tilburg-heading-5',
  decorators: [componentWrapperDecorator((story) => `<div class="utrecht-document utrecht-theme">${story}</div>`)],
  component: TilburgHeading5,
} as Meta<typeof TilburgHeading5>;

const Template: Story = (args) => ({
  props: args,
  template: `<tilburg-heading-5>The Quick Brown Fox Jumps Over The Lazy Dog</tilburg-heading-5>`,
  component: TilburgHeading5,
});

export const Default = Template.bind({});

Default.args = {};
