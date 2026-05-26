/* @license CC0-1.0 */

import { TilburgPagination } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-pagination.examples';

const meta: Meta<TilburgPagination> = {
  title: 'Tilburg Angular/Pagination',
  id: 'tilburg-pagination-angular',
  component: TilburgPagination,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgPagination>;

export const NumericFirst: Story = {
  name: 'Numeric — first page',
  args: { feedback: 'Toont 1–10 van 117', pageCount: 12, currentPage: 1, firstDisabled: true, previousDisabled: true },
  render: (args) => ({
    props: args,
    template: `<tilburg-pagination [feedback]="feedback" [pageCount]="pageCount" [currentPage]="currentPage" [firstDisabled]="firstDisabled" [previousDisabled]="previousDisabled"></tilburg-pagination>`,
  }),
};

export const NumericMiddle: Story = {
  name: 'Numeric — middle (with ellipsis)',
  args: { feedback: 'Toont 41–50 van 117', pageCount: 12, currentPage: 5 },
  render: (args) => ({
    props: args,
    template: `<tilburg-pagination [feedback]="feedback" [pageCount]="pageCount" [currentPage]="currentPage"></tilburg-pagination>`,
  }),
};

export const NumericNearEnd: Story = {
  name: 'Numeric — near the end',
  args: { feedback: 'Toont 101–110 van 117', pageCount: 12, currentPage: 11 },
  render: (args) => ({
    props: args,
    template: `<tilburg-pagination [feedback]="feedback" [pageCount]="pageCount" [currentPage]="currentPage"></tilburg-pagination>`,
  }),
};

export const NumericLast: Story = {
  name: 'Numeric — last page',
  args: { feedback: 'Toont 111–117 van 117', pageCount: 12, currentPage: 12, nextDisabled: true, lastDisabled: true },
  render: (args) => ({
    props: args,
    template: `<tilburg-pagination [feedback]="feedback" [pageCount]="pageCount" [currentPage]="currentPage" [nextDisabled]="nextDisabled" [lastDisabled]="lastDisabled"></tilburg-pagination>`,
  }),
};

export const NumericSmall: Story = {
  name: 'Numeric — total ≤ 7 (no ellipsis)',
  args: { feedback: 'Toont 21–30 van 47', pageCount: 5, currentPage: 3 },
  render: (args) => ({
    props: args,
    template: `<tilburg-pagination [feedback]="feedback" [pageCount]="pageCount" [currentPage]="currentPage"></tilburg-pagination>`,
  }),
};

export const RangeOnly: Story = {
  name: 'Range text only (no numeric list)',
  args: { feedback: 'Toont 41–50 van 117', range: 'Pagina 5 van 12' },
  render: (args) => ({
    props: args,
    template: `<tilburg-pagination [feedback]="feedback" [range]="range"></tilburg-pagination>`,
  }),
};

export const NoFeedback: Story = {
  name: 'Without feedback / range / numeric',
  render: () => ({
    template: `<tilburg-pagination></tilburg-pagination>`,
  }),
};

export const FewPages: Story = {
  args: { pageCount: 4, currentPage: 1 },
  render: (args) => ({
    props: args,
    template: `<tilburg-pagination [pageCount]="pageCount" [currentPage]="currentPage"></tilburg-pagination>`,
  }),
};

export const ManyPages: Story = {
  args: { pageCount: 12, currentPage: 5 },
  render: (args) => ({
    props: args,
    template: `<tilburg-pagination [pageCount]="pageCount" [currentPage]="currentPage"></tilburg-pagination>`,
  }),
};

export const WithFeedback: Story = {
  args: { pageCount: 5, currentPage: 2, feedback: 'Pagina 2 van 5' },
  render: (args) => ({
    props: args,
    template: `<tilburg-pagination [pageCount]="pageCount" [currentPage]="currentPage" [feedback]="feedback"></tilburg-pagination>`,
  }),
};
