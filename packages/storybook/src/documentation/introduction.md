<!-- @license CC0-1.0 -->

# NL Design System introductie

De Digitale Overheid stelt dat overheidsdienstverlening toegankelijk en begrijpelijk moet zijn voor iedereen. Hiervoor zijn consistent ontworpen diensten en websites nodig.
Daarom gaan we tussen overheidsorganisaties principes, interactiepatronen en code delen via een gezamenlijk design system. Dit NL Design System draagt niet alleen bij aan gebruiksvriendelijkere diensten van een betere kwaliteit en toegankelijkheid. Het helpt ook dubbel werk te voorkomen.

> ⚠️ **LET OP**
>
> Het NL Design System bevindt zich momenteel nog in de pilotfase.
> Hierdoor is het nu nog niet volwassen genoeg om volledig gebruikt te worden.
> Houdt hier dus rekening mee voor je aan de slag gaat.
> We zouden het op prijs stellen als je wilt bijdragen om het NLDS tot een succes te maken.
> Dit kan in onze GitHub of met een mailtje aan: [info@nldesignsystem.nl](mailto:info@nldesignsystem.nl)

## Wat is een Design System

Een Design System, oftewel een ontwerpsysteem, is een verzameling afspraken tussen ontwerpers en ontwikkelaars voor het maken van digitale producten, zoals websites en apps. Het doel van deze afspraken is om de producten consistent en de gebruikerservaring zo prettig mogelijk te maken. Een Design System ‘leeft’: dankzij nieuwe inzichten en feedback van gebruikers worden de afspraken continu verbeterd.

## Hoe werkt een Design System

De afspraken in het Design System worden gemaakt aan de hand van bewezen oplossingen. Ze vormen een solide basis voor de ontwerpers en ontwikkelaars: doordat zij het wiel niet steeds opnieuw hoeven uit te vinden, kunnen ze snel en effectief nieuwe digitale producten bouwen. Als je als organisatie met een Design System werkt, bouw je voort op elkaars ervaringen en houd je meer tijd over voor unieke, eenmalige uitdagingen. Wel is er een betrokken, actieve community nodig om het Design System actueel en praktisch toepasbaar te houden.

## Waarom een NL Design System

In een Design System staan principes, handvatten, elementen, patronen en richtlijnen beschreven. Allemaal basisonderdelen waarover je goed afspraken kunt maken. Juist overheidsorganisaties hebben baat bij één duidelijke set herbruikbare basisonderdelen. Vooral voor levensgebeurtenissen, waarbij vaak contact nodig is met meerdere instanties en organisaties.

Dankzij het NL Design System kan de hele overheid in Nederland samenwerken aan een begrijpelijke, gebruiksvriendelijke én toegankelijke online dienstverlening. Een dienstverlening die logisch en samenhangend is, maar niet per se uniform, want binnen de afspraken blijft er ruimte voor de eigen identiteit van overheidsorganisaties.

## Voor (en door) iedereen

Het is belangrijk dat iedereen de online dienstverlening van de overheid kan gebruiken, ongeacht wie je bent en wat je situatie is. Dit heet inclusie: iedereen moet kunnen meedoen. Daarom testen we de afspraken in het Design System met een heel diverse gebruikersgroep, waaronder mensen met beperkingen. Zo nemen de kwaliteit, bruikbaarheid en toegankelijkheid toe en kunnen we iedereen in Nederland met onze digitale producten steeds beter van dienst zijn.

De POC is te vinden op:

<http://github.com/nl-design-system>

## Tilburg-componenten gebruiken

De Tilburg-componenten worden in twee lagen verspreid: een **pure CSS**-laag voor iedereen, en een **Angular**-laag bovenop voor projecten die Angular gebruiken. Beide lagen leunen op `@utrecht/component-library-css` als basis en op `@gemeente-tilburg/design-tokens` voor kleuren, ruimtes en typografie.

### Installatie

```bash
# Pure CSS / elk framework
npm install @gemeente-tilburg/components-css @gemeente-tilburg/design-tokens @utrecht/component-library-css

# Angular (bevat de CSS-laag al transitief)
npm install @gemeente-tilburg/components-angular @gemeente-tilburg/design-tokens
```

### Pure CSS gebruiken (elk framework)

Importeer de design tokens, de utrecht-basis, en alleen de componenten die u nodig heeft. Dit kan in een `styles.scss`, `app.css`, of bovenin een Vite/Webpack entry-point:

```scss
@import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
@import "@utrecht/component-library-css/dist/index.css";

@import "@gemeente-tilburg/components-css/alert/index";
@import "@gemeente-tilburg/components-css/accordion/index";
@import "@gemeente-tilburg/components-css/button/index";
/* …of alleen de componenten die u nodig heeft */
```

Schrijf vervolgens de BEM-markup zoals te zien is in elke story onder **Plain HTML / CSS**:

```html
<button type="button" class="utrecht-button utrecht-button--primary-action tilburg-medium">Versturen</button>
```

De Tilburg-klassen (`tilburg-*` / `.tilburg-…__*`) cascaden bovenop de utrecht-klassen — utrecht levert de basis, Tilburg geeft de huisstijl.

### Angular gebruiken

Registreer de module één keer in uw root- of feature-module:

```ts
import { NgModule } from "@angular/core";
import { TilburgComponentsModule } from "@gemeente-tilburg/components-angular";

@NgModule({
  imports: [TilburgComponentsModule],
  /* … */
})
export class AppModule {}
```

Zorg dat de design tokens en utrecht-basis in uw globale `styles.scss` staan (de Angular-laag bundelt de Tilburg-component-CSS automatisch mee):

```scss
@import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
@import "@utrecht/component-library-css/dist/index.css";
```

Gebruik vervolgens de componenten direct in uw templates:

```html
<tilburg-alert variant="info" title="Informatie" [closable]="true" (closed)="dismiss()">
  De openingstijden zijn gewijzigd.
</tilburg-alert>

<tilburg-textbox id="email" type="email" [control]="form.controls.email" placeholder="naam@voorbeeld.nl" />
```

Elke story onder **Tilburg/\*** documenteert de beschikbare `@Input`s en `@Output`s in de **Usage**-sectie van zijn auto-docs-pagina.

### Design tokens

Alle componenten kunnen via CSS-custom-properties getuned worden. De Tilburg-tokens (`--tilburg-*`) en de bovenliggende utrecht-tokens (`--utrecht-*`) zijn in DevTools onder de root te inspecteren; overschrijven kan per scope:

```scss
.brand-zone {
  --tilburg-interaction-color: #c4007a;
}
```

Zie de [Tokens](/?path=/docs/tokens--docs) story voor het complete overzicht.
