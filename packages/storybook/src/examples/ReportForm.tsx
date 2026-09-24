/* Example page "Melding openbare ruimte": a three-step form (what, contact details, check) that shows the form
   patterns the appointment example does not: text fields with a description, validation with an error summary,
   checking the answers in a data list, confirming in a modal, a loading spinner while sending and a confirmation.
   Built only from Tilburg components. Nothing is sent: the "server" is a timeout. */
import {
  Alert,
  Breadcrumb,
  Button,
  ButtonGroup,
  Checkbox,
  DataList,
  DataListItem,
  DataListKey,
  DataListValue,
  Fieldset,
  FormField,
  FormFieldDescription,
  FormLabel,
  Heading1,
  Heading2,
  Link,
  LoadingSpinner,
  Modal,
  Paragraph,
  ProgressBar,
  RadioButton,
  Textarea,
  Textbox,
  UnorderedList,
  UnorderedListItem,
  ValidationMessage,
} from '@gemeente-tilburg/components-react';
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { ExamplePage } from './layout';

const SEND_DELAY_MS = 1500;
const DESCRIPTION_MAX = 500;

const categories = ['Afval of zwerfvuil', 'Straatverlichting', 'Losse of kapotte stoeptegel', 'Iets anders'];

const steps = ['Uw melding', 'Uw gegevens', 'Controleren'] as const;

interface Answers {
  category: string;
  description: string;
  location: string;
  name: string;
  email: string;
  updates: boolean;
}

type FieldName = keyof Answers | 'truthful';
type Errors = Partial<Record<FieldName, string>>;

const fieldId = (name: FieldName) => `tilburg-report-${name}`;
const errorId = (name: FieldName) => `${fieldId(name)}-error`;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateStep = (step: number, answers: Answers, truthful: boolean): Errors => {
  const errors: Errors = {};
  if (step === 0) {
    if (!answers.category) errors.category = 'Kies wat u wilt melden.';
    if (!answers.description.trim()) errors.description = 'Beschrijf wat er aan de hand is.';
    else if (answers.description.length > DESCRIPTION_MAX)
      errors.description = `Gebruik maximaal ${DESCRIPTION_MAX} tekens.`;
    if (!answers.location.trim()) errors.location = 'Vul in waar het is.';
  }
  if (step === 1) {
    if (!answers.email.trim()) errors.email = 'Vul uw e-mailadres in.';
    else if (!EMAIL.test(answers.email)) errors.email = 'Vul een e-mailadres in zoals naam@voorbeeld.nl.';
  }
  if (step === 2 && !truthful) errors.truthful = 'Bevestig dat u alles naar waarheid heeft ingevuld.';
  return errors;
};

/** The error summary above the form: every message links to its field. It takes focus when it appears. */
const ErrorSummary = ({ errors }: { errors: Errors }) => {
  const ref = useRef<HTMLDivElement>(null);
  const entries = Object.entries(errors) as [FieldName, string][];

  useEffect(() => ref.current?.focus(), [errors]);

  return (
    <div ref={ref} tabIndex={-1}>
      <Alert variant="danger" title="Controleer het formulier" headingLevel={2}>
        <UnorderedList>
          {entries.map(([name, message]) => (
            <UnorderedListItem key={name}>
              <Link href={`#${fieldId(name)}`}>{message}</Link>
            </UnorderedListItem>
          ))}
        </UnorderedList>
      </Alert>
    </div>
  );
};

/** A labelled text field (`Textbox` or `Textarea`) with an optional description and its error message. */
const TextField = ({
  name,
  label,
  description,
  error,
  children,
}: {
  name: FieldName;
  label: string;
  description?: string;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  children: (describedBy: string | undefined) => ReactNode;
}) => {
  const describedBy =
    [description && `${fieldId(name)}-description`, error && errorId(name)].filter(Boolean).join(' ') || undefined;
  return (
    <FormField invalid={Boolean(error)}>
      <FormLabel htmlFor={fieldId(name)}>{label}</FormLabel>
      {description && <FormFieldDescription id={`${fieldId(name)}-description`}>{description}</FormFieldDescription>}
      {children(describedBy)}
      {error && (
        <ValidationMessage id={errorId(name)} type="error">
          {error}
        </ValidationMessage>
      )}
    </FormField>
  );
};

export const ReportForm = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    category: '',
    description: '',
    location: '',
    name: '',
    email: '',
    updates: true,
  });
  const [truthful, setTruthful] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => setAnswers((prev) => ({ ...prev, [key]: value }));

  const goTo = (target: number) => {
    setErrors({});
    setStep(target);
  };

  const submitStep = (event: FormEvent) => {
    event.preventDefault();
    const found = validateStep(step, answers, truthful);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (step < steps.length - 1) setStep(step + 1);
    else setConfirming(true);
  };

  const send = () => {
    setConfirming(false);
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setReference(`M-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`);
    }, SEND_DELAY_MS);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <ExamplePage>
      <Breadcrumb
        items={[
          { label: 'Home', href: '#' },
          { label: 'Melden', href: '#' },
          { label: 'Melding openbare ruimte', current: true },
        ]}
      />
      <div className="tilburg-example__column tilburg-example__stack">
        <Heading1>Melding openbare ruimte</Heading1>

        {reference ? (
          <>
            <Alert variant="success" title="Bedankt voor uw melding" headingLevel={2}>
              <Paragraph>
                Uw melding heeft nummer <strong>{reference}</strong>. We sturen een bevestiging naar {answers.email}.
              </Paragraph>
            </Alert>
            <Paragraph>
              We handelen de meeste meldingen binnen 5 werkdagen af.
              {answers.updates && ' U krijgt een e-mail als de status verandert.'}
            </Paragraph>
            <Paragraph>
              <Link href="#">Terug naar de homepage</Link>
            </Paragraph>
          </>
        ) : (
          <form onSubmit={submitStep} noValidate className="tilburg-example__stack">
            <ProgressBar
              value={step + 1}
              total={steps.length}
              label={`Stap ${step + 1} van ${steps.length}`}
              title={steps[step]}
              showBack={step > 0}
              backLabel="Vorige stap"
              onBackClick={(event) => {
                event.preventDefault();
                goTo(step - 1);
              }}
            />

            {hasErrors && <ErrorSummary errors={errors} />}

            {step === 0 && (
              <>
                <Paragraph>
                  Ziet u iets op straat dat kapot, vies of gevaarlijk is? Meld het hier. Bij gevaar belt u 112.
                </Paragraph>
                <Fieldset id={fieldId('category')} invalid={Boolean(errors.category)}>
                  <legend>Wat wilt u melden?</legend>
                  {categories.map((category) => (
                    <FormLabel key={category} type="radio" checked={answers.category === category}>
                      <RadioButton
                        name="category"
                        value={category}
                        checked={answers.category === category}
                        invalid={Boolean(errors.category)}
                        aria-describedby={errors.category ? errorId('category') : undefined}
                        onChange={() => set('category', category)}
                      />{' '}
                      {category}
                    </FormLabel>
                  ))}
                  {errors.category && (
                    <ValidationMessage id={errorId('category')} type="error">
                      {errors.category}
                    </ValidationMessage>
                  )}
                </Fieldset>
                <TextField
                  name="description"
                  label="Wat is er aan de hand?"
                  description={`Bijvoorbeeld: welke lantaarnpaal, hoe groot is de stapel afval. Maximaal ${DESCRIPTION_MAX} tekens.`}
                  error={errors.description}
                >
                  {(describedBy) => (
                    <Textarea
                      id={fieldId('description')}
                      rows={5}
                      value={answers.description}
                      invalid={Boolean(errors.description)}
                      aria-describedby={describedBy}
                      onChange={(event) => set('description', event.target.value)}
                    />
                  )}
                </TextField>
                <TextField
                  name="location"
                  label="Waar is het?"
                  description="Straat en huisnummer, of een plek in de buurt."
                  error={errors.location}
                >
                  {(describedBy) => (
                    <Textbox
                      id={fieldId('location')}
                      value={answers.location}
                      invalid={Boolean(errors.location)}
                      aria-describedby={describedBy}
                      autoComplete="street-address"
                      onChange={(event) => set('location', event.target.value)}
                    />
                  )}
                </TextField>
              </>
            )}

            {step === 1 && (
              <>
                <Paragraph>We gebruiken uw gegevens alleen om u op de hoogte te houden van deze melding.</Paragraph>
                <TextField name="name" label="Naam (niet verplicht)">
                  {(describedBy) => (
                    <Textbox
                      id={fieldId('name')}
                      value={answers.name}
                      aria-describedby={describedBy}
                      autoComplete="name"
                      onChange={(event) => set('name', event.target.value)}
                    />
                  )}
                </TextField>
                <TextField name="email" label="E-mailadres" error={errors.email}>
                  {(describedBy) => (
                    <Textbox
                      id={fieldId('email')}
                      type="email"
                      value={answers.email}
                      invalid={Boolean(errors.email)}
                      aria-describedby={describedBy}
                      autoComplete="email"
                      onChange={(event) => set('email', event.target.value)}
                    />
                  )}
                </TextField>
                <FormField type="checkbox">
                  <FormLabel type="checkbox" checked={answers.updates}>
                    <Checkbox checked={answers.updates} onChange={(event) => set('updates', event.target.checked)} />{' '}
                    Stuur mij een e-mail als de status van mijn melding verandert
                  </FormLabel>
                </FormField>
              </>
            )}

            {step === 2 && (
              <>
                <Heading2>Uw melding</Heading2>
                <DataList>
                  <DataListItem>
                    <DataListKey>Wat</DataListKey>
                    <DataListValue>{answers.category}</DataListValue>
                  </DataListItem>
                  <DataListItem>
                    <DataListKey>Omschrijving</DataListKey>
                    <DataListValue>{answers.description}</DataListValue>
                  </DataListItem>
                  <DataListItem>
                    <DataListKey>Waar</DataListKey>
                    <DataListValue>{answers.location}</DataListValue>
                  </DataListItem>
                </DataList>
                <Paragraph>
                  <Link
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(0);
                    }}
                  >
                    Melding wijzigen
                  </Link>
                </Paragraph>
                <Heading2>Uw gegevens</Heading2>
                <DataList>
                  <DataListItem>
                    <DataListKey>Naam</DataListKey>
                    <DataListValue>{answers.name || 'Niet ingevuld'}</DataListValue>
                  </DataListItem>
                  <DataListItem>
                    <DataListKey>E-mailadres</DataListKey>
                    <DataListValue>{answers.email}</DataListValue>
                  </DataListItem>
                  <DataListItem>
                    <DataListKey>Updates per e-mail</DataListKey>
                    <DataListValue>{answers.updates ? 'Ja' : 'Nee'}</DataListValue>
                  </DataListItem>
                </DataList>
                <Paragraph>
                  <Link
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(1);
                    }}
                  >
                    Gegevens wijzigen
                  </Link>
                </Paragraph>
                <FormField type="checkbox" invalid={Boolean(errors.truthful)}>
                  <FormLabel type="checkbox" checked={truthful}>
                    <Checkbox
                      id={fieldId('truthful')}
                      checked={truthful}
                      invalid={Boolean(errors.truthful)}
                      aria-describedby={errors.truthful ? errorId('truthful') : undefined}
                      onChange={(event) => setTruthful(event.target.checked)}
                    />{' '}
                    Ik heb alles naar waarheid ingevuld
                  </FormLabel>
                  {errors.truthful && (
                    <ValidationMessage id={errorId('truthful')} type="error">
                      {errors.truthful}
                    </ValidationMessage>
                  )}
                </FormField>
              </>
            )}

            <ButtonGroup className="tilburg-example__actions">
              {step > 0 && (
                <Button appearance="secondary-action-button" type="button" onClick={() => goTo(step - 1)}>
                  Vorige
                </Button>
              )}
              <Button appearance="primary-action-button" type="submit">
                {step < steps.length - 1 ? 'Volgende' : 'Melding versturen'}
              </Button>
            </ButtonGroup>
          </form>
        )}
      </div>

      <Modal
        title="Melding versturen?"
        open={confirming}
        onClose={() => setConfirming(false)}
        footer={
          <ButtonGroup>
            <Button appearance="primary-action-button" onClick={send}>
              Versturen
            </Button>
            <Button appearance="secondary-action-button" onClick={() => setConfirming(false)}>
              Nog even controleren
            </Button>
          </ButtonGroup>
        }
      >
        <Paragraph>Na het versturen kunt u de melding niet meer wijzigen.</Paragraph>
      </Modal>

      <LoadingSpinner visible={sending} delayMs={0} title="Melding versturen" message="Een moment geduld…" />
    </ExamplePage>
  );
};
