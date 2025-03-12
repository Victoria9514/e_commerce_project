import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductGender } from '../models/product.model';
export interface NavLinks {
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  route: ActivatedRoute = inject(ActivatedRoute);

  navLinks: NavLinks[] = [
    { label: ProductGender.WOMEN },
    { label: ProductGender.MEN },
    { label: ProductGender.KIDS },
    { label: ProductGender.UNISEX },
  ];
  activeLink = this.navLinks[0].toString();
}
