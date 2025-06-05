import { Injectable } from '@angular/core';
import { NavLinks } from '@models/navigation.models';
import { ProductGender } from '@models/product.model';

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
