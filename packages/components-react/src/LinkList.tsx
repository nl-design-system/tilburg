import '@gemeente-tilburg/components-css/link-list/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react';
import { AriaCurrent, Link } from './Link';

export interface LinkListLink {
  label: ReactNode;
  href: string;
  external?: boolean;
  current?: AriaCurrent;
}

export interface LinkListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
  links?: LinkListLink[];
}

/* The chevron of the HTML reference (`tilburg-link-list.examples.ts`). */
const Chevron = () => (
  <svg
    className="utrecht-icon"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const LinkList = forwardRef(
  ({ links = [], className, ...restProps }: LinkListProps, ref: ForwardedRef<HTMLUListElement>) =>
    links.length ? (
      <ul
        ref={ref}
        role="list"
        className={clsx('utrecht-link-list', 'utrecht-link-list--html-ul', className)}
        {...restProps}
      >
        {links.map(({ label, href, external, current }, index) => (
          <li key={`${href}-${index}`} className="utrecht-link-list__item">
            <Link className="utrecht-link-list__link" href={href} external={external} current={current}>
              <Chevron />
              <span className="utrecht-link-list__link-text">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    ) : null,
);

LinkList.displayName = 'LinkList';
