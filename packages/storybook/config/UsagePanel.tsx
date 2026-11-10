/* Toolbar button "</> Gebruik" and the dialog it opens: how to put the component on screen into a project of your own. One tab per layer;
   per layer the install and load steps (from the layer's documentation page, passed by the preview as
   `parameters.usage`), the snippet (what the story rendered, else the one in the component description; how that
   is chosen is in CONTRIBUTING.md, "Plaatsen: afgeleid uit de story"), the HTML this story renders (read from the preview
   frame, refreshed on every render) and a stand-alone page to copy or download. The pure parts are in
   `storybook-shared/src/usage.ts`. The same file as `packages/storybook-angular/.storybook/UsagePanel.tsx`; keep the
   two in sync. */
import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Link,
  Modal,
  type SupportedLanguage,
  SyntaxHighlighter,
} from 'storybook/internal/components';
import { STORY_CHANGED, STORY_RENDERED } from 'storybook/internal/core-events';
import { useChannel, useStorybookApi, useStorybookState } from 'storybook/manager-api';
import {
  cleanStoryHtml,
  formatHtml,
  fullPage,
  hasFullPage,
  type Layer,
  LAYERS,
  layerSteps,
  renderedSnippet,
  SITES,
  type StepNote,
  storybookOf,
  storyLayer,
  storySnippet,
  type UsageDocs,
  usageSections,
} from '../../storybook-shared/src/usage';

export const USAGE_ID = 'tilburg/usage';
export const USAGE_TOOL_ID = `${USAGE_ID}/tool`;

/* What the renderer says the story rendered (the JSX of a React story, with its real values), sent on every render
   and after every change in Controls. Kept here too: it arrives when the story renders, usually before the dialog opens. */
const SNIPPET_RENDERED = 'storybook/docs/snippet-rendered';
interface Rendered {
  id: string;
  source: string;
}
let lastRendered: Rendered | null = null;

/** Toolbar button "</> Gebruik": opens the dialog. */
export const UsageTool = () => {
  const [open, setOpen] = useState(false);
  useChannel({
    [SNIPPET_RENDERED]: (event: Rendered) => {
      lastRendered = event;
    },
  });
  return (
    <>
      <IconButton
        key={USAGE_TOOL_ID}
        title="Zo zet je dit component in je project"
        active={open}
        onClick={() => setOpen(true)}
      >
        {'</>'} Gebruik
      </IconButton>
      <Modal open={open} onOpenChange={setOpen} width={960} height="85vh" ariaLabel="Gebruik">
        <Modal.Content style={{ blockSize: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
          <Modal.Header style={{ padding: '12px 16px' }}>
            <Modal.Title>Zo zet je dit component in je project</Modal.Title>
          </Modal.Header>
          {open && <UsageContent />}
        </Modal.Content>
      </Modal>
    </>
  );
};

/* Fence language → the highlighter's name for it; anything else is shown as plain text. */
const LANGUAGES: Record<string, SupportedLanguage> = {
  bash: 'bash',
  css: 'css',
  html: 'html',
  js: 'jsextra',
  json: 'json',
  jsx: 'jsx',
  scss: 'css',
  sh: 'bash',
  ts: 'typescript',
  tsx: 'tsx',
  typescript: 'typescript',
};

interface Entry {
  id: string;
  type: string;
  args?: Record<string, unknown>;
  initialArgs?: Record<string, unknown>;
  parameters?: {
    docs?: { description?: { component?: string }; source?: { originalSource?: string } };
    usage?: UsageDocs;
  };
}

/** The HTML the preview frame shows for the current story, or null when the frame cannot be read. */
const storyHtml = (): string | null => {
  const frame = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null;
  try {
    const root = frame?.contentDocument?.getElementById('storybook-root');
    return root ? formatHtml(cleanStoryHtml(root.innerHTML)) : null;
  } catch {
    return null; /* another origin (a composed Storybook) */
  }
};

const download = (name: string, text: string) => {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/html' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  a.click();
  URL.revokeObjectURL(url);
};

const Step = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <section style={{ marginBlockEnd: 20 }}>
    <h3 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px' }}>
      <span
        style={{
          background: 'currentColor',
          borderRadius: '50%',
          display: 'inline-block',
          inlineSize: 20,
          lineHeight: '20px',
          marginInlineEnd: 8,
          textAlign: 'center',
        }}
      >
        <span style={{ color: 'white' }}>{number}</span>
      </span>
      {title}
    </h3>
    {children}
  </section>
);

const Code = ({ language, children }: { language: string; children: string }) => (
  <SyntaxHighlighter language={LANGUAGES[language] ?? 'text'} copyable padded bordered>
    {children}
  </SyntaxHighlighter>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 12, lineHeight: 1.5, margin: '6px 0 0', opacity: 0.8 }}>{children}</p>
);

/* Code that is long and not the first thing to read (the story's whole HTML, the stand-alone page): closed until
   asked for, so the steps above stay in view. `open` for the tab where it is the point. */
const Fold = ({ summary, open, children }: { summary: string; open?: boolean; children: React.ReactNode }) => (
  <details open={open}>
    <summary style={{ cursor: 'pointer', fontSize: 12.5, padding: '2px 0' }}>{summary}</summary>
    {children}
  </details>
);

const lines = (text: string) => `${text.split('\n').length} regels`;

/* The prose of a step: a paragraph each at a readable width, `code` as code, and the notices (callouts) first and
   set apart, so that "not on npm yet" is not the last sentence of a block of text. */
const StepNotes = ({ notes }: { notes: StepNote[] }) => (
  <div style={{ maxInlineSize: '75ch' }}>
    {[...notes]
      .sort((a, b) => Number(b.callout) - Number(a.callout))
      .map((note) => (
        <p
          key={note.text}
          style={{
            fontSize: 12.5,
            lineHeight: 1.6,
            margin: '8px 0 0',
            ...(note.callout
              ? { background: 'rgba(230, 160, 0, 0.1)', borderInlineStart: '3px solid #e6a000', padding: '6px 10px' }
              : { opacity: 0.85 }),
          }}
        >
          {note.text.split('`').map((part, index) =>
            index % 2 ? (
              <code
                key={index}
                style={{
                  background: 'rgba(127, 127, 127, 0.15)',
                  borderRadius: 3,
                  fontSize: '0.95em',
                  padding: '1px 4px',
                }}
              >
                {part}
              </code>
            ) : (
              part
            ),
          )}
        </p>
      ))}
  </div>
);

const UsageContent = () => {
  const api = useStorybookApi();
  const { index } = useStorybookState();
  const [chosen, setChosen] = useState<Layer | null>(null);
  const [html, setHtml] = useState<string | null>(storyHtml);
  const [rendered, setRendered] = useState<Rendered | null>(lastRendered);
  useChannel({
    [STORY_RENDERED]: () => setHtml(storyHtml()),
    [STORY_CHANGED]: () => {
      setHtml(null);
      setRendered(null);
    },
    [SNIPPET_RENDERED]: (event: Rendered) => setRendered(event),
  });
  const story = api.getCurrentStoryData() as Entry | undefined;
  if (!story || story.type !== 'story') return null;

  const { layer: own, component, base } = storyLayer(story.id);
  const stories = Object.values(index ?? {}).filter((entry) => entry.type === 'story');
  const layer: Layer = chosen ?? own;
  const info = LAYERS.find((item) => item.id === layer) ?? LAYERS[0];
  /* A layer this Storybook has no stories for at all: the React one documents no Angular, and the other way round. */
  const absent = layer !== own && !stories.some((entry) => storyLayer(entry.id).layer === layer);
  const other = storybookOf(layer);
  const otherUrl = `${SITES[other]}?path=/docs/${base}${info.suffixes[0]}--docs`;
  const docs = story.parameters?.usage;
  /* This story's own description first, then what the examples file says for the other layers. */
  const sections = [
    ...usageSections(story.parameters?.docs?.description?.component),
    ...(docs?.sections?.[component] ?? []),
  ];
  const written = sections.find((section) => section.title === info.heading);
  /* The story's own render code, which Storybook's CSF plugin attaches: for a framework story the surest "how", kept
     current without anyone writing it. An HTML story only renders the examples file, so there it says nothing. */
  const source = own !== 'html' ? story.parameters?.docs?.source?.originalSource?.trim() : undefined;
  const sourceLanguage = own === 'angular' ? 'ts' : 'tsx';
  /* The snippet, surest first: what this story rendered (the renderer's own JSX, following Controls), else the one
     written by hand in the examples file, else what the story's source and args say. A story that sets
     `parameters.usage.written` asks for the written one first. */
  const live =
    layer === own && !docs?.written && rendered?.id === story.id
      ? renderedSnippet(own, component, rendered.source, docs?.reactExports)
      : undefined;
  const derived = layer === own ? storySnippet(own, component, source, story.args ?? story.initialArgs) : undefined;
  const snippet = live ?? written ?? derived;
  const steps = layerSteps(docs?.pages[layer], component);
  /* The first story of this component in the chosen layer, to fetch its snippet from. */
  const sibling =
    layer === own
      ? null
      : stories.find((entry) => info.suffixes.some((suffix) => entry.id.startsWith(`${base}${suffix}--`)));
  /* A layer this story does not document: say so, and point at the story that does; nothing else. */
  const elsewhere = !snippet && layer !== own;
  const docsPage = index?.[`${story.id.split('--')[0]}--docs`];
  const pageBody = html ?? snippet?.code ?? '<!-- de HTML van de story -->';
  /* Only where plain HTML is the way to use it: a page of what a React or Angular component rendered is a picture. */
  const page = hasFullPage(layer)
    ? fullPage(docs, layer, component, layer === 'webComponents' && snippet ? snippet.code : pageBody)
    : null;
  let number = 0;

  return (
    <div
      style={{ blockSize: '100%', boxSizing: 'border-box', fontSize: 13, overflow: 'auto', padding: '12px 16px 24px' }}
    >
      <div style={{ maxInlineSize: 960 }}>
        <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: 4, marginBlockEnd: 16 }}>
          <span style={{ marginInlineEnd: 8, opacity: 0.7 }}>Met</span>
          {LAYERS.map((item) => (
            <Button
              key={item.id}
              variant={item.id === layer ? 'outline' : 'ghost'}
              size="small"
              active={item.id === layer}
              onClick={() => setChosen(item.id === own ? null : item.id)}
            >
              {item.title}
            </Button>
          ))}
          {docsPage && (
            <Link style={{ marginInlineStart: 'auto' }} onClick={() => api.selectStory(docsPage.id)}>
              Volledige documentatie →
            </Link>
          )}
        </div>

        {absent && (
          <Note>
            De {info.title}-stories staan niet in deze Storybook, maar in de {other === 'angular' ? 'Angular' : 'React'}
            -Storybook.{' '}
            <Link href={otherUrl} target="_blank" rel="noreferrer">
              Open {component} daar →
            </Link>
          </Note>
        )}
        {!absent && elsewhere && (
          <Note>
            Deze story documenteert de {info.title}-laag niet.{' '}
            {sibling ? (
              <Link onClick={() => api.selectStory(sibling.id)}>
                Open de {info.title}-story van {component} →
              </Link>
            ) : (
              `Er is geen ${info.title}-story van ${component}.`
            )}
          </Note>
        )}
        {!absent && !elsewhere && layer !== own && sibling && (
          <Note>
            Dit is de {info.title}-laag van {component}.{' '}
            <Link onClick={() => api.selectStory(sibling.id)}>Open de {info.title}-story →</Link>
          </Note>
        )}

        {!elsewhere && steps.length === 0 && (
          <Note>
            Geen stappen gevonden: de preview geeft de pagina De lagen › {info.title} niet mee in parameters.usage.
          </Note>
        )}
        {!elsewhere &&
          steps.map((step) => (
            <Step key={step.title} number={++number} title={step.title}>
              <Code language={step.language}>{step.code}</Code>
              <StepNotes notes={step.notes} />
            </Step>
          ))}

        {!elsewhere && (
          <Step number={++number} title="Plaatsen">
            {live ? (
              <>
                <Code language={live.language}>{live.code}</Code>
                <Note>
                  Wat deze story plaatst, met de waarden van nu: verander iets in Controls en dit verandert mee.
                </Note>
              </>
            ) : written ? (
              <Code language={written.language}>{written.code}</Code>
            ) : derived ? (
              <>
                <Code language={derived.language}>{derived.code}</Code>
                <Note>
                  Afgeleid uit deze story; een sectie ### {info.title} onder ## Usage in het examples-bestand komt
                  hiervoor in de plaats.
                </Note>
              </>
            ) : (
              <Note>
                Deze story heeft geen {info.title}-snippet in haar beschrijving (examples.ts, sectie ## Usage).
              </Note>
            )}
          </Step>
        )}

        {!elsewhere && !live && written && source && layer === own && (
          <Step number={++number} title="De code van deze story">
            <Code language={sourceLanguage}>{source}</Code>
            <Note>Precies wat hiernaast staat, uit het story-bestand; verandert mee met de story.</Note>
          </Step>
        )}

        {!elsewhere && (layer === own || layer === 'html') && (
          <Step number={++number} title="Dit rendert de story">
            <Note>
              {layer !== 'html'
                ? 'De HTML die het component maakt; handig om te zien welke Utrecht-classes en tokens er meedoen.'
                : own === 'html'
                  ? 'Dit is de referentie-markup: zo schrijf je het zelf.'
                  : `De HTML die deze story maakt, met de opmaak van de story eromheen. De referentie-markup staat bij de HTML-story van ${component}.`}
            </Note>
            {html ? (
              <Fold summary={`Toon de HTML (${lines(html)})`} open={layer === 'html' && own === 'html'}>
                <Code language="html">{html}</Code>
              </Fold>
            ) : (
              <Note>De HTML verschijnt zodra de story gerenderd is.</Note>
            )}
          </Step>
        )}

        {!elsewhere && page && (
          <Step number={++number} title="Als losse pagina">
            <div style={{ alignItems: 'center', display: 'flex', gap: 8, marginBlockEnd: 6 }}>
              <Button size="small" variant="outline" onClick={() => download(`${component}.html`, page)}>
                Download {component}.html
              </Button>
              <Note>
                Open het bestand naast een node_modules met de packages hierboven, of vervang de paden door je eigen.
              </Note>
            </div>
            <Fold summary={`Toon de pagina (${lines(page)})`}>
              <Code language="html">{page}</Code>
            </Fold>
          </Step>
        )}
      </div>
    </div>
  );
};
