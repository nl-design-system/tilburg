---
'@gemeente-tilburg/components-react': patch
'@gemeente-tilburg/components-angular': patch
---

Badge list, page footer, pagination en process steps blijven in Safari een lijst voor VoiceOver (lege marker in plaats van `list-style: none`). De loading spinner geeft geen horizontale scrollbalk meer, de grote data list loopt niet meer uit zijn container bij lange waarden, en het terugval-icoon van de validation message schaalt mee met de tekstgrootte.
