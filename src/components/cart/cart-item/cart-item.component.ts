import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { IProduct } from '../../../models/product.model';

@Component({
    selector: 'app-cart-item',
    imports: [MatButtonModule, MatIconModule, MatDividerModule, NgOptimizedImage],
    templateUrl: './cart-item.component.html',
    styleUrl: './cart-item.component.scss'
})
export class CartitemComponent {
  item = input.required<IProduct>();
}
