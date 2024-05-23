/* @license CC0-1.0 */

import { Pagination } from '@amsterdam/design-system-react';
import { Meta, StoryObj } from '@storybook/react';

import '@amsterdam/design-system-css/dist/pagination/pagination.css';

const meta = {
  title: 'CSS Component/Pagination',
  id: 'css-amsterdam-pagination',
  component: Pagination,
  args: {
    page: 3,
    maxVisiblePages: 5,
    totalPages: 99,
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
