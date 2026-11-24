import { Component, Input } from '@angular/core';
import { ibanGroups, normalizeIban } from '../utils/data-format';

@Component({
  selector: 'tilburg-iban-data',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgIbanData {
  /** The IBAN, in any spacing or case. */
  @Input({ required: true }) value!: string;

  get normalized(): string {
    return normalizeIban(this.value ?? '');
  }

  get groups(): string[] {
    return ibanGroups(this.normalized);
  }
}
