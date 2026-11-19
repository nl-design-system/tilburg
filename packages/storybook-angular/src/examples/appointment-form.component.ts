/* Example page "Afspraak maken", modelled on the appointment form of the municipality of Tilburg
   (winkel.tilburg.nl, "Afspraak maken" without DigiD): the choice for DigiD, step 1 "Soort afspraak" with its
   follow-up questions and step 2 "Datum en tijd". Built only from Tilburg components. */
import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TilburgComponentsModule } from '@gemeente-tilburg/components-angular';
import { ExamplePage } from './layout.component';

const TOTAL_STEPS = 6;

const appointmentTypes = [
  'Aanvraag paspoort of ID-kaart',
  'Aanvraag rijbewijs',
  'Aanvraag paspoort/identiteitskaart/rijbewijs na vermissing',
  'Bewijs in leven/Attestatie de vita',
  'Naamskeuze kind',
  'Erkennen (ongeboren) kind',
  'Garantstelling/legaliseren handtekening',
  'Geboorteaangifte',
  'Inleveren documenten',
  'Uittreksel/akte',
  'Verhuizen',
  'Verklaring omtrent gedrag',
  'Vertrek naar het buitenland',
];

const PASSPORT = appointmentTypes[0];

/* Step 3 to 6 are not built: every step from 3 on shows step 3. */
const stepTitles = ['Soort afspraak', 'Datum en tijd', 'Gegevens'];

const toItems = (values: string[]) => values.map((value) => ({ value, label: value }));

/** A question with radio buttons: the question is the legend of the fieldset. */
@Component({
  selector: 'tilburg-example-radio-group',
  imports: [TilburgComponentsModule],
  template: `
    <tilburg-fieldset>
      <legend>{{ legend }}</legend>
      @for (option of options; track option) {
        <tilburg-form-label type="radio" [checked]="value === option">
          <tilburg-radio-button
            [name]="name"
            [value]="option"
            [checked]="value === option"
            (change)="valueChange.emit(option)"
          />
          {{ option }}
        </tilburg-form-label>
      }
    </tilburg-fieldset>
  `,
})
export class ExampleRadioGroup {
  @Input() legend = '';
  @Input() name = '';
  @Input() options: string[] = [];
  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'tilburg-example-appointment-form',
  imports: [TilburgComponentsModule, ExamplePage, ExampleRadioGroup],
  template: `
    <tilburg-example-page>
      <form class="tilburg-example__column tilburg-example__stack" (submit)="next($event)">
        <tilburg-heading-1>Afspraak maken</tilburg-heading-1>

        @if (step() === 0) {
          <tilburg-paragraph>
            De gemeente werkt alleen op afspraak. Wanneer uw nieuwe paspoort, identiteitskaart of rijbewijs klaar ligt,
            kunt u wel zonder afspraak langskomen.
          </tilburg-paragraph>
          <tilburg-heading-2>Inloggen</tilburg-heading-2>
          <tilburg-paragraph>U kunt inloggen met DigiD.</tilburg-paragraph>
          <tilburg-example-radio-group
            legend="Afspraak maken"
            name="login"
            [options]="['met DigiD', 'zonder DigiD']"
            [value]="login()"
            (valueChange)="login.set($event)"
          />
          <tilburg-button-group class="tilburg-example__actions">
            <tilburg-button appearance="primary-action-button" type="submit" [disabled]="!login()">
              Verder
            </tilburg-button>
          </tilburg-button-group>
        } @else {
          <tilburg-progress-bar
            [value]="shownStep()"
            [total]="totalSteps"
            [label]="'Stap ' + shownStep() + ' van ' + totalSteps"
            [title]="stepTitles[shownStep() - 1]"
            [showBack]="shownStep() > 1"
            backLabel="Vorige stap"
            (backClick)="step.set(shownStep() - 1)"
          />
        }

        @if (step() === 1) {
          <tilburg-heading-2>Afspraak</tilburg-heading-2>
          <tilburg-example-radio-group
            legend="Waarvoor wilt u een afspraak maken?"
            name="type"
            [options]="appointmentTypes"
            [value]="type()"
            (valueChange)="type.set($event)"
          />
          @if (type() === passport) {
            <tilburg-form-field>
              <tilburg-form-label for="tilburg-appointment-count">
                Hoeveel reisdocumenten heeft u nodig?
              </tilburg-form-label>
              <tilburg-combobox
                id="tilburg-appointment-count"
                [items]="documentCounts"
                bindLabel="label"
                [control]="count"
                placeholder="Maak een keuze"
              />
            </tilburg-form-field>
            <tilburg-example-radio-group
              legend="Gaat het om een vreemdelingen- of vluchtelingenpaspoort?"
              name="refugee"
              [options]="['Ja', 'Nee']"
              [value]="refugee()"
              (valueChange)="refugee.set($event)"
            />
            <tilburg-example-radio-group
              legend="Naar welke locatie komt u?"
              name="location"
              [options]="locations"
              [value]="location()"
              (valueChange)="location.set($event)"
            />
            <tilburg-paragraph>Let op, het aanvragen en ophalen doet u op dezelfde locatie.</tilburg-paragraph>
            <tilburg-heading-3>Paspoort/ID-kaart - Let op:</tilburg-heading-3>
            <tilburg-unordered-list>
              <li>Zonder de juiste papieren kunt u geen paspoort of identiteitskaart aanvragen.</li>
              <li>
                Het aanvragen én ophalen moet u zelf doen. Bij een aanvraag voor uw kind moet uw kind zelf ook mee komen
                bij het aanvragen en ophalen.
              </li>
              <li>Het nieuwe reisdocument ligt voor u klaar vanaf 5 werkdagen na uw aanvraag.</li>
            </tilburg-unordered-list>
            <tilburg-paragraph><tilburg-link href="#">Lees meer over reisdocumenten</tilburg-link></tilburg-paragraph>
          }
          @if (type()) {
            <tilburg-button-group class="tilburg-example__actions">
              <tilburg-button
                appearance="primary-action-button"
                type="submit"
                [disabled]="type() === passport && !location()"
              >
                Verder
              </tilburg-button>
            </tilburg-button-group>
          } @else {
            <tilburg-paragraph>Staat uw afspraak hier niet bij? Bel ons dan op 14 013.</tilburg-paragraph>
          }
        }

        @if (step() === 2) {
          <tilburg-form-field>
            <tilburg-form-label for="tilburg-appointment-date">Datum afspraak</tilburg-form-label>
            <tilburg-combobox
              id="tilburg-appointment-date"
              [items]="dates"
              bindLabel="label"
              [control]="date"
              placeholder="Maak een keuze"
              (valueChange)="dateChanged($event)"
            />
          </tilburg-form-field>
          @if (chosenDate()) {
            <tilburg-form-field>
              <tilburg-form-label for="tilburg-appointment-time">Tijdstip afspraak</tilburg-form-label>
              <tilburg-combobox
                id="tilburg-appointment-time"
                [items]="times"
                bindLabel="label"
                [control]="time"
                placeholder="Maak een keuze"
                (valueChange)="chosenTime.set($event)"
              />
            </tilburg-form-field>
          }
          <tilburg-button-group class="tilburg-example__actions">
            <tilburg-button appearance="secondary-action-button" (click)="step.set(1)">Terug</tilburg-button>
            @if (chosenTime()) {
              <tilburg-button appearance="primary-action-button" type="submit">Verder</tilburg-button>
            }
          </tilburg-button-group>
        }

        @if (step() >= 3) {
          <tilburg-alert variant="info" [title]="'Einde van het voorbeeld'">
            Stap 3 tot en met 6 zijn niet nagebouwd. Het voorbeeld <em>Melding openbare ruimte</em> laat zien hoe je
            gegevens vraagt, controleert en verstuurt.
          </tilburg-alert>
          <tilburg-button-group class="tilburg-example__actions">
            <tilburg-button appearance="secondary-action-button" (click)="step.set(0)">Opnieuw beginnen</tilburg-button>
          </tilburg-button-group>
        }
      </form>
    </tilburg-example-page>
  `,
})
export class AppointmentForm {
  readonly totalSteps = TOTAL_STEPS;
  readonly stepTitles = stepTitles;
  readonly appointmentTypes = appointmentTypes;
  readonly passport = PASSPORT;

  /* Example locations, dates and times: the real form shows what is available. */
  readonly locations = ['Stadswinkel, Stadhuisplein', 'Servicepunt Reeshof'];
  readonly documentCounts = toItems(['1', '2', '3', '4', '5']);
  readonly dates = toItems([
    '28-09-2026, maandag',
    '30-09-2026, woensdag',
    '01-10-2026, donderdag',
    '02-10-2026, vrijdag',
    '05-10-2026, maandag',
  ]);
  readonly times = toItems(['09:00', '09:15', '10:30', '11:45', '14:00', '15:30']);

  readonly step = signal(0);
  readonly shownStep = computed(() => Math.min(this.step(), stepTitles.length));
  readonly login = signal<string | null>(null);
  readonly type = signal<string | null>(null);
  readonly refugee = signal<string | null>('Nee');
  readonly location = signal<string | null>(null);

  /* The combobox keeps its selection in a FormControl; the signals next to them are what the template reacts to. */
  readonly count = new FormControl<string | null>('1');
  readonly date = new FormControl<string | null>(null);
  readonly time = new FormControl<string | null>(null);
  readonly chosenDate = signal<unknown>(null);
  readonly chosenTime = signal<unknown>(null);

  next(event: Event) {
    event.preventDefault();
    this.step.update((step) => step + 1);
  }

  dateChanged(date: unknown) {
    this.chosenDate.set(date);
    this.time.setValue(null);
    this.chosenTime.set(null);
  }
}
