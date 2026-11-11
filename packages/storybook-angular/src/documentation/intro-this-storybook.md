<!-- @license CC0-1.0 -->

<!-- The logo comes before the title, so MD041 (first line a heading) is off here. -->
<!-- markdownlint-disable MD033 MD041 -->

<img
  src="logo.svg"
  alt="Open Tilburg"
  style="width: 100%; max-width: 260px; height: auto; margin-block-end: 1rem;"
/>

<!-- markdownlint-enable MD033 MD041 -->

# Tilburg Angular componenten

Het Tilburg Design System is de set bouwstenen voor de websites en applicaties van Gemeente Tilburg: knoppen,
formuliervelden, meldingen en pagina-onderdelen in de Tilburg-huisstijl, toegankelijk en voor iedereen gelijk. Deze
Storybook laat de Angular-laag zien en legt uit hoe je hem gebruikt.

Deze Storybook documenteert `@gemeente-tilburg/components-angular` — de Angular-laag van de Tilburg-componentenbibliotheek. Hij bevat zowel de **Angular-componenten** (`Tilburg Angular/…`) als de **HTML/CSS-referentie** (`Tilburg HTML/…`) zodat je beide naast elkaar kunt vergelijken zonder van Storybook te wisselen. Elke componentpagina onder `Tilburg Angular/…` heeft een **Usage**-sectie met de `@Input`s en `@Output`s, en de knop **`</> Gebruik`** in de werkbalk laat zien hoe je het component in je eigen project zet.

Er bestaat **een tweede, onafhankelijke Storybook** met de React-componenten (`Tilburg React/…`), de Web Components (`Tilburg Web Components/…`) en dezelfde HTML/CSS-referentie. Op de gepubliceerde site is dat de <a href="../" target="_top">hoofd-Storybook</a>, en deze Angular-Storybook staat onder `/angular/`; lokaal start je de andere met `pnpm dev react`, of beide Storybooks tegelijk met `pnpm dev`.

Componenten met het label **TLB** introduceert Tilburg zelf; ze zijn niet gebaseerd op een Utrecht-component (zie
_Tilburg en NL Design System_ hieronder). Met de knop **Alle componenten** in de toolbar filter je de zijbalk op
**Alleen TLB** of **Zonder TLB**.
