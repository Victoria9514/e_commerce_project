import { Injectable } from '@angular/core';
import { ProductGender } from '@models/product.model';
export interface NavLinks {
  route: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  navLinks: NavLinks[] = [
    { route: `/products/${ProductGender.WOMEN}`, name: ProductGender.WOMEN },
    { route: `/products/${ProductGender.MEN}`, name: ProductGender.MEN },
    { route: `/products/${ProductGender.KIDS}`, name: ProductGender.KIDS },
  ];
}
