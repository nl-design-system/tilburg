/* The page frame of the example pages: skip link, page header with the Tilburg logo and a language toggle, the main
   content and the page footer. Only Tilburg components; `examples.css` adds the little layout the pages need around
   them (a readable width for forms, spacing between sections). */
import {
  LanguageToggle,
  Page,
  PageContent,
  PageFooter,
  PageHeader,
  SkipLink,
} from '@gemeente-tilburg/components-react';
import { type ReactNode, useState } from 'react';
import './examples.css';

export const MAIN_ID = 'tilburg-example-main';

const footerLinks = [
  { label: 'Privacyverklaring', href: '#' },
  { label: 'Toegankelijkheid', href: '#' },
  { label: 'Cookies', href: '#' },
  { label: 'Proclaimer', href: '#' },
];

const languages = [
  { code: 'nl', label: 'NL' },
  { code: 'en', label: 'EN' },
];

export const ExamplePage = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('nl');

  return (
    <Page className="tilburg-example">
      <SkipLink href={`#${MAIN_ID}`}>Direct naar de inhoud</SkipLink>
      <PageHeader logoSrc="logo-on-dark.svg" logoAlt="Open Tilburg, naar de homepage" titleHref="#">
        <LanguageToggle options={languages} active={language} onToggle={setLanguage} />
      </PageHeader>
      <PageContent id={MAIN_ID} tabIndex={-1} className="tilburg-example__content">
        {children}
      </PageContent>
      <PageFooter links={footerLinks} primaryLink={{ label: 'Contact', href: '#' }} />
    </Page>
  );
};
