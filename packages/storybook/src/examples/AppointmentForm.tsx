/* Example page "Afspraak maken", modelled on the appointment form of the municipality of Tilburg
   (winkel.tilburg.nl, "Afspraak maken" without DigiD): the choice for DigiD, step 1 "Soort afspraak" with its
   follow-up questions and step 2 "Datum en tijd". Built only from Tilburg components. The same page as the HLTsamen
   example, in the Tilburg page frame. */
import {
  Alert,
  Button,
  ButtonGroup,
  Combobox,
  type ComboboxItem,
  Fieldset,
  FormField,
  FormLabel,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Paragraph,
  ProgressBar,
  RadioButton,
  UnorderedList,
  UnorderedListItem,
} from '@gemeente-tilburg/components-react';
import { type FormEvent, type ReactNode, useState } from 'react';
import { ExamplePage } from './layout';

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

/* Example locations, dates and times: the real form shows what is available. */
const locations = ['Stadswinkel, Stadhuisplein', 'Servicepunt Reeshof'];

const toItems = (values: string[]): ComboboxItem<string>[] => values.map((value) => ({ value, label: value }));

const documentCounts = toItems(['1', '2', '3', '4', '5']);
const dates = toItems([
  '28-09-2026, maandag',
  '30-09-2026, woensdag',
  '01-10-2026, donderdag',
  '02-10-2026, vrijdag',
  '05-10-2026, maandag',
]);
const times = toItems(['09:00', '09:15', '10:30', '11:45', '14:00', '15:30']);

/** A question with radio buttons: the question is the legend of the fieldset. */
const RadioGroup = ({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}) => (
  <Fieldset>
    <legend>{legend}</legend>
    {options.map((option) => (
      <FormLabel key={option} type="radio" checked={value === option}>
        <RadioButton name={name} value={option} checked={value === option} onChange={() => onChange(option)} /> {option}
      </FormLabel>
    ))}
  </Fieldset>
);

/** A labelled combobox. */
const ComboboxField = ({
  id,
  label,
  items,
  value,
  onChange,
}: {
  id: string;
  label: string;
  items: ComboboxItem<string>[];
  value: string | null;
  onChange: (value: string | null) => void;
}) => (
  <FormField>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Combobox
      id={id}
      items={items}
      value={value}
      onChange={(next) => onChange(next ?? null)}
      placeholder="Maak een keuze"
    />
  </FormField>
);

const Step = ({
  number,
  title,
  onBack,
  children,
}: {
  number: number;
  title: string;
  onBack?: () => void;
  children: ReactNode;
}) => (
  <>
    <ProgressBar
      value={number}
      total={TOTAL_STEPS}
      label={`Stap ${number} van ${TOTAL_STEPS}`}
      title={title}
      showBack={Boolean(onBack)}
      backLabel="Vorige stap"
      onBackClick={(event) => {
        event.preventDefault();
        onBack?.();
      }}
    />
    {children}
  </>
);

export const AppointmentForm = () => {
  const [step, setStep] = useState(0);
  const [login, setLogin] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [count, setCount] = useState<string | null>('1');
  const [refugee, setRefugee] = useState<string | null>('Nee');
  const [location, setLocation] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const next = (event: FormEvent) => {
    event.preventDefault();
    setStep(step + 1);
  };

  return (
    <ExamplePage>
      <form className="tilburg-example__column tilburg-example__stack" onSubmit={next}>
        <Heading1>Afspraak maken</Heading1>

        {step === 0 && (
          <>
            <Paragraph>
              De gemeente werkt alleen op afspraak. Wanneer uw nieuwe paspoort, identiteitskaart of rijbewijs klaar
              ligt, kunt u wel zonder afspraak langskomen.
            </Paragraph>
            <Heading2>Inloggen</Heading2>
            <Paragraph>U kunt inloggen met DigiD.</Paragraph>
            <RadioGroup
              legend="Afspraak maken"
              name="login"
              options={['met DigiD', 'zonder DigiD']}
              value={login}
              onChange={setLogin}
            />
            <ButtonGroup className="tilburg-example__actions">
              <Button appearance="primary-action-button" type="submit" disabled={!login}>
                Verder
              </Button>
            </ButtonGroup>
          </>
        )}

        {step === 1 && (
          <Step number={1} title="Soort afspraak">
            <Heading2>Afspraak</Heading2>
            <RadioGroup
              legend="Waarvoor wilt u een afspraak maken?"
              name="type"
              options={appointmentTypes}
              value={type}
              onChange={setType}
            />
            {type === PASSPORT && (
              <>
                <ComboboxField
                  id="tilburg-appointment-count"
                  label="Hoeveel reisdocumenten heeft u nodig?"
                  items={documentCounts}
                  value={count}
                  onChange={setCount}
                />
                <RadioGroup
                  legend="Gaat het om een vreemdelingen- of vluchtelingenpaspoort?"
                  name="refugee"
                  options={['Ja', 'Nee']}
                  value={refugee}
                  onChange={setRefugee}
                />
                <RadioGroup
                  legend="Naar welke locatie komt u?"
                  name="location"
                  options={locations}
                  value={location}
                  onChange={setLocation}
                />
                <Paragraph>Let op, het aanvragen en ophalen doet u op dezelfde locatie.</Paragraph>
                <Heading3>Paspoort/ID-kaart - Let op:</Heading3>
                <UnorderedList>
                  <UnorderedListItem>
                    Zonder de juiste papieren kunt u geen paspoort of identiteitskaart aanvragen.
                  </UnorderedListItem>
                  <UnorderedListItem>
                    Het aanvragen én ophalen moet u zelf doen. Bij een aanvraag voor uw kind moet uw kind zelf ook mee
                    komen bij het aanvragen en ophalen.
                  </UnorderedListItem>
                  <UnorderedListItem>
                    Het nieuwe reisdocument ligt voor u klaar vanaf 5 werkdagen na uw aanvraag.
                  </UnorderedListItem>
                </UnorderedList>
                <Paragraph>
                  <Link href="#">Lees meer over reisdocumenten</Link>
                </Paragraph>
              </>
            )}
            {!type && <Paragraph>Staat uw afspraak hier niet bij? Bel ons dan op 14 013.</Paragraph>}
            {type && (
              <ButtonGroup className="tilburg-example__actions">
                <Button appearance="primary-action-button" type="submit" disabled={type === PASSPORT && !location}>
                  Verder
                </Button>
              </ButtonGroup>
            )}
          </Step>
        )}

        {step === 2 && (
          <Step number={2} title="Datum en tijd" onBack={() => setStep(1)}>
            <ComboboxField
              id="tilburg-appointment-date"
              label="Datum afspraak"
              items={dates}
              value={date}
              onChange={(value) => {
                setDate(value);
                setTime(null);
              }}
            />
            {date && (
              <ComboboxField
                id="tilburg-appointment-time"
                label="Tijdstip afspraak"
                items={times}
                value={time}
                onChange={setTime}
              />
            )}
            <ButtonGroup className="tilburg-example__actions">
              <Button appearance="secondary-action-button" type="button" onClick={() => setStep(1)}>
                Terug
              </Button>
              {time && (
                <Button appearance="primary-action-button" type="submit">
                  Verder
                </Button>
              )}
            </ButtonGroup>
          </Step>
        )}

        {step >= 3 && (
          <Step number={3} title="Gegevens" onBack={() => setStep(2)}>
            <Alert variant="info" title="Einde van het voorbeeld">
              Stap 3 tot en met 6 zijn niet nagebouwd. Het voorbeeld <em>Melding openbare ruimte</em> laat zien hoe je
              gegevens vraagt, controleert en verstuurt.
            </Alert>
            <ButtonGroup className="tilburg-example__actions">
              <Button appearance="secondary-action-button" type="button" onClick={() => setStep(0)}>
                Opnieuw beginnen
              </Button>
            </ButtonGroup>
          </Step>
        )}
      </form>
    </ExamplePage>
  );
};
