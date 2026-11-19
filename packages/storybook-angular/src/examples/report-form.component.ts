/* Example page "Melding openbare ruimte": a three-step form (what, contact details, check) that shows the form
   patterns the appointment example does not: text fields with a description, validation with an error summary,
   checking the answers in a data list, confirming in a modal, a loading spinner while sending and a confirmation.
   Built only from Tilburg components. Nothing is sent: the "server" is a timeout. */
import { Component, computed, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TilburgComponentsModule } from '@gemeente-tilburg/components-angular';
import { ExamplePage } from './layout.component';

const SEND_DELAY_MS = 1500;
const DESCRIPTION_MAX = 500;

const steps = ['Uw melding', 'Uw gegevens', 'Controleren'];

type FieldName = 'category' | 'description' | 'location' | 'name' | 'email' | 'truthful';
type Errors = Partial<Record<FieldName, string>>;

const fieldId = (name: FieldName) => `tilburg-report-${name}`;
const errorId = (name: FieldName) => `${fieldId(name)}-error`;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A labelled text field (the projected `tilburg-textbox` or `tilburg-textarea`) with an optional description and its
 *  error message. */
@Component({
  selector: 'tilburg-example-text-field',
  imports: [TilburgComponentsModule],
  template: `
    <tilburg-form-field [invalid]="!!error">
      <tilburg-form-label [for]="id">{{ label }}</tilburg-form-label>
      @if (description) {
        <tilburg-form-field-description [id]="id + '-description'">{{ description }}</tilburg-form-field-description>
      }
      <ng-content />
      @if (error) {
        <tilburg-validation-message [attr.id]="id + '-error'" type="error">{{ error }}</tilburg-validation-message>
      }
    </tilburg-form-field>
  `,
})
export class ExampleTextField {
  /** The id of the projected control. */
  @Input() id = '';
  @Input() label = '';
  @Input() description?: string;
  @Input() error?: string;
}

@Component({
  selector: 'tilburg-example-report-form',
  imports: [TilburgComponentsModule, ExamplePage, ExampleTextField],
  template: `
    <tilburg-example-page>
      <tilburg-breadcrumb [items]="breadcrumb" />
      <div class="tilburg-example__column tilburg-example__stack">
        <tilburg-heading-1>Melding openbare ruimte</tilburg-heading-1>

        @if (reference()) {
          <tilburg-alert variant="success" [title]="'Bedankt voor uw melding'" [headingLevel]="2">
            <tilburg-paragraph>
              Uw melding heeft nummer <strong>{{ reference() }}</strong
              >. We sturen een bevestiging naar {{ email.value }}.
            </tilburg-paragraph>
          </tilburg-alert>
          <tilburg-paragraph>
            We handelen de meeste meldingen binnen 5 werkdagen af.
            @if (updates()) {
              U krijgt een e-mail als de status verandert.
            }
          </tilburg-paragraph>
          <tilburg-paragraph><tilburg-link href="#">Terug naar de homepage</tilburg-link></tilburg-paragraph>
        } @else {
          <form (submit)="submitStep($event)" novalidate class="tilburg-example__stack">
            <tilburg-progress-bar
              [value]="step() + 1"
              [total]="steps.length"
              [label]="'Stap ' + (step() + 1) + ' van ' + steps.length"
              [title]="steps[step()]"
              [showBack]="step() > 0"
              backLabel="Vorige stap"
              (backClick)="goTo(step() - 1)"
            />

            <!-- The error summary above the form: every message links to its field. It takes focus when it appears. -->
            @if (errorList().length) {
              <div #summary tabindex="-1">
                <tilburg-alert variant="danger" [title]="'Controleer het formulier'" [headingLevel]="2">
                  <tilburg-unordered-list>
                    @for (error of errorList(); track error.name) {
                      <li>
                        <tilburg-link [href]="'#' + fieldId(error.name)">{{ error.message }}</tilburg-link>
                      </li>
                    }
                  </tilburg-unordered-list>
                </tilburg-alert>
              </div>
            }

            @if (step() === 0) {
              <tilburg-paragraph>
                Ziet u iets op straat dat kapot, vies of gevaarlijk is? Meld het hier. Bij gevaar belt u 112.
              </tilburg-paragraph>
              <tilburg-fieldset [attr.id]="fieldId('category')" [invalid]="!!errors().category">
                <legend>Wat wilt u melden?</legend>
                @for (option of categories; track option) {
                  <tilburg-form-label type="radio" [checked]="category() === option">
                    <tilburg-radio-button
                      name="category"
                      [value]="option"
                      [checked]="category() === option"
                      [invalid]="!!errors().category"
                      [ariaDescribedBy]="errors().category ? errorId('category') : undefined"
                      (change)="category.set(option)"
                    />
                    {{ option }}
                  </tilburg-form-label>
                }
                @if (errors().category; as error) {
                  <tilburg-validation-message [attr.id]="errorId('category')" type="error">{{
                    error
                  }}</tilburg-validation-message>
                }
              </tilburg-fieldset>
              <tilburg-example-text-field
                [id]="fieldId('description')"
                label="Wat is er aan de hand?"
                [description]="descriptionHint"
                [error]="errors().description"
              >
                <tilburg-textarea
                  [id]="fieldId('description')"
                  [rows]="5"
                  [control]="description"
                  [invalid]="!!errors().description"
                  [ariaDescribedBy]="describedBy('description', true)"
                />
              </tilburg-example-text-field>
              <tilburg-example-text-field
                [id]="fieldId('location')"
                label="Waar is het?"
                description="Straat en huisnummer, of een plek in de buurt."
                [error]="errors().location"
              >
                <tilburg-textbox
                  [id]="fieldId('location')"
                  [control]="location"
                  [invalid]="!!errors().location"
                  [ariaDescribedBy]="describedBy('location', true)"
                  autocomplete="street-address"
                />
              </tilburg-example-text-field>
            }

            @if (step() === 1) {
              <tilburg-paragraph>
                We gebruiken uw gegevens alleen om u op de hoogte te houden van deze melding.
              </tilburg-paragraph>
              <tilburg-example-text-field [id]="fieldId('name')" label="Naam (niet verplicht)">
                <tilburg-textbox [id]="fieldId('name')" [control]="name" autocomplete="name" />
              </tilburg-example-text-field>
              <tilburg-example-text-field [id]="fieldId('email')" label="E-mailadres" [error]="errors().email">
                <tilburg-textbox
                  [id]="fieldId('email')"
                  type="email"
                  [control]="email"
                  [invalid]="!!errors().email"
                  [ariaDescribedBy]="describedBy('email')"
                  autocomplete="email"
                />
              </tilburg-example-text-field>
              <tilburg-form-field type="checkbox">
                <tilburg-form-label type="checkbox" [checked]="updates()">
                  <tilburg-checkbox [checked]="updates()" (checkChanged)="updates.set(isChecked($event))" />
                  Stuur mij een e-mail als de status van mijn melding verandert
                </tilburg-form-label>
              </tilburg-form-field>
            }

            @if (step() === 2) {
              <tilburg-heading-2>Uw melding</tilburg-heading-2>
              <tilburg-data-list>
                <tilburg-data-list-item>
                  <tilburg-data-list-key>Wat</tilburg-data-list-key>
                  <tilburg-data-list-value>{{ category() }}</tilburg-data-list-value>
                </tilburg-data-list-item>
                <tilburg-data-list-item>
                  <tilburg-data-list-key>Omschrijving</tilburg-data-list-key>
                  <tilburg-data-list-value>{{ description.value }}</tilburg-data-list-value>
                </tilburg-data-list-item>
                <tilburg-data-list-item>
                  <tilburg-data-list-key>Waar</tilburg-data-list-key>
                  <tilburg-data-list-value>{{ location.value }}</tilburg-data-list-value>
                </tilburg-data-list-item>
              </tilburg-data-list>
              <tilburg-paragraph>
                <tilburg-link href="#" (click)="$event.preventDefault(); goTo(0)">Melding wijzigen</tilburg-link>
              </tilburg-paragraph>
              <tilburg-heading-2>Uw gegevens</tilburg-heading-2>
              <tilburg-data-list>
                <tilburg-data-list-item>
                  <tilburg-data-list-key>Naam</tilburg-data-list-key>
                  <tilburg-data-list-value>{{ name.value || 'Niet ingevuld' }}</tilburg-data-list-value>
                </tilburg-data-list-item>
                <tilburg-data-list-item>
                  <tilburg-data-list-key>E-mailadres</tilburg-data-list-key>
                  <tilburg-data-list-value>{{ email.value }}</tilburg-data-list-value>
                </tilburg-data-list-item>
                <tilburg-data-list-item>
                  <tilburg-data-list-key>Updates per e-mail</tilburg-data-list-key>
                  <tilburg-data-list-value>{{ updates() ? 'Ja' : 'Nee' }}</tilburg-data-list-value>
                </tilburg-data-list-item>
              </tilburg-data-list>
              <tilburg-paragraph>
                <tilburg-link href="#" (click)="$event.preventDefault(); goTo(1)">Gegevens wijzigen</tilburg-link>
              </tilburg-paragraph>
              <tilburg-form-field type="checkbox" [invalid]="!!errors().truthful">
                <tilburg-form-label type="checkbox" [checked]="truthful()">
                  <tilburg-checkbox
                    [id]="fieldId('truthful')"
                    [checked]="truthful()"
                    [invalid]="!!errors().truthful"
                    [ariaDescribedBy]="describedBy('truthful')"
                    (checkChanged)="truthful.set(isChecked($event))"
                  />
                  Ik heb alles naar waarheid ingevuld
                </tilburg-form-label>
                @if (errors().truthful; as error) {
                  <tilburg-validation-message [attr.id]="errorId('truthful')" type="error">{{
                    error
                  }}</tilburg-validation-message>
                }
              </tilburg-form-field>
            }

            <tilburg-button-group class="tilburg-example__actions">
              @if (step() > 0) {
                <tilburg-button appearance="secondary-action-button" (click)="goTo(step() - 1)">Vorige</tilburg-button>
              }
              <tilburg-button appearance="primary-action-button" type="submit">
                {{ step() < steps.length - 1 ? 'Volgende' : 'Melding versturen' }}
              </tilburg-button>
            </tilburg-button-group>
          </form>
        }
      </div>

      <tilburg-modal [title]="'Melding versturen?'" [open]="confirming()" (closed)="confirming.set(false)">
        <tilburg-paragraph>Na het versturen kunt u de melding niet meer wijzigen.</tilburg-paragraph>
        <tilburg-button-group slot="footer">
          <tilburg-button appearance="primary-action-button" (click)="send()">Versturen</tilburg-button>
          <tilburg-button appearance="secondary-action-button" (click)="confirming.set(false)">
            Nog even controleren
          </tilburg-button>
        </tilburg-button-group>
      </tilburg-modal>

      <tilburg-loading-spinner
        [visible]="sending()"
        [delayMs]="0"
        [title]="'Melding versturen'"
        message="Een moment geduld…"
      />
    </tilburg-example-page>
  `,
})
export class ReportForm {
  readonly steps = steps;
  readonly categories = ['Afval of zwerfvuil', 'Straatverlichting', 'Losse of kapotte stoeptegel', 'Iets anders'];
  readonly descriptionHint = `Bijvoorbeeld: welke lantaarnpaal, hoe groot is de stapel afval. Maximaal ${DESCRIPTION_MAX} tekens.`;
  readonly fieldId = fieldId;
  readonly errorId = errorId;

  readonly breadcrumb = [
    { label: 'Home', href: '#' },
    { label: 'Melden', href: '#' },
    { label: 'Melding openbare ruimte', current: true },
  ];

  readonly step = signal(0);
  readonly category = signal('');
  readonly updates = signal(true);
  readonly truthful = signal(false);
  /* The text fields keep their value in a FormControl, which is how `tilburg-textbox` and `tilburg-textarea` take one. */
  readonly description = new FormControl('', { nonNullable: true });
  readonly location = new FormControl('', { nonNullable: true });
  readonly name = new FormControl('', { nonNullable: true });
  readonly email = new FormControl('', { nonNullable: true });

  readonly errors = signal<Errors>({});
  readonly errorList = computed(() =>
    (Object.entries(this.errors()) as [FieldName, string][]).map(([name, message]) => ({ name, message })),
  );
  readonly confirming = signal(false);
  readonly sending = signal(false);
  readonly reference = signal<string | null>(null);

  @ViewChild('summary') private summary?: ElementRef<HTMLElement>;

  isChecked(event: Event) {
    return (event.target as HTMLInputElement).checked;
  }

  /** The ids a control is described by: its description (if it has one) and its error message (if there is one). */
  describedBy(name: FieldName, description = false) {
    return (
      [description && `${fieldId(name)}-description`, this.errors()[name] && errorId(name)].filter(Boolean).join(' ') ||
      undefined
    );
  }

  goTo(target: number) {
    this.errors.set({});
    this.step.set(target);
  }

  submitStep(event: Event) {
    event.preventDefault();
    const found = this.validate();
    this.errors.set(found);
    if (Object.keys(found).length > 0) {
      /* After the summary is rendered. */
      setTimeout(() => this.summary?.nativeElement.focus());
      return;
    }
    if (this.step() < steps.length - 1) this.step.update((step) => step + 1);
    else this.confirming.set(true);
  }

  send() {
    this.confirming.set(false);
    this.sending.set(true);
    setTimeout(() => {
      this.sending.set(false);
      this.reference.set(`M-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`);
    }, SEND_DELAY_MS);
  }

  private validate(): Errors {
    const errors: Errors = {};
    if (this.step() === 0) {
      if (!this.category()) errors.category = 'Kies wat u wilt melden.';
      if (!this.description.value.trim()) errors.description = 'Beschrijf wat er aan de hand is.';
      else if (this.description.value.length > DESCRIPTION_MAX)
        errors.description = `Gebruik maximaal ${DESCRIPTION_MAX} tekens.`;
      if (!this.location.value.trim()) errors.location = 'Vul in waar het is.';
    }
    if (this.step() === 1) {
      if (!this.email.value.trim()) errors.email = 'Vul uw e-mailadres in.';
      else if (!EMAIL.test(this.email.value)) errors.email = 'Vul een e-mailadres in zoals naam@voorbeeld.nl.';
    }
    if (this.step() === 2 && !this.truthful()) errors.truthful = 'Bevestig dat u alles naar waarheid heeft ingevuld.';
    return errors;
  }
}
