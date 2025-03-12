import { Component, ViewEncapsulation } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  title: string;
}

@Component({
    selector: 'app-footer',
    imports: [MatGridListModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: { class: 'footer' }
})
export class FooterComponent {
  data: Tile[] = [
    {title: 'Socialee', cols: 2, rows: 2, color: 'lightpink'},
    {title: 'Support', cols: 2, rows: 2, color: 'lightgreen'},
    {title: 'About us', cols: 4, rows: 1, color: 'lightblue'},
    // {title: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
}
