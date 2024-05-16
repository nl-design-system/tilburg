/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink, SkipLinkProps } from '@utrecht/component-library-react';
import clsx from 'clsx';
import readme from './documentation/skip-link.md?raw';

interface SkipLinkStoryProps extends SkipLinkProps {
  focus?: boolean;
  visibility?: string | 'hidden' | 'visible';
  visibleOnFocus?: boolean;
}

const SkipLinkStory = ({ focus, visibility, visibleOnFocus, ...restProps }: SkipLinkStoryProps) => (
  <SkipLink
    className={clsx({
      'utrecht-skip-link--focus': focus,
      'utrecht-skip-link--visible-on-focus': visibleOnFocus,
      'utrecht-skip-link--hidden': visibility === 'hidden',
      'utrecht-skip-link--visible': visibility === 'visible',
    })}
    {...restProps}
  />
);

const meta = {
  title: 'CSS Component/Skip link',
  id: 'css-skip-link',
  component: SkipLinkStory,
  argTypes: {},
  args: {},
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=2217-10122&t=iKkbTeLsUISfA7KG-0',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof SkipLinkStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#main',
    focus: true,
    children: 'Skip to main content',
    visibility: 'visible',
  },
};

export const VisibleOnFocus: Story = {
  args: {
    href: '#main',
    focus: true,
    children: 'Skip to main content',
    visibleOnFocus: true,
  },
  name: 'Visible on focus',
};
