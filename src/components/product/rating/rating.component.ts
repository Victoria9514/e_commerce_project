import { Component, ViewEncapsulation, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  encapsulation: ViewEncapsulation.None,
  template: `
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="star-rating">
      @for(star of stars; track star) {
      <i class="fa fa-star"></i>
      } @if(rating() % 1 !== 0) {
      <i class="fa fa-star-half"></i>
      }
    </div>
  `,
  styles: ` div.star-rating {
    max-width: 5%;
    max-height: 3%;
    width: 100%;
    height: 100%;
    font-size: 2em;
  color: #ffc107 }`,
})
export class RatingComponent {
  rating = input.required<number>();
  get stars() {
    return Array(Math.floor(this.rating())).fill(0);
  }
}
