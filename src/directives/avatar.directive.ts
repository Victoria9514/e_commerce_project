import { Directive, inject, input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

@Directive({
  selector: '[avatar], avatar',
  standalone: true,
  host: {
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
    '[style.border-radius]': 'borderRadius',
    '[attr.src]': 'url() || DEFAULT_PROFILE_PIC_URL',
  },
})
export class AvatarDirective {
  store = inject(Store);
  sanitizer = inject(DomSanitizer);
  url = input<SafeUrl>();
  size = input<string>('');
  readonly borderRadius = '60px';
  DEFAULT_PROFILE_PIC_URL = '/assets/images/blank.png';

  // initials$ = this.store.select(selectInitals);
  // private colours = [
  //   '#1abc9c',
  //   '#2ecc71',
  //   '#3498db',
  //   '#9b59b6',
  //   '#34495e',
  //   '#16a085',
  //   '#27ae60',
  //   '#2980b9',
  //   '#8e44ad',
  //   '#2c3e50',
  //   '#f1c40f',
  //   '#e67e22',
  //   '#e74c3c',
  //   '#95a5a6',
  //   '#f39c12',
  //   '#d35400',
  //   '#c0392b',
  //   '#bdc3c7',
  //   '#7f8c8d',
  // ];

  // private generateInitials() {
  //   const initials = this.initials();
  //   const color = this.getColor(this.colours);

  //   const canvas = document.createElement('canvas');
  //   canvas.width = +this.size();
  //   canvas.height = +this.size();
  //   const context = canvas.getContext('2d');

  //   if (context && initials) {
  //     context.beginPath();
  //     context.fillStyle = this.getColor(this.colours);
  //     context.font = 'bold 15px Arial';

  //     context.arc(20, 20, 20, 0, 100);
  //     context.textAlign = 'center';
  //     // context.strokeStyle = color;
  //     context.fill();
  //     context.fillStyle = this.getColor(this.colours);
  //     context.fillText(initials, 20, 25, 40);
  //     context.stroke();
  //     return canvas.toDataURL();
  //   }
  //   return null;
  // }

  // private getColor(letter: string[]) {
  //   return letter[Math.floor(Math.random() * letter.length)];
  // }
}
