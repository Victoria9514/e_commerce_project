import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-filter-color-template',
  imports: [],
  template: `<span>hello from color templates</span>`,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterColorTemplateComponent {

  values  = ['red']
}
