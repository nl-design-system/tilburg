/* Example page "Mijn aanvragen": an overview page in a personal environment. A table of requests with a status badge
   per row and pagination, the personal details in a data list and frequently asked questions in an accordion. Built
   only from Tilburg components; the requests are examples. */
import {
  Accordion,
  AccordionSection,
  Alert,
  BadgeStatus,
  Breadcrumb,
  ButtonLink,
  DataList,
  DataListItem,
  DataListKey,
  DataListValue,
  Heading1,
  Heading2,
  Link,
  Pagination,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@gemeente-tilburg/components-react';
import { useState } from 'react';
import { ExamplePage } from './layout';

const PAGE_SIZE = 5;

/* Status text and the matching Utrecht badge modifier. */
const statuses = {
  received: { label: 'Ontvangen', badge: 'info' },
  inProgress: { label: 'In behandeling', badge: 'warning' },
  actionNeeded: { label: 'Actie nodig', badge: 'danger' },
  done: { label: 'Afgerond', badge: 'success' },
} as const;

type Status = keyof typeof statuses;

interface Request {
  reference: string;
  subject: string;
  submitted: string;
  status: Status;
}

const requests: Request[] = [
  { reference: 'A-2026-31842', subject: 'Parkeervergunning bewoners', submitted: '22-09-2026', status: 'received' },
  { reference: 'M-2026-30177', subject: 'Melding kapotte lantaarnpaal', submitted: '18-09-2026', status: 'inProgress' },
  {
    reference: 'A-2026-29540',
    subject: 'Kwijtschelding gemeentelijke belastingen',
    submitted: '12-09-2026',
    status: 'actionNeeded',
  },
  {
    reference: 'A-2026-27311',
    subject: 'Uittreksel basisregistratie personen',
    submitted: '02-09-2026',
    status: 'done',
  },
  { reference: 'A-2026-25108', subject: 'Omgevingsvergunning dakkapel', submitted: '26-08-2026', status: 'inProgress' },
  { reference: 'M-2026-22964', subject: 'Melding zwerfvuil', submitted: '14-08-2026', status: 'done' },
  { reference: 'A-2026-20417', subject: 'Verhuizing doorgeven', submitted: '30-07-2026', status: 'done' },
  { reference: 'A-2026-18233', subject: 'Afvalpas aanvragen', submitted: '11-07-2026', status: 'done' },
  { reference: 'M-2026-15820', subject: 'Melding losse stoeptegel', submitted: '24-06-2026', status: 'done' },
  { reference: 'A-2026-12006', subject: 'Evenementenvergunning buurtfeest', submitted: '03-06-2026', status: 'done' },
  { reference: 'A-2026-09871', subject: 'Gehandicaptenparkeerkaart', submitted: '15-05-2026', status: 'done' },
  { reference: 'A-2026-06549', subject: 'Uittreksel huwelijksakte', submitted: '21-04-2026', status: 'done' },
];

const pageCount = Math.ceil(requests.length / PAGE_SIZE);

const faq = [
  {
    key: 'duration',
    label: 'Hoe lang duurt het voordat mijn aanvraag klaar is?',
    body: 'Dat verschilt per aanvraag. Op de pagina van het product staat hoe lang het meestal duurt.',
  },
  {
    key: 'action',
    label: 'Wat moet ik doen bij "Actie nodig"?',
    body: 'We hebben iets van u nodig, bijvoorbeeld een extra document. Open de aanvraag om te zien wat.',
  },
  {
    key: 'missing',
    label: 'Ik zie mijn aanvraag niet in de lijst',
    body: 'Aanvragen op papier of aan de balie staan hier niet. Bel ons op 14 013 als u de status wilt weten.',
  },
];

export const MyRequests = () => {
  const [page, setPage] = useState(1);
  const visible = requests.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const actionNeeded = requests.filter(({ status }) => status === 'actionNeeded').length;

  return (
    <ExamplePage>
      <Breadcrumb
        items={[
          { label: 'Home', href: '#' },
          { label: 'Mijn Tilburg', href: '#' },
          { label: 'Mijn aanvragen', current: true },
        ]}
      />
      <div className="tilburg-example__stack">
        <Heading1>Mijn aanvragen</Heading1>
        <Paragraph className="tilburg-example__column">
          Hier ziet u de aanvragen en meldingen die u online heeft gedaan, met de status van elke aanvraag.
        </Paragraph>

        {actionNeeded > 0 && (
          <Alert variant="warning" title="Er is een actie nodig" headingLevel={2} className="tilburg-example__column">
            <Paragraph>
              Bij {actionNeeded === 1 ? 'één aanvraag' : `${actionNeeded} aanvragen`} hebben we iets van u nodig.
            </Paragraph>
          </Alert>
        )}

        <div className="tilburg-example__toolbar">
          <Heading2>Aanvragen en meldingen</Heading2>
          <ButtonLink appearance="secondary-action-button" href="#">
            Nieuwe aanvraag
          </ButtonLink>
        </div>

        <div className="tilburg-example__table-wrapper">
          <Table caption={`Uw aanvragen, pagina ${page} van ${pageCount}`}>
            <TableHeader>
              <TableRow>
                <TableHeaderCell scope="col">Aanvraag</TableHeaderCell>
                <TableHeaderCell scope="col">Kenmerk</TableHeaderCell>
                <TableHeaderCell scope="col">Ingediend</TableHeaderCell>
                <TableHeaderCell scope="col">Status</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((request) => (
                <TableRow key={request.reference}>
                  <TableCell>
                    <Link href="#">{request.subject}</Link>
                  </TableCell>
                  <TableCell>{request.reference}</TableCell>
                  <TableCell>{request.submitted}</TableCell>
                  <TableCell>
                    <BadgeStatus status={statuses[request.status].badge} liveRegion="off">
                      {statuses[request.status].label}
                    </BadgeStatus>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination
          ariaLabel="Paginering aanvragen"
          pageCount={pageCount}
          currentPage={page}
          firstDisabled={page === 1}
          previousDisabled={page === 1}
          nextDisabled={page === pageCount}
          lastDisabled={page === pageCount}
          onNavigate={({ step, page: target }) => {
            if (step === 'page' && target) setPage(target);
            if (step === 'first') setPage(1);
            if (step === 'previous') setPage((current) => Math.max(1, current - 1));
            if (step === 'next') setPage((current) => Math.min(pageCount, current + 1));
            if (step === 'last') setPage(pageCount);
          }}
        />

        <Heading2>Mijn gegevens</Heading2>
        <DataList className="tilburg-example__column">
          <DataListItem>
            <DataListKey>Naam</DataListKey>
            <DataListValue>J. de Vries</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListKey>Adres</DataListKey>
            <DataListValue>Voorbeeldstraat 12, 5000 AA Tilburg</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListKey>E-mailadres</DataListKey>
            <DataListValue>j.devries@voorbeeld.nl</DataListValue>
          </DataListItem>
        </DataList>
        <Paragraph>
          <Link href="#">Gegevens wijzigen</Link>
        </Paragraph>

        <Heading2>Veelgestelde vragen</Heading2>
        <Accordion headingLevel={3} className="tilburg-example__column">
          {faq.map(({ key, label, body }) => (
            <AccordionSection key={key} sectionKey={key} label={label} autoToggle>
              <Paragraph>{body}</Paragraph>
            </AccordionSection>
          ))}
        </Accordion>
      </div>
    </ExamplePage>
  );
};
