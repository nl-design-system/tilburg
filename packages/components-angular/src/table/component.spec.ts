import { Component, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgTable } from './component';

@Component({
  template: `<tilburg-table
    ><tbody>
      <tr>
        <td class="utrecht-table__cell">Cel</td>
      </tr>
    </tbody></tilburg-table
  >`,
  standalone: false,
})
class HostComponent {}

describe('TilburgTable', () => {
  it('projects the content into the styled element', () => {
    TestBed.configureTestingModule({ declarations: [TilburgTable, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('table.utrecht-table td.utrecht-table__cell')?.textContent,
    ).toBe('Cel');
  });

  /* Emulated encapsulation would scope the cell, header, zebra and footer rules away from the projected content: an app that only loads the utrecht CSS
     globally would lose them. */
  it('does not encapsulate its styles', () => {
    expect((TilburgTable as unknown as { ɵcmp: { encapsulation: ViewEncapsulation } }).ɵcmp.encapsulation).toBe(
      ViewEncapsulation.None,
    );
  });
});
