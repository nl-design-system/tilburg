/* Example page "Mijn aanvragen": an overview page in a personal environment. A table of requests with a status badge
   per row and pagination, the personal details in a data list and frequently asked questions in an accordion. Built
   only from Tilburg components; the requests are examples. */
import { Component, computed, signal } from '@angular/core';
import { TilburgComponentsModule, type TilburgPaginationEvent } from '@gemeente-tilburg/components-angular';
import { ExamplePage } from './layout.component';

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

@Component({
  selector: 'tilburg-example-my-requests',
  imports: [TilburgComponentsModule, ExamplePage],
  template: `
    <tilburg-example-page>
      <tilburg-breadcrumb [items]="breadcrumb" />
      <div class="tilburg-example__stack">
        <tilburg-heading-1>Mijn aanvragen</tilburg-heading-1>
        <tilburg-paragraph class="tilburg-example__column">
          Hier ziet u de aanvragen en meldingen die u online heeft gedaan, met de status van elke aanvraag.
        </tilburg-paragraph>

        @if (actionNeeded > 0) {
          <tilburg-alert
            variant="warning"
            [title]="'Er is een actie nodig'"
            [headingLevel]="2"
            class="tilburg-example__column"
          >
            <tilburg-paragraph>
              Bij {{ actionNeeded === 1 ? 'één aanvraag' : actionNeeded + ' aanvragen' }} hebben we iets van u nodig.
            </tilburg-paragraph>
          </tilburg-alert>
        }

        <div class="tilburg-example__toolbar">
          <tilburg-heading-2>Aanvragen en meldingen</tilburg-heading-2>
          <a tilburg-button-link appearance="secondary-action-button" href="#">Nieuwe aanvraag</a>
        </div>

        <div class="tilburg-example__table-wrapper">
          <tilburg-table [caption]="'Uw aanvragen, pagina ' + page() + ' van ' + pageCount">
            <thead tilburg-table-header>
              <tr tilburg-table-row>
                <th tilburg-table-header-cell scope="col">Aanvraag</th>
                <th tilburg-table-header-cell scope="col">Kenmerk</th>
                <th tilburg-table-header-cell scope="col">Ingediend</th>
                <th tilburg-table-header-cell scope="col">Status</th>
              </tr>
            </thead>
            <tbody tilburg-table-body>
              @for (request of visible(); track request.reference) {
                <tr tilburg-table-row>
                  <td tilburg-table-cell>
                    <tilburg-link href="#">{{ request.subject }}</tilburg-link>
                  </td>
                  <td tilburg-table-cell>{{ request.reference }}</td>
                  <td tilburg-table-cell>{{ request.submitted }}</td>
                  <td tilburg-table-cell>
                    <tilburg-badge-status [status]="statuses[request.status].badge" liveRegion="off">{{
                      statuses[request.status].label
                    }}</tilburg-badge-status>
                  </td>
                </tr>
              }
            </tbody>
          </tilburg-table>
        </div>

        <tilburg-pagination
          ariaLabel="Paginering aanvragen"
          [pageCount]="pageCount"
          [currentPage]="page()"
          [firstDisabled]="page() === 1"
          [previousDisabled]="page() === 1"
          [nextDisabled]="page() === pageCount"
          [lastDisabled]="page() === pageCount"
          (navigate)="navigate($event)"
        />

        <tilburg-heading-2>Mijn gegevens</tilburg-heading-2>
        <tilburg-data-list class="tilburg-example__column">
          <tilburg-data-list-item>
            <tilburg-data-list-key>Naam</tilburg-data-list-key>
            <tilburg-data-list-value>J. de Vries</tilburg-data-list-value>
          </tilburg-data-list-item>
          <tilburg-data-list-item>
            <tilburg-data-list-key>Adres</tilburg-data-list-key>
            <tilburg-data-list-value>Voorbeeldstraat 12, 5000 AA Tilburg</tilburg-data-list-value>
          </tilburg-data-list-item>
          <tilburg-data-list-item>
            <tilburg-data-list-key>E-mailadres</tilburg-data-list-key>
            <tilburg-data-list-value>j.devries&#64;voorbeeld.nl</tilburg-data-list-value>
          </tilburg-data-list-item>
        </tilburg-data-list>
        <tilburg-paragraph><tilburg-link href="#">Gegevens wijzigen</tilburg-link></tilburg-paragraph>

        <tilburg-heading-2>Veelgestelde vragen</tilburg-heading-2>
        <tilburg-accordion [headingLevel]="3" class="tilburg-example__column">
          @for (question of faq; track question.key) {
            <tilburg-accordion-section [key]="question.key" [label]="question.label" [autoToggle]="true">
              <tilburg-paragraph>{{ question.body }}</tilburg-paragraph>
            </tilburg-accordion-section>
          }
        </tilburg-accordion>
      </div>
    </tilburg-example-page>
  `,
})
export class MyRequests {
  readonly statuses = statuses;
  readonly pageCount = Math.ceil(requests.length / PAGE_SIZE);
  readonly actionNeeded = requests.filter(({ status }) => status === 'actionNeeded').length;

  readonly page = signal(1);
  readonly visible = computed(() => requests.slice((this.page() - 1) * PAGE_SIZE, this.page() * PAGE_SIZE));

  readonly breadcrumb = [
    { label: 'Home', href: '#' },
    { label: 'Mijn Tilburg', href: '#' },
    { label: 'Mijn aanvragen', current: true },
  ];

  readonly faq = [
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

  navigate({ step, page }: TilburgPaginationEvent) {
    if (step === 'page' && page) this.page.set(page);
    if (step === 'first') this.page.set(1);
    if (step === 'previous') this.page.update((current) => Math.max(1, current - 1));
    if (step === 'next') this.page.update((current) => Math.min(this.pageCount, current + 1));
    if (step === 'last') this.page.set(this.pageCount);
  }
}
