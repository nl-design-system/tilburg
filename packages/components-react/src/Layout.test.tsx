import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Article } from './Article';
import { ButtonGroup } from './ButtonGroup';
import { Document } from './Document';
import { Page } from './Page';
import { PageContent } from './PageContent';
import { PageFooter } from './PageFooter';
import { PageHeader } from './PageHeader';
import '@testing-library/jest-dom';

describe('Page', () => {
  it('renders children', () => {
    render(<Page>hello</Page>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Page ref={ref}>x</Page>);
    expect(ref.current).not.toBeNull();
  });
});

describe('PageContent', () => {
  it('renders children', () => {
    render(<PageContent>hello</PageContent>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});

describe('Article', () => {
  it('renders an article element', () => {
    const { container } = render(<Article>hello</Article>);
    expect(container.querySelector('article')).toBeInTheDocument();
  });
});

describe('Document', () => {
  it('renders children', () => {
    render(<Document>hello</Document>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});

describe('ButtonGroup', () => {
  it('applies role="group" by default', () => {
    const { container } = render(<ButtonGroup>buttons</ButtonGroup>);
    expect(container.firstChild).toHaveAttribute('role', 'group');
  });

  it('forwards a custom role', () => {
    const { container } = render(<ButtonGroup role="toolbar">x</ButtonGroup>);
    expect(container.firstChild).toHaveAttribute('role', 'toolbar');
  });
});

describe('PageHeader', () => {
  it('renders title and logo when provided', () => {
    render(<PageHeader title="Tilburg" logoSrc="/logo.svg" logoAlt="Tilburg logo" />);
    expect(screen.getByText('Tilburg')).toBeInTheDocument();
    expect(screen.getByAltText('Tilburg logo')).toBeInTheDocument();
  });

  it('renders action children', () => {
    render(
      <PageHeader>
        <button type="button">action</button>
      </PageHeader>,
    );
    expect(screen.getByRole('button', { name: 'action' })).toBeInTheDocument();
  });

  it('omits the brand block when neither title nor logo is set', () => {
    const { container } = render(<PageHeader />);
    expect(container.querySelector('.tilburg-page-header__brand')).not.toBeInTheDocument();
  });
});

describe('PageFooter', () => {
  it('renders link rows when links are provided', () => {
    render(
      <PageFooter
        links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Contact', href: '/contact' },
        ]}
      />,
    );
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('renders the primary link when provided', () => {
    render(<PageFooter primaryLink={{ label: 'Home', href: '/' }} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it('renders children', () => {
    render(<PageFooter>extra</PageFooter>);
    expect(screen.getByText('extra')).toBeInTheDocument();
  });
});
