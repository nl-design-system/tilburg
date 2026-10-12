/* Tilburgse en Brabantse uitdrukkingen voor onder de titel van `pnpm start` (het menu): elke keer een andere.
   Elk heeft een vertaling, soms met een knipoog naar het werk; de uitdrukking zelf staat er zoals Tilburgers hem zeggen.
   Er een toevoegen mag gewoon: [uitdrukking, betekenis]. */
export const SAYINGS = [
  ['Houdoe!', 'tot ziens (letterlijk: houd u goed) — en tot de volgende build'],
  ['Houdoe en bedankt!', 'tot ziens en bedankt'],
  ['Goeiendag!', 'goedendag'],
  ['Hoe issut?', 'hoe is het? (pnpm check weet het)'],
  ['Hedde gij da gezien?', 'heb jij dat gezien? — vast in de Storybook'],
  ['Wa witte gij daar nou van?', 'wat weet jij daar nou van? (pnpm where weet het wel)'],
  ['Ge zijt ’nen echte Kruikenzeiker.', 'je bent een echte Tilburger'],
  ['Nie zeveren, gewoon doen.', 'niet zeuren, gewoon doen'],
  ['Doe mar gewoon, dan doede al gek genoeg.', 'doe maar normaal, dan doe je al gek genoeg'],
  ['Da’s ’nen goeie!', 'dat is een goeie! — vooral als de tests groen zijn'],
  ['Kom d’r mar in.', 'kom maar binnen'],
  ['Ge mot ut mar wete.', 'je moet het maar weten'],
  ['Ut is wir zover!', 'het is weer zover — carnaval in Kruikenstad, of een release'],
  ['Alaaf!', 'de carnavalsgroet van Kruikenstad'],
  ['Gezellig, hè?', 'gezellig, hè? — ook bij een merge conflict'],
];

/** One saying at random: [saying, meaning]. */
export const randomSaying = () => SAYINGS[Math.floor(Math.random() * SAYINGS.length)];
